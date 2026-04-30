'use client';

import { TriangleAlert as AlertTriangle, PenLine, CircleCheck as CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PENDING_MARKS, type PendingMark } from './data';
import { toast } from 'sonner';

const URGENCY_CONFIG = {
  high: {
    border: 'border-red-200',
    bg: 'bg-red-50',
    badge: 'bg-red-100 text-red-700',
    label: 'Urgent',
    iconColor: 'text-red-500',
    dueColor: 'text-red-600',
  },
  medium: {
    border: 'border-amber-200',
    bg: 'bg-amber-50/50',
    badge: 'bg-amber-100 text-amber-700',
    label: 'Due Soon',
    iconColor: 'text-amber-500',
    dueColor: 'text-amber-600',
  },
  low: {
    border: 'border-slate-200',
    bg: 'bg-white',
    badge: 'bg-slate-100 text-slate-600',
    label: 'Upcoming',
    iconColor: 'text-slate-400',
    dueColor: 'text-slate-500',
  },
};

function MarkCard({ mark }: { mark: PendingMark }) {
  const cfg = URGENCY_CONFIG[mark.urgency];
  const pct = Math.round((mark.marksEntered / mark.totalStudents) * 100);

  return (
    <div className={cn('rounded-2xl border p-4 transition-all duration-150 hover:shadow-card-hover', cfg.border, cfg.bg)}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className={cn('mt-0.5 shrink-0', cfg.iconColor)}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-900 font-heading">
              {mark.className} · {mark.subject}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{mark.examName}</p>
          </div>
        </div>
        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0', cfg.badge)}>
          {cfg.label}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs mb-3">
        <span className="text-slate-500">
          Progress: <strong className="text-slate-700 tabular-nums">{mark.marksEntered}/{mark.totalStudents}</strong>
        </span>
        <span className={cn('font-semibold', cfg.dueColor)}>Due: {mark.dueDate}</span>
      </div>

      {mark.marksEntered > 0 && (
        <div className="h-1.5 bg-white/70 rounded-full overflow-hidden mb-3 border border-slate-200/50">
          <div
            className="h-full rounded-full bg-orange-400 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <button
        onClick={() => toast.info(`Enter marks for ${mark.className} ${mark.examName} — coming soon`)}
        className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-semibold shadow-brand-sm hover:shadow-brand transition-all duration-150 active:scale-[0.98]"
      >
        <PenLine className="w-3.5 h-3.5" />
        Enter Marks
      </button>
    </div>
  );
}

export function PendingMarksEntry() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Pending Marks Entry</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{PENDING_MARKS.length} exams awaiting marks</p>
        </div>
        {PENDING_MARKS.length === 0 && (
          <div className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            All up to date
          </div>
        )}
      </div>

      {PENDING_MARKS.length === 0 ? (
        <div className="text-center py-8">
          <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-2" />
          <p className="text-sm text-slate-500">No pending marks entries</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PENDING_MARKS.map((mark) => (
            <MarkCard key={mark.id} mark={mark} />
          ))}
        </div>
      )}
    </div>
  );
}
