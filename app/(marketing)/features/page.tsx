import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, ClipboardList, IndianRupee, BookOpen, UserCheck, Library, MessageSquare, ChartBar as BarChart2, ArrowRight, CircleCheck as CheckCircle2, Smartphone, Globe, Shield, Zap, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Features Overview',
  description: 'Explore all 8 powerful modules of Vidyalaya School ERP — Student Management, Fees, Attendance, Exams, Staff, Library, Communication & Analytics.',
};

const modules = [
  {
    icon: Users,
    label: 'Student Management',
    desc: 'Complete student lifecycle — from admission to graduation. Manage profiles, documents, class assignments, TC issuance and more.',
    features: ['Online admission forms', 'Student profile & documents', 'Class & section assignment', 'Transfer certificate (TC)', 'Sibling linking', 'ID card generation'],
    href: '/modules/student-management',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    icon: ClipboardList,
    label: 'Attendance Tracking',
    desc: 'Mark attendance in seconds. Send instant SMS/WhatsApp alerts to parents. Generate monthly reports with one click.',
    features: ['Daily class-wise attendance', 'Subject-wise attendance', 'Parent SMS/WhatsApp alerts', 'Monthly absentee reports', 'Defaulter list generation', 'Leave management'],
    href: '/modules/attendance',
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    icon: IndianRupee,
    label: 'Fee Management',
    desc: 'Collect fees online or offline. Track dues, generate receipts instantly and send reminders to defaulters automatically.',
    features: ['Online fee payment (UPI/Card)', 'Custom fee heads & structures', 'Instant digital receipts', 'Due amount tracking', 'Automated reminders', 'Fee concession management'],
    href: '/modules/fee-management',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  {
    icon: BookOpen,
    label: 'Exams & Results',
    desc: 'Create exam schedules, enter marks, compute grades and generate beautiful report cards — all without any spreadsheets.',
    features: ['Exam timetable creation', 'Subject-wise marks entry', 'Automatic grade calculation', 'Report card generation', 'Rank & merit list', 'Progress analysis'],
    href: '/modules/exam-results',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    icon: UserCheck,
    label: 'Staff Management',
    desc: 'Manage all your teachers and non-teaching staff — roles, attendance, payslips, and leave in one place.',
    features: ['Staff profiles & roles', 'Staff attendance tracking', 'Leave applications & approval', 'Basic payroll & payslips', 'Document management', 'Performance records'],
    href: '/modules/staff-management',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
  },
  {
    icon: Library,
    label: 'Library System',
    desc: 'Digitize your school library. Manage book inventory, issue and return tracking, and overdue reminders automatically.',
    features: ['Book catalogue management', 'Issue & return tracking', 'Barcode support', 'Overdue reminders', 'Student borrowing history', 'Category & rack management'],
    href: '/modules/library',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
  },
  {
    icon: MessageSquare,
    label: 'Parent Communication',
    desc: 'Keep parents informed at every step — attendance, fees, events, circulars and exam results — via WhatsApp, SMS and app.',
    features: ['WhatsApp notifications', 'SMS broadcasts', 'Push notifications (app)', 'Circular & notice board', 'Event reminders', 'Direct teacher-parent chat'],
    href: '/modules/parent-communication',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
  },
  {
    icon: BarChart2,
    label: 'Analytics Dashboard',
    desc: 'Make data-driven decisions with live dashboards. Track fee collection, attendance trends, academic performance at a glance.',
    features: ['Fee collection dashboard', 'Attendance analytics', 'Academic performance graphs', 'Staff productivity metrics', 'Custom date range reports', 'Export to PDF/Excel'],
    href: '/modules/analytics',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    border: 'border-cyan-200',
  },
];

const platformFeatures = [
  { icon: Smartphone, title: 'Mobile App for Parents', desc: 'Android app for parents to check attendance, fees, results & communicate with teachers.' },
  { icon: Globe, title: 'Multi-Language UI', desc: 'Switch between English, Hindi and Telugu from any screen. More languages coming.' },
  { icon: Shield, title: 'Role-Based Access', desc: 'Admin, Principal, Teacher, Accountant, Librarian — each sees only what they need.' },
  { icon: Zap, title: 'Bulk Operations', desc: 'Promote classes, send bulk SMS, generate all report cards — in one click.' },
];

export default function FeaturesPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_50%,#f97316,transparent_55%)]" />
        <div className="page-container relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-6">
            All Features
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            8 Modules. One Platform. Zero Complexity.
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Everything a school needs to run smoothly — without hiring an IT team or training for weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-gradient-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-md">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/demo" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-200 border border-white/20 hover:border-white/40 transition-all duration-200">
              Watch Demo
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Modules */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="space-y-8">
            {modules.map((mod, idx) => (
              <div
                key={mod.label}
                className={`rounded-2xl border ${mod.border} bg-white p-7 hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-start`}>
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center mb-4`}>
                      <mod.icon className={`w-6 h-6 ${mod.color}`} />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3">{mod.label}</h2>
                    <p className="text-slate-500 text-base leading-relaxed mb-5">{mod.desc}</p>
                    <Link
                      href={mod.href}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${mod.color} hover:opacity-80 transition-opacity`}
                    >
                      Learn more about {mod.label} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="flex-1">
                    <div className={`rounded-xl ${mod.bg} p-5`}>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Key Capabilities</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {mod.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className={`w-4 h-4 ${mod.color} shrink-0`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-slate-50">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Platform</div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 mb-3">Built for Every Role in Your School</h2>
            <p className="text-slate-500">One platform, multiple stakeholders — all working in sync.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformFeatures.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="page-container text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Try All Features Free for 14 Days</h2>
          <p className="text-orange-100 text-lg mb-8">No credit card. No commitment. Full access to every module.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 shadow-md">
            Start Your Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
