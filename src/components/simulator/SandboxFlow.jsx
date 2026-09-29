import React, { useState } from 'react';
import { 
  Sparkles, 
  Radio, 
  Lock, 
  ShieldAlert, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Cpu, 
  Terminal, 
  Layers,
  Banknote,
  Send,
  Building2,
  Users
} from 'lucide-react';
import { generateZkProof } from '../../utils/zkpSimulation';

const SANDBOX_STEPS = [
  {
    step: 1,
    title: 'Offline Forest Filing',
    subtitle: 'Deep canopy scout records voice draft without cellular internet',
    badge: 'Offline-First PWA'
  },
  {
    step: 2,
    title: 'P2P BLE Mesh Hop',
    subtitle: 'Encrypted packet hops device-to-device through forest checkposts',
    badge: 'BLE 5.3 Mesh'
  },
  {
    step: 3,
    title: 'Zero-Knowledge Proof',
    subtitle: 'Proves income & ST ancestry without storing raw documents centrally',
    badge: 'Groth16 / BN254'
  },
  {
    step: 4,
    title: 'De-Duplication Audit',
    subtitle: 'Cross-checks hashes against AICTE, UGC, and State Portals',
    badge: 'Fiscal Protection'
  },
  {
    step: 5,
    title: 'NPCI DBT Escrow Release',
    subtitle: 'Funds released directly to student bank account in < 4.6 days',
    badge: 'Automated SLA'
  }
];

