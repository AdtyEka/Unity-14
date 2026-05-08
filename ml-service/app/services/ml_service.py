import json
import logging
import pickle
from pathlib import Path

import numpy as np
import pandas as pd

from app.schemas.stunting import StuntingInput, StuntingPrediction

logger = logging.getLogger(__name__)

# Resolved at module import time so path is always correct regardless of cwd.
_MODELS_DIR = Path(__file__).resolve().parents[2] / "models"
MODEL_PATH = _MODELS_DIR / "stunting_model.pkl"
METADATA_PATH = _MODELS_DIR / "model_metadata.json"


class MLService:
    """Encapsulates model loading and inference for the stunting classifier."""

    def __init__(self) -> None:
        self._model: object | None = None
        self._label_names: list[str] = []
        # Maps numeric prediction index → original label string.
        self._index_to_label: dict[int, str] = {}

    def load(self) -> None:
        """Load the model and metadata from disk.

        Raises:
            RuntimeError: If either file cannot be loaded, so the app fails
                fast at startup rather than serving broken predictions.
        """
        logger.info("Loading model from %s", MODEL_PATH)
        try:
            with MODEL_PATH.open("rb") as fh:
                self._model = pickle.load(fh)  # noqa: S301
        except Exception as exc:
            raise RuntimeError(f"Failed to load model: {exc}") from exc

        logger.info("Loading metadata from %s", METADATA_PATH)
        try:
            with METADATA_PATH.open("r", encoding="utf-8") as fh:
                metadata: dict = json.load(fh)
        except Exception as exc:
            raise RuntimeError(f"Failed to load model metadata: {exc}") from exc

        # label_names preserves the class order expected by predict_proba.
        self._label_names = metadata["label_names"]

        # Invert label_map so we can go numeric index → label string.
        label_map: dict[str, int] = metadata["label_map"]
        self._index_to_label = {v: k for k, v in label_map.items()}

        logger.info(
            "Model loaded. Labels: %s",
            self._label_names,
        )

    def predict(self, payload: StuntingInput) -> StuntingPrediction:
        """Run inference and return a structured prediction result.

        Args:
            payload: Validated input features from the request.

        Returns:
            StuntingPrediction with label, confidence, and per-class probs.

        Raises:
            RuntimeError: If the model has not been loaded yet.
            Exception:    Propagated to the caller for HTTP 500 handling.
        """
        if self._model is None:
            raise RuntimeError("Model is not loaded.")

        # Build a DataFrame with column names matching the training data.
        features_df = pd.DataFrame(
            [
                {
                    "jenis_kelamin": payload.jenis_kelamin,
                    "umur_bulan": payload.umur_bulan,
                    "tinggi_cm": payload.tinggi_cm,
                    "berat_kg": payload.berat_kg,
                }
            ]
        )

        # predict_proba returns shape (n_samples, n_classes).
        proba: np.ndarray = self._model.predict_proba(features_df)
        class_probabilities: np.ndarray = proba[0]

        predicted_index: int = int(np.argmax(class_probabilities))
        confidence: float = float(class_probabilities[predicted_index])
        prediction_label: str = self._index_to_label[predicted_index]

        # Build a human-readable probability dict keyed by label name.
        probabilities: dict[str, float] = {
            label: float(class_probabilities[i])
            for i, label in enumerate(self._label_names)
        }

        return StuntingPrediction(
            prediction=prediction_label,
            confidence=round(confidence, 6),
            probabilities={k: round(v, 6) for k, v in probabilities.items()},
        )


# Module-level singleton — shared across all requests via FastAPI's app.state.
ml_service = MLService()
