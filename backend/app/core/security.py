import hashlib
import uuid
from app.core.config import settings

def hash_aadhaar(aadhaar_number: str) -> str:
    """
    Computes a deterministic salted SHA-256 hash of an applicant's Aadhaar identifier.
    Used for inter-ministerial de-duplication cross-checks without storing plaintext.
    """
    clean_aadhaar = str(aadhaar_number).strip().replace(" ", "").replace("-", "")
    salted = f"{settings.SALT_PEPPER}:{clean_aadhaar}"
    return "sha256:" + hashlib.sha256(salted.encode("utf-8")).hexdigest()

def hash_bank_account(account_number: str, ifsc_code: str = "") -> str:
    """
    Generates a hashed bank identity token for NPCI payment routing.
    """
    clean_acc = str(account_number).strip().replace(" ", "")
    clean_ifsc = str(ifsc_code).strip().upper()
    salted = f"{settings.SALT_PEPPER}:{clean_ifsc}:{clean_acc}"
    return "sha256:" + hashlib.sha256(salted.encode("utf-8")).hexdigest()

def generate_zkp_token(applicant_hash: str, scheme_id: str) -> str:
    """
    Generates a mock cryptographic ZKP validation token.
    """
    raw = f"zkp_snark_{applicant_hash[:12]}_{scheme_id}_{uuid.uuid4().hex[:8]}"
    return raw
