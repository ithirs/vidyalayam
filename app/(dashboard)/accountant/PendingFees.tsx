'use client';

import { useState } from 'react';
import { MessageCircle, CircleCheck as CheckCircle2, ArrowUpDown, TriangleAlert as AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PENDING_STUDENTS, type PendingStudent } from './data';
import { toast } from 'sonner';

function OverdueBadge({ days }: { days: number }) {
  const isUrgent = days >= 30;
  const isMedium = days >= 14 && days < 30;
  return (
    <span className={cn(
      'inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full',
      isUrgent ? 'bg-red-100 text-red-700' : isMedium ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
    )}>
      {isUrgent && <AlertTriangle className="w-2.5 h-2.5" />}
      {days}d
    </span>
  );
}

type SortKey = 'overdueDays' | 'feeDue' | 'studentName';

export function PendingFees() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('overdueDays');
  const [sortAsc, setSortAsc] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => prev.size === PENDING_STUDENTS.length ? new Set() : new Set(PENDING_STUDENTS.map((s) => s.id)));
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(true); }
  };

  const sorted = [...PENDING_STUDENTS].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === 'overdueDays') return (a.overdueDays - b.overdueDays) * dir;
    if (sortKey === 'feeDue') return (a.feeDue - b.feeDue) * dir;
    return a.studentName.localeCompare(b.studentName) * dir;
  });

  const totalPending = sorted.reduce((s, p) => s + p.feeDue, 0);
  const selectedStudents = sorted.filter((s) => selected.has(s.id));

  const sendReminders = () => {
    if (selected.size === 0) { toast.error('Select at least one student'); return; }
    toast.success(`WhatsApp reminder sent to ${selected.size} parent(s)`);
    setSelected(new Set());
  };

  function SortBtn({ col }: { col: SortKey }) {
    return (
      <button onClick={() => handleSort(col)} className="inline-flex items-center gap-0.5 hover:text-slate-700 transition-colors">
        <ArrowUpDown className={cn('w-3 h-3', sortKey === col ? 'text-orange-500' : 'text-slate-300')} />
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Pending Fee List</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {PENDING_STUDENTS.length} students · Total pending: ₹{totalPending.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selected.size > 0 && (
            <span className="text-xs text-slate-500">{selected.size} selected</span>
          )}
          <button
            onClick={sendReminders}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150',
              selected.size > 0
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
                : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-200'
            )}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Send WhatsApp Reminder
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-2.5 pr-3 w-8">
                <input
                  type="checkbox"
                  checked={selected.size === PENDING_STUDENTS.length && PENDING_STUDENTS.length > 0}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded border-slate-300 text-orange-500 focus:ring-orange-200 accent-orange-500"
                />
              </th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3">
                <div className="flex items-center gap-1">Student <SortBtn col="studentName" /></div>
              </th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3 hidden sm:table-cell">Class</th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3">
                <div className="flex items-center gap-1">Fee Due <SortBtn col="feeDue" /></div>
              </th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3">
                <div className="flex items-center gap-1">Overdue <SortBtn col="overdueDays" /></div>
              </th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3 hidden md:table-cell">Parent Phone</th>
              <th className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sorted.map((student) => (
              <tr
                key={student.id}
                className={cn(
                  'transition-colors',
                  selected.has(student.id) ? 'bg-orange-50/50' : 'hover:bg-slate-50/60'
                )}
              >
                <td className="py-3 pr-3">
                  <input
                    type="checkbox"
                    checked={selected.has(student.id)}
                    onChange={() => toggle(student.id)}
                    className="w-3.5 h-3.5 rounded border-slate-300 accent-orange-500"
                  />
                </td>
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-2.5">
                    <div className={cn('w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0', student.avatarColor)}>
                      {student.avatarInitials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">{student.studentName}</p>
                      <p className="text-[10px] text-slate-400">{student.rollNo}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-3 hidden sm:table-cell">
                  <span className="text-xs text-slate-600">{student.className}</span>
                </td>
                <td className="py-3 pr-3">
                  <span className="text-sm font-bold text-red-600 tabular-nums">₹{student.feeDue.toLocaleString('en-IN')}</span>
                  <p className="text-[10px] text-slate-400">{student.feeType}</p>
                </td>
                <td className="py-3 pr-3">
                  <div className="flex flex-col gap-0.5">
                    <OverdueBadge days={student.overdueDays} />
                    <span className="text-[10px] text-slate-400">Since {student.overdueSince}</span>
                  </div>
                </td>
                <td className="py-3 pr-3 hidden md:table-cell">
                  <a href={`tel:${student.parentPhone}`} className="text-xs font-mono text-blue-600 hover:underline">
                    {student.parentPhone}
                  </a>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toast.success(`Reminder sent to ${student.studentName}'s parent`)}
                      title="Send WhatsApp"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toast.success(`${student.studentName} marked as collected`)}
                      title="Mark Collected"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
