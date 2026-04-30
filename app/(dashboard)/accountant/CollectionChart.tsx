'use client';

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { MONTHLY_COLLECTION } from './data';

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-4 py-3 text-sm min-w-[170px]">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-500 text-xs">{p.name}</span>
          </div>
          <span className="font-bold text-slate-900 text-xs tabular-nums">{fmt(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

export function CollectionChart() {
  const totalTarget = MONTHLY_COLLECTION[0].target;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Monthly Fee Collection Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 6 months · Target {fmt(totalTarget)}/month</p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {[
            { label: 'Collected', color: '#22C55E' },
            { label: 'Pending', color: '#F97316' },
            { label: 'Target', color: '#94A3B8', dashed: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              {item.dashed ? (
                <span className="w-5 h-0 border-t-2 border-dashed border-slate-400" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
              )}
              <span className="text-xs text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[240px]">
        <ResponsiveContainer width="100%" height={260}>
          <ComposedChart data={MONTHLY_COLLECTION} margin={{ top: 4, right: 4, left: 4, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
              width={54}
              tickFormatter={fmt}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="collected" name="Collected" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Bar dataKey="pending" name="Pending" fill="#F97316" radius={[4, 4, 0, 0]} maxBarSize={36} />
            <Line
              type="monotone"
              dataKey="target"
              name="Target"
              stroke="#94A3B8"
              strokeWidth={2}
              strokeDasharray="6 3"
              dot={false}
              activeDot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Avg Monthly', value: '₹8.95L', color: 'text-slate-800' },
          { label: 'Best Month', value: 'Jan', color: 'text-green-600' },
          { label: 'Collection Rate', value: '79.5%', color: 'text-orange-500' },
        ].map((item) => (
          <div key={item.label}>
            <p className={`text-base font-bold font-heading tabular-nums ${item.color}`}>{item.value}</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
