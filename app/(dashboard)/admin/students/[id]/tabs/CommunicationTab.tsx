'use client';

import { useState } from 'react';
import { Send, Phone, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Student } from '../../data';
import { toast } from 'sonner';

const MESSAGES = [
  { id: 'm1', sender: 'Teacher', text: 'Arjun has been doing well in class lately. Keep up the good work!', date: '10 Jan 2025', time: '10:30 AM', type: 'incoming' },
  { id: 'm2', sender: 'Parent', text: 'Thank you! We have been helping him with revision at home.', date: '10 Jan 2025', time: '11:05 AM', type: 'outgoing' },
  { id: 'm3', sender: 'Admin', text: 'Reminder: Fee payment due on 15th January. Please clear dues.', date: '8 Jan 2025', time: '9:00 AM', type: 'incoming' },
  { id: 'm4', sender: 'Parent', text: 'Will process the payment by end of this week.', date: '8 Jan 2025', time: '9:45 AM', type: 'outgoing' },
  { id: 'm5', sender: 'Teacher', text: 'Please note that your ward was absent on 5th and 6th January. Kindly provide a leave application.', date: '7 Jan 2025', time: '2:15 PM', type: 'incoming' },
];

export function CommunicationTab({ student }: { student: Student }) {
  const [msg, setMsg] = useState('');

  return (
    <div className="space-y-5">
      {/* Contact info */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => toast.info(`Calling ${student.fatherPhone}…`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm font-semibold hover:bg-green-100 transition-colors">
          <Phone className="w-4 h-4" />
          Call Father — {student.fatherPhone}
        </button>
        <button onClick={() => toast.info(`Opening WhatsApp for ${student.fatherPhone}…`)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-semibold hover:bg-emerald-100 transition-colors">
          <MessageSquare className="w-4 h-4" />
          WhatsApp
        </button>
      </div>

      {/* Message thread */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Message History</h3>
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {MESSAGES.map((m) => (
            <div key={m.id} className={cn('flex', m.type === 'outgoing' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[75%] rounded-2xl px-4 py-3',
                m.type === 'outgoing' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-slate-100 text-slate-800 rounded-bl-sm')}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-[10px] font-bold', m.type === 'outgoing' ? 'text-blue-200' : 'text-slate-500')}>{m.sender}</span>
                  <span className={cn('text-[10px]', m.type === 'outgoing' ? 'text-blue-300' : 'text-slate-400')}>{m.time}</span>
                </div>
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className={cn('text-[10px] mt-1', m.type === 'outgoing' ? 'text-blue-300 text-right' : 'text-slate-400')}>{m.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compose */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
        <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3}
          placeholder="Type a message to the parent…"
          className="w-full px-4 py-3 text-sm bg-transparent focus:outline-none text-slate-700 resize-none" />
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-200 bg-white">
          <span className="text-xs text-slate-400">{msg.length}/500</span>
          <button onClick={() => { toast.success('Message sent to parent'); setMsg(''); }}
            disabled={!msg.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed active:scale-95">
            <Send className="w-3.5 h-3.5" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
