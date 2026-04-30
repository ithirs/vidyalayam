'use client';

import { useState } from 'react';
import { MessageSquareText, FileCheck, UserPlus, TrendingUp, Users, FolderOpen, School } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { INQUIRIES, DOCUMENT_STUDENTS, CLASS_VACANCIES, type Inquiry } from './data';
import { InquiryTable } from './InquiryTable';
import { AdmissionPanel } from './AdmissionPanel';
import { ClassVacancyGrid } from './ClassVacancyGrid';
import { DocumentTracker } from './DocumentTracker';

const admitted = INQUIRIES.filter((i) => i.status === 'admitted').length;
const conversion = Math.round((admitted / INQUIRIES.length) * 100);
const todayInquiries = INQUIRIES.filter((i) => ['12 Jan', '11 Jan'].includes(i.date)).length;
const totalVacant = CLASS_VACANCIES.reduce((s, c) => s + (c.totalSeats - c.filled), 0);
const classesWithVacancy = CLASS_VACANCIES.filter((c) => c.filled < c.totalSeats).length;

const STATS = [
  {
    label: 'Total Inquiries',
    value: INQUIRIES.length,
    sub: 'This month',
    icon: MessageSquareText,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    valueCls: 'text-blue-600',
    trend: '+12%',
    trendUp: true,
  },
  {
    label: 'Converted to Admission',
    value: admitted,
    sub: `${conversion}% conversion rate`,
    icon: UserPlus,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    valueCls: 'text-green-600',
    trend: '+5%',
    trendUp: true,
  },
  {
    label: 'Pending Documents',
    value: DOCUMENT_STUDENTS.length,
    sub: 'Students incomplete',
    icon: FileCheck,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    valueCls: 'text-amber-600',
    trend: null,
    trendUp: false,
  },
  {
    label: 'Classes with Vacancies',
    value: classesWithVacancy,
    sub: `${totalVacant} seats available`,
    icon: School,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-500',
    valueCls: 'text-teal-600',
    trend: null,
    trendUp: false,
  },
];

type ActiveTab = 'inquiries' | 'vacancies' | 'documents';

export default function ReceptionistDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inquiries');
  const [admissionFor, setAdmissionFor] = useState<Inquiry | null>(null);

  const tabs: { id: ActiveTab; label: string; icon: typeof MessageSquareText; badge?: number }[] = [
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquareText, badge: INQUIRIES.filter((i) => i.status === 'new').length },
    { id: 'vacancies', label: 'Vacancies', icon: School },
    { id: 'documents', label: 'Documents', icon: FolderOpen, badge: DOCUMENT_STUDENTS.length },
  ];

  return (
    <>
      <Toaster position="top-right" richColors />
      {admissionFor && <AdmissionPanel inquiry={admissionFor} onClose={() => setAdmissionFor(null)} />}

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Admissions & Inquiries</h1>
            <p className="text-sm text-slate-500 mt-1">Manage student inquiries, admissions, and document collection</p>
          </div>
          {/* Today's quick-stats banner */}
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: "Today's Inquiries", value: todayInquiries, color: 'bg-blue-50 border-blue-200 text-blue-800' },
              { label: 'Pending Docs', value: DOCUMENT_STUDENTS.length, color: 'bg-amber-50 border-amber-200 text-amber-800' },
              { label: 'New Admissions', value: 5, color: 'bg-green-50 border-green-200 text-green-800' },
            ].map(({ label, value, color }) => (
              <div key={label} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold', color)}>
                <span className="text-base font-bold tabular-nums">{value}</span>
                <span className="opacity-70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, sub, icon: Icon, iconBg, iconColor, valueCls, trend, trendUp }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
                  <Icon className={cn('w-5 h-5', iconColor)} />
                </div>
                {trend && (
                  <span className={cn('text-xs font-bold flex items-center gap-0.5', trendUp ? 'text-green-600' : 'text-red-500')}>
                    <TrendingUp className="w-3 h-3" />
                    {trend}
                  </span>
                )}
              </div>
              <p className={cn('text-3xl font-bold font-heading mt-3 tabular-nums', valueCls)}>{value}</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Conversion highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white flex items-center justify-between gap-4 flex-wrap shadow-md">
          <div>
            <p className="text-sm text-blue-100 font-medium">This Month's Conversion Rate</p>
            <div className="flex items-end gap-3 mt-1">
              <span className="text-4xl font-bold font-heading">{conversion}%</span>
              <span className="text-blue-200 text-sm pb-1.5">{admitted} of {INQUIRIES.length} inquiries admitted</span>
            </div>
          </div>
          <div className="w-24 h-24 relative shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="white" strokeWidth="3"
                strokeDasharray={`${conversion} ${100 - conversion}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{conversion}%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="flex border-b border-slate-100">
            {tabs.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all relative',
                  activeTab === id
                    ? 'text-blue-600 bg-blue-50/50'
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
                {badge !== undefined && badge > 0 && (
                  <span className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                    activeTab === id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                  )}>
                    {badge}
                  </span>
                )}
                {activeTab === id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'inquiries' && (
              <InquiryTable onConvert={(inq) => setAdmissionFor(inq)} />
            )}
            {activeTab === 'vacancies' && <ClassVacancyGrid />}
            {activeTab === 'documents' && <DocumentTracker />}
          </div>
        </div>
      </div>
    </>
  );
}
