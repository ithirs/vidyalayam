'use client';

import Link from 'next/link';
import { ChevronRight, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

const ATTENDANCE_DATA: Record<string, 'P' | 'A' | 'H' | ''> = {
  '2026-04-01': 'P', '2026-04-02': 'P', '2026-04-03': 'H', '2026-04-04': 'H',
  '2026-04-07': 'P', '2026-04-08': 'A', '2026-04-09': 'P', '2026-04-10': 'P',
  '2026-04-11': 'P', '2026-04-14': 'P', '2026-04-15': 'H',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function buildCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

export default function ParentAttendancePage() {
  const cells = buildCalendar(2026, 3);
  const present = Object.values(ATTENDANCE_DATA).filter(v => v === 'P').length;
  const absent = Object.values(ATTENDANCE_DATA).filter(v => v === 'A').length;
  const workingDays = present + absent;

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Attendance</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
          <ClipboardList className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Attendance</h1>
          <p className="text-sm text-slate-500 mt-0.5">Rohit · Class 8-A · April 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Present', value: present, color: 'bg-green-50 border-green-200 text-green-700' },
          { label: 'Absent', value: absent, color: 'bg-red-50 border-red-200 text-red-700' },
          { label: 'Attendance %', value: `${workingDays ? Math.round((present / workingDays) * 100) : 0}%`, color: 'bg-blue-50 border-blue-200 text-blue-700' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl border p-4 text-center ${s.color}`}>
            <p className="text-2xl font-bold font-heading">{s.value}</p>
            <p className="text-xs font-medium mt-0.5 opacity-80">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e${i}`} />;
            const key = `2026-04-${String(day).padStart(2, '0')}`;
            const status = ATTENDANCE_DATA[key];
            return (
              <div key={day} className={cn(
                'aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-colors',
                status === 'P' ? 'bg-green-100 text-green-700' :
                status === 'A' ? 'bg-red-100 text-red-700' :
                status === 'H' ? 'bg-slate-100 text-slate-400' :
                'text-slate-300'
              )}>
                {day}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-green-100 border border-green-200" />Present</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-red-100 border border-red-200" />Absent</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />Holiday</span>
        </div>
      </div>
    </div>
  );
}
