'use client';

import Link from 'next/link';
import { ChevronRight, Baby, BookOpen, ClipboardList, IndianRupee } from 'lucide-react';

const CHILDREN = [
  {
    id: 1, name: 'Rohit Suresh Babu', class: '8-A', roll: 'SR-0812', section: 'A',
    attendance: 92, nextFee: 4250, dueDate: '15 Apr 2026',
    recentMarks: [{ subject: 'Maths', marks: 88, max: 100 }, { subject: 'Science', marks: 79, max: 100 }, { subject: 'English', marks: 91, max: 100 }],
    avatar: 'RS'
  },
  {
    id: 2, name: 'Sneha Suresh Babu', class: '5-B', roll: 'SR-0523', section: 'B',
    attendance: 96, nextFee: 3300, dueDate: '15 Apr 2026',
    recentMarks: [{ subject: 'Maths', marks: 95, max: 100 }, { subject: 'Science', marks: 88, max: 100 }, { subject: 'English', marks: 93, max: 100 }],
    avatar: 'SS'
  },
];

export default function MyChildrenPage() {
  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">My Children</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
          <Baby className="w-5 h-5 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">My Children</h1>
          <p className="text-sm text-slate-500 mt-0.5">{CHILDREN.length} children enrolled</p>
        </div>
      </div>

      <div className="space-y-4">
        {CHILDREN.map(child => (
          <div key={child.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                {child.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 text-base">{child.name}</h3>
                <p className="text-sm text-slate-500">Class {child.class} · Roll No: {child.roll}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <span className={`font-bold ${child.attendance >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{child.attendance}% attendance</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {child.recentMarks.map(m => (
                <div key={m.subject} className="bg-slate-50 rounded-xl p-2.5 text-center border border-slate-100">
                  <p className={`text-lg font-bold font-heading ${m.marks >= 80 ? 'text-green-600' : m.marks >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{m.marks}</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{m.subject}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
              <Link href="/parent/attendance" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition-colors">
                <ClipboardList className="w-3.5 h-3.5" />
                Attendance
              </Link>
              <Link href="/parent/fees" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors">
                <IndianRupee className="w-3.5 h-3.5" />
                ₹{child.nextFee.toLocaleString('en-IN')} due
              </Link>
              <Link href="/parent/report-cards" className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition-colors">
                <BookOpen className="w-3.5 h-3.5" />
                Report Card
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
