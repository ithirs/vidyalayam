'use client';

import { Users, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  {
    title: 'Total Students',
    value: '1,247',
    sub: 'Across 32 classes',
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    badge: null,
    badgeColor: '',
  },
  {
    title: 'Present Today',
    value: '1,180',
    sub: '94.6% attendance rate',
    icon: CheckCircle,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    badge: '+2.1% vs last week',
    badgeColor: 'text-green-600',
  },
  {
    title: 'Absent Today',
    value: '67',
    sub: '5.4% of students',
    icon: XCircle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    badge: '12 with leave',
    badgeColor: 'text-slate-500',
  },
  {
    title: 'Not Marked Yet',
    value: '3',
    sub: 'Classes pending',
    icon: Clock,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    badge: 'Action needed',
    badgeColor: 'text-amber-600',
  },
];

export function AttendanceStatsCards() {
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
                <p className={cn('text-xs font-semibold', stat.badgeColor)}>{stat.badge}</p>
              )}
              <p className="text-xs text-slate-400">{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
