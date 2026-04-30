import Link from 'next/link';
import { type LucideIcon, ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react';

interface Feature {
  title: string;
  desc: string;
}

interface ModulePageProps {
  icon: LucideIcon;
  label: string;
  tagline: string;
  heroDesc: string;
  color: string;
  bg: string;
  accentBg: string;
  features: string[];
  deepDive: Feature[];
  relatedModules: { label: string; href: string }[];
}

export function ModulePage({
  icon: Icon,
  label,
  tagline,
  heroDesc,
  color,
  bg,
  accentBg,
  features,
  deepDive,
  relatedModules,
}: ModulePageProps) {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_20%_50%,#f97316,transparent_55%)]" />
        <div className="page-container relative z-10">
          <div className="max-w-3xl">
            <Link href="/features" className="inline-flex items-center gap-1.5 text-orange-400 text-sm mb-6 hover:text-orange-300 transition-colors">
              ← Back to Features
            </Link>
            <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
              <Icon className={`w-7 h-7 ${color}`} />
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{label}</h1>
            <p className="text-orange-300 text-lg font-medium mb-4">{tagline}</p>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">{heroDesc}</p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/register" className="btn-gradient-primary flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shadow-md">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/demo" className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-slate-200 border border-white/20 hover:border-white/40 transition-all duration-200">
                Watch Demo
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-20 bg-white">
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">What&apos;s Included</div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">Everything You Need, Nothing You Don&apos;t</h2>
              <p className="text-slate-500 text-base leading-relaxed mb-8">
                A practical, complete feature set designed for day-to-day school operations — not theoretical enterprise features.
              </p>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`rounded-2xl ${accentBg} p-8 space-y-5`}>
              {deepDive.map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <h3 className="font-heading font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Modules */}
      <section className="py-16 bg-slate-50">
        <div className="page-container">
          <h2 className="font-heading text-2xl font-bold text-slate-900 mb-6">Works Seamlessly With</h2>
          <div className="flex flex-wrap gap-3">
            {relatedModules.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:border-orange-300 hover:text-orange-500 transition-all duration-200"
              >
                {m.label} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="page-container text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">Ready to See {label} in Action?</h2>
          <p className="text-orange-100 mb-7">Try it free for 14 days. No credit card required.</p>
          <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 shadow-md">
            Start Your Free Trial <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
