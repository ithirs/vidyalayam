'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useReactTable, getCoreRowModel, getSortedRowModel, flexRender,
  type ColumnDef, type SortingState,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, MoveHorizontal as MoreHorizontal, Eye, Pencil, ArrowLeftRight, FileText, Trash2, MessageSquare, Download, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Student, FEE_STATUS_CONFIG, STATUS_CONFIG } from './data';
import { toast } from 'sonner';

interface StudentTableProps {
  students: Student[];
  page: number;
  perPage: number;
  onPageChange: (p: number) => void;
  onPerPageChange: (n: number) => void;
  total: number;
}

function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-blue-400', 'bg-emerald-400', 'bg-orange-400', 'bg-pink-400', 'bg-violet-400', 'bg-cyan-400', 'bg-amber-400', 'bg-rose-400'];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div className={cn(`w-${size} h-${size} rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0`, color)}>
      {initials}
    </div>
  );
}

function ActionMenu({ student }: { student: Student }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const items = [
    { label: 'View Profile', icon: Eye, onClick: () => router.push(`/admin/students/${student.id}`) },
    { label: 'Edit', icon: Pencil, onClick: () => toast.info('Opening edit form…') },
    { label: 'Transfer Class', icon: ArrowLeftRight, onClick: () => toast.info('Transfer dialog opening…') },
    { label: 'Generate TC', icon: FileText, onClick: () => toast.success('TC generated') },
    { label: 'Delete', icon: Trash2, onClick: () => toast.error(`${student.name} deleted`), danger: true },
  ];

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        onBlur={() => setTimeout(() => setOpen(false), 150)}>
        <MoreHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 z-30 bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden w-44 py-1">
          {items.map(({ label, icon: Icon, onClick, danger }) => (
            <button key={label} onMouseDown={onClick}
              className={cn('w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium transition-colors hover:bg-slate-50',
                danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700')}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function StudentTable({ students, page, perPage, onPageChange, onPerPageChange, total }: StudentTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const router = useRouter();

  const allOnPage = students.every((s) => selected.has(s.id));
  const toggleAll = () => {
    setSelected((sel) => {
      const ns = new Set(sel);
      if (allOnPage) students.forEach((s) => ns.delete(s.id));
      else students.forEach((s) => ns.add(s.id));
      return ns;
    });
  };

  const columns: ColumnDef<Student>[] = [
    {
      id: 'select',
      header: () => (
        <input type="checkbox" checked={allOnPage && students.length > 0} onChange={toggleAll}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-100" />
      ),
      cell: ({ row }) => (
        <input type="checkbox" checked={selected.has(row.original.id)}
          onChange={() => setSelected((s) => { const ns = new Set(s); ns.has(row.original.id) ? ns.delete(row.original.id) : ns.add(row.original.id); return ns; })}
          className="rounded border-slate-300 text-blue-600 focus:ring-blue-100" />
      ),
      enableSorting: false,
      size: 40,
    },
    { accessorKey: 'rollNo', header: 'Roll No', size: 80,
      cell: ({ getValue }) => <span className="font-mono text-xs font-bold text-slate-500">{getValue() as string}</span> },
    { id: 'photo', header: '',
      cell: ({ row }) => <Avatar name={row.original.name} size={8} />,
      enableSorting: false, size: 40 },
    { accessorKey: 'name', header: 'Student Name', size: 160,
      cell: ({ row }) => (
        <button onClick={() => router.push(`/admin/students/${row.original.id}`)}
          className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors text-left">
          {row.original.name}
        </button>
      )},
    { id: 'classSection', header: 'Class',
      cell: ({ row }) => (
        <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl">
          {row.original.class}-{row.original.section}
        </span>
      ),
      accessorFn: (r) => `${r.class}-${r.section}`, size: 90 },
    { accessorKey: 'fatherName', header: "Father's Name", size: 140,
      cell: ({ getValue }) => <span className="text-sm text-slate-600">{getValue() as string}</span> },
    { accessorKey: 'phone', header: 'Phone', size: 120,
      cell: ({ getValue }) => <span className="text-xs font-mono text-slate-500">{getValue() as string}</span> },
    { accessorKey: 'feeStatus', header: 'Fee Status', size: 100,
      cell: ({ getValue }) => {
        const v = getValue() as keyof typeof FEE_STATUS_CONFIG;
        const cfg = FEE_STATUS_CONFIG[v];
        return (
          <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', cfg.bg, cfg.text, cfg.border)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
            {cfg.label}
          </span>
        );
      }},
    { accessorKey: 'status', header: 'Status', size: 100,
      cell: ({ getValue }) => {
        const v = getValue() as keyof typeof STATUS_CONFIG;
        const cfg = STATUS_CONFIG[v];
        return (
          <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', cfg.bg, cfg.text, cfg.border)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
            {cfg.label}
          </span>
        );
      }},
    { id: 'actions', header: 'Actions', enableSorting: false,
      cell: ({ row }) => <ActionMenu student={row.original} />, size: 60 },
  ];

  const table = useReactTable({
    data: students,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 bg-blue-50 border-b border-blue-100">
          <span className="text-sm font-bold text-blue-700">{selected.size} selected</span>
          <div className="flex gap-2">
            {[
              { label: 'Delete', icon: Trash2, cls: 'text-red-600 hover:bg-red-50 border-red-200' },
              { label: 'Send SMS', icon: MessageSquare, cls: 'text-slate-700 hover:bg-slate-50 border-slate-200' },
              { label: 'Export', icon: Download, cls: 'text-slate-700 hover:bg-slate-50 border-slate-200' },
            ].map(({ label, icon: Icon, cls }) => (
              <button key={label} onClick={() => toast.info(`${label} action triggered`)}
                className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors bg-white', cls)}>
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
          <button onClick={() => setSelected(new Set())} className="ml-auto text-xs text-blue-500 hover:text-blue-700 font-medium">Clear</button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th key={header.id} style={{ width: header.getSize() }}
                  className="px-4 py-3.5 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                  {header.isPlaceholder ? null : header.column.getCanSort() ? (
                    <button onClick={header.column.getToggleSortingHandler()}
                      className="flex items-center gap-1 hover:text-slate-700 transition-colors group/th">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' ? <ArrowUp className="w-3 h-3 text-blue-500" />
                        : header.column.getIsSorted() === 'desc' ? <ArrowDown className="w-3 h-3 text-blue-500" />
                        : <ArrowUpDown className="w-3 h-3 text-slate-300 group-hover/th:text-slate-400" />}
                    </button>
                  ) : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className={cn('hover:bg-slate-50/60 transition-colors', selected.has(row.original.id) && 'bg-blue-50/30')}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {students.length === 0 && (
              <tr><td colSpan={columns.length} className="py-16 text-center text-sm text-slate-400">No students match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Show</span>
          <select value={perPage} onChange={(e) => { onPerPageChange(Number(e.target.value)); onPageChange(1); }}
            className="px-2 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700">
            {[25, 50, 100].map((n) => <option key={n}>{n}</option>)}
          </select>
          <span className="text-xs text-slate-500">per page</span>
        </div>

        <p className="text-xs text-slate-500">Showing <span className="font-bold text-slate-700">{start}–{end}</span> of <span className="font-bold text-slate-700">{total}</span> students</p>

        <div className="flex items-center gap-1">
          <button disabled={page === 1} onClick={() => onPageChange(page - 1)}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Prev
          </button>
          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            const pg = i + 1;
            return (
              <button key={pg} onClick={() => onPageChange(pg)}
                className={cn('w-8 h-8 text-xs font-bold rounded-xl border transition-all',
                  page === pg ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-600 hover:bg-slate-50')}>
                {pg}
              </button>
            );
          })}
          {totalPages > 7 && <span className="text-slate-400 text-xs px-1">…{totalPages}</span>}
          <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
