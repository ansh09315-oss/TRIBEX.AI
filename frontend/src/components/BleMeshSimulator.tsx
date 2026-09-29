import React, { useState } from 'react';
import { 
  Radio, 
  Cpu, 
  Wifi, 
  Server, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Activity, 
  Terminal, 
  Zap, 
  Layers 
} from 'lucide-react';
import { apiService } from '../services/api';

const MESH_NODES = [
  {
    id: 'SCOUT-ABUJHMAD-01',
    name: 'Field Scout Handheld (Forest Canopy)',
    rssi: '-82 dBm',
    protocol: 'BLE 5.3 Advertising PDU',
    status: 'OFFLINE_BUFFERED',
    icon: Radio
  },
  {
    id: 'RELAY-PANCHAYAT-04',
    name: 'Solar Relay (Checkpost Repeater)',
    rssi: '-68 dBm',
    protocol: 'Bluetooth Mesh GATT Proxy',
    status: 'RELAYING',
    icon: Cpu
  },
  {
    id: 'GATEWAY-VILLAGE-VSAT',
    name: 'Village BharatNet VSAT Gateway',
    rssi: '-54 dBm',
    protocol: 'MQTT-SN over Satellite',
    status: 'ONLINE',
    icon: Wifi
  },
  {
    id: 'CENTRAL-MOTA-API',
    name: 'MoTA National Core (New Delhi)',
    latency: '34ms',
    protocol: 'HTTPS REST / TLS 1.3',
    status: 'CENTRAL_INGEST',
    icon: Server
  }
];

export const BleMeshSimulator: React.FC = () => {
  const [activeHop, setActiveHop] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [syncedCount, setSyncedCount] = useState<number>(3);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    '[INIT] Bluetooth 5.3 Mesh sub-stack initialized.',
    '[SCAN] Listening on non-cellular Advertising channels 37, 38, 39.',
    '[BUFFER] 3 encrypted student packets awaiting hop relay.'
  ]);

  const addLog = (msg: string) => {
    setTelemetryLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleRunMeshHop = async () => {
    setIsSimulating(true);
    setActiveHop(0);
    addLog('>>> DISPATCH: Emitting encrypted BLE 5.3 packet from Deep-Forest Scout (Payload 2.4KB).');

    setTimeout(() => {
      setActiveHop(1);
      addLog('>>> HOP 1: Solar Checkpost Relay received packet. RSSI -68 dBm. Forwarding via GATT Proxy.');

      setTimeout(() => {
        setActiveHop(2);
        addLog('>>> HOP 2: BharatNet VSAT Gateway acquired mesh stream. Preparing MQTT-SN envelope.');

        setTimeout(async () => {
          setActiveHop(3);
          addLog('>>> CENTRAL INGEST: MoTA Core validated ZKP & assigned 7-Day SLA clock.');
          
          await apiService.syncMeshBatch([
            {
              packet_id: 'PKT-9921',
              source_node: 'SCOUT-ABUJHMAD-01',
              timestamp: new Date().toISOString(),
              checksum: 'crc32:8f410a',
              applicant_data: { name: 'Somu Madkam', tribe: 'Gond' }
            }
          ]);

          setIsSimulating(false);
          setSyncedCount(prev => prev + 1);
        }, 1200);

      }, 1200);

    }, 1200);
  };

  const resetSimulator = () => {
    setActiveHop(0);
    setIsSimulating(false);
    addLog('Simulator reset to Scout device.');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-indigo-400 animate-pulse" />
              P2P Bluetooth Mesh Offline-First Sync Simulator
            </h3>
            <p className="text-xs text-slate-400">
              Demonstrates packet propagation from dense forest canopy to village satellite hub without cellular 4G/5G.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunMeshHop}
              disabled={isSimulating}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {isSimulating ? 'Hopping...' : 'Simulate Batch Sync'}
            </button>
            <button
              onClick={resetSimulator}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Multi-Node Topology */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MESH_NODES.map((node, idx) => {
            const isCurrent = activeHop === idx;
            const isPassed = activeHop >= idx;
            const NodeIcon = node.icon;

            return (
              <div
                key={node.id}
                onClick={() => setActiveHop(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-xl shadow-indigo-950/40 scale-102 ring-2 ring-indigo-500/20'
                    : isPassed
                    ? 'bg-slate-900/90 border-emerald-500/40'
                    : 'bg-slate-950/60 border-slate-800 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    isCurrent
                      ? 'bg-indigo-500 text-slate-950 shadow-md'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    <NodeIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    Node {idx}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white mb-1 truncate">{node.name}</h4>
                <div className="space-y-1 text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span>Protocol:</span>
                    <span className="text-slate-300">{node.protocol}</span>
                  </div>
                  {node.rssi && (
                    <div className="flex justify-between">
                      <span>Signal:</span>
                      <span className="text-emerald-400">{node.rssi}</span>
                    </div>
                  )}
                  {node.latency && (
                    <div className="flex justify-between">
                      <span>Cloud Latency:</span>
                      <span className="text-cyan-400">{node.latency}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Sniffer Log */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 space-y-1 border border-slate-800 max-h-40 overflow-y-auto">
          {telemetryLogs.map((log, i) => (
            <div key={i} className="leading-relaxed">
              <span className="text-slate-600 mr-1">$</span>
              <span className={log.includes('HOP') ? 'text-cyan-300' : log.includes('INGEST') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
