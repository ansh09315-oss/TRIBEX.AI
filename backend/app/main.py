from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api_router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Unified Scholarship & Fellowship Management Ecosystem for Ministry of Tribal Affairs (MoTA). Features ZKP verification, BLE mesh batch sync, inter-ministerial de-duplication, and automated DBT SLA escalation.",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API v1 Router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "system": "TribeX AI Core",
        "version": settings.VERSION,
        "mota_registry_node": "ONLINE_ACTIVE"
    }

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to TribeX AI API — Ministry of Tribal Affairs (MoTA)",
        "docs": f"{settings.API_V1_STR}/docs",
        "spec_version": "v2.4"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
