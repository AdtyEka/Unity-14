from pydantic import BaseModel, Field, ConfigDict


class StuntingInput(BaseModel):
    """Input schema for the stunting prediction endpoint.

    Feature names must exactly match the column names the XGBoost model
    was trained on (see model_metadata.json → features).
    """

    model_config = ConfigDict(strict=True)

    jenis_kelamin: int = Field(
        ...,
        description="Sex of the child: 1 = male, 2 = female",
        ge=1,
        le=2,
    )
    umur_bulan: float = Field(
        ...,
        description="Age of the child in months",
        ge=0,
        le=60,
    )
    tinggi_cm: float = Field(
        ...,
        description="Height of the child in centimetres",
        gt=0,
    )
    berat_kg: float = Field(
        ...,
        description="Weight of the child in kilograms",
        gt=0,
    )


class StuntingPrediction(BaseModel):
    """Response schema returned by the prediction endpoint."""

    prediction: str = Field(..., description="Predicted stunting label")
    confidence: float = Field(
        ...,
        description="Model confidence for the predicted class (0–1)",
        ge=0.0,
        le=1.0,
    )
    probabilities: dict[str, float] = Field(
        ...,
        description="Per-class probabilities keyed by label name",
    )
