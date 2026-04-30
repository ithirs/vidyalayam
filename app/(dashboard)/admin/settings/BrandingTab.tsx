'use client';

import { useState } from 'react';
import { Upload, Palette, FileText, LayoutTemplate, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const PRESET_COLORS = [
  { name: 'Orange', primary: '#f97316', secondary: '#fed7aa' },
  { name: 'Blue', primary: '#3b82f6', secondary: '#bfdbfe' },
  { name: 'Green', primary: '#22c55e', secondary: '#bbf7d0' },
  { name: 'Teal', primary: '#14b8a6', secondary: '#99f6e4' },
  { name: 'Red', primary: '#ef4444', secondary: '#fecaca' },
  { name: 'Slate', primary: '#64748b', secondary: '#e2e8f0' },
];

const REPORT_HEADER_STYLES = ['Classic', 'Modern', 'Minimal', 'Bold'];

export function BrandingTab() {
  const [primaryColor, setPrimary] = useState('#f97316');
  const [secondaryColor, setSecondary] = useState('#fed7aa');
  const [motto, setMotto] = useState('Excellence in Education, Light in Every Mind');
  const [headerStyle, setHeaderStyle] = useState('Modern');
  const [letterheadPreview] = useState<string | null>(null);

  const handleSave = () => toast.success('Branding settings saved');

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 space-y-5">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-3">
            <Palette className="w-4 h-4 text-orange-500" />
            Color Scheme
          </h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setPrimary(c.primary); setSecondary(c.secondary); }}
                  className={cn(
                    'flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all',
                    primaryColor === c.primary ? 'border-slate-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                  )}
                >
                  <div className="w-3.5 h-3.5 rounded-full" style={{ background: c.primary }} />
                  {c.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">Secondary / Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="w-10 h-10 rounded-xl border border-slate-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <div className="px-4 py-3 text-white text-sm font-bold" style={{ background: primaryColor }}>
                School Header Preview
              </div>
              <div className="px-4 py-2 text-sm" style={{ background: secondaryColor }}>
                Sub-header or navigation area preview
              </div>
              <div className="px-4 py-3 bg-white flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold" style={{ background: primaryColor }}>Primary Button</div>
                <div className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ border: `2px solid ${primaryColor}`, color: primaryColor }}>Secondary Button</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-3">
            <FileText className="w-4 h-4 text-orange-500" />
            School Motto
          </h3>
          <input
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            placeholder="Enter your school motto"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm italic"
          />
          <p className="text-xs text-slate-400 mt-1.5">Displayed on report cards, certificates, and official documents</p>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-3">
            <LayoutTemplate className="w-4 h-4 text-orange-500" />
            Report Card Header Style
          </h3>
          <div className="flex flex-wrap gap-2">
            {REPORT_HEADER_STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setHeaderStyle(s)}
                className={cn(
                  'px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                  headerStyle === s ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-3">
            <Upload className="w-4 h-4 text-orange-500" />
            Letterhead
          </h3>
          <label className={cn(
            'flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors',
            letterheadPreview ? 'border-orange-300 bg-orange-50' : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50/40'
          )}>
            <Upload className="w-7 h-7 text-slate-300 mb-2" />
            <span className="text-sm font-medium text-slate-500">Upload letterhead image or PDF</span>
            <span className="text-xs text-slate-400 mt-0.5">PNG, JPG, or PDF up to 5MB</span>
            <input type="file" accept=".png,.jpg,.jpeg,.pdf" className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
          <Save className="w-4 h-4" />
          Save Branding
        </button>
      </div>
    </div>
  );
}
