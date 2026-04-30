'use client';

import { useState } from 'react';
import { Plus, X, ChevronRight, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOMEWORK, type HomeworkItem } from './data';
import { toast } from 'sonner';

const STATUS_CONFIG = {
  pending: { label: 'Pending', classes: 'bg-amber-50 text-amber-700', icon: Clock },
  overdue: { label: 'Overdue', classes: 'bg-red-50 text-red-700', icon: AlertCircle },
  reviewed: { label: 'Reviewed', classes: 'bg-green-50 text-green-700', icon: CheckCircle2 },
};

function HomeworkDetailModal({ item, onClose }: { item: HomeworkItem; onClose: () => void }) {
  const pct = Math.round((item.submitted / item.totalStudents) * 100);
  const cfg = STATUS_CONFIG[item.status];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-md animate-scale-in">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{item.className} · {item.subject}</p>
            <h3 className="text-base font-bold text-slate-900 font-heading mt-0.5 pr-6">{item.title}</h3>
          </div>
          <button onClick={onClose} className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Given Date</span>
            <span className="font-medium text-slate-800">{item.givenDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Due Date</span>
            <span className="font-medium text-slate-800">{item.dueDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Status</span>
            <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.classes)}>{cfg.label}</span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-slate-600">Submissions</p>
            <p className="text-sm font-bold text-slate-900 tabular-nums">{item.submitted}/{item.totalStudents}</p>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-700', pct >= 90 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">{item.totalStudents - item.submitted} students yet to submit</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { toast.success('Marked as reviewed'); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand hover:from-orange-600 hover:to-orange-700 transition-all"
          >
            Mark as Reviewed
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function HomeworkSection() {
  const [selected, setSelected] = useState<HomeworkItem | null>(null);

  return (
    <>
      {selected && <HomeworkDetailModal item={selected} onClose={() => setSelected(null)} />}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-sm">Recent Homework</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all assigned classes</p>
          </div>
          <button
            onClick={() => toast.info('Assign New Homework — coming soon')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-brand-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Assign New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-4">Class</th>
                <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-4">Title</th>
                <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-4 hidden sm:table-cell">Due Date</th>
                <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-4 hidden md:table-cell">Submitted</th>
                <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="pb-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {HOMEWORK.map((hw) => {
                const cfg = STATUS_CONFIG[hw.status];
                const StatusIcon = cfg.icon;
                const pct = Math.round((hw.submitted / hw.totalStudents) * 100);
                return (
                  <tr
                    key={hw.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                    onClick={() => setSelected(hw)}
                  >
                    <td className="py-3 pr-4">
                      <span className="text-xs font-semibold text-slate-700">{hw.className}</span>
                    </td>
                    <td className="py-3 pr-4 max-w-[200px]">
                      <p className="text-sm text-slate-800 truncate">{hw.title}</p>
                    </td>
                    <td className="py-3 pr-4 hidden sm:table-cell">
                      <span className="text-xs text-slate-500">{hw.dueDate}</span>
                    </td>
                    <td className="py-3 pr-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn('h-full rounded-full', pct >= 90 ? 'bg-green-400' : pct >= 60 ? 'bg-amber-400' : 'bg-red-400')}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 tabular-nums">{hw.submitted}/{hw.totalStudents}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={cn('inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full', cfg.classes)}>
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-3 pl-2">
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
