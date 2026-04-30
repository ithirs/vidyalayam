import { cn } from '@/lib/utils';
import { ATTENDANCE_MONTHS, type Student } from '../../data';

export function AttendanceTab({ student }: { student: Student }) {
  const totalPresent = ATTENDANCE_MONTHS.reduce((s, m) => s + m.present, 0);
  const totalDays = ATTENDANCE_MONTHS.reduce((s, m) => s + m.total, 0);
  const totalAbsent = ATTENDANCE_MONTHS.reduce((s, m) => s + m.absent, 0);
  const overallPct = Math.round((totalPresent / totalDays) * 100);
  const color = overallPct >= 85 ? 'text-green-600' : overallPct >= 75 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="space-y-6">
      {/* Overall stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Overall %', value: `${overallPct}%`, cls: 'bg-blue-50 text-blue-800 border-blue-200' },
          { label: 'Present Days', value: totalPresent, cls: 'bg-green-50 text-green-800 border-green-200' },
          { label: 'Absent Days', value: totalAbsent, cls: 'bg-red-50 text-red-800 border-red-200' },
          { label: 'Working Days', value: totalDays, cls: 'bg-slate-100 text-slate-800 border-slate-200' },
        ].map(({ label, value, cls }) => (
          <div key={label} className={cn('rounded-2xl border p-4 text-center', cls)}>
            <p className="text-2xl font-bold font-heading">{value}</p>
            <p className="text-xs font-semibold mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Monthly breakdown */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Monthly Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ATTENDANCE_MONTHS.map((m) => {
            const pct = Math.round((m.present / m.total) * 100);
            const barColor = pct >= 85 ? 'bg-green-500' : pct >= 75 ? 'bg-orange-400' : 'bg-red-400';
            return (
              <div key={m.month} className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">{m.month}</span>
                  <span className={cn('text-xs font-bold', pct >= 85 ? 'text-green-600' : pct >= 75 ? 'text-orange-600' : 'text-red-600')}>{pct}%</span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className={cn('h-full rounded-full', barColor)} style={{ width: `${pct}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{m.present}P</span>
                  <span>{m.absent}A</span>
                  <span>{m.total}T</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar chart */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Attendance Trend</h3>
        <div className="flex items-end gap-2 h-28">
          {ATTENDANCE_MONTHS.map((m) => {
            const pct = (m.present / m.total) * 100;
            const barColor = pct >= 85 ? 'bg-green-400' : pct >= 75 ? 'bg-orange-400' : 'bg-red-400';
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{Math.round(pct)}%</span>
                <div className="w-full flex items-end" style={{ height: '72px' }}>
                  <div className={cn('w-full rounded-t-lg transition-all', barColor)} style={{ height: `${pct}%` }} />
                </div>
                <span className="text-[11px] font-semibold text-slate-500">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
