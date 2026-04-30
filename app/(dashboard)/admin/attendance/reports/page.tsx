'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Download, Users, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AttendanceTrendChart } from './AttendanceTrendChart';
import { ClassComparisonChart } from './ClassComparisonChart';
import { StudentReportTable } from './StudentReportTable';

const CLASSES = ['Class 6-A', 'Class 6-B', 'Class 7-A', 'Class 7-B', 'Class 7-C', 'Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 10-A', 'Class 10-B'];
const MONTHS = ['January 2026', 'February 2026', 'March 2026', 'April 2026'];

function Dropdown({
  label,
  value,
  options,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon: React.ElementType;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium hover:border-orange-300 transition-all bg-white min-w-[160px]"
      >
        <Icon className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="flex-1 text-left truncate">{value}</span>
        <ChevronDown className={cn('w-4 h-4 text-slate-400 shrink-0 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5 min-w-full max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={cn(
                'w-full text-left px-3.5 py-2.5 text-sm transition-colors',
                value === opt ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AttendanceReportsPage() {
  const [selectedClass, setSelectedClass] = useState('Class 8-A');
  const [selectedMonth, setSelectedMonth] = useState('April 2026');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/attendance"
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-heading">Attendance Reports</h1>
            <p className="text-sm text-slate-500 mt-0.5">Analyze and export attendance data</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
          <Download className="w-4 h-4" />
          Export Full Report
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4">Filters</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <Dropdown label="Class & Section" value={selectedClass} options={CLASSES} onChange={setSelectedClass} icon={Users} />
          <Dropdown label="Month" value={selectedMonth} options={MONTHS} onChange={setSelectedMonth} icon={Calendar} />
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">Student (optional)</label>
            <input
              type="text"
              placeholder="Search student name or roll no..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-400 hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all"
            />
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm self-end">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Class Average', value: '91.8%', sub: selectedClass, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Best Attendance', value: '98.3%', sub: 'Kavya Singh', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Lowest Attendance', value: '62.1%', sub: 'Meera Joshi', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 flex items-center gap-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', s.bg)}>
              <s.icon className={cn('w-5 h-5', s.color)} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              <p className="text-xl font-bold text-slate-900 font-heading tabular-nums">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttendanceTrendChart />
        <ClassComparisonChart />
      </div>

      <StudentReportTable />
    </div>
  );
}
