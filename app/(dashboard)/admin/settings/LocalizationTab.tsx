'use client';

import { useState } from 'react';
import { Globe, Calendar, Clock, IndianRupee, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const LANGUAGES = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Marathi'];
const DATE_FORMATS = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY', 'D MMMM YYYY'];
const CURRENCIES = [{ code: 'INR', symbol: '₹', name: 'Indian Rupee' }];
const TIMEZONES = ['Asia/Kolkata (IST +5:30)', 'Asia/Mumbai', 'UTC'];

export function LocalizationTab() {
  const [form, setForm] = useState({
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h' as '12h' | '24h',
    currency: 'INR',
    timezone: 'Asia/Kolkata (IST +5:30)',
    firstDayOfWeek: 'Monday' as 'Monday' | 'Sunday',
    numberFormat: 'Indian' as 'Indian' | 'International',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const today = new Date();
  const previewDate = form.dateFormat
    .replace('DD', String(today.getDate()).padStart(2, '0'))
    .replace('MM', String(today.getMonth() + 1).padStart(2, '0'))
    .replace('YYYY', String(today.getFullYear()))
    .replace('D', String(today.getDate()))
    .replace('MMMM', today.toLocaleDateString('en-IN', { month: 'long' }));

  const previewTime = form.timeFormat === '12h'
    ? today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
    : today.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  const previewAmount = form.numberFormat === 'Indian'
    ? '₹1,23,456.00'
    : '₹123,456.00';

  return (
    <div className="space-y-5">
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
        <div className="text-xs font-semibold text-orange-700 mb-2 uppercase tracking-wide">Live Preview</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Date', value: previewDate },
            { label: 'Time', value: previewTime },
            { label: 'Amount', value: previewAmount },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl px-3 py-2.5 text-center shadow-sm">
              <div className="text-xs text-slate-400 font-medium">{item.label}</div>
              <div className="font-bold text-slate-900 mt-0.5">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-5">
        <Setting icon={Globe} title="Language" desc="Default display language for the school">
          <select value={form.language} onChange={set('language')} className={selectCls}>
            {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
          </select>
        </Setting>

        <Setting icon={Clock} title="Timezone" desc="School's local timezone">
          <select value={form.timezone} onChange={set('timezone')} className={selectCls}>
            {TIMEZONES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Setting>

        <Setting icon={Calendar} title="Date Format" desc="How dates are displayed across the system">
          <div className="flex flex-col sm:flex-row gap-2">
            <select value={form.dateFormat} onChange={set('dateFormat')} className={selectCls}>
              {DATE_FORMATS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
        </Setting>

        <Setting icon={Clock} title="Time Format" desc="12-hour or 24-hour clock">
          <div className="flex items-center gap-2">
            {(['12h', '24h'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setForm((f) => ({ ...f, timeFormat: t }))}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                  form.timeFormat === t ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {t === '12h' ? '12-hour (2:30 PM)' : '24-hour (14:30)'}
              </button>
            ))}
          </div>
        </Setting>

        <Setting icon={IndianRupee} title="Currency & Number Format" desc="Currency display and number formatting style">
          <div className="flex flex-col sm:flex-row gap-2">
            <select value={form.currency} onChange={set('currency')} className={selectCls}>
              {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>)}
            </select>
            <div className="flex items-center gap-2">
              {(['Indian', 'International'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setForm((prev) => ({ ...prev, numberFormat: f }))}
                  className={cn(
                    'px-3 py-2 rounded-xl text-sm font-semibold border transition-all whitespace-nowrap',
                    form.numberFormat === f ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                  )}
                >
                  {f === 'Indian' ? 'Indian (1,23,456)' : 'International (123,456)'}
                </button>
              ))}
            </div>
          </div>
        </Setting>

        <Setting icon={Calendar} title="First Day of Week" desc="Calendar week start day">
          <div className="flex items-center gap-2">
            {(['Monday', 'Sunday'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setForm((f) => ({ ...f, firstDayOfWeek: d }))}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                  form.firstDayOfWeek === d ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </Setting>
      </div>

      <div className="flex justify-end">
        <button onClick={() => toast.success('Localization settings saved')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}

function Setting({ icon: Icon, title, desc, children }: { icon: React.ElementType; title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-slate-50 last:border-0">
      <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-orange-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-800 mb-0.5">{title}</div>
        <div className="text-xs text-slate-400 mb-2">{desc}</div>
        {children}
      </div>
    </div>
  );
}

const selectCls = 'px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all min-w-[200px]';
