'use client';

import { LayoutGrid, Users, ClipboardList, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';

const STATS = [
  {
    title: 'My Classes',
    value: '6',
    badge: 'Today: 4 periods',
    badgeColor: 'text-orange-600',
    sub: 'Across 6 sections',
    subColor: 'text-slate-400',
    icon: LayoutGrid,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Students',
    value: '187',
    badge: '172 present today',
    badgeColor: 'text-green-600',
    sub: '15 absent today',
    subColor: 'text-red-400',
    icon: Users,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Homework Pending Review',
    value: '8',
    badge: '3 overdue',
    badgeColor: 'text-red-600',
    sub: 'Across 4 classes',
    subColor: 'text-slate-400',
    icon: ClipboardList,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
  },
  {
    title: 'Marks Entry Due',
    value: '2',
    badge: '1 due tomorrow',
    badgeColor: 'text-red-600',
    sub: 'Unit Test + Half-Yearly',
    subColor: 'text-slate-400',
    icon: PenLine,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
  },
];

export function TeacherStatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {STATS.map((stat) => {
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
              <p className={cn('text-xs font-semibold', stat.badgeColor)}>{stat.badge}</p>
              <p className={cn('text-xs', stat.subColor)}>{stat.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
