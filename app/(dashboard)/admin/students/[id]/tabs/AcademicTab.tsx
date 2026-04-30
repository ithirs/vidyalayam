import { BookOpen, GraduationCap, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Student } from '../../data';

function StatCard({ icon: Icon, label, value, sub, color }: { icon: typeof BookOpen; label: string; value: string; sub?: string; color: string }) {
  return (
    <div className={cn('rounded-2xl border p-4', color)}>
      <Icon className="w-5 h-5 mb-2 opacity-70" />
      <p className="text-2xl font-bold font-heading">{value}</p>
      <p className="text-sm font-semibold mt-0.5">{label}</p>
      {sub && <p className="text-xs mt-0.5 opacity-70">{sub}</p>}
    </div>
  );
}

export function AcademicTab({ student }: { student: Student }) {
  const pct = student.attendancePercent;
  const color = pct >= 85 ? '#22c55e' : pct >= 75 ? '#f59e0b' : '#ef4444';
  const circ = 2 * Math.PI * 36;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={BookOpen} label="Current Class" value={`${student.class}-${student.section}`} sub="2024-25" color="bg-blue-50 text-blue-800 border-blue-200" />
        <StatCard icon={GraduationCap} label="Board" value={student.board} sub="Curriculum" color="bg-slate-100 text-slate-800 border-slate-200" />
        <StatCard icon={Building} label="Admission No" value={student.admissionNo} sub={`Since ${student.admissionDate}`} color="bg-orange-50 text-orange-800 border-orange-200" />
        <div className="rounded-2xl border border-green-200 bg-green-50 text-green-800 p-4 flex flex-col items-center justify-center">
          <svg width="80" height="80" className="-rotate-90 mb-1">
            <circle cx="40" cy="40" r="36" fill="none" stroke="#dcfce7" strokeWidth="7" />
            <circle cx="40" cy="40" r="36" fill="none" stroke={color} strokeWidth="7"
              strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
          </svg>
          <div className="-mt-6 text-center">
            <p className="text-xl font-bold font-heading">{pct}%</p>
            <p className="text-xs font-semibold">Attendance</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">Academic History</h3>
        <div className="space-y-2">
          {[
            { year: '2024-25', class: student.class, section: student.section, result: 'In Progress', promoted: false },
            { year: '2023-24', class: `Class ${parseInt(student.class.split(' ')[1] ?? '6') - 1}`, section: 'A', result: 'Promoted', promoted: true },
            { year: '2022-23', class: `Class ${parseInt(student.class.split(' ')[1] ?? '6') - 2}`, section: 'B', result: 'Promoted', promoted: true },
          ].map((h) => (
            <div key={h.year} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-700 font-mono">{h.year}</span>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-lg font-bold">{h.class}-{h.section}</span>
              </div>
              <span className={cn('text-xs font-bold px-2.5 py-1 rounded-xl border',
                h.promoted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200')}>
                {h.result}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 pb-2 border-b border-slate-100">Previous School</h3>
        <p className="text-sm font-semibold text-slate-700">{student.previousSchool}</p>
      </div>
    </div>
  );
}
