import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import Hero from './components/Hero';
import ArchitectureSpecs from './components/landing/ArchitectureSpecs';
import VoiceWizard from './components/VoiceWizard';
import Tracker from './components/Tracker';
import AdminDashboard from './components/AdminDashboard';
import BleMeshSimulator from './components/simulator/BleMeshSimulator';
import SandboxFlow from './components/simulator/SandboxFlow';
import { INITIAL_APPLICATIONS } from './data/mockData';
import { 
  getBleMeshQueue, 
  queueBleMeshPacket, 
  clearBleMeshQueue 
} from './utils/offlineStorage';
import { 
  FileText, 
  Search, 
  BarChart3, 
  ShieldAlert, 
  Clock, 
  Radio, 
  Layers, 
  WifiOff, 
  Wifi, 
  CheckCircle2, 
  ShieldCheck,
  Cpu,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  // Navigation & Persona State
  const [activePersona, setActivePersona] = useState('landing'); // 'landing' | 'student' | 'admin' | 'simulator' | 'architecture'
  const [studentSubTab, setStudentSubTab] = useState('apply'); // 'apply' | 'track'
  const [simulatorSubTab, setSimulatorSubTab] = useState('sandbox'); // 'sandbox' | 'mesh'

  // Network Connectivity Simulation (Deep Forest Mode)
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  // Application & Ledger State
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [queuedPackets, setQueuedPackets] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize offline mesh queue from storage
  useEffect(() => {
    const queue = getBleMeshQueue();
    setQueuedPackets(queue);
  }, []);

  const showToast = (title, message, type = 'info') => {
    setToastMessage({ title, message, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add new direct application
  const handleApplicationCreated = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
    showToast(
      'Application Submitted Successfully!', 
      `Application ${newApp.id} for ${newApp.applicantName} is now live with active 7-Day SLA.`,
      'success'
    );
    setStudentSubTab('track');
  };

  // Enqueue offline BLE mesh packet
  const handleQueueBleMeshPacket = (blePacket) => {
    const updatedQueue = queueBleMeshPacket(blePacket);
    setQueuedPackets(updatedQueue);
    showToast(
      'Enqueued in Deep-Forest BLE Mesh', 
      `Packet ${blePacket.id} buffered locally. Ready for device-to-device hop to village gateway.`,
      'warning'
    );
  };

  // Flush queued packets to central MoTA API
  const handleFlushQueueToCentral = () => {
    if (queuedPackets.length === 0) return;

    // Convert queued packets to live applications
    const newlySyncedApps = queuedPackets.map((pkt, idx) => ({
      id: 'TX-2026-' + Math.floor(60000 + Math.random() * 30000),
      applicantName: pkt.applicantSummary.name,
      tribe: pkt.rawDraft.tribe || 'Gond',
      tribeId: pkt.applicantSummary.tribeId,
      state: pkt.rawDraft.state || 'Chhattisgarh',
      district: pkt.rawDraft.district || 'Narayanpur',
      schemeId: pkt.rawDraft.schemeId || 'TOP-CLASS-ST',
      schemeName: pkt.applicantSummary.scheme,
      grantAmount: pkt.rawDraft.grantAmount || 385000,
      disbursedSoFar: 0,
      annualIncome: Number(pkt.rawDraft.annualIncome) || 95000,
      institution: pkt.rawDraft.institution || 'IIT Bombay',
      filingMethod: 'BLE Mesh Relay (Abujhmad Node #04)',
      filingDate: new Date().toISOString().split('T')[0],
      status: 'ZKP Cryptographic Verification Passed',
      stageIndex: 1,
      slaTotalHours: 168,
      slaElapsedHours: 6,
      slaStatus: 'HEALTHY',
      zkpVerified: true,
      zkpProofHash: '0x' + Math.random().toString(36).substring(2, 14),
      aadhaarHash: 'sha256:' + Math.random().toString(36).substring(2, 14),
      bankAccountMasked: 'SBIN••••••' + Math.floor(1000 + Math.random() * 9000),
      npciAadhaarLinked: true,
      flaggedInDeDuplication: false,
      pvtgCategory: null
    }));

    setApplications(prev => [...newlySyncedApps, ...prev]);
    clearBleMeshQueue();
    setQueuedPackets([]);
    showToast(
      'Gateway Mesh Sync Complete!',
      `Successfully synced ${newlySyncedApps.length} deep-forest applications to MoTA Core.`,
      'success'
    );
  };

  // Application update (disbursement, escalation, etc.)
  const handleUpdateApplication = (updatedApp) => {
    setApplications(prev => prev.map(a => a.id === updatedApp.id ? updatedApp : a));
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Universal Navbar */}
      <Navbar
        activePersona={activePersona}
        setActivePersona={setActivePersona}
        isOfflineMode={isOfflineMode}
        setIsOfflineMode={setIsOfflineMode}
        queuedMeshCount={queuedPackets.length}
        onOpenMeshSimulator={() => {
          setActivePersona('simulator');
          setSimulatorSubTab('mesh');
        }}
      />

      {/* Floating Offline Warning Banner if Offline */}
      {isOfflineMode && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 text-amber-300 text-xs px-4 py-2 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <span className="flex items-center gap-2 font-medium">
              <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Deep-Forest Offline Mode Active:</strong> Applications will save locally and buffer as encrypted P2P BLE Mesh packets.
              </span>
            </span>
            <button
              onClick={() => setIsOfflineMode(false)}
              className="text-[11px] underline hover:text-amber-200 cursor-pointer font-bold"
            >
              Reconnect to MoTA Gateway
            </button>
          </div>
        </div>
      )}

      {/* Interactive Toast Notifications */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-4 rounded-2xl glass-panel border border-emerald-500/40 shadow-2xl animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">{toastMessage.title}</h5>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">{toastMessage.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* VIEW 1: HERO LANDING */}
        {activePersona === 'landing' && (
          <Hero
            onSelectPersona={setActivePersona}
            onOpenSandbox={() => {
              setActivePersona('simulator');
              setSimulatorSubTab('sandbox');
            }}
          />
        )}

        {/* VIEW 2: BENEFICIARY / STUDENT PORTAL */}
        {activePersona === 'student' && (
          <div className="space-y-6">
            
            {/* Beneficiary Header & Sub-Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
                  Beneficiary Portal
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Tribal Scholarship & Fellowship Gateway
                </h1>
              </div>

              {/* Subtabs: Apply vs Track */}
              <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setStudentSubTab('apply')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    studentSubTab === 'apply'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Voice Application Wizard
                </button>

                <button
                  onClick={() => setStudentSubTab('track')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    studentSubTab === 'track'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Live Tracker & 7-Day SLA
                </button>
              </div>
            </div>

            {/* Sub-view Content */}
            {studentSubTab === 'apply' ? (
              <VoiceWizard
                isOfflineMode={isOfflineMode}
                onApplicationCreated={handleApplicationCreated}
                onQueueBleMeshPacket={handleQueueBleMeshPacket}
              />
            ) : (
              <Tracker applications={applications} />
            )}

          </div>
        )}

        {/* VIEW 3: MINISTRY & OFFICER HQ */}
        {activePersona === 'admin' && (
          <div className="space-y-6">
            <AdminDashboard
              applications={applications}
              onUpdateApplication={handleUpdateApplication}
            />
          </div>
        )}

        {/* VIEW 4: SIMULATOR & JUDGE SANDBOX */}
        {activePersona === 'simulator' && (
          <div className="space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                  Evaluation Sandbox
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  TribeX AI Interactive Proof of Concept
                </h1>
              </div>

              {/* Subtabs: 1-Click Guided Flow vs Deep BLE Mesh Inspector */}
              <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setSimulatorSubTab('sandbox')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    simulatorSubTab === 'sandbox'
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Guided End-to-End Sandbox
                </button>

                <button
                  onClick={() => setSimulatorSubTab('mesh')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    simulatorSubTab === 'mesh'
                      ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" />
                  BLE Mesh Packet Sniffer
                </button>
              </div>
            </div>

            {simulatorSubTab === 'sandbox' ? (
              <SandboxFlow />
            ) : (
              <BleMeshSimulator
                queuedPackets={queuedPackets}
                onFlushQueueToCentral={handleFlushQueueToCentral}
                isOfflineMode={isOfflineMode}
                setIsOfflineMode={setIsOfflineMode}
              />
            )}

          </div>
        )}

        {/* VIEW 5: TECHNICAL SPECIFICATIONS & ARCHITECTURE */}
        {activePersona === 'architecture' && <ArchitectureSpecs />}

      </main>

      {/* High-Trust Modern Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-[#060910] text-xs text-slate-400 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                TribeX AI • Ministry of Tribal Affairs (MoTA), Government of India
              </p>
              <p className="text-[11px] text-slate-400">
                Compliant with National Data Governance Framework & NPCI Aadhaar Payment Bridge Standards
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              NIC Data Center (Shastri Bhawan)
            </span>
            <span>•</span>
            <span>Zero-Knowledge SNARK Core v2.4</span>
            <span>•</span>
            <span>Bluetooth 5.3 Mesh PHY</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
