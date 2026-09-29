import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  FileX2, 
  ShieldAlert, 
  WifiOff, 
  Zap, 
  Lock, 
  Radio, 
  TrendingUp, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function ProblemSolutionSlider() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Paradigm Shift Comparison
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Legacy Governance vs. TribeX AI Architecture
          </h2>
        </div>
        <p className="text-xs text-slate-400 max-w-sm">
          Slide the divider horizontally to compare traditional bureaucratic bottlenecks against TribeX AI's automated ecosystem.
        </p>
      </div>

      {/* Interactive Slider Container */}
      <div 
        className="relative w-full h-[520px] sm:h-[460px] rounded-3xl overflow-hidden select-none border border-slate-800 glass-panel shadow-2xl cursor-ew-resize"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        
        {/* RIGHT SIDE: TribeX AI Next-Gen Solution (Full Background) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1624] via-[#0B1E2E] to-[#07131D] p-6 sm:p-10 flex flex-col justify-between">
          <div className="flex items-center justify-end">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold shadow-lg shadow-emerald-950/40">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              TribeX AI Unified Ecosystem
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl ml-auto text-left">
            
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <Zap className="w-4 h-4" />
                Guaranteed 7-Day SLA
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compressed from 128 days to under 4.6 days average disbursement via auto-escalating NPCI APB pipeline.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                <Lock className="w-4 h-4" />
                Zero-Knowledge Trust
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero bulky PDF notarizations. Instant mathematical proof verifies income & caste without leaking raw records.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <Radio className="w-4 h-4" />
                Deep-Forest BLE Mesh
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Zero mobile towers needed. P2P Bluetooth multi-hop sync carries filings from remote canopy to satellite hubs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs mb-1">
                <TrendingUp className="w-4 h-4" />
                PVTG Retention AI
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Proactive early warning heatmaps detect harvest and fee distress, deploying mobile VLE vans and stipend advances.
              </p>
            </div>

          </div>

          <div className="text-right text-[11px] text-emerald-400/80 font-mono">
            ★ Public Treasury Protected: ₹38.7 Cr Duplicate Double-Dipping Blocked
          </div>
        </div>

        {/* LEFT SIDE: Legacy Bureaucratic System (Clipped by sliderPosition) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1C0D12] via-[#210E14] to-[#14080B] p-6 sm:p-10 flex flex-col justify-between border-r border-rose-500/40"
          style={{ width: `${sliderPosition}%`, overflow: 'hidden' }}
        >
          <div className="w-[600px] sm:w-[800px]">
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Legacy Bureaucratic Process
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl text-left">
              
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <Clock className="w-4 h-4" />
                  120 - 180 Days Processing Latency
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Paper files stall across physical officer desks with zero tracking and systemic accountability black holes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <FileX2 className="w-4 h-4" />
                  15-Page Document Notarization
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Students travel 40km+ to tehsils for physical affidavits, income certificates, and attested paper photostats.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <WifiOff className="w-4 h-4" />
                  Forest Connectivity Divide
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Zero connectivity in forest belts (Abujhmad, Bastar) completely locks tribal youths out of online scholarship deadlines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-rose-500/30 backdrop-blur-md">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  Rampant Inter-Ministerial Fraud
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Siloed portals cannot detect double-dipping across AICTE, UGC, and State grants, draining public tribal treasuries.
                </p>
              </div>

            </div>

            <div className="mt-8 text-left text-[11px] text-rose-400/80 font-mono">
              ⚠ 34.2% Estimated PVTG College Dropout Rate Due to Unpredictable Delays
            </div>
          </div>
        </div>

        {/* Center Draggable Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-cyan-400 to-rose-400 cursor-ew-resize flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 shadow-xl shadow-cyan-500/50 flex items-center justify-center text-white scale-110 transition-transform">
            <div className="flex items-center -space-x-1">
              <ChevronLeft className="w-3.5 h-3.5 text-rose-400" />
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

      </div>

      {/* Quick Toggle Controls */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
        <button 
          onClick={() => setSliderPosition(20)}
          className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-rose-300 font-semibold cursor-pointer"
        >
          Inspect Legacy Bottlenecks
        </button>
        <button 
          onClick={() => setSliderPosition(50)}
          className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 cursor-pointer"
        >
          50 / 50 Split View
        </button>
        <button 
          onClick={() => setSliderPosition(80)}
          className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-emerald-300 font-semibold cursor-pointer"
        >
          Inspect TribeX AI Capabilities
        </button>
      </div>

    </div>
  );
}
