'use client';

import { useState, useMemo, useRef } from 'react';
import { Eye, Download, FileText, MessageCircle, ChevronDown, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ReportCardModal } from './ReportCardModal';
import { REPORT_STUDENTS, GRADE_SCALE, type ReportCardStudent } from './data';
import { EXAMS, CLASSES, SECTIONS } from '../data';

function gradeColor(g: string) {
  return GRADE_SCALE.find((gs) => gs.grade === g)?.color || 'bg-slate-100 text-slate-600';
}

function pct(student: ReportCardStudent) {
  const total = student.subjects.reduce((s, sub) => s + sub.obtained + sub.practicalObtained, 0);
  const max = student.subjects.reduce((s, sub) => s + sub.maxMarks + sub.practicalMax, 0);
  return ((total / max) * 100).toFixed(1);
}

function overallGrade(student: ReportCardStudent) {
  const p = Number(pct(student));
  if (p >= 90) return 'A+';
  if (p >= 75) return 'A';
  if (p >= 60) return 'B';
  if (p >= 50) return 'C';
  if (p >= 35) return 'D';
  return 'F';
}

export default function ReportCardsPage() {
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedExam, setSelectedExam] = useState('Midterm Exam');
  const [classOpen, setClassOpen] = useState(false);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [viewStudent, setViewStudent] = useState<ReportCardStudent | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genProgress, setGenProgress] = useState(0);

  const students = useMemo(() => {
    return REPORT_STUDENTS.filter((s) =>
      s.className === selectedClass && s.section === selectedSection
    ).sort((a, b) => a.rank - b.rank);
  }, [selectedClass, selectedSection]);

  const handleBulkGenerate = () => {
    setGenerating(true);
    setGenProgress(0);
    const interval = setInterval(() => {
      setGenProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setGenerating(false);
          toast.success(`${students.length} report cards generated successfully`);
          return 100;
        }
        return p + 5;
      });
    }, 100);
  };

  const DDItem = ({ value, options, open, setOpen, onChange }: { value: string; options: string[]; open: boolean; setOpen: (v: boolean) => void; onChange: (v: string) => void }) => (
    <div className="relative">
      <button
        onClick={() => { setOpen(!open); }}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 hover:border-orange-300 transition-all"
      >
        {value}
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5 min-w-[150px]">
          {options.map((opt) => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className={cn('w-full text-left px-3.5 py-2 text-sm transition-colors', value === opt ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <Toaster position="top-right" richColors />
      {viewStudent && (
        <ReportCardModal student={viewStudent} examName={selectedExam} onClose={() => setViewStudent(null)} />
      )}

      <div className="space-y-5 pb-8">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Report Cards</h1>
            <p className="text-sm text-slate-500 mt-0.5">View, generate, and distribute student report cards</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkGenerate}
              disabled={generating}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                generating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-brand-sm'
              )}
            >
              <FileText className="w-4 h-4" />
              Generate All Report Cards
            </button>
          </div>
        </div>

        {generating && (
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-orange-800">Generating report cards...</span>
              <span className="text-sm font-bold text-orange-600">{genProgress}%</span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${genProgress}%` }} />
            </div>
            <p className="text-xs text-orange-600 mt-1.5">Processing {students.length} students · {selectedClass}-{selectedSection}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card px-4 py-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-600">Filters:</span>
            <DDItem value={selectedClass} options={CLASSES} open={classOpen} setOpen={setClassOpen} onChange={setSelectedClass} />
            <DDItem value={`Section ${selectedSection}`} options={SECTIONS.map(s => `Section ${s}`)} open={sectionOpen} setOpen={setSectionOpen} onChange={(v) => setSelectedSection(v.replace('Section ', ''))} />
            <DDItem value={selectedExam} options={EXAMS.map((e) => e.name)} open={examOpen} setOpen={setExamOpen} onChange={setSelectedExam} />
            <div className="ml-auto flex items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-800">{students.length}</span> students
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            Download All (ZIP)
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <MessageCircle className="w-4 h-4 text-green-500" />
            Send to All Parents via WhatsApp
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student</th>
                  {students[0]?.subjects.map((s) => (
                    <th key={s.code} className="text-center px-2 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide min-w-[58px]">
                      {s.code}
                    </th>
                  ))}
                  <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-orange-600 uppercase tracking-wide">%</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Grade</th>
                  <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Rank</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((s) => {
                  const total = s.subjects.reduce((acc, sub) => acc + sub.obtained + sub.practicalObtained, 0);
                  const maxT = s.subjects.reduce((acc, sub) => acc + sub.maxMarks + sub.practicalMax, 0);
                  const p = pct(s);
                  const og = overallGrade(s);
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0', s.avatarColor)}>
                            {s.avatarInitials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-800 whitespace-nowrap">{s.name}</div>
                            <div className="text-xs text-slate-400">Roll {s.rollNo}</div>
                          </div>
                        </div>
                      </td>
                      {s.subjects.map((sub) => {
                        const subTotal = sub.obtained + sub.practicalObtained;
                        const subMax = sub.maxMarks + sub.practicalMax;
                        const subPct = (subTotal / subMax) * 100;
                        return (
                          <td key={sub.code} className="px-2 py-3 text-center">
                            <span className={cn(
                              'text-xs font-semibold',
                              subPct < 35 ? 'text-red-600' : subPct >= 75 ? 'text-green-600' : 'text-slate-700'
                            )}>
                              {subTotal}
                            </span>
                          </td>
                        );
                      })}
                      <td className="px-3 py-3 text-center font-bold text-slate-800">{total}</td>
                      <td className="px-3 py-3 text-center">
                        <span className={cn('font-bold text-sm', Number(p) >= 75 ? 'text-green-600' : Number(p) < 35 ? 'text-red-600' : 'text-orange-600')}>
                          {p}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={cn('text-xs font-black px-2 py-0.5 rounded-full', gradeColor(og))}>{og}</span>
                      </td>
                      <td className="px-3 py-3 text-center">
                        <span className={cn(
                          'text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mx-auto',
                          s.rank === 1 ? 'bg-amber-400 text-white' : s.rank === 2 ? 'bg-slate-400 text-white' : s.rank === 3 ? 'bg-orange-700 text-white' : 'bg-slate-100 text-slate-600'
                        )}>
                          {s.rank}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewStudent(s)}
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {students.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <FileText className="w-8 h-8 mx-auto mb-3 text-slate-300" />
                <div className="text-sm font-medium">No students found</div>
                <div className="text-xs mt-1">Try selecting a different class or section</div>
              </div>
            )}
          </div>

          {students.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>{students.length} students · {selectedClass}-{selectedSection} · {selectedExam}</span>
              <span>
                Class avg:{' '}
                <strong className="text-slate-800">
                  {(students.reduce((s, st) => s + Number(pct(st)), 0) / students.length).toFixed(1)}%
                </strong>
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-4">
          <h3 className="text-sm font-bold text-slate-700 mb-3 font-heading">Grade Scale Reference</h3>
          <div className="flex flex-wrap gap-2">
            {GRADE_SCALE.map((gs) => (
              <div key={gs.grade} className={cn('flex items-center gap-2 px-3 py-1.5 rounded-xl border', gs.color.replace('bg-', 'bg-opacity-50 border-').replace('-100', '-200'))}>
                <span className={cn('text-sm font-black px-1.5 py-0.5 rounded', gs.color)}>{gs.grade}</span>
                <span className="text-xs font-medium text-slate-600">{gs.range}% · {gs.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
