import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Users, BookOpen, IndianRupee, Globe, Heart, Target, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story of Vidyalaya — India\'s most affordable school ERP built for Bharat\'s 1.5 million budget schools.',
};

const values = [
  { icon: Heart, title: 'Accessibility First', desc: 'Every school in India — rural or urban, big or small — deserves great software at a price they can afford.' },
  { icon: Globe, title: 'Regional by Design', desc: 'Built for Indian schools from day one — supporting Telugu, Hindi and English with more regional languages on the roadmap.' },
  { icon: Lightbulb, title: 'Radical Simplicity', desc: 'If a principal in a rural school can\'t figure it out in 5 minutes, we redesign it. Simplicity is not optional.' },
  { icon: Target, title: 'Outcome-Focused', desc: 'We measure success by how much time your staff saves and how well parents are informed — not by feature count.' },
];

const milestones = [
  { year: '2020', title: 'Founded in Hyderabad', desc: 'Started with one school in Vijayawada and the mission to democratize school software in India.' },
  { year: '2021', title: 'First 100 Schools', desc: 'Reached 100 schools across Andhra Pradesh and Telangana within 12 months of launch.' },
  { year: '2022', title: 'Hindi & Telugu Support', desc: 'Launched full multi-language support — the first school ERP in India with complete Telugu language UI.' },
  { year: '2023', title: '1,000 Schools & Parent App', desc: 'Crossed 1,000 schools. Launched the Vidyalaya Parent App on Android with 80,000+ downloads.' },
  { year: '2024', title: '2,400+ Schools Nationwide', desc: 'Now serving schools in 18 states. Expanded to Karnataka, Maharashtra, UP and Rajasthan.' },
];

const team = [
  { name: 'Kiran Babu', role: 'Co-Founder & CEO', desc: 'Former school teacher turned tech entrepreneur. Spent 6 years as a maths teacher in a rural school in Krishna district.', initials: 'KB' },
  { name: 'Priya Nair', role: 'Co-Founder & CTO', desc: 'IIT Bombay graduate with 10 years in edtech and SaaS. Built scalable platforms used by 500K+ users.', initials: 'PN' },
  { name: 'Venkat Rao', role: 'Head of Product', desc: 'Previously product lead at an Andhra Pradesh government school digitization initiative.', initials: 'VR' },
  { name: 'Deepa Sharma', role: 'Head of Customer Success', desc: 'Onboarded 1,200+ schools personally. Speaks Telugu, Hindi, Kannada and English fluently.', initials: 'DS' },
];

const stats = [
  { value: '2,400+', label: 'Schools', icon: BookOpen },
  { value: '12 Lakh+', label: 'Students', icon: Users },
  { value: '18 States', label: 'Pan-India', icon: Globe },
  { value: '₹499', label: 'Starting Price', icon: IndianRupee },
];

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_25%_50%,#f97316,transparent_55%)]" />
        <div className="page-container relative z-10 max-w-3xl">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold uppercase tracking-widest mb-6">Our Story</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Built by Teachers, <br />for Schools Across Bharat
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Vidyalaya was born from a simple frustration — India has 1.5 million schools, but affordable, easy-to-use school management software barely exists. We set out to change that.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50H1440V0C1440 0 1080 50 720 50C360 50 0 0 0 0V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 bg-white border-b border-slate-100">
        <div className="page-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="w-6 h-6 text-orange-400 mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-slate-900 mb-1">{s.value}</div>
                <div className="text-slate-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="page-container max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
              Make Every School in India Run Like a 21st-Century Institution
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
              We believe that a school in a small town in Andhra Pradesh or a village in Bihar deserves the same quality of digital tools as an expensive private school in a metro city. That belief drives every product decision we make.
            </p>
          </div>

          {/* Values */}
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 mb-1">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-50">
        <div className="page-container max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Journey</div>
            <h2 className="font-heading text-3xl font-bold text-slate-900">Five Years, 2,400+ Schools</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-orange-200" />
            <div className="space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative flex items-start gap-6 pl-14">
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-orange-600 text-xs">{m.year}</span>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-slate-200 flex-1 shadow-sm">
                    <h3 className="font-heading font-semibold text-slate-900 mb-1">{m.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="page-container">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Team</div>
            <h2 className="font-heading text-3xl font-bold text-slate-900">The People Behind Vidyalaya</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold font-heading text-lg mx-auto mb-4">
                  {member.initials}
                </div>
                <h3 className="font-heading font-semibold text-slate-900 mb-0.5">{member.name}</h3>
                <p className="text-orange-500 text-xs font-medium mb-3">{member.role}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="page-container text-center">
          <h2 className="font-heading text-3xl font-bold text-white mb-4">Join the Vidyalaya Family</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">2,400+ schools trust Vidyalaya every day. Be the next.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="px-8 py-3.5 rounded-xl bg-white text-orange-600 font-semibold hover:bg-orange-50 transition-all duration-200 shadow-md inline-flex items-center gap-2">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="px-8 py-3.5 rounded-xl border border-white/40 text-white font-semibold hover:bg-white/10 transition-all duration-200">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
