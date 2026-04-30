'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEARCH_STUDENTS, type StudentSearchResult } from './data';

interface Props {
  onSelect: (student: StudentSearchResult | null) => void;
  selected: StudentSearchResult | null;
}

export function StudentSearch({ onSelect, selected }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const results = query.trim().length >= 1
    ? SEARCH_STUDENTS.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(query.toLowerCase()) ||
        s.parentPhone.includes(query) ||
        s.admissionNo.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (s: StudentSearchResult) => {
    onSelect(s);
    setQuery('');
    setOpen(false);
  };

  const handleClear = () => {
    onSelect(null);
    setQuery('');
  };

  if (selected) {
    return (
      <div className="relative bg-white rounded-2xl border-2 border-orange-200 shadow-card p-4 flex items-center gap-4">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0', selected.avatarColor)}>
          {selected.avatarInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 font-heading text-base">{selected.name}</div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
            <span className="text-sm text-slate-500">{selected.className}-{selected.section}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-500">Roll: {selected.rollNo}</span>
            <span className="text-slate-300">•</span>
            <span className="text-sm text-slate-500">Adm: {selected.admissionNo}</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5">Parent: {selected.parentPhone}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-slate-500 mb-0.5">Pending</div>
          <div className="text-lg font-bold text-red-500">₹{selected.pendingTotal.toLocaleString('en-IN')}</div>
        </div>
        <button
          onClick={handleClear}
          className="ml-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search student by name, roll number, or parent phone..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none text-sm text-slate-800 placeholder:text-slate-400 bg-white shadow-card transition-all font-medium"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-modal z-[200] overflow-hidden">
          {results.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-left border-b border-slate-50 last:border-0"
            >
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0', s.avatarColor)}>
                {s.avatarInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-slate-800">{s.name}</div>
                <div className="text-xs text-slate-500">{s.className}-{s.section} · Roll: {s.rollNo}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-red-500 font-semibold">₹{s.pendingTotal.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-400">pending</div>
              </div>
            </button>
          ))}
        </div>
      )}
      {open && query.trim().length >= 1 && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-modal z-[200] px-4 py-6 text-center text-sm text-slate-500">
          No students found for "{query}"
        </div>
      )}
    </div>
  );
}
