'use client';

import { useState } from 'react';
import { Send, MessageCircle, UserRound, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MESSAGES, type Message } from './data';
import { toast } from 'sonner';

export function CommunicationSection() {
  const [messages, setMessages] = useState<Message[]>(MESSAGES);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const newMsg: Message = {
      id: String(Date.now()),
      from: 'parent',
      text,
      time: new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }),
    };
    setMessages((m) => [...m, newMsg]);
    setInput('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      <div className="p-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
            <School className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-sm">Sri Sai High School</h3>
            <p className="text-[10px] text-green-500 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              Online · Class Teacher: Mrs. Priya
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 min-h-[180px] max-h-[240px] overflow-y-auto bg-slate-50/50">
        {messages.map((msg) => {
          const isParent = msg.from === 'parent';
          return (
            <div key={msg.id} className={cn('flex gap-2.5 max-w-[85%]', isParent ? 'ml-auto flex-row-reverse' : '')}>
              <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white', isParent ? 'bg-orange-500' : 'bg-blue-500')}>
                {isParent ? <UserRound className="w-3.5 h-3.5" /> : <School className="w-3.5 h-3.5" />}
              </div>
              <div>
                <div className={cn(
                  'px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed',
                  isParent
                    ? 'bg-orange-500 text-white rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'
                )}>
                  {msg.text}
                </div>
                <p className={cn('text-[10px] text-slate-400 mt-1', isParent ? 'text-right' : '')}>{msg.time}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-100">
        <div className="flex gap-2 mb-2">
          {['Request Leave', 'Contact Teacher'].map((label) => (
            <button
              key={label}
              onClick={() => { setInput(label === 'Request Leave' ? 'I would like to request a leave for Aditya on ' : 'I would like to speak with the class teacher regarding '); }}
              className="flex-1 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message…"
            className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shrink-0 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
