import React from 'react';
import ApplicationTracker from './student/ApplicationTracker';

export default function Tracker({ applications = [] }) {
  return <ApplicationTracker applications={applications} />;
}
