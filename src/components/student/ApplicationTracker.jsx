import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  ShieldCheck, 
  Building2, 
  Landmark, 
  Banknote, 
  FileText, 
  ChevronRight, 
  Search,
  ExternalLink,
  Lock,
  Radio
} from 'lucide-react';
import SlaCountdownTimer from '../common/SlaCountdownTimer';

const TIMELINE_STAGES = [
  {
    index: 0,
    title: 'Application Submitted',
    shortDesc: 'Deep-Forest BLE Mesh or Web Gateway',
    icon: FileText
  },
  {
    index: 1,
    title: 'Zero-Knowledge Proof Verified',
    shortDesc: 'Cryptographic Income & ST Registry check',
    icon: ShieldCheck
  },
  {
    index: 2,
    title: 'Institutional Node Scrutiny',
    shortDesc: 'College / Institute Nodal Officer Sign-off',
    icon: Building2
  },
  {
    index: 3,
    title: 'Ministry Sanction & APB Mapping',
    shortDesc: 'MoTA Financial Sanction & NPCI Linkage',
    icon: Landmark
  },
  {
    index: 4,
    title: 'Direct Benefit Transfer (DBT)',
    shortDesc: 'Funds Disbursed to Bank via Aadhaar Bridge',
    icon: Banknote
  }
];

export default function ApplicationTracker({ applications = [] }) {
  const [selectedAppId, setSelectedAppId] = useState(
    applications.length > 0 ? applications[0].id : 'TX-2026-90412'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const currentApp = applications.find(a => a.id === selectedAppId) || applications[0];

  return (
    <div className="space-y-6">
      
      {/* Application Selector Tabs / Search */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Live Beneficiary Tracker & DBT Timeline
              <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                7-Day MoTA Guarantee
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              E-commerce style end-to-end tracking with institutional SLA escalation audit trail.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs w-full sm:w-56"
            />
          </div>
        </div>

        {/* Quick Application Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {applications
            .filter(a => 
              a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
              a.applicantName.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedAppId(app.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer whitespace-nowrap border ${
                  selectedAppId === app.id
                    ? 'bg-emerald-500/15 border-emerald-500/50 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-mono font-bold text-emerald-400">{app.id}</span>
                <span className="text-slate-300">{app.applicantName}</span>
                <span className={`w-2 h-2 rounded-full ${
                  app.status === 'Disbursed' 
                    ? 'bg-emerald-400' 
                    : app.flaggedInDeDuplication 
                    ? 'bg-rose-500' 
                    : app.slaStatus === 'BREACHED_ESCALATED' 
                    ? 'bg-rose-400 animate-ping' 
                    : 'bg-cyan-400'
                }`} />
              </button>
            ))}
        </div>
      </div>

      {currentApp && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Timeline Card (2 Cols) */}
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800">
            
            {/* Beneficiary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{currentApp.applicantName}</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                    {currentApp.tribeId}
                  </span>
                  {currentApp.pvtgCategory && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      PVTG
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {currentApp.schemeName} • <span className="text-slate-300 font-semibold">{currentApp.institution}</span>
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Sanctioned Amount</span>
                <span className="text-lg font-bold font-mono text-emerald-400">
                  ₹{currentApp.grantAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Dynamic Stage Progression */}
            <div className="py-8">
              <div className="relative">
                
                {/* Connecting Line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800 -translate-x-1/2 sm:hidden" />
                <div className="hidden sm:block absolute left-6 right-6 top-6 h-0.5 bg-slate-800 -translate-y-1/2" />

                {/* Progress highlight line for desktop */}
                <div 
                  className="hidden sm:block absolute left-6 top-6 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 -translate-y-1/2 transition-all duration-700"
                  style={{ width: `${(Math.min(currentApp.stageIndex, 4) / 4) * 85}%` }}
                />

                {/* Stage Steps Container */}
                <div className="flex flex-col sm:flex-row justify-between relative gap-6 sm:gap-2">
                  {TIMELINE_STAGES.map((stage) => {
                    const isPassed = currentApp.stageIndex >= stage.index;
                    const isCurrent = currentApp.stageIndex === stage.index;
                    const StageIcon = stage.icon;

                    return (
                      <div 
                        key={stage.index}
                        className={`flex sm:flex-col items-center gap-3 sm:gap-2 text-left sm:text-center relative sm:w-28 ${
                          isPassed ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {/* Circle Badge */}
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all z-10 ${
                          isCurrent
                            ? 'bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/30 ring-4 ring-emerald-500/20 scale-110'
                            : isPassed
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-900 text-slate-400 border border-slate-800'
                        }`}>
                          <StageIcon className="w-5 h-5" />
                        </div>

                        {/* Text */}
                        <div className="flex-1 sm:flex-initial">
                          <h4 className={`text-xs font-semibold leading-tight ${isCurrent ? 'text-emerald-400' : isPassed ? 'text-slate-200' : 'text-slate-400'}`}>
                            {stage.title}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                            {stage.shortDesc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Audit Trail Note Box */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Cryptographic Audit Trail
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Filing Method: {currentApp.filingMethod}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px] font-mono">
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">Zero-Knowledge Proof:</span>
                  <span className="text-emerald-400 font-semibold truncate block">
                    {currentApp.zkpProofHash}
                  </span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px]">Aadhaar Masked Hash (SHA-256):</span>
                  <span className="text-cyan-400 font-semibold truncate block">
                    {currentApp.aadhaarHash}
                  </span>
                </div>
              </div>

              {/* Duplicate Flag Alert if any */}
              {currentApp.flaggedInDeDuplication && currentApp.duplicateConflictDetails && (
                <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300">
                  <div className="flex items-center gap-2 font-bold text-xs text-rose-200">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Inter-Ministerial Double-Dipping Flag Activated
                  </div>
                  <p className="text-[11px] text-rose-300/90 mt-1">
                    Conflicting Claim: <strong>{currentApp.duplicateConflictDetails.conflictingScheme}</strong> on <strong>{currentApp.duplicateConflictDetails.conflictingPortal}</strong>.
                  </p>
                  <p className="text-[10px] font-mono text-rose-200 mt-1">
                    Action: {currentApp.duplicateConflictDetails.actionTaken}
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Dynamic SLA Countdown & Officer Escalation Engine */}
          <div className="space-y-6">
            
            {/* 7-Day SLA Countdown Timer Component */}
            <SlaCountdownTimer
              totalHours={currentApp.slaTotalHours}
              elapsedHours={currentApp.slaElapsedHours}
              status={currentApp.slaStatus}
              escalationTier={currentApp.escalationTier}
            />

            {/* Escrow & Payment Details Card */}
            <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-emerald-400" />
                NPCI Aadhaar Payment Bridge (APB)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">NPCI Aadhaar Linkage:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active & Seeded
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Target Bank Account:</span>
                  <span className="font-mono text-slate-200">{currentApp.bankAccountMasked}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Disbursed Amount:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    ₹{currentApp.disbursedSoFar.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Escrow Hold Balance:</span>
                  <span className="font-mono text-slate-300">
                    ₹{(currentApp.grantAmount - currentApp.disbursedSoFar).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span>DBT Escrow releases automatically upon officer node SLA completion.</span>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
