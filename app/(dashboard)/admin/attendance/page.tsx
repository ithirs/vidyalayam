'use client';

import Link from 'next/link';
import { ClipboardList, ChartBar as BarChart2, Plus } from 'lucide-react';
import { AttendanceStatsCards } from './AttendanceStatsCards';
import { ClassAttendanceTable } from './ClassAttendanceTable';
import { AttendanceCalendarHeatmap } from './AttendanceCalendarHeatmap';

export default function AttendanceOverviewPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-slate-900 font-heading">Attendance Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track and manage school-wide attendance</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/attendance/reports"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            Reports
          </Link>
          <Link
            href="/teacher/attendance/mark"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Mark Attendance
          </Link>
        </div>
      </div>

      <AttendanceStatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ClassAttendanceTable />
        </div>
        <div>
          <AttendanceCalendarHeatmap />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <ClipboardList className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">3 classes have not marked attendance today</p>
          <p className="text-xs text-amber-600 mt-0.5">Class 8-C, Class 9-B, and Class 10-C are pending. Remind teachers to submit before 11:00 AM.</p>
          <button className="mt-2 text-xs font-semibold text-amber-700 underline underline-offset-2 hover:text-amber-900 transition-colors">
            Send reminder to class teachers
          </button>
        </div>
      </div>
    </div>
  );
}
