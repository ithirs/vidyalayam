'use client';

import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Camera, Upload, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step1Data } from './types';

const SCHOOL_TYPES = [
  { value: 'primary', label: 'Primary', desc: 'Classes 1–5' },
  { value: 'secondary', label: 'Secondary', desc: 'Classes 6–10' },
  { value: 'higher_secondary', label: 'Higher Secondary', desc: 'Classes 11–12' },
  { value: 'all_levels', label: 'All Levels', desc: 'Classes 1–12' },
] as const;

const BOARDS = [
  { value: 'cbse', label: 'CBSE' },
  { value: 'icse', label: 'ICSE' },
  { value: 'state_board', label: 'State Board' },
  { value: 'others', label: 'Others' },
] as const;

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
];

interface Props {
  form: UseFormReturn<Step1Data>;
  logoPreview: string | null;
  onLogoChange: (url: string | null) => void;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Input({
  className,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      {...props}
      className={cn(
        'w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
        'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
        error
          ? 'border-red-400 bg-red-50'
          : 'border-slate-200 bg-slate-50 hover:border-slate-300',
        className
      )}
    />
  );
}

export function StepOne({ form, logoPreview, onLogoChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const schoolType = watch('schoolType');

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) readFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      onLogoChange(url);
      setValue('logoUrl', url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">

      {/* Logo upload */}
      <div>
        <Label>School Logo</Label>
        <div className="flex items-center gap-5">
          <div
            className="relative w-20 h-20 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 shrink-0 overflow-hidden group"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
          >
            {logoPreview ? (
              <>
                <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <School className="w-6 h-6 text-slate-400" />
                <Camera className="w-3.5 h-3.5 text-slate-400" />
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
            >
              <Upload className="w-4 h-4" />
              Upload Logo
            </button>
            <p className="text-xs text-slate-400 mt-1.5">PNG, JPG up to 2MB. Recommended: 200×200px</p>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {/* School name */}
      <div>
        <Label required>School Name</Label>
        <Input
          {...register('schoolName')}
          placeholder="e.g., Sri Sai High School"
          error={!!errors.schoolName}
        />
        <FieldError message={errors.schoolName?.message} />
      </div>

      {/* School type */}
      <div>
        <Label required>School Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {SCHOOL_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setValue('schoolType', t.value, { shouldValidate: true })}
              className={cn(
                'flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-sm font-medium transition-all duration-200',
                schoolType === t.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50'
              )}
            >
              <span className="font-semibold">{t.label}</span>
              <span className="text-xs font-normal text-slate-400">{t.desc}</span>
            </button>
          ))}
        </div>
        <FieldError message={errors.schoolType?.message} />
      </div>

      {/* Board */}
      <div>
        <Label required>Board / Curriculum</Label>
        <select
          {...register('board')}
          className={cn(
            'w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all duration-200 bg-slate-50',
            'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
            errors.board ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
          )}
        >
          {BOARDS.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
        <FieldError message={errors.board?.message} />
      </div>

      {/* Address */}
      <div>
        <Label required>Street Address</Label>
        <Input {...register('street')} placeholder="Building no., Street name" error={!!errors.street} />
        <FieldError message={errors.street?.message} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label required>City</Label>
          <Input {...register('city')} placeholder="e.g., Hyderabad" error={!!errors.city} />
          <FieldError message={errors.city?.message} />
        </div>
        <div>
          <Label required>District</Label>
          <Input {...register('district')} placeholder="e.g., Rangareddy" error={!!errors.district} />
          <FieldError message={errors.district?.message} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label required>State</Label>
          <select
            {...register('state')}
            className={cn(
              'w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-800 outline-none transition-all duration-200 bg-slate-50',
              'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
              errors.state ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
            )}
          >
            <option value="">Select state</option>
            {INDIAN_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <FieldError message={errors.state?.message} />
        </div>
        <div>
          <Label required>Pincode</Label>
          <Input {...register('pincode')} placeholder="500001" maxLength={6} error={!!errors.pincode} />
          <FieldError message={errors.pincode?.message} />
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>School Phone</Label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-sm text-slate-500 font-medium">
              +91
            </span>
            <Input
              {...register('phone')}
              placeholder="9876543210"
              maxLength={10}
              error={!!errors.phone}
              className="rounded-l-none"
            />
          </div>
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <Label required>School Email</Label>
          <Input {...register('schoolEmail')} type="email" placeholder="principal@school.edu.in" error={!!errors.schoolEmail} />
          <FieldError message={errors.schoolEmail?.message} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label>Website <span className="text-slate-400 font-normal text-xs">(optional)</span></Label>
          <Input {...register('website')} placeholder="https://myschool.edu.in" error={!!errors.website} />
          <FieldError message={errors.website?.message} />
        </div>
        <div>
          <Label>Established Year <span className="text-slate-400 font-normal text-xs">(optional)</span></Label>
          <Input {...register('establishedYear')} placeholder="1998" maxLength={4} error={!!errors.establishedYear} />
          <FieldError message={errors.establishedYear?.message} />
        </div>
      </div>
    </div>
  );
}
