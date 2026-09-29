import uuid
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Integer, Float, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class SlaTracking(Base):
    __tablename__ = "sla_tracking"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    application_id = Column(UUID(as_uuid=True), ForeignKey("applications.id", ondelete="CASCADE"), nullable=False)
    assigned_officer_id = Column(String(64), nullable=True)
    node_stage = Column(String(100), nullable=False)
    deadline_timestamp = Column(DateTime(timezone=True), nullable=False, index=True)
    is_escalated = Column(Boolean, default=False)
    escalated_tier = Column(Integer, default=1)
    escalation_timestamp = Column(DateTime(timezone=True), nullable=True)
    notes = Column(Text, nullable=True)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    application = relationship("Application", back_populates="sla_records")


class PvtgRetentionMetric(Base):
    __tablename__ = "pvtg_retention_metrics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    district_name = Column(String(150), nullable=False)
    year = Column(Integer, nullable=False)
    active_renewals = Column(Integer, default=0)
    dropouts_detected = Column(Integer, default=0)
    risk_score = Column(Float, default=0.0, nullable=False)
    primary_risk_factor = Column(String(255), nullable=True)
    recommended_intervention = Column(String(255), nullable=True)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
