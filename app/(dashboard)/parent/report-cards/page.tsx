'use client';

import Link from 'next/link';
import { ChevronRight, FileText, Download, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const SUBJECTS = [
  { name: 'Mathematics', ut1: 88, mid: 76, ut2: 92, final: null },
  { name: 'Science', ut1: 79, mid: 82, ut2: 85, final: null },
  { name: 'English', ut1: 91, mid: 88, ut2: 94, final: null },
  { name: 'Social Studies', ut1: 75, mid: 80, ut2: 82, final: null },
  { name: 'Telugu', ut1: 82, mid: 78, ut2: 88, final: null },
  { name: 'Hindi', ut1: 70, mid: 74, ut2: 78, final: null },
];

const grade = (m: number | null) => {
  if (m === null) return '—';
  if (m >= 90) return 'A+';
  if (m >= 80) return 'A';
  if (m >= 70) return 'B+';
  if (m >= 60) return 'B';
  return 'C';
};

export default function ParentReportCardsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5 max-w-2xl mx-auto">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Report Cards</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
              <FileText className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Report Cards</h1>
              <p className="text-sm text-slate-500 mt-0.5">Rohit · Class 8-A · Academic Year 2024–25</p>
            </div>
          </div>
          <button onClick={() => toast.success('Report card downloaded!')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'UT-1 Average', value: `${Math.round(SUBJECTS.reduce((s, sub) => s + sub.ut1, 0) / SUBJECTS.length)}%`, color: 'text-blue-600' },
            { label: 'Mid-Term Average', value: `${Math.round(SUBJECTS.reduce((s, sub) => s + sub.mid, 0) / SUBJECTS.length)}%`, color: 'text-amber-600' },
            { label: 'UT-2 Average', value: `${Math.round(SUBJECTS.reduce((s, sub) => s + sub.ut2, 0) / SUBJECTS.length)}%`, color: 'text-green-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-sm">
              <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
              <p className="text-xs font-medium text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Subject</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">UT-1</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Mid-Term</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">UT-2</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Final</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade</th>
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((s, i) => (
                  <tr key={s.name} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === SUBJECTS.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-4 py-3.5 text-center text-slate-600">{s.ut1}</td>
                    <td className="px-4 py-3.5 text-center text-slate-600">{s.mid}</td>
                    <td className="px-4 py-3.5 text-center text-slate-600">{s.ut2}</td>
                    <td className="px-4 py-3.5 text-center text-slate-400">—</td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`font-bold text-xs px-2 py-0.5 rounded-lg ${
                        grade(s.ut2) === 'A+' ? 'bg-green-100 text-green-700' :
                        grade(s.ut2) === 'A' ? 'bg-blue-100 text-blue-700' :
                        grade(s.ut2) === 'B+' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-600'
                      }`}>{grade(s.ut2)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
