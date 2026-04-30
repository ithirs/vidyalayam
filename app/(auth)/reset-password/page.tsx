'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, KeyRound, Eye, EyeOff, ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

function getStrength(password: string): { score: number; label: string; color: string; barColor: string } {
  if (!password) return { score: 0, label: '', color: '', barColor: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { score: 1, label: 'Weak', color: 'text-red-600', barColor: 'bg-red-500' };
  if (score === 2) return { score: 2, label: 'Fair', color: 'text-amber-600', barColor: 'bg-amber-500' };
  return { score: 3, label: 'Strong', color: 'text-green-600', barColor: 'bg-green-500' };
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);

  const strength = getStrength(password);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      }
    });

    const hashParams = new URLSearchParams(window.location.hash.replace('#', '?'));
    const type = hashParams.get('type');
    const accessToken = hashParams.get('access_token');

    if (type === 'recovery' && accessToken) {
      setSessionReady(true);
    } else {
      const timer = setTimeout(() => {
        if (!sessionReady) setInvalidLink(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setSuccess(true);
      setTimeout(() => {
        router.push('/login?reset=success');
      }, 2500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to reset password. The link may have expired.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4 py-12">

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-bold text-slate-900 text-xl tracking-tight">Vidyalaya</span>
          <span className="text-[10px] text-slate-400 -mt-0.5">School ERP</span>
        </div>
      </Link>

      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

        {success ? (
          /* Success state */
          <div className="px-8 py-12 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
              <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading mb-2">Password updated!</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your password has been reset successfully. Redirecting you to sign in...
            </p>
            <div className="mt-5 flex justify-center">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

        ) : invalidLink ? (
          /* Invalid / expired link state */
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-500 flex items-center justify-center shadow-sm shadow-red-200">
                <KeyRound className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-heading mb-2">Link expired</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-7">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200"
            >
              Request new reset link
            </Link>
          </div>

        ) : (
          <>
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm shadow-orange-200">
                  <KeyRound className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Set new password</h1>
              <p className="text-slate-500 text-sm mt-2">
                Choose a strong password for your account.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="px-8 py-7 space-y-5">
              {errors.general && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-[10px] font-bold">!</span>
                  </div>
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              {/* New password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  New password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    autoFocus
                    className={cn(
                      'w-full px-4 pr-11 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
                      'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
                      errors.password
                        ? 'border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Strength meter */}
                {password && (
                  <div className="mt-2.5">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-1 flex-1 rounded-full transition-all duration-300',
                            strength.score >= i ? strength.barColor : 'bg-slate-200'
                          )}
                        />
                      ))}
                    </div>
                    <p className={cn('text-xs font-medium', strength.color)}>
                      {strength.label} password
                      {strength.score < 3 && (
                        <span className="text-slate-400 font-normal ml-1">
                          — add uppercase, numbers & symbols
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-[8px] font-bold">!</span>
                    </span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Confirm password<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={cn(
                      'w-full px-4 pr-11 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
                      'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
                      errors.confirmPassword
                        ? 'border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
                        : confirmPassword && confirmPassword === password
                          ? 'border-green-400 bg-green-50 focus:ring-green-500/20 focus:border-green-500'
                          : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  {confirmPassword && confirmPassword === password && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-[8px] font-bold">!</span>
                    </span>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !sessionReady}
                className={cn(
                  'w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md mt-2',
                  isLoading || !sessionReady
                    ? 'bg-orange-400 cursor-not-allowed shadow-none'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-200 hover:shadow-lg active:scale-[0.99]'
                )}
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Updating password...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </form>
          </>
        )}

        {/* Footer */}
        {!success && (
          <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/60 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
