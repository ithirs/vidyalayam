'use client';

import { useState } from 'react';
import { Plus, Trash2, X, Users, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CLASS_SECTIONS, type ClassSection } from './data';

export function ClassSections() {
  const [classes, setClasses] = useState<ClassSection[]>(CLASS_SECTIONS);
  const [showAdd, setShowAdd] = useState(false);
  const [newClass, setNewClass] = useState({ name: '', sections: 'A', teacher: '' });

  const addClass = () => {
    if (!newClass.name.trim()) return;
    const sections = newClass.sections.split(',').map((s) => s.trim().toUpperCase()).filter(Boolean);
    setClasses((prev) => [...prev, {
      id: `c${Date.now()}`, name: newClass.name, sections, students: 0, classTeacher: newClass.teacher
    }]);
    setNewClass({ name: '', sections: 'A', teacher: '' });
    setShowAdd(false);
    toast.success(`${newClass.name} added`);
  };

  const removeClass = (id: string) => {
    setClasses((prev) => prev.filter((c) => c.id !== id));
    toast.success('Class removed');
  };

  const addSection = (id: string) => {
    const cls = classes.find((c) => c.id === id);
    if (!cls) return;
    const used = cls.sections;
    const all = 'ABCDEFGHIJ'.split('');
    const next = all.find((s) => !used.includes(s));
    if (!next) return toast.error('Max sections reached');
    setClasses((prev) => prev.map((c) => c.id === id ? { ...c, sections: [...c.sections, next] } : c));
  };

  const removeSection = (id: string, sec: string) => {
    setClasses((prev) => prev.map((c) => c.id === id ? { ...c, sections: c.sections.filter((s) => s !== sec) } : c));
  };

  const totalStudents = classes.reduce((s, c) => s + c.students, 0);
  const totalSections = classes.reduce((s, c) => s + c.sections.length, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Classes', value: classes.length, color: 'text-blue-600 bg-blue-50' },
          { label: 'Total Sections', value: totalSections, color: 'text-orange-600 bg-orange-50' },
          { label: 'Total Students', value: totalStudents, color: 'text-green-600 bg-green-50' },
        ].map((s) => (
          <div key={s.label} className={cn('rounded-2xl p-4 border border-slate-200 shadow-card flex flex-col items-center', s.color)}>
            <div className="text-2xl font-black font-heading">{s.value}</div>
            <div className="text-xs font-medium mt-0.5 text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700 font-heading">Classes & Sections</h3>
        <button
          onClick={() => setShowAdd((o) => !o)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
        >
          <Plus className="w-4 h-4" />
          Add Class
        </button>
      </div>

      {showAdd && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-3">
          <h4 className="text-sm font-bold text-orange-800">Add New Class</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Class Name *</label>
              <input value={newClass.name} onChange={(e) => setNewClass((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Class 1" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Sections (comma-separated)</label>
              <input value={newClass.sections} onChange={(e) => setNewClass((f) => ({ ...f, sections: e.target.value }))}
                placeholder="A, B, C" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Class Teacher</label>
              <input value={newClass.teacher} onChange={(e) => setNewClass((f) => ({ ...f, teacher: e.target.value }))}
                placeholder="Teacher name" className={inputCls} />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addClass} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors">
              Add Class
            </button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl border border-slate-200 shadow-card p-4 hover:border-orange-200 transition-colors group">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="font-bold text-slate-900 font-heading">{cls.name}</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                  <Users className="w-3 h-3" />
                  {cls.students} students
                  {cls.classTeacher && <span className="text-slate-300">· {cls.classTeacher}</span>}
                </div>
              </div>
              <button
                onClick={() => removeClass(cls.id)}
                className="p-1.5 text-slate-300 hover:text-red-500 transition-colors rounded-lg opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase mr-1">Sections:</span>
              {cls.sections.map((sec) => (
                <div key={sec} className="flex items-center gap-1 bg-orange-50 border border-orange-200 rounded-lg px-2 py-1">
                  <span className="text-xs font-bold text-orange-700">{sec}</span>
                  <button onClick={() => removeSection(cls.id, sec)} className="text-orange-400 hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addSection(cls.id)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 hover:border-orange-300 hover:text-orange-500 transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
