import type { Metadata } from 'next';
import Link from 'next/link';
import { Users, ClipboardList, IndianRupee, BookOpen, UserCheck, Library, MessageSquare, ChartBar as BarChart2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'All Modules',
  description: 'Explore all 8 modules of Vidyalaya School ERP — built for Indian schools.',
};

const modules = [
  { icon: Users, label: 'Student Management', desc: 'Admissions, profiles, promotions & TC.', href: '/modules/student-management', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { icon: ClipboardList, label: 'Attendance Tracking', desc: 'Daily, subject-wise & parent alerts.', href: '/modules/attendance', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' },
  { icon: IndianRupee, label: 'Fee Management', desc: 'Online collection, dues & receipts.', href: '/modules/fee-management', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  { icon: BookOpen, label: 'Exams & Results', desc: 'Marks entry, grades & report cards.', href: '/modules/exam-results', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { icon: UserCheck, label: 'Staff Management', desc: 'Roles, payroll & leave tracking.', href: '/modules/staff-management', color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' },
  { icon: Library, label: 'Library System', desc: 'Catalogue, issue & return log.', href: '/modules/library', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  { icon: MessageSquare, label: 'Parent Communication', desc: 'WhatsApp, SMS & push alerts.', href: '/modules/parent-communication', color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-200' },
  { icon: BarChart2, label: 'Analytics', desc: 'Dashboards & smart insights.', href: '/modules/analytics', color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-200' },
];

export default function ModulesPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">All Modules</div>
          <h1 className="font-heading text-4xl font-bold text-slate-900 mb-4">Every Tool Your School Needs</h1>
          <p className="text-slate-500 text-lg">8 integrated modules. One platform. Built for Bharat.</p>
        </div>
      </section>
      <section className="py-20">
        <div className="page-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`group bg-white rounded-2xl p-6 border ${mod.border} hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <mod.icon className={`w-6 h-6 ${mod.color}`} />
                </div>
                <h2 className="font-heading font-semibold text-slate-900 mb-2">{mod.label}</h2>
                <p className="text-slate-500 text-sm mb-4">{mod.desc}</p>
                <span className={`inline-flex items-center gap-1 text-sm font-medium ${mod.color}`}>
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
