// Offline Storage & PWA Sync State Manager (LocalStorage & IndexedDB fallback)

const DRAFT_STORAGE_KEY = 'tribex_offline_application_draft';
const BLE_QUEUE_KEY = 'tribex_ble_mesh_queue';
const ACTIVE_APPS_KEY = 'tribex_applications_ledger';

export function getOfflineDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error reading offline draft', e);
    return null;
  }
}

export function saveOfflineDraft(draftData) {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({
      ...draftData,
      lastSavedAt: new Date().toISOString()
    }));
    return true;
  } catch (e) {
    console.error('Error saving offline draft', e);
    return false;
  }
}

export function clearOfflineDraft() {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing offline draft', e);
  }
}

export function getBleMeshQueue() {
  try {
    const raw = localStorage.getItem(BLE_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading BLE mesh queue', e);
    return [];
  }
}

export function queueBleMeshPacket(packet) {
  try {
    const queue = getBleMeshQueue();
    queue.push(packet);
    localStorage.setItem(BLE_QUEUE_KEY, JSON.stringify(queue));
    return queue;
  } catch (e) {
    console.error('Error queueing BLE mesh packet', e);
    return [];
  }
}

export function clearBleMeshQueue() {
  try {
    localStorage.removeItem(BLE_QUEUE_KEY);
  } catch (e) {
    console.error('Error clearing BLE mesh queue', e);
  }
}
