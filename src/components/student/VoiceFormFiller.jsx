import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Cpu, 
  FileText, 
  Languages, 
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';
import { DIALECT_SAMPLES } from '../../data/mockData';

export default function VoiceFormFiller({ onApplyExtractedData, currentFormData }) {
  const [selectedDialectId, setSelectedDialectId] = useState('santhali');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [extractedEntities, setExtractedEntities] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  const activeSample = DIALECT_SAMPLES.find(d => d.id === selectedDialectId) || DIALECT_SAMPLES[0];

  // Reset states when dialect switches
  const handleDialectChange = (dialectId) => {
    setSelectedDialectId(dialectId);
    setIsRecording(false);
    setIsProcessing(false);
    setTranscript('');
    setExtractedEntities(null);
    setHasApplied(false);
  };

  // Simulate Recording & Voice Stream
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      processAudio(transcript || activeSample.dialectPromptText);
    } else {
      setIsRecording(true);
      setTranscript('');
      setExtractedEntities(null);
      setHasApplied(false);

      // Simulate typewriter transcription of spoken dialect
      const textToType = activeSample.dialectPromptText;
      let charIdx = 0;
      const interval = setInterval(() => {
        if (charIdx <= textToType.length) {
          setTranscript(textToType.substring(0, charIdx));
          charIdx += 4;
        } else {
          clearInterval(interval);
          setIsRecording(false);
          processAudio(textToType);
        }
      }, 70);
    }
  };

  // Simulate LLM Parameter Extraction Pipeline
  const processAudio = (inputText) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setExtractedEntities(activeSample.extractedData);
    }, 1100);
  };

  const handleApply = () => {
    if (extractedEntities && onApplyExtractedData) {
      onApplyExtractedData(extractedEntities);
      setHasApplied(true);
      setTimeout(() => setHasApplied(false), 2500);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-slate-800 relative overflow-hidden">
      
      {/* Decorative Gradient Glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Cross-Lingual AI Voice Assistant
              <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                Multilingual LLM
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Speak naturally in your native tribal dialect — the AI parses and fills the form instantly.
            </p>
          </div>
        </div>

        {/* Dialect Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {DIALECT_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleDialectChange(sample.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedDialectId === sample.id
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sample.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dialect Context Strip */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <Languages className="w-3.5 h-3.5 text-cyan-400" />
          <span>Regional Corridor: <strong className="text-slate-200">{activeSample.region}</strong></span>
        </div>
        <div className="text-[11px] text-slate-400 hidden sm:block">
          Speaker: {activeSample.speaker}
        </div>
      </div>

      {/* Voice Recording / Simulation Canvas */}
      <div className="mt-4 p-5 rounded-xl bg-slate-950/60 border border-slate-800/80">
        
        <div className="flex flex-col sm:flex-row items-center gap-5">
          
          {/* Big Interactive Mic Button */}
          <div className="relative shrink-0">
            <button
              onClick={toggleRecording}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-500 text-white shadow-xl shadow-rose-500/40 scale-105'
                  : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 hover:scale-105 shadow-lg shadow-emerald-500/20'
              }`}
              title={isRecording ? 'Stop Recording' : 'Start Voice Input Simulation'}
            >
              {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </button>
            {isRecording && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-ping" />
            )}
          </div>

          {/* Voice Waveform and Audio Status */}
          <div className="flex-1 w-full text-center sm:text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-2">
                {isRecording ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    Listening to spoken {activeSample.name}...
                  </>
                ) : isProcessing ? (
                  <>
                    <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    Extracting Named Entities & Validating Schemas...
                  </>
                ) : transcript ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Speech Processed ({activeSample.audioDuration})
                  </>
                ) : (
                  'Click mic to speak or load dialect demo'
                )}
              </span>

              {/* Sound Wave Animation Bars */}
              {isRecording && (
                <div className="flex items-center gap-1 h-7">
                  <span className="w-1 bg-emerald-400 rounded-full wave-bar-1" />
                  <span className="w-1 bg-cyan-400 rounded-full wave-bar-2" />
                  <span className="w-1 bg-emerald-400 rounded-full wave-bar-3" />
                  <span className="w-1 bg-teal-400 rounded-full wave-bar-4" />
                  <span className="w-1 bg-cyan-400 rounded-full wave-bar-5" />
                </div>
              )}
            </div>

            {/* Transcript Typewriter Box */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-left min-h-[56px] text-xs">
              {transcript ? (
                <div>
                  <p className="text-slate-100 font-medium font-sans leading-relaxed">{transcript}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-800/60">
                    Phonetic: "{activeSample.romanizedTranscript}"
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 italic">
                  Example prompt: "{activeSample.romanizedTranscript}"
                </p>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* LLM Extracted Parameter Pipeline Cards */}
      {extractedEntities && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                LLM Parameter Extraction Result
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">
                {(activeSample.confidenceScores.overall * 100).toFixed(1)}% Confidence
              </span>
            </div>

            <button
              onClick={handleApply}
              disabled={hasApplied}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                hasApplied
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
              }`}
            >
              {hasApplied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Applied to Form!
                </>
              ) : (
                <>
                  <ArrowRight className="w-3.5 h-3.5" />
                  Auto-Populate Form
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Full Name (Beneficiary)</span>
              <span className="text-xs font-semibold text-white">{extractedEntities.fullName}</span>
              <span className="text-[10px] text-emerald-400 block font-mono mt-0.5">
                {(activeSample.confidenceScores.fullName * 100).toFixed(1)}% match
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Annual Household Income</span>
              <span className="text-xs font-semibold text-emerald-300 font-mono">
                ₹{Number(extractedEntities.annualIncome).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-emerald-400 block font-mono mt-0.5">
                {(activeSample.confidenceScores.annualIncome * 100).toFixed(1)}% match
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Tribe Registry Code</span>
              <span className="text-xs font-semibold text-cyan-300 font-mono">
                {extractedEntities.tribeId}
              </span>
              <span className="text-[10px] text-cyan-400 block font-mono mt-0.5">
                {extractedEntities.tribe}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 sm:col-span-2">
              <span className="text-[10px] text-slate-400 block">Enrolled Institution</span>
              <span className="text-xs font-semibold text-white truncate block">
                {extractedEntities.institution}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {extractedEntities.course}
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Home State / District</span>
                <span className="text-xs font-semibold text-slate-200">
                  {extractedEntities.district}, {extractedEntities.state}
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
