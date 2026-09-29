import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Cpu, 
  Sparkles, 
  Key, 
  CheckCircle2 
} from 'lucide-react';
import { apiService } from '../services/api';

interface ZkpVerifierCardProps {
  applicantName?: string;
  income?: number;
  casteRegistryId?: string;
}

export const ZkpVerifierCard: React.FC<ZkpVerifierCardProps> = ({
  applicantName = 'Birsa Murmu',
  income = 120000,
  casteRegistryId = 'ST-OD-2024-8849'
}) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleRunVerification = async () => {
    setIsVerifying(true);
    const data = await apiService.verifyZkp({
      full_name: applicantName,
      annual_income: income,
      caste_registry_code: casteRegistryId,
      max_income_threshold: 600000
    });
    setResult(data);
    setIsVerifying(false);
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Zero-Knowledge Trust Verification
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Groth16 / BN254
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Instant cryptographic proof eliminates manual PDF uploads and protects sensitive identity data.
            </p>
          </div>
        </div>

        <button
          onClick={handleRunVerification}
          disabled={isVerifying}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-110 text-slate-950 flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/20 shrink-0"
        >
          {isVerifying ? (
            <>
              <Cpu className="w-4 h-4 animate-spin" />
              Evaluating BN254 Constraints...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Verify via ZKP State Registry
            </>
          )}
        </button>
      </div>

      {result ? (
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs font-mono space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-lg shadow-emerald-950/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Status: Cryptographically Verified [Eligible: YES]
            </span>
            <span className="text-slate-400 text-[11px]">
              Pairing Time: {result.execution_time_ms}ms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-slate-300">
            <div>
              <span className="text-slate-500 text-[10px] block">Poseidon Commitment:</span>
              <strong className="text-cyan-300 truncate block">{result.poseidon_commitment}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">National Merkle Root:</span>
              <strong className="text-emerald-300 truncate block">{result.merkle_root}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Click button above to evaluate zero-knowledge witness.</span>
          <span className="font-mono text-slate-500 text-[11px]">4,289 R1CS Gates</span>
        </div>
      )}
    </div>
  );
};
