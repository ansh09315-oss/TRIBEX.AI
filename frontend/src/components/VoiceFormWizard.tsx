import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Cpu, 
  Languages, 
  Save, 
  CheckCircle2 
} from 'lucide-react';
import { useVoiceRecognition, DIALECT_OPTIONS } from '../hooks/useVoiceRecognition';
import { useOfflineStorage } from '../hooks/useOfflineStorage';

interface VoiceFormWizardProps {
  onFormSubmitted?: (formData: any) => void;
  isOfflineMode?: boolean;
}

export const VoiceFormWizard: React.FC<VoiceFormWizardProps> = ({ 
  onFormSubmitted,
  isOfflineMode = false 
}) => {
  const {
    selectedDialect,
    setSelectedDialect,
    isListening,
    startVoiceInput,
    stopVoiceInput,
    transcript,
    isParsing,
    parsedData
  } = useVoiceRecognition();

  const { saveDraft, enqueueMeshPacket } = useOfflineStorage();

  const [formData, setFormData] = useState({
    fullName: '',
    annualIncome: '',
    casteTribeName: 'Santhal',
    tribeRegistryId: '',
    course: '',
    institution: '',
    stateCode: 'OD',
    district: 'Mayurbhanj'
  });

  const [hasAppliedVoice, setHasAppliedVoice] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleApplyExtracted = () => {
    if (!parsedData) return;
    const updated = {
      ...formData,
      fullName: parsedData.fullName,
      annualIncome: parsedData.annualIncome,
      casteTribeName: parsedData.tribe,
      tribeRegistryId: parsedData.tribeId,
      course: parsedData.course,
      institution: parsedData.institution
    };
    setFormData(updated);
    saveDraft(updated);
    setHasAppliedVoice(true);
    setTimeout(() => setHasAppliedVoice(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const appData = {
      ...formData,
      id: `TX-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      submissionTimestamp: new Date().toISOString(),
      isOffline: isOfflineMode
    };

    if (isOfflineMode) {
      enqueueMeshPacket({
        packet_id: `PKT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        source_node: 'SCOUT-ABUJHMAD-01',
        checksum: `crc32:${Math.floor(Math.random() * 1000000).toString(16)}`,
        applicant_data: appData
      });
    }

    setSubmissionSuccess(true);
    if (onFormSubmitted) onFormSubmitted(appData);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Voice Assistant Header & Dialect Controls */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Cross-Lingual AI Voice Form-Filler
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Multilingual LLM
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Speak naturally in tribal dialects — AI maps audio into verified schema fields.
              </p>
            </div>
          </div>

          {/* Dialect Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {DIALECT_OPTIONS.map((dialect) => (
              <button
                key={dialect.id}
                type="button"
                onClick={() => setSelectedDialect(dialect)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDialect.id === dialect.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {dialect.name}
              </button>
            ))}
          </div>
        </div>

        {/* Audio Recording & Waveform Section */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={isListening ? stopVoiceInput : startVoiceInput}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
            }`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <div className="flex-1 w-full">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-300">
                {isListening ? `Listening to spoken ${selectedDialect.name}...` : isParsing ? 'Extracting schema entities...' : transcript ? 'Speech recognized' : 'Click mic to speak dialect audio demo'}
              </span>
              {isListening && (
                <div className="flex items-center gap-1">
                  <span className="w-1 h-4 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-1 h-6 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="w-1 h-5 bg-teal-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                </div>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-200 min-h-[46px] border border-slate-800">
              {transcript || <span className="text-slate-500 italic">Dialect prompt: "{selectedDialect.sampleTranscript}"</span>}
            </div>
          </div>
        </div>

        {/* Extracted Parameter Banner */}
        {parsedData && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Extracted Identity Parameters
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  98.8% Confidence
                </span>
              </div>

              <button
                type="button"
                onClick={handleApplyExtracted}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                {hasAppliedVoice ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                {hasAppliedVoice ? 'Applied to Form!' : 'Auto-Fill Form'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Name:</span>
                <strong className="text-white truncate block">{parsedData.fullName}</strong>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Income:</span>
                <strong className="text-emerald-400 font-bold block">₹{Number(parsedData.annualIncome).toLocaleString('en-IN')}</strong>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Tribe ID:</span>
                <strong className="text-cyan-300 block">{parsedData.tribeId}</strong>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Institution:</span>
                <strong className="text-slate-300 truncate block">{parsedData.institution}</strong>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 2. Structured Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <span>Official Application Details</span>
          {isOfflineMode && (
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
              BLE Mesh Offline Buffer
            </span>
          )}
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Birsa Murmu"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Household Income (₹) *</label>
            <input
              type="number"
              required
              value={formData.annualIncome}
              onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              placeholder="e.g. 120000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Caste / Tribe Registry ID *</label>
            <input
              type="text"
              required
              value={formData.tribeRegistryId}
              onChange={(e) => setFormData({ ...formData, tribeRegistryId: e.target.value })}
              placeholder="e.g. ST-OD-2024-8849"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-cyan-300 font-mono focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Enrolled Institution / College *</label>
            <input
              type="text"
              required
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              placeholder="e.g. NIT Rourkela"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Degree Course *</label>
            <input
              type="text"
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              placeholder="e.g. B.Tech Computer Science"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">District / State</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder="District"
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
              <input
                type="text"
                value={formData.stateCode}
                onChange={(e) => setFormData({ ...formData, stateCode: e.target.value })}
                placeholder="State"
                className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white"
              />
            </div>
          </div>
        </div>

        {submissionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <span className="font-semibold">
              {isOfflineMode 
                ? 'Application enqueued into offline BLE Mesh buffer. Ready for village gateway hop!' 
                : 'Application submitted directly to MoTA Core. 7-Day SLA clock running!'}
            </span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
        )}

        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-slate-950 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            {isOfflineMode ? 'Save & Enqueue BLE Mesh Packet' : 'Submit Application & Start 7-Day SLA'}
          </button>
        </div>
      </form>

    </div>
  );
};
