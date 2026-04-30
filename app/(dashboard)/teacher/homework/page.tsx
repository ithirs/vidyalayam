'use client';

import Link from 'next/link';
import { ChevronRight, PenLine, Plus, Calendar, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const HOMEWORK = [
  { id: 1, class: '8-A', subject: 'Mathematics', title: 'Solve Exercise 5.3 (Q1–Q10)', dueDate: '14 Apr 2026', assigned: '11 Apr 2026', status: 'active', submissions: 28 },
  { id: 2, class: '9-B', subject: 'Mathematics', title: 'Chapter 7 – Coordinate Geometry Problems', dueDate: '13 Apr 2026', assigned: '10 Apr 2026', status: 'active', submissions: 22 },
  { id: 3, class: '10-A', subject: 'Mathematics', title: 'Practice Board Paper 2023 – Algebra Section', dueDate: '12 Apr 2026', assigned: '09 Apr 2026', status: 'due', submissions: 38 },
  { id: 4, class: '7-C', subject: 'Mathematics', title: 'Fractions and Decimals Worksheet', dueDate: '11 Apr 2026', assigned: '08 Apr 2026', status: 'completed', submissions: 45 },
];

export default function TeacherHomeworkPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/teacher" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Homework</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
              <PenLine className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Homework</h1>
              <p className="text-sm text-slate-500 mt-0.5">Assign and track homework for your classes</p>
            </div>
          </div>
          <button onClick={() => toast.info('Assign homework modal — coming soon')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Assign Homework
          </button>
        </div>

        <div className="space-y-3">
          {HOMEWORK.map(hw => (
            <div key={hw.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-green-50 border border-green-200 text-green-700">{hw.class}</span>
                    <span className="text-xs font-semibold text-slate-500">{hw.subject}</span>
                  </div>
                  <p className="font-semibold text-slate-800 mt-2">{hw.title}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Assigned: {hw.assigned}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due: {hw.dueDate}</span>
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{hw.submissions} submitted</span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                  hw.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  hw.status === 'due' ? 'bg-red-100 text-red-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {hw.status === 'active' ? 'Active' : hw.status === 'due' ? 'Due Today' : 'Completed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
