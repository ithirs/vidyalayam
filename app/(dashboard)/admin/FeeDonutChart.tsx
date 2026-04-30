'use client';

import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { FEE_DATA } from './data';

const MONTHS = ['April 2026', 'March 2026', 'February 2026', 'January 2026'];

function fmt(v: number) {
  if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(0)}K`;
  return `₹${v}`;
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-3 py-2.5 text-sm">
      <p className="font-semibold text-slate-900">{payload[0].name}</p>
      <p className="text-slate-500 text-xs mt-0.5">
        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(payload[0].value)}
      </p>
    </div>
  );
}

export function FeeDonutChart() {
  const [selectedMonth, setSelectedMonth] = useState(MONTHS[0]);
  const [dropOpen, setDropOpen] = useState(false);

  const total = FEE_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Fee Collection Status</h3>
          <p className="text-xs text-slate-500 mt-0.5">Current academic year</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            {selectedMonth}
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          {dropOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-44 z-50 py-1">
              {MONTHS.map((m) => (
                <button
                  key={m}
                  onClick={() => { setSelectedMonth(m); setDropOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors ${
                    selectedMonth === m ? 'bg-orange-50 text-orange-600 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
                data={FEE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {FEE_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-base font-bold text-slate-900 font-heading leading-tight">{fmt(total)}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">Total</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {FEE_DATA.map((item) => {
            const pct = ((item.value / total) * 100).toFixed(1);
            return (
              <div key={item.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-medium text-slate-700">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 tabular-nums">{fmt(item.value)}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{pct}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
