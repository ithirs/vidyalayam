'use client';

import { ArrowRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ASSIGNED_CLASSES, type AssignedClass } from './data';
import { toast } from 'sonner';

const GRADE_COLOR: Record<string, string> = {
  'A+': 'text-green-600',
  'A': 'text-green-600',
  'B+': 'text-blue-600',
  'B': 'text-blue-500',
  'C': 'text-amber-500',
};

function AttendanceRing({ pct }: { pct: number }) {
  const size = 40;
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct / 100);
  const color = pct >= 90 ? '#22C55E' : pct >= 75 ? '#F97316' : '#EF4444';

  return (
    <div className="relative w-10 h-10">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F5F9" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[9px] font-bold text-slate-700">{pct}%</span>
      </div>
    </div>
  );
}

function ClassCard({ cls }: { cls: AssignedClass }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:border-orange-200 transition-all duration-200 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-slate-900 font-heading">{cls.className}</span>
            <span className="text-sm font-bold text-slate-900 font-heading">– {cls.section}</span>
          </div>
          <span className="text-xs text-orange-600 font-medium">{cls.subject}</span>
        </div>
        <AttendanceRing pct={cls.attendancePct} />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Users className="w-3.5 h-3.5" />
          <span>{cls.studentCount} students</span>
        </div>
        <span className="text-slate-200">|</span>
        <div className="text-xs text-slate-500">
          Avg: <span className={cn('font-bold', GRADE_COLOR[cls.avgGrade] ?? 'text-slate-600')}>{cls.avgGrade}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <p className="text-[11px] text-slate-400">Next: {cls.nextClass}</p>
        <button
          onClick={() => toast.info(`${cls.className}-${cls.section} details — coming soon`)}
          className="flex items-center gap-1 text-[11px] font-semibold text-orange-500 hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          View
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function MyClasses() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">My Assigned Classes</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{ASSIGNED_CLASSES.length} classes this term</p>
        </div>
        <button
          onClick={() => toast.info('Full class list — coming soon')}
          className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {ASSIGNED_CLASSES.map((cls) => (
          <ClassCard key={cls.id} cls={cls} />
        ))}
      </div>
    </div>
  );
}
