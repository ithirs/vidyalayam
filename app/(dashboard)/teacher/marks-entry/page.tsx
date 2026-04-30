'use client';

import Link from 'next/link';
import { ChevronRight, FileText, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const STUDENTS = [
  { roll: 'SR-801', name: 'Aditya Kumar', max: 100, marks: '' },
  { roll: 'SR-802', name: 'Bhavana Reddy', max: 100, marks: '' },
  { roll: 'SR-803', name: 'Chetan Singh', max: 100, marks: '' },
  { roll: 'SR-804', name: 'Deepika Rao', max: 100, marks: '' },
  { roll: 'SR-805', name: 'Eshan Nair', max: 100, marks: '' },
  { roll: 'SR-806', name: 'Farida Begum', max: 100, marks: '' },
  { roll: 'SR-807', name: 'Ganesh Patil', max: 100, marks: '' },
  { roll: 'SR-808', name: 'Harini Suresh', max: 100, marks: '' },
];

export default function TeacherMarksEntryPage() {
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [selectedClass, setSelectedClass] = useState('8-A');
  const [selectedExam, setSelectedExam] = useState('Unit Test 1');

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/teacher" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Marks Entry</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
            <FileText className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Marks Entry</h1>
            <p className="text-sm text-slate-500 mt-0.5">Enter examination marks for your students</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Class</label>
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400">
                <option>8-A</option><option>9-B</option><option>10-A</option><option>7-C</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Exam</label>
              <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400">
                <option>Unit Test 1</option><option>Mid Term</option><option>Unit Test 2</option><option>Final Exam</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Subject</label>
              <input value="Mathematics" readOnly className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 text-slate-500" />
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Roll No</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Student Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Max Marks</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              {STUDENTS.map((s, i) => (
                <tr key={s.roll} className={`border-b border-slate-50 ${i === STUDENTS.length - 1 ? 'border-b-0' : ''}`}>
                  <td className="px-4 py-3 text-slate-500 font-mono text-xs">{s.roll}</td>
                  <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                  <td className="px-4 py-3 text-slate-500">{s.max}</td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max={s.max}
                      value={marks[s.roll] ?? ''}
                      onChange={e => setMarks(m => ({ ...m, [s.roll]: e.target.value }))}
                      placeholder="—"
                      className="w-20 px-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex justify-end pt-4 border-t border-slate-100">
            <button onClick={() => toast.success('Marks saved successfully!')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              Save Marks
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
