import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Applicant(Base):
    __tablename__ = "applicants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(255), nullable=False)
    caste_tribe_name = Column(String(150), nullable=False)
    pvtg_group = Column(Boolean, default=False)
    state_code = Column(String(10), nullable=False)
    district = Column(String(150), nullable=False)
    phone_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    identity = relationship("HashedIdentity", back_populates="applicant", uselist=False, cascade="all, delete-orphan")
    applications = relationship("Application", back_populates="applicant", cascade="all, delete-orphan")


class HashedIdentity(Base):
    __tablename__ = "hashed_identities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    applicant_id = Column(UUID(as_uuid=True), ForeignKey("applicants.id", ondelete="CASCADE"), nullable=False)
    aadhaar_sha256 = Column(String(64), unique=True, nullable=False, index=True)
    bank_acc_sha256 = Column(String(64), nullable=False)
    active_scholarship_count = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    applicant = relationship("Applicant", back_populates="identity")
