'use client';

import { Download, Trophy, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { EXAM_CLASS_RESULTS, SUBJECT_PERFORMANCE, TOP_PERFORMERS, EXAM_COMPARISON, EXAMS } from './data';

const chartTooltipStyle = { borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 };

const EXAM_COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa'];

export function ExamReportsTab() {
  const dl = (label: string) => toast.success(`${label} download started`);

  const overallPassRate = Math.round(
    EXAM_CLASS_RESULTS.flatMap(c => c.exams).reduce((s,e) => s + e.passRate, 0) / (EXAM_CLASS_RESULTS.length * EXAMS.length)
  );
  const overallAvg = Math.round(
    EXAM_CLASS_RESULTS.flatMap(c => c.exams).reduce((s,e) => s + e.avgMarks, 0) / (EXAM_CLASS_RESULTS.length * EXAMS.length)
  );

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Overall Pass Rate',  value: `${overallPassRate}%`, color: 'text-green-700 bg-green-50 border-green-100'    },
          { label: 'Average Score',      value: `${overallAvg}/100`,   color: 'text-blue-700 bg-blue-50 border-blue-100'       },
          { label: 'Top Score',          value: '98.4%',               color: 'text-orange-700 bg-orange-50 border-orange-100' },
          { label: 'Exams Conducted',    value: EXAMS.length,          color: 'text-slate-700 bg-slate-50 border-slate-200'    },
        ].map((s) => (
          <div key={s.label} className={cn('rounded-2xl border p-4', s.color)}>
            <div className="text-2xl font-black font-heading">{s.value}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Exam-wise Result Summary by Class</h3>
            <p className="text-xs text-slate-400 mt-0.5">Pass rate and average marks per class per exam</p>
          </div>
          <button onClick={() => dl('Result Sheets')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Result Sheets
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Class</th>
                {EXAMS.map((e) => (
                  <th key={e} className={thCls} colSpan={2}>
                    <div className="text-center">{e}</div>
                    <div className="flex gap-2 text-[10px] font-normal text-slate-400 mt-0.5">
                      <span className="flex-1 text-center">Avg</span>
                      <span className="flex-1 text-center">Pass%</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EXAM_CLASS_RESULTS.map((row) => (
                <tr key={row.class} className="border-b border-slate-50 hover:bg-orange-50/20 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{row.class}</td>
                  {row.exams.map((e, i) => (
                    <>
                      <td key={`${e.exam}-avg`} className="px-2 py-3 text-center">
                        <span className={cn('font-bold', e.avgMarks >= 70 ? 'text-green-600' : e.avgMarks >= 55 ? 'text-amber-600' : 'text-red-600')}>{e.avgMarks}</span>
                      </td>
                      <td key={`${e.exam}-pass`} className="px-2 py-3 text-center">
                        <span className={cn('px-2 py-0.5 rounded-full text-xs font-bold', e.passRate >= 90 ? 'bg-green-100 text-green-700' : e.passRate >= 75 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')}>{e.passRate}%</span>
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Subject-wise Performance</h3>
              <p className="text-xs text-slate-400 mt-0.5">Average score and pass % by subject</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={SUBJECT_PERFORMANCE} layout="vertical" margin={{ top: 4, right: 24, left: 64, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis dataKey="subject" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={64} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="avg"    name="Avg Score" fill="#f97316" radius={[0,4,4,0]} />
              <Bar dataKey="passed" name="Pass %"    fill="#fdba74" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Exam-to-Exam Improvement</h3>
              <p className="text-xs text-slate-400 mt-0.5">School-wide avg score & pass rate trend</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={EXAM_COMPARISON} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="exam" tick={{ fontSize: 10, fill: '#94a3b8' }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="avgScore" name="Avg Score" stroke="#f97316" strokeWidth={2.5} dot={{ r: 4, fill: '#f97316' }} />
              <Line type="monotone" dataKey="passRate" name="Pass Rate %" stroke="#fb923c" strokeWidth={2} strokeDasharray="4 3" dot={{ r: 3, fill: '#fb923c' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-orange-500" />
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Top Performers</h3>
              <p className="text-xs text-slate-400 mt-0.5">School toppers across all classes</p>
            </div>
          </div>
          <button onClick={() => dl('Merit List PDF')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Merit List PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Rank</th>
                <th className={thCls}>Roll No.</th>
                <th className={thCls}>Name</th>
                <th className={thCls}>Class</th>
                <th className={thCls}>Score</th>
                <th className={thCls}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PERFORMERS.map((s) => (
                <tr key={s.rank} className="border-b border-slate-50 hover:bg-orange-50/20 transition-colors">
                  <td className={tdCls}>
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center font-black text-xs',
                      s.rank === 1 ? 'bg-amber-400 text-white' : s.rank === 2 ? 'bg-slate-300 text-slate-800' : s.rank === 3 ? 'bg-orange-300 text-white' : 'bg-slate-100 text-slate-600'
                    )}>
                      {s.rank}
                    </div>
                  </td>
                  <td className={cn(tdCls, 'font-mono text-xs')}>{s.roll}</td>
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{s.name}</td>
                  <td className={tdCls}>{s.class}</td>
                  <td className={tdCls}><span className="font-black text-orange-600">{s.score}%</span></td>
                  <td className={tdCls}>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', s.grade === 'A+' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700')}>{s.grade}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-orange-500" />
          <h3 className="font-bold text-slate-800 font-heading text-sm">Subject Fail Analysis</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUBJECT_PERFORMANCE.map((s) => (
            <div key={s.subject} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="font-semibold text-slate-700 text-sm">{s.subject}</div>
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="text-xs text-slate-400">Passed</div>
                  <div className="font-black text-green-600">{s.passed}%</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Failed</div>
                  <div className="font-black text-red-500">{s.failed}%</div>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${s.passed}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const thCls    = 'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap';
const tdCls    = 'px-4 py-3 text-slate-600 whitespace-nowrap';
const dlBtnCls = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors';
