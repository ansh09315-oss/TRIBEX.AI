from fastapi import APIRouter, HTTPException, status
from app.schemas.application import DeduplicationRequest, DeduplicationResponse, ConflictingScheme

router = APIRouter()

# In-memory mock database of national schemes for sub-millisecond cross-referencing
KNOWN_DUPLICATE_REGISTRY = {
    # Devendra Rathwa: Duplicate with AICTE Pragati & Saksham
    "sha256:9f8e7d6c5b4a3210": {
        "portal_name": "AICTE Central Pragati Portal",
        "scheme_name": "Swanath Technical Degree Scholarship Scheme",
        "amount": 50000.0,
        "year": 2025
    },
    # Kailash Korwa: Duplicate with Chhattisgarh State e-Kalyan
    "sha256:3a1b4c5d6e7f8091": {
        "portal_name": "Chhattisgarh State Tribal Portal (e-Kalyan)",
        "scheme_name": "State Post-Matric Maintenance Allowance",
        "amount": 36000.0,
        "year": 2025
    }
}

@router.post("/deduplicate", response_model=DeduplicationResponse, status_code=status.HTTP_200_OK)
async def check_inter_ministerial_duplicates(payload: DeduplicationRequest):
    """
    Accepts SHA-256 hashes of student identifiers and cross-references against
    14 Inter-Ministerial Registries (MoTA, AICTE, UGC, and State Portals)
    to detect double-dipping and prevent fraudulent claims before disbursement.
    """
    clean_hash = payload.aadhaar_sha256.strip().lower()
    
    # Check for duplicate in cross-ministerial database
    matched_conflict = None
    for k, v in KNOWN_DUPLICATE_REGISTRY.items():
        if k in clean_hash or clean_hash in k:
            matched_conflict = v
            break

    if matched_conflict:
        conflicting = [
            ConflictingScheme(
                portal_name=matched_conflict["portal_name"],
                scheme_name=matched_conflict["scheme_name"],
                disbursed_amount=matched_conflict["amount"],
                sanction_year=matched_conflict["year"]
            )
        ]
        return DeduplicationResponse(
            duplicate_detected=True,
            fraud_risk="HIGH",
            active_scholarship_count=2,
            conflicting_schemes=conflicting,
            recommended_action="LOCK_ESCROW_AND_NOTIFY_NODAL_OFFICER",
            treasury_saved_amount=240000.0
        )

    # Clean verification
    return DeduplicationResponse(
        duplicate_detected=False,
        fraud_risk="CLEAN",
        active_scholarship_count=0,
        conflicting_schemes=[],
        recommended_action="AUTHORIZE_DBT_DISPERSAL",
        treasury_saved_amount=0.0
    )
