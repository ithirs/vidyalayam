'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle2, Clock, Send, ChevronDown, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DOCUMENT_STUDENTS, DOC_LABELS, type DocType } from './data';
import { toast } from 'sonner';

const DOC_KEYS = Object.keys(DOC_LABELS) as DocType[];

function DocDetailRow({ label, collected, optional }: { label: string; collected: boolean; optional?: boolean }) {
  return (
    <div className={cn('flex items-center justify-between py-1.5 px-3 rounded-lg', collected ? 'bg-green-50' : 'bg-red-50/50')}>
      <div className="flex items-center gap-2">
        {collected
          ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
          : <Clock className="w-3.5 h-3.5 text-red-400 shrink-0" />
        }
        <span className={cn('text-xs', collected ? 'text-green-700 font-medium' : 'text-red-600')}>{label}</span>
        {optional && <span className="text-[10px] text-slate-400 italic">optional</span>}
      </div>
      <span className={cn('text-[10px] font-bold', collected ? 'text-green-600' : 'text-red-500')}>
        {collected ? 'Collected' : 'Pending'}
      </span>
    </div>
  );
}

export function DocumentTracker() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Document Tracker</h3>
          <p className="text-xs text-slate-400 mt-0.5">{DOCUMENT_STUDENTS.length} students with incomplete documents</p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
          <FolderOpen className="w-4 h-4 text-amber-500" />
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {DOCUMENT_STUDENTS.map((student) => {
          const collected = DOC_KEYS.filter((k) => student.docs[k]).length;
          const total = DOC_KEYS.length;
          const pct = Math.round((collected / total) * 100);
          const isOpen = expanded === student.id;

          let barColor = 'bg-red-500';
          let badgeColor = 'bg-red-50 text-red-700 border-red-200';
          if (pct >= 80) { barColor = 'bg-green-500'; badgeColor = 'bg-green-50 text-green-700 border-green-200'; }
          else if (pct >= 50) { barColor = 'bg-amber-400'; badgeColor = 'bg-amber-50 text-amber-700 border-amber-200'; }

          return (
            <div key={student.id} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 shrink-0">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{student.name}</p>
                      <p className="text-xs text-slate-400">{student.admClass}-{student.section} · Admitted {student.admDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn('text-xs font-bold px-2.5 py-1 rounded-xl border', badgeColor)}>
                      {collected}/{total} docs
                    </span>
                    <button
                      onClick={() => toast.success(`Reminder sent to ${student.name}'s parent (${student.phone})`)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors active:scale-95"
                    >
                      <Send className="w-3 h-3" />
                      Remind
                    </button>
                    <button
                      onClick={() => setExpanded(isOpen ? null : student.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
                    >
                      <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')} />
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-slate-400 font-medium">Document completion</span>
                    <span className="text-[11px] font-bold text-slate-600">{pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-500', barColor)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </div>

              {isOpen && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Documents Status</p>
                  <div className="space-y-1.5">
                    {DOC_KEYS.map((key) => (
                      <DocDetailRow
                        key={key}
                        label={DOC_LABELS[key]}
                        collected={student.docs[key]}
                        optional={key === 'caste_certificate'}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
