-- ============================================================================
-- TribeX AI — Mock Seed Dataset
-- Ministry of Tribal Affairs (MoTA)
-- ============================================================================

-- 1. Insert Applicants (Tribal Scholars)
INSERT INTO applicants (id, full_name, caste_tribe_name, pvtg_group, state_code, district, phone_hash, created_at)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Birsa Murmu', 'Santhal', FALSE, 'OD', 'Mayurbhanj', 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', NOW() - INTERVAL '10 days'),
    ('22222222-2222-2222-2222-222222222222', 'Somu Madkam', 'Gond (Dandami Maria)', FALSE, 'CG', 'Narayanpur (Abujhmad)', 'sha256:cb25e084e7f7f7f31e819d2b726bef025960f00047fa3e2634f1644f288ecd04', NOW() - INTERVAL '3 days'),
    ('33333333-3333-3333-3333-333333333333', 'Sunita Munda', 'Munda', FALSE, 'JH', 'Khunti', 'sha256:3b94d48b7438e1e15e09b66d43f3729f28438a33ec65f122d81d4455b62883cc', NOW() - INTERVAL '5 days'),
    ('44444444-4444-4444-4444-444444444444', 'Rameshwar Baiga', 'Baiga', TRUE, 'MP', 'Mandla', 'sha256:2c624232cdd221771294dfbb310aca000a0df6ec9b5feb9cb952cc462ab4685c', NOW() - INTERVAL '9 days'),
    ('55555555-5555-5555-5555-555555555555', 'Anita Bhil', 'Bhil', FALSE, 'MP', 'Jhabua', 'sha256:19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7', NOW() - INTERVAL '2 days'),
    -- Fraud cases
    ('66666666-6666-6666-6666-666666666666', 'Devendra Rathwa', 'Rathwa', FALSE, 'GJ', 'Chhota Udepur', 'sha256:a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e', NOW() - INTERVAL '2 days'),
    ('77777777-7777-7777-7777-777777777777', 'Kailash Korwa', 'Korwa', TRUE, 'CG', 'Bilaspur', 'sha256:4355a46b19d348dc2f57c046f8ef63d4538ebb936000f3c9ee954a27460dd865', NOW() - INTERVAL '4 days');

-- 2. Insert Hashed Identities (Fiscal Protection & De-Duplication)
INSERT INTO hashed_identities (applicant_id, aadhaar_sha256, bank_acc_sha256, active_scholarship_count)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'sha256:d82e1c91152a48be294d12304918e7b1a2c3d4e5f60718293a4b5c6d7e8f9012', 'sha256:a1b2c3d4e5f60718', 1),
    ('22222222-2222-2222-2222-222222222222', 'sha256:4b76a08e331f88ca5819e01293847561a0b1c2d3e4f5061728394a5b6c7d8e9f', 'sha256:b2c3d4e5f6071829', 1),
    ('33333333-3333-3333-3333-333333333333', 'sha256:77bc09312adfe0184918237465910283a1b2c3d4e5f60718293a4b5c6d7e8f90', 'sha256:c3d4e5f60718293a', 1),
    ('44444444-4444-4444-4444-444444444444', 'sha256:1198e3bca440263f9182736450192837a1b2c3d4e5f60718293a4b5c6d7e8f90', 'sha256:d4e5f60718293a4b', 1),
    ('55555555-5555-5555-5555-555555555555', 'sha256:99887766554433221100aabbccddeeff00112233445566778899aabbccddeeff', 'sha256:e5f60718293a4b5c', 1),
    -- Fraud Duplicate #1: Already claimed on AICTE Pragati Portal
    ('66666666-6666-6666-6666-666666666666', 'sha256:9f8e7d6c5b4a32101234567890abcdef1234567890abcdef1234567890abcdef', 'sha256:f60718293a4b5c6d', 2),
    -- Fraud Duplicate #2: Already claimed on Chhattisgarh State e-Kalyan
    ('77777777-7777-7777-7777-777777777777', 'sha256:3a1b4c5d6e7f8091aabbccddeeff00112233445566778899aabbccddeeff0011', 'sha256:0718293a4b5c6d7e', 2);

