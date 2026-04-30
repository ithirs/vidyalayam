'use client';

import { TrendingUp, TrendingDown, IndianRupee, TriangleAlert as AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATS = [
  {
    title: 'Total Collected (This Month)',
    value: '₹8,42,500',
    badge: '+12.4% vs last month',
    badgeColor: 'text-green-600',
    badgeIcon: TrendingUp,
    sub: 'Across 312 transactions',
    subColor: 'text-slate-400',
    icon: IndianRupee,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    valueBorder: 'border-l-green-400',
  },
  {
    title: 'Total Pending Fees',
    value: '₹2,17,800',
    badge: '67 students pending',
    badgeColor: 'text-red-600',
    badgeIcon: TrendingDown,
    sub: 'Requires follow-up',
    subColor: 'text-red-300',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    valueBorder: 'border-l-red-400',
  },
  {
    title: "Today's Collection",
    value: '₹45,200',
    badge: '12 transactions today',
    badgeColor: 'text-blue-600',
    badgeIcon: TrendingUp,
    sub: 'Last: 12:02 PM',
    subColor: 'text-slate-400',
    icon: IndianRupee,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    valueBorder: 'border-l-blue-400',
  },
  {
    title: 'Overdue (>30 days)',
    value: '₹89,000',
    badge: '23 students',
    badgeColor: 'text-red-600',
    badgeIcon: AlertTriangle,
    sub: 'Immediate action needed',
    subColor: 'text-red-400',
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    valueBorder: 'border-l-red-500',
  },
];

export function AccountantStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        const BadgeIcon = stat.badgeIcon;
        return (
          <div
            key={stat.title}
            className={cn(
              'bg-white rounded-2xl border border-slate-200 shadow-card p-5 hover:shadow-card-hover transition-shadow duration-200 border-l-4',
              stat.valueBorder
            )}
          >
            <div className="flex items-start justify-between">
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide leading-tight">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 font-heading mt-1.5 tabular-nums">{stat.value}</p>
              </div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.iconBg)}>
                <Icon className={cn('w-5 h-5', stat.iconColor)} />
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              <p className={cn('text-xs font-semibold flex items-center gap-1', stat.badgeColor)}>
                <BadgeIcon className="w-3 h-3" />
                {stat.badge}
              </p>
              <p className={cn('text-xs', stat.subColor)}>{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
