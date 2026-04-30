'use client';

import Link from 'next/link';
import { ChevronRight, Shield, Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const ROLES = [
  { name: 'Admin', count: 1, permissions: ['Manage students', 'Manage staff', 'View reports', 'Manage fees', 'Settings'], color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'Teacher', count: 24, permissions: ['Mark attendance', 'Enter marks', 'Assign homework', 'View students'], color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Accountant', count: 2, permissions: ['Collect fees', 'Generate receipts', 'View reports', 'Manage fee structure'], color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { name: 'Receptionist', count: 3, permissions: ['Manage admissions', 'Handle inquiries', 'Track documents', 'View vacancies'], color: 'bg-rose-50 text-rose-700 border-rose-200' },
  { name: 'Librarian', count: 2, permissions: ['Manage books', 'Issue/return books', 'Track overdue', 'Add to catalog'], color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Parent', count: 980, permissions: ['View child info', 'Pay fees', 'View attendance', 'View report cards'], color: 'bg-teal-50 text-teal-700 border-teal-200' },
];

export default function StaffRolesPage() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/staff" className="hover:text-blue-600 transition-colors font-medium">Staff</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Roles & Permissions</span>
        </nav>

        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Roles & Permissions</h1>
              <p className="text-sm text-slate-500 mt-0.5">Manage system roles and their access permissions</p>
            </div>
          </div>
          <button
            onClick={() => toast.info('Custom role creation coming soon')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ROLES.map(role => (
            <div key={role.name} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-xl border ${role.color}`}>{role.name}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5">{role.count} {role.count === 1 ? 'user' : 'users'} assigned</p>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => toast.info('Edit role — coming soon')} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Permissions</p>
                {role.permissions.map(p => (
                  <div key={p} className="flex items-center gap-2 text-xs text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                    {p}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
