'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, Users, ClipboardList, ChevronRight as Arrow } from 'lucide-react';

const CLASSES = [
  { id: 1, name: 'Class 8-A', subject: 'Mathematics', students: 42, schedule: 'Mon, Wed, Fri · 8:00–8:45 AM', room: 'Room 12', classTeacher: true },
  { id: 2, name: 'Class 9-B', subject: 'Mathematics', students: 38, schedule: 'Mon, Tue, Thu · 10:00–10:45 AM', room: 'Room 8', classTeacher: false },
  { id: 3, name: 'Class 10-A', subject: 'Mathematics', students: 40, schedule: 'Tue, Wed, Fri · 11:00–11:45 AM', room: 'Room 14', classTeacher: false },
  { id: 4, name: 'Class 7-C', subject: 'Mathematics', students: 45, schedule: 'Mon, Thu · 2:00–2:45 PM', room: 'Room 5', classTeacher: false },
];

export default function MyClassesPage() {
  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/teacher" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">My Classes</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">My Classes</h1>
          <p className="text-sm text-slate-500 mt-0.5">{CLASSES.length} classes · {CLASSES.reduce((s, c) => s + c.students, 0)} total students</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CLASSES.map(cls => (
          <div key={cls.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-base">{cls.name}</h3>
                  {cls.classTeacher && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">Class Teacher</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">{cls.subject}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
                <Users className="w-3.5 h-3.5" />
                {cls.students}
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <p><span className="font-medium text-slate-600">Schedule:</span> {cls.schedule}</p>
              <p><span className="font-medium text-slate-600">Room:</span> {cls.room}</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Link href="/teacher/attendance/mark" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors">
                <ClipboardList className="w-3.5 h-3.5" />
                Mark Attendance
              </Link>
              <Link href="/teacher/marks-entry" className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition-colors">
                Enter Marks
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
