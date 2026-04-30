import { cn } from '@/lib/utils';
import { EXAM_RESULTS, type Student } from '../../data';

const GRADE_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  'A+': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  'A': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  'B+': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-200' },
  'B': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  'C': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  'D': { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
};

export function ExamsTab({ student }: { student: Student }) {
  const totalMarks = EXAM_RESULTS.reduce((s, e) => s + e.marks, 0);
  const totalMax = EXAM_RESULTS.reduce((s, e) => s + e.total, 0);
  const avg = Math.round((totalMarks / totalMax) * 100);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-800 font-heading">{totalMarks}/{totalMax}</p>
          <p className="text-xs font-semibold text-blue-600 mt-1">Total Marks</p>
        </div>
        <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-800 font-heading">{avg}%</p>
          <p className="text-xs font-semibold text-green-600 mt-1">Overall Percentage</p>
        </div>
        <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4 text-center">
          <p className="text-2xl font-bold text-orange-800 font-heading">Rank 3</p>
          <p className="text-xs font-semibold text-orange-600 mt-1">Class Rank</p>
        </div>
      </div>

      {/* Subject-wise results */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Subject-wise Results</h3>
        <div className="space-y-3">
          {EXAM_RESULTS.map((exam) => {
            const pct = Math.round((exam.marks / exam.total) * 100);
            const gradeCfg = GRADE_CONFIG[exam.grade] ?? GRADE_CONFIG['C'];
            const barColor = pct >= 90 ? 'bg-green-500' : pct >= 80 ? 'bg-blue-500' : pct >= 70 ? 'bg-amber-400' : 'bg-red-400';
            return (
              <div key={exam.subject} className="flex items-center gap-4 px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-sm font-semibold text-slate-700 w-36 shrink-0">{exam.subject}</span>
                <div className="flex-1">
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-sm font-bold text-slate-700 tabular-nums w-16 text-right">{exam.marks}/{exam.total}</span>
                  <span className={cn('text-xs font-bold px-2 py-0.5 rounded-lg border w-8 text-center', gradeCfg.bg, gradeCfg.text, gradeCfg.border)}>{exam.grade}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bar chart visual */}
      <div>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">Score Comparison</h3>
        <div className="flex items-end gap-3 h-32">
          {EXAM_RESULTS.map((e) => {
            const pct = (e.marks / e.total) * 100;
            const barColor = pct >= 90 ? 'bg-green-400' : pct >= 80 ? 'bg-blue-400' : 'bg-amber-400';
            return (
              <div key={e.subject} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-500 font-semibold">{e.marks}</span>
                <div className="w-full flex items-end" style={{ height: '80px' }}>
                  <div className={cn('w-full rounded-t-lg', barColor)} style={{ height: `${pct}%` }} />
                </div>
                <span className="text-[10px] font-semibold text-slate-500 text-center leading-tight">{e.subject.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
