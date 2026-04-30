'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';

export default function AdminFeeCollectionPage() {
  return (
    <div className="space-y-4">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/admin/fees" className="hover:text-blue-600 transition-colors font-medium">Fees</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Collection</span>
      </nav>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-700 font-medium">
        Fee collection is managed by the Accountant. Use the Accountant portal at{' '}
        <Link href="/accountant/fees/collect" className="underline font-bold">Collect Fee</Link>.
      </div>
    </div>
  );
}
