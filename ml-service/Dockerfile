# ==============================================================================
# Stage 1: Builder
# Installs dependencies in an isolated layer to maximize Docker layer caching.
# Using python:3.11-slim — minimal Debian-based image, excellent ARM64 support.
# ==============================================================================
FROM python:3.11-slim AS builder

WORKDIR /build

# Install only the OS-level build tools needed to compile packages (e.g. shap).
# Removed after the build stage — keeps the final image lean.
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file first to leverage Docker layer cache:
# This layer is only rebuilt when requirements.txt changes.
COPY requirements.txt .

# Install all Python dependencies into a dedicated prefix so we can
# copy just the installed packages to the final stage cleanly.
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir --prefix=/install -r requirements.txt


# ==============================================================================
# Stage 2: Runtime
# Lean production image — no build tools, no pip cache.
# ==============================================================================
FROM python:3.11-slim AS runtime

# ── Python optimisation flags ────────────────────────────────────────────────
# PYTHONDONTWRITEBYTECODE: Don't write .pyc files to disk (image stays smaller).
# PYTHONUNBUFFERED:        Force stdout/stderr to be unbuffered (real-time logs).
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    # Tell Python where to find the packages installed in the builder stage.
    PYTHONPATH=/install/lib/python3.11/site-packages

# Install libgomp (OpenMP runtime) — required at runtime by XGBoost and shap.
RUN apt-get update \
    && apt-get install -y --no-install-recommends libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# ── Copy installed Python packages from the builder stage ────────────────────
COPY --from=builder /install /install

# ── Security: run as a non-root user ─────────────────────────────────────────
RUN groupadd --system appgroup \
    && useradd --system --gid appgroup --no-create-home appuser

WORKDIR /app

# ── Copy application source code ─────────────────────────────────────────────
# Deliberately copied AFTER dependency installation so that source-code changes
# don't invalidate the (expensive) dependency layer.
COPY --chown=appuser:appgroup models/ ./models/
COPY --chown=appuser:appgroup app/    ./app/
COPY --chown=appuser:appgroup requirements.txt .

USER appuser

# ── Networking ────────────────────────────────────────────────────────────────
EXPOSE 8080

# ── Entrypoint ────────────────────────────────────────────────────────────────
# app.main:app  → ml-service/app/main.py → FastAPI app object
# --workers 1   → single worker (model is loaded into process memory once;
#                 multiple workers would each load a full copy of the model)
CMD ["python", "-m", "uvicorn", "app.main:app", \
     "--host", "0.0.0.0", \
     "--port", "8080", \
     "--workers", "1", \
     "--log-level", "info"]
