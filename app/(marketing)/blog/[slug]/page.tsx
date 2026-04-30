import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog Post',
  description: 'School management insights from the Vidyalaya team.',
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <div className="bg-white">

      {/* Back nav */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="page-container">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-slate-500 text-sm hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="py-16">
        <div className="page-container max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">School Management</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock className="w-3.5 h-3.5" />5 min read</span>
              <span className="text-slate-400 text-xs">Dec 10, 2024</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
              {params.slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-orange-400 pl-4">
              A practical guide for school principals and administrators across India.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 leading-relaxed mb-6">
              Managing a school efficiently is no small task. From tracking hundreds of students and their fees, to keeping parents informed and generating compliance reports — the workload on school administrators is immense. Yet, many schools across India still rely on paper registers and spreadsheets.
            </p>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mt-10 mb-4">Why This Matters for Your School</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              The difference between a school that runs smoothly and one that is always firefighting often comes down to how well information flows between staff, parents and management. Modern school management software can bridge this gap — but only if it is the right tool for your context.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Indian schools, particularly in Tier 2 and Tier 3 cities, have unique requirements: regional language support, mobile-first interfaces (since most parents use smartphones, not laptops), affordable pricing and simple onboarding. Most enterprise ERPs miss these entirely.
            </p>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mt-10 mb-4">Practical Steps You Can Take Today</h2>
            <ul className="space-y-3 mb-6">
              {['Start with one module — attendance or fees — rather than everything at once', 'Involve your teachers in the selection process; they will be daily users', 'Ask vendors for references from schools in your region and of similar size', 'Prioritize WhatsApp integration since that is where parents already are', 'Ensure data export is possible before you commit to any platform'].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mt-10 mb-4">The Bottom Line</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Digital transformation does not have to be overwhelming or expensive. The right school management software should feel like a natural extension of how your school already works — just faster, more accurate and with better communication to parents.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Vidyalaya was built from this philosophy. If you would like to see how it can help your specific school, we would love to show you a live demo.
            </p>
          </div>

          {/* CTA in article */}
          <div className="mt-12 bg-orange-50 rounded-2xl border border-orange-100 p-7 text-center">
            <h3 className="font-heading font-bold text-slate-900 text-xl mb-2">Ready to see Vidyalaya for your school?</h3>
            <p className="text-slate-500 text-sm mb-5">14-day free trial. No credit card. Onboarding support included.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/register" className="btn-gradient-primary inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/demo" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium border border-slate-200 text-slate-700 hover:border-orange-300 hover:text-orange-500 transition-all">
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 pt-8 border-t border-slate-100">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-orange-500 font-medium text-sm hover:text-orange-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              More Articles
            </Link>
          </div>

        </div>
      </article>

    </div>
  );
}
