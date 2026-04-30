'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Trend = 'up' | 'down' | 'neutral';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  iconBg?: string;
  trend?: Trend;
  trendValue?: string;
  className?: string;
}

const TREND_CONFIG: Record<Trend, { icon: React.ElementType; color: string; bg: string }> = {
  up:      { icon: TrendingUp,   color: 'text-green-600', bg: 'bg-green-50'  },
  down:    { icon: TrendingDown, color: 'text-red-500',   bg: 'bg-red-50'    },
  neutral: { icon: Minus,        color: 'text-slate-400', bg: 'bg-slate-50'  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = 'bg-orange-50',
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  const trendCfg = trend ? TREND_CONFIG[trend] : null;
  const TrendIcon = trendCfg?.icon;

  return (
    <div className={cn('bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-3 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center shrink-0', iconBg)}>
          <Icon className="w-5 h-5 text-orange-500" />
        </div>
        {trendCfg && trendValue && TrendIcon && (
          <div className={cn('flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold', trendCfg.bg, trendCfg.color)}>
            <TrendIcon className="w-3 h-3" />
            {trendValue}
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl font-black text-slate-900 font-heading leading-none">{value}</div>
        <div className="text-sm font-semibold text-slate-500 mt-1">{title}</div>
        {subtitle && <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>}
      </div>
    </div>
  );
}
