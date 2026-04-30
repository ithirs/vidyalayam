'use client';

import { useState } from 'react';
import { Printer, CreditCard, Banknote, Landmark, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { FEE_PAYMENTS, type FeePayment } from './data';

const METHOD_CONFIG: Record<FeePayment['method'], { icon: typeof CreditCard; color: string; bg: string }> = {
  Cash: { icon: Banknote, color: 'text-green-600', bg: 'bg-green-50' },
  UPI: { icon: Smartphone, color: 'text-blue-600', bg: 'bg-blue-50' },
  Card: { icon: CreditCard, color: 'text-orange-500', bg: 'bg-orange-50' },
  'Bank Transfer': { icon: Landmark, color: 'text-slate-500', bg: 'bg-slate-100' },
};

export function FeePaymentsTable() {
  const [filter, setFilter] = useState<'today' | 'week'>('today');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Recent Fee Payments</h3>
          <p className="text-xs text-slate-500 mt-0.5">{FEE_PAYMENTS.length} transactions</p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
          {(['today', 'week'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
                filter === f ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {f === 'today' ? 'Today' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              {['Student', 'Class', 'Amount', 'Method', 'Time', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {FEE_PAYMENTS.map((row) => {
              const mCfg = METHOD_CONFIG[row.method];
              const MIcon = mCfg.icon;
              return (
                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{row.studentName}</p>
                    <p className="text-xs text-slate-400">{row.receiptNo}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-600">{row.className}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-slate-900 tabular-nums">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(row.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium', mCfg.bg, mCfg.color)}>
                      <MIcon className="w-3 h-3" />
                      {row.method}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-400 whitespace-nowrap">{row.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toast.success(`Receipt printed: ${row.receiptNo}`)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-orange-500 hover:bg-orange-50 border border-slate-200 hover:border-orange-200 transition-all"
                    >
                      <Printer className="w-3 h-3" />
                      Receipt
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
