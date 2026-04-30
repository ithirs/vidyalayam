'use client';

import Link from 'next/link';
import { ChevronRight, GraduationCap, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { AdmissionPanel } from '../AdmissionPanel';
import { useState } from 'react';
import type { Inquiry } from '../data';
import { INQUIRIES } from '../data';

export default function ReceptionistAdmissionsPage() {
  const [admissionFor, setAdmissionFor] = useState<Inquiry | null>(null);
  const admitted = INQUIRIES.filter(i => i.status === 'admitted');
  const pending = INQUIRIES.filter(i => i.status === 'scheduled' || i.status === 'new');

  return (
    <>
      <Toaster position="top-right" richColors />
      {admissionFor && <AdmissionPanel inquiry={admissionFor} onClose={() => setAdmissionFor(null)} />}
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/receptionist" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Admissions</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Admissions</h1>
              <p className="text-sm text-slate-500 mt-0.5">{admitted.length} admitted · {pending.length} pending</p>
            </div>
          </div>
          <button onClick={() => toast.info('New admission form — coming soon')} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            New Admission
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Class Applied</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Date</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                </tr>
              </thead>
              <tbody>
                {INQUIRIES.slice(0, 8).map((inq, i) => (
                  <tr key={inq.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === 7 ? 'border-b-0' : ''}`}>
                    <td className="px-5 py-3.5">
                      <p className="font-semibold text-slate-800">{inq.studentName}</p>
                      <p className="text-xs text-slate-400">{inq.parentName}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 hidden md:table-cell">{inq.classSeeking}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs hidden lg:table-cell">{inq.date}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        inq.status === 'admitted' ? 'bg-green-100 text-green-700' :
                        inq.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                        inq.status === 'new' ? 'bg-amber-100 text-amber-700' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {inq.status !== 'admitted' && (
                        <button onClick={() => setAdmissionFor(inq)} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 transition-colors">
                          Process
                        </button>
                      )}
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
