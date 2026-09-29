from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, status
from app.schemas.application import SlaStatusResponse, AutoEscalateRequest, AutoEscalateResponse

router = APIRouter()

MOCK_SLA_DATABASE = {
    "TX-2026-90412": {
        "applicant_name": "Birsa Murmu",
        "node": "NPCI DBT Dispersal",
        "elapsed_hours": 76.0,
        "is_breached": False,
        "is_escalated": False,
        "tier": 1,
        "status": "COMPLETED_WITHIN_SLA"
    },
    "TX-2026-90429": {
        "applicant_name": "Somu Madkam",
        "node": "Institutional Node Scrutiny",
        "elapsed_hours": 62.0,
        "is_breached": False,
        "is_escalated": False,
        "tier": 1,
        "status": "HEALTHY"
    },
    "TX-2026-90480": {
        "applicant_name": "Rameshwar Baiga",
        "node": "Delayed at Nodal Officer Desk",
        "elapsed_hours": 188.0, # Breached 168h!
        "is_breached": True,
        "is_escalated": True,
        "tier": 2,
        "status": "BREACHED_ESCALATED"
    }
}

@router.get("/status/{application_id}", response_model=SlaStatusResponse, status_code=status.HTTP_200_OK)
async def get_application_sla_status(application_id: str):
    """
    Returns real-time 7-day SLA countdown status for an application.
    Calculates hours remaining and flags auto-escalations.
    """
    record = MOCK_SLA_DATABASE.get(application_id)
    if not record:
        # Default mock calculation
        record = {
            "applicant_name": "Student Beneficiary",
            "node": "Institutional Scrutiny",
            "elapsed_hours": 32.0,
            "is_breached": False,
            "is_escalated": False,
            "tier": 1,
            "status": "HEALTHY"
        }

    total_sla_hours = 168.0 # 7 Days
    remaining_hours = total_sla_hours - record["elapsed_hours"]
    now = datetime.now(timezone.utc)
    deadline = now + timedelta(hours=max(0.0, remaining_hours))

    return SlaStatusResponse(
        application_id=application_id,
        applicant_name=record["applicant_name"],
        current_node_stage=record["node"],
        deadline_timestamp=deadline,
        hours_remaining=remaining_hours,
        is_breached=record["is_breached"],
        is_escalated=record["is_escalated"],
        escalation_tier=record["tier"],
        sla_status=record["status"]
    )

@router.post("/auto-escalate", response_model=AutoEscalateResponse, status_code=status.HTTP_200_OK)
async def trigger_auto_escalation(payload: AutoEscalateRequest):
    """
    Dynamically escalates delayed application to the next administrative tier:
    Tier 1: College Nodal Officer -> Tier 2: District Collectorate -> Tier 3: MoTA Joint Secretary.
    """
    now = datetime.now(timezone.utc)
    app_id = payload.application_id
    current_tier = 1
    if app_id in MOCK_SLA_DATABASE:
        current_tier = MOCK_SLA_DATABASE[app_id]["tier"]
    
    new_tier = min(3, current_tier + 1)
    escalated_targets = {
        2: "District Collectorate & Tribal Welfare Officer",
        3: "Joint Secretary (Scholarships), MoTA New Delhi"
    }

    if app_id in MOCK_SLA_DATABASE:
        MOCK_SLA_DATABASE[app_id]["tier"] = new_tier
        MOCK_SLA_DATABASE[app_id]["is_escalated"] = True
        MOCK_SLA_DATABASE[app_id]["status"] = "BREACHED_ESCALATED"

    return AutoEscalateResponse(
        success=True,
        application_id=app_id,
        previous_tier=current_tier,
        new_tier=new_tier,
        escalated_to=escalated_targets.get(new_tier, "State Director"),
        escalation_timestamp=now
    )
