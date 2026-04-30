'use client';

import { useState, useMemo } from 'react';
import {
  Phone, MessageCircle, UserPlus, StickyNote, Plus, Search,
  ChevronDown, X, Filter, SlidersHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { INQUIRIES, STATUS_CONFIG, type Inquiry, type InquiryStatus } from './data';
import { toast } from 'sonner';

const CLASSES = ['All Classes', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
const STATUSES: (InquiryStatus | 'all')[] = ['all', 'new', 'contacted', 'scheduled', 'admitted', 'not_interested'];

interface InquiryTableProps {
  onConvert: (inquiry: Inquiry) => void;
}

function NotesModal({ inquiry, onClose }: { inquiry: Inquiry; onClose: () => void }) {
  const [note, setNote] = useState(inquiry.notes);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 font-heading">Notes — {inquiry.studentName}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-4 h-4" /></button>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="w-full px-3.5 py-3 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700"
          placeholder="Add notes here…"
        />
        <div className="flex gap-2 mt-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={() => { toast.success('Note saved'); onClose(); }} className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-semibold transition-colors">Save Note</button>
        </div>
      </div>
    </div>
  );
}

function AddInquiryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-900 font-heading text-lg">New Inquiry</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-4 h-4" /></button>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Parent / Guardian Name', placeholder: 'Full name', type: 'text' },
            { label: "Student's Name", placeholder: 'Full name', type: 'text' },
            { label: 'Phone Number', placeholder: '10-digit mobile', type: 'tel' },
          ].map(({ label, placeholder, type }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
              <input type={type} placeholder={placeholder}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Class Seeking</label>
            <select className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700 bg-white">
              {CLASSES.filter(c => c !== 'All Classes').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Source</label>
            <select className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700 bg-white">
              {['Walk-in', 'Website', 'Referral', 'Social Media', 'Newspaper'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Notes</label>
            <textarea rows={3} placeholder="Any initial notes…"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700" />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={() => { toast.success('Inquiry added successfully'); onClose(); }}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors">Add Inquiry</button>
        </div>
      </div>
    </div>
  );
}

export function InquiryTable({ onConvert }: InquiryTableProps) {
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | 'all'>('all');
  const [classFilter, setClassFilter] = useState('All Classes');
  const [search, setSearch] = useState('');
  const [notesFor, setNotesFor] = useState<Inquiry | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => INQUIRIES.filter((i) => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (classFilter !== 'All Classes' && i.classSeeking !== classFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return i.parentName.toLowerCase().includes(q) || i.studentName.toLowerCase().includes(q) || i.phone.includes(q);
    }
    return true;
  }), [statusFilter, classFilter, search]);

  return (
    <>
      {notesFor && <NotesModal inquiry={notesFor} onClose={() => setNotesFor(null)} />}
      {showAdd && <AddInquiryModal onClose={() => setShowAdd(false)} />}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-bold text-slate-900 font-heading">Student Inquiries</h3>
              <p className="text-xs text-slate-400 mt-0.5">{filtered.length} of {INQUIRIES.length} inquiries</p>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors shadow-sm active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Add Inquiry
            </button>
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or phone…"
                className="w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 text-slate-700"
              />
            </div>
            <button
              onClick={() => setShowFilters((o) => !o)}
              className={cn('flex items-center gap-1.5 px-3 py-2 rounded-xl border text-sm font-medium transition-colors',
                showFilters ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50')}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
              {(statusFilter !== 'all' || classFilter !== 'All Classes') && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              )}
            </button>
          </div>

          {showFilters && (
            <div className="flex gap-2 mt-2 flex-wrap">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as InquiryStatus | 'all')}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:border-blue-300">
                {STATUSES.map(s => <option key={s} value={s}>{s === 'all' ? 'All Statuses' : STATUS_CONFIG[s].label}</option>)}
              </select>
              <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:border-blue-300">
                {CLASSES.map(c => <option key={c}>{c}</option>)}
              </select>
              {(statusFilter !== 'all' || classFilter !== 'All Classes') && (
                <button onClick={() => { setStatusFilter('all'); setClassFilter('All Classes'); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs rounded-xl text-red-500 border border-red-100 hover:bg-red-50 transition-colors">
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          )}
        </div>

        {/* Status pill tabs */}
        <div className="flex gap-1.5 px-5 py-3 border-b border-slate-100 overflow-x-auto scrollbar-none">
          {STATUSES.map((s) => {
            const cfg = s === 'all' ? null : STATUS_CONFIG[s];
            const isActive = statusFilter === s;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 border',
                  isActive
                    ? s === 'all' ? 'bg-slate-800 text-white border-slate-800' : `${cfg!.bg} ${cfg!.text} border-current`
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                )}>
                {cfg && <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />}
                {s === 'all' ? 'All' : cfg!.label}
              </button>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Parent Name', 'Student', 'Class', 'Phone', 'Date', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-sm text-slate-400">No inquiries match your filters.</td></tr>
              ) : filtered.map((inq) => {
                const cfg = STATUS_CONFIG[inq.status];
                return (
                  <tr key={inq.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                          {inq.parentName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">{inq.parentName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 font-medium">{inq.studentName}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">{inq.classSeeking}</span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 tabular-nums font-medium">{inq.phone}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-400 whitespace-nowrap">{inq.date}</td>
                    <td className="px-4 py-3.5">
                      <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', cfg.bg, cfg.text, 'border-current/20')}>
                        <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toast.info(`Calling ${inq.parentName}…`)}
                          className="p-2 rounded-xl text-slate-400 hover:bg-green-50 hover:text-green-600 transition-colors" title="Call">
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toast.info(`Opening WhatsApp for ${inq.phone}…`)}
                          className="p-2 rounded-xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-colors" title="WhatsApp">
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setNotesFor(inq)}
                          className="p-2 rounded-xl text-slate-400 hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Notes">
                          <StickyNote className="w-3.5 h-3.5" />
                        </button>
                        {inq.status !== 'admitted' && inq.status !== 'not_interested' && (
                          <button onClick={() => onConvert(inq)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors" title="Convert to Admission">
                            <UserPlus className="w-3 h-3" />
                            Admit
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
