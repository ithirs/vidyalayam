'use client';

import { cn } from '@/lib/utils';
import { FEE_STRUCTURE } from './data';

function CollectionBar({ pct, color }: { pct: number; color: string }) {
  const barColor =
    color.includes('blue') ? '#3B82F6' :
    color.includes('orange') ? '#F97316' :
    color.includes('teal') ? '#14B8A6' :
    color.includes('green') ? '#22C55E' :
    '#F59E0B';

  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, backgroundColor: barColor }}
      />
    </div>
  );
}

export function FeeStructureOverview() {
  const totalCollected = FEE_STRUCTURE.reduce((s, f) => s + f.collected, 0);
  const totalTarget = FEE_STRUCTURE.reduce((s, f) => s + f.total, 0);
  const overallPct = Math.round((totalCollected / totalTarget) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 font-heading text-sm">Fee Structure Overview</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Term-wise collection rates</p>
      </div>

      <div className="mb-4 p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-slate-600">Overall Collection</p>
          <span className="text-sm font-bold text-orange-600 tabular-nums">{overallPct}%</span>
        </div>
        <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-slate-400">₹{(totalCollected / 100000).toFixed(2)}L collected</span>
          <span className="text-[10px] text-slate-400">of ₹{(totalTarget / 100000).toFixed(2)}L target</span>
        </div>
      </div>

      <div className="space-y-3.5 flex-1">
        {FEE_STRUCTURE.map((item) => {
          const pct = Math.round((item.collected / item.total) * 100);
          return (
            <div key={item.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 border', item.color)}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.category}</p>
                    <p className="text-[10px] text-slate-400">₹{item.amountPerTerm.toLocaleString('en-IN')}/term</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className="text-xs font-bold text-slate-800 tabular-nums">{pct}%</p>
                  <p className="text-[10px] text-slate-400 tabular-nums">
                    ₹{(item.collected / 1000).toFixed(0)}K / ₹{(item.total / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>
              <CollectionBar pct={pct} color={item.color} />
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-base font-bold text-slate-900 font-heading">₹8.51L</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Collected</p>
          </div>
          <div className="bg-red-50 rounded-xl p-3 text-center">
            <p className="text-base font-bold text-red-600 font-heading">₹2.18L</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
