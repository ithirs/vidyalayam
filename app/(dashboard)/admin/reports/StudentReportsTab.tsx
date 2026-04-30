'use client';

import { Download, TriangleAlert as AlertTriangle, Users, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CLASS_STRENGTH, LOW_ATTENDANCE_STUDENTS } from './data';

const CATEGORIES = ['General', 'OBC', 'SC', 'ST'] as const;

const CATEGORY_COLORS: Record<string, string> = {
  General: 'bg-blue-100 text-blue-700',
  OBC:     'bg-orange-100 text-orange-700',
  SC:      'bg-teal-100 text-teal-700',
  ST:      'bg-amber-100 text-amber-700',
};

const totalStrength = CLASS_STRENGTH.reduce((s, c) => s + c.total, 0);
const totalBoys     = CLASS_STRENGTH.reduce((s, c) => s + c.boys, 0);
const totalGirls    = CLASS_STRENGTH.reduce((s, c) => s + c.girls, 0);

export function StudentReportsTab() {
  const dl = (label: string) => toast.success(`${label} download started`);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Enrolment', value: totalStrength, icon: Users,         color: 'bg-blue-50 border-blue-100 text-blue-700'   },
          { label: 'Total Boys',      value: totalBoys,     icon: Users,         color: 'bg-orange-50 border-orange-100 text-orange-700'},
          { label: 'Total Girls',     value: totalGirls,    icon: GraduationCap, color: 'bg-teal-50 border-teal-100 text-teal-700'   },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={cn('rounded-2xl border p-4 flex items-center gap-3', s.color)}>
              <Icon className="w-8 h-8 opacity-70 shrink-0" />
              <div>
                <div className="text-2xl font-black font-heading">{s.value}</div>
                <div className="text-xs font-semibold">{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Class-wise Strength</h3>
            <p className="text-xs text-slate-400 mt-0.5">Enrolment, gender and category breakdown</p>
          </div>
          <button onClick={() => dl('Student Masterlist')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Export Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Class</th>
                <th className={thCls}>Boys</th>
                <th className={thCls}>Girls</th>
                <th className={cn(thCls, 'font-black text-orange-600')}>Total</th>
                {CATEGORIES.map((c) => <th key={c} className={thCls}>{c}</th>)}
                <th className={thCls}>Gender %</th>
              </tr>
            </thead>
            <tbody>
              {CLASS_STRENGTH.map((row) => {
                const boysPct = Math.round((row.boys / row.total) * 100);
                return (
                  <tr key={row.class} className="border-b border-slate-50 hover:bg-orange-50/30 transition-colors">
                    <td className={cn(tdCls, 'font-semibold text-slate-700')}>{row.class}</td>
                    <td className={tdCls}>{row.boys}</td>
                    <td className={tdCls}>{row.girls}</td>
                    <td className={cn(tdCls, 'font-black text-orange-600')}>{row.total}</td>
                    <td className={tdCls}><span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', CATEGORY_COLORS.General)}>{row.general}</span></td>
                    <td className={tdCls}><span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', CATEGORY_COLORS.OBC)}>{row.obc}</span></td>
                    <td className={tdCls}><span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', CATEGORY_COLORS.SC)}>{row.sc}</span></td>
                    <td className={tdCls}><span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', CATEGORY_COLORS.ST)}>{row.st}</span></td>
                    <td className={tdCls}>
                      <div className="flex items-center gap-1.5 min-w-[100px]">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-400 rounded-full" style={{ width: `${boysPct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">{boysPct}% B</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
              <tr className="bg-orange-50/60 border-t-2 border-orange-200 font-bold">
                <td className={cn(tdCls, 'font-black text-slate-800')}>TOTAL</td>
                <td className={tdCls}>{totalBoys}</td>
                <td className={tdCls}>{totalGirls}</td>
                <td className={cn(tdCls, 'text-orange-600 text-base')}>{totalStrength}</td>
                <td className={tdCls}>{CLASS_STRENGTH.reduce((s,c)=>s+c.general,0)}</td>
                <td className={tdCls}>{CLASS_STRENGTH.reduce((s,c)=>s+c.obc,0)}</td>
                <td className={tdCls}>{CLASS_STRENGTH.reduce((s,c)=>s+c.sc,0)}</td>
                <td className={tdCls}>{CLASS_STRENGTH.reduce((s,c)=>s+c.st,0)}</td>
                <td className={tdCls}></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-100 bg-red-50/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Low Attendance Alert</h3>
              <p className="text-xs text-slate-400 mt-0.5">Students with attendance below 75% — action required</p>
            </div>
          </div>
          <button onClick={() => dl('Low Attendance List')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Roll No.</th>
                <th className={thCls}>Name</th>
                <th className={thCls}>Class</th>
                <th className={thCls}>Attendance</th>
                <th className={thCls}>Days Absent</th>
                <th className={thCls}>Status</th>
              </tr>
            </thead>
            <tbody>
              {LOW_ATTENDANCE_STUDENTS.map((s) => (
                <tr key={s.roll} className="border-b border-slate-50 hover:bg-red-50/30 transition-colors">
                  <td className={cn(tdCls, 'font-mono text-xs')}>{s.roll}</td>
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{s.name}</td>
                  <td className={tdCls}>{s.class}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn('h-full rounded-full', s.attendance < 65 ? 'bg-red-500' : s.attendance < 70 ? 'bg-red-400' : 'bg-amber-400')} style={{ width: `${s.attendance}%` }} />
                      </div>
                      <span className={cn('font-bold text-sm', s.attendance < 65 ? 'text-red-600' : s.attendance < 70 ? 'text-red-500' : 'text-amber-600')}>{s.attendance}%</span>
                    </div>
                  </td>
                  <td className={tdCls}><span className="text-red-600 font-bold">{s.daysAbsent}</span></td>
                  <td className={tdCls}>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', s.attendance < 65 ? 'bg-red-100 text-red-700' : s.attendance < 70 ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700')}>
                      {s.attendance < 65 ? 'Critical' : s.attendance < 70 ? 'Warning' : 'Alert'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thCls = 'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap';
const tdCls = 'px-4 py-3 text-slate-600 whitespace-nowrap';
const dlBtnCls = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors';
