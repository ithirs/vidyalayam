'use client';

import { ArrowRight, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RECENT_ADMISSIONS } from './data';

export function RecentAdmissions() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center">
            <UserPlus className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-sm">New Students</h3>
            <p className="text-[11px] text-slate-400">This month</p>
          </div>
        </div>
        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">23 new</span>
      </div>

      <div className="space-y-3 flex-1">
        {RECENT_ADMISSIONS.map((student) => {
          const [y, m, d] = student.date.split('-').map(Number);
          const admDate = new Date(y, m - 1, d).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
          });
          return (
            <div
              key={student.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className={cn('w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold', student.avatarColor)}>
                {student.avatarInitials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">{student.name}</p>
                <p className="text-xs text-slate-400">
                  {student.className} – Sec {student.section}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[11px] text-slate-400">{admDate}</p>
                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-orange-400 transition-colors ml-auto mt-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      <button className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
        View All Students
      </button>
    </div>
  );
}
