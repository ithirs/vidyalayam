'use client';

import Link from 'next/link';
import { ChevronRight, IndianRupee, CircleCheck as CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const FEE_HISTORY = [
  { month: 'March 2026', amount: 4250, paid: '02 Mar 2026', mode: 'Online', status: 'paid', receipt: 'RCP-2026-089' },
  { month: 'February 2026', amount: 4250, paid: '01 Feb 2026', mode: 'Online', status: 'paid', receipt: 'RCP-2026-045' },
  { month: 'January 2026', amount: 4250, paid: '03 Jan 2026', mode: 'Cash', status: 'paid', receipt: 'RCP-2026-012' },
  { month: 'April 2026', amount: 4250, paid: null, mode: null, status: 'pending', receipt: null },
];

export default function ParentFeesPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5 max-w-lg mx-auto">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/parent" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Fees & Payments</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Fees & Payments</h1>
            <p className="text-sm text-slate-500 mt-0.5">Rohit · Class 8-A · 2024–25</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-md">
          <p className="text-sm text-red-100">April 2026 Fee Due</p>
          <p className="text-3xl font-bold font-heading mt-1">₹4,250</p>
          <p className="text-xs text-red-200 mt-1">Due by 15 Apr 2026</p>
          <button onClick={() => toast.success('Redirecting to payment gateway…')} className="mt-4 px-5 py-2.5 rounded-xl bg-white text-red-600 font-bold text-sm hover:bg-red-50 transition-colors shadow-sm">
            Pay Now
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800">Payment History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {FEE_HISTORY.map(f => (
              <div key={f.month} className="flex items-center justify-between gap-3 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${f.status === 'paid' ? 'bg-green-50' : 'bg-red-50'}`}>
                    {f.status === 'paid' ? <CheckCircle2 className="w-4.5 h-4.5 text-green-500" /> : <Clock className="w-4.5 h-4.5 text-red-500" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{f.month}</p>
                    <p className="text-xs text-slate-400">{f.paid ? `Paid on ${f.paid} · ${f.mode}` : 'Pending'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${f.status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>₹{f.amount.toLocaleString('en-IN')}</p>
                  {f.receipt && (
                    <button onClick={() => toast.info(`Receipt ${f.receipt}`)} className="text-[10px] text-blue-500 font-medium mt-0.5 hover:underline">
                      View Receipt
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
