'use client';

import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EXAMS, SUBJECTS, EXAM_COLORS, type Exam } from './data';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

interface Props {
  selectedExam: Exam;
}

export function TimetableView({ selectedExam }: Props) {
  const allDates = selectedExam.subjectDates.map((sd) => sd.date);
  if (allDates.length === 0) return null;

  const startDate = new Date(selectedExam.startDate);
  const year = startDate.getFullYear();
  const month = startDate.getMonth();
  const days = getCalendarDays(year, month);
  const today = new Date().toISOString().split('T')[0];

  const dateMap: Record<string, { subjectId: string; startTime: string; endTime: string }[]> = {};
  selectedExam.subjectDates.forEach((sd) => {
    if (!dateMap[sd.date]) dateMap[sd.date] = [];
    dateMap[sd.date].push({ subjectId: sd.subjectId, startTime: sd.startTime, endTime: sd.endTime });
  });

  const colors = EXAM_COLORS[selectedExam.color] || EXAM_COLORS.orange;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 font-heading">{selectedExam.name} — Timetable</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {new Date(selectedExam.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            {' — '}
            {new Date(selectedExam.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-slate-700 font-heading text-sm">
            {new Date(year, month).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </h4>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="text-center text-xs font-semibold text-slate-400 py-1.5">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, idx) => {
            if (!day) return <div key={`empty-${idx}`} className="h-20 rounded-xl" />;
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const examItems = dateMap[dateStr] || [];
            const isToday = dateStr === today;

            return (
              <div
                key={dateStr}
                className={cn(
                  'h-20 rounded-xl p-1.5 text-xs border transition-colors',
                  isToday ? 'bg-orange-50 border-orange-200' : 'border-transparent',
                  examItems.length > 0 ? 'bg-blue-50/70 border-blue-200' : ''
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center font-semibold mb-1 text-[11px]',
                  isToday ? 'bg-orange-500 text-white' : 'text-slate-600'
                )}>
                  {day}
                </div>
                <div className="space-y-0.5">
                  {examItems.slice(0, 2).map((item, i) => {
                    const subj = SUBJECTS.find((s) => s.id === item.subjectId);
                    return (
                      <div key={i} className={cn('rounded px-1 py-0.5 truncate text-[9px] font-semibold leading-tight', colors.badge)}>
                        {subj?.code || item.subjectId.toUpperCase()}
                      </div>
                    );
                  })}
                  {examItems.length > 2 && (
                    <div className="text-[9px] text-slate-400 pl-1">+{examItems.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Subject Schedule</h4>
          <div className="space-y-1.5">
            {selectedExam.subjectDates.map((sd, i) => {
              const subj = SUBJECTS.find((s) => s.id === sd.subjectId);
              const dateStr = new Date(sd.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
              return (
                <div key={i} className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl">
                  <div className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', colors.badge)}>
                    {subj?.code || sd.subjectId.toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-800 flex-1">{subj?.name}</span>
                  <span className="text-xs text-slate-500">{dateStr}</span>
                  <span className="text-xs text-slate-400">{sd.startTime} – {sd.endTime}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
