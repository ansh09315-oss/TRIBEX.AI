from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    identifier: str
    role: str = "student" # student, verifier_tier1, verifier_tier2, ministry_admin

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_name: str

@router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
async def login(payload: LoginRequest):
    """
    Simulates role-based authentication for students and verification nodal officers.
    """
    token = f"mota_jwt_token_{payload.role}_{payload.identifier[:6]}"
    return LoginResponse(
        access_token=token,
        token_type="bearer",
        role=payload.role,
        user_name=f"Authorized {payload.role.replace('_', ' ').title()}"
    )
