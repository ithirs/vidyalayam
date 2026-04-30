'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';

const categories = [
  {
    label: 'General',
    faqs: [
      { q: 'What is Vidyalaya?', a: 'Vidyalaya is a cloud-based school management ERP built for Indian schools. It helps manage students, fees, attendance, exams, staff and parent communication from one platform.' },
      { q: 'Who is Vidyalaya for?', a: 'Vidyalaya is built for CBSE, ICSE, state board and international schools across India — from small primary schools with 100 students to large institutions with 5,000+.' },
      { q: 'Is there a mobile app?', a: 'Yes! There is a parent-facing Android app and a teacher-facing mobile-optimized web interface. A dedicated iOS app is coming in 2025.' },
      { q: 'How many languages does Vidyalaya support?', a: 'Currently English, Hindi and Telugu are fully supported. Kannada, Tamil and Marathi are in development.' },
    ],
  },
  {
    label: 'Pricing & Plans',
    faqs: [
      { q: 'Is there a free trial?', a: 'Yes. All plans include a 14-day free trial with full feature access. No credit card is required to start.' },
      { q: 'What is the minimum price?', a: 'The Starter plan begins at ₹499/month (billed monthly) or ₹399/month if billed annually. It covers up to 200 students.' },
      { q: 'Are there any setup or onboarding fees?', a: 'No setup fees. We also help you import your student data and configure the system for free during onboarding.' },
      { q: 'Can I switch plans?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect from the next billing cycle with no data loss.' },
      { q: 'Do you offer discounts for NGO or government schools?', a: 'Yes. We have special pricing for government-aided schools, NGO-run schools and education trusts. Contact us to learn more.' },
    ],
  },
  {
    label: 'Features',
    faqs: [
      { q: 'Does Vidyalaya support online fee payment?', a: 'Yes. Parents can pay fees via UPI, debit card, credit card and net banking. Payments are powered by Razorpay and reconciled automatically.' },
      { q: 'Can I generate report cards?', a: 'Yes. Vidyalaya generates fully branded, print-ready report cards in PDF with your school logo, principal signature area and grade analysis.' },
      { q: 'Does it support WhatsApp notifications to parents?', a: 'Yes. Attendance alerts, fee receipts, report cards and school circulars are sent automatically to parents on WhatsApp.' },
      { q: 'Can teachers mark attendance on their phones?', a: 'Yes. Teachers access a mobile-optimized interface and can mark attendance for their entire class in under a minute.' },
      { q: 'Is there a library management module?', a: 'Yes. The library module is available on the Growth and Pro plans and supports book catalogue, issue/return tracking, barcode and overdue reminders.' },
    ],
  },
  {
    label: 'Security & Data',
    faqs: [
      { q: 'Is my school data safe?', a: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We maintain daily automated backups with 30-day retention.' },
      { q: 'Is Vidyalaya DPDP compliant?', a: 'Yes. We are compliant with India\'s Digital Personal Data Protection Act. We never sell or share your data with third parties.' },
      { q: 'Can I export my data if I leave?', a: 'Absolutely. You can export all your data in standard CSV and PDF formats at any time — no lock-in.' },
      { q: 'What is your uptime SLA?', a: 'We guarantee 99.9% uptime. Our infrastructure runs on AWS Mumbai region with multi-AZ redundancy.' },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left bg-white rounded-xl border border-slate-200 hover:border-orange-200 transition-colors duration-200 overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <span className="font-heading font-semibold text-slate-900 text-sm">{q}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && (
        <div className="px-5 pb-5 pt-0 border-t border-slate-100">
          <p className="text-slate-500 text-sm leading-relaxed mt-3">{a}</p>
        </div>
      )}
    </button>
  );
}

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState('General');

  const currentFaqs = categories.find(c => c.label === activeCategory)?.faqs ?? [];

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-500 text-lg">Everything you need to know before getting started.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="page-container max-w-3xl mx-auto">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  activeCategory === cat.label
                    ? 'bg-orange-500 border-orange-500 text-white'
                    : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {currentFaqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-14 bg-orange-50 rounded-2xl border border-orange-100 p-8 text-center">
            <h2 className="font-heading text-xl font-bold text-slate-900 mb-2">Still Have Questions?</h2>
            <p className="text-slate-500 text-sm mb-6">Our team is happy to answer any question — on WhatsApp, call or email.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact" className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-green-300 text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
