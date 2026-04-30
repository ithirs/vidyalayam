'use client';

import { useState } from 'react';
import { Upload, Camera, Save, Building2, Phone, MapPin, User, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const BOARDS = ['CBSE', 'ICSE', 'State Board (AP)', 'State Board (TS)', 'IB', 'IGCSE'];
const SCHOOL_TYPES = ['Co-education', 'Boys Only', 'Girls Only'];
const ACADEMIC_YEARS = ['2025-26', '2026-27', '2024-25'];

export function SchoolProfile() {
  const [logo, setLogo] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: 'Sri Sai High School',
    type: 'Co-education',
    board: 'CBSE',
    affiliation: 'AF-1234567',
    code: 'CBSE-500001',
    email: 'info@srisaischool.edu',
    phone: '040-12345678',
    altPhone: '9876543210',
    website: 'www.srisaischool.edu',
    address: '12-3-45, Banjara Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    principal: 'Dr. Suresh Kumar',
    principalPhone: '9876543200',
    academicYear: '2025-26',
    establishedYear: '1998',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const handleSave = () => toast.success('School profile saved successfully');

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100 rounded-2xl p-5">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="relative shrink-0">
            <div className={cn(
              'w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all',
              logo ? 'border-orange-300 bg-white' : 'border-orange-200 bg-white/60'
            )}>
              {logo
                ? <img src={logo} alt="School logo" className="w-full h-full object-contain p-1" />
                : <Building2 className="w-8 h-8 text-orange-300" />
              }
            </div>
            <label className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors shadow-sm">
              <Camera className="w-3 h-3" />
              <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
            </label>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="text-lg font-black text-slate-900 font-heading">{form.name}</div>
            <div className="text-sm text-slate-500">{form.board} · {form.type} · Est. {form.establishedYear}</div>
            <div className="text-xs text-orange-600 font-medium mt-1">Affiliation: {form.affiliation}</div>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dashed border-orange-300 text-sm font-medium text-orange-600 hover:bg-orange-50 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            Upload Logo
            <input type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
          </label>
        </div>
      </div>

      <Section icon={Building2} title="School Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="School Name *" colSpan="sm:col-span-2">
            <input value={form.name} onChange={set('name')} className={inputCls} />
          </Field>
          <Field label="School Type">
            <select value={form.type} onChange={set('type')} className={inputCls}>
              {SCHOOL_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Board of Education">
            <select value={form.board} onChange={set('board')} className={inputCls}>
              {BOARDS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Affiliation Number">
            <input value={form.affiliation} onChange={set('affiliation')} className={inputCls} />
          </Field>
          <Field label="School Code">
            <input value={form.code} onChange={set('code')} className={inputCls} />
          </Field>
          <Field label="Established Year">
            <input type="number" value={form.establishedYear} onChange={set('establishedYear')} className={inputCls} />
          </Field>
          <Field label="Current Academic Year">
            <select value={form.academicYear} onChange={set('academicYear')} className={inputCls}>
              {ACADEMIC_YEARS.map((y) => <option key={y}>{y}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      <Section icon={Phone} title="Contact Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Primary Phone">
            <input value={form.phone} onChange={set('phone')} className={inputCls} />
          </Field>
          <Field label="Alternate Phone">
            <input value={form.altPhone} onChange={set('altPhone')} className={inputCls} />
          </Field>
          <Field label="Email Address">
            <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
          </Field>
          <Field label="Website">
            <input value={form.website} onChange={set('website')} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section icon={MapPin} title="Address">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Street Address" colSpan="sm:col-span-2">
            <input value={form.address} onChange={set('address')} className={inputCls} />
          </Field>
          <Field label="City">
            <input value={form.city} onChange={set('city')} className={inputCls} />
          </Field>
          <Field label="State">
            <input value={form.state} onChange={set('state')} className={inputCls} />
          </Field>
          <Field label="Pincode">
            <input value={form.pincode} onChange={set('pincode')} className={inputCls} />
          </Field>
        </div>
      </Section>

      <Section icon={User} title="Principal Details">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Principal Name">
            <input value={form.principal} onChange={set('principal')} className={inputCls} />
          </Field>
          <Field label="Principal Phone">
            <input value={form.principalPhone} onChange={set('principalPhone')} className={inputCls} />
          </Field>
        </div>
      </Section>

      <div className="flex justify-end pt-2">
        <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
          <Save className="w-4 h-4" />
          Save School Profile
        </button>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';

function Field({ label, children, colSpan = '' }: { label: string; children: React.ReactNode; colSpan?: string }) {
  return (
    <div className={colSpan}>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-4">
        <Icon className="w-4 h-4 text-orange-500" />
        {title}
      </h3>
      {children}
    </div>
  );
}
