'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buildAttendanceDays, type AttendanceDay } from './data';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const STATUS_CONFIG: Record<AttendanceDay['status'], { dot: string; cell: string; label: string }> = {
  present: { dot: 'bg-green-500', cell: 'bg-green-50 text-green-800 border-green-200', label: 'Present' },
  absent: { dot: 'bg-red-500', cell: 'bg-red-50 text-red-700 border-red-200', label: 'Absent' },
  late: { dot: 'bg-orange-400', cell: 'bg-orange-50 text-orange-700 border-orange-200', label: 'Late' },
  holiday: { dot: 'bg-slate-300', cell: 'bg-slate-100 text-slate-400 border-slate-200', label: 'Holiday' },
  weekend: { dot: '', cell: 'text-slate-300 border-transparent', label: 'Weekend' },
  future: { dot: '', cell: 'text-slate-300 border-transparent', label: 'Future' },
};

export function AttendanceCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const days = buildAttendanceDays(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const blanks = Array.from({ length: firstDayOfWeek });

  const presentCount = days.filter((d) => d.status === 'present').length;
  const absentCount = days.filter((d) => d.status === 'absent').length;
  const lateCount = days.filter((d) => d.status === 'late').length;
  const workingDays = days.filter((d) => !['weekend', 'future', 'holiday'].includes(d.status)).length;
  const pct = workingDays ? Math.round(((presentCount + lateCount) / workingDays) * 100) : 0;

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Attendance</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{pct}% attendance · {workingDays} working days</p>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700 min-w-[110px] text-center">
            {MONTHS[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-1.5">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-400 pb-1.5 uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, i) => <div key={`b-${i}`} />)}
        {days.map(({ date, status }) => {
          const cfg = STATUS_CONFIG[status];
          const isToday = year === today.getFullYear() && month === today.getMonth() && date === today.getDate();
          return (
            <div
              key={date}
              className={cn(
                'aspect-square rounded-xl border text-center flex items-center justify-center text-xs font-semibold transition-all relative',
                cfg.cell,
                isToday && 'ring-2 ring-orange-400 ring-offset-1 font-bold'
              )}
              title={cfg.label}
            >
              {date}
              {status !== 'weekend' && status !== 'future' && (
                <span className={cn('absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full', cfg.dot)} />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-100">
        {[
          { status: 'present' as const, label: `Present (${presentCount})` },
          { status: 'absent' as const, label: `Absent (${absentCount})` },
          { status: 'late' as const, label: `Late (${lateCount})` },
          { status: 'holiday' as const, label: 'Holiday' },
        ].map(({ status, label }) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={cn('w-2 h-2 rounded-full', STATUS_CONFIG[status].dot)} />
            <span className="text-[11px] text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
