'use client';

import { useState } from 'react';
import { Download, TrendingUp, Award, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUBJECT_MARKS } from './data';
import { toast } from 'sonner';

const EXAMS = ['Half Yearly 2024-25', 'Unit Test 2 (2024-25)', 'Unit Test 1 (2024-25)', 'Annual 2023-24'];

function GradeChip({ grade }: { grade: string }) {
  const colors: Record<string, string> = {
    'A+': 'bg-green-50 text-green-700 border-green-200',
    'A': 'bg-teal-50 text-teal-700 border-teal-200',
    'B+': 'bg-blue-50 text-blue-700 border-blue-200',
    'B': 'bg-blue-50 text-blue-600 border-blue-200',
  };
  return (
    <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full border', colors[grade] ?? 'bg-slate-50 text-slate-600 border-slate-200')}>
      {grade}
    </span>
  );
}

export function ReportCardSection() {
  const [selectedExam, setSelectedExam] = useState(EXAMS[0]);
  const [examDropOpen, setExamDropOpen] = useState(false);

  const total = SUBJECT_MARKS.reduce((s, m) => s + m.marks, 0);
  const maxTotal = SUBJECT_MARKS.reduce((s, m) => s + m.max, 0);
  const pct = ((total / maxTotal) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Academic Performance</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Subject-wise results</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setExamDropOpen((o) => !o)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {selectedExam}
            <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', examDropOpen && 'rotate-180')} />
          </button>
          {examDropOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal z-50 py-1 w-52">
              {EXAMS.map((e) => (
                <button key={e} onClick={() => { setSelectedExam(e); setExamDropOpen(false); }}
                  className={cn('w-full text-left px-3 py-2 text-xs transition-colors', selectedExam === e ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}>
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Total', value: `${total}/${maxTotal}`, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Percentage', value: `${pct}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Class Rank', value: '3rd', icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={cn('rounded-xl p-3 text-center', bg)}>
            <Icon className={cn('w-4 h-4 mx-auto mb-1.5', color)} />
            <p className={cn('text-base font-bold font-heading tabular-nums', color)}>{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-2.5">
        {SUBJECT_MARKS.map((subject) => {
          const barPct = (subject.marks / subject.max) * 100;
          return (
            <div key={subject.subject}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-700">{subject.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-800 tabular-nums">{subject.marks}/{subject.max}</span>
                  <GradeChip grade={subject.grade} />
                </div>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-700',
                    barPct >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                    barPct >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                    'bg-gradient-to-r from-amber-400 to-amber-500'
                  )}
                  style={{ width: `${barPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
            <Award className="w-3.5 h-3.5" />
            Grade A+ · Outstanding
          </span>
        </div>
        <button
          onClick={() => toast.success('Downloading report card PDF…')}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors shadow-sm active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          Download PDF
        </button>
      </div>
    </div>
  );
}
