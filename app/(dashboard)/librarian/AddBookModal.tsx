'use client';

import { useState } from 'react';
import { X, Plus, Upload, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES } from './data';
import { toast } from 'sonner';

interface AddBookModalProps {
  onClose: () => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white';

export function AddBookModal({ onClose }: AddBookModalProps) {
  const [tab, setTab] = useState<'manual' | 'csv'>('manual');
  const [form, setForm] = useState({
    title: '', author: '', isbn: '', category: 'Science', publisher: '', copies: '1', price: '', location: '',
  });
  const [csvFile, setCsvFile] = useState<string | null>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.title || !form.author) return toast.error('Title and Author are required');
    toast.success(`"${form.title}" added to catalog`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white h-full w-full max-w-md shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-800 to-slate-700 text-white shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <BookMarked className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 className="font-bold font-heading text-base">Add New Book</h2>
                <p className="text-xs text-slate-300">Enter details or upload CSV</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/20 transition-colors">
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="flex border-b border-slate-100 shrink-0">
          {(['manual', 'csv'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                'flex-1 py-3 text-sm font-semibold transition-all relative capitalize',
                tab === t ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              )}>
              {t === 'manual' ? 'Manual Entry' : 'Bulk CSV Upload'}
              {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'manual' ? (
            <div className="space-y-4">
              <Field label="Book Title">
                <input value={form.title} onChange={set('title')} placeholder="e.g. Physics Part I" className={inputCls} />
              </Field>
              <Field label="Author">
                <input value={form.author} onChange={set('author')} placeholder="e.g. NCERT" className={inputCls} />
              </Field>
              <Field label="ISBN">
                <input value={form.isbn} onChange={set('isbn')} placeholder="978-XXXXXXXXXX" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select value={form.category} onChange={set('category')} className={inputCls}>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="No. of Copies">
                  <input type="number" min="1" value={form.copies} onChange={set('copies')} className={inputCls} />
                </Field>
              </div>
              <Field label="Publisher">
                <input value={form.publisher} onChange={set('publisher')} placeholder="e.g. NCERT, Oxford" className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Price (₹)">
                  <input type="number" min="0" value={form.price} onChange={set('price')} placeholder="0" className={inputCls} />
                </Field>
                <Field label="Shelf Location">
                  <input value={form.location} onChange={set('location')} placeholder="e.g. A-01" className={inputCls} />
                </Field>
              </div>

              {/* Preview badge */}
              {form.title && (
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Preview</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white font-bold">
                      {form.title[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{form.title}</p>
                      <p className="text-xs text-slate-400">{form.author || 'Unknown author'} · {form.category}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer"
                onClick={() => toast.info('CSV upload feature coming soon')}
              >
                <Upload className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-600">Drop your CSV file here</p>
                <p className="text-xs text-slate-400 mt-1">or click to browse</p>
                {csvFile && <p className="text-xs text-blue-600 mt-3 font-semibold">{csvFile}</p>}
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-bold text-slate-600 mb-2">CSV Format — Required columns:</p>
                <div className="flex flex-wrap gap-1.5">
                  {['title', 'author', 'isbn', 'category', 'publisher', 'copies', 'price', 'location'].map((col) => (
                    <span key={col} className="text-[11px] bg-white border border-slate-200 px-2 py-0.5 rounded-lg font-mono text-slate-600">{col}</span>
                  ))}
                </div>
                <button
                  onClick={() => toast.info('Sample CSV downloaded')}
                  className="mt-3 text-xs text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-2"
                >
                  Download sample template
                </button>
              </div>

              <button
                onClick={() => toast.success('5 books imported successfully')}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <Upload className="w-4 h-4" />
                Upload & Import
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {tab === 'manual' && (
          <div className="px-6 py-4 border-t border-slate-100 bg-white shrink-0">
            <div className="flex gap-2">
              <button onClick={onClose}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98] flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Book
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
