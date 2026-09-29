import React from 'react';
import { 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  Radio, 
  Users, 
  Layers, 
  Activity, 
  Sparkles,
  Cpu,
  BarChart3
} from 'lucide-react';

export default function Navbar({ 
  activePersona, 
  setActivePersona, 
  isOfflineMode, 
  setIsOfflineMode, 
  queuedMeshCount,
  onOpenMeshSimulator 
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#070B12]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePersona('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-600 text-slate-950 font-bold shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  Tribe<span className="text-emerald-400">X</span> AI
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  MoTA Core
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight hidden sm:block">
                Ministry of Tribal Affairs • Unified Scholarship Ecosystem
              </p>
            </div>
          </div>

          {/* Persona Switcher Tabs */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setActivePersona('student')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePersona === 'student'
                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Beneficiary Portal
            </button>

            <button
              onClick={() => setActivePersona('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePersona === 'admin'
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Ministry Admin HQ
            </button>

            <button
              onClick={() => setActivePersona('simulator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePersona === 'simulator'
                  ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Judge Sandbox
            </button>

            <button
              onClick={() => setActivePersona('architecture')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activePersona === 'architecture'
                  ? 'bg-slate-800 text-slate-100 border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Architecture
            </button>
          </nav>

          {/* Quick Actions: Network Toggle & BLE Mesh Status */}
          <div className="flex items-center gap-3">
            
            {/* BLE Mesh Queue Pill */}
            <button
              onClick={onOpenMeshSimulator}
              title="Open BLE Mesh Hop Simulation"
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-emerald-300 transition-all cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">BLE Mesh:</span>
              <span className={`px-1.5 py-0.2 rounded font-bold ${queuedMeshCount > 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}>
                {queuedMeshCount} Queued
              </span>
            </button>

            {/* Simulated Deep-Forest Network Toggle */}
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                isOfflineMode
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
              }`}
              title="Toggle network connectivity simulation"
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Deep Forest (Offline)</span>
                  <span className="sm:hidden">Offline</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">MoTA Gateway (Online)</span>
                  <span className="sm:hidden">Online</span>
                </>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto gap-2 py-2 border-t border-slate-800/60 no-scrollbar">
          <button
            onClick={() => setActivePersona('student')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activePersona === 'student' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'
            }`}
          >
            Beneficiary
          </button>
          <button
            onClick={() => setActivePersona('admin')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activePersona === 'admin' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
            }`}
          >
            Ministry HQ
          </button>
          <button
            onClick={() => setActivePersona('simulator')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activePersona === 'simulator' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40' : 'text-slate-400'
            }`}
          >
            Judge Sandbox
          </button>
          <button
            onClick={() => setActivePersona('architecture')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activePersona === 'architecture' ? 'bg-slate-800 text-slate-200' : 'text-slate-400'
            }`}
          >
            Architecture
          </button>
        </div>

      </div>
    </header>
  );
}
