'use client';

import Link from 'next/link';
import { ChevronRight, PenLine, Calendar, CircleCheck as CheckCircle2, Clock } from 'lucide-react';

const HOMEWORK = [
  { id: 1, subject: 'Mathematics', title: 'Solve Exercise 5.3 (Q1–Q10)', dueDate: '14 Apr 2026', status: 'pending', teacher: 'Ms. Priya' },
  { id: 2, subject: 'Science', title: 'Draw and label parts of a plant cell', dueDate: '13 Apr 2026', status: 'submitted', teacher: 'Mr. Ravi' },
  { id: 3, subject: 'English', title: 'Write a 200-word essay on water conservation', dueDate: '15 Apr 2026', status: 'pending', teacher: 'Ms. Sumalatha' },
  { id: 4, subject: 'Social Studies', title: 'Note: Chapter 4 – Rivers of India', dueDate: '10 Apr 2026', status: 'submitted', teacher: 'Mr. Kiran' },
  { id: 5, subject: 'Telugu', title: 'Write 10 sentences using past tense', dueDate: '12 Apr 2026', status: 'submitted', teacher: 'Ms. Padma' },
];

export default function ParentHomeworkPage() {
  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Homework</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
          <PenLine className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Homework</h1>
          <p className="text-sm text-slate-500 mt-0.5">Rohit · Class 8-A · {HOMEWORK.filter(h => h.status === 'pending').length} pending</p>
        </div>
      </div>

      <div className="space-y-3">
        {HOMEWORK.map(hw => (
          <div key={hw.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-700">{hw.subject}</span>
                  <span className="text-xs text-slate-400">{hw.teacher}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{hw.title}</p>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  Due: {hw.dueDate}
                </div>
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${hw.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {hw.status === 'submitted' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {hw.status === 'submitted' ? 'Submitted' : 'Pending'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
