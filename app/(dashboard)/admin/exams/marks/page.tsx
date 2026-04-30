'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Save, ChevronDown, RefreshCw, ChartBar as BarChart3, TrendingUp, TrendingDown, Users, Check } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { generateStudents, calcTotal, calcGrade, rowBg, REMARK_OPTIONS, type StudentMark } from './data';
import { EXAMS, SUBJECTS, CLASSES, SECTIONS } from '../data';

const GRADE_COLORS: Record<string, string> = {
  'A+': 'bg-emerald-100 text-emerald-700',
  'A':  'bg-blue-100 text-blue-700',
  'B':  'bg-sky-100 text-sky-700',
  'C':  'bg-orange-100 text-orange-700',
  'D':  'bg-amber-100 text-amber-700',
  'F':  'bg-red-100 text-red-700',
};

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 font-medium hover:border-orange-300 transition-all min-w-[120px]"
      >
        <span className="text-slate-400 text-xs font-normal">{label}:</span>
        <span className="font-semibold">{value}</span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 ml-auto transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1 min-w-[150px]">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={cn('w-full text-left px-3.5 py-2 text-sm transition-colors', value === opt ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MarksEntryPage() {
  const [selectedExam, setSelectedExam] = useState(EXAMS[1].name);
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [students, setStudents] = useState<StudentMark[]>(() => generateStudents(40));
  const [saved, setSaved] = useState(false);
  const [bulkValue, setBulkValue] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const subj = SUBJECTS.find((s) => s.name === selectedSubject) || SUBJECTS[0];
  const maxWritten = subj.writtenMax;
  const maxPractical = subj.hasPractical ? subj.practicalMax : 0;
  const maxTotal = maxWritten + maxPractical;

  const entered = students.filter((s) => s.written !== null || s.practical !== null).length;
  const totals = students.map((s) => calcTotal(s.written, s.practical));
  const validTotals = totals.filter((t) => t !== null) as number[];
  const highest = validTotals.length ? Math.max(...validTotals) : null;
  const lowest = validTotals.length ? Math.min(...validTotals) : null;
  const avg = validTotals.length ? (validTotals.reduce((a, b) => a + b, 0) / validTotals.length) : null;
  const passCount = validTotals.filter((t) => (t / maxTotal) * 100 >= 35).length;

  const gradeDist = ['A+', 'A', 'B', 'C', 'D', 'F'].map((g) => ({
    grade: g,
    count: validTotals.filter((t) => calcGrade(t, maxTotal).grade === g).length,
  }));

  const triggerAutoSave = useCallback(() => {
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaved(true), 1500);
  }, []);

  const updateMark = (id: string, field: 'written' | 'practical', raw: string) => {
    const max = field === 'written' ? maxWritten : maxPractical;
    const val = raw === '' ? null : Math.min(Number(raw.replace(/[^0-9]/g, '')), max);
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, [field]: val } : s));
    triggerAutoSave();
  };

  const updateRemark = (id: string, val: string) => {
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, remarks: val } : s));
    triggerAutoSave();
  };

  const applyBulk = () => {
    const val = Number(bulkValue);
    if (isNaN(val)) return;
    setStudents((prev) => prev.map((s) => ({ ...s, written: Math.min(val, maxWritten) })));
    setShowBulk(false);
    setBulkValue('');
    triggerAutoSave();
  };

  const handleSave = () => {
    setSaved(true);
    toast.success(`Marks saved for ${selectedClass}-${selectedSection} · ${selectedSubject}`);
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="flex flex-col gap-5 pb-24">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Marks Entry</h1>
            <p className="text-sm text-slate-500 mt-0.5">Enter and manage student marks for exams</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <SelectField label="Exam" value={selectedExam} onChange={setSelectedExam} options={EXAMS.map((e) => e.name)} />
            <SelectField label="Class" value={selectedClass} onChange={setSelectedClass} options={CLASSES} />
            <SelectField label="Section" value={selectedSection} onChange={setSelectedSection} options={SECTIONS} />
            <SelectField label="Subject" value={selectedSubject} onChange={setSelectedSubject} options={SUBJECTS.map((s) => s.name)} />
            <div className="ml-auto flex items-center gap-2">
              {saved && (
                <div className="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                  <Check className="w-3.5 h-3.5" /> Auto-saved
                </div>
              )}
              {!saved && entered > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-orange-500 font-medium">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2 text-sm">
            <span className="font-bold text-slate-800">Marks Entry:</span>
            <span className="text-slate-600">{selectedExam}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">{selectedClass}-{selectedSection}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600">{selectedSubject}</span>
            <span className="text-slate-300">·</span>
            <span className="text-orange-600 font-semibold">Max: {maxTotal}</span>
            {subj.hasPractical && (
              <span className="text-xs text-slate-400">(Written: {maxWritten} + Practical: {maxPractical})</span>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Marks entered: <span className="text-orange-600 font-black">{entered}</span>/{students.length}
                </span>
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${(entered / students.length) * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBulk((o) => !o)}
                  className="text-xs font-semibold text-slate-600 hover:text-orange-600 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-orange-300 transition-all"
                >
                  Bulk Fill
                </button>
                {showBulk && (
                  <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-2.5 py-1.5">
                    <span className="text-xs text-orange-700">Fill all written:</span>
                    <input
                      type="number"
                      value={bulkValue}
                      onChange={(e) => setBulkValue(e.target.value)}
                      className="w-16 px-2 py-1 rounded-lg border border-orange-200 text-xs outline-none focus:border-orange-400"
                      placeholder="0"
                    />
                    <button onClick={applyBulk} className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-lg hover:bg-orange-600 transition-colors">Apply</button>
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-100">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-12">#</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Written<span className="text-orange-500 ml-0.5">/{maxWritten}</span>
                    </th>
                    {subj.hasPractical && (
                      <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                        Practical<span className="text-orange-500 ml-0.5">/{maxPractical}</span>
                      </th>
                    )}
                    <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Total<span className="text-orange-500 ml-0.5">/{maxTotal}</span>
                    </th>
                    <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade</th>
                    <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {students.map((s, idx) => {
                    const total = calcTotal(s.written, s.practical);
                    const grade = calcGrade(total, maxTotal);
                    const bg = rowBg(total, maxTotal);
                    return (
                      <tr key={s.id} className={cn('hover:bg-slate-50 transition-colors', bg)}>
                        <td className="px-4 py-2.5 text-xs font-mono text-slate-400">{s.rollNo}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0', s.avatarColor)}>
                              {s.avatarInitials}
                            </div>
                            <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-1.5">
                          <input
                            type="number"
                            min={0} max={maxWritten}
                            value={s.written ?? ''}
                            onChange={(e) => updateMark(s.id, 'written', e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Tab') {
                                const inputs = document.querySelectorAll<HTMLInputElement>('table input[type=number]');
                                const cur = Array.from(inputs).indexOf(e.currentTarget);
                                if (cur >= 0 && cur < inputs.length - 1) { e.preventDefault(); inputs[cur + 1].focus(); }
                              }
                            }}
                            placeholder="—"
                            className={cn(
                              'w-16 text-center px-2 py-1.5 rounded-lg border text-sm outline-none transition-all',
                              s.written !== null
                                ? 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white'
                                : 'border-dashed border-slate-200 bg-slate-50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100'
                            )}
                          />
                        </td>
                        {subj.hasPractical && (
                          <td className="px-3 py-1.5">
                            <input
                              type="number"
                              min={0} max={maxPractical}
                              value={s.practical ?? ''}
                              onChange={(e) => updateMark(s.id, 'practical', e.target.value)}
                              placeholder="—"
                              className={cn(
                                'w-16 text-center px-2 py-1.5 rounded-lg border text-sm outline-none transition-all',
                                s.practical !== null
                                  ? 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 bg-white'
                                  : 'border-dashed border-slate-200 bg-slate-50 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100'
                              )}
                            />
                          </td>
                        )}
                        <td className="px-3 py-2.5 text-center font-bold text-slate-800">
                          {total !== null ? total : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-center">
                          {total !== null ? (
                            <span className={cn('text-xs font-black px-2 py-0.5 rounded-full', grade.bg, grade.color)}>
                              {grade.grade}
                            </span>
                          ) : '—'}
                        </td>
                        <td className="px-3 py-1.5">
                          <select
                            value={s.remarks}
                            onChange={(e) => updateRemark(s.id, e.target.value)}
                            className="px-2 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 outline-none focus:border-orange-400 bg-white w-full"
                          >
                            {REMARK_OPTIONS.map((r) => <option key={r} value={r}>{r || 'No remark'}</option>)}
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="w-56 shrink-0 space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 space-y-3">
              <h3 className="font-bold text-slate-800 font-heading text-sm flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-500" /> Statistics
              </h3>
              {[
                { label: 'Highest', value: highest ?? '—', icon: TrendingUp, color: 'text-emerald-600' },
                { label: 'Lowest', value: lowest ?? '—', icon: TrendingDown, color: 'text-red-500' },
                { label: 'Average', value: avg !== null ? avg.toFixed(1) : '—', icon: BarChart3, color: 'text-blue-600' },
                { label: 'Pass Count', value: validTotals.length ? `${passCount}/${validTotals.length}` : '—', icon: Users, color: 'text-orange-600' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">{stat.label}</span>
                  <span className={cn('font-black font-heading', stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4">
              <h3 className="font-bold text-slate-800 font-heading text-sm mb-3">Grade Distribution</h3>
              <div className="space-y-2">
                {gradeDist.filter((g) => g.count > 0 || validTotals.length === 0).map((g) => (
                  <div key={g.grade} className="flex items-center gap-2">
                    <span className={cn('text-[10px] font-black w-5 text-center px-1 py-0.5 rounded', GRADE_COLORS[g.grade] || 'bg-slate-100 text-slate-500')}>
                      {g.grade}
                    </span>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-orange-400 transition-all"
                        style={{ width: validTotals.length ? `${(g.count / validTotals.length) * 100}%` : '0%' }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-4 text-right">{g.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-orange-600">{entered}</span> of <span className="font-semibold">{students.length}</span> students — marks entered
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
        >
          <Save className="w-4 h-4" />
          Save Marks
        </button>
      </div>
    </>
  );
}
