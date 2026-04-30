'use client';

import { useState } from 'react';
import { IndianRupee, Receipt, Bell, Chrome as Home, Users, MoveHorizontal as MoreHorizontal } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { AccountantStatsCards } from './AccountantStatsCards';
import { CollectionChart } from './CollectionChart';
import { TodaysTransactions } from './TodaysTransactions';
import { PendingFees } from './PendingFees';
import { FeeStructureOverview } from './FeeStructureOverview';
import { CollectFeeModal } from './CollectFeeModal';
import { FinancialReports } from './FinancialReports';

const MOBILE_NAV = [
  { icon: Home, label: 'Home' },
  { icon: Users, label: 'Students' },
  { icon: IndianRupee, label: 'Collect' },
  { icon: Receipt, label: 'Reports' },
  { icon: MoreHorizontal, label: 'More' },
];

export default function AccountantDashboard() {
  const [collectModalOpen, setCollectModalOpen] = useState(false);

  return (
    <>
      <Toaster position="top-right" richColors />
      {collectModalOpen && <CollectFeeModal onClose={() => setCollectModalOpen(false)} />}

      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 font-heading">
                Fee Management Dashboard
              </h1>
              <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-1 rounded-lg">
                2024–25
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Sri Sai High School · April 2026
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <button
              onClick={() => setCollectModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-brand-sm hover:shadow-brand transition-all duration-150"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              Collect Fee
            </button>
            <button
              onClick={() => toast.info('Generate Receipt — coming soon')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 transition-all duration-150 bg-white shadow-sm"
            >
              <Receipt className="w-3.5 h-3.5" />
              Generate Receipt
            </button>
            <button
              onClick={() => toast.success('Sending reminders to all overdue students…')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-700 hover:border-green-300 hover:text-green-600 hover:bg-green-50 transition-all duration-150 bg-white shadow-sm"
            >
              <Bell className="w-3.5 h-3.5" />
              Send Reminder
            </button>
          </div>
        </div>

        {/* Stats */}
        <AccountantStatsCards />

        {/* Chart + Fee Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <CollectionChart />
          </div>
          <div className="lg:col-span-2">
            <FeeStructureOverview />
          </div>
        </div>

        {/* Today's Transactions */}
        <TodaysTransactions />

        {/* Pending Fees */}
        <PendingFees />

        {/* Financial Reports */}
        <FinancialReports />
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 px-2 py-1 flex items-center justify-around shadow-lg">
        {MOBILE_NAV.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            onClick={() => i === 2 ? setCollectModalOpen(true) : toast.info(`${label} — coming soon`)}
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
