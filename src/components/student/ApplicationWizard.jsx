import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Send, 
  Save, 
  Radio, 
  ShieldCheck, 
  Lock, 
  Check, 
  Sparkles, 
  HelpCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  Layers,
  GraduationCap
} from 'lucide-react';
import VoiceFormFiller from './VoiceFormFiller';
import ZkpProofCard from './ZkpProofCard';
import { MOTA_SCHEMES } from '../../data/mockData';
import { generateZkProof } from '../../utils/zkpSimulation';
import { getOfflineDraft, saveOfflineDraft } from '../../utils/offlineStorage';
import { createBlePacket } from '../../utils/bleMeshSimulation';

export default function ApplicationWizard({ 
  isOfflineMode, 
  onApplicationCreated, 
  onQueueBleMeshPacket 
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeneratingZkp, setIsGeneratingZkp] = useState(false);
  const [zkpResult, setZkpResult] = useState(null);
  const [lastDraftSaveTime, setLastDraftSaveTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  // Form State with offline-first hydration
  const [formData, setFormData] = useState({
    fullName: '',
    annualIncome: '',
    tribe: 'Santhal',
    tribeId: '',
    aadhaarNumber: '',
    bankAccountMasked: '',
    institution: '',
    course: '',
    schemeId: 'TOP-CLASS-ST',
    schemeName: 'Top Class Education Scheme for ST Students',
    state: 'Odisha',
    district: 'Mayurbhanj',
    filingMode: isOfflineMode ? 'BLE_MESH' : 'WEB_DIRECT'
  });

  // Restore existing offline draft on initial mount
  useEffect(() => {
    const saved = getOfflineDraft();
    if (saved) {
      setFormData(prev => ({ ...prev, ...saved }));
      setLastDraftSaveTime(saved.lastSavedAt ? new Date(saved.lastSavedAt).toLocaleTimeString() : 'Restored');
    }
  }, []);

  // Update filingMode if offline mode changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      filingMode: isOfflineMode ? 'BLE_MESH' : 'WEB_DIRECT'
    }));
  }, [isOfflineMode]);

  // Handle field updates with auto-save to offline storage
  const handleFieldChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    saveOfflineDraft(updated);
    setLastDraftSaveTime(new Date().toLocaleTimeString());
  };

  // Callback when voice assistant extracts fields
  const handleApplyVoiceData = (extracted) => {
    const updated = {
      ...formData,
      fullName: extracted.fullName,
      annualIncome: extracted.annualIncome,
      tribe: extracted.tribe || formData.tribe,
      tribeId: extracted.tribeId,
      institution: extracted.institution,
      course: extracted.course,
      state: extracted.state || formData.state,
      district: extracted.district || formData.district
    };
    setFormData(updated);
    saveOfflineDraft(updated);
    setLastDraftSaveTime(new Date().toLocaleTimeString());
  };

  // Run ZKP proof computation
  const handleComputeZkp = async () => {
    setIsGeneratingZkp(true);
    try {
      const selectedScheme = MOTA_SCHEMES.find(s => s.id === formData.schemeId);
      const proof = await generateZkProof({
        fullName: formData.fullName || 'Beneficiary Applicant',
        rawIncome: formData.annualIncome || '120000',
        maxIncomeThreshold: selectedScheme ? selectedScheme.maxIncomeLimit : 600000,
        tribeId: formData.tribeId || 'ST-OD-2024-8849',
        aadhaarNumber: formData.aadhaarNumber || '991823749102'
      });
      setZkpResult(proof);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingZkp(false);
    }
  };

  // Handle final submission (Online or BLE Mesh Queue)
  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    
    // Auto-generate ZKP if not generated yet
    let finalZkp = zkpResult;
    if (!finalZkp) {
      const selectedScheme = MOTA_SCHEMES.find(s => s.id === formData.schemeId);
      finalZkp = await generateZkProof({
        fullName: formData.fullName,
        rawIncome: formData.annualIncome,
        maxIncomeThreshold: selectedScheme ? selectedScheme.maxIncomeLimit : 600000,
        tribeId: formData.tribeId,
        aadhaarNumber: formData.aadhaarNumber
      });
      setZkpResult(finalZkp);
    }

    const newAppId = 'TX-2026-' + Math.floor(10000 + Math.random() * 90000);
    const selectedSchemeObj = MOTA_SCHEMES.find(s => s.id === formData.schemeId);

    const completeApplication = {
      id: newAppId,
      applicantName: formData.fullName || 'Birsa Murmu',
      tribe: formData.tribe,
      tribeId: formData.tribeId || 'ST-OD-2024-8849',
      state: formData.state,
      district: formData.district,
      schemeId: formData.schemeId,
      schemeName: selectedSchemeObj ? selectedSchemeObj.name : 'Top Class Education Scheme',
      grantAmount: selectedSchemeObj ? (selectedSchemeObj.maxIncomeLimit > 250000 ? 385000 : 48000) : 240000,
      disbursedSoFar: 0,
      annualIncome: Number(formData.annualIncome) || 120000,
      institution: formData.institution || 'NIT Rourkela',
      filingMethod: isOfflineMode ? 'Deep Forest P2P BLE Mesh (Offline)' : 'MoTA Direct Web Portal',
      filingDate: new Date().toISOString().split('T')[0],
      status: 'Application Submitted',
      stageIndex: 0,
      slaTotalHours: 168,
      slaElapsedHours: 0,
      slaStatus: 'HEALTHY',
      zkpVerified: finalZkp ? finalZkp.isEligible : true,
      zkpProofHash: finalZkp ? finalZkp.publicSignals[0] : '0x8f2c39...e8412b',
      aadhaarHash: 'sha256:' + Math.random().toString(36).substring(2, 14),
      bankAccountMasked: 'SBIN••••••' + Math.floor(1000 + Math.random() * 9000),
      npciAadhaarLinked: true,
      flaggedInDeDuplication: false,
      pvtgCategory: null
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);

      if (isOfflineMode) {
        // Queue as BLE Mesh packet
        const blePacket = createBlePacket(completeApplication);
        onQueueBleMeshPacket(blePacket);
      } else {
        // Direct addition to live applications ledger
        onApplicationCreated(completeApplication);
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Voice Assistant Integration Card */}
      <VoiceFormFiller 
        onApplyExtractedData={handleApplyVoiceData} 
        currentFormData={formData} 
      />

      {/* Main Wizard Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800">
        
        {/* Wizard Header & Stepper */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block">
              Step {currentStep} of 3
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {currentStep === 1 && 'Beneficiary Identity & Tribal Verification'}
              {currentStep === 2 && 'Scheme Allocation & Institutional Enrollment'}
              {currentStep === 3 && 'Zero-Knowledge Review & Submission'}
            </h2>
          </div>

          {/* Offline Draft Badge */}
          <div className="flex items-center gap-2">
            {lastDraftSaveTime && (
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                Draft saved locally: {lastDraftSaveTime}
              </span>
            )}
          </div>
        </div>

        {/* Form Body By Step */}
        <div className="py-6">
          
          {/* STEP 1: Personal & Tribal Profile */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Full Legal Name (Beneficiary) *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="e.g. Birsa Murmu"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Annual Household Income (₹ INR) *
                  </label>
                  <input
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => handleFieldChange('annualIncome', e.target.value)}
                    placeholder="e.g. 120000"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-mono"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Zero-Knowledge circuit checks eligibility threshold without leaking salary payslips.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Tribe Registry Certificate Code *
                  </label>
                  <input
                    type="text"
                    value={formData.tribeId}
                    onChange={(e) => handleFieldChange('tribeId', e.target.value)}
                    placeholder="e.g. ST-OD-2024-8849"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-mono uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Scheduled Tribe Classification *
                  </label>
                  <select
                    value={formData.tribe}
                    onChange={(e) => handleFieldChange('tribe', e.target.value)}
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  >
                    <option value="Santhal">Santhal (Odisha / Jharkhand)</option>
                    <option value="Gond (Dandami Maria)">Gond (Dandami Maria - Bastar/Abujhmad)</option>
                    <option value="Bhil">Bhil (MP / Rajasthan / Gujarat)</option>
                    <option value="Oraon (Kurukh)">Oraon (Kurukh - Jharkhand)</option>
                    <option value="Munda">Munda (Jharkhand)</option>
                    <option value="Baiga (PVTG)">Baiga (PVTG - MP & CG)</option>
                    <option value="Dongria Kondh (PVTG)">Dongria Kondh (PVTG - Niyamgiri)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Aadhaar Virtual ID / Hash Seed *
                  </label>
                  <input
                    type="password"
                    maxLength={16}
                    value={formData.aadhaarNumber}
                    onChange={(e) => handleFieldChange('aadhaarNumber', e.target.value)}
                    placeholder="•••• •••• •••• 9102"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-mono"
                  />
                  <span className="text-[11px] text-emerald-400/90 mt-1 block">
                    Protected by Zero-Knowledge proof. Raw Aadhaar is NEVER stored or sent to server.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Home State & District
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleFieldChange('state', e.target.value)}
                      placeholder="State"
                      className="glass-input px-3 py-2 rounded-xl text-sm"
                    />
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleFieldChange('district', e.target.value)}
                      placeholder="District"
                      className="glass-input px-3 py-2 rounded-xl text-sm"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* STEP 2: Scheme & Institution */}
          {currentStep === 2 && (
            <div className="space-y-6">
              
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  Select Applicable MoTA Scholarship / Fellowship Scheme *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOTA_SCHEMES.map((scheme) => (
                    <div
                      key={scheme.id}
                      onClick={() => {
                        handleFieldChange('schemeId', scheme.id);
                        handleFieldChange('schemeName', scheme.name);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.schemeId === scheme.id
                          ? 'bg-emerald-950/30 border-emerald-500 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {scheme.category}
                        </span>
                        <span className="text-xs font-bold text-emerald-400">
                          {scheme.grantAmount}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1.5">{scheme.name}</h4>
                      <p className="text-xs text-slate-400 line-clamp-2">{scheme.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    value={formData.institution}
                    onChange={(e) => handleFieldChange('institution', e.target.value)}
                    placeholder="e.g. National Institute of Technology, Rourkela"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Course / Degree Program *
                  </label>
                  <input
                    type="text"
                    value={formData.course}
                    onChange={(e) => handleFieldChange('course', e.target.value)}
                    placeholder="e.g. B.Tech Computer Science & Engg"
                    className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Zero-Knowledge Verification & Submission */}
          {currentStep === 3 && (
            <div className="space-y-6">
              
              {/* ZKP Verification Execution Card */}
              <ZkpProofCard 
                formData={formData} 
                zkpResult={zkpResult} 
                isGeneratingProof={isGeneratingZkp} 
              />

              {!zkpResult && (
                <div className="text-center py-2">
                  <button
                    onClick={handleComputeZkp}
                    disabled={isGeneratingZkp}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer inline-flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Compute Zero-Knowledge Proof Now
                  </button>
                </div>
              )}

              {/* Review Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <span className="font-semibold text-slate-300 uppercase tracking-wider text-[10px] block">
                  Application Summary for Dispatch
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Beneficiary:</span>
                    <strong className="text-white">{formData.fullName || 'Birsa Murmu'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tribe Code:</span>
                    <strong className="text-cyan-300 font-mono">{formData.tribeId || 'ST-OD-2024-8849'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Scheme:</span>
                    <strong className="text-slate-200 truncate block">{formData.schemeName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Transmission Mode:</span>
                    <strong className="text-emerald-400">
                      {isOfflineMode ? 'Deep-Forest BLE Mesh (Offline)' : 'MoTA Direct Web (Online)'}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Submission Success Banner */}
              {submissionSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold block">Application Registered Successfully!</span>
                      <span className="text-[11px] text-emerald-200/80">
                        {isOfflineMode 
                          ? 'Enqueued into P2P BLE Mesh node buffer. Ready for village gateway hop.' 
                          : 'Live DBT 7-Day SLA clock initialized on MoTA Core.'}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-white bg-emerald-500/30 px-2.5 py-1 rounded-lg">
                    TX-2026-ACTIVE
                  </span>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Wizard Controls Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-all cursor-pointer"
            >
              Back
            </button>
          ) : <div />}

          <div className="flex items-center gap-3">
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20"
              >
                Proceed to {currentStep === 1 ? 'Scheme Selection' : 'ZKP Verification'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitApplication}
                disabled={isSubmitting || submissionSuccess}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  submissionSuccess
                    ? 'bg-emerald-600 text-white cursor-default'
                    : isOfflineMode
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:brightness-110 shadow-lg shadow-emerald-500/20'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    {isOfflineMode ? 'Creating Encrypted BLE Packet...' : 'Transmitting to MoTA Core...'}
                  </>
                ) : submissionSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Enqueued & Tracked
                  </>
                ) : isOfflineMode ? (
                  <>
                    <Radio className="w-4 h-4" />
                    Enqueue for Deep-Forest BLE Mesh Hop
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Application (Start 7-Day SLA)
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
