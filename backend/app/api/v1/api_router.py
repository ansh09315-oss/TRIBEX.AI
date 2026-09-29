from fastapi import APIRouter
from app.api.v1.endpoints import (
    zkp_verify,
    deduplication,
    application,
    sla_engine,
    analytics,
    auth
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(zkp_verify.router, prefix="/zkp", tags=["Zero-Knowledge Verification"])
api_router.include_router(deduplication.router, prefix="/cross-check", tags=["Inter-Ministerial De-Duplication"])
api_router.include_router(application.router, prefix="/applications", tags=["Applications & BLE Batch Sync"])
api_router.include_router(sla_engine.router, prefix="/sla", tags=["Automated 7-Day SLA Engine"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Predictive PVTG Analytics"])
