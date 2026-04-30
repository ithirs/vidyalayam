'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CircleCheck as CheckCircle, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const NEXT_STEPS = [
  { label: 'Add your first class & sections' },
  { label: 'Add students and their details' },
  { label: 'Configure fee structure' },
  { label: 'Invite teachers & staff' },
];

interface Props {
  schoolName: string;
  adminEmail: string;
  plan: string;
}

const PLAN_LABELS: Record<string, string> = {
  starter: 'Starter — ₹499/mo',
  growth: 'Growth — ₹999/mo',
  pro: 'Pro — ₹1,999/mo',
};

export function StepFour({ schoolName, adminEmail, plan }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center text-center py-4">

      {/* Animated check */}
      <div className={cn(
        'transition-all duration-700',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      )}>
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30" />
          <div className="relative w-24 h-24 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-200">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className={cn(
        'transition-all duration-500 delay-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mb-2">
          Your school is ready!
        </h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Welcome aboard! Your 30-day free trial has started. Here's a summary of your setup.
        </p>
      </div>

      {/* Summary card */}
      <div className={cn(
        'w-full max-w-sm mt-7 bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left transition-all duration-500 delay-500',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Setup Summary</h3>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">School</span>
            <span className="text-sm font-semibold text-slate-900 text-right max-w-[60%] truncate">{schoolName || '—'}</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Admin Email</span>
            <span className="text-sm font-semibold text-slate-900 text-right max-w-[60%] truncate">{adminEmail || '—'}</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Plan</span>
            <span className="text-sm font-semibold text-orange-600">{PLAN_LABELS[plan] || plan}</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Trial ends</span>
            <span className="text-sm font-semibold text-green-600">30 days from today</span>
          </div>
        </div>
      </div>

      {/* Next steps */}
      <div className={cn(
        'w-full max-w-sm mt-6 transition-all duration-500 delay-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <h3 className="text-sm font-semibold text-slate-700 mb-3 text-left">Next steps to get started:</h3>
        <div className="space-y-2.5">
          {NEXT_STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-left">
              <div className="w-5 h-5 rounded border-2 border-slate-300 flex items-center justify-center shrink-0" />
              <span className="text-sm text-slate-600">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={cn(
        'mt-8 transition-all duration-500 delay-1000',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}>
        <Link
          href="/login"
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm shadow-lg shadow-orange-200 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 hover:shadow-orange-300"
        >
          <LayoutDashboard className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
          Go to Dashboard
        </Link>
        <p className="mt-3 text-xs text-slate-400">
          Check your email for login instructions
        </p>
      </div>
    </div>
  );
}
