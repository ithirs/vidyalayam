'use client';

import Link from 'next/link';
import { ChevronRight, TrendingUp, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const MONTHLY = [
  { month: 'Oct 2025', collected: 185000, expected: 210000, rate: 88 },
  { month: 'Nov 2025', collected: 192000, expected: 210000, rate: 91 },
  { month: 'Dec 2025', collected: 178000, expected: 210000, rate: 85 },
  { month: 'Jan 2026', collected: 201000, expected: 210000, rate: 96 },
  { month: 'Feb 2026', collected: 196000, expected: 210000, rate: 93 },
  { month: 'Mar 2026', collected: 185000, expected: 210000, rate: 88 },
  { month: 'Apr 2026', collected: 107000, expected: 210000, rate: 51 },
];

export default function FinancialReportsPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/accountant" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Financial Reports</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Financial Reports</h1>
              <p className="text-sm text-slate-500 mt-0.5">Academic Year 2025–26 fee collection summary</p>
            </div>
          </div>
          <button onClick={() => toast.success('Report downloaded!')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Expected', value: '₹21,00,000', color: 'text-slate-700' },
            { label: 'Total Collected', value: '₹18,42,500', color: 'text-green-600' },
            { label: 'Pending Dues', value: '₹2,57,500', color: 'text-red-600' },
            { label: 'Overall Rate', value: '87.7%', color: 'text-blue-600' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <p className={`text-2xl font-bold font-heading ${s.color}`}>{s.value}</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Monthly Collection Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Month</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Expected</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Collected</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Pending</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rate</th>
                </tr>
              </thead>
              <tbody>
                {MONTHLY.map((m, i) => (
                  <tr key={m.month} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === MONTHLY.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5 font-semibold text-slate-800">{m.month}</td>
                    <td className="px-5 py-3.5 text-right text-slate-500">₹{m.expected.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-right font-semibold text-green-600">₹{m.collected.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5 text-right text-red-500">₹{(m.expected - m.collected).toLocaleString('en-IN')}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                          <div className={`h-full rounded-full ${m.rate >= 90 ? 'bg-green-500' : m.rate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.rate}%` }} />
                        </div>
                        <span className={`text-xs font-bold ${m.rate >= 90 ? 'text-green-600' : m.rate >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{m.rate}%</span>
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
