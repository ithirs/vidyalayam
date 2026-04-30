'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Mail,
  MessageCircle,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowRight,
  Shield,
  Clock,
  ExternalLink,
} from 'lucide-react';

const productLinks = [
  { label: 'Features Overview', href: '/features' },
  { label: 'Student Management', href: '/modules/student-management' },
  { label: 'Fee Management', href: '/modules/fee-management' },
  { label: 'Attendance Tracking', href: '/modules/attendance' },
  { label: 'Exams & Results', href: '/modules/exam-results' },
  { label: 'Staff Management', href: '/modules/staff-management' },
  { label: 'Library System', href: '/modules/library' },
  { label: 'Parent Communication', href: '/modules/parent-communication' },
  { label: 'Analytics Dashboard', href: '/modules/analytics' },
  { label: 'Pricing', href: '/pricing' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Request Demo', href: '/demo' },
  { label: 'Partner with Us', href: '/partners', badge: 'Soon' },
  { label: 'Careers', href: '/careers', badge: 'Soon' },
];

const languages = [
  { label: 'English', code: 'en' },
  { label: 'हिंदी', code: 'hi' },
  { label: 'తెలుగు', code: 'te' },
];

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/vidyalayaerp', label: 'Twitter', hover: 'hover:text-sky-400' },
  { icon: Linkedin, href: 'https://linkedin.com/company/vidyalayaerp', label: 'LinkedIn', hover: 'hover:text-blue-400' },
  { icon: Youtube, href: 'https://youtube.com/@vidyalayaerp', label: 'YouTube', hover: 'hover:text-red-400' },
  { icon: Instagram, href: 'https://instagram.com/vidyalayaerp', label: 'Instagram', hover: 'hover:text-pink-400' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap.xml' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-sidebar text-slate-300">

      {/* Newsletter Bar */}
      <div className="bg-gradient-brand">
        <div className="page-container py-5">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-heading font-semibold text-white text-base">
                Get school management tips &amp; updates
              </p>
              <p className="text-orange-100 text-xs mt-0.5">No spam. Unsubscribe anytime.</p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2.5 rounded-xl">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">You are subscribed!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 sm:w-64 px-4 py-2.5 rounded-xl bg-white/20 text-white placeholder-orange-200 border border-white/30 focus:outline-none focus:border-white text-sm transition-all duration-200"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-orange-600 rounded-xl font-semibold text-sm hover:bg-orange-50 transition-all duration-200 flex items-center gap-1.5 shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="page-container py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 - Brand */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-heading font-bold text-white text-xl">Vidyalaya</span>
                <p className="text-[10px] text-slate-500 -mt-0.5">School ERP</p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              India&apos;s most affordable school ERP — built for Bharat. Mobile-first, multi-lingual,
              and zero IT staff needed.
            </p>

            <div className="flex items-center gap-1.5">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm text-slate-400">Made with</span>
              <span className="text-red-400">❤️</span>
              <span className="text-sm text-slate-400">in India</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a
                  key={`social.label-${i}`}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 ${social.hover} hover:bg-white/10 transition-all duration-200`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-white/10 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Shield className="w-3.5 h-3.5 text-green-400" />
                <span className="text-xs text-slate-400">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 font-medium">Razorpay</span>
                <span className="text-xs text-slate-500">Secured</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Product
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-orange-400 transition-colors duration-200 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link, i) => (
                <li key={`${link.href}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-orange-400 transition-colors duration-200 shrink-0" />
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20 font-medium">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Support & Languages */}
          <div className="space-y-7">
            <div>
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-green-400 transition-colors duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                      <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">WhatsApp Support</p>
                      <p className="font-medium">+91 XXXXX XXXXX</p>
                    </div>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@vidyalaya.in"
                    className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors duration-200">
                      <Mail className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="font-medium">support@vidyalaya.in</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Office Hours</p>
                    <p className="text-sm font-medium text-slate-400">Mon–Sat, 9AM–6PM IST</p>
                  </div>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                    Help Documentation
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20">Soon</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/videos"
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                    Training Videos
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/20">Soon</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-3">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                  <button
                    key={`lang.code-${i}`}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-orange-500/20 hover:border-orange-500/30 hover:text-orange-300 transition-all duration-200"
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="page-container py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2025 Vidyalaya ERP. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {legalLinks.map((link, i) => (
                <span key={`${link.href}-${i}`} className="flex items-center gap-4">
                  <Link href={link.href} className="hover:text-orange-400 transition-colors duration-200">
                    {link.label}
                  </Link>
                  {i < legalLinks.length - 1 && <span className="text-slate-700">|</span>}
                </span>
              ))}
            </div>
            <p className="text-slate-600">🏫 Serving schools in AP, Telangana &amp; across India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
