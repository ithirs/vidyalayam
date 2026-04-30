'use client';

import { School, Users, TrendingUp, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  sub?: string;
  icon: typeof School;
  iconBg: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Schools',
    value: '487',
    change: '+12 this month',
    changePositive: true,
    icon: School,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Total Students',
    value: '1,24,350',
    change: '+2,340 this month',
    changePositive: true,
    icon: Users,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    title: 'Monthly Revenue',
    value: '₹4,87,000',
    change: '+18% vs last month',
    changePositive: true,
    icon: TrendingUp,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Active Subscriptions',
    value: '412',
    change: '',
    changePositive: true,
    sub: '23 expiring soon',
    icon: Crown,
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-500',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 hover:shadow-card-hover transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 font-heading mt-1.5">{stat.value}</p>
              </div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.iconBg)}>
                <Icon className={cn('w-5 h-5', stat.iconColor)} />
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              {stat.change && (
                <span className={cn(
                  'text-xs font-medium',
                  stat.changePositive ? 'text-green-600' : 'text-red-500'
                )}>
                  {stat.changePositive ? '↑' : '↓'} {stat.change}
                </span>
              )}
              {stat.sub && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                  ⚠ {stat.sub}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
