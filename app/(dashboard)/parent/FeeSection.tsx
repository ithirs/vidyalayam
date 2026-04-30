'use client';

import { useState } from 'react';
import { ChevronDown, Download, CreditCard, CircleCheck as CheckCircle2, Clock, CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PENDING_FEES, PAYMENT_HISTORY } from './data';
import { toast } from 'sonner';

export function FeeSection() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const total = PENDING_FEES.reduce((s, f) => s + f.amount, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="p-5 pb-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-slate-900 font-heading text-sm">Fee Details</h3>
          <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-lg">Due</span>
        </div>
        <p className="text-[11px] text-slate-400">Term 2 · January 2025</p>
      </div>

      <div className="px-5 mt-4 space-y-2">
        {PENDING_FEES.map((fee) => (
          <div key={fee.id} className={cn(
            'flex items-center justify-between py-3 px-4 rounded-xl border transition-colors',
            fee.overdue ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'
          )}>
            <div className="flex items-center gap-2.5">
              <div className={cn('w-2 h-2 rounded-full', fee.overdue ? 'bg-red-500' : 'bg-orange-400')} />
              <div>
                <p className="text-sm font-semibold text-slate-800">{fee.label}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <p className="text-[11px] text-slate-400">Due: {fee.dueDate}</p>
                </div>
              </div>
            </div>
            <span className={cn('text-sm font-bold tabular-nums', fee.overdue ? 'text-red-600' : 'text-slate-800')}>
              ₹{fee.amount.toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>

      <div className="px-5 mt-4">
        <div className="flex items-center justify-between py-3 border-t-2 border-slate-200">
          <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">Total Due</span>
          <span className="text-xl font-bold text-slate-900 font-heading tabular-nums">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <button
          onClick={() => toast.info('Redirecting to payment gateway…')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-brand-sm hover:shadow-brand transition-all duration-150 active:scale-[0.98]"
        >
          <CreditCard className="w-4.5 h-4.5" />
          Pay All Online · ₹{total.toLocaleString('en-IN')}
        </button>
      </div>

      <div className="border-t border-slate-100">
        <button
          onClick={() => setHistoryOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span>Payment History (last 6 months)</span>
          <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform duration-200', historyOpen && 'rotate-180')} />
        </button>

        {historyOpen && (
          <div className="px-5 pb-4 space-y-2 border-t border-slate-100 pt-3">
            {PAYMENT_HISTORY.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{p.month}</p>
                    <p className="text-[11px] text-slate-400">{p.date} · {p.mode} · {p.receiptNo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-600 tabular-nums">₹{p.amount.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => toast.success(`Downloading ${p.receiptNo}…`)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                    title="Download receipt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
