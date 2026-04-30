'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, Download, Printer, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STUDENT_REPORT, type StudentReportRow } from '../data';

type SortKey = 'name' | 'pct' | 'absent';
type SortDir = 'asc' | 'desc';

function StatusBadge({ pct }: { pct: number }) {
  if (pct >= 90) return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">Good</span>;
  if (pct >= 75) return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Average</span>;
  return <span className="inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">Poor</span>;
}

export function StudentReportTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rollNo' as SortKey);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'average' | 'poor'>('all');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const getStatus = (pct: number) => pct >= 90 ? 'good' : pct >= 75 ? 'average' : 'poor';

  const sorted = [...STUDENT_REPORT]
    .filter((r) => filterStatus === 'all' || getStatus(r.pct) === filterStatus)
    .sort((a, b) => {
      let va: string | number = 0;
      let vb: string | number = 0;
      if (sortKey === 'name') { va = a.name; vb = b.name; }
      else if (sortKey === 'pct') { va = a.pct; vb = b.pct; }
      else if (sortKey === 'absent') { va = a.absentDays; vb = b.absentDays; }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ col }: { col: SortKey }) => (
    <span className="ml-1 inline-flex flex-col">
      <ChevronUp className={cn('w-2.5 h-2.5 -mb-0.5', sortKey === col && sortDir === 'asc' ? 'text-orange-500' : 'text-slate-300')} />
      <ChevronDown className={cn('w-2.5 h-2.5', sortKey === col && sortDir === 'desc' ? 'text-orange-500' : 'text-slate-300')} />
    </span>
  );

  const poorCount = STUDENT_REPORT.filter((r) => r.pct < 75).length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div>
            <h3 className="font-bold text-slate-900 font-heading">Student-wise Attendance Report</h3>
            <p className="text-xs text-slate-400 mt-0.5">Class 8-A — April 2026 (58 working days)</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              Excel
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-medium hover:bg-slate-50 transition-colors">
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-500 text-white text-xs font-semibold hover:bg-green-600 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp All
            </button>
          </div>
        </div>

        {poorCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <p className="text-xs text-red-700 font-medium">
              {poorCount} student{poorCount > 1 ? 's have' : ' has'} attendance below 75% — at risk of detention.
            </p>
          </div>
        )}

        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { key: 'all' as const, label: 'All Students' },
            { key: 'good' as const, label: 'Good (≥90%)' },
            { key: 'average' as const, label: 'Average (75-90%)' },
            { key: 'poor' as const, label: 'Poor (<75%)' },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterStatus(f.key)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                filterStatus === f.key
                  ? f.key === 'poor' ? 'bg-red-500 text-white' : f.key === 'average' ? 'bg-amber-500 text-white' : f.key === 'good' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide w-8">#</th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none"
                onClick={() => toggleSort('name')}
              >
                Student <SortIcon col="name" />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Working Days</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Present</th>
              <th
                className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none"
                onClick={() => toggleSort('absent')}
              >
                Absent <SortIcon col="absent" />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Late</th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none min-w-[120px]"
                onClick={() => toggleSort('pct')}
              >
                Attendance % <SortIcon col="pct" />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((row, i) => {
              const isPoor = row.pct < 75;
              return (
                <tr
                  key={row.id}
                  className={cn(
                    'transition-colors',
                    isPoor ? 'bg-red-50/40 hover:bg-red-50/60' : 'hover:bg-slate-50/60'
                  )}
                >
                  <td className="px-5 py-3.5 text-xs text-slate-400 tabular-nums">{i + 1}</td>
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="font-semibold text-slate-800">{row.name}</p>
                      <p className="text-xs text-slate-400">Roll #{row.rollNo}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center text-slate-600 tabular-nums">{row.workingDays}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-green-600 tabular-nums">{row.presentDays}</td>
                  <td className="px-4 py-3.5 text-center tabular-nums">
                    <span className={cn('font-semibold', row.absentDays > 5 ? 'text-red-500' : row.absentDays > 2 ? 'text-amber-500' : 'text-slate-500')}>
                      {row.absentDays}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center text-amber-500 font-semibold tabular-nums">{row.lateDays}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            row.pct >= 90 ? 'bg-green-500' : row.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'
                          )}
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className={cn(
                        'text-xs font-bold tabular-nums',
                        row.pct >= 90 ? 'text-green-600' : row.pct >= 75 ? 'text-amber-600' : 'text-red-600'
                      )}>
                        {row.pct.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge pct={row.pct} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
