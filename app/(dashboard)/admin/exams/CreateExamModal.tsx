'use client';

import { useState } from 'react';
import { X, Plus, Trash2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBJECTS, CLASSES } from './data';

interface SubjectDateRow {
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface Props {
  onClose: () => void;
  onCreate: (name: string) => void;
}

const EXAM_TYPES = ['Unit Test', 'Midterm', 'Preliminary', 'Annual', 'Practical'];

export function CreateExamModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('Unit Test');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [subjectRows, setSubjectRows] = useState<SubjectDateRow[]>([
    { subjectId: 'math', date: '', startTime: '09:00', endTime: '11:00' },
  ]);
  const [typeOpen, setTypeOpen] = useState(false);
  const [step, setStep] = useState(1);

  const toggleClass = (c: string) => {
    setSelectedClasses((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  const addSubjectRow = () => {
    setSubjectRows((prev) => [...prev, { subjectId: '', date: '', startTime: '09:00', endTime: '11:00' }]);
  };

  const removeSubjectRow = (i: number) => {
    setSubjectRows((prev) => prev.filter((_, idx) => idx !== i));
  };

  const updateRow = (i: number, field: keyof SubjectDateRow, val: string) => {
    setSubjectRows((prev) => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  };

  const canProceed = step === 1
    ? name.trim() && startDate && endDate && selectedClasses.length > 0
    : subjectRows.every((r) => r.subjectId && r.date);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="font-bold text-slate-900 font-heading">Create New Exam</h2>
            <div className="flex items-center gap-1.5 mt-1">
              {[1, 2].map((s) => (
                <div key={s} className={cn('h-1.5 w-8 rounded-full transition-colors', step >= s ? 'bg-orange-500' : 'bg-slate-200')} />
              ))}
              <span className="text-xs text-slate-400 ml-1">Step {step} of 2</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Exam Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Midterm Exam 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Exam Type *</label>
                  <div className="relative">
                    <button
                      onClick={() => setTypeOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 hover:border-orange-300 transition-all bg-white"
                    >
                      {type}
                      <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', typeOpen && 'rotate-180')} />
                    </button>
                    {typeOpen && (
                      <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[50] py-1">
                        {EXAM_TYPES.map((t) => (
                          <button key={t} onClick={() => { setType(t); setTypeOpen(false); }}
                            className={cn('w-full text-left px-3.5 py-2 text-sm transition-colors', type === t ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}>
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Max Marks (Default)</label>
                  <input type="number" defaultValue={100} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">Start Date *</label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5">End Date *</label>
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Classes Covered *</label>
                <div className="flex flex-wrap gap-2">
                  {CLASSES.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleClass(c)}
                      className={cn(
                        'px-3 py-1.5 rounded-xl text-sm font-medium transition-all border',
                        selectedClasses.includes(c)
                          ? 'bg-orange-500 text-white border-orange-500'
                          : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Subject-wise Schedule</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Assign exam dates per subject</p>
                </div>
                <button onClick={addSubjectRow}
                  className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 px-2.5 py-1.5 rounded-lg border border-dashed border-orange-300 hover:bg-orange-50 transition-all">
                  <Plus className="w-3.5 h-3.5" /> Add Subject
                </button>
              </div>

              <div className="space-y-2">
                {subjectRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_80px_80px_32px] gap-2 items-center bg-slate-50 rounded-xl p-2.5">
                    <select
                      value={row.subjectId}
                      onChange={(e) => updateRow(i, 'subjectId', e.target.value)}
                      className="px-2.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-orange-400 outline-none bg-white"
                    >
                      <option value="">Subject</option>
                      {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                    <input type="date" value={row.date} onChange={(e) => updateRow(i, 'date', e.target.value)}
                      className="px-2.5 py-2 rounded-lg border border-slate-200 text-sm focus:border-orange-400 outline-none" />
                    <input type="time" value={row.startTime} onChange={(e) => updateRow(i, 'startTime', e.target.value)}
                      className="px-2 py-2 rounded-lg border border-slate-200 text-xs focus:border-orange-400 outline-none" />
                    <input type="time" value={row.endTime} onChange={(e) => updateRow(i, 'endTime', e.target.value)}
                      className="px-2 py-2 rounded-lg border border-slate-200 text-xs focus:border-orange-400 outline-none" />
                    <button onClick={() => removeSubjectRow(i)} className="p-1 text-slate-400 hover:text-red-500 transition-colors rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-3 shrink-0">
          <button
            onClick={() => step === 1 ? onClose() : setStep(1)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          <button
            onClick={() => step === 1 ? setStep(2) : onCreate(name)}
            disabled={!canProceed}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all',
              canProceed ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-brand-sm' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            )}
          >
            {step === 1 ? 'Next: Schedule Subjects' : 'Create Exam'}
          </button>
        </div>
      </div>
    </div>
  );
}
