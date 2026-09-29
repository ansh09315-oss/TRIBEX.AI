import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Banknote, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { apiService } from '../services/api';

const MILESTONES = [
  { step: 1, title: 'Offline Hop / Submit', desc: 'BLE Mesh or Direct Web Ingest', icon: FileText },
  { step: 2, title: 'ZKP Verified', desc: 'Identity & Income Cleared', icon: ShieldCheck },
  { step: 3, title: 'Node Scrutiny', desc: 'College Nodal Officer Sign-off', icon: Building2 },
  { step: 4, title: 'Ministry Sanction', desc: 'MoTA Financial Allocation', icon: Landmark },
  { step: 5, title: 'DBT Dispersed', desc: 'NPCI Aadhaar Bridge Payout', icon: Banknote }
];

export const SlaTimelineTracker: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const [elapsedHours, setElapsedHours] = useState<number>(64);
  const [isEscalated, setIsEscalated] = useState<boolean>(false);
  const [escalatedTier, setEscalatedTier] = useState<string>('Tier 1 (College Nodal Officer)');

  const totalSlaHours = 168; // 7 days
  const remainingHours = totalSlaHours - elapsedHours;
  const isBreached = remainingHours <= 0;

  const handleSimulateDelay = async () => {
    const newElapsed = 192; // 8 days (breach!)
    setElapsedHours(newElapsed);
    setIsEscalated(true);
    setEscalatedTier('Tier 2 (District Collectorate & MoTA Supervisor)');
    await apiService.autoEscalateSla('TX-2026-90429');
  };

  const handleResetSla = () => {
    setElapsedHours(48);
    setIsEscalated(false);
    setEscalatedTier('Tier 1 (College Nodal Officer)');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. E-Commerce Milestone Stepper */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Banknote className="w-5 h-5 text-emerald-400" />
              Live DBT Delivery Timeline (E-Commerce Tracking)
            </h3>
            <p className="text-xs text-slate-400">
              End-to-end tracking with institutional SLA node accountability.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Sanctioned: ₹3,85,000
          </span>
        </div>

        {/* Stepper Track */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {MILESTONES.map((m) => {
            const isDone = currentStep >= m.step;
            const isCurrent = currentStep === m.step;
            const Icon = m.icon;

            return (
              <div
                key={m.step}
                onClick={() => setCurrentStep(m.step)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-xl ring-2 ring-emerald-500/20'
                    : isDone
                    ? 'bg-slate-900/90 border-emerald-500/40 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2.5 ${
                  isCurrent ? 'bg-emerald-500 text-slate-950 font-bold' : isDone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white mb-0.5 truncate">{m.title}</h4>
                <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Visual 7-Day SLA Countdown Clock Card */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isBreached ? 'bg-rose-950/25 border-rose-500/50 shadow-xl shadow-rose-950/30' : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isBreached ? 'bg-rose-500/20 text-rose-400' : 'bg-cyan-500/20 text-cyan-400'
            }`}>
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                Mandated 7-Day SLA Countdown Timer
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  isBreached ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-cyan-500/20 text-cyan-300'
                }`}>
                  {isBreached ? 'BREACHED — AUTO ESCALATED' : 'ACTIVE HEALTHY'}
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Current Assigned Node: <strong className="text-slate-200">{escalatedTier}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isBreached ? (
              <button
                onClick={handleSimulateDelay}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Simulate Delay & Trigger Escalation
              </button>
            ) : (
              <button
                onClick={handleResetSla}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
              >
                Reset SLA Timer
              </button>
            )}
          </div>
        </div>

        {/* Clock Digits Display */}
        <div className="grid grid-cols-4 gap-3 text-center my-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className={`text-2xl font-bold font-mono ${isBreached ? 'text-rose-400' : 'text-white'}`}>
              {String(Math.floor(Math.abs(remainingHours) / 24)).padStart(2, '0')}
            </span>
            <span className="block text-[10px] uppercase text-slate-500 mt-0.5">Days</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className={`text-2xl font-bold font-mono ${isBreached ? 'text-rose-400' : 'text-white'}`}>
              {String(Math.floor(Math.abs(remainingHours) % 24)).padStart(2, '0')}
            </span>
            <span className="block text-[10px] uppercase text-slate-500 mt-0.5">Hours</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className={`text-2xl font-bold font-mono ${isBreached ? 'text-rose-400' : 'text-white'}`}>
              42
            </span>
            <span className="block text-[10px] uppercase text-slate-500 mt-0.5">Minutes</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className={`text-2xl font-bold font-mono ${isBreached ? 'text-rose-400' : 'text-emerald-400'}`}>
              18
            </span>
            <span className="block text-[10px] uppercase text-slate-500 mt-0.5">Seconds</span>
          </div>
        </div>

        {isEscalated && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>SLA Threshold Breached:</strong> Verification node bypassed. File dispatched automatically to District Collectorate.
              </span>
            </div>
            <span className="font-mono text-[10px] text-rose-400 font-bold">ESCALATION_ACTIVE</span>
          </div>
        )}
      </div>

    </div>
  );
};
