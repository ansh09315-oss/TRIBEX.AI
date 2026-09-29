import React, { useState } from 'react';
import { Landing } from './pages/Landing';
import { ApplicantPortal } from './pages/ApplicantPortal';
import { MinistryDashboard } from './pages/MinistryDashboard';
import { BleMeshSimulator } from './components/BleMeshSimulator';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  Cpu, 
  Wifi, 
  WifiOff 
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'landing' | 'applicant' | 'ministry' | 'simulator'>('landing');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans">
      
      {/* Universal Top Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#070B12]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div 
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                Tribe<span className="text-emerald-400">X</span> AI
              </span>
              <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
                Ministry of Tribal Affairs • Unified Ecosystem
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentPage('applicant')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                currentPage === 'applicant' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Beneficiary
            </button>

            <button
              onClick={() => setCurrentPage('ministry')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                currentPage === 'ministry' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Ministry HQ
            </button>

            <button
              onClick={() => setCurrentPage('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                currentPage === 'simulator' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              BLE Simulator
            </button>
          </nav>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentPage === 'landing' && <Landing onNavigate={setCurrentPage} />}
        {currentPage === 'applicant' && (
          <ApplicantPortal 
            isOfflineMode={isOfflineMode} 
            setIsOfflineMode={setIsOfflineMode} 
          />
        )}
        {currentPage === 'ministry' && <MinistryDashboard />}
        {currentPage === 'simulator' && <BleMeshSimulator />}
      </main>

      {/* Modern High-Trust Footer */}
      <footer className="border-t border-slate-800 bg-[#060910] text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>TribeX AI • Ministry of Tribal Affairs (MoTA), Government of India</p>
          <p className="font-mono text-[11px]">NPCI Aadhaar Payment Bridge & ZKP Core v2.4</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
