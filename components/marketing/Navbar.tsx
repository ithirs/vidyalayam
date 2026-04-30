'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GraduationCap, ChevronDown, Globe, ArrowRight, Menu, X, Users, ClipboardList, IndianRupee, BookOpen, UserCheck, Library, MessageSquare, ChartBar as BarChart2, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

const modules = [
  { icon: Layers, label: 'Features Overview', desc: 'See everything Vidyalaya offers', href: '/features', highlight: true },
  { icon: Users, label: 'Student Management', desc: 'Admissions, records & tracking', href: '/modules/student-management' },
  { icon: ClipboardList, label: 'Attendance Tracking', desc: 'Daily & monthly attendance', href: '/modules/attendance' },
  { icon: IndianRupee, label: 'Fee Management', desc: 'Collections, dues & receipts', href: '/modules/fee-management' },
  { icon: BookOpen, label: 'Exams & Results', desc: 'Marks entry & report cards', href: '/modules/exam-results' },
  { icon: UserCheck, label: 'Staff Management', desc: 'Roles, payroll & HR basics', href: '/modules/staff-management' },
  { icon: Library, label: 'Library System', desc: 'Books, issue & return log', href: '/modules/library' },
  { icon: MessageSquare, label: 'Parent Communication', desc: 'WhatsApp, SMS & push alerts', href: '/modules/parent-communication' },
  { icon: BarChart2, label: 'Analytics', desc: 'Dashboards & smart insights', href: '/modules/analytics' },
];

const resourceLinks = [
  { icon: BookOpen, label: 'Blog', desc: 'Tips, guides & case studies', href: '/blog' },
  { icon: Layers, label: 'FAQ', desc: 'Answers to common questions', href: '/faq' },
  { icon: BarChart2, label: 'Demo Video', desc: 'Watch a 5-min product walkthrough', href: '/demo' },
];

const languages = [
  { code: 'en', label: 'EN', full: 'English' },
  { code: 'hi', label: 'हिं', full: 'हिंदी' },
  { code: 'te', label: 'తె', full: 'తెలుగు' },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/features', dropdown: 'features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources', dropdown: 'resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        // className={cn(
        //   'sticky top-0 z-50 w-full transition-all duration-300',
        //   scrolled
        //     ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100'
        //     : 'bg-transparent'
        // )}
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-100'
        )}
      >
        <div className="page-container">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-brand-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className={cn(
                  'font-heading font-bold text-xl tracking-tight transition-colors duration-300',
                  scrolled ? 'text-slate-900' : 'text-slate-900'
                )}>
                  Vidyalaya
                </span>
                <span className="text-[10px] text-slate-400 font-sans -mt-0.5">School ERP</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleMouseEnter(link.dropdown)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive(link.href)
                        ? 'text-orange-500'
                        : 'text-slate-600 hover:text-orange-500 hover:bg-orange-50'
                    )}
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200',
                          activeDropdown === link.dropdown && 'rotate-180'
                        )}
                      />
                    )}
                  </Link>

                  {/* Features Mega Menu */}
                  {link.dropdown === 'features' && activeDropdown === 'features' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 animate-scale-in z-[200]"
                      onMouseEnter={() => handleMouseEnter('features')}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {modules.map((mod) => (
                          <Link
                            key={mod.href}
                            href={mod.href}
                            className={cn(
                              'flex items-start gap-3 p-3 rounded-xl transition-all duration-200 group',
                              mod.highlight
                                ? 'col-span-2 bg-gradient-brand-soft border border-orange-100'
                                : 'hover:bg-orange-50'
                            )}
                          >
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                              mod.highlight ? 'bg-orange-500' : 'bg-orange-100 group-hover:bg-orange-500 transition-colors duration-200'
                            )}>
                              <mod.icon className={cn(
                                'w-4 h-4',
                                mod.highlight ? 'text-white' : 'text-orange-600 group-hover:text-white transition-colors duration-200'
                              )} />
                            </div>
                            <div>
                              <p className={cn(
                                'text-sm font-semibold font-heading',
                                mod.highlight ? 'text-orange-700' : 'text-slate-800'
                              )}>{mod.label}</p>
                              <p className="text-xs text-slate-400 mt-0.5">{mod.desc}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-400">7 powerful modules for complete school management</span>
                        <Link href="/features" className="text-xs font-medium text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors">
                          View all features <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Resources Dropdown */}
                  {link.dropdown === 'resources' && activeDropdown === 'resources' && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 animate-scale-in z-[200]"
                      onMouseEnter={() => handleMouseEnter('resources')}
                      onMouseLeave={handleMouseLeave}
                    >
                      {resourceLinks.map((res) => (
                        <Link
                          key={res.href}
                          href={res.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-orange-100 group-hover:bg-orange-500 flex items-center justify-center shrink-0 transition-colors duration-200">
                            <res.icon className="w-4 h-4 text-orange-600 group-hover:text-white transition-colors duration-200" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 font-heading">{res.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{res.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                >
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">{languages.find(l => l.code === activeLang)?.label}</span>
                  <ChevronDown className={cn('w-3 h-3 transition-transform duration-200', langOpen && 'rotate-180')} />
                </button>
                {langOpen && (
                  <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 p-1.5 animate-scale-in z-[200]">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                        className={cn(
                          'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-200',
                          activeLang === lang.code
                            ? 'bg-orange-50 text-orange-600 font-medium'
                            : 'text-slate-600 hover:bg-slate-50'
                        )}
                      >
                        <span>{lang.full}</span>
                        <span className="text-xs text-slate-400">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 text-slate-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-gradient-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-brand-sm"
              >
                Start Free Trial
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 left-0 right-0 bg-white shadow-xl animate-fade-in max-h-screen overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-100">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-white" />
                </div>
                <span className="font-heading font-bold text-lg text-slate-900">Vidyalaya</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileAccordion(
                          mobileAccordion === link.dropdown ? null : link.dropdown!
                        )}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-200"
                      >
                        <span>{link.label}</span>
                        <ChevronDown className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          mobileAccordion === link.dropdown && 'rotate-180'
                        )} />
                      </button>
                      {mobileAccordion === link.dropdown && (
                        <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-orange-100 pl-3">
                          {(link.dropdown === 'features' ? modules : resourceLinks).map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
                            >
                              <item.icon className="w-4 h-4 text-orange-400 shrink-0" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'block px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                        isActive(link.href)
                          ? 'bg-orange-50 text-orange-500'
                          : 'text-slate-700 hover:bg-orange-50 hover:text-orange-500'
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Language Switcher Mobile */}
              <div className="pt-4 pb-2">
                <p className="text-xs text-slate-400 uppercase tracking-wider px-3 mb-2">Language</p>
                <div className="flex gap-2 px-3">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setActiveLang(lang.code)}
                      className={cn(
                        'flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-200',
                        activeLang === lang.code
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-500'
                      )}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 space-y-2 border-t border-slate-100">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-500 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="btn-gradient-primary flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium shadow-brand-sm"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
