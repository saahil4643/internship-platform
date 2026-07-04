import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import {
  Send,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileCheck,
  Clock
} from 'lucide-react';

export const DocRequestsPage: React.FC = () => {
  const { currentStudent, docRequests, requestDoc, projects } = useApp();
  const [docType, setDocType] = useState<'verification_letter' | 'experience_letter' | 'certificate'>('verification_letter');
  const [showToast, setShowToast] = useState(false);

  const activeProject = projects.find(p => p.id === currentStudent.currentProjectId);
  const isProfileComplete = currentStudent.profileCompletion === 100;
  const isProjectComplete = activeProject ? activeProject.progress === 100 : false;

  // Final Certificate lock check
  const isCertificateLocked = docType === 'certificate' && (!isProfileComplete || !isProjectComplete);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCertificateLocked) return;

    requestDoc(docType);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getDocTypeLabel = (type: typeof docType) => {
    switch (type) {
      case 'verification_letter': return 'NOC / Verification Letter';
      case 'experience_letter': return 'Experience Letter';
      case 'certificate': return 'Final Internship Certificate';
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 z-50 text-sm">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Request submitted successfully!</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Document Request Center</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Request official certificates, recommendation letters, and NOCs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Request Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Submit New Document Request</h3>
            
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-400">Select Document Type</label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                >
                  <option value="verification_letter">NOC / Internship Verification Letter</option>
                  <option value="experience_letter">Experience Letter</option>
                  <option value="certificate">Final Internship Certificate</option>
                </select>
              </div>

              {/* Requirement Alert Banner if Certificate lock applies */}
              {docType === 'certificate' && (
                <div className="p-4 rounded-xl border border-dashed border-amber-250 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10 space-y-2.5 text-xs text-slate-650 dark:text-slate-400">
                  <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 font-semibold">
                    <AlertTriangle className="h-4.5 w-4.5 shrink-0" />
                    <span>Certificate Issue Requirements</span>
                  </div>
                  <div className="space-y-1.5 pl-1">
                    <div className="flex items-center justify-between">
                      <span>1. Profile completion score is 100%</span>
                      {isProfileComplete ? (
                        <span className="text-[10px] font-bold text-emerald-600">PASSED ({currentStudent.profileCompletion}%)</span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-500">LOCKED ({currentStudent.profileCompletion}%)</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>2. Core Assigned Project progress is 100%</span>
                      {isProjectComplete ? (
                        <span className="text-[10px] font-bold text-emerald-600">PASSED (100%)</span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-500">LOCKED ({activeProject ? `${activeProject.progress}%` : 'No Project'})</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isCertificateLocked}
                className={`w-full font-semibold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  isCertificateLocked
                    ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                    : 'bg-indigo-650 hover:bg-indigo-600 text-white shadow-sm shadow-indigo-600/10 active:scale-98'
                }`}
              >
                <Send className="h-4 w-4" />
                <span>Submit Request</span>
              </button>
            </form>
          </div>

          {/* Request History */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 dark:border-slate-850/50">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Document Request History</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-550">
                    <th className="px-5 py-4">Document Type</th>
                    <th className="px-5 py-4">Date Requested</th>
                    <th className="px-5 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850/40 text-xs">
                  {docRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-850/20 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {getDocTypeLabel(req.type)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {req.requestDate}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Badge type={req.status} />
                      </td>
                    </tr>
                  ))}
                  {docRequests.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-5 py-8 text-center text-slate-400">
                        No previous document requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Issued Documents & Downloads */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
              Issued Documents
            </h3>
            
            <div className="space-y-3">
              {docRequests.filter(req => req.status === 'completed').length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
                  <Clock className="mx-auto h-6 w-6 text-slate-400 mb-1" />
                  <p className="text-[10px] text-slate-450">No documents issued yet.</p>
                </div>
              ) : (
                docRequests
                  .filter(req => req.status === 'completed')
                  .map((req) => (
                    <div
                      key={req.id}
                      className="p-3.5 border border-slate-200 dark:border-slate-800/80 rounded-xl hover:border-indigo-500/20 bg-slate-50/30 dark:bg-slate-950/10 flex items-center justify-between text-xs transition-colors"
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        <FileCheck className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-slate-800 dark:text-white truncate">
                            {req.type === 'verification_letter' ? 'NOC_Letter.pdf' : req.type === 'experience_letter' ? 'Exp_Letter.pdf' : 'Internship_Certificate.pdf'}
                          </h4>
                          <span className="text-[9px] text-slate-400 block mt-0.5">PDF • 185 KB</span>
                        </div>
                      </div>
                      <a
                        href="/placeholder.pdf"
                        download
                        className="text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-305 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:shadow-sm transition-all shrink-0"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3.5 text-xs text-slate-655 dark:text-slate-400">
            <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider">
              Verification Pipeline
            </h3>
            <p className="leading-relaxed">Official letters are signed cryptographically and registered on our verification portal for university validations.</p>
            <div className="relative border-l border-slate-100 dark:border-slate-800 pl-4 space-y-4.5 pt-1.5">
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-800 dark:text-white">1. Submission Queue</span>
                <p className="text-[10px] text-slate-400">Request enters processing queue.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-bold text-slate-800 dark:text-white">2. Coordinator Review</span>
                <p className="text-[10px] text-slate-400">Internship supervisor signs off details.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-0.5 h-2 w-2 rounded-full bg-slate-350 dark:bg-slate-700" />
                <span className="font-bold text-slate-805 dark:text-white">3. Issuance</span>
                <p className="text-[10px] text-slate-400">PDF generated with verification hash.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
