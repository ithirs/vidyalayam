'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { type Student, FEE_STATUS_CONFIG, STATUS_CONFIG } from './data';

function AttendanceRing({ pct }: { pct: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 85 ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative w-12 h-12 shrink-0">
      <svg width="48" height="48" className="-rotate-90">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#f1f5f9" strokeWidth="4" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700">{pct}%</span>
    </div>
  );
}

interface StudentCardsProps {
  students: Student[];
}

const COLORS = ['bg-blue-400', 'bg-emerald-400', 'bg-orange-400', 'bg-pink-400', 'bg-violet-400', 'bg-cyan-400', 'bg-amber-400', 'bg-rose-400'];

export function StudentCards({ students }: StudentCardsProps) {
  const router = useRouter();

  if (students.length === 0) {
    return <div className="py-20 text-center text-sm text-slate-400">No students match your filters.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {students.map((s) => {
        const initials = s.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
        const avatarColor = COLORS[s.name.charCodeAt(0) % COLORS.length];
        const feeCfg = FEE_STATUS_CONFIG[s.feeStatus];
        const statusCfg = STATUS_CONFIG[s.status];

        return (
          <button key={s.id} onClick={() => router.push(`/admin/students/${s.id}`)}
            className="bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-left overflow-hidden group">
            {/* Top color strip */}
            <div className={cn('h-14 flex items-end justify-between px-4 pb-2', avatarColor)}>
              <div className="w-10 h-10 rounded-xl bg-white/30 flex items-center justify-center text-white text-sm font-bold translate-y-5 shadow-sm border-2 border-white">
                {initials}
              </div>
              <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/20 text-white border border-white/30')}>
                {s.class}-{s.section}
              </span>
            </div>

            <div className="px-4 pb-4 pt-6">
              <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{s.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{s.rollNo}</p>

              <div className="flex items-center justify-between mt-3">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Attendance</p>
                  <AttendanceRing pct={s.attendancePercent} />
                </div>
                <div className="text-right space-y-1">
                  <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border', feeCfg.bg, feeCfg.text, feeCfg.border)}>
                    <span className={cn('w-1 h-1 rounded-full', feeCfg.dot)} />
                    {feeCfg.label}
                  </span>
                  <br />
                  <span className={cn('inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-lg border', statusCfg.bg, statusCfg.text, statusCfg.border)}>
                    <span className={cn('w-1 h-1 rounded-full', statusCfg.dot)} />
                    {statusCfg.label}
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 mt-2.5 truncate" title={s.fatherName}>{s.fatherName}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
