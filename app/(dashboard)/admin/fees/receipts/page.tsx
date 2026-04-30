'use client';

import Link from 'next/link';
import { ChevronRight, Receipt, Search, Download, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const RECEIPTS = [
  { id: 'RCP-2026-001', student: 'Arjun Reddy', class: '10-A', amount: 4250, date: '01 Apr 2026', mode: 'Online', status: 'paid' },
  { id: 'RCP-2026-002', student: 'Priya Singh', class: '8-B', amount: 3900, date: '02 Apr 2026', mode: 'Cash', status: 'paid' },
  { id: 'RCP-2026-003', student: 'Kiran Kumar', class: '9-A', amount: 5100, date: '03 Apr 2026', mode: 'Cheque', status: 'paid' },
  { id: 'RCP-2026-004', student: 'Meera Devi', class: '7-C', amount: 3300, date: '04 Apr 2026', mode: 'Online', status: 'paid' },
  { id: 'RCP-2026-005', student: 'Suresh Babu', class: '6-A', amount: 3300, date: '05 Apr 2026', mode: 'Cash', status: 'paid' },
];

export default function AdminFeeReceiptsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/fees" className="hover:text-blue-600 transition-colors font-medium">Fees</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Receipts</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <Receipt className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Fee Receipts</h1>
            <p className="text-sm text-slate-500 mt-0.5">View and download payment receipts</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="Search by receipt no or student..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Receipt No</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Mode</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {RECEIPTS.map((r, i) => (
                  <tr key={r.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === RECEIPTS.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{r.id}</td>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800">{r.student}</p>
                      <p className="text-xs text-slate-400">{r.class}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">{r.date}</td>
                    <td className="px-5 py-3.5 font-bold text-green-700">₹{r.amount.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{r.mode}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => toast.info('View receipt')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toast.success('Receipt downloaded')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
