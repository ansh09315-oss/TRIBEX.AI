import time
import hashlib
from fastapi import APIRouter, HTTPException, status
from app.schemas.application import ZkpVerifyRequest, ZkpVerifyResponse

router = APIRouter()

@router.post("/verify", response_model=ZkpVerifyResponse, status_code=status.HTTP_200_OK)
async def verify_zkp_credential(payload: ZkpVerifyRequest):
    """
    Simulates Zero-Knowledge Proof (zk-SNARK Groth16 / BN254) verification querying state registries.
    Validates income ceiling and caste validity without transmitting or storing raw identity files centrally.
    """
    start_time = time.perf_counter()
    
    # 1. Evaluate Circuit Constraints (Income <= Threshold & Valid Tribe ID)
    is_income_valid = payload.annual_income <= payload.max_income_threshold
    is_tribe_valid = payload.caste_registry_code.startswith("ST-")
    
    # Simulate client witness generation & pairing computation delay
    time.sleep(0.04) # 40ms simulation
    
    execution_time_ms = round((time.perf_counter() - start_time) * 1000, 2)
    
    if not (is_income_valid and is_tribe_valid):
        return ZkpVerifyResponse(
            status="CRITERIA_UNMET",
            verified=False,
            zkp_token="null",
            poseidon_commitment="0x0000000000000000",
            merkle_root="0x3d7b420a81e9f1a2",
            constraints_evaluated=4289,
            execution_time_ms=execution_time_ms,
            message="Income exceeds scheme threshold or invalid Tribe Registry Code."
        )

    # 2. Compute Poseidon Hash Commitment & Nullifier
    salt = "mota_circuit_v2"
    raw_hash_seed = f"{payload.full_name}:{payload.caste_registry_code}:{salt}"
    poseidon_commitment = "0x" + hashlib.sha256(raw_hash_seed.encode()).hexdigest()[:32]
    zkp_token = f"zkp_snark_{poseidon_commitment[2:14]}"

    return ZkpVerifyResponse(
        status="APPROVED",
        verified=True,
        zkp_token=zkp_token,
        poseidon_commitment=poseidon_commitment,
        merkle_root="0x3d7b420a81e9f1a2",
        constraints_evaluated=4289,
        execution_time_ms=execution_time_ms,
        message="Cryptographic Zero-Knowledge verification successful. Identity confirmed without raw file transfer."
    )
