import { cn } from '@/lib/utils';

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, required, children, className }: FieldProps) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export const inputCls = 'w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white transition-colors';
export const selectCls = `${inputCls} cursor-pointer`;

export function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-2">
      <div className="flex-1 h-px bg-slate-100" />
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}
