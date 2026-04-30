'use client';

import { Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { STAFF_ATTENDANCE, LEAVE_RECORDS, TEACHER_CLASS_ASSIGNMENT } from './data';

const LEAVE_STATUS: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending:  'bg-amber-100 text-amber-700',
  rejected: 'bg-red-100 text-red-700',
};

export function StaffReportsTab() {
  const dl = (label: string) => toast.success(`${label} download started`);

  const avgRate = Math.round(STAFF_ATTENDANCE.reduce((s, t) => s + t.rate, 0) / STAFF_ATTENDANCE.length);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Staff',        value: STAFF_ATTENDANCE.length, color: 'text-blue-700 bg-blue-50 border-blue-100'     },
          { label: 'Avg Attendance',     value: `${avgRate}%`,           color: 'text-green-700 bg-green-50 border-green-100'  },
          { label: 'On Leave Today',     value: 2,                       color: 'text-amber-700 bg-amber-50 border-amber-100'  },
          { label: 'Pending Leaves',     value: LEAVE_RECORDS.filter(l=>l.status==='pending').length, color: 'text-orange-700 bg-orange-50 border-orange-100'},
        ].map((s) => (
          <div key={s.label} className={cn('rounded-2xl border p-4', s.color)}>
            <div className="text-2xl font-black font-heading">{s.value}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Staff Attendance Summary</h3>
            <p className="text-xs text-slate-400 mt-0.5">Present / absent / leave breakdown</p>
          </div>
          <button onClick={() => dl('Staff List Excel')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Name</th>
                <th className={thCls}>Dept.</th>
                <th className={thCls}>Present</th>
                <th className={thCls}>Absent</th>
                <th className={thCls}>Leave</th>
                <th className={thCls}>Total Days</th>
                <th className={thCls}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {STAFF_ATTENDANCE.sort((a, b) => b.rate - a.rate).map((t) => (
                <tr key={t.name} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{t.name}</td>
                  <td className={tdCls}>
                    <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold',
                      t.dept === 'Primary' ? 'bg-blue-100 text-blue-700' : t.dept === 'Secondary' ? 'bg-teal-100 text-teal-700' : 'bg-orange-100 text-orange-700'
                    )}>{t.dept}</span>
                  </td>
                  <td className={cn(tdCls, 'text-green-700 font-semibold')}>{t.present}</td>
                  <td className={cn(tdCls, 'text-red-600 font-semibold')}>{t.absent}</td>
                  <td className={cn(tdCls, 'text-amber-600 font-semibold')}>{t.leave}</td>
                  <td className={tdCls}>{t.total}</td>
                  <td className={tdCls}>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', t.rate >= 95 ? 'bg-green-500' : t.rate >= 85 ? 'bg-amber-400' : 'bg-red-500')}
                          style={{ width: `${t.rate}%` }}
                        />
                      </div>
                      <span className={cn('font-black text-sm', t.rate >= 95 ? 'text-green-600' : t.rate >= 85 ? 'text-amber-600' : 'text-red-600')}>{t.rate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Leave Records</h3>
            <p className="text-xs text-slate-400 mt-0.5">Current month leave applications</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Teacher</th>
                <th className={thCls}>Leave Type</th>
                <th className={thCls}>From</th>
                <th className={thCls}>To</th>
                <th className={thCls}>Days</th>
                <th className={thCls}>Status</th>
              </tr>
            </thead>
            <tbody>
              {LEAVE_RECORDS.map((l, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{l.name}</td>
                  <td className={tdCls}>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-semibold',
                      l.type === 'Medical' ? 'bg-red-100 text-red-700' : l.type === 'Earned' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                    )}>{l.type}</span>
                  </td>
                  <td className={tdCls}>{l.from}</td>
                  <td className={tdCls}>{l.to}</td>
                  <td className={cn(tdCls, 'font-bold text-slate-800')}>{l.days}</td>
                  <td className={tdCls}>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold capitalize', LEAVE_STATUS[l.status])}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Teacher–Class Assignment</h3>
            <p className="text-xs text-slate-400 mt-0.5">Subject and class allocation per teacher</p>
          </div>
          <button onClick={() => dl('Staff Assignment Excel')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Teacher</th>
                <th className={thCls}>Subjects</th>
                <th className={thCls}>Classes Assigned</th>
                <th className={thCls}>Load</th>
              </tr>
            </thead>
            <tbody>
              {TEACHER_CLASS_ASSIGNMENT.map((t, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{t.teacher}</td>
                  <td className={tdCls}>
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-orange-100 text-orange-700 font-semibold">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className={tdCls}>
                    <div className="flex flex-wrap gap-1">
                      {t.classes.map((c) => (
                        <span key={c} className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 font-medium">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className={tdCls}>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold',
                      t.classes.length >= 4 ? 'bg-red-100 text-red-700' : t.classes.length >= 3 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    )}>
                      {t.classes.length} {t.classes.length === 1 ? 'class' : 'classes'}
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

const thCls    = 'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap';
const tdCls    = 'px-4 py-3 text-slate-600 whitespace-nowrap';
const dlBtnCls = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors';
