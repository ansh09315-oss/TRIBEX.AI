import React from 'react';
import { 
  Users, 
  BarChart3, 
  Cpu, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Radio, 
  Lock, 
  Clock, 
  Layers 
} from 'lucide-react';
import ProblemSolutionSlider from '../../src/components/ProblemSolutionSlider';
import ArchitecturalFlowchart from '../../src/components/ArchitecturalFlowchart';

interface LandingProps {
  onNavigate: (page: 'landing' | 'applicant' | 'ministry' | 'simulator') => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">Ministry of Tribal Affairs (MoTA)</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono">Next-Gen Governance Ecosystem</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Unified AI Scholarship Ecosystem for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Tribal Empowerment</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Offline-first BLE mesh sync, cross-lingual voice form-filling, zero-knowledge identity proofs, and automated 7-day DBT escalation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('applicant')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 flex items-center gap-2 cursor-pointer shadow-xl shadow-emerald-500/20"
          >
            <Users className="w-4 h-4" />
            Launch Beneficiary Portal
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('ministry')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Ministry Admin HQ
          </button>

          <button
            onClick={() => onNavigate('simulator')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-2 cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            Judge Sandbox Demo
          </button>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 backdrop-blur-xl">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Processing Speed</span>
            <span className="text-3xl font-extrabold font-mono text-emerald-400 block mt-1">4.6 Days</span>
            <span className="text-xs text-slate-400">Guaranteed 7-Day SLA</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Direct Benefit Disbursed</span>
            <span className="text-3xl font-extrabold font-mono text-white block mt-1">₹482.4 Cr</span>
            <span className="text-xs text-slate-400">NPCI Aadhaar Bridge</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Zero-Knowledge Inquiries</span>
            <span className="text-3xl font-extrabold font-mono text-cyan-300 block mt-1">1.48M+</span>
            <span className="text-xs text-slate-400">0 Raw PDFs Stored</span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Fraud Intercepted</span>
            <span className="text-3xl font-extrabold font-mono text-rose-400 block mt-1">₹38.7 Cr</span>
            <span className="text-xs text-slate-400">14 Registries Cross-Checked</span>
          </div>
        </div>
      </div>

      {/* Problem vs. Solution Interactive Slider */}
      <ProblemSolutionSlider />

      {/* 5-Pillar Architectural Flowchart */}
      <ArchitecturalFlowchart />

    </div>
  );
};
