'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, CircleCheck as CheckCircle2, Send, Users, TriangleAlert as AlertTriangle, RotateCcw, Calendar, BookOpen, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Toaster, toast } from 'sonner';
import { CLASSES, SUBJECTS, STUDENTS, type MarkStudent } from './data';
import { StudentRow } from './StudentRow';
import { SmsConfirmDialog } from './SmsConfirmDialog';

type Status = 'present' | 'absent' | 'late' | null;

export default function MarkAttendancePage() {
  const [selectedClass, setSelectedClass] = useState(CLASSES[3]);
  const [classDropOpen, setClassDropOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0]);
  const [subjectDropOpen, setSubjectDropOpen] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [students, setStudents] = useState<MarkStudent[]>(() => STUDENTS.slice(0, 40).map((s) => ({ ...s })));
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [alreadyMarkedWarning] = useState(false);

  useEffect(() => {
    const now = new Date();
    setDateStr(now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
    setInputDate(now.toISOString().slice(0, 10));
  }, []);

  const setStatus = (id: string, status: Status) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const setNote = (id: string, note: string) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, note } : s)));
  };

  const markAll = (status: Status) => {
    setStudents((prev) => prev.map((s) => ({ ...s, status })));
  };

  const clearAll = () => {
    setStudents((prev) => prev.map((s) => ({ ...s, status: null, note: '' })));
  };

  const presentCount = students.filter((s) => s.status === 'present').length;
  const absentCount = students.filter((s) => s.status === 'absent').length;
  const lateCount = students.filter((s) => s.status === 'late').length;
  const unmarkedCount = students.filter((s) => s.status === null).length;
  const allMarked = unmarkedCount === 0;
  const total = students.length;

  const handleSubmitClick = () => {
    if (!allMarked) {
      toast.error(`${unmarkedCount} student${unmarkedCount > 1 ? 's' : ''} not yet marked`);
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = (sendSms: boolean) => {
    setShowConfirm(false);
    setSmsSent(sendSms);
    setSubmitted(true);
    if (sendSms) {
      toast.success(`Attendance submitted! SMS sent to ${absentCount} parent${absentCount > 1 ? 's' : ''}.`);
    } else {
      toast.success(`Attendance submitted for ${selectedClass.label}!`);
    }
  };

  const handleClassChange = (cls: typeof CLASSES[0]) => {
    setSelectedClass(cls);
    setClassDropOpen(false);
    setSubmitted(false);
    setSmsSent(false);
    setStudents(STUDENTS.slice(0, cls.studentCount).map((s) => ({ ...s })));
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {showConfirm && (
        <SmsConfirmDialog
          absentCount={absentCount}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <Link
            href="/teacher"
            className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-heading">Mark Attendance</h1>
            <p className="text-sm text-slate-500 mt-0.5">{dateStr}</p>
          </div>
        </div>

        {alreadyMarkedWarning && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <p className="text-sm text-amber-800 font-medium">
              Attendance for <strong>{selectedClass.label}</strong> has already been marked today. Editing will overwrite the previous record.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wide">Session Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Class</label>
              <button
                onClick={() => { setClassDropOpen((o) => !o); setSubjectDropOpen(false); }}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Users className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedClass.label}</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-slate-400 shrink-0 transition-transform', classDropOpen && 'rotate-180')} />
              </button>
              {classDropOpen && (
                <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5 overflow-hidden">
                  {CLASSES.map((cls) => (
                    <button
                      key={cls.id}
                      onClick={() => handleClassChange(cls)}
                      className={cn(
                        'w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-sm transition-colors',
                        selectedClass.id === cls.id
                          ? 'bg-orange-50 text-orange-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      <span>{cls.label}</span>
                      <span className="text-xs text-slate-400">{cls.studentCount} students</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subject</label>
              <button
                onClick={() => { setSubjectDropOpen((o) => !o); setClassDropOpen(false); }}
                className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all bg-white"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{selectedSubject}</span>
                </div>
                <ChevronDown className={cn('w-4 h-4 text-slate-400 shrink-0 transition-transform', subjectDropOpen && 'rotate-180')} />
              </button>
              {subjectDropOpen && (
                <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5">
                  {SUBJECTS.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => { setSelectedSubject(sub); setSubjectDropOpen(false); }}
                      className={cn(
                        'w-full text-left px-3.5 py-2.5 text-sm transition-colors',
                        selectedSubject === sub ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                      )}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium hover:border-orange-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:outline-none transition-all bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl border border-green-200 shadow-card p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">Attendance Submitted!</h2>
            <p className="text-slate-500 text-sm mt-1.5">
              {selectedClass.label} — {selectedSubject} — {inputDate}
            </p>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-slate-100 w-full justify-center">
              <div className="text-center">
                <p className="text-xl font-bold text-green-600 tabular-nums">{presentCount}</p>
                <p className="text-xs text-slate-500">Present</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-red-500 tabular-nums">{absentCount}</p>
                <p className="text-xs text-slate-500">Absent</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-amber-500 tabular-nums">{lateCount}</p>
                <p className="text-xs text-slate-500">Late</p>
              </div>
            </div>
            {smsSent && absentCount > 0 && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 text-sm text-blue-700 font-medium">
                SMS sent to {absentCount} parent{absentCount > 1 ? 's' : ''}
              </div>
            )}
            <button
              onClick={() => { setSubmitted(false); clearAll(); }}
              className="mt-5 flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Mark Another Class
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-slate-600">Present: <strong className="text-slate-800 tabular-nums">{presentCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span className="text-slate-600">Absent: <strong className="text-slate-800 tabular-nums">{absentCount}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="text-slate-600">Late: <strong className="text-slate-800 tabular-nums">{lateCount}</strong></span>
                  </div>
                  {unmarkedCount > 0 && (
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                      <span className="text-slate-500">Unmarked: <strong className="tabular-nums">{unmarkedCount}</strong></span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markAll('present')}
                    className="text-xs font-semibold text-green-600 hover:text-green-700 px-3 py-1.5 rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
                  >
                    Mark All Present
                  </button>
                  <button
                    onClick={clearAll}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="p-3 space-y-2 max-h-[520px] overflow-y-auto">
                {students.map((student, i) => (
                  <StudentRow
                    key={student.id}
                    student={student}
                    index={i}
                    onStatusChange={setStatus}
                    onNoteChange={setNote}
                  />
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 bg-white/90 backdrop-blur-md border border-slate-200 rounded-2xl shadow-modal p-4 flex items-center justify-between gap-4">
              <div className="text-sm text-slate-600">
                <span className="font-bold text-slate-900 tabular-nums">{presentCount + absentCount + lateCount}</span>
                <span className="text-slate-400">/{total} marked</span>
                {!allMarked && (
                  <span className="ml-2 text-xs text-amber-600 font-medium">({unmarkedCount} remaining)</span>
                )}
              </div>
              <button
                onClick={handleSubmitClick}
                className={cn(
                  'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-150',
                  allMarked
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-sm hover:shadow-md'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                )}
              >
                <Send className="w-4 h-4" />
                Submit Attendance ({presentCount + absentCount + lateCount}/{total})
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
