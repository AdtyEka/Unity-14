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
        "with SHAP feature contributions and a WHO 2006 Height-for-Age Z-Score."
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
    except RuntimeError as exc:
        logger.exception("Inference failed for payload %s", payload)
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:
        logger.exception("Unexpected error during inference for payload %s", payload)
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected prediction error: {exc}",
        ) from exc

    return result
