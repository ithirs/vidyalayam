'use client';

import { useState } from 'react';
import { X, Send, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REMINDER_TEMPLATES, type DueRecord } from './data';

type Lang = 'en' | 'hi' | 'te';
type Channel = 'whatsapp' | 'sms' | 'both';

interface Props {
  selected: DueRecord[];
  onClose: () => void;
  onSent: () => void;
}

export function ReminderModal({ selected, onClose, onSent }: Props) {
  const [lang, setLang] = useState<Lang>('en');
  const [channel, setChannel] = useState<Channel>('whatsapp');
  const [schedule, setSchedule] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('');

  const template = REMINDER_TEMPLATES[lang];

  const preview = selected.length > 0
    ? template
        .replace('{parent_name}', selected[0].parentName)
        .replace('{student_name}', selected[0].studentName)
        .replace('{class}', `${selected[0].className}-${selected[0].section}`)
        .replace('{amount}', selected[0].amount.toLocaleString('en-IN'))
        .replace('{due_date}', new Date(selected[0].dueDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }))
    : template;

  const CHANNELS: { key: Channel; label: string; icon: string }[] = [
    { key: 'whatsapp', label: 'WhatsApp', icon: '💬' },
    { key: 'sms', label: 'SMS', icon: '📨' },
    { key: 'both', label: 'Both', icon: '📲' },
  ];

  const LANGS: { key: Lang; label: string }[] = [
    { key: 'en', label: 'English' },
    { key: 'hi', label: 'Hindi' },
    { key: 'te', label: 'Telugu' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg max-h-[90vh] flex flex-col animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="font-bold text-slate-900 font-heading">Send Reminder</h2>
            <p className="text-xs text-slate-500 mt-0.5">{selected.length} student{selected.length !== 1 ? 's' : ''} selected</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Selected Students</label>
            <div className="space-y-1.5 max-h-28 overflow-y-auto">
              {selected.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl text-sm">
                  <div>
                    <span className="font-medium text-slate-800">{s.studentName}</span>
                    <span className="text-slate-400 ml-2 text-xs">{s.className}-{s.section}</span>
                  </div>
                  <span className="text-red-500 font-semibold text-xs">₹{s.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Language</label>
            <div className="flex gap-2">
              {LANGS.map((l) => (
                <button
                  key={l.key}
                  onClick={() => setLang(l.key)}
                  className={cn(
                    'flex-1 py-2 rounded-xl border text-sm font-medium transition-all',
                    lang === l.key ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Message Preview</label>
            <div className="bg-slate-50 rounded-xl p-3.5 text-sm text-slate-700 whitespace-pre-wrap border border-slate-200 leading-relaxed font-mono text-xs">
              {preview}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Variables auto-filled per student when sending</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Send via</label>
            <div className="flex gap-2">
              {CHANNELS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setChannel(c.key)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-sm font-medium transition-all',
                    channel === c.key ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <span>{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSchedule((o) => !o)}
              className={cn(
                'w-9 h-5 rounded-full transition-colors relative shrink-0',
                schedule ? 'bg-orange-500' : 'bg-slate-200'
              )}
            >
              <div className={cn('w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform shadow-sm', schedule ? 'translate-x-4' : 'translate-x-0.5')} />
            </button>
            <span className="text-sm text-slate-700">Schedule for later</span>
            {schedule && (
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="ml-auto px-3 py-1.5 rounded-xl border border-slate-200 text-sm focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none"
              />
            )}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-3 shrink-0">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button
            onClick={onSent}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            {schedule ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            {schedule ? 'Schedule' : 'Send Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
