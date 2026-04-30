'use client';

import { useState } from 'react';
import { CircleAlert as AlertCircle, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DISCOUNT_REASONS, type FeeItem } from './data';

interface Props {
  items: FeeItem[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  discount: number;
  discountReason: string;
  lateFeeEnabled: boolean;
  onDiscountChange: (v: number) => void;
  onDiscountReasonChange: (v: string) => void;
  onLateFeeToggle: () => void;
}

export function FeeChecklist({
  items, selectedIds, onToggle,
  discount, discountReason, lateFeeEnabled,
  onDiscountChange, onDiscountReasonChange, onLateFeeToggle,
}: Props) {
  const [discountOpen, setDiscountOpen] = useState(false);

  const selectedItems = items.filter((i) => selectedIds.has(i.id));
  const subtotal = selectedItems.reduce((s, i) => s + i.amount, 0);
  const totalLateFee = lateFeeEnabled
    ? selectedItems.filter((i) => i.overdue && i.lateFee).reduce((s, i) => s + (i.lateFee ?? 0), 0)
    : 0;
  const netPayable = Math.max(0, subtotal + totalLateFee - discount);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 font-heading">Fee Items</h3>
        <p className="text-xs text-slate-500 mt-0.5">Select items to collect payment for</p>
      </div>

      <div className="divide-y divide-slate-50">
        {items.map((item) => {
          const checked = selectedIds.has(item.id);
          return (
            <label
              key={item.id}
              className={cn(
                'flex items-center gap-4 px-5 py-3.5 cursor-pointer transition-colors',
                checked ? 'bg-orange-50/50' : 'hover:bg-slate-50'
              )}
            >
              <div className={cn(
                'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all',
                checked ? 'bg-orange-500 border-orange-500' : 'border-slate-300'
              )}>
                {checked && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <input type="checkbox" className="sr-only" checked={checked} onChange={() => onToggle(item.id)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800">{item.label}</span>
                  {item.overdue && (
                    <span className="text-[10px] font-bold bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      Overdue
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400">{item.period}</span>
              </div>
              <div className="text-right shrink-0">
                <div className={cn('text-sm font-bold', checked ? 'text-orange-600' : 'text-slate-700')}>
                  ₹{item.amount.toLocaleString('en-IN')}
                </div>
                {item.overdue && item.lateFee && lateFeeEnabled && checked && (
                  <div className="text-[10px] text-red-500 font-medium">+₹{item.lateFee} late fee</div>
                )}
              </div>
            </label>
          );
        })}
      </div>

      <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Subtotal ({selectedItems.length} items)</span>
          <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
        </div>

        {items.some((i) => i.overdue && i.lateFee) && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onLateFeeToggle}
                className={cn(
                  'w-9 h-5 rounded-full transition-colors relative',
                  lateFeeEnabled ? 'bg-red-500' : 'bg-slate-200'
                )}
              >
                <div className={cn(
                  'w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm',
                  lateFeeEnabled ? 'translate-x-4' : 'translate-x-0.5'
                )} />
              </button>
              <span className="text-sm text-slate-600">Include late fee</span>
            </div>
            {lateFeeEnabled && (
              <span className="text-sm font-semibold text-red-500">+₹{totalLateFee.toLocaleString('en-IN')}</span>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDiscountOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            {discountOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {discount > 0 ? `Discount: ₹${discount}` : 'Add Discount'}
          </button>
        </div>

        {discountOpen && (
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">₹</span>
              <input
                type="number"
                min={0}
                max={subtotal}
                value={discount || ''}
                onChange={(e) => onDiscountChange(Math.min(Number(e.target.value), subtotal))}
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-slate-800"
                placeholder="0"
              />
            </div>
            <div className="relative flex-1">
              <select
                value={discountReason}
                onChange={(e) => onDiscountReasonChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-slate-700 bg-white appearance-none"
              >
                <option value="">Select reason</option>
                {DISCOUNT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {discount > 0 && (
          <div className="flex items-center justify-between text-sm text-green-600">
            <span>Discount ({discountReason || 'Applied'})</span>
            <span className="font-semibold">-₹{discount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
          <span className="font-bold text-slate-900 font-heading">Net Payable</span>
          <span className="text-xl font-bold text-orange-600 font-heading">₹{netPayable.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}
