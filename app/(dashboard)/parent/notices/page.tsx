'use client';

import Link from 'next/link';
import { ChevronRight, Bell, Calendar, Megaphone, Info } from 'lucide-react';

const NOTICES = [
  { id: 1, type: 'event', title: 'Annual Day Celebrations', date: '20 Apr 2026', desc: 'Annual Day will be held on 20th April at 5 PM in the school auditorium. Parents are invited.', urgent: false },
  { id: 2, type: 'notice', title: 'Fee Due Reminder', date: '10 Apr 2026', desc: 'April month fee is due by 15th April 2026. Late payment will incur a fine of ₹50 per day.', urgent: true },
  { id: 3, type: 'event', title: 'PTM – Parent Teacher Meeting', date: '17 Apr 2026', desc: 'PTM scheduled for all classes. Please attend between 9 AM to 12 PM.', urgent: false },
  { id: 4, type: 'info', title: 'Holiday Notice – Ram Navami', date: '06 Apr 2026', desc: 'School will be closed on 6th April 2026 on account of Ram Navami.', urgent: false },
  { id: 5, type: 'notice', title: 'Uniform Compliance Notice', date: '03 Apr 2026', desc: 'All students must wear proper school uniform. Sports shoes are mandatory on PT days.', urgent: false },
];

const typeConfig = {
  event: { icon: Calendar, color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-500', badge: 'bg-blue-100 text-blue-700' },
  notice: { icon: Megaphone, color: 'bg-amber-50 border-amber-200', iconColor: 'text-amber-500', badge: 'bg-amber-100 text-amber-700' },
  info: { icon: Info, color: 'bg-slate-50 border-slate-200', iconColor: 'text-slate-500', badge: 'bg-slate-100 text-slate-600' },
};

export default function ParentNoticesPage() {
  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Notices</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
          <Bell className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Notices & Events</h1>
          <p className="text-sm text-slate-500 mt-0.5">{NOTICES.length} announcements</p>
        </div>
      </div>

      <div className="space-y-3">
        {NOTICES.map(n => {
          const cfg = typeConfig[n.type as keyof typeof typeConfig];
          const Icon = cfg.icon;
          return (
            <div key={n.id} className={`bg-white rounded-2xl border shadow-sm p-4 hover:shadow-md transition-shadow ${n.urgent ? 'border-red-200' : 'border-slate-200'}`}>
              {n.urgent && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-400 rounded-t-2xl" />}
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.color}`}>
                  <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-slate-800 text-sm">{n.title}</p>
                    {n.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700">Urgent</span>}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{n.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{n.date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
