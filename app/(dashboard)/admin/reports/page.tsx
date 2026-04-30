'use client';

import { useState } from 'react';
import { Download, ChartBar as BarChart2, Users, CalendarCheck, Banknote, BookOpen, Briefcase, ChevronDown } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { OverviewTab }         from './OverviewTab';
import { StudentReportsTab }   from './StudentReportsTab';
import { AttendanceReportsTab } from './AttendanceReportsTab';
import { FeeReportsTab }        from './FeeReportsTab';
import { ExamReportsTab }       from './ExamReportsTab';
import { StaffReportsTab }      from './StaffReportsTab';

type TabId = 'overview' | 'students' | 'attendance' | 'fees' | 'exams' | 'staff';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'overview',    label: 'Overview Analytics', icon: BarChart2    },
  { id: 'students',    label: 'Students',           icon: Users        },
  { id: 'attendance',  label: 'Attendance',         icon: CalendarCheck},
  { id: 'fees',        label: 'Fees',               icon: Banknote     },
  { id: 'exams',       label: 'Exams',              icon: BookOpen     },
  { id: 'staff',       label: 'Staff',              icon: Briefcase    },
];

const ACADEMIC_YEARS = ['2025–26', '2024–25', '2023–24'];

export default function ReportsPage() {
  const [activeTab,   setActiveTab]   = useState<TabId>('overview');
  const [academicYear, setAcademicYear] = useState('2025–26');
  const [dateFrom,    setDateFrom]    = useState('2026-04-01');
  const [dateTo,      setDateTo]      = useState('2026-04-12');

  const exportAll = () => toast.success('Preparing full report export…');

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="pb-10">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Reports & Analytics</h1>
            <p className="text-sm text-slate-500 mt-0.5">School-wide insights, downloads and performance tracking</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none cursor-pointer"
              >
                {ACADEMIC_YEARS.map((y) => <option key={y}>{y}</option>)}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-600">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="outline-none bg-transparent text-xs text-slate-600 w-[110px]"
              />
              <span className="text-slate-300">→</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="outline-none bg-transparent text-xs text-slate-600 w-[110px]"
              />
            </div>

            <button
              onClick={exportAll}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>
        </div>

        <div className="flex gap-1 bg-white border border-slate-200 rounded-2xl p-1.5 mb-5 shadow-card overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-1 justify-center min-w-fit',
                  isActive ? 'bg-orange-500 text-white shadow-brand-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'overview'   && <OverviewTab />}
        {activeTab === 'students'   && <StudentReportsTab />}
        {activeTab === 'attendance' && <AttendanceReportsTab />}
        {activeTab === 'fees'       && <FeeReportsTab />}
        {activeTab === 'exams'      && <ExamReportsTab />}
        {activeTab === 'staff'      && <StaffReportsTab />}
      </div>
    </>
  );
}
