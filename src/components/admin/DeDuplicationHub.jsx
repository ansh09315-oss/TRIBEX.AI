import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Lock, 
  RotateCcw, 
  Filter, 
  ExternalLink,
  DollarSign,
  Database,
  ArrowRight
} from 'lucide-react';
import { DE_DUPLICATION_REGISTRY_MOCKS } from '../../data/mockData';

export default function DeDuplicationHub({ applications = [] }) {
  const [searchHash, setSearchHash] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL'); // ALL, FRAUD_FLAGGED, CLEAN_VERIFIED
  const [registryRecords, setRegistryRecords] = useState(DE_DUPLICATION_REGISTRY_MOCKS);
  const [selectedRecord, setSelectedRecord] = useState(DE_DUPLICATION_REGISTRY_MOCKS[0]);
  const [actionNotice, setActionNotice] = useState(null);

  const filteredRecords = registryRecords.filter(r => {
    const matchesSearch = 
      r.studentName.toLowerCase().includes(searchHash.toLowerCase()) ||
      r.aadhaarHash.toLowerCase().includes(searchHash.toLowerCase()) ||
      r.institute.toLowerCase().includes(searchHash.toLowerCase());
    
    if (activeFilter === 'ALL') return matchesSearch;
    return matchesSearch && r.status === activeFilter;
  });

  const handleAction = (type, record) => {
    setActionNotice({
      type,
      message: type === 'FREEZE' 
        ? `Escrow lock confirmed for ${record.studentName}. Central treasury notification dispatched.` 
        : `Whitelisted ${record.studentName} for single-scheme MoTA disbursement.`
    });
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metric Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Public Funds Saved
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-2">₹38,72,50,000</p>
          <p className="text-xs text-slate-400 mt-1">Pre-disbursement fraud intercept</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Cross-Checked Portals
            </span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white mt-2">14 Registries</p>
          <p className="text-xs text-slate-400 mt-1">MoTA, AICTE, UGC, 11 State Portals</p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Flagged Double-Dip Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-2">1.84%</p>
          <p className="text-xs text-slate-400 mt-1">342 active claims placed in escrow freeze</p>
        </div>

      </div>

      {/* Main Hub Search & Table Container */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800">
        
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Inter-Ministerial De-Duplication Cross-Check Registry
            </h3>
            <p className="text-xs text-slate-400">
              Simulates SHA-256 identifier matching across Central (MoTA/AICTE/UGC) and State scholarship ledgers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Aadhaar hash, name, institute..."
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="glass-input pl-8 pr-3 py-1.5 rounded-xl text-xs w-full sm:w-64"
              />
            </div>

            <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  activeFilter === 'ALL' ? 'bg-slate-800 text-white' : 'text-slate-400'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('FRAUD_FLAGGED')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  activeFilter === 'FRAUD_FLAGGED' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400'
                }`}
              >
                Flagged
              </button>
              <button
                onClick={() => setActiveFilter('CLEAN_VERIFIED')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  activeFilter === 'CLEAN_VERIFIED' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'
                }`}
              >
                Clean
              </button>
            </div>
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <span>{actionNotice.message}</span>
            <span className="font-mono text-[10px] text-emerald-400">DISPATCHED</span>
          </div>
        )}

        {/* Records Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px] uppercase">
                <th className="py-3 px-3">Student & Identifier</th>
                <th className="py-3 px-3">Claimed MoTA Scheme</th>
                <th className="py-3 px-3">Cross-Matched Registry</th>
                <th className="py-3 px-3">Status / Conflict</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredRecords.map((rec) => (
                <tr 
                  key={rec.aadhaarHash}
                  onClick={() => setSelectedRecord(rec)}
                  className={`hover:bg-slate-900/60 transition-all cursor-pointer ${
                    selectedRecord && selectedRecord.aadhaarHash === rec.aadhaarHash ? 'bg-slate-900/80' : ''
                  }`}
                >
                  <td className="py-3.5 px-3">
                    <span className="font-bold text-white block">{rec.studentName}</span>
                    <span className="text-[10px] font-mono text-cyan-300 truncate max-w-[140px] block">
                      {rec.aadhaarHash}
                    </span>
                    <span className="text-[11px] text-slate-400">{rec.institute}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-slate-200 font-medium block">{rec.claimedScheme}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{rec.claimedPortal}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    {rec.overlappingPortal.includes('None') ? (
                      <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        No Conflicting Portal Match
                      </span>
                    ) : (
                      <div>
                        <span className="text-rose-400 font-semibold block">{rec.overlappingPortal}</span>
                        <span className="text-[11px] text-slate-400">{rec.overlappingScheme}</span>
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-3">
                    {rec.status === 'FRAUD_FLAGGED' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/40">
                        <AlertTriangle className="w-3 h-3 text-rose-400" />
                        Double-Dip Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Zero Conflict Verified
                      </span>
                    )}
                    <span className="block text-[10px] text-slate-400 mt-1">
                      {rec.overlapType}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    {rec.status === 'FRAUD_FLAGGED' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction('FREEZE', rec);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-rose-500 hover:bg-rose-400 text-white transition-all cursor-pointer"
                      >
                        Lock Escrow
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction('APPROVE', rec);
                        }}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer"
                      >
                        Sanction
                      </button>
                    )}
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
