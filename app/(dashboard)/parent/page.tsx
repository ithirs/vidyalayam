'use client';

import { useState } from 'react';
import { Chrome as Home, CalendarDays, IndianRupee, GraduationCap, MoveHorizontal as MoreHorizontal, ChevronDown, Bell } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CHILDREN, PARENT_NAME, SCHOOL_NAME, CURRENT_TERM } from './data';
import { ChildOverviewCard } from './ChildOverviewCard';
import { QuickInfoCards } from './QuickInfoCards';
import { AttendanceCalendar } from './AttendanceCalendar';
import { FeeSection } from './FeeSection';
import { ReportCardSection } from './ReportCardSection';
import { HomeworkSection } from './HomeworkSection';
import { NoticesEvents } from './NoticesEvents';
import { CommunicationSection } from './CommunicationSection';

type Tab = 'home' | 'attendance' | 'fees' | 'report' | 'more';

const NAV_TABS: { id: Tab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'attendance', icon: CalendarDays, label: 'Attendance' },
  { id: 'fees', icon: IndianRupee, label: 'Fees' },
  { id: 'report', icon: GraduationCap, label: 'Report Card' },
  { id: 'more', icon: MoreHorizontal, label: 'More' },
];

export default function ParentDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [childIndex, setChildIndex] = useState(0);
  const [childDropOpen, setChildDropOpen] = useState(false);
  const selectedChild = CHILDREN[childIndex];

  const scrollToSection = (id: string) => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  return (
    <>
      <Toaster position="top-center" richColors />

      <div className="min-h-screen bg-slate-50 pb-24 max-w-lg mx-auto lg:max-w-2xl">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 pt-4 pb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">{SCHOOL_NAME}</p>
              <h1 className="text-base font-bold text-slate-900 font-heading leading-tight">
                Hello, {PARENT_NAME.split(' ')[0]} 🙏
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">{CURRENT_TERM}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toast.info('No new notifications')}
                className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setChildDropOpen((o) => !o)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-orange-300 transition-colors shadow-sm"
                >
                  <div className="w-6 h-6 rounded-lg overflow-hidden">
                    <img src={selectedChild.avatarUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    <div className={cn('w-full h-full text-[9px] font-bold flex items-center justify-center', selectedChild.avatarBg)}>{selectedChild.avatarInitials}</div>
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{selectedChild.name.split(' ')[0]}</p>
                    <p className="text-[10px] text-slate-400">{selectedChild.className}-{selectedChild.section}</p>
                  </div>
                  <ChevronDown className={cn('w-3 h-3 text-slate-400 transition-transform', childDropOpen && 'rotate-180')} />
                </button>

                {childDropOpen && (
                  <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal z-50 w-52 py-1">
                    {CHILDREN.map((child, idx) => (
                      <button
                        key={child.id}
                        onClick={() => { setChildIndex(idx); setChildDropOpen(false); }}
                        className={cn('w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors', childIndex === idx ? 'bg-orange-50' : 'hover:bg-slate-50')}
                      >
                        <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0">
                          <img src={child.avatarUrl} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                          <div className={cn('w-full h-full text-xs font-bold flex items-center justify-center', child.avatarBg)}>{child.avatarInitials}</div>
                        </div>
                        <div>
                          <p className={cn('text-sm font-semibold', childIndex === idx ? 'text-orange-600' : 'text-slate-800')}>{child.name}</p>
                          <p className="text-[11px] text-slate-400">{child.className}-{child.section} · Roll {child.rollNo}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-4 space-y-4">
          {activeTab === 'home' && (
            <>
              <ChildOverviewCard child={selectedChild} todayPresent={true} />
              <QuickInfoCards
                onFeeClick={() => setActiveTab('fees')}
                onHomeworkClick={() => scrollToSection('homework')}
              />
              <div id="homework">
                <HomeworkSection />
              </div>
              <NoticesEvents />
              <CommunicationSection />
            </>
          )}

          {activeTab === 'attendance' && (
            <>
              <ChildOverviewCard child={selectedChild} todayPresent={true} />
              <AttendanceCalendar />
            </>
          )}

          {activeTab === 'fees' && (
            <>
              <ChildOverviewCard child={selectedChild} todayPresent={true} />
              <FeeSection />
            </>
          )}

          {activeTab === 'report' && (
            <>
              <ChildOverviewCard child={selectedChild} todayPresent={true} />
              <ReportCardSection />
            </>
          )}

          {activeTab === 'more' && (
            <div className="space-y-4">
              <ChildOverviewCard child={selectedChild} todayPresent={true} />
              <HomeworkSection />
              <NoticesEvents />
              <CommunicationSection />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg">
        <div className="max-w-lg mx-auto lg:max-w-2xl flex items-center justify-around px-2 py-1.5">
          {NAV_TABS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-150 min-w-[52px]',
                activeTab === id
                  ? 'text-orange-500'
                  : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <div className={cn(
                'relative p-1.5 rounded-xl transition-all',
                activeTab === id ? 'bg-orange-50' : ''
              )}>
                <Icon className="w-5 h-5" />
                {id === 'fees' && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
                )}
              </div>
              <span className={cn('text-[10px] font-semibold', activeTab === id ? 'text-orange-500' : '')}>{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
