'use client';

import Link from 'next/link';
import { ChevronRight, Library } from 'lucide-react';

export default function AdminLibraryPage() {
  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Library</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center">
          <Library className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Library Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage school library resources</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Books', value: '2,840', color: 'text-blue-600' },
          { label: 'Currently Issued', value: '124', color: 'text-amber-600' },
          { label: 'Overdue Returns', value: '18', color: 'text-red-600' },
          { label: 'New This Month', value: '32', color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-700">
        Full library management is handled in the{' '}
        <Link href="/librarian" className="underline font-bold">Librarian portal</Link>.
        As admin, you can view overall statistics and manage library settings.
      </div>
    </div>
  );
}
