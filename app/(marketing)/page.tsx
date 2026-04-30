import Link from 'next/link';
import { ArrowRight, CircleCheck as CheckCircle2, Star, Users, ClipboardList, IndianRupee, BookOpen, UserCheck, Library, MessageSquare, ChartBar as BarChart2, Layers, Shield, Smartphone, Globe, Zap, Play, ChevronRight } from 'lucide-react';

const stats = [
  { value: '2,400+', label: 'Schools Onboarded', icon: Users },
  { value: '12 Lakh+', label: 'Students Managed', icon: BookOpen },
  { value: '₹499/mo', label: 'Starting Price', icon: IndianRupee },
  { value: '3 Languages', label: 'EN, HI, TE', icon: Globe },
];

const modules = [
  { icon: Users, label: 'Student Management', desc: 'Admissions, profiles, records & transfers', href: '/modules/student-management', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: ClipboardList, label: 'Attendance Tracking', desc: 'Daily, monthly & subject-wise attendance', href: '/modules/attendance', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: IndianRupee, label: 'Fee Management', desc: 'Online collections, dues & instant receipts', href: '/modules/fee-management', color: 'text-orange-600', bg: 'bg-orange-50' },
  { icon: BookOpen, label: 'Exams & Results', desc: 'Marks entry, grade cards & report generation', href: '/modules/exam-results', color: 'text-amber-600', bg: 'bg-amber-50' },
  { icon: UserCheck, label: 'Staff Management', desc: 'Roles, payroll basics & leave tracking', href: '/modules/staff-management', color: 'text-teal-600', bg: 'bg-teal-50' },
  { icon: Library, label: 'Library System', desc: 'Books catalogue, issue & return log', href: '/modules/library', color: 'text-violet-600', bg: 'bg-violet-50' },
  { icon: MessageSquare, label: 'Parent Communication', desc: 'WhatsApp, SMS & push notifications', href: '/modules/parent-communication', color: 'text-pink-600', bg: 'bg-pink-50' },
  { icon: BarChart2, label: 'Analytics', desc: 'Smart dashboards & performance insights', href: '/modules/analytics', color: 'text-cyan-600', bg: 'bg-cyan-50' },
];

const whyItems = [
  { icon: Smartphone, title: 'Mobile-First Design', desc: 'Works perfectly on any smartphone — no laptop needed to manage your school.' },
  { icon: Globe, title: 'Multi-Language Support', desc: 'Full support in English, Hindi, and Telugu. More regional languages coming.' },
  { icon: Zap, title: 'Ready in 24 Hours', desc: 'Onboard your school, import data and go live — all within one business day.' },
  { icon: Shield, title: 'Secure & Reliable', desc: '99.9% uptime SLA. SSL encryption. Daily automated backups. DPDP compliant.' },
  { icon: IndianRupee, title: 'Truly Affordable', desc: 'Plans starting ₹499/month. No hidden fees. No per-user pricing. Flat rate.' },
  { icon: Layers, title: 'All-in-One Platform', desc: '8 integrated modules so you never need to juggle multiple software tools.' },
];

const testimonials = [
  { name: 'Suresh Reddy', role: 'Principal', school: 'Sri Vivekananda High School, Vijayawada', quote: 'Vidyalaya transformed our fee collection. Parents now pay online and we get instant reports. No more registers!', avatar: 'SR', stars: 5 },
  { name: 'Anitha Sharma', role: 'School Administrator', school: 'Bal Vikas Convent, Hyderabad', quote: 'The attendance SMS feature alone saved us 2 hours daily. Parents love the instant notifications.', avatar: 'AS', stars: 5 },
  { name: 'Ravi Kumar', role: 'Correspondent', school: 'Sunrise English Medium School, Nellore', quote: 'We evaluated 5 ERP systems. Vidyalaya was the only one that truly understood rural school needs.', avatar: 'RK', stars: 5 },
];

