'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { OverduePanel } from '../OverduePanel';

export default function LibrarianPendingReturnsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/librarian" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Pending Returns</span>
        </nav>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Pending Returns</h1>
          <p className="text-sm text-slate-500 mt-0.5">Overdue and due-today books</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <OverduePanel />
        </div>
      </div>
    </>
  );
}
