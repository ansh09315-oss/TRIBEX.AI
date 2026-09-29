import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Key, 
  FileText, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { generateZkProof } from '../utils/zkpSimulation';

export default function ZkpVerifier({
  applicantName = 'Birsa Murmu',
  income = 120000,
  maxLimit = 600000,
  tribeId = 'ST-OD-2024-8849'
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [proofData, setProofData] = useState(null);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const proof = await generateZkProof({
        fullName: applicantName,
        rawIncome: income,
        maxIncomeThreshold: maxLimit,
        tribeId: tribeId
      });
      setProofData(proof);
    } catch (e) {
      console.error(e);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Zero-Knowledge Identity Verification Engine
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                Groth16 BN254
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Evaluates caste & income qualification without centralizing identity papers.
            </p>
          </div>
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-110 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer shrink-0"
        >
          {isVerifying ? (
            <>
              <Cpu className="w-3.5 h-3.5 animate-spin" />
              Evaluating Circuit...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Verify via ZKP State Registry
            </>
          )}
        </button>
      </div>

      {proofData ? (
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs font-mono space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 glow-emerald">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Status: Eligible [YES]
            </span>
            <span className="text-[10px] text-slate-400">
              Proof latency: {proofData.executionTimeMs}ms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
            <div>
              <span className="text-slate-500 block text-[10px]">Poseidon Commitment:</span>
              <span className="text-cyan-300 truncate block">{proofData.publicSignals[0]}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">National Merkle Root:</span>
              <span className="text-emerald-300 truncate block">{proofData.publicSignals[3]}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Click button above to evaluate zero-knowledge witness.</span>
          <span className="font-mono text-[10px] text-slate-500">4,289 Gates Ready</span>
        </div>
      )}
    </div>
  );
}
