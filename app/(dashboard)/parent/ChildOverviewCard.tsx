'use client';

import { CircleCheck as CheckCircle2, Circle as XCircle, Award, IndianRupee, CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Child } from './data';

interface ChildOverviewCardProps {
  child: Child;
  todayPresent: boolean;
}

export function ChildOverviewCard({ child, todayPresent }: ChildOverviewCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 shadow-xl">
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #f97316 0%, transparent 60%)' }} />

      <div className="relative flex items-center gap-4">
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-lg">
            <img
              src={child.avatarUrl}
              alt={child.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className={cn('w-full h-full flex items-center justify-center text-xl font-bold absolute inset-0', child.avatarBg)}>
              {child.avatarInitials}
            </div>
          </div>
          <div className={cn(
            'absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center',
            todayPresent ? 'bg-green-400' : 'bg-red-400'
          )}>
            {todayPresent
              ? <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              : <XCircle className="w-3.5 h-3.5 text-white" />
            }
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h2 className="text-xl font-bold font-heading leading-tight">{child.name}</h2>
              <p className="text-sm text-white/60 mt-0.5">{child.className}-{child.section} · Roll No. {child.rollNo}</p>
            </div>
            <span className={cn(
              'flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full shrink-0',
              todayPresent ? 'bg-green-400/20 text-green-300 border border-green-400/30' : 'bg-red-400/20 text-red-300 border border-red-400/30'
            )}>
              {todayPresent ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {todayPresent ? 'Present Today' : 'Absent Today'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4">
            {[
              { icon: CalendarDays, label: 'Attendance', value: '94%', color: 'text-orange-400' },
              { icon: Award, label: 'Class Rank', value: '#3', color: 'text-amber-400' },
              { icon: IndianRupee, label: 'Fee Status', value: '₹5K Due', color: 'text-red-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="bg-white/10 rounded-xl p-2.5 text-center border border-white/10">
                <Icon className={cn('w-4 h-4 mx-auto mb-1', color)} />
                <p className="text-sm font-bold tabular-nums">{value}</p>
                <p className="text-[10px] text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex items-center gap-3 mt-4 pt-4 border-t border-white/10 text-xs text-white/50">
        <span>{child.admissionNo}</span>
        <span>·</span>
        <span>DOB: {child.dob}</span>
        <span>·</span>
        <span className="text-white/70 font-medium">Sri Sai High School</span>
      </div>
    </div>
  );
}
