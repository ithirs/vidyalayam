'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { toast } from 'sonner';
import { Search, Filter, Download, Eye, Pencil, CirclePause as PauseCircle, Trash2, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SCHOOLS, type School, type SchoolStatus, type PlanType } from './data';

const STATUS_CONFIG: Record<SchoolStatus, { label: string; classes: string }> = {
  active: { label: 'Active', classes: 'bg-green-50 text-green-700 border border-green-200' },
  trial: { label: 'Trial', classes: 'bg-orange-50 text-orange-700 border border-orange-200' },
  expired: { label: 'Expired', classes: 'bg-red-50 text-red-600 border border-red-200' },
  suspended: { label: 'Suspended', classes: 'bg-slate-100 text-slate-500 border border-slate-200' },
};

const PLAN_CONFIG: Record<PlanType, { label: string; classes: string }> = {
  starter: { label: 'Starter', classes: 'bg-blue-50 text-blue-700' },
  growth: { label: 'Growth', classes: 'bg-amber-50 text-amber-700' },
  premium: { label: 'Premium', classes: 'bg-violet-50 text-violet-700' },
};

function DeleteConfirm({ school, onConfirm, onCancel }: { school: School; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-sm animate-scale-in">
        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <h3 className="font-bold text-slate-900 text-center font-heading text-lg mb-1">Delete School?</h3>
        <p className="text-slate-500 text-sm text-center mb-6">
          <strong>{school.name}</strong> and all its data will be permanently deleted. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const col = createColumnHelper<School>();

export function SchoolsTable() {
  const [data, setData] = useState(SCHOOLS);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<School | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [planFilter, setPlanFilter] = useState<PlanType | ''>('');
  const [statusFilter, setStatusFilter] = useState<SchoolStatus | ''>('');

  const filtered = useMemo(() => {
    return data.filter((s) => {
      if (planFilter && s.plan !== planFilter) return false;
      if (statusFilter && s.status !== statusFilter) return false;
      if (globalFilter) {
        const q = globalFilter.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [data, planFilter, statusFilter, globalFilter]);

  const columns = useMemo(() => [
    col.accessor('name', {
      header: 'School Name',
      cell: (info) => (
        <div>
          <div className="font-semibold text-slate-900 text-sm">{info.getValue()}</div>
          <div className="text-xs text-slate-400">{info.row.original.email}</div>
        </div>
      ),
    }),
    col.accessor('city', {
      header: 'City',
      cell: (info) => (
        <div>
          <div className="text-sm text-slate-700">{info.getValue()}</div>
          <div className="text-xs text-slate-400">{info.row.original.state}</div>
        </div>
      ),
    }),
    col.accessor('plan', {
      header: 'Plan',
      cell: (info) => {
        const cfg = PLAN_CONFIG[info.getValue()];
        return <span className={cn('text-xs font-semibold px-2 py-1 rounded-lg', cfg.classes)}>{cfg.label}</span>;
      },
    }),
    col.accessor('students', {
      header: 'Students',
      cell: (info) => <span className="text-sm text-slate-700 tabular-nums">{info.getValue().toLocaleString('en-IN')}</span>,
    }),
    col.accessor('staff', {
      header: 'Staff',
      cell: (info) => <span className="text-sm text-slate-700 tabular-nums">{info.getValue()}</span>,
    }),
    col.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const cfg = STATUS_CONFIG[info.getValue()];
        return <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', cfg.classes)}>{cfg.label}</span>;
      },
    }),
    col.accessor('joined', {
      header: 'Joined',
      cell: (info) => {
        const [y, m, d] = info.getValue().split('-').map(Number);
        const formatted = new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        return <span className="text-sm text-slate-500">{formatted}</span>;
      },
    }),
    col.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const school = row.original;
        return (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toast.info(`Viewing ${school.name}`)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
              title="View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => toast.info(`Editing ${school.name}`)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-50 transition-colors"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                if (school.status === 'suspended') {
                  toast.success(`${school.name} reactivated`);
                  setData((prev) => prev.map((s) => s.id === school.id ? { ...s, status: 'active' } : s));
                } else {
                  toast.warning(`${school.name} suspended`);
                  setData((prev) => prev.map((s) => s.id === school.id ? { ...s, status: 'suspended' } : s));
                }
              }}
              className={cn(
                'p-1.5 rounded-lg transition-colors',
                school.status === 'suspended'
                  ? 'text-slate-400 hover:text-green-500 hover:bg-green-50'
                  : 'text-slate-400 hover:text-orange-500 hover:bg-orange-50'
              )}
              title={school.status === 'suspended' ? 'Reactivate' : 'Suspend'}
            >
              <PauseCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeleteTarget(school)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      },
    }),
  ], []);

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const handleDelete = () => {
    if (!deleteTarget) return;
    setData((prev) => prev.filter((s) => s.id !== deleteTarget.id));
    toast.success(`${deleteTarget.name} deleted`);
    setDeleteTarget(null);
  };

  const exportCSV = () => {
    const headers = ['Name', 'City', 'State', 'Plan', 'Students', 'Staff', 'Status', 'Joined'];
    const rows = filtered.map((s) => [s.name, s.city, s.state, s.plan, s.students, s.staff, s.status, s.joined]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'schools.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  const activeFilters = (planFilter ? 1 : 0) + (statusFilter ? 1 : 0);

  return (
    <>
      {deleteTarget && (
        <DeleteConfirm school={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-48">
            <h3 className="font-bold text-slate-900 font-heading">All Schools</h3>
            <p className="text-xs text-slate-500 mt-0.5">{filtered.length} schools total</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search schools..."
                className="pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-orange-300 focus:bg-white transition-all w-52"
              />
              {globalFilter && (
                <button
                  onClick={() => setGlobalFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filter button */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors',
                  filterOpen || activeFilters > 0
                    ? 'border-orange-300 bg-orange-50 text-orange-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                )}
              >
                <Filter className="w-3.5 h-3.5" />
                Filters
                {activeFilters > 0 && (
                  <span className="w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeFilters}
                  </span>
                )}
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal p-4 w-60 z-50 animate-scale-in">
                  <div className="mb-3">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Plan</label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['', 'starter', 'growth', 'premium'] as const).map((p) => (
                        <button
                          key={p}
                          onClick={() => setPlanFilter(p)}
                          className={cn(
                            'text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors',
                            planFilter === p ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          {p === '' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1.5">Status</label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['', 'active', 'trial', 'expired', 'suspended'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatusFilter(s)}
                          className={cn(
                            'text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors',
                            statusFilter === s ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          )}
                        >
                          {s === '' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Export */}
            <button
              onClick={exportCSV}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-slate-100 bg-slate-50">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap',
                        header.column.getCanSort() ? 'cursor-pointer select-none hover:text-slate-700' : ''
                      )}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <ChevronUp className="w-3 h-3" />}
                        {header.column.getIsSorted() === 'desc' && <ChevronDown className="w-3 h-3" />}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-slate-50">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-400 text-sm">
                    No schools found matching your filters.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3.5 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}–
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              filtered.length
            )}{' '}
            of {filtered.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: table.getPageCount() }, (_, i) => (
              <button
                key={i}
                onClick={() => table.setPageIndex(i)}
                className={cn(
                  'w-7 h-7 text-xs font-medium rounded-lg transition-colors',
                  table.getState().pagination.pageIndex === i
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
