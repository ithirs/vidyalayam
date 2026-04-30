'use client';

import { useState } from 'react';
import { Plus, Save, Copy, ToggleLeft, ToggleRight, Trash2, ChevronDown } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  DEFAULT_CATEGORIES, CLASS_ROWS, DEFAULT_MATRIX, TERM_OPTIONS, DEFAULT_DUE_CONFIG,
  type FeeCategory, type FeeMatrix, type DueConfig,
} from './data';

export default function FeeStructurePage() {
  const [categories, setCategories] = useState<FeeCategory[]>(DEFAULT_CATEGORIES);
  const [matrix, setMatrix] = useState<FeeMatrix>(JSON.parse(JSON.stringify(DEFAULT_MATRIX)));
  const [dueConfig, setDueConfig] = useState<DueConfig>({ ...DEFAULT_DUE_CONFIG });
  const [newCatName, setNewCatName] = useState('');
  const [showAddCat, setShowAddCat] = useState(false);
  const [termOpen, setTermOpen] = useState(false);
  const [academicYear] = useState('2024-25');

  const enabledCats = categories.filter((c) => c.enabled);

  const updateCell = (classId: string, catId: string, value: string) => {
    const num = Number(value.replace(/[^0-9]/g, ''));
    setMatrix((prev) => ({
      ...prev,
      [classId]: { ...prev[classId], [catId]: num },
    }));
  };

  const toggleCategory = (id: string) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, enabled: !c.enabled } : c));
  };

  const addCategory = () => {
    if (!newCatName.trim()) return;
    const id = newCatName.toLowerCase().replace(/\s+/g, '_');
    const newCat: FeeCategory = { id, name: newCatName.trim(), icon: '💰', enabled: true, color: 'bg-slate-50 text-slate-600 border-slate-100' };
    setCategories((prev) => [...prev, newCat]);
    setMatrix((prev) => {
      const next = { ...prev };
      CLASS_ROWS.forEach((r) => { next[r.id] = { ...next[r.id], [id]: 0 }; });
      return next;
    });
    setNewCatName('');
    setShowAddCat(false);
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const copyFromPrevYear = () => {
    toast.success('Fee structure copied from 2023-24');
  };

  const handleSave = () => {
    toast.success('Fee structure saved for 2024-25');
  };

  const rowTotal = (classId: string) =>
    enabledCats.reduce((s, c) => s + (matrix[classId]?.[c.id] ?? 0), 0);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-6 pb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-heading">Fee Structure Setup</h1>
            <p className="text-sm text-slate-500 mt-0.5">Academic Year: <strong className="text-slate-700">{academicYear}</strong></p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copyFromPrevYear}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copy from 2023-24
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-800 font-heading">Fee Categories</h2>
              <p className="text-xs text-slate-500 mt-0.5">Enable or disable fee categories</p>
            </div>
            <button
              onClick={() => setShowAddCat((o) => !o)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-dashed border-orange-300 text-sm font-semibold text-orange-600 hover:bg-orange-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </div>

          <div className="p-5">
            {showAddCat && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-orange-50 rounded-xl border border-orange-200">
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addCategory()}
                  placeholder="Category name..."
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                  autoFocus
                />
                <button onClick={addCategory} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
                  Add
                </button>
                <button onClick={() => setShowAddCat(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                  ✕
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={cn(
                    'flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 transition-all',
                    cat.enabled ? `${cat.color} border-current/20` : 'bg-slate-50 text-slate-400 border-slate-100'
                  )}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className={cn('text-sm font-semibold', cat.enabled ? '' : 'text-slate-400')}>{cat.name}</span>
                  <button
                    onClick={() => toggleCategory(cat.id)}
                    className="ml-1 text-current hover:opacity-70 transition-opacity"
                    title={cat.enabled ? 'Disable' : 'Enable'}
                  >
                    {cat.enabled
                      ? <ToggleRight className="w-5 h-5" />
                      : <ToggleLeft className="w-5 h-5 text-slate-400" />
                    }
                  </button>
                  {!DEFAULT_CATEGORIES.find((d) => d.id === cat.id) && (
                    <button onClick={() => removeCategory(cat.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 font-heading">Fee Matrix</h2>
            <p className="text-xs text-slate-500 mt-0.5">Monthly fee amounts per class (₹)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100">
                  <th className="sticky left-0 bg-slate-50/70 text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide min-w-[120px] z-10">Class</th>
                  {enabledCats.map((cat) => (
                    <th key={cat.id} className="text-right px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide min-w-[110px]">
                      <div className="flex items-center justify-end gap-1">
                        <span>{cat.icon}</span>
                        <span>{cat.name.replace(' Fee', '')}</span>
                      </div>
                    </th>
                  ))}
                  <th className="text-right px-4 py-3 text-xs font-semibold text-orange-600 uppercase tracking-wide min-w-[110px]">Total/Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {CLASS_ROWS.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="sticky left-0 bg-white group-hover:bg-slate-50/50 px-4 py-2.5 font-semibold text-slate-800 z-10">
                      {row.label}
                      {row.stream && <span className="ml-1.5 text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">{row.stream}</span>}
                    </td>
                    {enabledCats.map((cat) => (
                      <td key={cat.id} className="px-3 py-1.5 text-right">
                        <div className="relative inline-flex items-center">
                          <span className="absolute left-2 text-slate-400 text-xs">₹</span>
                          <input
                            type="text"
                            value={(matrix[row.id]?.[cat.id] ?? 0) || ''}
                            onChange={(e) => updateCell(row.id, cat.id, e.target.value)}
                            placeholder="0"
                            className="w-24 pl-5 pr-2 py-1.5 text-right rounded-lg border border-transparent focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm text-slate-800 bg-transparent focus:bg-white transition-all"
                          />
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-2.5 text-right font-bold text-orange-600">
                      ₹{rowTotal(row.id).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 font-heading">Payment Schedule & Late Fee</h2>
            <p className="text-xs text-slate-500 mt-0.5">Configure due dates and late fee penalties</p>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Payment Frequency</label>
              <div className="relative">
                <button
                  onClick={() => setTermOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 font-medium hover:border-orange-300 transition-all bg-white"
                >
                  {dueConfig.term}
                  <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', termOpen && 'rotate-180')} />
                </button>
                {termOpen && (
                  <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-modal z-[200] py-1.5">
                    {TERM_OPTIONS.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setDueConfig((p) => ({ ...p, term: t })); setTermOpen(false); }}
                        className={cn('w-full text-left px-3.5 py-2.5 text-sm transition-colors', dueConfig.term === t ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-slate-700 hover:bg-slate-50')}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Due Day of Month</label>
              <div className="relative">
                <input
                  type="number"
                  min={1} max={31}
                  value={dueConfig.dueDay}
                  onChange={(e) => setDueConfig((p) => ({ ...p, dueDay: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">of each month</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Grace Period (Days)</label>
              <input
                type="number"
                min={0}
                value={dueConfig.graceDays}
                onChange={(e) => setDueConfig((p) => ({ ...p, graceDays: Number(e.target.value) }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Late Fee Rate (% per day)</label>
              <div className="relative">
                <input
                  type="number"
                  min={0} step={0.1}
                  value={dueConfig.lateFeePercent}
                  onChange={(e) => setDueConfig((p) => ({ ...p, lateFeePercent: Number(e.target.value) }))}
                  className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5">Maximum Late Fee Cap (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  min={0}
                  value={dueConfig.maxLateFee}
                  onChange={(e) => setDueConfig((p) => ({ ...p, maxLateFee: Number(e.target.value) }))}
                  className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <div className="w-full bg-orange-50 border border-orange-200 rounded-xl p-3.5 text-sm text-orange-800">
                <div className="font-semibold mb-1">Current Config</div>
                <div className="text-xs space-y-0.5 text-orange-700">
                  <div>Due: {dueConfig.term}, by {dueConfig.dueDay}th</div>
                  <div>Grace: {dueConfig.graceDays} days</div>
                  <div>Late fee: {dueConfig.lateFeePercent}%/day (max ₹{dueConfig.maxLateFee})</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
