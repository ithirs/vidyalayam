'use client';

import Link from 'next/link';
import { ChevronRight, Chrome as Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Action {
  label: string;
  icon?: React.ElementType;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: Action[];
  className?: string;
}

const ACTION_VARIANTS: Record<string, string> = {
  primary:   'bg-orange-500 text-white hover:bg-orange-600 shadow-sm',
  secondary: 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50',
  danger:    'bg-red-500 text-white hover:bg-red-600 shadow-sm',
};

export function PageHeader({ title, subtitle, breadcrumbs = [], actions = [], className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs text-slate-400 mb-2 flex-wrap">
          <Link href="/dashboard" className="flex items-center gap-1 hover:text-orange-500 transition-colors">
            <Home className="w-3 h-3" />
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <div key={i} className="flex items-center gap-1">
              <ChevronRight className="w-3 h-3 text-slate-300" />
              {crumb.href && i < breadcrumbs.length - 1 ? (
                <Link href={crumb.href} className="hover:text-orange-500 transition-colors font-medium">{crumb.label}</Link>
              ) : (
                <span className={cn(i === breadcrumbs.length - 1 ? 'text-slate-600 font-semibold' : '')}>{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      )}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading leading-tight">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>

        {actions.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {actions.map((action, i) => {
              const Icon = action.icon;
              const cls = cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-50 disabled:pointer-events-none',
                ACTION_VARIANTS[action.variant ?? 'secondary']
              );
              if (action.href) {
                return (
                  <Link key={i} href={action.href} className={cls}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {action.label}
                  </Link>
                );
              }
              return (
                <button key={i} onClick={action.onClick} disabled={action.disabled} className={cls}>
                  {Icon && <Icon className="w-4 h-4" />}
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
