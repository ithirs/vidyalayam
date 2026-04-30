'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Check, X, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SUBJECTS, type Subject } from './data';

const TYPE_CONFIG = {
  theory:    { label: 'Theory',    color: 'bg-blue-100 text-blue-700'   },
  practical: { label: 'Practical', color: 'bg-teal-100 text-teal-700'  },
  both:      { label: 'Both',      color: 'bg-orange-100 text-orange-700'},
};

export function SubjectsTab() {
  const [subjects, setSubjects] = useState<Subject[]>(SUBJECTS);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newSubject, setNewSubject] = useState<Partial<Subject>>({ name: '', code: '', type: 'theory', classes: [], teacher: '' });

  const startEdit = (s: Subject) => setEditing({ ...s });

  const saveEdit = () => {
    if (!editing) return;
    setSubjects((prev) => prev.map((s) => s.id === editing.id ? editing : s));
    setEditing(null);
    toast.success('Subject updated');
  };

  const deleteSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    toast.success('Subject removed');
  };

  const addSubject = () => {
    if (!newSubject.name || !newSubject.code) return;
    setSubjects((prev) => [...prev, {
      id: `s${Date.now()}`,
      name: newSubject.name!,
      code: newSubject.code!.toUpperCase(),
      type: (newSubject.type as Subject['type']) || 'theory',
      classes: newSubject.classes || [],
      teacher: newSubject.teacher || '',
    }]);
    setNewSubject({ name: '', code: '', type: 'theory', classes: [], teacher: '' });
    setShowAdd(false);
    toast.success('Subject added');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-700 font-heading">Subjects</h3>
          <p className="text-xs text-slate-400 mt-0.5">{subjects.length} subjects configured</p>
        </div>
        <button
          onClick={() => setShowAdd((o) => !o)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
        >
          <Plus className="w-4 h-4" />
          Add Subject
        </button>
      </div>

      {showAdd && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 space-y-3">
          <h4 className="text-sm font-bold text-orange-800">New Subject</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Subject Name *</label>
              <input value={newSubject.name} onChange={(e) => setNewSubject((f) => ({ ...f, name: e.target.value }))} className={inputCls} placeholder="Mathematics" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Code *</label>
              <input value={newSubject.code} onChange={(e) => setNewSubject((f) => ({ ...f, code: e.target.value }))} className={inputCls} placeholder="MATH" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Type</label>
              <select value={newSubject.type} onChange={(e) => setNewSubject((f) => ({ ...f, type: e.target.value as Subject['type'] }))} className={inputCls}>
                <option value="theory">Theory</option>
                <option value="practical">Practical</option>
                <option value="both">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Teacher</label>
              <input value={newSubject.teacher} onChange={(e) => setNewSubject((f) => ({ ...f, teacher: e.target.value }))} className={inputCls} placeholder="Teacher name" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addSubject} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors">Add</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Subject</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Code</th>
              <th className="text-center px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Classes</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Teacher</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {subjects.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-4 py-3">
                  {editing?.id === s.id
                    ? <input value={editing.name} onChange={(e) => setEditing((prev) => prev ? { ...prev, name: e.target.value } : prev)} className={cn(inputCls, 'py-1.5 h-8')} />
                    : <div className="flex items-center gap-2.5"><BookOpen className="w-4 h-4 text-orange-400 shrink-0" /><span className="font-medium text-slate-800">{s.name}</span></div>
                  }
                </td>
                <td className="px-3 py-3 text-center">
                  {editing?.id === s.id
                    ? <input value={editing.code} onChange={(e) => setEditing((prev) => prev ? { ...prev, code: e.target.value } : prev)} className={cn(inputCls, 'py-1.5 h-8 w-20 mx-auto text-center')} />
                    : <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{s.code}</span>
                  }
                </td>
                <td className="px-3 py-3 text-center">
                  {editing?.id === s.id
                    ? <select value={editing.type} onChange={(e) => setEditing((prev) => prev ? { ...prev, type: e.target.value as Subject['type'] } : prev)} className={cn(inputCls, 'py-1.5 h-8')}>
                        <option value="theory">Theory</option>
                        <option value="practical">Practical</option>
                        <option value="both">Both</option>
                      </select>
                    : <span className={cn('text-xs font-semibold px-2.5 py-1 rounded-full', TYPE_CONFIG[s.type].color)}>{TYPE_CONFIG[s.type].label}</span>
                  }
                </td>
                <td className="px-3 py-3">
                  <div className="flex flex-wrap gap-1 max-w-[180px]">
                    {s.classes.slice(0, 3).map((c) => (
                      <span key={c} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                        {c.replace('Class ', '')}
                      </span>
                    ))}
                    {s.classes.length > 3 && <span className="text-[10px] text-slate-400">+{s.classes.length - 3}</span>}
                  </div>
                </td>
                <td className="px-3 py-3 text-sm text-slate-600">{s.teacher || '—'}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {editing?.id === s.id ? (
                      <>
                        <button onClick={saveEdit} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Check className="w-4 h-4" /></button>
                        <button onClick={() => setEditing(null)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => startEdit(s)} className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Pencil className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteSubject(s.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"><Trash2 className="w-3.5 h-3.5" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
