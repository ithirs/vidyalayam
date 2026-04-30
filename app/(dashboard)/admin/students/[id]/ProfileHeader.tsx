'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Printer as PrinterIcon, FileText, MoveHorizontal as MoreHorizontal, ChevronRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Student, STATUS_CONFIG } from '../data';
import { toast } from 'sonner';

const COLORS = ['bg-blue-400', 'bg-emerald-400', 'bg-orange-400', 'bg-pink-400', 'bg-violet-400', 'bg-cyan-400', 'bg-amber-400', 'bg-rose-400'];

export function ProfileHeader({ student }: { student: Student }) {
  const router = useRouter();
  const initials = student.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  const avatarColor = COLORS[student.name.charCodeAt(0) % COLORS.length];
  const statusCfg = STATUS_CONFIG[student.status];

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4">
        <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/admin/students" className="hover:text-blue-600 transition-colors font-medium">Students</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-600 font-semibold truncate">{student.name}</span>
      </nav>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        {/* Banner */}
        <div className={cn('h-24 relative', avatarColor)}>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,white,transparent)]" />
          <button onClick={() => router.push('/admin/students')}
            className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors backdrop-blur-sm">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>

        <div className="px-6 pb-5 -mt-10 flex items-end justify-between gap-4 flex-wrap">
          <div className="flex items-end gap-4">
            {/* Avatar */}
            <div className={cn('w-20 h-20 rounded-2xl border-4 border-white flex items-center justify-center text-2xl font-bold text-white shadow-md shrink-0', avatarColor)}>
              {initials}
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900 font-heading">{student.name}</h1>
                <span className={cn('inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border', statusCfg.bg, statusCfg.text, statusCfg.border)}>
                  <span className={cn('w-1.5 h-1.5 rounded-full', statusCfg.dot)} />
                  {statusCfg.label}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-slate-500 font-mono">{student.rollNo}</span>
                <span className="text-slate-300">·</span>
                <span className="text-sm text-slate-500">{student.class}-{student.section}</span>
                <span className="text-slate-300">·</span>
                <span className="text-sm text-slate-400 font-mono">{student.admissionNo}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1 flex-wrap">
            <button onClick={() => toast.info('Edit form opening…')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
            <button onClick={() => toast.success('ID Card sent to printer')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              <PrinterIcon className="w-3.5 h-3.5" />
              Print ID Card
            </button>
            <button onClick={() => toast.success('TC generated')}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              <FileText className="w-3.5 h-3.5" />
              Generate TC
            </button>
            <button className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
