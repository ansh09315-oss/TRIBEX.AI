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
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Zap,
  DollarSign
} from 'lucide-react';

export default function HeroLanding({ onSelectPersona, onOpenSandbox }) {
  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* Hero Section */}
      <div className="relative text-center max-w-4xl mx-auto space-y-6">
        
        {/* Glow Spheres */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-cyan-500/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* National Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">Ministry of Tribal Affairs (MoTA)</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-mono">Next-Gen Governance Ecosystem</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Unified AI Scholarship Ecosystem for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Tribal Empowerment</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Eliminating bureaucratic bottlenecks, fraud, and digital connectivity divides. Features deep-forest offline BLE mesh sync, cross-lingual voice filing, zero-knowledge verification, and automated 7-day DBT escalation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={() => onSelectPersona('student')}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer hover:scale-102"
          >
            <Users className="w-4 h-4" />
            Launch Beneficiary Portal
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectPersona('admin')}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Ministry Admin HQ
          </button>

          <button
            onClick={onOpenSandbox}
            className="px-6 py-3 rounded-xl text-sm font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Cpu className="w-4 h-4" />
            Judge Sandbox (1-Click Demo)
          </button>
        </div>

      </div>

      {/* Live Ecosystem Metrics Banner */}
      <div className="max-w-6xl mx-auto">
        <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Direct Benefit Disbursed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 block mt-1">
              ₹482.4 Cr
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">100% via NPCI Aadhaar Bridge</span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Processing Speed
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 block mt-1">
              4.6 Days
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">Down from 128 days baseline</span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Fraud Double-Dips Blocked
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-400 block mt-1">
              ₹38.7 Cr
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">Saved across 14 registries</span>
          </div>

          <div className="text-center sm:text-left">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Active PVTG Beneficiaries
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-indigo-300 block mt-1">
              84,290
            </span>
            <span className="text-xs text-slate-400 mt-0.5 block">Across 75 vulnerable tribes</span>
          </div>

        </div>
      </div>

      {/* Breakthrough Pillars Grid */}
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
            Architectural Breakthroughs
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Engineered for Deep-Forest Reach & Zero Fraud
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Deep-Forest BLE Mesh Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enables offline filing in dense canopy pockets (Abujhmad, Bastar) where mobile signals fail. Packets hop device-to-device to the village satellite router.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Cross-Lingual AI Voice Assistant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supports Santhali, Gondi, Bhili, Hindi, and English. Multilingual speech models extract structured identity fields directly into application forms.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Zero-Knowledge Trust Layer</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No bulky PDF uploads. Evaluates zk-SNARK cryptographic proofs to confirm income and ST ancestry without storing sensitive identity documents centrally.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-rose-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Inter-Ministerial De-Duplication</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant sub-millisecond cross-checks across MoTA, AICTE, UGC, and 11 State portals to prevent double-dipping and ghost beneficiaries.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-amber-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Automated 7-Day SLA Escalation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamic countdown timer flags delayed applications and auto-escalates to District Collectors and Joint Secretaries, ending bureaucratic inertia.
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Predictive PVTG Drop-Out AI</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Early warning heatmaps detect retention drops among particularly vulnerable tribal groups, deploying mobile VLE vans and emergency stipend advances.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
