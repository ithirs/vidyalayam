'use client';

import { useState, useMemo } from 'react';
import { Search, Download, Eye, Printer, Circle as XCircle, CircleCheck as CheckCircle, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReceiptViewModal } from './ReceiptViewModal';
import { CancelModal } from './CancelModal';
import { RECEIPTS_DATA, type Receipt, type ReceiptStatus } from './data';

const MODE_ICONS: Record<string, string> = {
  UPI: '📱', Cash: '💵', Cheque: '🏦', Online: '🌐', Card: '💳',
};

export default function ReceiptsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReceiptStatus>('all');
  const [receipts, setReceipts] = useState<Receipt[]>(RECEIPTS_DATA);
  const [viewReceipt, setViewReceipt] = useState<Receipt | null>(null);
  const [cancelTarget, setCancelTarget] = useState<Receipt | null>(null);

  const filtered = useMemo(() => {
    return receipts.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          r.receiptNo.toLowerCase().includes(q) ||
          r.studentName.toLowerCase().includes(q) ||
          r.studentClass.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [receipts, search, statusFilter]);

  const handleCancel = (receipt: Receipt, reason: string) => {
    setReceipts((prev) => prev.map((r) => r.id === receipt.id ? { ...r, status: 'cancelled' as const, cancelReason: reason } : r));
    setCancelTarget(null);
    toast.error(`Receipt ${receipt.receiptNo} has been cancelled`);
  };

  const totalValid = receipts.filter((r) => r.status === 'valid').reduce((s, r) => s + r.amount, 0);
  const totalCancelled = receipts.filter((r) => r.status === 'cancelled').length;

  return (
    <>
      <Toaster position="top-right" richColors />
      {viewReceipt && <ReceiptViewModal receipt={viewReceipt} onClose={() => setViewReceipt(null)} />}
      {cancelTarget && (
        <CancelModal
          receipt={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={(reason) => handleCancel(cancelTarget, reason)}
        />
      )}

      <div className="space-y-5 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Receipts</h1>
            <p className="text-sm text-slate-500 mt-0.5">View, print and manage all fee receipts</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Collected', value: `₹${(totalValid / 100000).toFixed(2)}L`, sub: `${receipts.filter(r => r.status === 'valid').length} receipts`, color: 'text-slate-900' },
            { label: 'Today', value: `₹${receipts.filter(r => r.date === '2026-04-12' && r.status === 'valid').reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}`, sub: `${receipts.filter(r => r.date === '2026-04-12' && r.status === 'valid').length} receipts`, color: 'text-green-600' },
            { label: 'Cancelled', value: totalCancelled.toString(), sub: 'receipts voided', color: 'text-red-600' },
            { label: 'Total Receipts', value: receipts.length.toString(), sub: 'all time', color: 'text-orange-600' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-slate-200 shadow-card p-4">
              <div className={cn('text-2xl font-black font-heading', card.color)}>{card.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{card.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by receipt no, student, class..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden">
              {(['all', 'valid', 'cancelled'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'px-3.5 py-2 text-sm font-medium transition-colors capitalize',
                    statusFilter === s
                      ? s === 'cancelled' ? 'bg-red-500 text-white' : s === 'valid' ? 'bg-green-500 text-white' : 'bg-slate-800 text-white'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {s === 'all' ? `All (${receipts.length})` : s === 'valid' ? `Valid (${receipts.filter(r => r.status === 'valid').length})` : `Cancelled (${totalCancelled})`}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Receipt No.</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Mode</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono font-semibold text-slate-700">{r.receiptNo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0', r.avatarColor)}>
                          {r.avatarInitials}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{r.studentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{r.studentClass}-{r.studentSection}</td>
                    <td className="px-4 py-3 text-right font-bold text-slate-800">₹{r.amount.toLocaleString('en-IN')}</td>
                    <td className="px-4 py-3 text-sm text-slate-600 whitespace-nowrap">
                      {new Date(r.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1 text-sm text-slate-600">
                        <span>{MODE_ICONS[r.mode] || '💰'}</span>
                        {r.mode}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {r.status === 'valid' ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Valid
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full w-fit">
                          <XCircle className="w-3 h-3" />
                          Cancelled
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewReceipt(r)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewReceipt(r)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewReceipt(r)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {r.status === 'valid' && (
                          <button
                            onClick={() => setCancelTarget(r)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Cancel"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-slate-300" />
                </div>
                <div className="text-sm font-medium">No receipts found</div>
                <div className="text-xs mt-1">Try adjusting your search</div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filtered.length} of {receipts.length} receipts</span>
            <span>Total: <strong className="text-slate-800">₹{filtered.filter(r => r.status === 'valid').reduce((s, r) => s + r.amount, 0).toLocaleString('en-IN')}</strong></span>
          </div>
        </div>
      </div>
    </>
  );
}
