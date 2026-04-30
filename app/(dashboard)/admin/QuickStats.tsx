'use client';

import { UserCheck, LayoutGrid, ClipboardList, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStat {
  label: string;
  value: number;
  total?: number;
  icon: typeof UserCheck;
  iconBg: string;
  iconColor: string;
  progressColor: string;
  unit?: string;
}

const QUICK_STATS: QuickStat[] = [
  {
    label: 'Staff Present Today',
    value: 45,
    total: 52,
    icon: UserCheck,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    progressColor: 'bg-green-500',
  },
  {
    label: 'Total Classes',
    value: 32,
    icon: LayoutGrid,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    progressColor: 'bg-blue-500',
    unit: 'active',
  },
  {
    label: 'Homework Pending',
    value: 12,
    icon: ClipboardList,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    progressColor: 'bg-amber-400',
    unit: 'assignments',
  },
  {
    label: 'Library Books Issued',
    value: 67,
    total: 200,
    icon: BookMarked,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    progressColor: 'bg-orange-500',
  },
];

interface CircleProgressProps {
  value: number;
  total: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}

function CircleProgress({ value, total, color, size = 44, strokeWidth = 4 }: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / total, 1);
  const offset = circumference * (1 - pct);

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#F1F5F9"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

const COLOR_MAP: Record<string, string> = {
  'bg-green-500': '#22C55E',
  'bg-blue-500': '#3B82F6',
  'bg-amber-400': '#FBBF24',
  'bg-orange-500': '#F97316',
};

export function QuickStats() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="font-bold text-slate-900 font-heading text-sm">Quick Stats</h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Today&apos;s overview</p>
      </div>

      <div className="space-y-4 flex-1">
        {QUICK_STATS.map((stat) => {
          const Icon = stat.icon;
          const hasTotal = stat.total !== undefined;
          const pct = hasTotal ? Math.round((stat.value / stat.total!) * 100) : null;
          const hexColor = COLOR_MAP[stat.progressColor] ?? '#F97316';

          return (
            <div key={stat.label} className="flex items-center gap-3.5">
              <div className="relative flex-shrink-0">
                {hasTotal ? (
                  <>
                    <CircleProgress
                      value={stat.value}
                      total={stat.total!}
                      color={hexColor}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-700">{pct}%</span>
                    </div>
                  </>
                ) : (
                  <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', stat.iconBg)}>
                    <Icon className={cn('w-5 h-5', stat.iconColor)} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-slate-600 truncate">{stat.label}</p>
                  <span className="text-sm font-bold text-slate-900 tabular-nums shrink-0 ml-2">
                    {stat.value}{hasTotal ? `/${stat.total}` : ''}
                    {stat.unit && <span className="text-[10px] text-slate-400 font-normal ml-0.5">{stat.unit}</span>}
                  </span>
                </div>
                {hasTotal && (
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-700', stat.progressColor)}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-slate-900 font-heading tabular-nums">86.5%</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Monthly Attend.</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-orange-600 font-heading tabular-nums">A+</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wide mt-0.5">Avg Grade</p>
        </div>
      </div>
    </div>
  );
}
