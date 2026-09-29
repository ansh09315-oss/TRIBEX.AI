import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Radio, 
  Lock, 
  Clock, 
  Users, 
  BarChart3, 
  Cpu, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  Activity,
  Layers
} from 'lucide-react';
import ProblemSolutionSlider from './ProblemSolutionSlider';
import ArchitecturalFlowchart from './ArchitecturalFlowchart';

export default function Hero({ onSelectPersona, onOpenSandbox }) {
  return (
    <div className="space-y-20 py-4 sm:py-8">
      
      {/* Hero Header & Value Proposition */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6">
        
        {/* Glow Ambient Filter */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* National MoTA Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold shadow-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">Ministry of Tribal Affairs (MoTA)</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono">Next-Gen Governance Ecosystem</span>
        </div>

        {/* One-Liner Value Proposition */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Unified AI Scholarship Ecosystem for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Tribal Empowerment</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transforming tribal welfare distribution with deep-forest offline BLE mesh sync, cross-lingual voice filing, zero-knowledge cryptographic verification, and an automated 7-day DBT escalation engine.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onSelectPersona('student')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer hover:scale-102"
          >
            <Users className="w-4 h-4" />
            Launch Beneficiary Portal
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectPersona('admin')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Ministry Admin HQ
          </button>

          <button
            onClick={onOpenSandbox}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            Judge Sandbox (1-Click Demo)
          </button>
        </div>

      </div>

      {/* Interactive Live Preview Card (Fintech / Linear Style) */}
      <div className="max-w-5xl mx-auto">
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80 relative overflow-hidden shadow-2xl">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">tribex-core.mota.gov.in/live-telemetry</span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <Activity className="w-3 h-3 animate-pulse" />
              LIVE TELEMETRY ACTIVE
            </span>
          </div>

          {/* Metrics Counter Strip */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Processing SLA</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-extrabold font-mono text-emerald-400">4.6 Days</span>
                <span className="text-xs text-rose-400 line-through">6 Months</span>
              </div>
              <span className="text-[11px] text-emerald-300 mt-1 block">97.4% within SLA</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Direct Benefit Disbursed</span>
              <div className="mt-1">
                <span className="text-2xl font-extrabold font-mono text-white">₹482.4 Cr</span>
              </div>
              <span className="text-[11px] text-cyan-400 mt-1 block">NPCI Aadhaar Bridge</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Zero-Knowledge Inquiries</span>
              <div className="mt-1">
                <span className="text-2xl font-extrabold font-mono text-cyan-300">1.48M+</span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">0 Raw PDFs Stored</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Fraud Intercepted</span>
              <div className="mt-1">
                <span className="text-2xl font-extrabold font-mono text-rose-400">₹38.7 Cr</span>
              </div>
              <span className="text-[11px] text-rose-300/80 mt-1 block">14 Registries Cross-Checked</span>
            </div>

          </div>

        </div>
      </div>

      {/* Problem vs. Solution Interactive Slider */}
      <ProblemSolutionSlider />

      {/* Live Architectural Flowchart */}
      <ArchitecturalFlowchart />

    </div>
  );
}
