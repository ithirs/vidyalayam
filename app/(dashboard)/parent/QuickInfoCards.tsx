'use client';

import { TrendingUp, IndianRupee, BookOpen, ClipboardList, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const ATT_DATA = [
  { value: 94, fill: '#f97316' },
  { value: 6, fill: '#f1f5f9' },
];

function MiniDonut() {
  return (
    <div className="w-12 h-12 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={ATT_DATA} dataKey="value" innerRadius={14} outerRadius={22} startAngle={90} endAngle={-270} strokeWidth={0}>
            {ATT_DATA.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-orange-500">94%</span>
    </div>
  );
}

interface QuickInfoCardsProps {
  onFeeClick: () => void;
  onHomeworkClick: () => void;
}

export function QuickInfoCards({ onFeeClick, onHomeworkClick }: QuickInfoCardsProps) {
  const cards = [
    {
      id: 'attendance',
      label: 'Attendance',
      value: '94%',
      sub: 'This month · 1 absent',
      icon: null,
      customRight: <MiniDonut />,
      accent: 'border-orange-200 hover:border-orange-300',
      valueCls: 'text-orange-600',
      iconBg: '',
      onClick: () => toast.info('View full attendance below'),
    },
    {
      id: 'fee',
      label: 'Fee Status',
      value: '₹5,000',
      sub: 'Due by 10th Jan',
      icon: IndianRupee,
      customRight: null,
      accent: 'border-red-200 hover:border-red-300',
      valueCls: 'text-red-600',
      iconBg: 'bg-red-50 text-red-400',
      cta: 'Pay Now',
      ctaColor: 'bg-orange-500 hover:bg-orange-600 text-white',
      onClick: onFeeClick,
    },
    {
      id: 'exam',
      label: 'Last Exam',
      value: '89/100',
      sub: 'Maths · Half Yearly',
      icon: TrendingUp,
      customRight: null,
      accent: 'border-green-200 hover:border-green-300',
      valueCls: 'text-green-600',
      iconBg: 'bg-green-50 text-green-400',
      onClick: () => toast.info('View report card below'),
    },
    {
      id: 'homework',
      label: 'Homework',
      value: '2 Pending',
      sub: 'Due tomorrow',
      icon: ClipboardList,
      customRight: null,
      accent: 'border-amber-200 hover:border-amber-300',
      valueCls: 'text-amber-600',
      iconBg: 'bg-amber-50 text-amber-400',
      cta: 'View',
      ctaColor: 'border border-amber-300 text-amber-600 hover:bg-amber-50',
      onClick: onHomeworkClick,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={card.onClick}
            className={cn(
              'bg-white rounded-2xl border p-4 text-left shadow-sm transition-all duration-150 active:scale-[0.98] hover:shadow-md',
              card.accent
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">{card.label}</p>
                <p className={cn('text-xl font-bold font-heading mt-1 tabular-nums', card.valueCls)}>{card.value}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-tight">{card.sub}</p>
              </div>
              {card.customRight ? card.customRight : Icon ? (
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', card.iconBg)}>
                  <Icon className="w-4.5 h-4.5" />
                </div>
              ) : null}
            </div>
            {card.cta && (
              <div className="mt-3">
                <span className={cn('inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition-colors', card.ctaColor)}>
                  {card.cta}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
