'use client';

import { UserX, TrendingDown, BookX, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STUDENT_ACTIVITIES, type StudentActivity } from './data';
import { toast } from 'sonner';

const ACTIVITY_CONFIG = {
  absent: {
    icon: UserX,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    label: 'Absent',
    labelClasses: 'bg-red-50 text-red-700',
  },
  low_performance: {
    icon: TrendingDown,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    label: 'Low Performer',
    labelClasses: 'bg-amber-50 text-amber-700',
  },
  homework_missing: {
    icon: BookX,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    label: 'HW Missing',
    labelClasses: 'bg-orange-50 text-orange-700',
  },
};

function ActivityItem({ activity }: { activity: StudentActivity }) {
  const cfg = ACTIVITY_CONFIG[activity.type];
  const Icon = cfg.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
      onClick={() => toast.info(`${activity.studentName} details — coming soon`)}
    >
      <div className="relative shrink-0">
        <div className={cn('w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center', activity.avatarColor)}>
          {activity.avatarInitials}
        </div>
        <div className={cn('absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center border border-white', cfg.iconBg)}>
          <Icon className={cn('w-2.5 h-2.5', cfg.iconColor)} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <p className="text-sm font-semibold text-slate-800 leading-tight">{activity.studentName}</p>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
        </div>
        <p className="text-[11px] text-slate-400 mt-0.5">{activity.className} · Roll {activity.rollNo}</p>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{activity.detail}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-md', cfg.labelClasses)}>
            {cfg.label}
          </span>
          <span className="text-[10px] text-slate-300">{activity.time}</span>
        </div>
      </div>
    </div>
  );
}

export function StudentActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Student Activity</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Flagged students needing attention</p>
        </div>
        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
          {STUDENT_ACTIVITIES.length} alerts
        </span>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {[
          { type: 'absent', label: 'Absent', count: STUDENT_ACTIVITIES.filter((a) => a.type === 'absent').length },
          { type: 'low_performance', label: 'Performance', count: STUDENT_ACTIVITIES.filter((a) => a.type === 'low_performance').length },
          { type: 'homework_missing', label: 'Homework', count: STUDENT_ACTIVITIES.filter((a) => a.type === 'homework_missing').length },
        ].map(({ type, label, count }) => {
          const cfg = ACTIVITY_CONFIG[type as StudentActivity['type']];
          return (
            <div key={type} className={cn('flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg', cfg.labelClasses)}>
              <span>{label}</span>
              <span className="font-bold">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="space-y-1 flex-1 overflow-y-auto max-h-[380px]">
        {STUDENT_ACTIVITIES.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => toast.info('View all student alerts — coming soon')}
          className="w-full text-center text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          View all student alerts
        </button>
      </div>
    </div>
  );
}
