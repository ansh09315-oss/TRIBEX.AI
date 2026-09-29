import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  DollarSign, 
  Database 
} from 'lucide-react';
import { apiService } from '../services/api';

const SAMPLE_RECORDS = [
  {
    studentName: 'Devendra Rathwa',
    institute: 'SVNIT Surat',
    aadhaarHash: 'sha256:9f8e7d6c5b4a3210',
    claimedScheme: 'Top Class Education Scheme (₹2,40,000)',
    overlappingPortal: 'AICTE Pragati Portal',
    overlappingScheme: 'Swanath Technical Scholarship (₹50,000)',
    status: 'FRAUD_FLAGGED',
    savedAmount: 240000
  },
  {
    studentName: 'Kailash Korwa',
    institute: 'Bilaspur University',
    aadhaarHash: 'sha256:3a1b4c5d6e7f8091',
    claimedScheme: 'Post-Matric Scholarship (₹36,000)',
    overlappingPortal: 'Chhattisgarh State e-Kalyan',
    overlappingScheme: 'State Maintenance Allowance (₹36,000)',
    status: 'FRAUD_FLAGGED',
    savedAmount: 36000
  },
  {
    studentName: 'Birsa Murmu',
    institute: 'NIT Rourkela',
    aadhaarHash: 'sha256:d82e1c91152a48be',
    claimedScheme: 'NFST Ph.D. Fellowship (₹4,56,000)',
    overlappingPortal: 'None (Cross-Checked Clean)',
    overlappingScheme: 'None',
    status: 'CLEAN_VERIFIED',
    savedAmount: 0
  }
];

export const DeduplicationHub: React.FC = () => {
  const [searchHash, setSearchHash] = useState<string>('');
  const [records, setRecords] = useState(SAMPLE_RECORDS);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filtered = records.filter(r => 
    r.studentName.toLowerCase().includes(searchHash.toLowerCase()) ||
    r.aadhaarHash.toLowerCase().includes(searchHash.toLowerCase()) ||
    r.institute.toLowerCase().includes(searchHash.toLowerCase())
  );

  const handleLockEscrow = (name: string) => {
    setActionNotice(`Treasury Escrow Lock confirmed for ${name}. Duplicate claim halted.`);
    setTimeout(() => setActionNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Total Public Funds Protected</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">₹38,72,50,000</p>
          <span className="text-[11px] text-slate-400">Pre-disbursement duplicate prevention</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Federated Registries</span>
          <p className="text-2xl font-bold font-mono text-white mt-1">14 Portals</p>
          <span className="text-[11px] text-slate-400">MoTA, AICTE, UGC, 11 State Portals</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs uppercase tracking-wider text-slate-400 block">Double-Dip Rate</span>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-1">1.84%</p>
          <span className="text-[11px] text-slate-400">342 active claims held in escrow</span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Unified Inter-Ministerial De-Duplication Hub
            </h3>
            <p className="text-xs text-slate-400">
              Cross-references SHA-256 national identifiers across Central and State portals.
            </p>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search hash or student..."
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white w-full sm:w-60 focus:outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {actionNotice && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs">
            {actionNotice}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-3">Student & Hash</th>
                <th className="py-3 px-3">Claimed MoTA Scheme</th>
                <th className="py-3 px-3">Overlapping Portal</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((rec) => (
                <tr key={rec.aadhaarHash} className="hover:bg-slate-950/40">
                  <td className="py-3 px-3">
                    <strong className="text-white block">{rec.studentName}</strong>
                    <span className="text-[10px] font-mono text-cyan-300 truncate max-w-[140px] block">
                      {rec.aadhaarHash}
                    </span>
                    <span className="text-[11px] text-slate-500">{rec.institute}</span>
                  </td>

                  <td className="py-3 px-3">
                    <span className="text-slate-200 block">{rec.claimedScheme}</span>
                  </td>

                  <td className="py-3 px-3">
                    {rec.status === 'FRAUD_FLAGGED' ? (
                      <div>
                        <strong className="text-rose-400 block">{rec.overlappingPortal}</strong>
                        <span className="text-[11px] text-slate-400">{rec.overlappingScheme}</span>
                      </div>
                    ) : (
                      <span className="text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Clean
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {rec.status === 'FRAUD_FLAGGED' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/40">
                        Double-Dip Prevented
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                        Verified Exclusive
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    {rec.status === 'FRAUD_FLAGGED' ? (
                      <button
                        onClick={() => handleLockEscrow(rec.studentName)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white cursor-pointer"
                      >
                        Lock Escrow
                      </button>
                    ) : (
                      <button
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      >
                        Authorized
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
};