const plans = [
  { name: 'Starter', price: '499', desc: 'Perfect for small schools', students: 'Up to 200 students', features: ['Student Management', 'Attendance Tracking', 'Basic Fee Collection', 'SMS Alerts (100/mo)', 'WhatsApp Support'] },
  { name: 'Growth', price: '999', desc: 'Most popular for mid-size schools', students: 'Up to 600 students', features: ['Everything in Starter', 'Exam & Results', 'Staff Management', 'Library System', 'SMS Alerts (500/mo)', 'Priority Support'], popular: true },
  { name: 'Pro', price: '1,999', desc: 'For large or multi-branch schools', students: 'Unlimited students', features: ['Everything in Growth', 'Analytics Dashboard', 'Parent Communication Hub', 'Multi-branch Support', 'Unlimited SMS', 'Dedicated Account Manager'] },
];

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-28 lg:pt-28 lg:pb-36">
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,#f97316,transparent_60%),radial-gradient(circle_at_80%_20%,#1e40af,transparent_50%)]" />
        <div className="page-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              Trusted by 2,400+ schools across India
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              India&apos;s Most Affordable{' '}
              <span className="text-orange-400">School ERP</span>{' '}
              — Built for Bharat
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              Manage students, fees, attendance, exams and staff from one simple platform.
              Mobile-first. Available in English, Hindi &amp; Telugu.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="btn-gradient-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Free 14-Day Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium text-slate-200 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-200"
              >
                <Play className="w-4 h-4" />
                Watch Demo
              </Link>
            </div>
            <p className="text-slate-500 text-sm mt-5">No credit card required. Setup in 24 hours.</p>
          </div>
        </div>

        {/* Hero bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60H1440V0C1440 0 1080 60 720 60C360 60 0 0 0 0V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-24 bg-slate-50">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">All Modules</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Everything a School Needs</h2>
            <p className="text-slate-500 text-lg">8 fully integrated modules. One login. Zero confusion.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${mod.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <mod.icon className={`w-6 h-6 ${mod.color}`} />
                </div>
                <h3 className="font-heading font-semibold text-slate-900 mb-2 text-base">{mod.label}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{mod.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-orange-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shadow-sm">
              See Features Overview <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Vidyalaya */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Why Vidyalaya</div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                Built for schools in Tier 2, 3 &amp; Rural India
              </h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Most ERPs are built for large corporate schools with big IT teams. Vidyalaya is designed from scratch for the 1.5 million budget schools across Bharat — affordable, regional, and radically simple.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-orange-500 font-medium hover:text-orange-600 transition-colors">
                Our story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whyItems.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm font-heading">{item.title}</p>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Testimonials</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">School Principals Love Vidyalaya</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold font-heading shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm font-heading">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.role} · {t.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Pricing</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-500 text-lg">No hidden fees. No per-user charges. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 border transition-all duration-300 ${
                  plan.popular
                    ? 'border-orange-400 bg-gradient-to-b from-orange-50 to-white shadow-lg ring-2 ring-orange-400/20 relative'
                    : 'border-slate-200 bg-white hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-heading font-bold text-slate-900 text-lg mb-1">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-2">
                  <span className="font-heading text-4xl font-bold text-slate-900">₹{plan.price}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <p className="text-orange-500 text-sm font-medium mb-6">{plan.students}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'btn-gradient-primary shadow-sm'
                      : 'border border-slate-200 text-slate-700 hover:border-orange-400 hover:text-orange-500'
                  }`}
                >
                  Start Free Trial
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors inline-flex items-center gap-1">
              Compare all plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="page-container text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Modernize Your School?
          </h2>
          <p className="text-orange-100 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of school principals who trust Vidyalaya to manage their institutions every day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold text-base hover:bg-orange-50 transition-all duration-200 shadow-md"
            >
              Start Free Trial — No Card Needed
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all duration-200"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
