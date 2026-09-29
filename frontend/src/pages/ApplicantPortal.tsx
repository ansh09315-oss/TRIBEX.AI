import React, { useState } from 'react';
import { 
  FileText, 
  Clock, 
  Wifi, 
  WifiOff, 
  Radio, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { VoiceFormWizard } from '../components/VoiceFormWizard';
import { ZkpVerifierCard } from '../components/ZkpVerifierCard';
import { SlaTimelineTracker } from '../components/SlaTimelineTracker';
import { useOfflineStorage } from '../hooks/useOfflineStorage';

interface ApplicantPortalProps {
  isOfflineMode: boolean;
  setIsOfflineMode: (offline: boolean) => void;
}

export const ApplicantPortal: React.FC<ApplicantPortalProps> = ({
  isOfflineMode,
  setIsOfflineMode
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'wizard' | 'tracker' | 'zkp'>('wizard');
  const { queuedPacketsCount } = useOfflineStorage();

  return (
    <div className="space-y-6">
      
      {/* Portal Top Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
            MoTA Beneficiary Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Tribal Student Scholarship & Fellowship Center
          </h2>
        </div>

        {/* Subtabs & Offline Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSubTab('wizard')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'wizard' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Voice Wizard
            </button>
            <button
              onClick={() => setActiveSubTab('zkp')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'zkp' ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              ZKP Verification
            </button>
            <button
              onClick={() => setActiveSubTab('tracker')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeSubTab === 'tracker' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Tracker & SLA
            </button>
          </div>

          <button
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              isOfflineMode ? 'bg-amber-500/15 border-amber-500/40 text-amber-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOfflineMode ? 'Deep Forest (Offline)' : 'Online Hub'}</span>
          </button>
        </div>
      </div>

      {/* Offline Alert Strip */}
      {isOfflineMode && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              <strong>Deep-Forest BLE Mesh Buffer Active:</strong> Applications save locally to phone memory and dispatch via Bluetooth multi-hop.
            </span>
          </div>
          <span className="font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-bold">
            {queuedPacketsCount} Packets Enqueued
          </span>
        </div>
      )}

      {/* Dynamic Sub-Views */}
      {activeSubTab === 'wizard' && (
        <VoiceFormWizard isOfflineMode={isOfflineMode} />
      )}

      {activeSubTab === 'zkp' && (
        <ZkpVerifierCard />
      )}

      {activeSubTab === 'tracker' && (
        <SlaTimelineTracker />
      )}

    </div>
  );
};
