'use client';

import { useState, useEffect } from 'react';
import { Calendar, BookOpen, FlaskConical, TreePalm as Palmtree, Users, Megaphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SCHEDULE_EVENTS, type ScheduleEvent } from './data';

const EVENT_STYLE: Record<ScheduleEvent['type'], { icon: typeof Calendar; iconBg: string; iconColor: string; badge: string }> = {
  class: { icon: BookOpen, iconBg: 'bg-blue-50', iconColor: 'text-blue-500', badge: 'bg-blue-50 text-blue-600' },
  exam: { icon: FlaskConical, iconBg: 'bg-red-50', iconColor: 'text-red-500', badge: 'bg-red-50 text-red-600' },
  holiday: { icon: Palmtree, iconBg: 'bg-green-50', iconColor: 'text-green-500', badge: 'bg-green-50 text-green-700' },
  ptm: { icon: Users, iconBg: 'bg-amber-50', iconColor: 'text-amber-500', badge: 'bg-amber-50 text-amber-700' },
  event: { icon: Megaphone, iconBg: 'bg-orange-50', iconColor: 'text-orange-500', badge: 'bg-orange-50 text-orange-600' },
};

const TYPE_LABELS: Record<ScheduleEvent['type'], string> = {
  class: 'Class',
  exam: 'Exam',
  holiday: 'Holiday',
  ptm: 'PTM',
  event: 'Event',
};

export function TodaySchedule() {
  const [today, setToday] = useState('');

  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }));
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Today&apos;s Schedule</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{today}</p>
        </div>
        <button className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors">
          Full Calendar
        </button>
      </div>

      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[360px] pr-0.5">
        {SCHEDULE_EVENTS.map((event) => {
          const style = EVENT_STYLE[event.type];
          const Icon = style.icon;
          const isUpcoming = event.time.includes('Apr') || event.time.includes('May');
          return (
            <div
              key={event.id}
              className={cn(
                'flex items-start gap-3 p-3 rounded-xl border transition-colors hover:bg-slate-50',
                isUpcoming ? 'border-dashed border-slate-200' : 'border-slate-100'
              )}
            >
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center shrink-0', style.iconBg)}>
                <Icon className={cn('w-3.5 h-3.5', style.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1.5">
                  <p className="text-sm font-semibold text-slate-900 leading-snug">{event.title}</p>
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0', style.badge)}>
                    {TYPE_LABELS[event.type]}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{event.subtitle}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">{event.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
