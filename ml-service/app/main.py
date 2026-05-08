import logging
from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints.predict import router as predict_router
from app.services.ml_service import ml_service

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Load ML artefacts once at startup; release on shutdown."""
    logger.info("Application starting — loading ML model...")
    try:
        ml_service.load()
    except RuntimeError as exc:
        logger.critical("FATAL: %s", exc)
        raise  # Abort startup so the container exits with a non-zero code.

    # Attach the loaded service to app.state so endpoints can access it via
    # `request.app.state.ml_service` without importing the global directly.
    app.state.ml_service = ml_service
    logger.info("ML model ready. Serving requests.")

    yield  # ← Application runs here.

    logger.info("Application shutting down.")


app = FastAPI(
    title="Stunting Prediction API",
    description="XGBoost-powered microservice that classifies child stunting status.",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# CORS — allow all origins so the Laravel/React monolith can call freely.
# Restrict origins in production by replacing ["*"] with an explicit list.
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(
    predict_router,
    prefix="/api/v1",
    tags=["Prediction"],
)


@app.get("/health", tags=["Health"])
async def health_check() -> dict[str, str]:
    """Lightweight liveness probe for load balancers / container orchestrators."""
    return {"status": "ok"}
