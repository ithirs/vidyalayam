'use client';

import { useState } from 'react';
import { X, SquareCheck as CheckSquare, Square, ChevronDown, IndianRupee, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DOC_LABELS, FEE_STRUCTURES, type Inquiry, type DocType } from './data';
import { toast } from 'sonner';

const CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const SECTIONS = ['A', 'B', 'C'];
const DOC_KEYS = Object.keys(DOC_LABELS) as DocType[];

interface AdmissionPanelProps {
  inquiry: Inquiry;
  onClose: () => void;
}

export function AdmissionPanel({ inquiry, onClose }: AdmissionPanelProps) {
  const [selectedClass, setSelectedClass] = useState(inquiry.classSeeking || 'Class 6');
  const [selectedSection, setSelectedSection] = useState('A');
  const [docs, setDocs] = useState<Record<DocType, boolean>>(
    DOC_KEYS.reduce((acc, k) => ({ ...acc, [k]: false }), {} as Record<DocType, boolean>)
  );
  const [studentName, setStudentName] = useState(inquiry.studentName);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');

  const feeStruct = FEE_STRUCTURES[selectedClass] ?? FEE_STRUCTURES['Class 6'];
  const docsDone = DOC_KEYS.filter((k) => docs[k]).length;

  const toggleDoc = (key: DocType) => setDocs((d) => ({ ...d, [key]: !d[key] }));

  const handleSubmit = () => {
    toast.success(`${studentName} admitted to ${selectedClass}-${selectedSection}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white h-full w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <UserPlus className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-bold font-heading text-base">New Admission</h2>
                <p className="text-xs text-blue-100">From inquiry · {inquiry.parentName}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-colors">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Student Details */}
          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Student Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Student Name</label>
                <input value={studentName} onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-800 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parent / Guardian</label>
                <input defaultValue={inquiry.parentName}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Date of Birth</label>
                  <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700 bg-white">
                    {['Male', 'Female', 'Other'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Phone</label>
                <input defaultValue={inquiry.phone}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700" />
              </div>
            </div>
          </section>

          {/* Class Assignment */}
          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Class Assignment</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Class</label>
                <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700 bg-white">
                  {CLASSES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Section</label>
                <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700 bg-white">
                  {SECTIONS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Fee Structure */}
          <section>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Fee Structure</h3>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
              {[
                { label: 'Tuition Fee', amount: feeStruct.tuition },
                { label: 'Transport Fee', amount: feeStruct.transport },
                { label: 'Sports Fee', amount: feeStruct.sports },
              ].map(({ label, amount }) => (
                <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 last:border-b-0">
                  <span className="text-sm text-slate-600">{label}</span>
                  <span className="text-sm font-semibold text-slate-800 tabular-nums">₹{amount.toLocaleString('en-IN')}/mo</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 bg-blue-50 border-t border-blue-100">
                <span className="text-sm font-bold text-blue-800">Total / Month</span>
                <span className="text-base font-bold text-blue-900 tabular-nums">₹{feeStruct.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </section>

          {/* Documents Checklist */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Document Checklist</h3>
              <span className={cn('text-xs font-bold px-2 py-0.5 rounded-lg', docsDone === DOC_KEYS.length ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700')}>
                {docsDone}/{DOC_KEYS.length} collected
              </span>
            </div>
            <div className="space-y-2">
              {DOC_KEYS.map((key) => {
                const isChecked = docs[key];
                const isOptional = key === 'caste_certificate';
                return (
                  <button key={key} onClick={() => toggleDoc(key)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all',
                      isChecked ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200 hover:border-slate-300'
                    )}>
                    {isChecked
                      ? <CheckSquare className="w-4.5 h-4.5 text-green-600 shrink-0" />
                      : <Square className="w-4.5 h-4.5 text-slate-300 shrink-0" />
                    }
                    <span className={cn('text-sm font-medium flex-1', isChecked ? 'text-green-800' : 'text-slate-700')}>
                      {DOC_LABELS[key]}
                    </span>
                    {isOptional && <span className="text-[10px] text-slate-400 font-medium italic">if applicable</span>}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
          <div className="flex gap-2">
            <button onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button onClick={handleSubmit}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98] flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Confirm Admission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
