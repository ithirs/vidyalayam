'use client';

import { Users, CircleCheck as CheckCircle, IndianRupee, CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCard {
  title: string;
  value: string;
  badge?: string;
  badgeColor: string;
  sub: string;
  subColor: string;
  icon: typeof Users;
  iconBg: string;
  iconColor: string;
}

const stats: StatCard[] = [
  {
    title: 'Total Students',
    value: '1,247',
    badge: '+23 this month',
    badgeColor: 'text-green-600',
    sub: 'Across 32 classes',
    subColor: 'text-slate-400',
    icon: Users,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Present Today',
    value: '1,180',
    badge: '94.6% attendance',
    badgeColor: 'text-green-600',
    sub: '67 absent today',
    subColor: 'text-red-400',
    icon: CheckCircle,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
  },
  {
    title: 'Fee Collected',
    value: '₹8,42,000',
    badge: 'This month',
    badgeColor: 'text-blue-600',
    sub: '₹10,20,000 total target',
    subColor: 'text-slate-400',
    icon: IndianRupee,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Fee Pending',
    value: '₹1,23,500',
    badge: '47 students due',
    badgeColor: 'text-red-600',
    sub: '12 overdue >30 days',
    subColor: 'text-red-400',
    icon: AlertCircle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
];

export function AdminStatsCards() {
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
              <div className="min-w-0">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 font-heading mt-1.5 tabular-nums">{stat.value}</p>
              </div>
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', stat.iconBg)}>
                <Icon className={cn('w-5 h-5', stat.iconColor)} />
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              {stat.badge && (
                <p className={cn('text-xs font-semibold', stat.badgeColor)}>↑ {stat.badge}</p>
              )}
              <p className={cn('text-xs', stat.subColor)}>{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
