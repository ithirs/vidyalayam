'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CLASS_COMPARISON } from '../data';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const pct = payload[0].value;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-3 py-2">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-900">{pct.toFixed(1)}%</p>
    </div>
  );
}

function getBarColor(pct: number) {
  if (pct >= 95) return '#22c55e';
  if (pct >= 90) return '#f97316';
  if (pct >= 80) return '#f59e0b';
  return '#ef4444';
}

export function ClassComparisonChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 font-heading">Class-wise Comparison</h3>
        <p className="text-xs text-slate-400 mt-0.5">This month — average attendance per class</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={CLASS_COMPARISON} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="cls" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
            {CLASS_COMPARISON.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.pct)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
