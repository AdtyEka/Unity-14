"""ML service: model loading, Z-Score calculation, SHAP, and inference."""

import json
import logging
import pickle
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
import shap  # type: ignore[import-untyped]

from app.schemas.stunting import StuntingInput, StuntingPrediction

logger = logging.getLogger(__name__)

_MODELS_DIR = Path(__file__).resolve().parents[2] / "models"
MODEL_PATH = _MODELS_DIR / "stunting_model.pkl"
METADATA_PATH = _MODELS_DIR / "model_metadata.json"

# Training column order — must match what the model was fitted on.
FEATURE_COLUMNS: list[str] = ["jenis_kelamin", "umur_bulan", "tinggi_cm", "berat_kg"]

# ---------------------------------------------------------------------------
# WHO 2006 Height-for-Age (TB/U) reference tables
# Source: WHO Child Growth Standards — Length/height-for-age
# Keys are age in complete months (0–60).
# Each entry: (median_cm, sd_cm)  — SD is the average of ±1 SD spread.
# ---------------------------------------------------------------------------
_WHO_HFA_BOYS: dict[int, tuple[float, float]] = {
    0: (49.9, 1.89), 1: (54.7, 2.00), 2: (58.4, 2.08), 3: (61.4, 2.12),
    4: (63.9, 2.15), 5: (65.9, 2.18), 6: (67.6, 2.20), 7: (69.2, 2.23),
    8: (70.6, 2.27), 9: (72.0, 2.31), 10: (73.3, 2.35), 11: (74.5, 2.40),
    12: (75.7, 2.47), 13: (76.9, 2.53), 14: (78.0, 2.59), 15: (79.1, 2.65),
    16: (80.2, 2.71), 17: (81.2, 2.77), 18: (82.3, 2.83), 19: (83.2, 2.89),
    20: (84.2, 2.95), 21: (85.1, 3.01), 22: (86.0, 3.07), 23: (86.9, 3.13),
    24: (87.8, 3.18), 25: (88.7, 3.24), 26: (89.5, 3.30), 27: (90.3, 3.36),
    28: (91.1, 3.42), 29: (91.9, 3.47), 30: (92.7, 3.53), 31: (93.5, 3.59),
    32: (94.2, 3.65), 33: (95.0, 3.71), 34: (95.7, 3.76), 35: (96.4, 3.82),
    36: (97.1, 3.88), 37: (97.8, 3.94), 38: (98.5, 3.99), 39: (99.2, 4.05),
    40: (99.9, 4.11), 41: (100.5, 4.16), 42: (101.2, 4.22), 43: (101.8, 4.27),
    44: (102.5, 4.33), 45: (103.1, 4.39), 46: (103.7, 4.44), 47: (104.4, 4.50),
    48: (105.0, 4.55), 49: (105.6, 4.61), 50: (106.2, 4.66), 51: (106.8, 4.72),
    52: (107.4, 4.77), 53: (108.0, 4.83), 54: (108.6, 4.88), 55: (109.1, 4.93),
    56: (109.7, 4.99), 57: (110.3, 5.04), 58: (110.8, 5.09), 59: (111.4, 5.15),
    60: (111.9, 5.20),
}

_WHO_HFA_GIRLS: dict[int, tuple[float, float]] = {
    0: (49.1, 1.86), 1: (53.7, 1.98), 2: (57.1, 2.05), 3: (59.8, 2.10),
    4: (62.1, 2.14), 5: (64.0, 2.17), 6: (65.7, 2.21), 7: (67.3, 2.26),
    8: (68.7, 2.30), 9: (70.1, 2.35), 10: (71.5, 2.40), 11: (72.8, 2.46),
    12: (74.0, 2.53), 13: (75.2, 2.59), 14: (76.4, 2.65), 15: (77.5, 2.71),
    16: (78.6, 2.78), 17: (79.7, 2.84), 18: (80.7, 2.91), 19: (81.7, 2.97),
    20: (82.7, 3.04), 21: (83.7, 3.10), 22: (84.6, 3.17), 23: (85.5, 3.23),
    24: (86.4, 3.29), 25: (87.3, 3.36), 26: (88.2, 3.42), 27: (89.0, 3.49),
    28: (89.9, 3.55), 29: (90.7, 3.61), 30: (91.5, 3.68), 31: (92.3, 3.74),
    32: (93.1, 3.80), 33: (93.9, 3.87), 34: (94.6, 3.93), 35: (95.4, 3.99),
    36: (96.1, 4.06), 37: (96.9, 4.12), 38: (97.6, 4.18), 39: (98.3, 4.24),
    40: (99.0, 4.30), 41: (99.7, 4.37), 42: (100.4, 4.43), 43: (101.1, 4.49),
    44: (101.8, 4.55), 45: (102.5, 4.61), 46: (103.1, 4.67), 47: (103.8, 4.73),
    48: (104.5, 4.79), 49: (105.1, 4.85), 50: (105.8, 4.91), 51: (106.4, 4.97),
    52: (107.1, 5.03), 53: (107.7, 5.09), 54: (108.4, 5.15), 55: (109.0, 5.21),
    56: (109.6, 5.27), 57: (110.3, 5.33), 58: (110.9, 5.39), 59: (111.5, 5.45),
    60: (112.2, 5.51),
}


