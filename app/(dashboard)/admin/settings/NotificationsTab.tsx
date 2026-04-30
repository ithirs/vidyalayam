'use client';

import { useState } from 'react';
import { MessageSquare, Bell, CircleCheck as CheckCircle, IndianRupee, Megaphone, Zap, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface NotifSetting {
  id: string;
  icon: React.ElementType;
  label: string;
  desc: string;
  enabled: boolean;
  hasDays?: boolean;
  days?: number;
}

export function NotificationsTab() {
  const [settings, setSettings] = useState<NotifSetting[]>([
    { id: 'att_sms',  icon: MessageSquare, label: 'Attendance SMS to Parents',   desc: 'Send SMS when student is marked absent',          enabled: true  },
    { id: 'fee_due',  icon: IndianRupee,  label: 'Fee Due Reminder',             desc: 'Remind parents before fee due date',              enabled: true,  hasDays: true, days: 3 },
    { id: 'exam_res', icon: CheckCircle,  label: 'Exam Result Notification',     desc: 'Notify parents when results are published',       enabled: true  },
    { id: 'fee_rec',  icon: IndianRupee,  label: 'Fee Receipt Confirmation',     desc: 'Send receipt confirmation after payment',         enabled: true  },
    { id: 'announce', icon: Megaphone,    label: 'Announcement Notifications',   desc: 'Send push/SMS for school announcements',          enabled: false },
  ]);
  const [smsBalance] = useState(450);
  const [whatsappConnected] = useState(false);

  const toggle = (id: string) => setSettings((prev) => prev.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));
  const setDays = (id: string, days: number) => setSettings((prev) => prev.map((s) => s.id === id ? { ...s, days } : s));

  const handleSave = () => toast.success('Notification settings saved');

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={cn('rounded-2xl border-2 p-4 flex items-center gap-4', smsBalance < 100 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50')}>
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', smsBalance < 100 ? 'bg-red-100' : 'bg-green-100')}>
            <MessageSquare className={cn('w-5 h-5', smsBalance < 100 ? 'text-red-600' : 'text-green-600')} />
          </div>
          <div className="flex-1 min-w-0">
            <div className={cn('text-2xl font-black font-heading', smsBalance < 100 ? 'text-red-700' : 'text-green-700')}>{smsBalance}</div>
            <div className="text-xs text-slate-500 font-medium">SMS Balance Remaining</div>
          </div>
          <button className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-xl border border-orange-200 hover:bg-orange-50 transition-colors shrink-0">
            Recharge
          </button>
        </div>

        <div className={cn('rounded-2xl border-2 p-4 flex items-center gap-4', whatsappConnected ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50')}>
          <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', whatsappConnected ? 'bg-green-100' : 'bg-slate-100')}>
            {whatsappConnected ? <Wifi className="w-5 h-5 text-green-600" /> : <WifiOff className="w-5 h-5 text-slate-400" />}
          </div>
          <div className="flex-1">
            <div className={cn('text-sm font-bold', whatsappConnected ? 'text-green-700' : 'text-slate-600')}>
              WhatsApp {whatsappConnected ? 'Connected' : 'Not Connected'}
            </div>
            <div className="text-xs text-slate-400">Business API Integration</div>
          </div>
          <button className="text-xs font-bold text-orange-600 hover:text-orange-700 px-3 py-1.5 rounded-xl border border-orange-200 hover:bg-orange-50 transition-colors shrink-0">
            {whatsappConnected ? 'Manage' : 'Connect'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 font-heading text-sm">Notification Channels</h3>
          <p className="text-xs text-slate-400 mt-0.5">Configure which notifications are sent and when</p>
        </div>
        <div className="divide-y divide-slate-50">
          {settings.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.id} className={cn('px-5 py-4 flex items-center gap-4 transition-colors', s.enabled ? 'bg-white' : 'bg-slate-50/50')}>
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', s.enabled ? 'bg-orange-100' : 'bg-slate-100')}>
                  <Icon className={cn('w-4 h-4', s.enabled ? 'text-orange-500' : 'text-slate-400')} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn('text-sm font-semibold', s.enabled ? 'text-slate-900' : 'text-slate-500')}>{s.label}</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{s.desc}</div>
                  {s.hasDays && s.enabled && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-slate-500">Send reminder</span>
                      <input
                        type="number"
                        value={s.days}
                        min={1}
                        max={30}
                        onChange={(e) => setDays(s.id, Number(e.target.value))}
                        className="w-14 px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 text-center outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-100"
                      />
                      <span className="text-xs text-slate-500">days before due date</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggle(s.id)}
                  className={cn(
                    'relative inline-flex h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none shrink-0',
                    s.enabled ? 'bg-orange-500' : 'bg-slate-200'
                  )}
                >
                  <span className={cn(
                    'inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5',
                    s.enabled ? 'translate-x-5.5' : 'translate-x-0.5'
                  )} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
          Save Notification Settings
        </button>
      </div>
    </div>
  );
}
