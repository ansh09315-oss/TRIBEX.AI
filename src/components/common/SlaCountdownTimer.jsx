import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function SlaCountdownTimer({ 
  totalHours = 168, 
  elapsedHours = 64, 
  status = 'HEALTHY',
  isCompact = false,
  escalationTier = null
}) {
  // Simulate active ticking seconds
  const [secondsOffset, setSecondsOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsOffset(prev => (prev + 1) % 60);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const remainingHours = totalHours - elapsedHours;
  const isBreached = remainingHours <= 0;
  const isNearBreach = !isBreached && remainingHours < 48;

  // Convert to D : H : M : S
  const absRemainingHours = Math.abs(remainingHours);
  const days = Math.floor(absRemainingHours / 24);
  const hours = Math.floor(absRemainingHours % 24);
  const minutes = (59 - (secondsOffset % 60));
  const seconds = (59 - secondsOffset);

  // Compact badge rendering
  if (isCompact) {
    if (status === 'COMPLETED_WITHIN_SLA') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          SLA Cleared (3.2d)
        </span>
      );
    }
    if (isBreached) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40 animate-pulse">
          <AlertCircle className="w-3 h-3" />
          SLA Breached ({days}d {hours}h overdue)
        </span>
      );
    }
    if (isNearBreach) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/40">
          <AlertTriangle className="w-3 h-3" />
          {days}d {hours}h left
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
        <Clock className="w-3 h-3" />
        {days}d {hours}h remaining
      </span>
    );
  }

  // Full High-Impact Card Timer
  return (
    <div className={`p-4 rounded-xl border transition-all ${
      status === 'COMPLETED_WITHIN_SLA'
        ? 'bg-emerald-950/20 border-emerald-500/30'
        : isBreached
        ? 'bg-rose-950/25 border-rose-500/50 shadow-lg shadow-rose-950/30'
        : isNearBreach
        ? 'bg-amber-950/20 border-amber-500/40'
        : 'bg-slate-900/80 border-slate-800'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {status === 'COMPLETED_WITHIN_SLA' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : isBreached ? (
            <AlertCircle className="w-4 h-4 text-rose-400 animate-bounce" />
          ) : isNearBreach ? (
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          ) : (
            <Clock className="w-4 h-4 text-cyan-400" />
          )}
          <span className="text-xs font-semibold tracking-wide uppercase text-slate-300">
            7-Day Mandated DBT SLA Clock
          </span>
        </div>
        
        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-bold ${
          status === 'COMPLETED_WITHIN_SLA'
            ? 'bg-emerald-500/20 text-emerald-300'
            : isBreached
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            : isNearBreach
            ? 'bg-amber-500/20 text-amber-300'
            : 'bg-cyan-500/20 text-cyan-300'
        }`}>
          {status === 'COMPLETED_WITHIN_SLA' 
            ? 'DISBURSED' 
            : isBreached 
            ? 'ESCALATED TIER-2' 
            : 'ON TRACK'}
        </span>
      </div>

      {status === 'COMPLETED_WITHIN_SLA' ? (
        <div className="py-2 text-center">
          <p className="text-sm font-semibold text-emerald-300">Disbursed in 3.2 Days</p>
          <p className="text-xs text-slate-400 mt-0.5">Beat the MoTA 7-day guarantee by 3.8 days</p>
        </div>
      ) : (
        <>
          {/* Digits Display */}
          <div className="grid grid-cols-4 gap-2 text-center my-2">
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
              <span className={`text-xl font-bold font-mono ${isBreached ? 'text-rose-400' : isNearBreach ? 'text-amber-400' : 'text-slate-100'}`}>
                {String(days).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Days</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
              <span className={`text-xl font-bold font-mono ${isBreached ? 'text-rose-400' : isNearBreach ? 'text-amber-400' : 'text-slate-100'}`}>
                {String(hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Hours</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
              <span className={`text-xl font-bold font-mono ${isBreached ? 'text-rose-400' : isNearBreach ? 'text-amber-400' : 'text-slate-100'}`}>
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Mins</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
              <span className={`text-xl font-bold font-mono ${isBreached ? 'text-rose-400' : isNearBreach ? 'text-amber-400' : 'text-emerald-400'}`}>
                {String(seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Secs</span>
            </div>
          </div>

          {/* Progress Bar of 7 Days */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
              <span>{elapsedHours}h elapsed</span>
              <span>{totalHours}h SLA max</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  isBreached 
                    ? 'bg-rose-500 w-full' 
                    : isNearBreach 
                    ? 'bg-amber-400' 
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.min(100, (elapsedHours / totalHours) * 100)}%` }}
              />
            </div>
          </div>

          {/* Escalation notice if breached */}
          {isBreached && (
            <div className="mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
              <div>
                <span className="font-semibold block">Auto-Escalation Triggered</span>
                <span className="text-[11px] text-rose-200/80">
                  {escalationTier || 'Forwarded to District Collectorate for nodal scrutiny bypass'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-rose-400 shrink-0" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
