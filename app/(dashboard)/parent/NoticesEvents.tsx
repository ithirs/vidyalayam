'use client';

import { CalendarDays, Bell, BookOpen, Umbrella, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NOTICES, type Notice } from './data';
import { toast } from 'sonner';

const TYPE_CONFIG: Record<Notice['type'], { icon: typeof Bell; bg: string; iconColor: string; label: string }> = {
  event: { icon: PartyPopper, bg: 'bg-orange-50 border-orange-100', iconColor: 'text-orange-500', label: 'Event' },
  circular: { icon: Bell, bg: 'bg-blue-50 border-blue-100', iconColor: 'text-blue-500', label: 'Circular' },
  holiday: { icon: Umbrella, bg: 'bg-green-50 border-green-100', iconColor: 'text-green-500', label: 'Holiday' },
  exam: { icon: BookOpen, bg: 'bg-red-50 border-red-100', iconColor: 'text-red-500', label: 'Exam' },
};

export function NoticesEvents() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Notices & Events</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{NOTICES.length} announcements</p>
        </div>
        <Bell className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-3">
        {NOTICES.map((notice) => {
          const cfg = TYPE_CONFIG[notice.type];
          const Icon = cfg.icon;
          return (
            <div key={notice.id} className={cn('rounded-2xl border p-4', cfg.bg)}>
              <div className="flex items-start gap-3">
                <div className={cn('w-8 h-8 rounded-xl bg-white/80 flex items-center justify-center shrink-0 shadow-sm')}>
                  <Icon className={cn('w-4 h-4', cfg.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-900">{notice.title}</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 shrink-0">
                      <CalendarDays className="w-3 h-3" />
                      {notice.date}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notice.body}</p>
                  {notice.rsvp && (
                    <button
                      onClick={() => toast.success(`RSVP confirmed for "${notice.title}"`)}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white/80 border border-current text-orange-600 hover:bg-orange-50 transition-colors active:scale-95"
                    >
                      RSVP Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
