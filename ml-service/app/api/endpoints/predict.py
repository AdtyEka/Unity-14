import logging

from fastapi import APIRouter, HTTPException, Request

from app.schemas.stunting import StuntingInput, StuntingPrediction

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post(
    "/predict",
    response_model=StuntingPrediction,
    summary="Predict stunting status",
    description=(
        "Accepts child anthropometric data and returns a stunting classification "
        "with per-class probabilities."
    ),
)
async def predict_stunting(
    request: Request,
    payload: StuntingInput,
) -> StuntingPrediction:
    """Run the XGBoost stunting classifier on the provided input features."""
    ml_service = request.app.state.ml_service

    try:
        result: StuntingPrediction = ml_service.predict(payload)
    except Exception as exc:
        logger.exception("Inference failed for payload %s", payload)
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        ) from exc

    return result
