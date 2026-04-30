'use client';

import { useState } from 'react';
import { Lock, Clock as Unlock, IndianRupee, CreditCard, Hash, Save, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function FeeSettings() {
  const [feeLocked, setFeeLocked] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [form, setState] = useState({
    lateFeeEnabled: true,
    lateFeeType: 'fixed' as 'fixed' | 'percent',
    lateFeeValue: '50',
    lateFeeAfterDays: '5',
    gracePeriod: '3',
    razorpayKey: 'rzp_live_••••••••••••••••',
    razorpaySecret: '••••••••••••••••••••••••',
    upiId: 'school@ybl',
    receiptPrefix: 'REC',
    receiptStartNumber: '1001',
    receiptYear: true,
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setState((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (k: string) => setState((f) => ({ ...f, [k]: !(f as unknown as Record<string, boolean>)[k] }));

  const handleSave = () => toast.success('Fee settings saved');

  return (
    <div className="space-y-5">
      <div className={cn(
        'rounded-2xl border-2 p-4 flex items-center justify-between gap-4',
        feeLocked ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
      )}>
        <div className="flex items-center gap-3">
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', feeLocked ? 'bg-red-100' : 'bg-green-100')}>
            {feeLocked ? <Lock className="w-5 h-5 text-red-600" /> : <Unlock className="w-5 h-5 text-green-600" />}
          </div>
          <div>
            <div className={cn('font-bold text-sm', feeLocked ? 'text-red-800' : 'text-green-800')}>
              Fee Structure is {feeLocked ? 'Locked' : 'Unlocked'}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {feeLocked ? 'No fee modifications allowed for this academic year' : 'Fee structure can be modified'}
            </div>
          </div>
        </div>
        <button
          onClick={() => { setFeeLocked((l) => !l); toast.success(`Fee structure ${feeLocked ? 'unlocked' : 'locked'}`); }}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-bold transition-colors',
            feeLocked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'
          )}
        >
          {feeLocked ? 'Unlock' : 'Lock'} Fee Structure
        </button>
      </div>

      <Section icon={IndianRupee} title="Late Fee Configuration">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-semibold text-slate-800">Enable Late Fee</div>
              <div className="text-xs text-slate-400">Apply penalty for payments after due date</div>
            </div>
            <Toggle value={form.lateFeeEnabled} onChange={() => toggle('lateFeeEnabled')} />
          </div>

          {form.lateFeeEnabled && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Charge Type</label>
                <select value={form.lateFeeType} onChange={set('lateFeeType')} className={inputCls}>
                  <option value="fixed">Fixed Amount (₹)</option>
                  <option value="percent">Percentage (%)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  {form.lateFeeType === 'fixed' ? 'Amount (₹)' : 'Percentage (%)'}
                </label>
                <input value={form.lateFeeValue} onChange={set('lateFeeValue')} type="number" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Apply After (days)</label>
                <input value={form.lateFeeAfterDays} onChange={set('lateFeeAfterDays')} type="number" className={inputCls} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Grace Period (days)</label>
                <input value={form.gracePeriod} onChange={set('gracePeriod')} type="number" className={inputCls} />
              </div>
            </div>
          )}
        </div>
      </Section>

      <Section icon={CreditCard} title="Payment Gateway — Razorpay">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">API Key (Live)</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={form.razorpayKey}
                onChange={set('razorpayKey')}
                className={cn(inputCls, 'pr-10')}
              />
              <button onClick={() => setShowKey((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Secret Key</label>
            <input type="password" value={form.razorpaySecret} onChange={set('razorpaySecret')} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">UPI ID</label>
            <input value={form.upiId} onChange={set('upiId')} placeholder="school@upi" className={inputCls} />
          </div>
          <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-green-700">Razorpay Connected · Live Mode</span>
          </div>
        </div>
      </Section>

      <Section icon={Hash} title="Receipt Numbering">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Prefix</label>
            <input value={form.receiptPrefix} onChange={set('receiptPrefix')} placeholder="REC" className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Starting Number</label>
            <input type="number" value={form.receiptStartNumber} onChange={set('receiptStartNumber')} className={inputCls} />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <Toggle value={form.receiptYear} onChange={() => toggle('receiptYear')} />
            <span className="text-sm text-slate-600">Include academic year</span>
          </div>
        </div>
        <div className="mt-3 bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-600">
          Preview: <span className="font-bold text-slate-800">
            {form.receiptPrefix}-{form.receiptYear ? '2526-' : ''}{form.receiptStartNumber}
          </span>
        </div>
      </Section>

      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
          <Save className="w-4 h-4" />
          Save Fee Settings
        </button>
      </div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={cn('relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 shrink-0', value ? 'bg-orange-500' : 'bg-slate-200')}>
      <span className={cn('inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5', value ? 'translate-x-5.5' : 'translate-x-0.5')} />
    </button>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-4">
        <Icon className="w-4 h-4 text-orange-500" />
        {title}
      </h3>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
