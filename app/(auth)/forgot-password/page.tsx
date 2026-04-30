'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Mail, ArrowLeft, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: supaError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (supaError) throw supaError;
      setSent(true);
    } catch {
      setSent(true);
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

        {!sent ? (
          <>
            {/* Header */}
            <div className="px-8 pt-8 pb-6 text-center border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mx-auto mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm shadow-orange-200">
                  <Mail className="w-5 h-5 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 font-heading">Forgot your password?</h1>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                No worries — enter your email and we'll send you reset instructions.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="px-8 py-7 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email address<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="admin@yourschool.in"
                    autoComplete="email"
                    autoFocus
                    className={cn(
                      'w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
                      'focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500',
                      error
                        ? 'border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                    )}
                  />
                </div>
                {error && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <span className="text-white text-[8px] font-bold">!</span>
                    </span>
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md',
                  isLoading
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success state */
          <div className="px-8 py-10 text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
              <div className="relative w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
                <CheckCircle className="w-10 h-10 text-white" strokeWidth={1.5} />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 font-heading mb-2">Check your inbox</h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              We've sent a password reset link to:
            </p>
            <p className="font-semibold text-slate-800 text-sm mb-6 break-all">{email}</p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2.5 mb-7">
              {[
                'Open the email from Vidyalaya',
                'Click the "Reset Password" link',
                'Choose a strong new password',
                'Sign in with your new password',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center shrink-0">
                    <span className="text-orange-600 text-[10px] font-bold">{i + 1}</span>
                  </div>
                  <span className="text-sm text-slate-600">{step}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Didn't receive it? Check your spam folder or{' '}
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors underline underline-offset-2"
              >
                try again
              </button>
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/60 flex justify-center">
          <Link
            href="/login"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-orange-500 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
