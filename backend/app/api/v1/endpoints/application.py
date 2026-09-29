import uuid
from typing import List, Any
from fastapi import APIRouter, HTTPException, status
from app.schemas.application import BatchSyncRequest, BatchSyncResponse
from app.services.mesh_sync_service import mesh_sync_service

router = APIRouter()

# In-memory application ledger for high-speed simulation & testing
MOCK_APPLICATIONS_LEDGER = [
    {
        "id": "TX-2026-90412",
        "applicant_name": "Birsa Murmu",
        "tribe": "Santhal",
        "scheme": "NFST Ph.D. Fellowship",
        "amount": 456000.0,
        "stage": "disbursed",
        "is_offline": False,
        "zkp_verified": True
    },
    {
        "id": "TX-2026-90429",
        "applicant_name": "Somu Madkam",
        "tribe": "Gond",
        "scheme": "Top Class Education Scheme",
        "amount": 385000.0,
        "stage": "node_scrutiny",
        "is_offline": True,
        "zkp_verified": True
    },
    {
        "id": "TX-2026-90455",
        "applicant_name": "Sunita Munda",
        "tribe": "Munda",
        "scheme": "NOS Overseas Fellowship",
        "amount": 3500000.0,
        "stage": "sanctioned",
        "is_offline": False,
        "zkp_verified": True
    }
]

@router.post("/batch-sync", response_model=BatchSyncResponse, status_code=status.HTTP_201_CREATED)
async def sync_offline_ble_mesh_batch(payload: BatchSyncRequest):
    """
    Processes batch uploads transmitted via P2P BLE Mesh hops from deep-forest scout devices.
    Validates packet payload CRC32 checksums, registers applications into the central ledger,
    and initializes the 7-day SLA countdown timers.
    """
    if not payload.packets:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Batch payload contains 0 packets."
        )

    result = mesh_sync_service.process_offline_batch(
        gateway_node=payload.gateway_node_id,
        packets=payload.packets
    )

    return BatchSyncResponse(
        success=True,
        synced_count=result["synced_count"],
        batch_upload_id=result["batch_upload_id"],
        processed_application_ids=result["processed_application_ids"],
        message=f"Successfully synced {result['synced_count']} offline applications to MoTA Core."
    )

@router.get("/", status_code=status.HTTP_200_OK)
async def list_active_applications():
    """
    Returns active scholarship applications with stage progression.
    """
    return {
        "total_count": len(MOCK_APPLICATIONS_LEDGER),
        "applications": MOCK_APPLICATIONS_LEDGER
    }
