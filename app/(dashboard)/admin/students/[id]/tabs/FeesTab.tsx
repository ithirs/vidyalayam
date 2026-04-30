'use client';

import { IndianRupee, Download, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FEE_HISTORY, FEE_STATUS_CONFIG, type Student } from '../../data';
import { toast } from 'sonner';

export function FeesTab({ student }: { student: Student }) {
  const total = FEE_HISTORY.reduce((s, f) => s + f.amount, 0);
  const paid = FEE_HISTORY.reduce((s, f) => s + f.paid, 0);
  const pending = total - paid;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-center">
          <p className="text-2xl font-bold text-slate-800 font-heading">₹{total.toLocaleString('en-IN')}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">Total Annual Fee</p>
        </div>
        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-700 font-heading">₹{paid.toLocaleString('en-IN')}</p>
          <p className="text-xs font-semibold text-green-600 mt-1">Amount Paid</p>
        </div>
        <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-center">
          <p className="text-2xl font-bold text-red-700 font-heading">₹{pending.toLocaleString('en-IN')}</p>
          <p className="text-xs font-semibold text-red-500 mt-1">Pending Dues</p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
          <span>{Math.round((paid / total) * 100)}% collected</span>
          <span>₹{paid.toLocaleString()} / ₹{total.toLocaleString()}</span>
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${(paid / total) * 100}%` }} />
        </div>
      </div>

      {/* Payment history */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">Payment History</h3>
        <div className="space-y-2">
          {FEE_HISTORY.map((fee) => {
            const cfg = FEE_STATUS_CONFIG[fee.status];
            return (
              <div key={fee.id} className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex-wrap gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-800">{fee.term}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">{fee.date}</span>
                    {fee.mode !== '—' && <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-lg">{fee.mode}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-800">₹{fee.paid.toLocaleString()}</p>
                    {fee.paid < fee.amount && <p className="text-xs text-slate-400">of ₹{fee.amount.toLocaleString()}</p>}
                  </div>
                  <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', cfg.bg, cfg.text, cfg.border)}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                    {cfg.label}
                  </span>
                  {fee.status !== 'pending' && (
                    <button onClick={() => toast.success('Receipt downloaded')}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors border border-slate-200">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {pending > 0 && (
        <button onClick={() => toast.info('Opening payment gateway…')}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98]">
          <CreditCard className="w-4 h-4" />
          Pay Pending Dues — ₹{pending.toLocaleString('en-IN')}
        </button>
      )}
    </div>
  );
}
