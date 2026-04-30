'use client';

import Link from 'next/link';
import { ChevronRight, FileText, CreditCard as Edit2 } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const FEE_STRUCTURE = [
  { class: 'Class 1–2', tuition: 2500, exam: 500, sports: 300, lab: 0, total: 3300 },
  { class: 'Class 3–5', tuition: 3000, exam: 600, sports: 300, lab: 0, total: 3900 },
  { class: 'Class 6–7', tuition: 3500, exam: 700, sports: 400, lab: 500, total: 5100 },
  { class: 'Class 8–9', tuition: 4000, exam: 800, sports: 400, lab: 700, total: 5900 },
  { class: 'Class 10', tuition: 4500, exam: 1000, sports: 400, lab: 800, total: 6700 },
];

export default function AdminFeeStructurePage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/fees" className="hover:text-blue-600 transition-colors font-medium">Fees</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Fee Structure</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Fee Structure</h1>
              <p className="text-sm text-slate-500 mt-0.5">Academic Year 2024–25 · Monthly fee structure</p>
            </div>
          </div>
          <button onClick={() => toast.info('Edit fee structure — coming soon')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
            <Edit2 className="w-4 h-4" />
            Edit Structure
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class Group</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Tuition</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Exam</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Sports</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Lab</th>
                  <th className="text-right px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total/Month</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {FEE_STRUCTURE.map((row, i) => (
                  <tr key={row.class} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === FEE_STRUCTURE.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-4 font-semibold text-slate-800">{row.class}</td>
                    <td className="px-5 py-4 text-right text-slate-600">₹{row.tuition.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-right text-slate-600">₹{row.exam.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-right text-slate-600">₹{row.sports.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4 text-right text-slate-600">{row.lab ? `₹${row.lab.toLocaleString('en-IN')}` : '—'}</td>
                    <td className="px-5 py-4 text-right font-bold text-blue-700">₹{row.total.toLocaleString('en-IN')}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => toast.info(`Editing ${row.class} — coming soon`)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
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
