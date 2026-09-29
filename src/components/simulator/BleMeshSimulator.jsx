import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  Cpu, 
  Server, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  Terminal, 
  Zap,
  BatteryCharging,
  Signal
} from 'lucide-react';
import { MESH_NODES, MESH_ROUTE } from '../../utils/bleMeshSimulation';

export default function BleMeshSimulator({ 
  queuedPackets = [], 
  onFlushQueueToCentral,
  isOfflineMode,
  setIsOfflineMode 
}) {
  const [activeHopStep, setActiveHopStep] = useState(0);
  const [isSimulatingHops, setIsSimulatingHops] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    `[INIT] BLE Mesh Sub-GHz / 2.4GHz stack initialized.`,
    `[BEACON] Listening on Advertising Channel 37, 38, 39 for Forest PDU bursts.`,
    `[TOPOLOGY] 4 nodes active across Abujhmad-Bhanpratappur corridor.`
  ]);

  const addLog = (msg) => {
    setTerminalLogs(prev => [...prev.slice(-14), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Run full multi-hop automated simulation
  const runFullHopSimulation = () => {
    setIsSimulatingHops(true);
    setActiveHopStep(0);
    addLog(`>>> DISPATCH: Emitting encrypted BLE 5.3 packet from Deep-Forest Scout (Payload 2.4KB).`);

    setTimeout(() => {
      setActiveHopStep(1);
      addLog(`>>> HOP 1: Solar Relay #04 at Checkpost received packet. RSSI: -68 dBm. Forwarding via GATT Proxy.`);
      
      setTimeout(() => {
        setActiveHopStep(2);
        addLog(`>>> HOP 2: BharatNet VSAT Gateway node acquired mesh stream. Preparing MQTT-SN envelope.`);

        setTimeout(() => {
          setActiveHopStep(3);
          addLog(`>>> CLOUD INGEST: MoTA Central API New Delhi authenticated ZKP & added to live DBT queue!`);
          setIsSimulatingHops(false);
          
          if (onFlushQueueToCentral) {
            onFlushQueueToCentral();
          }
        }, 1200);

      }, 1200);

    }, 1200);
  };

  const resetSimulation = () => {
    setActiveHopStep(0);
    setIsSimulatingHops(false);
    addLog(`Simulation state reset to Node 0 (Scout Handheld).`);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Bar */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <Radio className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Deep-Forest P2P Bluetooth Mesh Sync Engine
                  <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                    No-Cellular Architecture
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Enables offline scholarship filing in deep tribal forest reserves without 4G/5G mobile tower connectivity.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={runFullHopSimulation}
              disabled={isSimulatingHops}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isSimulatingHops ? 'Transmitting Multi-Hop...' : 'Run Live Mesh Hop Test'}
            </button>

            <button
              onClick={resetSimulation}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Topographic Node Hop Diagram */}
        <div className="mt-8 relative">
          
          {/* Animated Connecting Track */}
          <div className="hidden lg:block absolute left-14 right-14 top-1/2 -translate-y-1/2 h-1 bg-slate-800/90 rounded-full" />
          
          {/* Active Highlight Line */}
          <div 
            className="hidden lg:block absolute left-14 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
            style={{ width: `${(activeHopStep / 3) * 82}%` }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {MESH_ROUTE.map((hop, idx) => {
              const nodeInfo = MESH_NODES[idx];
              const isCurrent = activeHopStep === idx;
              const isPassed = activeHopStep >= idx;

              return (
                <div
                  key={hop.nodeId}
                  onClick={() => setActiveHopStep(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-950/40 scale-102 ring-2 ring-indigo-500/20'
                      : isPassed
                      ? 'bg-slate-900/90 border-emerald-500/40'
                      : 'bg-slate-950/60 border-slate-800 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-indigo-500 text-slate-950 font-mono shadow-md shadow-indigo-500/30'
                        : isPassed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {idx === 0 && <Radio className="w-5 h-5" />}
                      {idx === 1 && <Cpu className="w-5 h-5" />}
                      {idx === 2 && <Wifi className="w-5 h-5" />}
                      {idx === 3 && <Server className="w-5 h-5" />}
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      Hop {idx}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1 truncate">{hop.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {hop.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1 text-[10px] font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Node ID:</span>
                      <span className="text-cyan-300 truncate max-w-[110px]">{nodeInfo.id}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Protocol:</span>
                      <span className="text-slate-300">{hop.protocol}</span>
                    </div>
                    {nodeInfo.signalRssi && (
                      <div className="flex justify-between text-slate-400">
                        <span>Signal (RSSI):</span>
                        <span className="text-emerald-400">{nodeInfo.signalRssi}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Lower Row: Queued Packet Buffer & Terminal Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Queued Packets Box */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Offline Queued Batch Packets Buffer
              </h4>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              {queuedPackets.length} Packets Buffered
            </span>
          </div>

          <div className="mt-3 space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {queuedPackets.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <Radio className="w-8 h-8 text-slate-600 mx-auto mb-2 opacity-50" />
                <p>No offline packets currently queued.</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Fill an application while in "Deep Forest (Offline)" mode to see packets buffer here.
                </p>
              </div>
            ) : (
              queuedPackets.map((pkt) => (
                <div 
                  key={pkt.id} 
                  className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-mono space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">{pkt.id}</span>
                    <span className="text-[10px] text-slate-400">{pkt.payloadSizeKb} KB</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    Beneficiary: <strong>{pkt.applicantSummary.name}</strong> ({pkt.applicantSummary.tribeId})
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                    <span>Checksum: {pkt.checksum}</span>
                    <span className="text-cyan-400">Ready for Hop-Sync</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {queuedPackets.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Reconnection Trigger:</span>
              <button
                onClick={onFlushQueueToCentral}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all cursor-pointer"
              >
                Force Gateway Flush
              </button>
            </div>
          )}
        </div>

        {/* Live Terminal Telemetry Output */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 font-mono text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-300">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-xs uppercase tracking-wider text-white">
                  Mesh Telemetry & Packet Sniffer
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="mt-3 p-3.5 rounded-xl bg-slate-950 text-slate-300 font-mono text-[11px] space-y-1.5 h-64 overflow-y-auto">
              {terminalLogs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-slate-500 select-none mr-1">$</span>
                  <span className={log.includes('HOP') ? 'text-cyan-300 font-semibold' : log.includes('INGEST') ? 'text-emerald-400 font-bold' : log.includes('DISPATCH') ? 'text-indigo-300' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>PHY: 2.4GHz GFSK 2Mbps</span>
            <span>Security: ChaCha20-Poly1305</span>
          </div>
        </div>

      </div>

    </div>
  );
}
