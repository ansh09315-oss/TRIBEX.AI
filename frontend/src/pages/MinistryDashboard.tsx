import React, { useState } from 'react';
import { 
  BarChart3, 
  ShieldAlert, 
  Clock, 
  UserCheck, 
  TrendingUp, 
  DollarSign, 
  Activity 
} from 'lucide-react';
import { DeduplicationHub } from '../components/DeduplicationHub';
import { PvtgDropoutHeatmap } from '../components/PvtgDropoutHeatmap';
import { SlaTimelineTracker } from '../components/SlaTimelineTracker';

export const MinistryDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'dedup' | 'sla'>('analytics');

  return (
    <div className="space-y-6">
      
      {/* Top Header & Sub-Navigation */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
            Ministry of Tribal Affairs • National Command Centre
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Unified Oversight & Fiscal Governance HQ
          </h2>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'analytics' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            PVTG Retention AI
          </button>
          <button
            onClick={() => setActiveTab('dedup')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'dedup' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            De-Duplication Hub
          </button>
          <button
            onClick={() => setActiveTab('sla')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'sla' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            SLA Escalations
          </button>
        </div>
      </div>

      {/* Dynamic Sub-Modules */}
      {activeTab === 'analytics' && <PvtgDropoutHeatmap />}
      {activeTab === 'dedup' && <DeduplicationHub />}
      {activeTab === 'sla' && <SlaTimelineTracker />}

    </div>
  );
};
