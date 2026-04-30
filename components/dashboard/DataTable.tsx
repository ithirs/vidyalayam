'use client';

import { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  Search, Download, ChevronLeft, ChevronRight,
  ChevronsLeft, ChevronsRight, ChevronUp, ChevronDown,
  SlidersHorizontal, Check, Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, unknown>[];
  searchPlaceholder?: string;
  searchKey?: string;
  exportFileName?: string;
  pageSize?: number;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-md bg-slate-100', className)} />;
}

export function DataTable<TData>({
  data,
  columns,
  searchPlaceholder = 'Search…',
  searchKey,
  exportFileName = 'export',
  pageSize = 10,
  isLoading = false,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  className,
}: DataTableProps<TData>) {
  const [sorting,          setSorting]          = useState<SortingState>([]);
  const [columnFilters,    setColumnFilters]    = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [globalFilter,     setGlobalFilter]     = useState('');
  const [showColToggle,    setShowColToggle]    = useState(false);

  const table = useReactTable({
    data,
    columns,
    state:       { sorting, columnFilters, columnVisibility, globalFilter },
    onSortingChange:          setSorting,
    onColumnFiltersChange:    setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange:     setGlobalFilter,
    getCoreRowModel:          getCoreRowModel(),
    getFilteredRowModel:      getFilteredRowModel(),
    getPaginationRowModel:    getPaginationRowModel(),
    getSortedRowModel:        getSortedRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const handleExport = () => {
    const headers = table.getVisibleLeafColumns().map((c) => c.id).join(',');
    const rows    = table.getFilteredRowModel().rows.map((row) =>
      row.getVisibleCells().map((cell) => {
        const val = cell.getValue();
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : String(val ?? '');
      }).join(',')
    ).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `${exportFileName}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  const { pageIndex, pageSize: ps } = table.getState().pagination;
  const totalRows  = table.getFilteredRowModel().rows.length;
  const startRow   = pageIndex * ps + 1;
  const endRow     = Math.min(startRow + ps - 1, totalRows);

  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden', className)}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 flex-wrap">
        <div className="relative min-w-[200px] flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <button
              onClick={() => setShowColToggle((p) => !p)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors',
                showColToggle ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Columns
            </button>

            {showColToggle && (
              <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-30">
                {table.getAllLeafColumns().map((col) => (
                  <label key={col.id} className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 cursor-pointer">
                    <div
                      className={cn(
                        'w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                        col.getIsVisible() ? 'bg-orange-500 border-orange-500' : 'border-slate-300'
                      )}
                      onClick={col.getToggleVisibilityHandler()}
                    >
                      {col.getIsVisible() && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="capitalize">{col.id.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-slate-50 border-b border-slate-100">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={cn(
                      'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap select-none',
                      header.column.getCanSort() && 'cursor-pointer hover:text-slate-700'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="text-slate-300">
                          {header.column.getIsSorted() === 'asc' ? (
                            <ChevronUp className="w-3.5 h-3.5 text-orange-500" />
                          ) : header.column.getIsSorted() === 'desc' ? (
                            <ChevronDown className="w-3.5 h-3.5 text-orange-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="border-b border-slate-50">
                  {columns.map((_, j) => (
                    <td key={j} className="px-4 py-3.5">
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                      <Database className="w-7 h-7 text-slate-300" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-600">{emptyTitle}</div>
                      <div className="text-xs text-slate-400 mt-1">{emptyDescription}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 hover:bg-orange-50/20 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3.5 text-slate-600">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 flex-wrap gap-2">
        <div className="text-xs text-slate-500">
          {totalRows === 0 ? 'No records' : `Showing ${startRow}–${endRow} of ${totalRows} records`}
        </div>

        <div className="flex items-center gap-1">
          <PagBtn onClick={() => table.setPageIndex(0)}              disabled={!table.getCanPreviousPage()} title="First">
            <ChevronsLeft className="w-4 h-4" />
          </PagBtn>
          <PagBtn onClick={() => table.previousPage()}              disabled={!table.getCanPreviousPage()} title="Prev">
            <ChevronLeft className="w-4 h-4" />
          </PagBtn>

          {Array.from({ length: Math.min(table.getPageCount(), 5) }, (_, i) => {
            const page = Math.max(0, Math.min(pageIndex - 2, table.getPageCount() - 5)) + i;
            return (
              <button
                key={page}
                onClick={() => table.setPageIndex(page)}
                className={cn(
                  'w-8 h-8 rounded-lg text-xs font-semibold transition-colors',
                  page === pageIndex ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-100'
                )}
              >
                {page + 1}
              </button>
            );
          })}

          <PagBtn onClick={() => table.nextPage()}                  disabled={!table.getCanNextPage()} title="Next">
            <ChevronRight className="w-4 h-4" />
          </PagBtn>
          <PagBtn onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} title="Last">
            <ChevronsRight className="w-4 h-4" />
          </PagBtn>
        </div>
      </div>
    </div>
  );
}

function PagBtn({ children, onClick, disabled, title }: { children: React.ReactNode; onClick: () => void; disabled: boolean; title?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      {children}
    </button>
  );
}
