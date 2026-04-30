'use client';

import { Check, X, Zap, TrendingUp, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Zap,
    price: '499',
    annual: '399',
    desc: 'For small primary schools',
    students: 'Up to 200 students',
    popular: false,
    color: 'slate',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Basic Fee Collection', included: true },
      { label: 'SMS Alerts (100/month)', included: true },
      { label: 'WhatsApp Support', included: true },
      { label: 'Exams & Results', included: false },
      { label: 'Staff Management', included: false },
      { label: 'Analytics Dashboard', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: TrendingUp,
    price: '999',
    annual: '799',
    desc: 'Most popular for mid-size schools',
    students: 'Up to 600 students',
    popular: true,
    color: 'orange',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Full Fee Management', included: true },
      { label: 'SMS Alerts (500/month)', included: true },
      { label: 'Priority WhatsApp Support', included: true },
      { label: 'Exams & Results', included: true },
      { label: 'Staff Management', included: true },
      { label: 'Analytics Dashboard', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    icon: Crown,
    price: '1,999',
    annual: '1,599',
    desc: 'For large or multi-branch schools',
    students: 'Unlimited students',
    popular: false,
    color: 'blue',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance + Biometric', included: true },
      { label: 'Full Fee + Online Payments', included: true },
      { label: 'Unlimited SMS', included: true },
      { label: 'Dedicated Account Manager', included: true },
      { label: 'Exams & Results', included: true },
      { label: 'Staff Management & Payroll', included: true },
      { label: 'Analytics Dashboard', included: true },
    ],
  },
] as const;

type PlanId = 'starter' | 'growth' | 'pro';

interface Props {
  selected: PlanId;
  onSelect: (plan: PlanId) => void;
}

const colorMap = {
  slate: {
    border: 'border-slate-300',
    selectedBorder: 'border-slate-700',
    icon: 'bg-slate-100 text-slate-600',
    badge: 'bg-slate-100 text-slate-600',
    checkmark: 'bg-slate-700 text-white',
  },
  orange: {
    border: 'border-orange-200',
    selectedBorder: 'border-orange-500',
    icon: 'bg-orange-100 text-orange-600',
    badge: 'bg-orange-500 text-white',
    checkmark: 'bg-orange-500 text-white',
  },
  blue: {
    border: 'border-blue-200',
    selectedBorder: 'border-blue-700',
    icon: 'bg-blue-100 text-blue-700',
    badge: 'bg-blue-700 text-white',
    checkmark: 'bg-blue-700 text-white',
  },
};

export function StepThree({ selected, onSelect }: Props) {
  return (
    <div className="space-y-5">
      <div className="text-center p-4 rounded-2xl bg-green-50 border border-green-200">
        <p className="text-green-700 font-semibold text-sm">
          30-day free trial included with all plans
        </p>
        <p className="text-green-600 text-xs mt-0.5">No credit card required to start. Razorpay payments configured after setup.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLANS.map((plan) => {
          const isSelected = selected === plan.id;
          const colors = colorMap[plan.color];
          const Icon = plan.icon;

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onSelect(plan.id)}
              className={cn(
                'relative text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:shadow-md',
                isSelected
                  ? cn(colors.selectedBorder, 'shadow-md')
                  : cn(colors.border, 'hover:border-opacity-60')
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-500 text-white text-[11px] font-bold whitespace-nowrap">
                  Most Popular
                </div>
              )}

              {isSelected && (
                <div className={cn(
                  'absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center',
                  colors.checkmark
                )}>
                  <Check className="w-3 h-3" strokeWidth={3} />
                </div>
              )}

              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', colors.icon)}>
                <Icon className="w-4.5 h-4.5" style={{ width: '18px', height: '18px' }} />
              </div>

              <div className="font-bold text-slate-900 text-base font-heading">{plan.name}</div>
              <div className="text-xs text-slate-400 mb-3">{plan.desc}</div>

              <div className="flex items-baseline gap-0.5 mb-0.5">
                <span className="text-xl font-bold text-slate-900 font-heading">₹{plan.price}</span>
                <span className="text-xs text-slate-400">/mo</span>
              </div>
              <div className="text-xs text-green-600 font-medium mb-3">₹{plan.annual}/mo annually</div>
              <div className="text-xs font-semibold text-orange-600 mb-4">{plan.students}</div>

              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-xs">
                    {f.included ? (
                      <Check className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" strokeWidth={2} />
                    )}
                    <span className={f.included ? 'text-slate-600' : 'text-slate-300'}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400">
        You can change your plan at any time from the dashboard.
      </p>
    </div>
  );
}
