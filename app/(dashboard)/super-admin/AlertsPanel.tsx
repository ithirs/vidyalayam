'use client';

import { toast } from 'sonner';
import { ArrowRight, Clock, AlertTriangle, Sparkles } from 'lucide-react';

interface Alert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  action: string;
  icon: typeof Clock;
  dot: string;
}

const alerts: Alert[] = [
  {
    id: '1',
    severity: 'high',
    message: '3 schools subscription expiring in 3 days',
    action: 'Notify Now',
    icon: Clock,
    dot: 'bg-red-500',
  },
  {
    id: '2',
    severity: 'medium',
    message: '2 schools are over their student limit',
    action: 'Review',
    icon: AlertTriangle,
    dot: 'bg-amber-400',
  },
  {
    id: '3',
    severity: 'low',
    message: '5 new trial schools registered this week',
    action: 'View',
    icon: Sparkles,
    dot: 'bg-green-500',
  },
];

const bgMap = {
  high: 'bg-red-50 border-red-100',
  medium: 'bg-amber-50 border-amber-100',
  low: 'bg-green-50 border-green-100',
};

const iconBgMap = {
  high: 'bg-red-100 text-red-500',
  medium: 'bg-amber-100 text-amber-600',
  low: 'bg-green-100 text-green-600',
};

const btnMap = {
  high: 'text-red-600 hover:bg-red-100',
  medium: 'text-amber-700 hover:bg-amber-100',
  low: 'text-green-700 hover:bg-green-100',
};

export function AlertsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900 font-heading">Requires Attention</h3>
        <span className="text-xs font-semibold text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
          {alerts.length} items
        </span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border ${bgMap[alert.severity]}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBgMap[alert.severity]}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full mt-1 shrink-0 ${alert.dot}`} />
                  <p className="text-sm font-medium text-slate-800 leading-snug">{alert.message}</p>
                </div>
                <button
                  onClick={() => toast.info(alert.action + ': ' + alert.message)}
                  className={`flex items-center gap-1 text-xs font-semibold mt-1 px-2 py-1 rounded-lg transition-colors ${btnMap[alert.severity]}`}
                >
                  {alert.action}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
