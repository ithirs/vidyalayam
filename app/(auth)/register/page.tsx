'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GraduationCap, ChevronLeft, ChevronRight, Loader as Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

import { step1Schema, step2Schema, step3Schema, Step1Data, Step2Data, Step3Data } from './types';
import { StepOne } from './StepOne';
import { StepTwo } from './StepTwo';
import { StepThree } from './StepThree';
import { StepFour } from './StepFour';

const STEPS = [
  { number: 1, label: 'School Info' },
  { number: 2, label: 'Admin Account' },
  { number: 3, label: 'Plan Selection' },
  { number: 4, label: 'Confirmation' },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'pro'>('growth');

  const form1 = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      schoolType: 'all_levels',
      board: 'cbse',
      logoUrl: '',
      website: '',
      establishedYear: '',
    },
    mode: 'onTouched',
  });

  const form2 = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: { language: 'en' },
    mode: 'onTouched',
  });

  const goNext = async () => {
    if (currentStep === 1) {
      const valid = await form1.trigger();
      if (!valid) return;
    }
    if (currentStep === 2) {
      const valid = await form2.trigger();
      if (!valid) return;
    }
    if (currentStep === 3) {
      await handleSubmit();
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const d1 = form1.getValues();
      const d2 = form2.getValues();
      const supabase = createClient();
      const payload = {
        school_name: d1.schoolName,
        school_type: d1.schoolType,
        board: d1.board,
        street: d1.street,
        city: d1.city,
        district: d1.district,
        state: d1.state,
        pincode: d1.pincode,
        phone: d1.phone,
        school_email: d1.schoolEmail,
        website: d1.website || null,
        established_year: d1.establishedYear ? parseInt(d1.establishedYear) : null,
        logo_url: d1.logoUrl || null,
        admin_name: d2.adminName,
        admin_email: d2.adminEmail,
        admin_phone: d2.adminPhone,
        language_preference: d2.language,
        plan: selectedPlan,
        status: 'submitted',
      };
      const { error } = await (supabase.from('school_registrations') as ReturnType<typeof supabase.from>).insert(payload as never);
      if (error) throw error;
      setCurrentStep(4);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const d1 = form1.watch();
  const d2 = form2.watch();

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-slate-900 text-lg tracking-tight">Vidyalaya</span>
              <span className="text-[10px] text-slate-400 -mt-0.5">School ERP</span>
            </div>
          </Link>
          <div className="text-sm text-slate-500">
            Already registered?{' '}
            <Link href="/login" className="font-semibold text-orange-500 hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* Progress stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            {/* Connector line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
            <div
              className="absolute top-5 left-0 h-0.5 bg-orange-500 z-0 transition-all duration-500"
              style={{ width: `${((Math.min(currentStep, 4) - 1) / 3) * 100}%` }}
            />

            {STEPS.map((step) => {
              const done = currentStep > step.number;
              const active = currentStep === step.number;
              return (
                <div key={step.number} className="flex flex-col items-center gap-2 z-10">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300',
                    done
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : active
                        ? 'bg-white border-orange-500 text-orange-600 shadow-md shadow-orange-100'
                        : 'bg-white border-slate-200 text-slate-400'
                  )}>
                    {done ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={cn(
                    'text-xs font-medium hidden sm:block transition-colors duration-300',
                    done ? 'text-orange-500' : active ? 'text-slate-900' : 'text-slate-400'
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="sm:hidden text-center text-sm font-semibold text-slate-700 mt-3">
            Step {currentStep}: {STEPS[currentStep - 1]?.label}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {/* Card header */}
          {currentStep < 4 && (
            <div className="px-6 sm:px-8 py-5 border-b border-slate-100 bg-slate-50/60">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                {currentStep === 1 && 'School Information'}
                {currentStep === 2 && 'Admin Account Setup'}
                {currentStep === 3 && 'Choose Your Plan'}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {currentStep === 1 && 'Tell us about your school so we can set up your portal correctly.'}
                {currentStep === 2 && 'Create the admin account that will manage your school portal.'}
                {currentStep === 3 && 'Pick the right plan for your school. All plans start with a 30-day free trial.'}
              </p>
            </div>
          )}

          {/* Card body */}
          <div className={cn('px-6 sm:px-8', currentStep < 4 ? 'py-7' : 'py-10')}>

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {submitError}
              </div>
            )}

            {currentStep === 1 && (
              <StepOne form={form1} logoPreview={logoPreview} onLogoChange={setLogoPreview} />
            )}
            {currentStep === 2 && (
              <StepTwo form={form2} profilePreview={profilePreview} onProfileChange={setProfilePreview} />
            )}
            {currentStep === 3 && (
              <StepThree selected={selectedPlan} onSelect={setSelectedPlan} />
            )}
            {currentStep === 4 && (
              <StepFour
                schoolName={d1.schoolName}
                adminEmail={d2.adminEmail}
                plan={selectedPlan}
              />
            )}
          </div>

          {/* Card footer (navigation) */}
          {currentStep < 4 && (
            <div className="px-6 sm:px-8 py-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-4">
              <div>
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                ) : (
                  <div />
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 hidden sm:block">
                  Step {currentStep} of 3
                </span>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={isSubmitting}
                  className={cn(
                    'flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-sm',
                    isSubmitting
                      ? 'bg-orange-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-md hover:shadow-orange-200 active:scale-[0.99]'
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : currentStep === 3 ? (
                    <>
                      Complete Registration
                      <ChevronRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer note */}
        {currentStep < 4 && (
          <p className="text-center text-xs text-slate-400 mt-6">
            By registering, you agree to Vidyalaya's{' '}
            <Link href="/terms" className="text-orange-500 hover:text-orange-600 transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-orange-500 hover:text-orange-600 transition-colors">
              Privacy Policy
            </Link>
          </p>
        )}
      </main>
    </div>
  );
}