export default function SandboxFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isRunningSandbox, setIsRunningSandbox] = useState(false);
  const [stepData, setStepData] = useState({
    zkpProof: null,
    bleTelemetry: null,
    deDupVerified: false,
    dbtDisbursed: false
  });

  const runFullSandbox = async () => {
    setIsRunningSandbox(true);
    setCurrentStep(1);

    // Step 1: Forest Filing
    await new Promise(r => setTimeout(r, 1000));
    setCurrentStep(2);
    setStepData(prev => ({ ...prev, bleTelemetry: 'Hop 1 -> Hop 2 -> Hop 3 Gateway Acquired (2.4KB CRC32 Valid)' }));

    // Step 2: BLE Mesh Hop
    await new Promise(r => setTimeout(r, 1200));
    setCurrentStep(3);

    // Step 3: Compute ZKP
    const proof = await generateZkProof({
      fullName: 'Somu Madkam',
      rawIncome: '95000',
      maxIncomeThreshold: 600000,
      tribeId: 'ST-CG-2024-4192',
      aadhaarNumber: '991823749102'
    });
    setStepData(prev => ({ ...prev, zkpProof: proof }));

    // Step 4: De-Dup Check
    await new Promise(r => setTimeout(r, 1100));
    setCurrentStep(4);
    setStepData(prev => ({ ...prev, deDupVerified: true }));

    // Step 5: NPCI DBT Release
    await new Promise(r => setTimeout(r, 1100));
    setCurrentStep(5);
    setStepData(prev => ({ ...prev, dbtDisbursed: true }));
    setIsRunningSandbox(false);
  };

  const resetSandbox = () => {
    setCurrentStep(1);
    setIsRunningSandbox(false);
    setStepData({
      zkpProof: null,
      bleTelemetry: null,
      deDupVerified: false,
      dbtDisbursed: false
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Sandbox Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 text-indigo-400">
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Hackathon Evaluator & Judge Sandbox
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    End-to-End Simulation
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive step-by-step demonstration verifying the core breakthrough technologies of TribeX AI.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={runFullSandbox}
              disabled={isRunningSandbox}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isRunningSandbox ? 'Running Pipeline Simulation...' : 'Execute Full Live Demo (1-Click)'}
            </button>

            <button
              onClick={resetSandbox}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              title="Reset Sandbox"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step Indicator Banner */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-5 gap-3">
          {SANDBOX_STEPS.map((step) => {
            const isCurrent = currentStep === step.step;
            const isCompleted = currentStep > step.step || (step.step === 5 && stepData.dbtDisbursed);

            return (
              <div
                key={step.step}
                onClick={() => setCurrentStep(step.step)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                    : isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-mono px-2 py-0.2 rounded-full font-bold ${
                    isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                  }`}>
                    Step {step.step}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <h4 className="text-xs font-bold text-white truncate">{step.title}</h4>
                <span className="text-[10px] font-mono text-cyan-300 block mt-0.5">{step.badge}</span>
              </div>
            );
          })}
        </div>

      </div>

      {/* Active Step Interactive Sandbox Canvas */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        
        {/* Step 1: Forest Filing */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Step 1: Offline Deep-Forest Filing (Abujhmad Sector)</h4>
                <p className="text-xs text-slate-400">No cell reception. Scout records audio draft with offline PWA storage.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                PWA IndexedDB Buffered
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Beneficiary Name:</span>
                <strong className="text-white">Somu Madkam</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Tribe Identity:</span>
                <strong className="text-cyan-300 font-mono">ST-CG-2024-4192 (Gond)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Income Stated:</span>
                <strong className="text-emerald-400 font-mono">₹95,000 / year</strong>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              When disconnected, TribeX PWA generates a compressed binary application envelope and triggers Bluetooth Low Energy Advertising PDUs to seek nearby mesh repeaters.
            </p>
          </div>
        )}

        {/* Step 2: BLE Mesh Hop */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Step 2: P2P Bluetooth Mesh Multi-Hop Dispatch</h4>
                <p className="text-xs text-slate-400">Packets travel across forest checkposts to reach the BharatNet satellite gateway.</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/30">
                BLE 5.3 Mesh En Route
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Hop 0: Scout Handheld (Abujhmad Zone C)</span>
                <span className="text-emerald-400">RSSI -82 dBm [SENT]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hop 1: Solar Checkpost Relay #04</span>
                <span className="text-cyan-400">RSSI -68 dBm [RELAYED]</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Hop 2: BharatNet Village Satellite Gateway</span>
                <span className="text-indigo-400">MQTT-SN Uplink [UPLOADED]</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: ZKP Verification */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Step 3: Zero-Knowledge Cryptographic Trust Layer</h4>
                <p className="text-xs text-slate-400">Proves income ≤ ₹6,00,000 without transmitting raw tax or salary papers.</p>
              </div>
              <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
                ZKP Verified (BN254)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-emerald-300 font-bold">
                <span>Verification Verdict:</span>
                <span>STATUS: ELIGIBLE [YES]</span>
              </div>
              <div className="text-slate-300">
                <span>Poseidon Commitment:</span>
                <span className="text-cyan-400 truncate block mt-0.5">0x8a91c49021e8471b...</span>
              </div>
              <div className="text-slate-300">
                <span>Merkle National Tribe Registry Root:</span>
                <span className="text-emerald-400 truncate block mt-0.5">0x3d7b420a81e9f1a2</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: De-Duplication */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Step 4: Inter-Ministerial Fiscal De-Duplication Cross-Check</h4>
                <p className="text-xs text-slate-400">Protects public treasury against double-dipping across AICTE, UGC, and State Portals.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                Zero Double-Dipping Match
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>AICTE Pragati / Saksham Registry:</span>
                <span className="text-emerald-400 font-bold">CLEAN (No Record)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>UGC Central Sector Schemes:</span>
                <span className="text-emerald-400 font-bold">CLEAN (No Record)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Chhattisgarh State e-Kalyan:</span>
                <span className="text-emerald-400 font-bold">CLEAN (Single Grant)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-emerald-300 font-bold">
                Treasury Protection Status: 100% Cleared for Direct Benefit Transfer
              </div>
            </div>
          </div>
        )}

        {/* Step 5: NPCI DBT Release */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white">Step 5: Direct Benefit Transfer (DBT) Escrow Release</h4>
                <p className="text-xs text-slate-400">SLA timer successfully completed in 3.8 days. Funds credited via Aadhaar Bridge.</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/15 px-3 py-1 rounded-lg border border-emerald-500/40">
                DBT Disbursed via NPCI
              </span>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border border-emerald-500/40 text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Disbursement Voucher: #TX-NPCI-90429</span>
                <span className="font-mono text-emerald-400 font-bold text-base">₹3,85,000</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 font-mono text-[11px] pt-1">
                <div>
                  <span className="text-slate-400 block text-[10px]">Beneficiary:</span>
                  <strong>Somu Madkam</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Institution:</span>
                  <strong>IIT Bombay</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Target Account:</span>
                  <strong>PUNB••••••1083</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">SLA Duration:</span>
                  <strong className="text-emerald-400">3.8 Days (Target: 7d)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
