import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Cpu, 
  Code2, 
  FileCheck2,
  Sparkles,
  Info
} from 'lucide-react';
import { generateZkProof } from '../../utils/zkpSimulation';

export default function ZkpProofCard({ 
  formData, 
  zkpResult, 
  onProofGenerated, 
  isGeneratingProof 
}) {
  const [showInspector, setShowInspector] = useState(false);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 relative overflow-hidden">
      
      {/* Background Accent */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white flex items-center gap-2">
              Zero-Knowledge Trust Verification
              <span className="text-[10px] font-mono uppercase bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Privacy-Preserving
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Proves income threshold & ST ancestry without transmitting raw caste/salary certificates.
            </p>
          </div>
        </div>

        {zkpResult && (
          <button
            onClick={() => setShowInspector(!showInspector)}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-mono"
          >
            <Code2 className="w-3.5 h-3.5" />
            {showInspector ? 'Hide Proof' : 'Inspect Circuit'}
          </button>
        )}
      </div>

      {/* Status Banner */}
      <div className="mt-4">
        {isGeneratingProof ? (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400 animate-spin shrink-0" />
            <div>
              <p className="text-xs font-semibold text-cyan-200">
                Evaluating Groth16 / Poseidon Constraints...
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Computing client-side witness proof for 4,289 cryptographic R1CS gates.
              </p>
            </div>
          </div>
        ) : zkpResult ? (
          <div className={`p-4 rounded-xl border transition-all ${
            zkpResult.isEligible
              ? 'bg-emerald-950/30 border-emerald-500/50'
              : 'bg-rose-950/30 border-rose-500/50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  zkpResult.isEligible ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}>
                  {zkpResult.isEligible ? <ShieldCheck className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold tracking-wide uppercase ${
                      zkpResult.isEligible ? 'text-emerald-300' : 'text-rose-300'
                    }`}>
                      {zkpResult.verificationVerdict.summaryBadgeText}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                      {zkpResult.executionTimeMs}ms
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Zero raw identity files stored centrally. Verification mathematically guaranteed.
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Merkle Root</span>
                <span className="text-xs font-mono font-semibold text-cyan-300">
                  {zkpResult.publicSignals[3]}
                </span>
              </div>
            </div>

            {/* Circuit Inspector Dropdown */}
            {showInspector && (
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono space-y-2">
                <div className="flex justify-between text-slate-400">
                  <span>Circuit:</span>
                  <span className="text-slate-200">{zkpResult.circuitName}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Commitment (Poseidon):</span>
                  <span className="text-emerald-400 truncate max-w-[200px]">{zkpResult.publicSignals[0]}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Nullifier Hash:</span>
                  <span className="text-cyan-400 truncate max-w-[200px]">{zkpResult.publicSignals[1]}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Proof π_A:</span>
                  <span className="text-slate-300 truncate max-w-[200px]">{zkpResult.proofWitness.pi_a[0]}</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[10px] flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>State Registry verified without revealing Aadhaar number or salary payslips.</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Key className="w-4 h-4 text-cyan-400" />
              <span>Pending Cryptographic Witness Evaluation</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">
              Auto-computes on form submission
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
