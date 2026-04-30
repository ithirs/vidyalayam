'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, UserCheck, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

export default function AddStaffPage() {
  const [form, setForm] = useState({ name: '', role: '', subject: '', phone: '', email: '', address: '', qualification: '', joinDate: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Staff member added successfully!');
  };

  const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition"
      />
    </div>
  );

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5 max-w-2xl">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/staff" className="hover:text-blue-600 transition-colors font-medium">Staff</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Add Staff</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
            <UserCheck className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Add Staff Member</h1>
            <p className="text-sm text-slate-500 mt-0.5">Fill in the details to add a new staff member</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field('Full Name', 'name', 'text', 'e.g. Priya Sharma')}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Role</label>
              <select
                value={form.role}
                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition bg-white"
              >
                <option value="">Select role</option>
                <option>Teacher</option>
                <option>Accountant</option>
                <option>Librarian</option>
                <option>Receptionist</option>
                <option>Support Staff</option>
              </select>
            </div>
            {field('Subject (if Teacher)', 'subject', 'text', 'e.g. Mathematics')}
            {field('Phone', 'phone', 'tel', '9876543210')}
            {field('Email', 'email', 'email', 'staff@school.in')}
            {field('Qualification', 'qualification', 'text', 'e.g. B.Ed, M.Sc')}
            {field('Joining Date', 'joinDate', 'date')}
            {field('Address', 'address', 'text', 'Full address')}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
            <Link href="/admin/staff" className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              Add Staff Member
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
