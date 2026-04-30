import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'School management tips, product updates and case studies from the Vidyalaya team.',
};

const posts = [
  {
    slug: 'how-to-reduce-fee-defaulters',
    title: 'How to Reduce Fee Defaulters in Your School by 40%',
    excerpt: 'A practical, step-by-step guide on using automated reminders, online payment links and WhatsApp follow-ups to dramatically improve fee collection rates.',
    category: 'Fee Management',
    readTime: '5 min read',
    date: 'Dec 10, 2024',
    featured: true,
  },
  {
    slug: 'digital-attendance-benefits',
    title: '5 Reasons Every School Should Switch to Digital Attendance',
    excerpt: 'Paper registers, proxy entries and end-of-day data entry are costing your school time and accuracy. Here is why digital attendance is a game-changer.',
    category: 'Attendance',
    readTime: '4 min read',
    date: 'Nov 28, 2024',
  },
  {
    slug: 'parent-communication-whatsapp',
    title: 'Why WhatsApp is the Best Channel for School-Parent Communication in India',
    excerpt: 'Over 90% of Indian parents use WhatsApp daily. Here is how schools leveraging WhatsApp for communication are seeing 3x better parent engagement.',
    category: 'Communication',
    readTime: '6 min read',
    date: 'Nov 15, 2024',
  },
  {
    slug: 'cbse-report-card-digitally',
    title: 'How to Generate CBSE Report Cards Digitally in Under 10 Minutes',
    excerpt: 'A walkthrough of how Vidyalaya schools generate fully compliant, printer-ready CBSE report cards for their entire school with just a few clicks.',
    category: 'Exams & Results',
    readTime: '4 min read',
    date: 'Oct 30, 2024',
  },
  {
    slug: 'school-erp-comparison-india',
    title: 'School ERP Comparison 2024: What to Look for When Choosing School Software',
    excerpt: 'Not all school ERPs are built alike. Here is a no-nonsense guide to evaluating school management software — features, pricing, support and local relevance.',
    category: 'Guides',
    readTime: '8 min read',
    date: 'Oct 18, 2024',
  },
  {
    slug: 'library-management-tips',
    title: '7 Tips to Manage Your School Library Without a Full-Time Librarian',
    excerpt: 'Small and medium schools often don\'t have a dedicated librarian. These practical tips and a digital system can make your library run smoothly with minimal staff.',
    category: 'Library',
    readTime: '5 min read',
    date: 'Sep 25, 2024',
  },
];

const categoryColors: Record<string, string> = {
  'Fee Management': 'bg-orange-100 text-orange-700',
  'Attendance': 'bg-green-100 text-green-700',
  'Communication': 'bg-pink-100 text-pink-700',
  'Exams & Results': 'bg-amber-100 text-amber-700',
  'Guides': 'bg-blue-100 text-blue-700',
  'Library': 'bg-violet-100 text-violet-700',
};

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-slate-50 py-20 border-b border-slate-200">
        <div className="page-container max-w-2xl mx-auto text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Blog</div>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-slate-900 mb-4">School Management Insights</h1>
          <p className="text-slate-500 text-lg">Tips, guides and case studies for school administrators across India.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="page-container">

          {/* Featured Post */}
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-10"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 min-h-[220px] flex items-center justify-center p-10">
                <div className="text-white">
                  <Tag className="w-10 h-10 mb-4 opacity-60" />
                  <p className="font-heading font-bold text-2xl leading-tight">Featured Article</p>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[featured.category]}`}>{featured.category}</span>
                  <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                  <span className="text-slate-400 text-xs">{featured.date}</span>
                </div>
                <h2 className="font-heading text-2xl font-bold text-slate-900 mb-3 group-hover:text-orange-500 transition-colors">{featured.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-orange-500 font-medium text-sm group-hover:gap-2 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Rest of posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600'}`}>{post.category}</span>
                </div>
                <h2 className="font-heading font-semibold text-slate-900 mb-3 leading-snug group-hover:text-orange-500 transition-colors flex-1">{post.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
