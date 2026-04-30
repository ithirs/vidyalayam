'use client';

import { useState, useMemo } from 'react';
import { RotateCcw, ArrowUpDown, SquareCheck as CheckSquare, Square, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ISSUED_BOOKS, ISSUE_STATUS_CONFIG, type IssueStatus, type IssuedBook } from './data';
import { toast } from 'sonner';

type SortKey = 'dueDate' | 'studentName' | 'status';

export function IssuedBooksTable() {
  const [returned, setReturned] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('dueDate');
  const [sortAsc, setSortAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');

  const active = useMemo(() =>
    ISSUED_BOOKS.filter((b) => !returned.has(b.id)), [returned]);

  const filtered = useMemo(() => {
    const base = statusFilter === 'all' ? active : active.filter((b) => b.status === statusFilter);
    return [...base].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'studentName') cmp = a.studentName.localeCompare(b.studentName);
      else if (sortKey === 'status') {
        const order: Record<IssueStatus, number> = { overdue: 0, due_today: 1, on_time: 2 };
        cmp = order[a.status] - order[b.status];
      } else {
        cmp = a.id.localeCompare(b.id);
      }
      return sortAsc ? cmp : -cmp;
    });
  }, [active, sortKey, sortAsc, statusFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const handleReturn = (id: string, name: string, title: string) => {
    setReturned((r) => new Set(r).add(id));
    setSelected((s) => { const ns = new Set(s); ns.delete(id); return ns; });
    toast.success(`"${title}" returned by ${name}`);
  };

  const handleBulkReturn = () => {
    if (selected.size === 0) return toast.error('No books selected');
    const count = selected.size;
    setReturned((r) => { const ns = new Set(r); selected.forEach((id) => ns.add(id)); return ns; });
    setSelected(new Set());
    toast.success(`${count} book${count > 1 ? 's' : ''} marked as returned`);
  };

  const toggleSelect = (id: string) => {
    setSelected((s) => {
      const ns = new Set(s);
      ns.has(id) ? ns.delete(id) : ns.add(id);
      return ns;
    });
  };

  const allSelected = filtered.length > 0 && filtered.every((b) => selected.has(b.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelected((s) => { const ns = new Set(s); filtered.forEach((b) => ns.delete(b.id)); return ns; });
    } else {
      setSelected((s) => { const ns = new Set(s); filtered.forEach((b) => ns.add(b.id)); return ns; });
    }
  };

  const SortBtn = ({ label, sortK }: { label: string; sortK: SortKey }) => (
    <button onClick={() => toggleSort(sortK)}
      className="flex items-center gap-1 group/sort hover:text-slate-700 transition-colors">
      {label}
      <ArrowUpDown className={cn('w-3 h-3', sortKey === sortK ? 'text-blue-500' : 'text-slate-300 group-hover/sort:text-slate-400')} />
    </button>
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-slate-900 font-heading">Issued Books</h3>
            <p className="text-xs text-slate-400 mt-0.5">{active.length} books currently out · {returned.size} returned this session</p>
          </div>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <button onClick={handleBulkReturn}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-colors active:scale-95">
                <RotateCcw className="w-3.5 h-3.5" />
                Return {selected.size} selected
              </button>
            )}
            <div className="flex gap-1.5 flex-wrap">
              {(['all', 'overdue', 'due_today', 'on_time'] as (IssueStatus | 'all')[]).map((s) => {
                const cfg = s !== 'all' ? ISSUE_STATUS_CONFIG[s] : null;
                return (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={cn(
                      'flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all',
                      statusFilter === s
                        ? s === 'all' ? 'bg-slate-800 border-slate-800 text-white' : `${cfg!.bg} ${cfg!.text} ${cfg!.border}`
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    )}>
                    {cfg && <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />}
                    {s === 'all' ? 'All' : cfg!.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 py-3 w-10">
                <button onClick={toggleAll} className="text-slate-400 hover:text-slate-600 transition-colors">
                  {allSelected ? <CheckSquare className="w-4 h-4 text-blue-500" /> : <Square className="w-4 h-4" />}
                </button>
              </th>
              {[
                { label: 'Student', key: 'studentName' as SortKey },
                { label: 'Class', key: null },
                { label: 'Book Title', key: null },
                { label: 'Issue Date', key: null },
                { label: 'Due Date', key: 'dueDate' as SortKey },
                { label: 'Status', key: 'status' as SortKey },
                { label: 'Action', key: null },
              ].map(({ label, key }) => (
                <th key={label} className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  {key ? <SortBtn label={label} sortK={key} /> : label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-12 text-sm text-slate-400">No books match the selected filter.</td></tr>
            ) : filtered.map((issue) => {
              const cfg = ISSUE_STATUS_CONFIG[issue.status];
              const isSelected = selected.has(issue.id);
              return (
                <tr key={issue.id} className={cn('hover:bg-slate-50/70 transition-colors group', isSelected && 'bg-blue-50/40')}>
                  <td className="px-4 py-3.5">
                    <button onClick={() => toggleSelect(issue.id)} className="text-slate-400 hover:text-blue-500 transition-colors">
                      {isSelected ? <CheckSquare className="w-4 h-4 text-blue-500" /> : <Square className="w-4 h-4" />}
                    </button>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                        {issue.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{issue.studentName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-medium text-slate-500">{issue.class}-{issue.section}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-700 font-medium max-w-[160px]">
                    <span className="line-clamp-1">{issue.bookTitle}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-400 tabular-nums">{issue.issueDate}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-slate-700 tabular-nums whitespace-nowrap">
                    <span className={cn(issue.status === 'overdue' ? 'text-red-600' : issue.status === 'due_today' ? 'text-orange-600' : '')}>
                      {issue.dueDate}
                    </span>
                    {issue.daysOverdue && (
                      <span className="text-[10px] text-red-400 ml-1">+{issue.daysOverdue}d</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', cfg.bg, cfg.text, cfg.border)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => handleReturn(issue.id, issue.studentName, issue.bookTitle)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-green-50 hover:text-green-700 text-slate-600 text-xs font-bold transition-all active:scale-95 border border-slate-200 hover:border-green-200"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Return
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
