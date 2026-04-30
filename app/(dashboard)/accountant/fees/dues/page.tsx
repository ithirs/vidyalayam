'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Download, MessageCircle, ChevronDown, CircleAlert as AlertCircle, Clock, Users, IndianRupee, Send, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReminderModal } from './ReminderModal';
import { DUES_DATA, CLASS_OPTIONS, SECTION_OPTIONS, FEE_TYPE_OPTIONS, type DueRecord } from './data';

export default function FeeDuesPage() {
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [sectionFilter, setSectionFilter] = useState('All Sections');
  const [feeTypeFilter, setFeeTypeFilter] = useState('All Types');
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showReminder, setShowReminder] = useState(false);
  const [classOpen, setClassOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [feeOpen, setFeeOpen] = useState(false);

  const filtered = useMemo(() => {
    return DUES_DATA.filter((d) => {
      if (search && !d.studentName.toLowerCase().includes(search.toLowerCase()) && !d.parentPhone.includes(search)) return false;
      if (classFilter !== 'All Classes' && d.className !== classFilter) return false;
      if (sectionFilter !== 'All Sections' && d.section !== sectionFilter) return false;
      if (feeTypeFilter !== 'All Types' && !d.feeType.includes(feeTypeFilter.replace(' Fee', '').trim())) return false;
      if (overdueOnly && d.daysOverdue <= 0) return false;
      return true;
    }).sort((a, b) => b.daysOverdue - a.daysOverdue);
  }, [search, classFilter, sectionFilter, feeTypeFilter, overdueOnly]);

  const totalPending = DUES_DATA.reduce((s, d) => s + d.amount, 0);
  const totalOverdue = DUES_DATA.filter((d) => d.daysOverdue > 0).reduce((s, d) => s + d.amount, 0);
  const dueThisWeek = DUES_DATA.filter((d) => d.daysOverdue > -7 && d.daysOverdue <= 0).reduce((s, d) => s + d.amount, 0);
  const studentsCount = DUES_DATA.length;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id); else n.add(id);
      return n;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((d) => d.id)));
  };

  const selectedRecords = DUES_DATA.filter((d) => selectedIds.has(d.id));

  const rowColor = (d: DueRecord) => {
    if (d.daysOverdue > 0) return 'bg-red-50/30 hover:bg-red-50';
    if (d.daysOverdue > -3) return 'bg-orange-50/30 hover:bg-orange-50';
    return 'hover:bg-slate-50';
  };

  const statusBadge = (d: DueRecord) => {
    if (d.daysOverdue > 0)
      return <span className="text-[10px] font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{d.daysOverdue}d overdue</span>;
    if (d.daysOverdue > -3)
      return <span className="text-[10px] font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">Due soon</span>;
    return <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Upcoming</span>;
  };

  const closeDropdowns = () => { setClassOpen(false); setSectionOpen(false); setFeeOpen(false); };

  return (
    <>
      <Toaster position="top-right" richColors />
      {showReminder && (
        <ReminderModal
          selected={selectedRecords}
          onClose={() => setShowReminder(false)}
          onSent={() => {
            setShowReminder(false);
            setSelectedIds(new Set());
            toast.success(`Reminders sent to ${selectedRecords.length} parent${selectedRecords.length !== 1 ? 's' : ''}`);
          }}
        />
      )}

      <div className="space-y-5 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Fee Dues</h1>
            <p className="text-sm text-slate-500 mt-0.5">Track and follow up on pending fee payments</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Pending', value: `₹${(totalPending / 100000).toFixed(1)}L`, sub: `${DUES_DATA.length} students`, color: 'text-slate-900', bg: 'bg-white', icon: IndianRupee, iconColor: 'bg-slate-100 text-slate-500' },
            { label: 'Overdue', value: `₹${(totalOverdue / 100000).toFixed(1)}L`, sub: `${DUES_DATA.filter(d => d.daysOverdue > 0).length} students`, color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle, iconColor: 'bg-red-100 text-red-500' },
            { label: 'Due This Week', value: `₹${(dueThisWeek / 1000).toFixed(0)}K`, sub: `${DUES_DATA.filter(d => d.daysOverdue > -7 && d.daysOverdue <= 0).length} students`, color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock, iconColor: 'bg-orange-100 text-orange-500' },
            { label: 'Total Students', value: studentsCount.toString(), sub: 'with dues', color: 'text-blue-600', bg: 'bg-blue-50', icon: Users, iconColor: 'bg-blue-100 text-blue-500' },
          ].map((card) => (
            <div key={card.label} className={cn('rounded-2xl border border-slate-200 shadow-card p-4', card.bg)}>
              <div className="flex items-start justify-between mb-3">
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', card.iconColor)}>
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              <div className={cn('text-2xl font-black font-heading', card.color)}>{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student or phone..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>

              {[
                { label: classFilter, options: CLASS_OPTIONS, open: classOpen, setOpen: setClassOpen, onChange: setClassFilter },
                { label: sectionFilter, options: SECTION_OPTIONS, open: sectionOpen, setOpen: setSectionOpen, onChange: setSectionFilter },
                { label: feeTypeFilter, options: FEE_TYPE_OPTIONS, open: feeOpen, setOpen: setFeeOpen, onChange: setFeeTypeFilter },
              ].map((dd, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => { closeDropdowns(); dd.setOpen((o: boolean) => !o); }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 hover:border-slate-300 transition-all bg-white"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium truncate max-w-[110px]">{dd.label}</span>
                    <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', dd.open && 'rotate-180')} />
                  </button>
                  {dd.open && (
                    <div className="absolute top-full mt-1.5 left-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5 min-w-[160px]">
                      {dd.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { dd.onChange(opt); dd.setOpen(false); }}
                          className={cn('w-full text-left px-3.5 py-2 text-sm transition-colors', dd.label === opt ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setOverdueOnly((o) => !o)}
                  className={cn('w-9 h-5 rounded-full transition-colors relative', overdueOnly ? 'bg-red-500' : 'bg-slate-200')}
                >
                  <div className={cn('w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm', overdueOnly ? 'translate-x-4' : 'translate-x-0.5')} />
                </div>
                <span className="text-sm text-slate-600 font-medium">Overdue only</span>
              </label>
            </div>

            {selectedIds.size > 0 && (
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2">
                <span className="text-sm font-semibold text-orange-700">{selectedIds.size} selected</span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setShowReminder(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Send Reminder
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs font-medium hover:bg-white transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <button onClick={() => setSelectedIds(new Set())} className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="rounded"
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Fee Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Due Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Parent</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((d) => (
                  <tr key={d.id} className={cn('transition-colors', rowColor(d), selectedIds.has(d.id) && 'bg-orange-50/50')}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selectedIds.has(d.id)} onChange={() => toggleSelect(d.id)} className="rounded" />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0', d.avatarColor)}>
                          {d.avatarInitials}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{d.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{d.className}-{d.section}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">{d.feeType}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={cn('text-sm font-bold', d.daysOverdue > 0 ? 'text-red-600' : 'text-slate-800')}>
                        ₹{d.amount.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                      {new Date(d.dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                    </td>
                    <td className="px-4 py-3">{statusBadge(d)}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-slate-600">{d.parentPhone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => { setSelectedIds(new Set([d.id])); setShowReminder(true); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                          title="Send reminder"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/accountant/fees/collect`}
                          className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[11px] font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap"
                        >
                          Collect
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <AlertCircle className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                <div className="text-sm font-medium">No dues found</div>
                <div className="text-xs mt-1">Try adjusting the filters</div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {DUES_DATA.length} records</span>
            <span>Total: <strong className="text-slate-800">₹{filtered.reduce((s, d) => s + d.amount, 0).toLocaleString('en-IN')}</strong></span>
          </div>
        </div>
      </div>
    </>
  );
}
