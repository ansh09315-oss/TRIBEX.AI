import React from 'react';
import VoiceFormFiller from './student/VoiceFormFiller';
import ApplicationWizard from './student/ApplicationWizard';

export default function VoiceWizard({ 
  isOfflineMode, 
  onApplicationCreated, 
  onQueueBleMeshPacket 
}) {
  return (
    <div className="space-y-6">
      <ApplicationWizard
        isOfflineMode={isOfflineMode}
        onApplicationCreated={onApplicationCreated}
        onQueueBleMeshPacket={onQueueBleMeshPacket}
      />
    </div>
  );
}
