'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { REVENUE_DATA } from './data';

function formatRupees(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
  return `₹${value}`;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-4 py-3 text-sm">
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="font-bold text-slate-900 font-heading">
        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payload[0].value)}
      </p>
    </div>
  );
}

export function RevenueChart() {
  const [mode, setMode] = useState<'mrr' | 'arr'>('mrr');

  const chartData = REVENUE_DATA.map((d) => ({
    ...d,
    value: mode === 'mrr' ? d.mrr : d.mrr * 12,
  }));

  const currentMRR = REVENUE_DATA[REVENUE_DATA.length - 1].mrr;
  const currentARR = currentMRR * 12;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Revenue Growth</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 12 months</p>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
          {(['mrr', 'arr'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                mode === m ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <div>
          <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Current MRR</p>
          <p className="text-xl font-bold text-slate-900 font-heading">{formatRupees(currentMRR)}</p>
        </div>
        <div className="w-px h-8 bg-slate-200" />
        <div>
          <p className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">ARR</p>
          <p className="text-xl font-bold text-slate-900 font-heading">{formatRupees(currentARR)}</p>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F97316" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={formatRupees}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
              width={52}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#F97316"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#F97316', stroke: '#fff', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
