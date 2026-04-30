'use client';

import Link from 'next/link';
import { UserCheck, ChevronRight, Plus, Search, Filter, Mail, Phone, GraduationCap } from 'lucide-react';

const STAFF = [
  { id: 1, name: 'Priya Sharma', role: 'Teacher', subject: 'Mathematics', phone: '9876543210', email: 'priya@school.in', status: 'active', joinDate: 'Jun 2019' },
  { id: 2, name: 'Ravi Kumar', role: 'Teacher', subject: 'Science', phone: '9876543211', email: 'ravi@school.in', status: 'active', joinDate: 'Mar 2020' },
  { id: 3, name: 'Anitha Reddy', role: 'Receptionist', subject: '—', phone: '9876543212', email: 'anitha@school.in', status: 'active', joinDate: 'Jan 2021' },
  { id: 4, name: 'Venkat Rao', role: 'Librarian', subject: '—', phone: '9876543213', email: 'venkat@school.in', status: 'active', joinDate: 'Aug 2018' },
  { id: 5, name: 'Sumalatha', role: 'Teacher', subject: 'English', phone: '9876543214', email: 'sumalatha@school.in', status: 'on_leave', joinDate: 'Apr 2022' },
  { id: 6, name: 'Kiran Babu', role: 'Teacher', subject: 'Social Studies', phone: '9876543215', email: 'kiran@school.in', status: 'active', joinDate: 'Jul 2021' },
  { id: 7, name: 'Ravi Kiran', role: 'Accountant', subject: '—', phone: '9876543216', email: 'ravikiran@school.in', status: 'active', joinDate: 'Feb 2020' },
  { id: 8, name: 'Padma Devi', role: 'Teacher', subject: 'Telugu', phone: '9876543217', email: 'padma@school.in', status: 'active', joinDate: 'Jun 2017' },
];

export default function StaffPage() {
  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">Staff</span>
      </nav>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Staff</h1>
              <span className="text-sm font-bold bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-xl">{STAFF.length}</span>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{STAFF.filter(s => s.status === 'active').length} active · {STAFF.filter(s => s.status === 'on_leave').length} on leave</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/staff/add" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Add Staff
          </Link>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Total Staff', value: STAFF.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'Teachers', value: STAFF.filter(s => s.role === 'Teacher').length, color: 'bg-green-50 text-green-700 border-green-200' },
          { label: 'On Leave', value: STAFF.filter(s => s.status === 'on_leave').length, color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { label: 'Support Staff', value: STAFF.filter(s => s.role !== 'Teacher').length, color: 'bg-slate-100 text-slate-600 border-slate-200' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold ${color}`}>
            <span className="text-base font-bold font-heading">{value}</span>
            <span className="font-medium opacity-80">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b border-slate-100">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search staff by name, role..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
          </div>
          <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Subject</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Contact</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Joined</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s, i) => (
                <tr key={s.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === STAFF.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <span className="font-semibold text-slate-800">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600">{s.role}</span>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell">
                    {s.subject !== '—' ? (
                      <div className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        {s.subject}
                      </div>
                    ) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <Phone className="w-3 h-3" />{s.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                        <Mail className="w-3 h-3" />{s.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs hidden lg:table-cell">{s.joinDate}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {s.status === 'active' ? 'Active' : 'On Leave'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
