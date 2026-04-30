'use client';

import Link from 'next/link';
import { ChevronRight, CircleAlert as AlertCircle, Search, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const DUES = [
  { name: 'Arjun Reddy', class: '10-A', roll: 'SR-1001', amount: 8500, months: 'March, April', phone: '9876543210' },
  { name: 'Priya Singh', class: '8-B', roll: 'SR-1045', amount: 4250, months: 'April', phone: '9876543211' },
  { name: 'Kiran Kumar', class: '9-A', roll: 'SR-1023', amount: 17000, months: 'Feb, March, April', phone: '9876543212' },
  { name: 'Meera Devi', class: '7-C', roll: 'SR-1067', amount: 4250, months: 'April', phone: '9876543213' },
  { name: 'Suresh Babu', class: '6-A', roll: 'SR-1089', amount: 8500, months: 'March, April', phone: '9876543214' },
  { name: 'Lakshmi Nair', class: '10-B', roll: 'SR-1012', amount: 4250, months: 'April', phone: '9876543215' },
];

export default function AdminFeeDuesPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/fees" className="hover:text-blue-600 transition-colors font-medium">Fees</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Dues</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Fee Dues</h1>
              <p className="text-sm text-slate-500 mt-0.5">{DUES.length} students with pending payments</p>
            </div>
          </div>
          <button
            onClick={() => toast.success('Reminders sent to all defaulters!')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors shadow-sm"
          >
            <Bell className="w-4 h-4" />
            Send All Reminders
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input placeholder="Search student..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Pending Months</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount Due</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {DUES.map((d, i) => (
                  <tr key={d.roll} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === DUES.length - 1 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800">{d.name}</p>
                      <p className="text-xs text-slate-400">{d.roll}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600">{d.class}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs hidden md:table-cell">{d.months}</td>
                    <td className="px-5 py-3.5">
                      <span className="font-bold text-red-600">₹{d.amount.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => toast.success(`Reminder sent to ${d.name}'s parent`)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors">
                        Send Reminder
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
