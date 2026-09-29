-- ============================================================================
-- TribeX AI — Database Initialization Schema
-- Ministry of Tribal Affairs (MoTA), Government of India
-- Engine: PostgreSQL 16+
-- ============================================================================

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Custom Enumerations
CREATE TYPE application_status AS ENUM (
    'draft',
    'synced_offline',
    'zkp_verified',
    'node_scrutiny',
    'escalated',
    'sanctioned',
    'disbursed'
);

CREATE TYPE scheme_type AS ENUM (
    'NFST',
    'NOS'
);

CREATE TYPE user_role AS ENUM (
    'student',
    'verifier_tier1',
    'verifier_tier2',
    'ministry_admin'
);

-- 3. Core Tables

-- Table: applicants
CREATE TABLE IF NOT EXISTS applicants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    caste_tribe_name VARCHAR(150) NOT NULL,
    pvtg_group BOOLEAN DEFAULT FALSE,
    state_code VARCHAR(10) NOT NULL,
    district VARCHAR(150) NOT NULL,
    phone_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: hashed_identities (Fiscal Protection & De-Duplication)
CREATE TABLE IF NOT EXISTS hashed_identities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
    aadhaar_sha256 VARCHAR(64) UNIQUE NOT NULL,
    bank_acc_sha256 VARCHAR(64) NOT NULL,
    active_scholarship_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: applications
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
    scheme_name VARCHAR(150) NOT NULL,
    batch_upload_id VARCHAR(64),
    is_offline_submission BOOLEAN DEFAULT FALSE,
    zkp_token TEXT,
    current_stage application_status DEFAULT 'draft',
    grant_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    disbursed_amount NUMERIC(12, 2) DEFAULT 0.00,
    institution_name VARCHAR(255),
    course_name VARCHAR(255),
    submission_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: sla_tracking (7-Day Dynamic SLA Escalation Engine)
CREATE TABLE IF NOT EXISTS sla_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    assigned_officer_id VARCHAR(64),
    node_stage VARCHAR(100) NOT NULL,
    deadline_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    is_escalated BOOLEAN DEFAULT FALSE,
    escalated_tier INT DEFAULT 1,
    escalation_timestamp TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: pvtg_retention_metrics (Predictive Drop-Out Analytics)
CREATE TABLE IF NOT EXISTS pvtg_retention_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    district_name VARCHAR(150) NOT NULL,
    year INT NOT NULL,
    active_renewals INT DEFAULT 0,
    dropouts_detected INT DEFAULT 0,
    risk_score FLOAT NOT NULL DEFAULT 0.0,
    primary_risk_factor VARCHAR(255),
    recommended_intervention VARCHAR(255),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. High-Performance B-Tree Indexes
CREATE INDEX IF NOT EXISTS idx_hashed_identities_aadhaar ON hashed_identities USING btree (aadhaar_sha256);
CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications USING btree (current_stage);
CREATE INDEX IF NOT EXISTS idx_sla_deadline ON sla_tracking USING btree (deadline_timestamp);
CREATE INDEX IF NOT EXISTS idx_applicants_pvtg ON applicants USING btree (pvtg_group);
CREATE INDEX IF NOT EXISTS idx_pvtg_metrics_district ON pvtg_retention_metrics USING btree (district_name, year);
