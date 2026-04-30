'use client';

import { useState } from 'react';
import { X, IndianRupee, ClipboardList, FileText, CircleAlert as AlertCircle, Bell, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type NotifTab = 'all' | 'fees' | 'attendance' | 'exams' | 'system';

interface Notification {
  id: string;
  type: NotifTab;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
  { id: '1', type: 'fees', title: 'Fee payment received', description: 'Arjun Kumar — ₹12,500 (Term 2)', time: '2 min ago', read: false },
  { id: '2', type: 'attendance', title: 'Low attendance alert', description: 'Class 9-A has 72% attendance today', time: '18 min ago', read: false },
  { id: '3', type: 'exams', title: 'Exam schedule published', description: 'Annual exams for Grades 8–10', time: '1 hr ago', read: false },
  { id: '4', type: 'system', title: 'Backup completed', description: 'Daily database backup successful', time: '3 hrs ago', read: true },
  { id: '5', type: 'fees', title: 'Fee due reminder sent', description: '34 parents notified via WhatsApp', time: '5 hrs ago', read: true },
  { id: '6', type: 'attendance', title: 'Attendance report ready', description: 'Monthly report for March 2026', time: 'Yesterday', read: true },
  { id: '7', type: 'exams', title: 'Marks entry deadline', description: 'Class 10 marks due in 2 days', time: 'Yesterday', read: true },
  { id: '8', type: 'system', title: 'New version available', description: 'Vidyalaya v2.4.1 — bug fixes', time: '2 days ago', read: true },
];

const TAB_CONFIG: { key: NotifTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'fees', label: 'Fees' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'exams', label: 'Exams' },
  { key: 'system', label: 'System' },
];

const typeIcon: Record<NotifTab, typeof Bell> = {
  all: Bell,
  fees: IndianRupee,
  attendance: ClipboardList,
  exams: FileText,
  system: AlertCircle,
};

const typeColor: Record<string, string> = {
  fees: 'bg-green-500/10 text-green-400',
  attendance: 'bg-blue-500/10 text-blue-400',
  exams: 'bg-amber-500/10 text-amber-400',
  system: 'bg-slate-500/10 text-slate-400',
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState<NotifTab>('all');
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-[90] pointer-events-none transition-all duration-300',
        open ? 'pointer-events-auto' : ''
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-modal flex flex-col transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div>
            <h2 className="font-bold text-slate-900 font-heading">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs text-slate-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-3 pb-0 border-b border-slate-100 shrink-0">
          <div className="flex gap-1 overflow-x-auto pb-3">
            {TAB_CONFIG.map((tab) => {
              const count = tab.key === 'all'
                ? notifications.filter((n) => !n.read).length
                : notifications.filter((n) => n.type === tab.key && !n.read).length;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150',
                    activeTab === tab.key
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {tab.label}
                  {count > 0 && (
                    <span className={cn(
                      'text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full',
                      activeTab === tab.key ? 'bg-white/30 text-white' : 'bg-orange-100 text-orange-600'
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-3">
                <Bell className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 text-sm">No notifications here</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map((notif) => {
                const Icon = typeIcon[notif.type] ?? Bell;
                return (
                  <button
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={cn(
                      'w-full flex items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-slate-50',
                      !notif.read ? 'bg-orange-50/40' : ''
                    )}
                  >
                    <div className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0',
                      typeColor[notif.type] ?? 'bg-slate-100 text-slate-500'
                    )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={cn(
                          'text-sm leading-snug',
                          !notif.read ? 'font-semibold text-slate-800' : 'text-slate-700 font-medium'
                        )}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{notif.description}</p>
                      <p className="text-[11px] text-slate-400 mt-1.5">{notif.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 shrink-0">
          <button className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 hover:text-slate-800 transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </div>
  );
}
