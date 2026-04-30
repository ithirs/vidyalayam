'use client';

import { useState } from 'react';
import { QrCode, Calculator } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PaymentMode } from './data';

interface Props {
  mode: PaymentMode;
  netPayable: number;
  onChange: (m: PaymentMode) => void;
  onChequeChange: (data: { number: string; bank: string; date: string }) => void;
  chequeData: { number: string; bank: string; date: string };
}

const MODES: { key: PaymentMode; label: string; icon: string }[] = [
  { key: 'cash', label: 'Cash', icon: '💵' },
  { key: 'upi', label: 'UPI', icon: '📱' },
  { key: 'card', label: 'Card', icon: '💳' },
  { key: 'cheque', label: 'Cheque', icon: '🏦' },
  { key: 'online', label: 'Online', icon: '🌐' },
];

export function PaymentModeSelector({ mode, netPayable, onChange, onChequeChange, chequeData }: Props) {
  const [received, setReceived] = useState('');
  const change = received ? Math.max(0, Number(received) - netPayable) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100">
        <h3 className="font-bold text-slate-800 font-heading">Payment Mode</h3>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-5 gap-2">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => onChange(m.key)}
              className={cn(
                'flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl border-2 transition-all',
                mode === m.key
                  ? 'border-orange-400 bg-orange-50 shadow-brand-sm'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              )}
            >
              <span className="text-2xl">{m.icon}</span>
              <span className={cn('text-xs font-semibold', mode === m.key ? 'text-orange-600' : 'text-slate-600')}>
                {m.label}
              </span>
            </button>
          ))}
        </div>

        {mode === 'cash' && (
          <div className="mt-4 bg-slate-50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Calculator className="w-4 h-4 text-orange-500" />
              Change Calculator
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                <input
                  type="number"
                  value={received}
                  onChange={(e) => setReceived(e.target.value)}
                  placeholder="Amount received"
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>
              <div className="text-slate-400 text-sm font-medium">→</div>
              <div className="flex-1 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
                <div className="text-[10px] text-green-600 font-medium">Change</div>
                <div className="text-sm font-bold text-green-700">₹{change.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>
        )}

        {mode === 'upi' && (
          <div className="mt-4 bg-slate-50 rounded-xl p-4 flex items-center gap-4">
            <div className="w-24 h-24 bg-white rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-1">
              <QrCode className="w-8 h-8 text-slate-400" />
              <span className="text-[10px] text-slate-400 font-medium">QR Code</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-800 mb-1">Scan to Pay</div>
              <div className="text-xs text-slate-500 mb-2">UPI ID: school@upi</div>
              <div className="text-lg font-bold text-orange-600 font-heading">₹{netPayable.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-slate-400 mt-1">Amount auto-filled in UPI app</div>
            </div>
          </div>
        )}

        {mode === 'cheque' && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Cheque Number</label>
              <input
                type="text"
                value={chequeData.number}
                onChange={(e) => onChequeChange({ ...chequeData, number: e.target.value })}
                placeholder="e.g. 123456"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Bank Name</label>
              <input
                type="text"
                value={chequeData.bank}
                onChange={(e) => onChequeChange({ ...chequeData, bank: e.target.value })}
                placeholder="e.g. SBI, HDFC"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Cheque Date</label>
              <input
                type="date"
                value={chequeData.date}
                onChange={(e) => onChequeChange({ ...chequeData, date: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
            </div>
          </div>
        )}

        {mode === 'card' && (
          <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 flex items-center gap-2">
            <span>💳</span>
            <span>Swipe card on the POS terminal. Amount: <strong className="text-orange-600">₹{netPayable.toLocaleString('en-IN')}</strong></span>
          </div>
        )}

        {mode === 'online' && (
          <div className="mt-4 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 flex items-center gap-2">
            <span>🌐</span>
            <span>Payment link will be sent to parent's phone after collection is initiated.</span>
          </div>
        )}
      </div>
    </div>
  );
}
