'use client';

import { useState } from 'react';
import { RefreshCw, ChevronDown, MessageSquare, Smartphone, Bell, Zap, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MESSAGE_HISTORY, MSG_TYPE_CONFIG, type MessageRecord, type DeliveryStatus } from './data';

const STATUS_CONFIG: Record<DeliveryStatus, { label: string; color: string; icon: React.ElementType }> = {
  sent:    { label: 'Sent',    color: 'bg-green-100 text-green-700',  icon: CheckCircle },
  failed:  { label: 'Failed',  color: 'bg-red-100 text-red-700',     icon: XCircle     },
  pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', icon: Clock       },
};

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  whatsapp: MessageSquare,
  sms:      Smartphone,
  both:     Zap,
  push:     Bell,
};

function DeliveryBar({ delivered, total }: { delivered: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((delivered / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
        <span>{delivered}/{total}</span>
        <span className={cn('font-semibold', pct >= 95 ? 'text-green-600' : pct >= 80 ? 'text-amber-600' : 'text-red-500')}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', pct >= 95 ? 'bg-green-500' : pct >= 80 ? 'bg-amber-500' : 'bg-red-500')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function MessageHistory() {
  const [records, setRecords] = useState<MessageRecord[]>(MESSAGE_HISTORY);
  const [filterStatus, setFilterStatus] = useState<DeliveryStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filterStatus === 'all' ? records : records.filter((r) => r.status === filterStatus);

  const resend = (id: string) => {
    setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: 'pending' as DeliveryStatus } : r));
    toast.success('Message queued for re-send');
    setTimeout(() => {
      setRecords((prev) => prev.map((r) => r.id === id ? { ...r, status: 'sent' as DeliveryStatus, delivered: r.totalRecipients, failed: 0 } : r));
    }, 2500);
  };

  const totalSent = records.reduce((s, r) => s + r.delivered, 0);
  const totalFailed = records.reduce((s, r) => s + r.failed, 0);
  const totalCost = records.reduce((s, r) => s + r.cost, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Delivered', value: totalSent.toLocaleString(), sub: 'across all messages', color: 'text-green-600 bg-green-50' },
          { label: 'Failed',          value: totalFailed.toString(),     sub: 'not delivered',        color: 'text-red-600 bg-red-50'     },
          { label: 'SMS Cost (Apr)',   value: `₹${totalCost}`,           sub: 'this month',           color: 'text-orange-600 bg-orange-50'},
        ].map((s) => (
          <div key={s.label} className={cn('rounded-2xl p-4 border border-slate-200 shadow-card', s.color)}>
            <div className="text-2xl font-black font-heading">{s.value}</div>
            <div className="text-xs font-semibold text-slate-700 mt-0.5">{s.label}</div>
            <div className="text-[10px] text-slate-400">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1">
          {(['all', 'sent', 'failed', 'pending'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all', filterStatus === s ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700')}
            >
              {s === 'all' ? `All (${records.length})` : `${STATUS_CONFIG[s].label} (${records.filter((r) => r.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((r) => {
          const typeConf = MSG_TYPE_CONFIG[r.type];
          const statusConf = STATUS_CONFIG[r.status];
          const StatusIcon = statusConf.icon;
          const ChanIcon = CHANNEL_ICONS[r.channel] || MessageSquare;
          const isExpanded = expanded === r.id;
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              <button
                className="w-full text-left"
                onClick={() => setExpanded(isExpanded ? null : r.id)}
              >
                <div className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50/50 transition-colors">
                  <div className={cn('w-2 h-2 rounded-full shrink-0', r.status === 'sent' ? 'bg-green-500' : r.status === 'failed' ? 'bg-red-500' : 'bg-amber-500')} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full', typeConf.bg, typeConf.color)}>{typeConf.label}</span>
                      <span className="text-xs text-slate-500">{r.sentTo}</span>
                      <ChanIcon className="w-3 h-3 text-slate-400" />
                    </div>
                    <div className="text-sm text-slate-700 line-clamp-1">{r.preview}</div>
                  </div>

                  <div className="hidden md:block w-32 shrink-0">
                    <DeliveryBar delivered={r.delivered} total={r.totalRecipients} />
                  </div>

                  <div className="hidden sm:flex items-center gap-1 shrink-0">
                    <StatusIcon className={cn('w-3.5 h-3.5', r.status === 'sent' ? 'text-green-500' : r.status === 'failed' ? 'text-red-500' : 'text-amber-500')} />
                    <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', statusConf.color)}>{statusConf.label}</span>
                  </div>

                  <div className="text-xs text-slate-400 shrink-0 hidden lg:block">
                    {new Date(r.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>

                  <ChevronDown className={cn('w-4 h-4 text-slate-300 shrink-0 transition-transform', isExpanded && 'rotate-180')} />
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                    {[
                      { label: 'Date & Time', value: new Date(r.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) },
                      { label: 'Total Sent',  value: r.totalRecipients },
                      { label: 'Delivered',   value: r.delivered       },
                      { label: 'Failed',      value: r.failed          },
                    ].map((d) => (
                      <div key={d.label} className="bg-slate-50 rounded-xl px-3 py-2">
                        <div className="text-xs text-slate-400">{d.label}</div>
                        <div className="font-bold text-slate-800">{d.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-slate-50 rounded-xl px-4 py-3 text-sm text-slate-700 mb-3">{r.preview}</div>
                  {r.status === 'failed' && r.failed > 0 && (
                    <button
                      onClick={() => resend(r.id)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Re-send to {r.failed} failed recipients
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card py-12 text-center text-slate-400">
            No messages found
          </div>
        )}
      </div>
    </div>
  );
}
