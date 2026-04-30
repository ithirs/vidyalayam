'use client';

import { useState } from 'react';
import { X, TriangleAlert as AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CANCEL_REASONS, type Receipt } from './data';

interface Props {
  receipt: Receipt;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export function CancelModal({ receipt, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState('');
  const [custom, setCustom] = useState('');

  const finalReason = reason === 'Other' ? custom.trim() : reason;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 font-heading">Cancel Receipt</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              You are about to cancel <strong>{receipt.receiptNo}</strong> for <strong>{receipt.studentName}</strong>. This action cannot be undone.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Cancellation Reason</label>
            <div className="space-y-2">
              {CANCEL_REASONS.map((r) => (
                <label key={r} className={cn(
                  'flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 cursor-pointer transition-all',
                  reason === r ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                )}>
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                    reason === r ? 'border-red-500' : 'border-slate-300'
                  )}>
                    {reason === r && <div className="w-2 h-2 rounded-full bg-red-500" />}
                  </div>
                  <input type="radio" className="sr-only" checked={reason === r} onChange={() => setReason(r)} />
                  <span className="text-sm text-slate-700">{r}</span>
                </label>
              ))}
            </div>

            {reason === 'Other' && (
              <textarea
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Enter cancellation reason..."
                rows={2}
                className="mt-2 w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm resize-none"
              />
            )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Keep Receipt
          </button>
          <button
            onClick={() => finalReason && onConfirm(finalReason)}
            disabled={!finalReason}
            className={cn(
              'flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all',
              finalReason ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            )}
          >
            Cancel Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
