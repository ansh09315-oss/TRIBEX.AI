// BLE Mesh Simulation Engine for Deep Forest Filing
// Simulates P2P Bluetooth Low Energy multi-hop routing from offline field devices to edge village gateways
export { MESH_NODES } from '../data/mockData';

export function createBlePacket(applicationDraft) {
  const packetId = 'PKT-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  const timestamp = new Date().toISOString();
  
  // Create cryptographic payload hash
  const rawString = JSON.stringify(applicationDraft) + timestamp;
  let hashVal = 0;
  for (let i = 0; i < rawString.length; i++) {
    hashVal = ((hashVal << 5) - hashVal + rawString.charCodeAt(i)) & 0xffffffff;
  }
  const payloadChecksum = 'crc32:' + Math.abs(hashVal).toString(16).padStart(8, '0');

  return {
    id: packetId,
    timestamp,
    sourceNode: 'SCOUT-ABUJHMAD-01',
    currentHop: 0,
    maxHops: 5,
    payloadSizeKb: (Math.random() * 2.5 + 1.2).toFixed(2),
    checksum: payloadChecksum,
    applicantSummary: {
      name: applicationDraft.fullName || 'Anonymous Beneficiary',
      scheme: applicationDraft.schemeName || 'Top Class ST Scheme',
      tribeId: applicationDraft.tribeId || 'ST-CG-2024-4192'
    },
    rawDraft: applicationDraft,
    hopHistory: [
      {
        nodeId: 'SCOUT-ABUJHMAD-01',
        nodeName: 'Forest Field Scout Handheld',
        rssi: '-82 dBm',
        time: new Date().toLocaleTimeString(),
        status: 'DISPATCHED_BLE_ADV'
      }
    ],
    status: 'QUEUED_OFFLINE'
  };
}

export const MESH_ROUTE = [
  {
    step: 0,
    nodeId: 'SCOUT-ABUJHMAD-01',
    title: 'Offline Forest Scout Device',
    desc: 'Local encrypted packet buffered on scout device in remote forest canopy (No 4G/5G).',
    protocol: 'BLE 5.3 Advertising PDU',
    rssi: '-82 dBm',
    icon: 'Radio'
  },
  {
    step: 1,
    nodeId: 'RELAY-PANCHAYAT-04',
    title: 'Solar Relay Repeater Node',
    desc: 'Solar-powered BLE relay located on forest boundary checkpost receives and re-broadcasts.',
    protocol: 'Bluetooth Mesh GATT Proxy',
    rssi: '-68 dBm',
    icon: 'Cpu'
  },
  {
    step: 2,
    nodeId: 'GATEWAY-VILLAGE-VSAT',
    title: 'Village BharatNet VSAT Gateway',
    desc: 'Community Centre satellite router decrypts mesh transport envelope and prepares batch upload.',
    protocol: 'MQTT-SN over Satellite Uplink',
    rssi: '-54 dBm',
    icon: 'Wifi'
  },
  {
    step: 3,
    nodeId: 'CENTRAL-MOTA-API',
    title: 'MoTA National Core (New Delhi)',
    desc: 'National backend validates ZKP proof, executes de-duplication crosscheck, and generates token.',
    protocol: 'HTTPS REST / TLS 1.3',
    latency: '34ms',
    icon: 'Server'
  }
];
