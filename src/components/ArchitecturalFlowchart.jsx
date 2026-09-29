import React, { useState } from 'react';
import { 
  Mic, 
  Radio, 
  Lock, 
  ShieldCheck, 
  Clock, 
  Banknote, 
  Sparkles, 
  ArrowRight, 
  Activity,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

const FLOW_PILLARS = [
  {
    id: 'voice',
    title: '1. Multilingual Voice Assistant',
    tech: 'Whisper + Regional Dialect NER',
    desc: 'Spoken Santhali, Gondi, Bhili & Hindi parsed into schema fields instantly.',
    latency: '< 1.1s Tokenization',
    icon: Mic,
    accent: 'emerald',
    specs: 'Supports Ol Chiki, Devanagari & Romanized speech. 98.8% average NER accuracy.'
  },
  {
    id: 'mesh',
    title: '2. Deep-Forest BLE Mesh',
    tech: 'Bluetooth 5.3 Multi-Hop PDU',
    desc: 'Device-to-device hops carry filings through dense canopy to satellite hub.',
    latency: '3-Hop Relay (14km)',
    icon: Radio,
    accent: 'indigo',
    specs: 'Zero cellular tower dependency. Encrypted 2.4KB ChaCha20 batch payloads.'
  },
  {
    id: 'zkp',
    title: '3. Zero-Knowledge Trust Layer',
    tech: 'Groth16 / BN254 zk-SNARKs',
    desc: 'Mathematical verification of income & ST ancestry without storing raw PDFs.',
    latency: '820ms Proof Evaluation',
    icon: Lock,
    accent: 'cyan',
    specs: '4,289 R1CS gates. Poseidon hash commitment verifies National Tribe Registry.'
  },
  {
    id: 'dedup',
    title: '4. Inter-Ministerial De-Dup',
    tech: 'SHA-256 Token Cross-Registry',
    desc: 'Instant cross-checks across MoTA, AICTE, UGC, and 11 State portals.',
    latency: '< 45ms Redis Hash Match',
    icon: ShieldCheck,
    accent: 'rose',
    specs: 'Detects duplicate grant claims and double-dipping, freezing treasury escrow.'
  },
  {
    id: 'dbt',
    title: '5. Automated DBT SLA Escalation',
    tech: 'NPCI Aadhaar Payment Bridge',
    desc: 'Dynamic 7-day countdown with auto-escalation to District Collector & MoTA.',
    latency: '4.6 Days Avg Disbursement',
    icon: Banknote,
    accent: 'amber',
    specs: 'Direct treasury debit via APB. Auto-escalates from Tier 1 to Tier 2 on Day 7.'
  }
];

export default function ArchitecturalFlowchart() {
  const [selectedPillar, setSelectedPillar] = useState(FLOW_PILLARS[0]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center justify-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          End-to-End System Pipeline
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          The 5 Pillars of TribeX AI Architecture
        </h2>
        <p className="text-xs text-slate-400 max-w-xl mx-auto">
          Click any node below to inspect real-time cryptographic and transport telemetry.
        </p>
      </div>

      {/* Interactive Flowchart Horizontal Pipeline */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
        
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative z-10">
          {FLOW_PILLARS.map((pillar, idx) => {
            const isSelected = selectedPillar.id === pillar.id;
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-xl shadow-cyan-950/50 ring-2 ring-cyan-500/20 scale-102'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      pillar.accent === 'emerald' ? 'bg-emerald-500/20 text-emerald-400' :
                      pillar.accent === 'indigo' ? 'bg-indigo-500/20 text-indigo-400' :
                      pillar.accent === 'cyan' ? 'bg-cyan-500/20 text-cyan-400' :
                      pillar.accent === 'rose' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      Pillar {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-white mb-1 leading-snug">{pillar.title}</h3>
                  <span className="text-[10px] font-mono text-cyan-300 block mb-2">{pillar.tech}</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>Latency:</span>
                  <strong className="text-emerald-400">{pillar.latency}</strong>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node Telemetry Drawer */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">{selectedPillar.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {selectedPillar.tech}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{selectedPillar.specs}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-right">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 block">Throughput Benchmark</span>
              <span className="text-xs font-mono font-bold text-emerald-400">{selectedPillar.latency}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
