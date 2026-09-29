import React, { useState } from 'react';
import { 
  BarChart2, 
  MapPin, 
  Truck, 
  UserCheck, 
  Check, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

const PVTG_DATA = [
  {
    name: 'Dongria Kondh',
    district: 'Rayagada (Niyamgiri, Odisha)',
    scholars: 1840,
    retentionRate: 78.5,
    risk: 'Critical',
    flagged: 38,
    primaryReason: 'Hostel fee receipt latency & biometric NPCI mismatch',
    intervention: 'Dispatch Mobile VLE Van to Muniguda Block'
  },
  {
    name: 'Baiga',
    district: 'Mandla & Dindori (MP / CG)',
    scholars: 3410,
    retentionRate: 82.1,
    risk: 'High',
    flagged: 44,
    primaryReason: 'Seasonal harvest migration & bank KYC branch distance >25km',
    intervention: 'Banking Correspondent Village Camp Scheduled'
  },
  {
    name: 'Birhor',
    district: 'Hazaribagh & Ranchi (Jharkhand)',
    scholars: 980,
    retentionRate: 84.6,
    risk: 'Medium',
    flagged: 16,
    primaryReason: 'Secondary to higher-secondary transition paperwork',
    intervention: 'Assign TribeX Mentor'
  },
  {
    name: 'Chenchu',
    district: 'Nallamala Hills (AP & Telangana)',
    scholars: 2150,
    retentionRate: 89.2,
    risk: 'Moderate',
    flagged: 19,
    primaryReason: 'Forest fringe connectivity gap for renewal filing',
    intervention: 'Install BLE Mesh Relay at Checkpost #7'
  },
  {
    name: 'Katkari',
    district: 'Raigad & Pune (Maharashtra)',
    scholars: 4120,
    retentionRate: 83.4,
    risk: 'High',
    flagged: 25,
    primaryReason: 'Brick-kiln seasonal migration displacement',
    intervention: 'Pre-Sanction Emergency Stipend Advance'
  }
];

export const PvtgDropoutHeatmap: React.FC = () => {
  const [deployedActions, setDeployedActions] = useState<{ [key: string]: boolean }>({});

  const handleDeploy = (name: string) => {
    setDeployedActions(prev => ({ ...prev, [name]: true }));
  };

  return (
    <div className="space-y-6">
      
      {/* Analytics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Total PVTG Cohort</span>
          <p className="text-2xl font-bold font-mono text-white mt-1">84,290</p>
          <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% YoY enrollment
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Average Processing Speed</span>
          <p className="text-2xl font-bold font-mono text-cyan-300 mt-1">4.6 Days</p>
          <span className="text-[11px] text-slate-400">Baseline 128 Days</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Average Retention Rate</span>
          <p className="text-2xl font-bold font-mono text-indigo-300 mt-1">86.4%</p>
          <span className="text-[11px] text-slate-400">Target 92%</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Prevented Dropouts</span>
          <p className="text-2xl font-bold font-mono text-amber-300 mt-1">891 Scholars</p>
          <span className="text-[11px] text-slate-400">Via emergency advance DBT</span>
        </div>
      </div>

      {/* Heatmap List */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              PVTG Retention Heatmap & Risk Predictor
            </h3>
            <p className="text-xs text-slate-400">
              Machine learning models identify retention drops before college dropouts occur.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            5 Critical Corridors
          </span>
        </div>

        <div className="space-y-3">
          {PVTG_DATA.map((item) => {
            const isDeployed = deployedActions[item.name];

            return (
              <div 
                key={item.name}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <strong className="text-sm text-white block">{item.name}</strong>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {item.district}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                      item.risk === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      item.risk === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {item.risk} Risk
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                      {item.retentionRate}% Retention
                    </span>
                  </div>
                </div>

                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.retentionRate < 80 ? 'bg-rose-500' : item.retentionRate < 85 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${item.retentionRate}%` }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1 text-slate-400">
                  <span>Primary Risk Factor: <strong className="text-slate-300">{item.primaryReason}</strong></span>
                  <div className="flex items-center gap-2">
                    {isDeployed ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Unit Dispatched
                      </span>
                    ) : (
                      <button
                        onClick={() => handleDeploy(item.name)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 cursor-pointer"
                      >
                        Deploy Intervention
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
