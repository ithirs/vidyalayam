'use client';

import { cn } from '@/lib/utils';
import { CLASS_VACANCIES } from './data';
import { Users } from 'lucide-react';

function vacancyColor(vacantPct: number) {
  if (vacantPct > 20) return { bar: 'bg-green-500', badge: 'bg-green-50 text-green-700 border-green-200', dot: 'bg-green-500' };
  if (vacantPct >= 10) return { bar: 'bg-orange-400', badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-400' };
  return { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500' };
}

export function ClassVacancyGrid() {
  const totalSeats = CLASS_VACANCIES.reduce((s, c) => s + c.totalSeats, 0);
  const totalFilled = CLASS_VACANCIES.reduce((s, c) => s + c.filled, 0);
  const totalVacant = totalSeats - totalFilled;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Class Vacancy Overview</h3>
          <p className="text-xs text-slate-400 mt-0.5">{CLASS_VACANCIES.length} sections · {totalVacant} seats available</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900 font-heading tabular-nums">{totalVacant}</p>
          <p className="text-xs text-slate-400">total vacant</p>
        </div>
      </div>

      <div className="flex items-center gap-4 py-3 px-4 rounded-xl bg-slate-50 border border-slate-100 mb-4">
        {[
          { label: 'Total Seats', value: totalSeats, cls: 'text-slate-700' },
          { label: 'Filled', value: totalFilled, cls: 'text-blue-600' },
          { label: 'Vacant', value: totalVacant, cls: 'text-green-600' },
        ].map(({ label, value, cls }) => (
          <div key={label} className="flex-1 text-center">
            <p className={cn('text-lg font-bold font-heading tabular-nums', cls)}>{value}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {[
          { label: '>20% vacant', dot: 'bg-green-500', text: 'text-green-700' },
          { label: '10–20% vacant', dot: 'bg-orange-400', text: 'text-orange-700' },
          { label: '<10% vacant', dot: 'bg-red-500', text: 'text-red-700' },
        ].map(({ label, dot, text }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className={cn('w-2 h-2 rounded-full', dot)} />
            <span className={cn('text-xs font-medium', text)}>{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {CLASS_VACANCIES.map((cls) => {
          const vacant = cls.totalSeats - cls.filled;
          const filledPct = (cls.filled / cls.totalSeats) * 100;
          const vacantPct = (vacant / cls.totalSeats) * 100;
          const colors = vacancyColor(vacantPct);

          return (
            <div key={`${cls.class}-${cls.section}`}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all">
              <div className={cn('w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 font-bold', colors.badge, 'border')}>
                <span className="text-base leading-tight">{cls.class}</span>
                <span className="text-[9px] leading-none opacity-70">{cls.section}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-800">Class {cls.class}-{cls.section}</span>
                  <div className="flex items-center gap-1">
                    <span className={cn('text-xs font-bold px-2 py-0.5 rounded-lg border', colors.badge)}>
                      {vacant} free
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full transition-all', colors.bar)} style={{ width: `${filledPct}%` }} />
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[10px] text-slate-400">{cls.filled}/{cls.totalSeats} filled</span>
                  <span className="text-[10px] text-slate-400">{Math.round(filledPct)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
