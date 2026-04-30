'use client';

import { cn } from '@/lib/utils';

function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-slate-100', className)} />;
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 5, className }: TableSkeletonProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200 overflow-hidden', className)}>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="p-4 border-b border-slate-100">
        <Skeleton className="h-9 w-56" />
      </div>
      <div className="divide-y divide-slate-50">
        <div className="flex gap-4 px-4 py-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-3 flex-1" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 px-4 py-3.5">
            {Array.from({ length: columns }).map((_, c) => (
              <Skeleton key={c} className={cn('h-4 flex-1', c === 0 ? 'max-w-[120px]' : '')} />
            ))}
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-1">
          {[1,2,3,4].map((i) => <Skeleton key={i} className="h-8 w-8 rounded-lg" />)}
        </div>
      </div>
    </div>
  );
}

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200 p-5 space-y-4', className)}>
      <div className="flex items-start justify-between">
        <Skeleton className="w-11 h-11 rounded-xl" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

interface StatsSkeletonProps {
  count?: number;
  className?: string;
}

export function StatsSkeleton({ count = 4, className }: StatsSkeletonProps) {
  return (
    <div className={cn('grid gap-3', count === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}