-- 3. Insert Applications
INSERT INTO applications (id, applicant_id, scheme_name, batch_upload_id, is_offline_submission, zkp_token, current_stage, grant_amount, disbursed_amount, institution_name, course_name, submission_timestamp)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'NFST (National Fellowship for Higher Education of ST Students)', 'BATCH-ONLINE-001', FALSE, 'zkp_snark_9823ab41f0', 'disbursed', 456000.00, 456000.00, 'NIT Rourkela', 'Ph.D. Computer Science', NOW() - INTERVAL '10 days'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-2222-2222-2222-222222222222', 'Top Class Education Scheme for ST Students', 'BATCH-BLE-MESH-ABUJHMAD-04', TRUE, 'zkp_snark_3311bb88c2', 'node_scrutiny', 385000.00, 0.00, 'IIT Bombay', 'M.Tech Metallurgical Engineering', NOW() - INTERVAL '3 days'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'NOS (National Overseas Scholarship for ST Candidates)', 'BATCH-ONLINE-002', FALSE, 'zkp_snark_7712dd99e1', 'sanctioned', 3500000.00, 0.00, 'NLSIU Bengaluru', 'BA LLB (Hons)', NOW() - INTERVAL '5 days'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', '44444444-4444-4444-4444-444444444444', 'Post-Matric Scholarship for ST Students', 'BATCH-SCOUT-TABLET-09', TRUE, 'zkp_snark_1109aa44d7', 'escalated', 48000.00, 0.00, 'Govt Autonomous College Mandla', 'B.Sc. Botany', NOW() - INTERVAL '9 days'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '55555555-5555-5555-5555-555555555555', 'Top Class Education Scheme for ST Students', 'BATCH-ONLINE-003', FALSE, 'zkp_snark_4488cc22b5', 'zkp_verified', 280000.00, 0.00, 'AIIMS Bhopal', 'MBBS (3rd Year)', NOW() - INTERVAL '2 days'),
    -- Fraud Locked Applications
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', '66666666-6666-6666-6666-666666666666', 'Top Class Education Scheme for ST Students', 'BATCH-ONLINE-004', FALSE, 'zkp_snark_9911ee00a1', 'draft', 240000.00, 0.00, 'SVNIT Surat', 'B.Tech Mechanical', NOW() - INTERVAL '2 days'),
    ('gggggggg-gggg-gggg-gggg-gggggggggggg', '77777777-7777-7777-7777-777777777777', 'Post-Matric Scholarship for ST Students', 'BATCH-ONLINE-005', FALSE, 'zkp_snark_8822ff11b2', 'draft', 36000.00, 0.00, 'Bilaspur University', 'B.Com', NOW() - INTERVAL '4 days');

-- 4. Insert SLA Tracking Records (7-Day Limit per Node)
INSERT INTO sla_tracking (application_id, assigned_officer_id, node_stage, deadline_timestamp, is_escalated, escalated_tier, escalation_timestamp, notes)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'OFFICER-DISBURSED-01', 'NPCI DBT Dispersal', NOW() - INTERVAL '7 days', FALSE, 1, NULL, 'Disbursement successfully verified within 3.2 days.'),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'NODAL-IITB-102', 'Institutional Node Scrutiny', NOW() + INTERVAL '4 days', FALSE, 1, NULL, 'Scrutiny ongoing at IIT Bombay Tribal Cell.'),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'MOTA-SANCTION-DIR', 'Ministry Sanction & APB Mapping', NOW() + INTERVAL '2 days', FALSE, 1, NULL, 'Under final sanction review at MoTA Shastri Bhawan.'),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'DIST-COLL-MANDLA', 'Institutional Scrutiny Breached', NOW() - INTERVAL '2 days', TRUE, 2, NOW() - INTERVAL '1 day', 'Auto-escalated to District Collector Mandla due to 7-day college nodal delay.'),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'NODAL-AIIMS-BPL', 'Institutional Node Scrutiny', NOW() + INTERVAL '5 days', FALSE, 1, NULL, 'Fresh ZKP verified record queued.');

-- 5. Insert PVTG Retention Metrics (Predictive Analytics Data)
INSERT INTO pvtg_retention_metrics (district_name, year, active_renewals, dropouts_detected, risk_score, primary_risk_factor, recommended_intervention)
VALUES
    ('Rayagada (Dongria Kondh)', 2026, 1840, 38, 0.78, 'Hostel fee receipt latency & biometric NPCI mismatch', 'Mobile VLE Van Dispatched to Muniguda Block'),
    ('Mandla (Baiga)', 2026, 3410, 44, 0.82, 'Seasonal harvest migration & bank KYC branch distance (>25km)', 'Banking Correspondent Village Camp Scheduled'),
    ('Hazaribagh (Birhor)', 2026, 980, 16, 0.85, 'Secondary to higher-secondary transition paperwork', 'TribeX Mentor Assigned'),
    ('Nallamala (Chenchu)', 2026, 2150, 19, 0.89, 'Forest fringe connectivity gap for renewal filing', 'BLE Mesh Relay Installed at Checkpost #7'),
    ('Raigad (Katkari)', 2026, 4120, 25, 0.83, 'Brick-kiln seasonal migration disruption', 'Direct Cash DBT Advance Pre-Sanctioned');
