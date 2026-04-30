'use client';

import { FileSpreadsheet, FileText, Printer, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const MONTHLY_SUMMARY = [
  { label: 'Opening Balance', value: '₹1,24,300', trend: null },
  { label: 'Total Collected', value: '₹8,42,500', trend: 'up' },
  { label: 'Refunds Issued', value: '₹3,200', trend: 'down' },
  { label: 'Closing Balance', value: '₹9,63,600', trend: 'up' },
];

export function FinancialReports() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-900 font-heading text-sm">Financial Reports</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">April 2026 · Academic Year 2024-25</p>
        </div>
        <span className="text-xs font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-lg">
          Month-End Ready
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {MONTHLY_SUMMARY.map((item) => (
          <div key={item.label} className="bg-slate-50 rounded-xl p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wide leading-tight">{item.label}</p>
            <div className="flex items-center gap-1 mt-1.5">
              <p className="text-base font-bold text-slate-900 font-heading tabular-nums">{item.value}</p>
              {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-green-500" />}
              {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-400" />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => toast.success('Exporting to Excel…')}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold text-sm transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">Export Excel</p>
            <p className="text-[10px] text-green-600 font-normal">Full collection report</p>
          </div>
          <Download className="w-3.5 h-3.5 ml-auto opacity-60" />
        </button>

        <button
          onClick={() => toast.success('Generating PDF report…')}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-sm transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
            <FileText className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">Export PDF</p>
            <p className="text-[10px] text-red-600 font-normal">Printable summary</p>
          </div>
          <Download className="w-3.5 h-3.5 ml-auto opacity-60" />
        </button>

        <button
          onClick={() => toast.success('Opening Day Book for printing…')}
          className="flex items-center justify-center gap-2.5 p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center transition-colors">
            <Printer className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-sm font-bold">Print Day Book</p>
            <p className="text-[10px] text-slate-500 font-normal">Today&apos;s register</p>
          </div>
          <Printer className="w-3.5 h-3.5 ml-auto opacity-40" />
        </button>
      </div>
    </div>
  );
}
