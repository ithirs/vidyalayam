'use client';

import { Download, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MONTHS_SHORT, CLASSES, MONTHLY_CLASS_ATTENDANCE, TEACHER_ATTENDANCE_COMPLIANCE } from './data';

function heatColor(pct: number) {
  if (pct >= 95) return 'bg-green-500 text-white';
  if (pct >= 90) return 'bg-green-400 text-white';
  if (pct >= 85) return 'bg-lime-400 text-white';
  if (pct >= 80) return 'bg-amber-400 text-white';
  if (pct >= 75) return 'bg-orange-400 text-white';
  return 'bg-red-500 text-white';
}

export function AttendanceReportsTab() {
  const dl = (label: string) => toast.success(`${label} download started`);

  const defaulters = CLASSES.map((cls) => {
    const vals = MONTHLY_CLASS_ATTENDANCE[cls] || [];
    const avg  = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    return { class: cls, avg };
  }).filter((c) => c.avg < 85);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Monthly Attendance Heatmap</h3>
            <p className="text-xs text-slate-400 mt-0.5">Class-wise attendance % per month (Apr–Mar)</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              {[
                { label: '95%+', cls: 'bg-green-500' },
                { label: '85–95', cls: 'bg-lime-400' },
                { label: '75–85', cls: 'bg-amber-400' },
                { label: '<75', cls: 'bg-red-500' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1">
                  <div className={cn('w-3 h-3 rounded-sm', l.cls)} />
                  {l.label}
                </div>
              ))}
            </div>
            <button onClick={() => dl('Monthly Attendance Excel')} className={dlBtnCls}>
              <Download className="w-3.5 h-3.5" />
              Excel
            </button>
            <button onClick={() => dl('Monthly Attendance PDF')} className={dlBtnCls}>
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap w-28">Class</th>
                {MONTHS_SHORT.map((m) => <th key={m} className="px-2 py-3 text-center font-bold text-slate-500 uppercase tracking-wide w-14">{m}</th>)}
                <th className="px-4 py-3 text-center font-bold text-slate-500 uppercase tracking-wide">Avg</th>
              </tr>
            </thead>
            <tbody>
              {CLASSES.map((cls) => {
                const vals = MONTHLY_CLASS_ATTENDANCE[cls] || [];
                const avg  = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
                return (
                  <tr key={cls} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-2.5 font-semibold text-slate-700 whitespace-nowrap">{cls}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="px-1 py-1.5 text-center">
                        <div className={cn('rounded-lg px-1.5 py-1 font-bold text-center mx-auto w-10', heatColor(v))}>
                          {v}
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-2.5 text-center">
                      <span className={cn('px-2.5 py-1 rounded-full font-black text-xs', heatColor(avg))}>{avg}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {defaulters.length > 0 && (
        <div className="bg-white rounded-2xl border border-orange-200 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-orange-100 bg-orange-50/40 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Classes Below 85% Threshold</h3>
              <p className="text-xs text-slate-400">These classes require immediate attention</p>
            </div>
          </div>
          <div className="p-4 flex flex-wrap gap-3">
            {defaulters.map((d) => (
              <div key={d.class} className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                <span className="font-semibold text-slate-700 text-sm">{d.class}</span>
                <span className={cn('font-black text-sm', d.avg < 75 ? 'text-red-600' : 'text-orange-600')}>{d.avg}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Teacher Attendance Marking Compliance</h3>
            <p className="text-xs text-slate-400 mt-0.5">How consistently each teacher marks daily attendance</p>
          </div>
          <button onClick={() => dl('Compliance Report')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Teacher</th>
                <th className={thCls}>Class</th>
                <th className={thCls}>Days Marked</th>
                <th className={thCls}>Total Days</th>
                <th className={thCls}>Compliance</th>
                <th className={thCls}>Status</th>
              </tr>
            </thead>
            <tbody>
              {TEACHER_ATTENDANCE_COMPLIANCE.sort((a, b) => a.rate - b.rate).map((t) => (
                <tr key={t.name} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{t.name}</td>
                  <td className={tdCls}>{t.class}</td>
                  <td className={tdCls}>{t.marked}</td>
                  <td className={tdCls}>{t.total}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', t.rate >= 95 ? 'bg-green-500' : t.rate >= 85 ? 'bg-amber-400' : 'bg-red-500')}
                          style={{ width: `${t.rate}%` }}
                        />
                      </div>
                      <span className={cn('font-bold', t.rate >= 95 ? 'text-green-600' : t.rate >= 85 ? 'text-amber-600' : 'text-red-600')}>{t.rate}%</span>
                    </div>
                  </td>
                  <td className={tdCls}>
                    {t.rate === 100 ? (
                      <span className="flex items-center gap-1 text-green-600 font-semibold text-xs"><CheckCircle className="w-3.5 h-3.5" />Perfect</span>
                    ) : t.rate >= 95 ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Good</span>
                    ) : t.rate >= 85 ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Average</span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">Low</span>
                    )}
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

const thCls    = 'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap';
const tdCls    = 'px-4 py-3 text-slate-600 whitespace-nowrap';
const dlBtnCls = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors';
