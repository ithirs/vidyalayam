'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { PLAN_DATA } from './data';

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) {
  if (!active || !payload?.length) return null;
  const total = PLAN_DATA.reduce((s, d) => s + d.value, 0);
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-4 py-3 text-sm">
      <p className="font-semibold text-slate-900">{payload[0].name}</p>
      <p className="text-slate-500 text-xs mt-0.5">
        {payload[0].value} schools ({((payload[0].value / total) * 100).toFixed(1)}%)
      </p>
    </div>
  );
}

export function PlanChart() {
  const total = PLAN_DATA.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col">
      <div className="mb-5">
        <h3 className="font-bold text-slate-900 font-heading">Schools by Plan</h3>
        <p className="text-xs text-slate-500 mt-0.5">{total} total schools</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative flex-shrink-0">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={PLAN_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {PLAN_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="none" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 font-heading">{total}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wide">Schools</div>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {PLAN_DATA.map((plan) => {
            const pct = ((plan.value / total) * 100).toFixed(1);
            return (
              <div key={plan.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: plan.color }}
                    />
                    <span className="text-sm font-medium text-slate-700">{plan.name}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{plan.value}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: plan.color }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{pct}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
