'use client';

import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CLASSES, SECTIONS, ACADEMIC_YEARS, type FeeStatus, type StudentStatus } from './data';

interface Filters {
  search: string;
  class: string;
  section: string;
  status: StudentStatus | 'all';
  feeStatus: FeeStatus | 'all';
  year: string;
}

interface StudentFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  onReset: () => void;
}

const selCls = 'px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white cursor-pointer';

export function StudentFilters({ filters, onChange, onReset }: StudentFiltersProps) {
  const set = (k: keyof Filters) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...filters, [k]: e.target.value });

  const hasActive = filters.search || filters.class !== 'all' || filters.section !== 'all' ||
    filters.status !== 'all' || filters.feeStatus !== 'all' || filters.year !== '2024-25';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card px-4 py-3.5 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-52">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={filters.search}
          onChange={set('search')}
          placeholder="Search name, roll no, parent phone…"
          className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700"
        />
        {filters.search && (
          <button onClick={() => onChange({ ...filters, search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <select value={filters.class} onChange={set('class')} className={selCls}>
        <option value="all">All Classes</option>
        {CLASSES.map((c) => <option key={c}>{c}</option>)}
      </select>

      <select value={filters.section} onChange={set('section')} className={selCls}>
        <option value="all">All Sections</option>
        {SECTIONS.map((s) => <option key={s}>{s}</option>)}
      </select>

      <select value={filters.status} onChange={set('status')} className={selCls}>
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="transferred">Transferred</option>
      </select>

      <select value={filters.feeStatus} onChange={set('feeStatus')} className={selCls}>
        <option value="all">All Fees</option>
        <option value="paid">Paid</option>
        <option value="partial">Partial</option>
        <option value="pending">Pending</option>
      </select>

      <select value={filters.year} onChange={set('year')} className={selCls}>
        {ACADEMIC_YEARS.map((y) => <option key={y}>{y}</option>)}
      </select>

      {hasActive && (
        <button onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors whitespace-nowrap">
          <X className="w-3 h-3" />
          Reset filters
        </button>
      )}
    </div>
  );
}
