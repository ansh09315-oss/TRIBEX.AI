import { useState, useEffect } from 'react';

const DRAFT_KEY = 'tribex_student_application_draft';
const MESH_QUEUE_KEY = 'tribex_ble_mesh_queue';

export interface ApplicationDraft {
  fullName: string;
  annualIncome: string;
  casteTribeName: string;
  tribeRegistryId: string;
  institution: string;
  course: string;
  stateCode: string;
  district: string;
  schemeId: string;
  lastSavedAt?: string;
}

export function useOfflineStorage() {
  const [draft, setDraft] = useState<ApplicationDraft | null>(null);
  const [queuedPacketsCount, setQueuedPacketsCount] = useState<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDraft(JSON.parse(saved));

      const queue = localStorage.getItem(MESH_QUEUE_KEY);
      if (queue) setQueuedPacketsCount(JSON.parse(queue).length);
    } catch (e) {
      console.error('Error loading offline draft', e);
    }
  }, []);

  const saveDraft = (data: ApplicationDraft) => {
    const updated = { ...data, lastSavedAt: new Date().toISOString() };
    setDraft(updated);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save draft to LocalStorage', e);
    }
  };

  const clearDraft = () => {
    setDraft(null);
    localStorage.removeItem(DRAFT_KEY);
  };

  const enqueueMeshPacket = (packet: any) => {
    try {
      const existing = localStorage.getItem(MESH_QUEUE_KEY);
      const queue = existing ? JSON.parse(existing) : [];
      queue.push(packet);
      localStorage.setItem(MESH_QUEUE_KEY, JSON.stringify(queue));
      setQueuedPacketsCount(queue.length);
      return queue;
    } catch (e) {
      console.error('Failed to enqueue BLE mesh packet', e);
      return [];
    }
  };

  const flushMeshQueue = () => {
    try {
      const existing = localStorage.getItem(MESH_QUEUE_KEY);
      const queue = existing ? JSON.parse(existing) : [];
      localStorage.removeItem(MESH_QUEUE_KEY);
      setQueuedPacketsCount(0);
      return queue;
    } catch (e) {
      console.error('Failed to flush BLE mesh queue', e);
      return [];
    }
  };

  return {
    draft,
    saveDraft,
    clearDraft,
    queuedPacketsCount,
    enqueueMeshPacket,
    flushMeshQueue
  };
}
