'use client';

import { useState, useEffect } from 'react';
import { UserPlus, ClipboardCheck, IndianRupee, Chrome as Home, Users, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { AdminStatsCards } from './AdminStatsCards';
import { AttendanceChart } from './AttendanceChart';
import { FeeDonutChart } from './FeeDonutChart';
import { RecentAdmissions } from './RecentAdmissions';
import { TodaySchedule } from './TodaySchedule';
import { QuickStats } from './QuickStats';
import { FeePaymentsTable } from './FeePaymentsTable';
import { NotificationsPanel } from './NotificationsPanel';

const QUICK_ACTIONS = [
  { label: 'Add Student', icon: UserPlus, onClick: () => toast.info('Add Student — coming soon') },
  { label: 'Mark Attendance', icon: ClipboardCheck, onClick: () => toast.info('Mark Attendance — coming soon') },
  { label: 'Collect Fee', icon: IndianRupee, onClick: () => toast.info('Collect Fee — coming soon') },
];

const MOBILE_NAV = [
  { icon: Home, label: 'Home' },
  { icon: Users, label: 'Students' },
  { icon: IndianRupee, label: 'Fees' },
  { icon: ClipboardCheck, label: 'Attendance' },
  { icon: MoreHorizontal, label: 'More' },
];

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState('Good morning');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    setDateStr(new Date().toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors />

      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 font-heading">
                {greeting}, Principal Radhika 👋
              </h1>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg">
                2024–25
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">
              Sri Sai High School {dateStr ? `\u00B7 ${dateStr}` : ''}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {QUICK_ACTIONS.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all duration-150 bg-white shadow-sm"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <AdminStatsCards />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <AttendanceChart />
          </div>
          <div className="lg:col-span-2">
            <FeeDonutChart />
          </div>
        </div>

        {/* Third row: Admissions | Schedule | Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <RecentAdmissions />
          <TodaySchedule />
          <QuickStats />
        </div>

        {/* Bottom row: Fee Payments | Notifications */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          <div className="xl:col-span-3">
            <FeePaymentsTable />
          </div>
          <div className="xl:col-span-2">
            <NotificationsPanel />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
        {MOBILE_NAV.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            onClick={() => toast.info(`${label} — coming soon`)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
              i === 0 ? 'text-orange-500' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
