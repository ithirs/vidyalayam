'use client';

import { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MarkStudent } from './data';

type Status = 'present' | 'absent' | 'late' | null;

interface StudentRowProps {
  student: MarkStudent;
  index: number;
  onStatusChange: (id: string, status: Status) => void;
  onNoteChange: (id: string, note: string) => void;
}

export function StudentRow({ student, index, onStatusChange, onNoteChange }: StudentRowProps) {
  const [noteOpen, setNoteOpen] = useState(false);

  const btnBase = 'w-9 h-9 rounded-xl text-xs font-bold border-2 transition-all duration-150 flex items-center justify-center';

  return (
    <div className={cn(
      'group rounded-xl border transition-all duration-150 overflow-hidden',
      student.status === 'present' ? 'border-green-200 bg-green-50/40' :
      student.status === 'absent' ? 'border-red-200 bg-red-50/40' :
      student.status === 'late' ? 'border-amber-200 bg-amber-50/40' :
      'border-slate-200 bg-white hover:border-slate-300'
    )}>
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-[11px] font-bold text-slate-400 w-6 shrink-0 tabular-nums text-right">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0',
          student.avatarColor
        )}>
          {student.initials}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate">{student.name}</p>
          <p className="text-[11px] text-slate-400">Roll #{student.rollNo}</p>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onStatusChange(student.id, student.status === 'present' ? null : 'present')}
            className={cn(
              btnBase,
              student.status === 'present'
                ? 'bg-green-500 border-green-500 text-white shadow-sm'
                : 'border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50'
            )}
          >
            P
          </button>
          <button
            onClick={() => onStatusChange(student.id, student.status === 'absent' ? null : 'absent')}
            className={cn(
              btnBase,
              student.status === 'absent'
                ? 'bg-red-500 border-red-500 text-white shadow-sm'
                : 'border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-600 hover:bg-red-50'
            )}
          >
            A
          </button>
          <button
            onClick={() => onStatusChange(student.id, student.status === 'late' ? null : 'late')}
            className={cn(
              btnBase,
              student.status === 'late'
                ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                : 'border-slate-200 text-slate-500 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50'
            )}
          >
            L
          </button>
          <button
            onClick={() => setNoteOpen((o) => !o)}
            className={cn(
              'w-9 h-9 rounded-xl border-2 transition-all duration-150 flex items-center justify-center ml-1',
              student.note
                ? 'border-blue-300 bg-blue-50 text-blue-500'
                : 'border-slate-200 text-slate-400 opacity-0 group-hover:opacity-100 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {noteOpen && (
        <div className="px-4 pb-3">
          <input
            type="text"
            value={student.note}
            onChange={(e) => onNoteChange(student.id, e.target.value)}
            placeholder="Add a note (e.g. Medical leave, Late arrival reason...)"
            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
          />
        </div>
      )}
    </div>
  );
}
