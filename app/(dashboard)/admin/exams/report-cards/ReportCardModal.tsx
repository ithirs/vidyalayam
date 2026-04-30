'use client';

import { X, Printer, Download, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GRADE_SCALE, type ReportCardStudent } from './data';

interface Props {
  student: ReportCardStudent;
  examName: string;
  onClose: () => void;
}

export function ReportCardModal({ student, examName, onClose }: Props) {
  const total = student.subjects.reduce((s, sub) => s + sub.obtained + sub.practicalObtained, 0);
  const maxTotal = student.subjects.reduce((s, sub) => s + sub.maxMarks + sub.practicalMax, 0);
  const pct = ((total / maxTotal) * 100).toFixed(1);
  const overallGrade = Number(pct) >= 90 ? 'A+' : Number(pct) >= 75 ? 'A' : Number(pct) >= 60 ? 'B' : Number(pct) >= 50 ? 'C' : Number(pct) >= 35 ? 'D' : 'F';
  const attPct = ((student.attendance.present / student.attendance.total) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-slate-900 font-heading">Report Card Preview</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 px-6 py-5 text-white">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0">V</div>
                <div className="flex-1">
                  <h1 className="text-xl font-black font-heading leading-tight">Sri Sai High School</h1>
                  <p className="text-orange-100 text-xs mt-0.5">CBSE Affiliated (School Code: 1234567) · Affiliated to CBSE New Delhi</p>
                  <p className="text-orange-100 text-xs">Hyderabad, Telangana – 500001 · Ph: 040-12345678</p>
                </div>
              </div>
              <div className="mt-3 bg-white/10 rounded-xl px-4 py-2 text-center">
                <span className="font-black text-sm uppercase tracking-widest">Progress Report Card</span>
                <span className="mx-3 text-white/50">·</span>
                <span className="text-sm font-medium">{examName}</span>
                <span className="mx-3 text-white/50">·</span>
                <span className="text-sm font-medium">Academic Year 2025-26</span>
              </div>
            </div>

            <div className="px-6 py-4 grid grid-cols-2 gap-x-8 gap-y-2 bg-orange-50/30 border-b border-orange-100">
              {[
                ['Student Name', student.name],
                ['Admission No.', student.admissionNo],
                ['Class & Section', `${student.className} – Section ${student.section}`],
                ['Roll Number', student.rollNo],
                ['Father\'s Name', student.fatherName],
                ['Mother\'s Name', student.motherName],
                ['Date of Birth', new Date(student.dob).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })],
                ['Rank', `${student.rank} in class`],
              ].map(([label, val]) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wide shrink-0 w-28">{label}</span>
                  <span className="text-sm font-semibold text-slate-800">: {val}</span>
                </div>
              ))}
            </div>

            <div className="px-6 py-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">Academic Performance</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 rounded-lg">
                    <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide rounded-l-lg">Subject</th>
                    <th className="text-center px-2 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Max</th>
                    <th className="text-center px-2 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Written</th>
                    {student.subjects.some((s) => s.hasPractical) && (
                      <th className="text-center px-2 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Practical</th>
                    )}
                    <th className="text-center px-2 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Total</th>
                    <th className="text-center px-2 py-2.5 text-xs font-semibold text-slate-500 uppercase tracking-wide rounded-r-lg">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {student.subjects.map((sub) => {
                    const subTotal = sub.obtained + sub.practicalObtained;
                    const subMax = sub.maxMarks + sub.practicalMax;
                    const pctSub = (subTotal / subMax) * 100;
                    return (
                      <tr key={sub.code} className={cn('transition-colors', pctSub < 35 ? 'bg-red-50/30' : '')}>
                        <td className="px-3 py-2.5 font-medium text-slate-800">
                          <div>{sub.name}</div>
                          <div className="text-[10px] text-slate-400">{sub.code}</div>
                        </td>
                        <td className="px-2 py-2.5 text-center text-slate-500">{subMax}</td>
                        <td className="px-2 py-2.5 text-center font-semibold text-slate-800">{sub.obtained}</td>
                        {student.subjects.some((s) => s.hasPractical) && (
                          <td className="px-2 py-2.5 text-center text-slate-600">{sub.hasPractical ? sub.practicalObtained : '—'}</td>
                        )}
                        <td className="px-2 py-2.5 text-center font-bold text-slate-900">{subTotal}</td>
                        <td className="px-2 py-2.5 text-center">
                          <span className={cn('text-xs font-black px-2 py-0.5 rounded-full', GRADE_SCALE.find((g) => g.grade === sub.grade)?.color || 'bg-slate-100 text-slate-600')}>
                            {sub.grade}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 bg-orange-50/50">
                    <td className="px-3 py-3 font-black text-slate-900 font-heading">Grand Total</td>
                    <td className="px-2 py-3 text-center font-bold text-slate-500">{maxTotal}</td>
                    <td colSpan={student.subjects.some((s) => s.hasPractical) ? 3 : 1} />
                    <td className="px-2 py-3 text-center font-black text-orange-600 font-heading text-base">{total}</td>
                    <td className="px-2 py-3 text-center">
                      <span className={cn('text-sm font-black px-3 py-1 rounded-full', GRADE_SCALE.find((g) => g.grade === overallGrade)?.color)}>
                        {overallGrade}
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-slate-50/70">
                    <td className="px-3 py-2 text-xs text-slate-500 font-medium">Percentage</td>
                    <td colSpan={student.subjects.some((s) => s.hasPractical) ? 5 : 4} className="px-2 py-2">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden max-w-[200px]">
                          <div className="h-full bg-orange-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-black text-orange-600">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="px-6 pb-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div className="bg-blue-50 rounded-xl p-3.5">
                <div className="text-[10px] text-blue-500 font-semibold uppercase tracking-wide mb-1">Attendance Summary</div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-black text-blue-700 font-heading">{student.attendance.present}/{student.attendance.total}</div>
                    <div className="text-xs text-blue-500">Days Present</div>
                  </div>
                  <div className="text-2xl font-black text-blue-600">{attPct}%</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-3.5">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Grade Scale</div>
                <div className="grid grid-cols-2 gap-1">
                  {GRADE_SCALE.map((gs) => (
                    <div key={gs.grade} className="flex items-center gap-1 text-[9px]">
                      <span className={cn('font-black px-1 rounded text-[9px]', gs.color)}>{gs.grade}</span>
                      <span className="text-slate-500">{gs.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 space-y-3 border-t border-slate-100 pt-4">
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Class Teacher's Remarks</div>
                <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-700 italic">{student.teacherRemarks}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-1.5">Principal's Remarks</div>
                <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-700 italic">{student.principalRemarks}</div>
              </div>
            </div>

            <div className="px-6 pb-6 border-t border-slate-100 pt-4 grid grid-cols-3 gap-4">
              {['Class Teacher', 'Principal', 'Parent'].map((sig) => (
                <div key={sig} className="text-center">
                  <div className="h-10 border-b border-slate-300 mb-2" />
                  <div className="text-xs text-slate-500 font-medium">{sig}</div>
                  <div className="text-[10px] text-slate-400">Signature</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex gap-2 sticky bottom-0 bg-white">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Close
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <MessageCircle className="w-4 h-4 text-green-500" />
            WhatsApp
          </button>
          <button className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-brand-sm">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
