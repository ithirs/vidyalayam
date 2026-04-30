'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  Shield,
  Users,
  BookOpen,
  IndianRupee,
  LayoutDashboard,
  Library,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DEMO_USERS, storeUser } from '@/lib/auth/demo-users';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'te', label: 'తె' },
];

const features = [
  'Role-based dashboards for every staff type',
  'Works in Telugu, Hindi & English',
  'Razorpay fee payments built-in',
  'WhatsApp parent alerts & updates',
  'Offline-ready, mobile-first design',
  'Zero IT staff needed to operate',
];

const demoAccounts = [
  { role: 'Admin', icon: Shield, email: 'admin@demo.vidyalaya.in', password: 'demo@123', color: 'blue' },
  { role: 'Teacher', icon: BookOpen, email: 'teacher@demo.vidyalaya.in', password: 'demo@123', color: 'green' },
  { role: 'Accountant', icon: IndianRupee, email: 'accountant@demo.vidyalaya.in', password: 'demo@123', color: 'amber' },
  { role: 'Parent', icon: Users, email: 'parent@demo.vidyalaya.in', password: 'demo@123', color: 'teal' },
  { role: 'Receptionist', icon: LayoutDashboard, email: 'reception@demo.vidyalaya.in', password: 'demo@123', color: 'rose' },
  { role: 'Librarian', icon: Library, email: 'librarian@demo.vidyalaya.in', password: 'demo@123', color: 'orange' },
];

type DemoColor = 'blue' | 'green' | 'amber' | 'teal' | 'rose' | 'orange';

const colorMap: Record<DemoColor, { bg: string; icon: string; border: string; hoverBg: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', hoverBg: 'hover:bg-blue-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200', hoverBg: 'hover:bg-green-100' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-200', hoverBg: 'hover:bg-amber-100' },
  teal: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-200', hoverBg: 'hover:bg-teal-100' },
  rose: { bg: 'bg-rose-50', icon: 'text-rose-600', border: 'border-rose-200', hoverBg: 'hover:bg-rose-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200', hoverBg: 'hover:bg-orange-100' },
};

export default function LoginPage() {
  const router = useRouter();
  const [activeLang, setActiveLang] = useState('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) {
      newErrors.email = 'Email or username is required';
    } else if (email.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
    await new Promise((r) => setTimeout(r, 800));

    const demoUser = DEMO_USERS[email.toLowerCase().trim()];
    if (demoUser && demoUser.password === password) {
      storeUser(demoUser);
      router.push(demoUser.dashboardPath);
      return;
    }

    setIsLoading(false);
    setErrors({ general: 'Invalid credentials. Please try a demo account below.' });
  };

  const fillDemo = (acc: (typeof demoAccounts)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setErrors({});
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* ── LEFT PANEL ── */}
      <div className="relative lg:w-[60%] hidden lg:flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #1e3a8a 40%, #0F172A 100%)' }}>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Radial glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #F97316 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative z-10 flex flex-col h-full p-10 xl:p-14">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-white tracking-tight">Vidyalaya</span>
              <div className="text-[10px] text-blue-300 -mt-0.5">School ERP</div>
            </div>
          </div>

          {/* Main headline */}
          <div className="mt-16 xl:mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-5">
              <span className="text-xs text-blue-200 font-medium">Trusted by 500+ schools across India</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight font-heading">
              Empowering Schools<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
                Across India
              </span>{' '}
              <span className="not-italic">🇮🇳</span>
            </h1>
            <p className="mt-4 text-blue-200 text-lg leading-relaxed max-w-md">
              The complete school management platform built for Indian schools — affordable, multilingual, and mobile-first.
            </p>
          </div>

          {/* Feature list */}
          <ul className="mt-10 space-y-3.5">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-400/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-orange-400" />
                </div>
                <span className="text-blue-100 text-sm leading-relaxed">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Stats row */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { value: '500+', label: 'Schools' },
              { value: '2L+', label: 'Students' },
              { value: '₹499', label: 'Per Month' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/8 border border-white/12 rounded-xl p-4 text-center backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-2xl font-bold text-white font-heading">{stat.value}</div>
                <div className="text-xs text-blue-300 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="mt-auto pt-10">
            <div className="bg-white rounded-2xl p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-5"
                style={{ background: '#F97316' }} />
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">SR</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "Vidyalaya transformed how we manage our 1,200-student school. Fee collection is now instant and parents get WhatsApp updates automatically."
                  </p>
                  <div className="mt-2.5">
                    <p className="text-slate-900 font-semibold text-sm">Sri Ramulu Goud</p>
                    <p className="text-slate-400 text-xs">Principal, Sri Sai High School, Hyderabad</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── MOBILE TOP BANNER ── */}
      <div className="lg:hidden relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1E40AF 0%, #0F172A 100%)' }}>
        <div className="relative z-10 px-5 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-white tracking-tight">Vidyalaya</div>
              <div className="text-[10px] text-blue-300 -mt-0.5">School ERP</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-semibold text-sm">Empowering Schools</div>
            <div className="text-blue-300 text-xs">Across India 🇮🇳</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 lg:w-[40%] bg-white flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col px-6 sm:px-10 lg:px-10 xl:px-14 py-8 lg:py-10 max-w-md mx-auto w-full lg:max-w-none">

          {/* Top row: Logo (desktop) + Language selector */}
          <div className="flex items-center justify-between mb-8">
            <div className="hidden lg:flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-slate-900 text-lg tracking-tight">Vidyalaya</span>
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveLang(lang.code)}
                  className={cn(
                    'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
                    activeLang === lang.code
                      ? 'bg-blue-700 border-blue-700 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">Welcome back</h2>
            <p className="text-slate-500 text-sm mt-1.5">Sign in to your school portal</p>
          </div>

          {/* General error */}
          {errors.general && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-white text-[10px] font-bold">!</span>
              </div>
              <p className="text-red-700 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email or Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                  placeholder="you@school.edu.in"
                  autoComplete="username"
                  className={cn(
                    'w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
                    'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                    errors.email
                      ? 'border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-bold">!</span>
                  </span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors((prev) => ({ ...prev, password: undefined })); }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={cn(
                    'w-full pl-10 pr-12 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 outline-none transition-all duration-200',
                    'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
                    errors.password
                      ? 'border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-[8px] font-bold">!</span>
                  </span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                className={cn(
                  'w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all duration-200 shrink-0',
                  rememberMe
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-slate-300 hover:border-blue-400'
                )}
                style={{ width: '18px', height: '18px' }}
              >
                {rememberMe && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </button>
              <span className="text-sm text-slate-600 cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
                Remember me for 30 days
              </span>
            </div>

            {/* Login button */}
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
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Portal
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-medium px-1">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Demo accounts */}
          <div>
            <div className="mb-3">
              <p className="text-sm font-semibold text-slate-700">Try Demo Accounts</p>
              <p className="text-xs text-slate-400 mt-0.5">Click any role card to auto-fill credentials</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((acc) => {
                const colors = colorMap[acc.color as DemoColor];
                return (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 group',
                      colors.bg,
                      colors.border,
                      colors.hoverBg,
                      'hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center',
                      colors.bg,
                      'border',
                      colors.border
                    )}>
                      <acc.icon className={cn('w-4 h-4', colors.icon)} />
                    </div>
                    <span className={cn('text-xs font-semibold', colors.icon)}>{acc.role}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer link */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              New school?{' '}
              <Link
                href="/contact"
                className="font-semibold text-blue-700 hover:text-blue-800 transition-colors inline-flex items-center gap-0.5"
              >
                Contact us to get started
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
