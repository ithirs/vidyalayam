'use client';

import { useState } from 'react';
import { CircleCheck as CheckCircle2, Clock, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { HOMEWORK } from './data';

export function HomeworkSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pending = HOMEWORK.filter((h) => h.status === 'pending').length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Homework</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{pending} pending · {HOMEWORK.length - pending} done</p>
        </div>
        {pending > 0 && (
          <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            {pending} Due
          </span>
        )}
      </div>

      <div className="space-y-2">
        {HOMEWORK.map((hw) => {
          const isOpen = expanded === hw.id;
          return (
            <div
              key={hw.id}
              className={cn(
                'rounded-xl border transition-all duration-150 overflow-hidden',
                hw.status === 'pending' ? 'border-amber-200 bg-amber-50/50' : 'border-slate-100 bg-slate-50/50',
                isOpen && (hw.status === 'pending' ? 'border-amber-300' : 'border-slate-200')
              )}
            >
              <button
                className="w-full flex items-center gap-3 p-3.5 text-left"
                onClick={() => setExpanded(isOpen ? null : hw.id)}
              >
                <span className={cn('text-[11px] font-bold px-2 py-1 rounded-lg shrink-0', hw.subjectColor)}>
                  {hw.subject}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-semibold truncate', hw.status === 'pending' ? 'text-slate-800' : 'text-slate-400 line-through')}>{hw.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-slate-400">{hw.givenBy}</span>
                    <span className="text-slate-200">·</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      <span className="text-[10px] text-slate-400">{hw.dueDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {hw.status === 'done'
                    ? <CheckCircle2 className="w-4 h-4 text-green-500" />
                    : <div className="w-4 h-4 rounded-full border-2 border-amber-400" />
                  }
                  <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-200', isOpen && 'rotate-180')} />
                </div>
              </button>

              {isOpen && (
                <div className="px-3.5 pb-3.5 pt-0">
                  <div className="bg-white rounded-xl p-3 border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed">{hw.description}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
