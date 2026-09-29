from fastapi import APIRouter, status
from app.schemas.application import PvtgAnalyticsResponse, PvtgDistrictRisk

router = APIRouter()

MOCK_DISTRICT_RISKS = [
    PvtgDistrictRisk(
        district_name="Rayagada (Dongria Kondh - Odisha)",
        active_renewals=1840,
        dropouts_detected=38,
        retention_rate_pct=78.5,
        risk_score=0.78,
        primary_risk_factor="Hostel fee receipt latency & biometric mismatch",
        recommended_intervention="Dispatch Mobile VLE Van to Muniguda Block",
        alert_badge="CRITICAL_RISK"
    ),
    PvtgDistrictRisk(
        district_name="Mandla (Baiga - Madhya Pradesh)",
        active_renewals=3410,
        dropouts_detected=44,
        retention_rate_pct=82.1,
        risk_score=0.82,
        primary_risk_factor="Seasonal harvest migration & bank KYC branch distance >25km",
        recommended_intervention="Schedule Village Banking Correspondent Camp",
        alert_badge="HIGH_RISK"
    ),
    PvtgDistrictRisk(
        district_name="Hazaribagh (Birhor - Jharkhand)",
        active_renewals=980,
        dropouts_detected=16,
        retention_rate_pct=84.6,
        risk_score=0.85,
        primary_risk_factor="Higher secondary transition paperwork gaps",
        recommended_intervention="Assign Dedicated MoTA Tribal Mentor",
        alert_badge="MODERATE_RISK"
    ),
    PvtgDistrictRisk(
        district_name="Nallamala (Chenchu - Andhra Pradesh & Telangana)",
        active_renewals=2150,
        dropouts_detected=19,
        retention_rate_pct=89.2,
        risk_score=0.89,
        primary_risk_factor="Fringe connectivity limits for renewal verification",
        recommended_intervention="Install BLE Mesh Repeater Node at Checkpost #7",
        alert_badge="MODERATE_RISK"
    ),
    PvtgDistrictRisk(
        district_name="Raigad (Katkari - Maharashtra)",
        active_renewals=4120,
        dropouts_detected=25,
        retention_rate_pct=83.4,
        risk_score=0.83,
        primary_risk_factor="Brick kiln seasonal family displacement",
        recommended_intervention="Pre-Sanction Emergency Stipend Advance",
        alert_badge="HIGH_RISK"
    )
]

@router.get("/pvtg-dropout-risk", response_model=PvtgAnalyticsResponse, status_code=status.HTTP_200_OK)
async def get_pvtg_dropout_risk_analytics():
    """
    Returns AI-driven dropout vulnerability predictions across 75 notified PVTG corridors,
    disbursement velocity benchmarks, and targeted administrative intervention recommendations.
    """
    return PvtgAnalyticsResponse(
        total_pvtg_scholars=84290,
        national_average_retention_rate=86.4,
        disbursement_duration_avg_days=4.6,
        historical_baseline_days=128.0,
        districts=MOCK_DISTRICT_RISKS
    )
