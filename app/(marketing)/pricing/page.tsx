import type { Metadata } from 'next';
import Link from 'next/link';
import { CircleCheck as CheckCircle2, X, ArrowRight, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, affordable pricing for Indian schools. Vidyalaya starts at just ₹499/month. No hidden fees, no per-user charges.',
};

const plans = [
  {
    name: 'Starter',
    price: '499',
    annual: '399',
    desc: 'For small primary schools',
    students: 'Up to 200 students',
    color: 'border-slate-200',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Basic Fee Collection', included: true },
      { label: 'SMS Alerts (100/month)', included: true },
      { label: 'WhatsApp Support', included: true },
      { label: 'Exams & Results', included: false },
      { label: 'Staff Management', included: false },
      { label: 'Library System', included: false },
      { label: 'Parent Communication Hub', included: false },
      { label: 'Analytics Dashboard', included: false },
    ],
  },
  {
    name: 'Growth',
    price: '999',
    annual: '799',
    desc: 'Most popular for mid-size schools',
    students: 'Up to 600 students',
    popular: true,
    color: 'border-orange-400',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Full Fee Management', included: true },
      { label: 'SMS Alerts (500/month)', included: true },
      { label: 'Priority WhatsApp Support', included: true },
      { label: 'Exams & Results', included: true },
      { label: 'Staff Management', included: true },
      { label: 'Library System', included: true },
      { label: 'Parent Communication Hub', included: false },
      { label: 'Analytics Dashboard', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '1,999',
    annual: '1,599',
    desc: 'For large or multi-branch schools',
    students: 'Unlimited students',
    color: 'border-slate-800',
    features: [
      { label: 'Student Management', included: true },
      { label: 'Attendance Tracking', included: true },
      { label: 'Full Fee Management + Online Payments', included: true },
      { label: 'Unlimited SMS', included: true },
      { label: 'Dedicated Account Manager', included: true },
      { label: 'Exams & Results', included: true },
      { label: 'Staff Management & Payroll', included: true },
      { label: 'Library System', included: true },
      { label: 'Parent Communication Hub', included: true },
      { label: 'Analytics Dashboard', included: true },
    ],
  },
];

const faqs = [
  { q: 'Is there a free trial?', a: 'Yes! All plans include a free 14-day trial with full feature access. No credit card required.' },
  { q: 'Can I change my plan later?', a: 'Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.' },
  { q: 'Are there any setup fees?', a: 'No setup fees, ever. The monthly plan price is all you pay. We also help you import your data for free.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, debit/credit cards and net banking. Annual plans can also be paid via bank transfer (NEFT/RTGS).' },
  { q: 'What happens if my student count grows beyond the plan limit?', a: 'We will notify you when you are close to the limit. You can upgrade to the next plan at any time with no data loss.' },
  { q: 'Is my data safe?', a: 'Yes. All data is encrypted in transit and at rest. We maintain daily backups and are DPDP compliant.' },
];

export default function PricingPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Pricing</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">Simple, Honest Pricing</h1>
          <p className="text-gray-500 text-lg mb-2">No hidden fees. No per-user charges. No surprises.</p>
          <p className="text-green-600 font-medium text-sm">Save 20% with annual billing</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      

      {/* Plans */}
      <section className="py-20">
        <div className="page-container">
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 ${plan.color} p-7 relative ${plan.popular ? 'shadow-xl' : 'shadow-sm'} transition-shadow duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-orange-500 text-white text-xs font-bold shadow-sm">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h2 className="font-heading font-bold text-slate-900 text-xl mb-1">{plan.name}</h2>
                  <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-heading text-4xl font-bold text-slate-900">₹{plan.price}</span>
                    <span className="text-slate-400 text-sm">/month</span>
                  </div>
                  <p className="text-green-600 text-sm font-medium">₹{plan.annual}/mo billed annually</p>
                  <p className="text-orange-500 text-sm font-semibold mt-2">{plan.students}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5 text-sm">
                      {f.included ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className={f.included ? 'text-slate-700' : 'text-slate-400'}>{f.label}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'btn-gradient-primary shadow-sm'
                      : 'border-2 border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-500'
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-400 text-sm mt-8">
            Need a custom plan for a trust or chain of schools?{' '}
            <Link href="/contact" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
              Contact us
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
            <h2 className="font-heading text-3xl font-bold text-slate-900">Pricing Questions Answered</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-heading font-semibold text-slate-900 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="page-container text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">Our team is happy to walk you through which plan is right for your school — no pressure.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 shadow-md inline-flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-200 inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Talk to Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
