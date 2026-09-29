import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Numeric, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum
from app.core.database import Base

class ApplicationStatus(str, enum.Enum):
    DRAFT = "draft"
    SYNCED_OFFLINE = "synced_offline"
    ZKP_VERIFIED = "zkp_verified"
    NODE_SCRUTINY = "node_scrutiny"
    ESCALATED = "escalated"
    SANCTIONED = "sanctioned"
    DISBURSED = "disbursed"

class Application(Base):
    __tablename__ = "applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    applicant_id = Column(UUID(as_uuid=True), ForeignKey("applicants.id", ondelete="CASCADE"), nullable=False)
    scheme_name = Column(String(150), nullable=False)
    batch_upload_id = Column(String(64), nullable=True)
    is_offline_submission = Column(Boolean, default=False)
    zkp_token = Column(String(255), nullable=True)
    current_stage = Column(SQLEnum(ApplicationStatus, name="application_status"), default=ApplicationStatus.DRAFT, index=True)
    grant_amount = Column(Numeric(12, 2), default=0.00, nullable=False)
    disbursed_amount = Column(Numeric(12, 2), default=0.00)
    institution_name = Column(String(255), nullable=True)
    course_name = Column(String(255), nullable=True)
    submission_timestamp = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    applicant = relationship("Applicant", back_populates="applications")
    sla_records = relationship("SlaTracking", back_populates="application", cascade="all, delete-orphan")
