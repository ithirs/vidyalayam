'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MONTH_TREND } from '../data';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-3 py-2">
      <p className="text-xs text-slate-500 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-slate-900">{payload[0].value.toFixed(1)}%</p>
    </div>
  );
}

export function AttendanceTrendChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 font-heading">Monthly Attendance Trend</h3>
        <p className="text-xs text-slate-400 mt-0.5">Last 6 months — school-wide average</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={MONTH_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
          <YAxis domain={[85, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="pct"
            stroke="#f97316"
            strokeWidth={2.5}
            dot={{ fill: '#f97316', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#ea580c' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
