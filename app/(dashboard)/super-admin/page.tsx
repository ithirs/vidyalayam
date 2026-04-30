'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { StatsCards } from './StatsCards';
import { RevenueChart } from './RevenueChart';
import { PlanChart } from './PlanChart';
import { SchoolsTable } from './SchoolsTable';
import { AlertsPanel } from './AlertsPanel';
import { ActivityFeed } from './ActivityFeed';

export default function SuperAdminDashboard() {
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

      <div className="space-y-6">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">
              {greeting}, Admin 👋
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">{dateStr}</p>
          </div>

          <button
            onClick={() => toast.info('Add New School — coming soon')}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl text-sm font-semibold shadow-brand-sm hover:shadow-brand transition-all duration-150 active:scale-[0.98] self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            Add New School
          </button>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <div>
            <PlanChart />
          </div>
        </div>

        {/* Schools table */}
        <SchoolsTable />

        {/* Bottom row: Alerts + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AlertsPanel />
          <ActivityFeed />
        </div>
      </div>
    </>
  );
}
