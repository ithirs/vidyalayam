'use client';

import { useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, Camera, CircleUser as UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Step2Data } from './types';

const LANGUAGES = [
  { code: 'en', label: 'English', sub: 'English' },
  { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
  { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
] as const;

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
  return { score: 3, label: 'Strong', color: 'bg-green-500' };
}

interface Props {
  form: UseFormReturn<Step2Data>;
  profilePreview: string | null;
  onProfileChange: (url: string | null) => void;
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

export function StepTwo({ form, profilePreview, onProfileChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const language = watch('language');
  const password = watch('password') || '';
  const strength = getStrength(password);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      onProfileChange(url);
      setValue('profilePhoto', url);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">

      {/* Profile photo */}
      <div>
        <Label>Profile Photo</Label>
        <div className="flex items-center gap-5">
          <div
            className="relative w-20 h-20 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 shrink-0 overflow-hidden group"
            onClick={() => fileRef.current?.click()}
          >
            {profilePreview ? (
              <>
                <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </>
            ) : (
              <UserCircle className="w-10 h-10 text-slate-300" />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
            >
              <Camera className="w-4 h-4" />
              Upload Photo
            </button>
            <p className="text-xs text-slate-400 mt-1.5">This will appear on your school portal</p>
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>

      {/* Admin name */}
      <div>
        <Label required>Principal / Admin Name</Label>
        <Input {...register('adminName')} placeholder="e.g., Ravi Kumar Sharma" error={!!errors.adminName} />
        <FieldError message={errors.adminName?.message} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label required>Admin Email</Label>
          <Input {...register('adminEmail')} type="email" placeholder="admin@yourschool.in" error={!!errors.adminEmail} />
          <p className="mt-1 text-xs text-slate-400">This will be your login email</p>
          <FieldError message={errors.adminEmail?.message} />
        </div>
        <div>
          <Label required>Admin Phone</Label>
          <div className="flex">
            <span className="flex items-center px-3 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-sm text-slate-500 font-medium">
              +91
            </span>
            <Input
              {...register('adminPhone')}
              placeholder="9876543210"
              maxLength={10}
              error={!!errors.adminPhone}
              className="rounded-l-none"
            />
          </div>
          <FieldError message={errors.adminPhone?.message} />
        </div>
      </div>

      {/* Password */}
      <div>
        <Label required>Password</Label>
        <div className="relative">
          <Input
            {...register('password')}
            type={showPass ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            error={!!errors.password}
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-all duration-300',
                    strength.score >= i ? strength.color : 'bg-slate-200'
                  )}
                />
              ))}
            </div>
            <p className={cn(
              'text-xs font-medium',
              strength.score === 1 && 'text-red-600',
              strength.score === 2 && 'text-amber-600',
              strength.score === 3 && 'text-green-600',
            )}>
              {strength.label} password
              {strength.score < 3 && (
                <span className="text-slate-400 font-normal ml-1">
                  — add uppercase, numbers & symbols
                </span>
              )}
            </p>
          </div>
        )}
        <FieldError message={errors.password?.message} />
      </div>

      {/* Confirm password */}
      <div>
        <Label required>Confirm Password</Label>
        <div className="relative">
          <Input
            {...register('confirmPassword')}
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            error={!!errors.confirmPassword}
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <FieldError message={errors.confirmPassword?.message} />
      </div>

      {/* Language preference */}
      <div>
        <Label required>Preferred Language</Label>
        <div className="grid grid-cols-3 gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => setValue('language', lang.code, { shouldValidate: true })}
              className={cn(
                'flex flex-col items-center gap-1 py-4 rounded-xl border-2 transition-all duration-200',
                language === lang.code
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50'
              )}
            >
              <span className={cn(
                'text-lg font-bold',
                language === lang.code ? 'text-orange-700' : 'text-slate-700'
              )}>
                {lang.label}
              </span>
              <span className="text-xs text-slate-400">{lang.sub}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
