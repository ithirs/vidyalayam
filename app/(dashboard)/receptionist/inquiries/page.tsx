'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { InquiryTable } from '../InquiryTable';
import { AdmissionPanel } from '../AdmissionPanel';
import { useState } from 'react';
import type { Inquiry } from '../data';

export default function ReceptionistInquiriesPage() {
  const [admissionFor, setAdmissionFor] = useState<Inquiry | null>(null);

  return (
    <>
      <Toaster position="top-right" richColors />
      {admissionFor && <AdmissionPanel inquiry={admissionFor} onClose={() => setAdmissionFor(null)} />}
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/receptionist" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Inquiries</span>
        </nav>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Student Inquiries</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage and track admission inquiries</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <InquiryTable onConvert={(inq) => setAdmissionFor(inq)} />
        </div>
      </div>
    </>
  );
}
