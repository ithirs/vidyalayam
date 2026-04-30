'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { SchoolsTable } from '../SchoolsTable';

export default function SuperAdminSchoolsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/super-admin" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Schools</span>
        </nav>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Schools</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage all registered schools on Vidyalaya</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <SchoolsTable />
        </div>
      </div>
    </>
  );
}
