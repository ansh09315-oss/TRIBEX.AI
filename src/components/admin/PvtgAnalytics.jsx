import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Truck, 
  UserCheck, 
  Check, 
  Clock, 
  Activity, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { PVTG_METRICS } from '../../data/mockData';

export default function PvtgAnalytics() {
  const [selectedGroup, setSelectedGroup] = useState(PVTG_METRICS.groups[0]);
  const [interventionState, setInterventionState] = useState({});

  const handleDeployIntervention = (groupName, action) => {
    setInterventionState(prev => ({
      ...prev,
      [groupName]: {
        status: 'DEPLOYED',
        action,
        timestamp: new Date().toLocaleTimeString()
      }
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* High-Impact Executive Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total PVTG Scholars
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-2">
            {PVTG_METRICS.totalPVTGBeneficiaries.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% YoY enrollment across 75 notified PVTGs
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Avg Processing Latency
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-300 mt-2">4.6 Days</p>
          <p className="text-xs text-slate-400 mt-1">
            Compressed from <strong className="text-rose-400 line-through">128 Days</strong> historical baseline
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Average Retention Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-indigo-300 mt-2">86.4%</p>
          <p className="text-xs text-indigo-400/90 mt-1">
            Target 92% with AI early warning counseling
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Prevented Drop-Outs
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-amber-300 mt-2">
            {PVTG_METRICS.preventedDropoutsLastQuarter} Scholars
          </p>
          <p className="text-xs text-slate-400 mt-1">Via proactive field stipend advances</p>
        </div>

      </div>

      {/* Main PVTG Early Warning Matrix & Group Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Group Cards Table */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-indigo-400" />
                PVTG Retention Heatmap & Risk Predictor
              </h3>
              <p className="text-xs text-slate-400">
                AI model flags early indicators (dormant renewals, harvest migrations, distant bank branches).
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">
              5 Priority Corridors
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {PVTG_METRICS.groups.map((group) => {
              const isSelected = selectedGroup.name === group.name;
              const hasIntervention = interventionState[group.name];

              return (
                <div
                  key={group.name}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{group.name}</span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {group.region}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        group.riskLevel === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : group.riskLevel === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {group.riskLevel} Risk
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-200">
                        {group.retentionRate}% Retention
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-2">
                    <div 
                      className={`h-full rounded-full ${
                        group.retentionRate < 80 
                          ? 'bg-rose-500' 
                          : group.retentionRate < 85 
                          ? 'bg-amber-400' 
                          : 'bg-emerald-400'
                      }`}
                      style={{ width: `${group.retentionRate}%` }}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-1 pt-1">
                    <span>
                      Flagged Scholars: <strong className="text-rose-400">{group.flaggedStudents}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400 italic">
                      Risk: {group.primaryRiskReason}
                    </span>
                  </div>

                  {hasIntervention && (
                    <div className="mt-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5" />
                        {hasIntervention.action} dispatched at {hasIntervention.timestamp}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-400">ACTIVE FIELD UNIT</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Col: Deep Dive Intervention Station */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="pb-3 border-b border-slate-800">
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
              Proactive Governance Hub
            </span>
            <h4 className="text-base font-bold text-white mt-0.5">
              Deploy Intervention: {selectedGroup.name}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Location: {selectedGroup.region}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Total ST Cohort:</span>
              <strong className="text-white font-mono">{selectedGroup.totalScholars}</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Immediate At-Risk:</span>
              <strong className="text-rose-400 font-mono">{selectedGroup.flaggedStudents} Students</strong>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Primary Root Cause:</span>
              <span className="text-slate-300 text-right">{selectedGroup.primaryRiskReason}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Automated Field Interventions
            </span>

            <button
              onClick={() => handleDeployIntervention(selectedGroup.name, 'Mobile VLE Van with Satellite Link')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  Dispatch Mobile VLE Van
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Deploys biometric van & BLE repeater for village-level doorstep KYC & Aadhaar mapping.
              </p>
            </button>

            <button
              onClick={() => handleDeployIntervention(selectedGroup.name, 'District Tribal Welfare Mentor')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-indigo-500/50 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  Assign MoTA Tribal Mentor
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Connects student with senior tribal scholar for academic & institutional counseling.
              </p>
            </button>

            <button
              onClick={() => handleDeployIntervention(selectedGroup.name, 'Emergency Stipend Escrow Advance')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Fast-Track Emergency Advance
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Pre-sanctions 50% maintenance allowance to prevent college dropouts before harvest.
              </p>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
