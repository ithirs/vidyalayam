'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { TriangleAlert as AlertTriangle, CircleAlert as AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Variant = 'danger' | 'warning';

interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  onConfirm: () => void;
  trigger: React.ReactNode;
}

const VARIANT_CONFIG: Record<Variant, { icon: React.ElementType; iconCls: string; confirmCls: string }> = {
  danger:  { icon: AlertCircle,   iconCls: 'text-red-500 bg-red-50',    confirmCls: 'bg-red-500 hover:bg-red-600 text-white'    },
  warning: { icon: AlertTriangle, iconCls: 'text-amber-500 bg-amber-50', confirmCls: 'bg-amber-500 hover:bg-amber-600 text-white' },
};

export function ConfirmDialog({
  title,
  description,
  confirmText = 'Confirm',
  cancelText  = 'Cancel',
  variant     = 'danger',
  onConfirm,
  trigger,
}: ConfirmDialogProps) {
  const cfg  = VARIANT_CONFIG[variant];
  const Icon = cfg.icon;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl max-w-md">
        <AlertDialogHeader>
          <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center mb-3', cfg.iconCls)}>
            <Icon className="w-6 h-6" />
          </div>
          <AlertDialogTitle className="text-slate-900 font-heading font-black text-lg">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 text-sm leading-relaxed">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 mt-2">
          <AlertDialogCancel className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn('rounded-xl font-bold px-5', cfg.confirmCls)}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
