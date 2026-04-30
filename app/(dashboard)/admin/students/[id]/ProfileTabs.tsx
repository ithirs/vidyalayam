'use client';

import { useState } from 'react';
import { User, BookOpen, IndianRupee, CalendarDays, Trophy, FolderOpen, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Student } from '../data';
import { OverviewTab } from './tabs/OverviewTab';
import { AcademicTab } from './tabs/AcademicTab';
import { FeesTab } from './tabs/FeesTab';
import { AttendanceTab } from './tabs/AttendanceTab';
import { ExamsTab } from './tabs/ExamsTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { CommunicationTab } from './tabs/CommunicationTab';

type Tab = 'overview' | 'academic' | 'fees' | 'attendance' | 'exams' | 'documents' | 'communication';

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'academic', label: 'Academic', icon: BookOpen },
  { id: 'fees', label: 'Fees', icon: IndianRupee },
  { id: 'attendance', label: 'Attendance', icon: CalendarDays },
  { id: 'exams', label: 'Exams', icon: Trophy },
  { id: 'documents', label: 'Documents', icon: FolderOpen },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
];

export function ProfileTabs({ student }: { student: Student }) {
  const [active, setActive] = useState<Tab>('overview');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
      {/* Tab nav */}
      <div className="flex overflow-x-auto border-b border-slate-100 scrollbar-none">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActive(id)}
            className={cn(
              'flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all whitespace-nowrap border-b-2 -mb-px',
              active === id
                ? 'border-blue-500 text-blue-600 bg-blue-50/40'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            )}>
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {active === 'overview' && <OverviewTab student={student} />}
        {active === 'academic' && <AcademicTab student={student} />}
        {active === 'fees' && <FeesTab student={student} />}
        {active === 'attendance' && <AttendanceTab student={student} />}
        {active === 'exams' && <ExamsTab student={student} />}
        {active === 'documents' && <DocumentsTab />}
        {active === 'communication' && <CommunicationTab student={student} />}
      </div>
    </div>
  );
}
