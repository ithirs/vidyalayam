'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { RevenueChart } from '../RevenueChart';
import { PlanChart } from '../PlanChart';
import { StatsCards } from '../StatsCards';

export default function SuperAdminReportsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/super-admin" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Reports & Analytics</span>
        </nav>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Reports & Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Platform-wide performance and revenue insights</p>
        </div>
        <StatsCards />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <RevenueChart />
          </div>
          <div className="lg:col-span-2">
            <PlanChart />
          </div>
        </div>
      </div>
    </>
  );
}
