'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, CircleCheck as CheckCircle2, Users, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ATTENDANCE_CLASSES, ATTENDANCE_STUDENTS, type AttendanceStudent } from './data';
import { toast } from 'sonner';

type AttendanceStatus = 'present' | 'absent' | 'late';

function StatusButton({
  label,
  value,
  current,
  onClick,
}: {
  label: string;
  value: AttendanceStatus;
  current: AttendanceStudent['status'];
  onClick: () => void;
}) {
  const styles: Record<AttendanceStatus, string> = {
    present: current === 'present'
      ? 'bg-green-500 text-white border-green-500 shadow-sm'
      : 'border-slate-200 text-slate-500 hover:border-green-400 hover:text-green-600 hover:bg-green-50',
    absent: current === 'absent'
      ? 'bg-red-500 text-white border-red-500 shadow-sm'
      : 'border-slate-200 text-slate-500 hover:border-red-400 hover:text-red-600 hover:bg-red-50',
    late: current === 'late'
      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
      : 'border-slate-200 text-slate-500 hover:border-orange-400 hover:text-orange-600 hover:bg-orange-50',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all duration-150',
        styles[value]
      )}
    >
      {label}
    </button>
  );
}

export function AttendanceMarking() {
  const [selectedClass, setSelectedClass] = useState(ATTENDANCE_CLASSES[0]);
  const [classDropOpen, setClassDropOpen] = useState(false);
  const [students, setStudents] = useState<AttendanceStudent[]>(() =>
    ATTENDANCE_STUDENTS.map((s) => ({ ...s }))
  );
  const [submitted, setSubmitted] = useState(false);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }));
  }, []);

  const setStatus = (id: string, status: AttendanceStatus) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const selectAll = (status: AttendanceStatus) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const clearAll = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: null })));
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const unmarked = students.filter((s) => s.status === null).length;
  const allMarked = unmarked === 0;

  const handleSubmit = () => {
    if (!allMarked) {
      toast.error(`${unmarked} student(s) not yet marked`);
      return;
    }
    setSubmitted(true);
    toast.success(`Attendance submitted for ${selectedClass}!`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card flex flex-col h-full">
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h3 className="font-bold text-slate-900 font-heading text-sm">Mark Attendance</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{dateStr}</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setClassDropOpen((o) => !o)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              {selectedClass}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            {classDropOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-40 z-50 py-1">
                {ATTENDANCE_CLASSES.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setClassDropOpen(false);
                      setSubmitted(false);
                      clearAll();
                    }}
                    className={cn(
                      'w-full text-left px-3 py-2 text-sm transition-colors',
                      selectedClass === cls
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-slate-700 hover:bg-slate-50'
                    )}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-slate-500">Present: <strong className="text-slate-800">{presentCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-500">Absent: <strong className="text-slate-800">{absentCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-slate-500">Late: <strong className="text-slate-800">{lateCount}</strong></span>
          </div>
          {unmarked > 0 && (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-slate-300" />
              <span className="text-slate-400">Unmarked: <strong>{unmarked}</strong></span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => selectAll('present')}
            className="text-xs font-medium text-green-600 hover:text-green-700 px-2.5 py-1 rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
          >
            All Present
          </button>
          <button
            onClick={clearAll}
            className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {submitted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-center">
            <p className="font-bold text-slate-900 font-heading">Attendance Submitted!</p>
            <p className="text-sm text-slate-500 mt-1">
              {presentCount}/{students.length} present &bull; {absentCount} absent &bull; {lateCount} late
            </p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-2 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
          >
            Edit attendance
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto max-h-[320px] px-5 py-3 space-y-1.5">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between gap-3 py-2 border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 w-5 shrink-0 tabular-nums">
                    {student.rollNo}
                  </span>
                  <p className="text-sm text-slate-800 font-medium truncate">{student.name}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <StatusButton label="P" value="present" current={student.status} onClick={() => setStatus(student.id, 'present')} />
                  <StatusButton label="A" value="absent" current={student.status} onClick={() => setStatus(student.id, 'absent')} />
                  <StatusButton label="L" value="late" current={student.status} onClick={() => setStatus(student.id, 'late')} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-slate-100">
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={cn(
                'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
                allMarked
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-brand-sm hover:shadow-brand'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              )}
            >
              <Send className="w-4 h-4" />
              Submit Attendance
              {!allMarked && <span className="text-xs opacity-70">({unmarked} unmarked)</span>}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
