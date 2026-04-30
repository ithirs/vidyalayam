'use client';

import { useState } from 'react';
import { Play, CircleCheck as CheckCircle2, ArrowRight, Users, Clock } from 'lucide-react';

const features = [
  'Student registration & admission flow',
  'Daily attendance marking on mobile',
  'Fee collection with UPI & receipt generation',
  'Marks entry & report card generation',
  'Parent WhatsApp notification flow',
  'Analytics dashboard for principals',
];

export default function DemoPage() {
  const [form, setForm] = useState({ name: '', school: '', phone: '', students: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_50%,#f97316,transparent_55%)]" />
        <div className="page-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-6">Product Demo</div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
                See Vidyalaya in Action — Live Demo in 30 Minutes
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Our product experts will walk you through every feature relevant to your school — live, on a video call, in your preferred language.
              </p>
              <div className="space-y-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 shadow-xl">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-1">Book Your Free Demo</h2>
              <p className="text-slate-500 text-sm mb-6">We will confirm within 2 hours via WhatsApp.</p>
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 mb-2">Demo Booked!</h3>
                  <p className="text-slate-500 text-sm">Our team will WhatsApp you within 2 hours to confirm the demo time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Principal / Correspondent name" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name *</label>
                    <input required type="text" value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="Sri Vivekananda High School" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">WhatsApp Number *</label>
                    <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Approximate No. of Students</label>
                    <select value={form.students} onChange={(e) => setForm({ ...form, students: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors bg-white">
                      <option value="">Select range</option>
                      <option>Below 200</option>
                      <option>200 – 500</option>
                      <option>500 – 1,000</option>
                      <option>1,000 – 2,000</option>
                      <option>2,000+</option>
                    </select>
                  </div>
                  <button type="submit" className="btn-gradient-primary w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm">
                    Book Free Demo <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-slate-400 text-xs text-center">No credit card. No commitment.</p>
                </form>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-20 bg-white">
        <div className="page-container max-w-3xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Watch Now</div>
          <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">5-Minute Product Walkthrough</h2>
          <p className="text-slate-500 mb-8">Get a quick overview of what Vidyalaya can do for your school in under 5 minutes.</p>
          <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center cursor-pointer group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-slate-900/60" />
            <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white ml-1 fill-white" />
            </div>
            <p className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm">Click to play demo video</p>
          </div>
        </div>
      </section>

      {/* Why Book a Demo */}
      <section className="py-16 bg-slate-50">
        <div className="page-container">
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-5">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-heading font-semibold text-slate-900 mb-2">30-Minute Session</h3>
              <p className="text-slate-500 text-sm">Live, interactive demo tailored to your school size and needs.</p>
            </div>
            <div className="text-center p-5">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-heading font-semibold text-slate-900 mb-2">Your Language</h3>
              <p className="text-slate-500 text-sm">Demo available in English, Hindi and Telugu — your choice.</p>
            </div>
            <div className="text-center p-5">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-heading font-semibold text-slate-900 mb-2">No Obligation</h3>
              <p className="text-slate-500 text-sm">Demo is 100% free. No sales pressure. Decide at your own pace.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
