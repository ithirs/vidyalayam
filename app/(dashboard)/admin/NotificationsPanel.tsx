'use client';

import { useState } from 'react';
import { Megaphone, TriangleAlert as AlertTriangle, Info, CircleCheck as CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { NOTIFICATIONS, type NotificationItem } from './data';

type TabKey = 'fees' | 'attendance' | 'events';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'fees', label: 'Fees' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'events', label: 'Events' },
];

const SEVERITY_CONFIG: Record<NotificationItem['severity'], { icon: typeof AlertTriangle; iconColor: string; bg: string; border: string }> = {
  high: { icon: AlertTriangle, iconColor: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
  medium: { icon: Info, iconColor: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' },
  low: { icon: CheckCircle2, iconColor: 'text-green-500', bg: 'bg-green-50', border: 'border-green-100' },
};

export function NotificationsPanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('fees');

  const items = NOTIFICATIONS.filter((n) => n.category === activeTab);
  const counts = {
    fees: NOTIFICATIONS.filter((n) => n.category === 'fees').length,
    attendance: NOTIFICATIONS.filter((n) => n.category === 'attendance').length,
    events: NOTIFICATIONS.filter((n) => n.category === 'events').length,
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 font-heading">Notifications &amp; Alerts</h3>
        <button
          onClick={() => toast.success('Announcement sent to all parents')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors shadow-sm"
        >
          <Megaphone className="w-3 h-3" />
          Announce
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150',
              activeTab === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {tab.label}
            <span className={cn(
              'w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center',
              activeTab === tab.key ? 'bg-orange-500 text-white' : 'bg-slate-300 text-slate-600'
            )}>
              {counts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[280px]">
        {items.map((item) => {
          const cfg = SEVERITY_CONFIG[item.severity];
          const Icon = cfg.icon;
          return (
            <div
              key={item.id}
              className={cn('flex items-start gap-3 p-3.5 rounded-xl border', cfg.bg, cfg.border)}
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className={cn('w-4 h-4', cfg.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 leading-snug">{item.message}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
        View All Notifications
      </button>
    </div>
  );
}
