import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  Send, 
  Building, 
  Landmark, 
  Zap,
  Filter
} from 'lucide-react';
import SlaCountdownTimer from '../common/SlaCountdownTimer';

export default function SlaEscalationManager({ applications = [], onUpdateApplication }) {
  const [filterTier, setFilterTier] = useState('ALL'); // ALL, ESCALATED, NEAR_BREACH, ON_TRACK
  const [selectedApp, setSelectedApp] = useState(applications[3] || applications[0]);
  const [actionSuccessMessage, setActionSuccessMessage] = useState(null);

  const filteredApps = applications.filter(app => {
    if (filterTier === 'ESCALATED') return app.slaStatus === 'BREACHED_ESCALATED';
    if (filterTier === 'NEAR_BREACH') return app.slaStatus === 'ATTENTION_NEEDED';
    if (filterTier === 'ON_TRACK') return app.slaStatus === 'HEALTHY' || app.slaStatus === 'COMPLETED_WITHIN_SLA';
    return true;
  });

  const triggerForceEscalation = (app) => {
    const updated = {
      ...app,
      slaStatus: 'BREACHED_ESCALATED',
      slaElapsedHours: 192,
      escalationTier: 'Tier 3 - Joint Secretary (MoTA New Delhi)',
      escalatedAt: new Date().toISOString()
    };
    onUpdateApplication(updated);
    setSelectedApp(updated);
    setActionSuccessMessage(`Emergency escalation activated: Application ${app.id} dispatched directly to MoTA Joint Secretary.`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  const triggerFastTrackDisburse = (app) => {
    const updated = {
      ...app,
      stageIndex: 4,
      status: 'Disbursed',
      disbursedSoFar: app.grantAmount,
      slaStatus: 'COMPLETED_WITHIN_SLA'
    };
    onUpdateApplication(updated);
    setSelectedApp(updated);
    setActionSuccessMessage(`Fast-track sanction executed: ₹${app.grantAmount.toLocaleString('en-IN')} released to NPCI Aadhaar Bridge.`);
    setTimeout(() => setActionSuccessMessage(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* SLA Engine Header */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Automated DBT 7-Day SLA Escalation Engine
            </h3>
            <p className="text-xs text-slate-400">
              Guarantees public accountability by auto-escalating applications delayed at any institutional officer node.
            </p>
          </div>

          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterTier('ALL')}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                filterTier === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400'
              }`}
            >
              All ({applications.length})
            </button>
            <button
              onClick={() => setFilterTier('ESCALATED')}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                filterTier === 'ESCALATED' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
              }`}
            >
              Escalated
            </button>
            <button
              onClick={() => setFilterTier('NEAR_BREACH')}
              className={`px-3 py-1 rounded-lg font-medium cursor-pointer transition-all ${
                filterTier === 'NEAR_BREACH' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'
              }`}
            >
              Near Breach
            </button>
          </div>
        </div>

        {/* Action Success Toast */}
        {actionSuccessMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <span>{actionSuccessMessage}</span>
            <span className="font-mono text-[10px] text-emerald-400">CONFIRMED</span>
          </div>
        )}

        {/* Applications List */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-3">Application ID & Student</th>
                <th className="py-3 px-3">Current Processing Node</th>
                <th className="py-3 px-3">7-Day SLA Remaining</th>
                <th className="py-3 px-3">Escalation Tier</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredApps.map((app) => (
                <tr 
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`hover:bg-slate-900/60 transition-all cursor-pointer ${
                    selectedApp && selectedApp.id === app.id ? 'bg-slate-900/80' : ''
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">{app.applicantName}</span>
                    <span className="text-[10px] font-mono text-cyan-300 block">{app.id}</span>
                    <span className="text-[11px] text-slate-400">{app.schemeName}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-semibold text-slate-200 block">{app.status}</span>
                    <span className="text-[11px] text-slate-400">{app.institution}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <SlaCountdownTimer
                      totalHours={app.slaTotalHours}
                      elapsedHours={app.slaElapsedHours}
                      status={app.slaStatus}
                      isCompact={true}
                    />
                  </td>

                  <td className="py-3.5 px-3">
                    <span className={`text-[11px] font-mono font-semibold ${
                      app.slaStatus === 'BREACHED_ESCALATED' 
                        ? 'text-rose-400 font-bold' 
                        : 'text-slate-400'
                    }`}>
                      {app.escalationTier || 'Tier 1 (Institutional)'}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {app.slaStatus !== 'COMPLETED_WITHIN_SLA' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerFastTrackDisburse(app);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
                        >
                          Disburse
                        </button>
                      )}

                      {app.slaStatus !== 'BREACHED_ESCALATED' && app.slaStatus !== 'COMPLETED_WITHIN_SLA' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerForceEscalation(app);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all cursor-pointer"
                        >
                          Escalate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
