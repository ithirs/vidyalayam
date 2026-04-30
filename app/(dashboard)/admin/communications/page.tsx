'use client';

import { useState } from 'react';
import { Send, History, LayoutList, CalendarDays, MessageSquare, Smartphone, Zap } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { ComposeMessage } from './ComposeMessage';
import { MessageHistory } from './MessageHistory';
import { NoticeBoard } from './NoticeBoard';
import { EventsTab } from './EventsTab';

type TabId = 'compose' | 'history' | 'notices' | 'events';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const TABS: Tab[] = [
  { id: 'compose', label: 'Compose & Send', icon: Send        },
  { id: 'history', label: 'Message History', icon: History    },
  { id: 'notices', label: 'Notice Board',    icon: LayoutList },
  { id: 'events',  label: 'Events',          icon: CalendarDays },
];

const STATS = [
  { label: 'SMS Balance',      value: '450',   sub: 'messages remaining', icon: Smartphone,   color: 'text-blue-600 bg-blue-50 border-blue-100'     },
  { label: 'Sent This Month',  value: '2,180', sub: 'to parents & staff', icon: Send,         color: 'text-green-600 bg-green-50 border-green-100'   },
  { label: 'WhatsApp',         value: 'Live',  sub: 'connected & active', icon: MessageSquare,color: 'text-teal-600 bg-teal-50 border-teal-100'      },
  { label: 'Delivery Rate',    value: '98.7%', sub: 'last 30 days',       icon: Zap,          color: 'text-orange-600 bg-orange-50 border-orange-100'},
];

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('compose');
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="pb-8">
        <div className="mb-5">
          <h1 className="text-2xl font-black text-slate-900 font-heading">Communications</h1>
          <p className="text-sm text-slate-500 mt-0.5">Send messages, manage notices, and track school events</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className={cn('rounded-2xl border p-4 flex items-center gap-3', s.color)}>
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', s.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-black font-heading leading-tight">{s.value}</div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-2xl p-1.5 mb-5 shadow-card overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-1 justify-center',
                  isActive ? 'bg-orange-500 text-white shadow-brand-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                )}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.badge && (
                  <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full', isActive ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600')}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'compose'  && <ComposeMessage />}
        {activeTab === 'history'  && <MessageHistory />}
        {activeTab === 'notices'  && <NoticeBoard />}
        {activeTab === 'events'   && <EventsTab />}
      </div>
    </>
  );
}
