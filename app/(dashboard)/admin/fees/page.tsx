'use client';

import Link from 'next/link';
import { IndianRupee, ChevronRight, ArrowRight, Wallet, FileText, CircleAlert as AlertCircle, Receipt } from 'lucide-react';

const FEE_CARDS = [
  { label: 'Collect Fee', desc: 'Record new fee payments from students', href: '/admin/fees/collection', icon: Wallet, color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', badge: null },
  { label: 'Fee Dues', desc: 'View students with pending fee dues', href: '/admin/fees/dues', icon: AlertCircle, color: 'bg-red-50 border-red-200', iconColor: 'text-red-600', badge: '48' },
  { label: 'Fee Structure', desc: 'Manage class-wise fee structure', href: '/admin/fees/structure', icon: FileText, color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', badge: null },
  { label: 'Receipts', desc: 'View and print fee receipts', href: '/admin/fees/receipts', icon: Receipt, color: 'bg-amber-50 border-amber-200', iconColor: 'text-amber-600', badge: null },
];

const STATS = [
  { label: 'Total Collected', value: '₹18,42,500', sub: 'This academic year', color: 'text-green-600' },
  { label: 'Pending Dues', value: '₹3,21,000', sub: '48 students', color: 'text-red-600' },
  { label: 'This Month', value: '₹2,15,800', sub: 'April 2026', color: 'text-blue-600' },
  { label: 'Collection Rate', value: '85.2%', sub: 'Of expected fees', color: 'text-amber-600' },
];

export default function AdminFeesPage() {
  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Fees</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
          <IndianRupee className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Fee Management</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage collections, dues, structure and receipts</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
            <p className="text-sm font-semibold text-slate-700 mt-1">{s.label}</p>
            <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEE_CARDS.map(card => (
          <Link key={card.label} href={card.href} className={`group bg-white rounded-2xl border ${card.color} p-5 shadow-sm hover:shadow-md transition-all`}>
            <div className="flex items-start justify-between gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.color}`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              {card.badge && (
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-100 text-red-700">{card.badge} pending</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-slate-800">{card.label}</p>
                <p className="text-sm text-slate-500 mt-0.5">{card.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
