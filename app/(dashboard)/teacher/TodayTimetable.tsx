'use client';

import { useState, useEffect } from 'react';
import { BookOpen, CircleCheck as CheckCircle2, Clock, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TIMETABLE, type TimetablePeriod } from './data';

function PeriodRow({ period }: { period: TimetablePeriod }) {
  if (period.status === 'break') {
    return (
      <div className="flex items-center gap-3 px-3 py-2">
        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
          <Coffee className="w-3.5 h-3.5 text-slate-300" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-slate-400">{period.subject}</p>
        </div>
        <span className="text-[11px] text-slate-300 tabular-nums whitespace-nowrap">
          {period.timeStart} – {period.timeEnd}
        </span>
      </div>
    );
  }

  const isCurrent = period.status === 'current';
  const isCompleted = period.status === 'completed';

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-3 rounded-xl border transition-all duration-150',
        isCurrent
          ? 'border-orange-200 bg-orange-50/60 shadow-sm'
          : isCompleted
          ? 'border-slate-100 bg-slate-50/40'
          : 'border-slate-100 hover:bg-slate-50'
      )}
    >
      <div
        className={cn(
          'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
          isCurrent ? 'bg-orange-100' : isCompleted ? 'bg-slate-100' : 'bg-blue-50'
        )}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
        ) : isCurrent ? (
          <BookOpen className="w-3.5 h-3.5 text-orange-500" />
        ) : (
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p
            className={cn(
              'text-sm font-semibold leading-tight',
              isCurrent ? 'text-orange-700' : isCompleted ? 'text-slate-400' : 'text-slate-800'
            )}
          >
            {period.subject}
          </p>
          {isCurrent && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-orange-500 text-white animate-pulse-brand">
              NOW
            </span>
          )}
        </div>
        <p className={cn('text-[11px] mt-0.5', isCompleted ? 'text-slate-300' : 'text-slate-400')}>
          {period.className} &bull; {period.room}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={cn(
            'text-[11px] font-semibold tabular-nums whitespace-nowrap',
            isCurrent ? 'text-orange-500' : isCompleted ? 'text-slate-300' : 'text-slate-400'
          )}
        >
          {period.timeStart}–{period.timeEnd}
        </p>
        {!period.status.includes('break') && (
          <p className={cn('text-[10px]', isCompleted ? 'text-slate-300' : 'text-slate-400')}>
            P{period.period}
          </p>
        )}
      </div>
    </div>
  );
}

export function TodayTimetable() {
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
    );
  }, []);

  const current = TIMETABLE.find((p) => p.status === 'current');
  const upcoming = TIMETABLE.filter((p) => p.status === 'upcoming');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Today&apos;s Timetable</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{today}</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-medium">6 periods</span>
        </div>
      </div>

      {current && (
        <div className="mb-3 p-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-brand-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-semibold opacity-80 uppercase tracking-wide">Current Period</p>
              <p className="text-base font-bold font-heading mt-0.5">{current.subject} · {current.className}</p>
              <p className="text-xs opacity-80 mt-0.5">{current.room} &bull; {current.timeStart}–{current.timeEnd}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          </div>
          {upcoming.length > 0 && (
            <div className="mt-2.5 pt-2.5 border-t border-white/20 flex items-center gap-1.5">
              <span className="text-[10px] opacity-70">Up next:</span>
              <span className="text-xs font-semibold">{upcoming[0].className} · {upcoming[0].timeStart}</span>
            </div>
          )}
        </div>
      )}

      <div className="space-y-1.5 flex-1 overflow-y-auto max-h-[320px] pr-0.5">
        {TIMETABLE.map((period) => (
          <PeriodRow key={period.id} period={period} />
        ))}
      </div>
    </div>
  );
}
