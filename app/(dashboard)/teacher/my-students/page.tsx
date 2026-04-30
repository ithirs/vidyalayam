'use client';

import Link from 'next/link';
import { ChevronRight, Users, Search } from 'lucide-react';
import { useState } from 'react';

const STUDENTS = [
  { roll: 'SR-801', name: 'Aditya Kumar', class: '8-A', attendance: 92, lastTest: 88, status: 'active' },
  { roll: 'SR-802', name: 'Bhavana Reddy', class: '8-A', attendance: 96, lastTest: 95, status: 'active' },
  { roll: 'SR-803', name: 'Chetan Singh', class: '8-A', attendance: 78, lastTest: 72, status: 'at_risk' },
  { roll: 'SR-804', name: 'Deepika Rao', class: '8-A', attendance: 88, lastTest: 81, status: 'active' },
  { roll: 'SR-901', name: 'Eshan Nair', class: '9-B', attendance: 94, lastTest: 90, status: 'active' },
  { roll: 'SR-902', name: 'Farida Begum', class: '9-B', attendance: 85, lastTest: 79, status: 'active' },
  { roll: 'SR-903', name: 'Ganesh Patil', class: '9-B', attendance: 70, lastTest: 55, status: 'at_risk' },
  { roll: 'SR-1001', name: 'Harini Suresh', class: '10-A', attendance: 98, lastTest: 97, status: 'active' },
];

export default function MyStudentsPage() {
  const [search, setSearch] = useState('');
  const filtered = STUDENTS.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search));

  return (
    <div className="space-y-5">
      <nav className="flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/teacher" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold">My Students</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
          <Users className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">My Students</h1>
          <p className="text-sm text-slate-500 mt-0.5">{STUDENTS.length} students across your classes</p>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        {[
          { label: 'Total Students', value: STUDENTS.length, color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'At Risk', value: STUDENTS.filter(s => s.status === 'at_risk').length, color: 'bg-red-50 text-red-700 border-red-200' },
          { label: 'Avg Attendance', value: `${Math.round(STUDENTS.reduce((s, st) => s + st.attendance, 0) / STUDENTS.length)}%`, color: 'bg-green-50 text-green-700 border-green-200' },
        ].map(({ label, value, color }) => (
          <div key={label} className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold ${color}`}>
            <span className="text-base font-bold font-heading">{value}</span>
            <span className="font-medium opacity-80">{label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student..." className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Class</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Attendance</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Last Test</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.roll} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${i === filtered.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {s.name.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.roll}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600">{s.class}</td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className={`font-semibold ${s.attendance >= 85 ? 'text-green-600' : s.attendance >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{s.attendance}%</span>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    <span className={`font-semibold ${s.lastTest >= 80 ? 'text-green-600' : s.lastTest >= 60 ? 'text-amber-600' : 'text-red-600'}`}>{s.lastTest}/100</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {s.status === 'active' ? 'Good' : 'At Risk'}
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
