'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CALENDAR_DATA } from './data';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_START_WEEKDAY = 2; // April 2026 starts on Wednesday

function getDayColor(day: typeof CALENDAR_DATA[0]) {
  if (!day) return '';
  if (day.isWeekend) return 'bg-slate-100 text-slate-400 cursor-default';
  if (day.isHoliday) return 'bg-blue-50 text-blue-400 cursor-pointer';
  if (day.isToday && day.pct !== null) {
    if (day.pct >= 93) return 'ring-2 ring-orange-400 bg-green-500 text-white font-bold cursor-pointer';
    if (day.pct >= 80) return 'ring-2 ring-orange-400 bg-amber-400 text-white font-bold cursor-pointer';
    return 'ring-2 ring-orange-400 bg-red-500 text-white font-bold cursor-pointer';
  }
  if (day.pct === null) return 'bg-slate-50 text-slate-300 cursor-default';
  if (day.pct >= 93) return 'bg-green-500 text-white hover:bg-green-600 cursor-pointer';
  if (day.pct >= 85) return 'bg-green-300 text-white hover:bg-green-400 cursor-pointer';
  if (day.pct >= 80) return 'bg-amber-400 text-white hover:bg-amber-500 cursor-pointer';
  return 'bg-red-400 text-white hover:bg-red-500 cursor-pointer';
}

export function AttendanceCalendarHeatmap() {
  const [selected, setSelected] = useState<typeof CALENDAR_DATA[0] | null>(
    CALENDAR_DATA.find((d) => d.isToday) ?? null
  );

  const cells: (typeof CALENDAR_DATA[0] | null)[] = [
    ...Array(MONTH_START_WEEKDAY).fill(null),
    ...CALENDAR_DATA,
  ];

  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (typeof CALENDAR_DATA[0] | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Attendance Calendar</h3>
          <p className="text-xs text-slate-400 mt-0.5">School-wide monthly heatmap</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700 min-w-[96px] text-center">April 2026</span>
          <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-semibold text-slate-400 uppercase py-1">{d}</div>
        ))}
      </div>

      <div className="space-y-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((day, di) => (
              <div key={di} className="aspect-square flex items-center justify-center">
                {day ? (
                  <button
                    onClick={() => day.pct !== null || day.isHoliday ? setSelected(day) : undefined}
                    title={day.isHoliday ? day.holidayLabel : day.pct !== null ? `${day.pct.toFixed(1)}%` : ''}
                    className={cn(
                      'w-full h-full rounded-lg text-xs font-medium transition-all duration-150 flex items-center justify-center',
                      getDayColor(day)
                    )}
                  >
                    {day.date}
                  </button>
                ) : (
                  <div />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 flex-wrap pt-3 border-t border-slate-100">
        <span className="text-[11px] text-slate-500 font-medium">Legend:</span>
        {[
          { color: 'bg-green-500', label: '≥93% High' },
          { color: 'bg-green-300', label: '85–92%' },
          { color: 'bg-amber-400', label: '80–84%' },
          { color: 'bg-red-400', label: '<80% Low' },
          { color: 'bg-blue-100 border border-blue-200', label: 'Holiday' },
          { color: 'bg-slate-100', label: 'Weekend' },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className={cn('w-3 h-3 rounded-sm', l.color)} />
            <span className="text-[11px] text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>

      {selected && (
        <div className={cn(
          'mt-4 rounded-xl p-3 border',
          selected.isHoliday
            ? 'bg-blue-50 border-blue-200'
            : selected.pct !== null && selected.pct >= 93
              ? 'bg-green-50 border-green-200'
              : selected.pct !== null && selected.pct >= 80
                ? 'bg-amber-50 border-amber-200'
                : 'bg-red-50 border-red-200'
        )}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-800">
                April {selected.date}, 2026
                {selected.isToday && <span className="ml-2 text-[11px] font-semibold text-orange-500 bg-orange-100 px-1.5 py-0.5 rounded-full">Today</span>}
                {selected.isHoliday && <span className="ml-2 text-[11px] font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">{selected.holidayLabel}</span>}
              </p>
              {selected.pct !== null && (
                <p className="text-xs text-slate-500 mt-0.5">School-wide attendance</p>
              )}
            </div>
            {selected.pct !== null && (
              <span className={cn(
                'text-xl font-bold tabular-nums',
                selected.pct >= 93 ? 'text-green-600' : selected.pct >= 80 ? 'text-amber-600' : 'text-red-600'
              )}>
                {selected.pct.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
