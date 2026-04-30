'use client';

import { useState } from 'react';
import { FileText, Download, Eye, Upload, CircleCheck as CheckCircle2, Circle as XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DOCUMENTS } from '../../data';
import { toast } from 'sonner';

export function DocumentsTab() {
  const [docs, setDocs] = useState(DOCUMENTS);

  const uploadedCount = docs.filter((d) => d.uploaded).length;
  const requiredMissing = docs.filter((d) => d.required && !d.uploaded).length;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-green-50 border border-green-200">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span className="text-xs font-bold text-green-700">{uploadedCount} uploaded</span>
        </div>
        {requiredMissing > 0 && (
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50 border border-red-200">
            <XCircle className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold text-red-700">{requiredMissing} required missing</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {docs.map((doc) => (
          <div key={doc.id}
            className={cn('rounded-2xl border p-4 transition-all',
              doc.uploaded ? 'bg-white border-slate-200' : doc.required ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200')}>
            <div className="flex items-center gap-3 mb-3">
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                doc.uploaded ? 'bg-green-50 border border-green-200' : doc.required ? 'bg-red-50 border border-red-200' : 'bg-slate-100 border border-slate-200')}>
                <FileText className={cn('w-4 h-4', doc.uploaded ? 'text-green-500' : doc.required ? 'text-red-400' : 'text-slate-400')} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">{doc.name}</p>
                <p className={cn('text-[11px] font-semibold mt-0.5', doc.required ? 'text-red-500' : 'text-slate-400')}>
                  {doc.required ? 'Required' : 'Optional'}
                </p>
              </div>
              {doc.uploaded ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
              ) : (
                <XCircle className={cn('w-5 h-5 shrink-0', doc.required ? 'text-red-400' : 'text-slate-300')} />
              )}
            </div>

            {doc.uploaded ? (
              <div className="flex gap-2">
                <button onClick={() => toast.info(`Viewing ${doc.name}…`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  View
                </button>
                <button onClick={() => toast.success(`${doc.name} downloaded`)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  Download
                </button>
              </div>
            ) : (
              <button onClick={() => { setDocs((d) => d.map((x) => x.id === doc.id ? { ...x, uploaded: true } : x)); toast.success(`${doc.name} uploaded`); }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-all">
                <Upload className="w-3.5 h-3.5" />
                Upload Document
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
