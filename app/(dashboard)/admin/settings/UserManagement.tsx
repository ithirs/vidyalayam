'use client';

import { useState } from 'react';
import { Plus, Pencil, KeyRound, MoveVertical as MoreVertical, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { STAFF_USERS, ROLE_CONFIG, type StaffUser } from './data';

const ROLES: StaffUser['role'][] = ['teacher', 'accountant', 'receptionist', 'librarian'];

function AddStaffModal({ onClose, onAdd }: { onClose: () => void; onAdd: (u: StaffUser) => void }) {
  const [form, setForm] = useState({ name: '', role: 'teacher' as StaffUser['role'], email: '', phone: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const COLORS = ['bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-teal-100 text-teal-600'];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-md p-5 space-y-4 animate-scale-in">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 font-heading">Add Staff Member</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">✕</button>
        </div>
        {[
          { k: 'name', label: 'Full Name *', type: 'text', placeholder: 'e.g. Priya Sharma' },
          { k: 'email', label: 'Email Address *', type: 'email', placeholder: 'email@school.edu' },
          { k: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
        ].map(({ k, label, type, placeholder }) => (
          <div key={k}>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
            <input type={type} value={(form as Record<string, string>)[k]} onChange={set(k)} placeholder={placeholder} className={inputCls} />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Role *</label>
          <select value={form.role} onChange={set('role')} className={inputCls}>
            {ROLES.map((r) => <option key={r} value={r}>{ROLE_CONFIG[r].label}</option>)}
          </select>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
          <button
            onClick={() => {
              if (!form.name || !form.email) return;
              onAdd({ id: `u${Date.now()}`, ...form, status: 'active', lastLogin: '', avatarInitials: form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(), avatarColor: COLORS[0] });
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            Add Staff
          </button>
        </div>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [staff, setStaff] = useState<StaffUser[]>(STAFF_USERS);
  const [showAdd, setShowAdd] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtered = filterRole === 'all' ? staff : staff.filter((u) => u.role === filterRole);

  const toggleStatus = (id: string) => {
    setStaff((prev) => prev.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
    const u = staff.find((u) => u.id === id);
    toast.success(`${u?.name} marked as ${u?.status === 'active' ? 'inactive' : 'active'}`);
  };

  const resetPassword = (name: string) => toast.success(`Password reset link sent to ${name}`);

  return (
    <>
      {showAdd && (
        <AddStaffModal
          onClose={() => setShowAdd(false)}
          onAdd={(u) => { setStaff((prev) => [...prev, u]); toast.success(`${u.name} added`); }}
        />
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-700 font-heading">Staff Accounts</h3>
            <p className="text-xs text-slate-400 mt-0.5">{staff.filter((u) => u.status === 'active').length} active · {staff.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
              {(['all', ...ROLES] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setFilterRole(r)}
                  className={cn('px-2.5 py-1 rounded-lg text-xs font-semibold transition-all', filterRole === r ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700')}
                >
                  {r === 'all' ? 'All' : ROLE_CONFIG[r].label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
            >
              <UserPlus className="w-4 h-4" />
              Add Staff
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Staff Member</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Contact</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Last Login</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0', u.avatarColor)}>
                        {u.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', ROLE_CONFIG[u.role].color)}>
                      {ROLE_CONFIG[u.role].label}
                    </span>
                  </td>
                  <td className="px-3 py-3 hidden md:table-cell text-xs text-slate-500">{u.phone}</td>
                  <td className="px-3 py-3 text-center">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={cn(
                        'relative inline-flex h-5 w-9 rounded-full transition-colors duration-200 focus:outline-none',
                        u.status === 'active' ? 'bg-green-500' : 'bg-slate-300'
                      )}
                    >
                      <span className={cn(
                        'inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5',
                        u.status === 'active' ? 'translate-x-4.5' : 'translate-x-0.5'
                      )} />
                    </button>
                    <div className={cn('text-[10px] font-medium mt-0.5', u.status === 'active' ? 'text-green-600' : 'text-slate-400')}>
                      {u.status === 'active' ? 'Active' : 'Inactive'}
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell text-xs text-slate-400">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => resetPassword(u.name)}
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
                      >
                        <KeyRound className="w-3 h-3" />
                        <span className="hidden sm:inline">Reset</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              <div className="text-sm">No staff members found</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
