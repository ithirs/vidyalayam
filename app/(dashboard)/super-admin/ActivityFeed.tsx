'use client';

import {
  School,
  IndianRupee,
  PauseCircle,
  TrendingUp,
  Beaker,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { ACTIVITY, type ActivityEvent } from './data';

const EVENT_CONFIG: Record<ActivityEvent['type'], { icon: LucideIcon; iconBg: string; iconColor: string }> = {
  registered: { icon: School, iconBg: 'bg-blue-50', iconColor: 'text-blue-500' },
  payment: { icon: IndianRupee, iconBg: 'bg-green-50', iconColor: 'text-green-500' },
  suspended: { icon: PauseCircle, iconBg: 'bg-red-50', iconColor: 'text-red-500' },
  plan_upgrade: { icon: TrendingUp, iconBg: 'bg-orange-50', iconColor: 'text-orange-500' },
  trial_started: { icon: Beaker, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
  expired: { icon: Clock, iconBg: 'bg-slate-100', iconColor: 'text-slate-400' },
};

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-900 font-heading">Recent Activity</h3>
        <button className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
          View all
        </button>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-0 bottom-0 w-px bg-slate-100" />
        <div className="space-y-5">
          {ACTIVITY.map((event) => {
            const cfg = EVENT_CONFIG[event.type];
            const Icon = cfg.icon;
            return (
              <div key={event.id} className="flex gap-3 relative">
                <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 z-10 border-2 border-white ${cfg.iconBg}`}>
                  <Icon className={`w-3.5 h-3.5 ${cfg.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800 leading-snug">{event.school}</p>
                    <span className="text-[11px] text-slate-400 shrink-0 whitespace-nowrap">{event.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{event.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
