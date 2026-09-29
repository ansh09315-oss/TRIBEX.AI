from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field
from datetime import datetime

# --- ZKP Verification Schemas ---
class ZkpVerifyRequest(BaseModel):
    full_name: str
    annual_income: float
    max_income_threshold: float = 600000.0
    caste_registry_code: str
    aadhaar_hash: Optional[str] = None
    state_code: str = "OD"

class ZkpVerifyResponse(BaseModel):
    status: str
    verified: bool
    zkp_token: str
    poseidon_commitment: str
    merkle_root: str
    constraints_evaluated: int = 4289
    execution_time_ms: float
    message: str

# --- De-Duplication Schemas ---
class DeduplicationRequest(BaseModel):
    aadhaar_sha256: str
    bank_acc_sha256: Optional[str] = None
    student_name: str
    claimed_scheme: str

class ConflictingScheme(BaseModel):
    portal_name: str
    scheme_name: str
    disbursed_amount: float
    sanction_year: int = 2025

class DeduplicationResponse(BaseModel):
    duplicate_detected: bool
    fraud_risk: str # "CLEAN", "LOW", "HIGH"
    active_scholarship_count: int
    conflicting_schemes: List[ConflictingScheme] = []
    recommended_action: str
    treasury_saved_amount: float = 0.0

# --- P2P Mesh Batch Sync Schemas ---
class MeshPacketPayload(BaseModel):
    packet_id: str
    source_node: str
    timestamp: str
    checksum: str
    applicant_data: Dict[str, Any]

class BatchSyncRequest(BaseModel):
    gateway_node_id: str = "GATEWAY-VILLAGE-VSAT-01"
    packets: List[MeshPacketPayload]

class BatchSyncResponse(BaseModel):
    success: bool
    synced_count: int
    batch_upload_id: str
    processed_application_ids: List[str]
    message: str

# --- SLA Escalation Schemas ---
class SlaStatusResponse(BaseModel):
    application_id: str
    applicant_name: str
    current_node_stage: str
    deadline_timestamp: datetime
    hours_remaining: float
    is_breached: bool
    is_escalated: bool
    escalation_tier: int
    sla_status: str

class AutoEscalateRequest(BaseModel):
    application_id: str
    reason: str = "7-Day Node Limit Exceeded"

class AutoEscalateResponse(BaseModel):
    success: bool
    application_id: str
    previous_tier: int
    new_tier: int
    escalated_to: str
    escalation_timestamp: datetime

# --- PVTG Drop-Out Risk Analytics Schemas ---
class PvtgDistrictRisk(BaseModel):
    district_name: str
    active_renewals: int
    dropouts_detected: int
    retention_rate_pct: float
    risk_score: float
    primary_risk_factor: str
    recommended_intervention: str
    alert_badge: str

class PvtgAnalyticsResponse(BaseModel):
    total_pvtg_scholars: int
    national_average_retention_rate: float
    disbursement_duration_avg_days: float
    historical_baseline_days: float = 128.0
    districts: List[PvtgDistrictRisk]
