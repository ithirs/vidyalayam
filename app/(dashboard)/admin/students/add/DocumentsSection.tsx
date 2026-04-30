'use client';

import { Upload, CircleCheck as CheckCircle2, Circle as XCircle, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const DOCS = [
  { id: 'birth', label: 'Birth Certificate', required: true },
  { id: 'aadhar', label: 'Aadhar Card', required: true },
  { id: 'tc', label: 'Previous TC', required: false },
  { id: 'photos', label: 'Passport Photos', required: true },
  { id: 'address', label: 'Address Proof', required: true },
  { id: 'caste', label: 'Caste Certificate', required: false },
];

interface Props {
  data: Record<string, boolean>;
  onChange: (v: Record<string, boolean>) => void;
}

export function DocumentsSection({ data, onChange }: Props) {
  const toggle = (id: string) => {
    toast.success(`Document "${DOCS.find((d) => d.id === id)?.label}" uploaded`);
    onChange({ ...data, [id]: true });
  };

  const uploaded = Object.values(data).filter(Boolean).length;
  const required = DOCS.filter((d) => d.required).length;
  const requiredDone = DOCS.filter((d) => d.required && data[d.id]).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Upload required documents for the student's file.</p>
        <span className={cn('text-xs font-bold px-2.5 py-1 rounded-xl border',
          requiredDone === required ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200')}>
          {requiredDone}/{required} required
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DOCS.map(({ id, label, required }) => {
          const done = !!data[id];
          return (
            <div key={id}
              className={cn('rounded-2xl border p-4 transition-all',
                done ? 'bg-green-50 border-green-200' : required ? 'bg-red-50 border-red-200 border-dashed' : 'bg-slate-50 border-slate-200 border-dashed')}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className={cn('w-4 h-4', done ? 'text-green-500' : required ? 'text-red-400' : 'text-slate-400')} />
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                </div>
                {done ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                ) : (
                  <XCircle className={cn('w-4 h-4 shrink-0', required ? 'text-red-400' : 'text-slate-300')} />
                )}
              </div>

              {required && !done && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wide mb-2 block">Required</span>
              )}

              {done ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-600 font-medium">Document uploaded</span>
                  <button onClick={() => onChange({ ...data, [id]: false })}
                    className="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium">Remove</button>
                </div>
              ) : (
                <button onClick={() => toggle(id)}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-slate-300 hover:border-blue-400 hover:bg-blue-50/30 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  Upload {label}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
