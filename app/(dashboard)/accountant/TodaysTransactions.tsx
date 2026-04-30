'use client';

import { useState } from 'react';
import { Search, ChevronDown, Printer, Eye, RotateCcw, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TODAYS_TRANSACTIONS, CLASS_OPTIONS, type Transaction } from './data';
import { toast } from 'sonner';

const MODE_CONFIG: Record<Transaction['mode'], { classes: string; label: string }> = {
  UPI: { classes: 'bg-violet-50 text-violet-700 border border-violet-200', label: 'UPI' },
  Cash: { classes: 'bg-slate-100 text-slate-600 border border-slate-200', label: 'Cash' },
  Cheque: { classes: 'bg-blue-50 text-blue-700 border border-blue-200', label: 'Cheque' },
  Online: { classes: 'bg-green-50 text-green-700 border border-green-200', label: 'Online' },
};

function ReceiptModal({ tx, onClose }: { tx: Transaction; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-sm animate-scale-in">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">Official Receipt</p>
            <p className="text-base font-bold text-slate-900 font-heading mt-0.5">{tx.receiptNo}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 mb-5 text-sm">
          {[
            { label: 'Student', value: tx.studentName },
            { label: 'Roll No', value: tx.rollNo },
            { label: 'Class', value: tx.className },
            { label: 'Fee Type', value: tx.feeType },
            { label: 'Amount', value: `₹${tx.amount.toLocaleString('en-IN')}` },
            { label: 'Mode', value: tx.mode },
            { label: 'Date', value: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
            { label: 'Time', value: tx.time },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-slate-500">{label}</span>
              <span className="font-semibold text-slate-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { toast.success(`Receipt ${tx.receiptNo} sent to printer`); onClose(); }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand transition-all"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export function TodaysTransactions() {
  const [search, setSearch] = useState('');
  const [modeFilter, setModeFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [modeDropOpen, setModeDropOpen] = useState(false);
  const [classDropOpen, setClassDropOpen] = useState(false);
  const [viewReceipt, setViewReceipt] = useState<Transaction | null>(null);

  const filtered = TODAYS_TRANSACTIONS.filter((tx) => {
    const matchSearch = tx.studentName.toLowerCase().includes(search.toLowerCase()) || tx.rollNo.toLowerCase().includes(search.toLowerCase());
    const matchMode = modeFilter === 'All' || tx.mode === modeFilter;
    const matchClass = classFilter === 'All Classes' || tx.className === classFilter;
    return matchSearch && matchMode && matchClass;
  });

  const total = filtered.reduce((sum, tx) => sum + tx.amount, 0);

  return (
    <>
      {viewReceipt && <ReceiptModal tx={viewReceipt} onClose={() => setViewReceipt(null)} />}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-sm">Today&apos;s Transactions</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{filtered.length} transactions · Total: ₹{total.toLocaleString('en-IN')}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student..."
                className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-colors w-40"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => { setModeDropOpen((o) => !o); setClassDropOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                {modeFilter === 'All' ? 'All Modes' : modeFilter}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {modeDropOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-32 z-50 py-1">
                  {['All', 'UPI', 'Cash', 'Cheque', 'Online'].map((m) => (
                    <button key={m} onClick={() => { setModeFilter(m); setModeDropOpen(false); }}
                      className={cn('w-full text-left px-3 py-2 text-xs transition-colors', modeFilter === m ? 'bg-orange-50 text-orange-600 font-medium' : 'text-slate-700 hover:bg-slate-50')}
                    >
                      {m === 'All' ? 'All Modes' : m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => { setClassDropOpen((o) => !o); setModeDropOpen(false); }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                {classFilter}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {classDropOpen && (
                <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-36 z-50 py-1 max-h-52 overflow-y-auto">
                  {CLASS_OPTIONS.map((cls) => (
                    <button key={cls} onClick={() => { setClassFilter(cls); setClassDropOpen(false); }}
                      className={cn('w-full text-left px-3 py-2 text-xs transition-colors', classFilter === cls ? 'bg-orange-50 text-orange-600 font-medium' : 'text-slate-700 hover:bg-slate-50')}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Student', 'Class', 'Fee Type', 'Amount', 'Mode', 'Time', 'Receipt', ''].map((h) => (
                  <th key={h} className="text-left pb-2.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide pr-3 whitespace-nowrap last:pr-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((tx) => {
                const modeCfg = MODE_CONFIG[tx.mode];
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('w-7 h-7 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0', tx.avatarColor)}>
                          {tx.avatarInitials}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 whitespace-nowrap">{tx.studentName}</p>
                          <p className="text-[10px] text-slate-400">{tx.rollNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-xs text-slate-600 whitespace-nowrap">{tx.className}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-xs text-slate-600 whitespace-nowrap">{tx.feeType}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-sm font-bold text-slate-900 tabular-nums whitespace-nowrap">₹{tx.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full', modeCfg.classes)}>{modeCfg.label}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-xs text-slate-500 whitespace-nowrap">{tx.time}</span>
                    </td>
                    <td className="py-3 pr-3">
                      <span className="text-[10px] font-mono text-slate-400">{tx.receiptNo}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setViewReceipt(tx)} title="View Receipt"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toast.success(`Printing ${tx.receiptNo}`)} title="Print"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toast.info(`Refund for ${tx.studentName} — coming soon`)} title="Refund"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200">
                <td colSpan={3} className="pt-3 pb-1">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total ({filtered.length} transactions)</span>
                </td>
                <td className="pt-3 pb-1">
                  <span className="text-base font-bold text-slate-900 font-heading tabular-nums">₹{total.toLocaleString('en-IN')}</span>
                </td>
                <td colSpan={4} />
              </tr>
            </tfoot>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm">No transactions match your filters</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