def calculate_hfa_zscore(
    height_cm: float,
    age_months: float,
    sex: int,  # 1 = male, 2 = female
) -> float:
    """Compute Height-for-Age Z-Score using WHO 2006 reference tables.

    Z = (observed - median) / SD

    Args:
        height_cm: Measured height in centimetres.
        age_months: Age in months (fractional values are floored to the
                    nearest complete month for table lookup).
        sex: 1 for male, 2 for female.

    Returns:
        Z-Score rounded to 2 decimal places.
        Returns 0.0 if the age is outside the reference range.
    """
    age_key: int = min(int(age_months), 60)
    table = _WHO_HFA_BOYS if sex == 1 else _WHO_HFA_GIRLS
    ref = table.get(age_key)
    if ref is None:
        return 0.0
    median, sd = ref
    if sd == 0:
        return 0.0
    return round((height_cm - median) / sd, 2)


class MLService:
    """Encapsulates model loading, SHAP explainer, and inference."""

    def __init__(self) -> None:
        self._model: Any = None
        self._explainer: Any = None
        self._label_names: list[str] = []
        self._index_to_label: dict[int, str] = {}

    def load(self) -> None:
        """Load the XGBoost model, build the SHAP TreeExplainer, and parse metadata.

        Raises:
            RuntimeError: On any file-load failure — causes the app to abort startup.
        """
        logger.info("Loading model from %s", MODEL_PATH)
        try:
            with MODEL_PATH.open("rb") as fh:
                self._model = pickle.load(fh)  # noqa: S301
        except Exception as exc:
            raise RuntimeError(f"Failed to load model: {exc}") from exc

        logger.info("Building SHAP TreeExplainer…")
        try:
            # TreeExplainer is the fastest explainer for tree-based models.
            # model_output="probability" returns SHAP values in probability space.
            self._explainer = shap.TreeExplainer(
                self._model,
                model_output="raw",  # raw margin — consistent with XGBoost internals
            )
        except Exception as exc:
            raise RuntimeError(f"Failed to build SHAP explainer: {exc}") from exc

        logger.info("Loading metadata from %s", METADATA_PATH)
        try:
            with METADATA_PATH.open("r", encoding="utf-8") as fh:
                metadata: dict = json.load(fh)
        except Exception as exc:
            raise RuntimeError(f"Failed to load model metadata: {exc}") from exc

        self._label_names = metadata["label_names"]
        label_map: dict[str, int] = metadata["label_map"]
        self._index_to_label = {v: k for k, v in label_map.items()}

        logger.info("MLService ready. Labels: %s", self._label_names)

    def predict(self, payload: StuntingInput) -> StuntingPrediction:
        """Run inference, compute SHAP values, and calculate Z-Score.

        Args:
            payload: Validated input features.

        Returns:
            StuntingPrediction with prediction index, label, z_score,
            confidence, and SHAP values.

        Raises:
            RuntimeError: If the service has not been loaded.
        """
        if self._model is None or self._explainer is None:
            raise RuntimeError("MLService is not loaded.")

        # ------------------------------------------------------------------ #
        # 1. Build feature DataFrame in training column order.
        # ------------------------------------------------------------------ #
        features_df = pd.DataFrame(
            [
                {
                    "jenis_kelamin": payload.jenis_kelamin,
                    "umur_bulan": payload.umur_bulan,
                    "tinggi_cm": payload.tinggi_cm,
                    "berat_kg": payload.berat_kg,
                }
            ],
            columns=FEATURE_COLUMNS,
        )

        # ------------------------------------------------------------------ #
        # 2. Model inference.
        # ------------------------------------------------------------------ #
        try:
            proba: np.ndarray = self._model.predict_proba(features_df)
        except Exception as exc:
            raise RuntimeError(f"Model inference failed: {exc}") from exc

        class_probabilities: np.ndarray = proba[0]
        predicted_index: int = int(np.argmax(class_probabilities))
        confidence: float = float(class_probabilities[predicted_index])
        prediction_label: str = self._index_to_label[predicted_index]

        # ------------------------------------------------------------------ #
        # 3. SHAP values for the predicted class.
        # ------------------------------------------------------------------ #
        try:
            # shap_vals shape: (n_samples, n_features, n_classes) for multi-class
            shap_vals = self._explainer.shap_values(features_df)

            # Select SHAP values for the predicted class (first sample).
            if isinstance(shap_vals, list):
                # Older SHAP API returns a list of arrays, one per class.
                class_shap: np.ndarray = shap_vals[predicted_index][0]
            else:
                # Newer SHAP API returns a single 3-D array.
                class_shap = shap_vals[0, :, predicted_index]

            shap_values: dict[str, float] = {
                col: round(float(class_shap[i]), 6)
                for i, col in enumerate(FEATURE_COLUMNS)
            }
        except Exception as exc:
            logger.warning("SHAP calculation failed, returning zeros: %s", exc)
            shap_values = {col: 0.0 for col in FEATURE_COLUMNS}

        # ------------------------------------------------------------------ #
        # 4. Z-Score (Height-for-Age, WHO 2006).
        # ------------------------------------------------------------------ #
        z_score: float = calculate_hfa_zscore(
            height_cm=payload.tinggi_cm,
            age_months=payload.umur_bulan,
            sex=payload.jenis_kelamin,
        )

        return StuntingPrediction(
            prediction=predicted_index,
            prediction_label=prediction_label,
            z_score=z_score,
            confidence=round(confidence, 6),
            shap_values=shap_values,
        )


# Module-level singleton injected into app.state during lifespan startup.
ml_service = MLService()
