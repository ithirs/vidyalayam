'use client';

import { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, ArrowRight, Phone } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', school: '', phone: '', email: '', message: '', type: 'demo' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp Support',
      desc: 'Fastest response — usually within minutes',
      value: '+91 98765 43210',
      href: 'https://wa.me/919876543210',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: Mail,
      title: 'Email Us',
      desc: 'For detailed queries & partnerships',
      value: 'hello@vidyalaya.in',
      href: 'mailto:hello@vidyalaya.in',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Phone,
      title: 'Call Us',
      desc: 'Mon–Sat, 9AM–6PM IST',
      value: '+91 44 4567 8900',
      href: 'tel:+914445678900',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      icon: MapPin,
      title: 'Head Office',
      desc: 'Walk in for a live demo',
      value: 'Hitech City, Hyderabad, Telangana 500081',
      color: 'text-slate-600',
      bg: 'bg-slate-50',
    },
  ];

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0" />
        <div className="page-container text-center max-w-2xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Contact Us</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4">We&apos;d Love to Hear from You</h1>
          <p className="text-gray-500 text-lg">Whether you want a demo, need support, or just have a question — we&apos;re here for you.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

     

      <section className="py-20">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Form */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 text-sm mb-7">We typically respond within 2 business hours.</p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Message Received!</h3>
                  <p className="text-slate-500">Our team will reach out within 2 hours on WhatsApp or email.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Enquiry Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['demo', 'support', 'sales'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, type: t })}
                          className={`py-2 rounded-lg text-sm font-medium capitalize border transition-all duration-200 ${
                            form.type === t
                              ? 'bg-orange-500 border-orange-500 text-white'
                              : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500'
                          }`}
                        >
                          {t === 'demo' ? 'Request Demo' : t === 'support' ? 'Support' : 'Sales'}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Suresh Reddy"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">School Name *</label>
                      <input
                        required
                        type="text"
                        value={form.school}
                        onChange={(e) => setForm({ ...form, school: e.target.value })}
                        placeholder="Sri Vivekananda High School"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="principal@school.in"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your school and what you're looking for..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-400 text-sm transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gradient-primary w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
                  >
                    Send Message <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-5">
              <div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-1">Other Ways to Reach Us</h2>
                <p className="text-slate-500 text-sm">WhatsApp is the fastest — our team is always on it.</p>
              </div>
              {contactMethods.map((method) => (
                <div key={method.title} className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl ${method.bg} flex items-center justify-center shrink-0`}>
                      <method.icon className={`w-5 h-5 ${method.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-slate-900 mb-0.5">{method.title}</p>
                      <p className="text-slate-400 text-xs mb-1">{method.desc}</p>
                      {method.href ? (
                        <a href={method.href} target="_blank" rel="noopener noreferrer" className={`text-sm font-medium ${method.color} hover:opacity-80 transition-opacity`}>
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm text-slate-600">{method.value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-orange-50 rounded-2xl border border-orange-100 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-heading font-semibold text-slate-900 text-sm">Office Hours</span>
                </div>
                <p className="text-slate-600 text-sm">Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
                <p className="text-slate-400 text-xs mt-1">WhatsApp support available until 9 PM on weekdays</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
