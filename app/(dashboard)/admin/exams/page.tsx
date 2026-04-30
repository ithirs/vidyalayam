'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Users, CircleCheck as CheckCircle, FileText, ChevronRight, ChartBar as BarChart3 } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { CreateExamModal } from './CreateExamModal';
import { TimetableView } from './TimetableView';
import { EXAMS, STATUS_CONFIG, TYPE_LABELS, EXAM_COLORS, type Exam } from './data';

const STAT_ICONS = { upcoming: Calendar, ongoing: BarChart3, marks_entry: FileText, completed: CheckCircle };

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>(EXAMS);
  const [showCreate, setShowCreate] = useState(false);
  const [timetableExam, setTimetableExam] = useState<Exam | null>(null);

  const handleCreate = (name: string) => {
    toast.success(`Exam "${name}" created successfully`);
    setShowCreate(false);
  };

  const stats = {
    upcoming: exams.filter((e) => e.status === 'upcoming').length,
    ongoing: exams.filter((e) => e.status === 'ongoing').length,
    marks_entry: exams.filter((e) => e.status === 'marks_entry').length,
    completed: exams.filter((e) => e.status === 'completed').length,
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {showCreate && <CreateExamModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}

      <div className="space-y-6 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Exams</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage exam schedules, timetables, and assessment tracking</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            <Plus className="w-4 h-4" />
            Create Exam
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.entries(stats) as [keyof typeof stats, number][]).map(([key, count]) => {
            const cfg = STATUS_CONFIG[key];
            const Icon = STAT_ICONS[key];
            return (
              <div key={key} className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 flex items-center gap-4">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0', cfg.color)}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black font-heading text-slate-900">{count}</div>
                  <div className="text-xs text-slate-500">{cfg.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {exams.map((exam) => {
            const cfg = STATUS_CONFIG[exam.status];
            const colors = EXAM_COLORS[exam.color] || EXAM_COLORS.orange;
            const progress = exam.totalStudents > 0 ? (exam.marksEntered / exam.totalStudents) * 100 : 0;

            return (
              <div
                key={exam.id}
                className={cn('rounded-2xl border-2 shadow-card overflow-hidden transition-all hover:shadow-md', colors.card)}
              >
                <div className={cn('bg-gradient-to-r px-5 py-4 text-white', colors.header)}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-0.5">
                        {TYPE_LABELS[exam.type]}
                      </div>
                      <h3 className="text-lg font-black font-heading leading-tight">{exam.name}</h3>
                    </div>
                    <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white shrink-0')}>
                      <div className={cn('w-1.5 h-1.5 rounded-full bg-white', exam.status === 'ongoing' && 'animate-pulse')} />
                      {cfg.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(exam.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      {' – '}
                      {new Date(exam.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {exam.totalStudents} students
                    </span>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {exam.classes.map((c) => (
                      <span key={c} className={cn('text-[11px] font-semibold px-2 py-0.5 rounded-full', colors.badge)}>
                        {c.replace('Class ', '')}
                      </span>
                    ))}
                  </div>

                  {exam.status === 'marks_entry' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-600 font-medium">Marks Entry Progress</span>
                        <span className="font-bold text-slate-800">{exam.marksEntered}/{exam.totalStudents}</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-500 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">Deadline: {new Date(exam.marksEntryDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                    </div>
                  )}

                  {exam.status === 'completed' && (
                    <div className="flex items-center gap-1.5 mb-4 text-sm text-green-600 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      All marks entered · Report cards ready
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTimetableExam(timetableExam?.id === exam.id ? null : exam)}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      {timetableExam?.id === exam.id ? 'Hide' : 'Timetable'}
                    </button>
                    {(exam.status === 'marks_entry' || exam.status === 'ongoing') && (
                      <Link
                        href="/admin/exams/marks"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Enter Marks
                      </Link>
                    )}
                    {exam.status === 'completed' && (
                      <Link
                        href="/admin/exams/report-cards"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Report Cards
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {timetableExam && (
          <TimetableView selectedExam={timetableExam} />
        )}
      </div>
    </>
  );
}
