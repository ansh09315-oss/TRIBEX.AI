import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  Clock, 
  UserCheck, 
  TrendingUp, 
  Zap, 
  AlertTriangle, 
  DollarSign, 
  Activity,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import PvtgAnalytics from './admin/PvtgAnalytics';
import DeDuplicationHub from './admin/DeDuplicationHub';
import SlaEscalationManager from './admin/SlaEscalationManager';

export default function AdminDashboard({ applications = [], onUpdateApplication }) {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'dedup' | 'sla'

  return (
    <div className="space-y-6">
      
      {/* Top Universal KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Beneficiary Grants
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-2">1,48,290</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +18.4% YoY nationwide enrollment
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Avg Processing Duration
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-cyan-300 mt-2">4.6 Days</p>
          <p className="text-xs text-slate-400 mt-1">
            Strict 7-Day SLA guarantee enforced
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Duplicate Claims Blocked
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-2">₹38,72,50,000</p>
          <p className="text-xs text-slate-400 mt-1">
            Saved across 14 Inter-Ministerial Portals
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              PVTG Retention Risk Index
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-indigo-300 mt-2">14.2% Risk</p>
          <p className="text-xs text-indigo-400 mt-1">
            Down from 34.6% baseline with AI alert vans
          </p>
        </div>

      </div>

      {/* Admin Module Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {activeTab === 'analytics' && 'Predictive Drop-Out Analytics for PVTGs'}
            {activeTab === 'dedup' && 'Inter-Ministerial De-Duplication Hub & Fiscal Protection'}
            {activeTab === 'sla' && 'Automated DBT 7-Day SLA Escalation Engine Queue'}
          </h2>
          <p className="text-xs text-slate-400">
            {activeTab === 'analytics' && 'Early warning heatmaps and targeted counselor mobile van dispatch.'}
            {activeTab === 'dedup' && 'Hashed identifier cross-matching across MoTA, AICTE, and State scholarship ledgers.'}
            {activeTab === 'sla' && 'Real-time officer node monitoring with automated escalation triggers.'}
          </p>
        </div>

        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            PVTG Retention AI
          </button>

          <button
            onClick={() => setActiveTab('dedup')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'dedup'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            De-Duplication Hub
          </button>

          <button
            onClick={() => setActiveTab('sla')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'sla'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            SLA Escalations
          </button>
        </div>
      </div>

      {/* Module Content */}
      {activeTab === 'analytics' && <PvtgAnalytics />}
      {activeTab === 'dedup' && <DeDuplicationHub applications={applications} />}
      {activeTab === 'sla' && (
        <SlaEscalationManager 
          applications={applications} 
          onUpdateApplication={onUpdateApplication} 
        />
      )}

    </div>
  );
}
