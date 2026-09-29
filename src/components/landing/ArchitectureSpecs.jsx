import React from 'react';
import { 
  Layers, 
  Cpu, 
  Database, 
  Server, 
  ShieldCheck, 
  Radio, 
  Code2, 
  Terminal, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  GitBranch,
  Boxes
} from 'lucide-react';

export default function ArchitectureSpecs() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-white tracking-tight">
                TribeX AI — System Architecture & Engineering Contracts
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Designed as a high-performance, fault-tolerant, and zero-knowledge cryptographic ecosystem for the Ministry of Tribal Affairs (MoTA).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Production Ready Spec v2.4
            </span>
          </div>
        </div>
      </div>

      {/* Layer 1: Architecture Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Offline Edge Layer</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Service Worker (Cache API + IndexedDB) with BLE 5.3 Advertising PDU mesh for deep forest filing without cellular towers.
          </p>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Cryptographic Trust</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Groth16 / BN254 zk-SNARK circuits evaluate income thresholds and ST Registry Merkle roots without storing raw PDFs.
          </p>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">3. De-Duplication Core</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            FastAPI microservices cross-referencing SHA-256 hashed beneficiary tokens against 14 national registries (AICTE, UGC, States).
          </p>
        </div>

        <div className="glass-panel rounded-xl p-5 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">4. DBT SLA Engine</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dynamic 7-day SLA countdown with auto-escalation from College Officer to District Collector and MoTA Joint Secretary.
          </p>
        </div>

      </div>

      {/* Layer 2: PostgreSQL Schema & Redis Caching Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Postgres SQL Schema Preview */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-300">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                PostgreSQL Schema Definition (MoTA DB)
              </span>
            </div>
            <span className="text-[10px] text-slate-400">schema.sql</span>
          </div>

          <pre className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-900">
{`-- Table: Beneficiary Applications Ledger
CREATE TABLE mota_applications (
    application_id VARCHAR(32) PRIMARY KEY,
    applicant_hash VARCHAR(64) NOT NULL, -- SHA-256 (Aadhaar + Salt)
    tribe_registry_code VARCHAR(32) NOT NULL,
    tribe_group VARCHAR(64) NOT NULL,
    is_pvtg_flag BOOLEAN DEFAULT FALSE,
    scheme_code VARCHAR(32) NOT NULL,
    sanctioned_amount NUMERIC(12, 2) NOT NULL,
    zkp_proof_commitment BYTEA NOT NULL,
    zkp_verified_at TIMESTAMP WITH TIME ZONE,
    stage_status VARCHAR(32) DEFAULT 'SUBMITTED',
    sla_filing_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    sla_escalation_tier INT DEFAULT 1,
    filing_channel VARCHAR(24) DEFAULT 'BLE_MESH'
);

-- Table: Inter-Ministerial Deduplication Registry
CREATE TABLE cross_ministerial_tokens (
    token_hash VARCHAR(64) PRIMARY KEY,
    beneficiary_name VARCHAR(128) NOT NULL,
    portal_source VARCHAR(32) NOT NULL, -- MoTA, AICTE, UGC, STATE
    active_sanction_amount NUMERIC(12, 2) NOT NULL,
    escrow_lock_status BOOLEAN DEFAULT FALSE
);`}
          </pre>
        </div>

        {/* Redis & FastAPI Microservice Contracts */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-300">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                FastAPI / Redis High-Speed Layer
              </span>
            </div>
            <span className="text-[10px] text-slate-400">api_routes.py</span>
          </div>

          <pre className="mt-4 p-4 rounded-xl bg-slate-950 text-slate-300 overflow-x-auto text-[11px] leading-relaxed border border-slate-900">
{`# FastAPI Route: Instant Inter-Ministerial Double-Dipping Check
@app.post("/api/v1/dedup/verify")
async def verify_duplicate_claim(payload: DeDupCheckRequest):
    # Instant Sub-millisecond Redis lookup
    cached_claim = await redis_client.get(f"claim:{payload.token_hash}")
    if cached_claim:
        return {
            "duplicate_detected": True,
            "risk_score": 98.4,
            "action": "LOCK_ESCROW",
            "conflicting_portal": cached_claim["portal"]
        }
    
    # Query distributed state registries asynchronously
    return {"duplicate_detected": False, "status": "CLEARED"}

# FastAPI Route: Zero-Knowledge Proof Verifier Circuit
@app.post("/api/v1/zkp/verify-eligibility")
async def verify_zk_proof(proof: ZkProofPayload):
    # Verifies pairing equation e(A, B) = e(alpha, beta)...
    is_valid = zk_verifier_engine.verify_groth16(proof)
    return {"proof_valid": is_valid, "mode": "ZERO_KNOWLEDGE"}`}
          </pre>
        </div>

      </div>

    </div>
  );
}
