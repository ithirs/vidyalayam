'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CLASS_ATTENDANCE, type ClassAttendanceRow } from './data';

type SortKey = 'class' | 'pct' | 'absent';
type SortDir = 'asc' | 'desc';

function StatusBadge({ status }: { status: ClassAttendanceRow['status'] }) {
  const config = {
    marked: { label: 'Marked', cls: 'bg-green-50 text-green-700 border-green-200' },
    pending: { label: 'Pending', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    not_started: { label: 'Not Started', cls: 'bg-slate-100 text-slate-500 border-slate-200' },
  }[status];
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border', config.cls)}>
      {config.label}
    </span>
  );
}

function PctBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? 'bg-green-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
        <div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${pct}%` }} />
      </div>
      <span className={cn('text-xs font-semibold tabular-nums', pct >= 90 ? 'text-green-600' : pct >= 75 ? 'text-amber-600' : 'text-red-600')}>
        {pct > 0 ? `${pct.toFixed(1)}%` : '—'}
      </span>
    </div>
  );
}

export function ClassAttendanceTable() {
  const [sortKey, setSortKey] = useState<SortKey>('class');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filter, setFilter] = useState<'all' | 'marked' | 'pending' | 'not_started'>('all');

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const sorted = [...CLASS_ATTENDANCE]
    .filter((r) => filter === 'all' || r.status === filter)
    .sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;
      if (sortKey === 'class') { va = `${a.className}${a.section}`; vb = `${b.className}${b.section}`; }
      else if (sortKey === 'pct') { va = a.total ? a.present / a.total : 0; vb = b.total ? b.present / b.total : 0; }
      else if (sortKey === 'absent') { va = a.absent; vb = b.absent; }
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

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All Classes' },
    { key: 'marked', label: 'Marked' },
    { key: 'pending', label: 'Pending' },
    { key: 'not_started', label: 'Not Started' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Class-wise Attendance</h3>
          <p className="text-xs text-slate-400 mt-0.5">Today — April 12, 2026</p>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
                filter === f.key
                  ? 'bg-orange-500 text-white shadow-sm'
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
              <th
                className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:text-slate-700"
                onClick={() => toggleSort('class')}
              >
                Class / Section <SortIcon col="class" />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Present</th>
              <th
                className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:text-slate-700"
                onClick={() => toggleSort('absent')}
              >
                Absent <SortIcon col="absent" />
              </th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Late</th>
              <th
                className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer select-none hover:text-slate-700 min-w-[120px]"
                onClick={() => toggleSort('pct')}
              >
                Attendance % <SortIcon col="pct" />
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Teacher</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((row) => {
              const pct = row.total > 0 ? (row.present / row.total) * 100 : 0;
              return (
                <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-slate-800">{row.className}-{row.section}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center text-slate-600 tabular-nums">{row.total}</td>
                  <td className="px-4 py-3.5 text-center font-semibold text-green-600 tabular-nums">{row.present || '—'}</td>
                  <td className="px-4 py-3.5 text-center tabular-nums">
                    <span className={cn('font-semibold', row.absent > 0 ? 'text-red-500' : 'text-slate-400')}>
                      {row.status === 'not_started' ? '—' : row.absent}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center tabular-nums">
                    <span className={cn('font-semibold', row.late > 0 ? 'text-amber-500' : 'text-slate-400')}>
                      {row.status === 'not_started' ? '—' : row.late}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    {row.status === 'not_started' ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : (
                      <PctBar pct={pct} />
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-slate-600 text-xs">{row.teacher}</td>
                  <td className="px-4 py-3.5 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-orange-200 text-orange-600 hover:bg-orange-50 transition-colors">
                      <ClipboardList className="w-3 h-3" />
                      {row.status === 'not_started' ? 'Mark' : 'View'}
                    </button>
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
