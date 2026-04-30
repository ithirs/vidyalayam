'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Upload, LayoutGrid, List, Users } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { STUDENTS, type FeeStatus, type StudentStatus } from './data';
import { StudentFilters } from './StudentFilters';
import { StudentTable } from './StudentTable';
import { StudentCards } from './StudentCards';

const DEFAULT_FILTERS = {
  search: '', class: 'all', section: 'all',
  status: 'all' as StudentStatus | 'all',
  feeStatus: 'all' as FeeStatus | 'all',
  year: '2024-25',
};

export default function StudentsPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState<'table' | 'card'>('table');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const filtered = useMemo(() => {
    return STUDENTS.filter((s) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!s.name.toLowerCase().includes(q) && !s.rollNo.toLowerCase().includes(q) && !s.fatherPhone.includes(q) && !s.phone.includes(q)) return false;
      }
      if (filters.class !== 'all' && s.class !== filters.class) return false;
      if (filters.section !== 'all' && s.section !== filters.section) return false;
      if (filters.status !== 'all' && s.status !== filters.status) return false;
      if (filters.feeStatus !== 'all' && s.feeStatus !== filters.feeStatus) return false;
      return true;
    });
  }, [filters]);

  const paginated = useMemo(() =>
    filtered.slice((page - 1) * perPage, page * perPage),
    [filtered, page, perPage]);

  const stats = useMemo(() => ({
    total: STUDENTS.length,
    active: STUDENTS.filter((s) => s.status === 'active').length,
    pending: STUDENTS.filter((s) => s.feeStatus === 'pending').length,
    overdue: STUDENTS.filter((s) => s.feeStatus === 'partial' || s.feeStatus === 'pending').length,
  }), []);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Students</span>
        </nav>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 font-heading">Students</h1>
                <span className="text-sm font-bold bg-orange-100 text-orange-700 border border-orange-200 px-2.5 py-0.5 rounded-xl">
                  {stats.total.toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{stats.active} active · {stats.pending} fee pending</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* View toggle */}
            <div className="flex bg-slate-100 rounded-xl p-1 border border-slate-200">
              <button onClick={() => setView('table')}
                className={cn('p-2 rounded-lg transition-all', view === 'table' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600')}>
                <List className="w-4 h-4" />
              </button>
              <button onClick={() => setView('card')}
                className={cn('p-2 rounded-lg transition-all', view === 'card' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-400 hover:text-slate-600')}>
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm">
              <Upload className="w-4 h-4" />
              Import CSV
            </button>
            <Link href="/admin/students/add"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              Add Student
            </Link>
          </div>
        </div>

        {/* Quick stat pills */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: 'Total Students', value: stats.total, color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { label: 'Active', value: stats.active, color: 'bg-green-50 text-green-700 border-green-200' },
            { label: 'Fee Pending/Partial', value: stats.overdue, color: 'bg-red-50 text-red-700 border-red-200' },
            { label: 'Transferred', value: STUDENTS.filter((s) => s.status === 'transferred').length, color: 'bg-slate-100 text-slate-600 border-slate-200' },
          ].map(({ label, value, color }) => (
            <div key={label} className={cn('flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold', color)}>
              <span className="text-base font-bold font-heading">{value}</span>
              <span className="font-medium opacity-80">{label}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <StudentFilters
          filters={filters}
          onChange={(f) => { setFilters(f); setPage(1); }}
          onReset={() => { setFilters(DEFAULT_FILTERS); setPage(1); }}
        />

        {/* Results */}
        {view === 'table' ? (
          <StudentTable
            students={paginated}
            page={page}
            perPage={perPage}
            total={filtered.length}
            onPageChange={setPage}
            onPerPageChange={(n) => { setPerPage(n); setPage(1); }}
          />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
            <p className="text-xs text-slate-400 mb-4">{filtered.length} students · showing {Math.min(perPage, filtered.length)}</p>
            <StudentCards students={paginated} />
            {/* Pagination for card view */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500">Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</p>
              <div className="flex gap-1">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">Prev</button>
                <button disabled={page * perPage >= filtered.length} onClick={() => setPage((p) => p + 1)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
