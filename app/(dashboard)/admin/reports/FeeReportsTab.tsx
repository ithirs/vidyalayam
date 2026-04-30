'use client';

import { Download, TriangleAlert as AlertTriangle, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { FEE_COLLECTION_TABLE, PAYMENT_MODE, FEE_DEFAULTERS, DAY_BOOK } from './data';

const AGING_CONFIG: Record<string, { color: string; bg: string }> = {
  '0-30':  { color: 'text-amber-700',  bg: 'bg-amber-100'  },
  '31-60': { color: 'text-orange-700', bg: 'bg-orange-100' },
  '60+':   { color: 'text-red-700',    bg: 'bg-red-100'    },
};

const fmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const chartTooltipStyle = { borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 };

const totalCollected = FEE_COLLECTION_TABLE.reduce((s, r) => s + r.total, 0);

export function FeeReportsTab() {
  const dl = (label: string) => toast.success(`${label} download started`);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Collected',    value: fmt(totalCollected), color: 'text-green-700 bg-green-50 border-green-100' },
          { label: 'Due This Month',     value: '₹3,80,000',         color: 'text-blue-700 bg-blue-50 border-blue-100'   },
          { label: 'Outstanding',        value: '₹87,500',           color: 'text-red-700 bg-red-50 border-red-100'      },
          { label: 'Collection Rate',    value: '89.2%',             color: 'text-orange-700 bg-orange-50 border-orange-100'},
        ].map((s) => (
          <div key={s.label} className={cn('rounded-2xl border p-4', s.color)}>
            <div className="text-xl font-black font-heading">{s.value}</div>
            <div className="text-xs font-semibold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Month-wise Collection Summary</h3>
              <p className="text-xs text-slate-400 mt-0.5">Tuition, transport, exam and misc fees</p>
            </div>
            <button onClick={() => dl('Financial Excel')} className={dlBtnCls}>
              <Download className="w-3.5 h-3.5" />
              Excel
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className={thCls}>Month</th>
                  <th className={thCls}>Tuition</th>
                  <th className={thCls}>Transport</th>
                  <th className={thCls}>Exam</th>
                  <th className={thCls}>Misc</th>
                  <th className={cn(thCls, 'text-orange-600')}>Total</th>
                  <th className={thCls}>vs Target</th>
                </tr>
              </thead>
              <tbody>
                {FEE_COLLECTION_TABLE.map((r) => {
                  const pct = Math.round((r.total / r.target) * 100);
                  return (
                    <tr key={r.month} className="border-b border-slate-50 hover:bg-orange-50/20 transition-colors">
                      <td className={cn(tdCls, 'font-semibold text-slate-700')}>{r.month}</td>
                      <td className={tdCls}>{fmt(r.tuition)}</td>
                      <td className={tdCls}>{fmt(r.transport)}</td>
                      <td className={tdCls}>{r.exam ? fmt(r.exam) : <span className="text-slate-300">—</span>}</td>
                      <td className={tdCls}>{fmt(r.misc)}</td>
                      <td className={cn(tdCls, 'font-black text-orange-600')}>{fmt(r.total)}</td>
                      <td className={tdCls}>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={cn('h-full rounded-full', pct >= 90 ? 'bg-green-500' : pct >= 75 ? 'bg-amber-400' : 'bg-red-400')} style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                          <span className={cn('text-xs font-bold', pct >= 90 ? 'text-green-600' : pct >= 75 ? 'text-amber-600' : 'text-red-600')}>{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-orange-50 border-t-2 border-orange-200 font-bold">
                  <td className={cn(tdCls,'font-black text-slate-800')}>TOTAL</td>
                  <td className={tdCls}>{fmt(FEE_COLLECTION_TABLE.reduce((s,r)=>s+r.tuition,0))}</td>
                  <td className={tdCls}>{fmt(FEE_COLLECTION_TABLE.reduce((s,r)=>s+r.transport,0))}</td>
                  <td className={tdCls}>{fmt(FEE_COLLECTION_TABLE.reduce((s,r)=>s+r.exam,0))}</td>
                  <td className={tdCls}>{fmt(FEE_COLLECTION_TABLE.reduce((s,r)=>s+r.misc,0))}</td>
                  <td className={cn(tdCls,'text-orange-600 text-base')}>{fmt(totalCollected)}</td>
                  <td className={tdCls}></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <h3 className="font-bold text-slate-800 font-heading text-sm mb-4">Payment Mode Analysis</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={PAYMENT_MODE} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                {PAYMENT_MODE.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`${v}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {PAYMENT_MODE.map((p) => (
              <div key={p.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.fill }} />
                  <span className="text-slate-600 font-medium">{p.name}</span>
                </div>
                <span className="font-bold text-slate-800">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-red-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-100 bg-red-50/40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <div>
              <h3 className="font-bold text-slate-800 font-heading text-sm">Fee Defaulters with Aging</h3>
              <p className="text-xs text-slate-400">Students with outstanding dues</p>
            </div>
          </div>
          <button onClick={() => dl('Defaulters List')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Roll No.</th>
                <th className={thCls}>Name</th>
                <th className={thCls}>Class</th>
                <th className={thCls}>Pending Amount</th>
                <th className={thCls}>Days Overdue</th>
                <th className={thCls}>Aging</th>
              </tr>
            </thead>
            <tbody>
              {FEE_DEFAULTERS.map((d) => {
                const ag = AGING_CONFIG[d.agingBucket];
                return (
                  <tr key={d.roll} className="border-b border-slate-50 hover:bg-red-50/20 transition-colors">
                    <td className={cn(tdCls, 'font-mono text-xs')}>{d.roll}</td>
                    <td className={cn(tdCls, 'font-semibold text-slate-700')}>{d.name}</td>
                    <td className={tdCls}>{d.class}</td>
                    <td className={cn(tdCls, 'font-bold text-red-600')}>{fmt(d.amount)}</td>
                    <td className={tdCls}><span className="flex items-center gap-1"><Clock className="w-3 h-3 text-slate-400" />{d.daysOverdue}d</span></td>
                    <td className={tdCls}>
                      <span className={cn('px-2.5 py-1 rounded-full text-xs font-bold', ag.bg, ag.color)}>{d.agingBucket} days</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex gap-4 text-xs text-slate-500">
          {[
            { label: '0–30 days',  count: FEE_DEFAULTERS.filter(d=>d.agingBucket==='0-30').length,  color: 'bg-amber-400' },
            { label: '31–60 days', count: FEE_DEFAULTERS.filter(d=>d.agingBucket==='31-60').length, color: 'bg-orange-500'},
            { label: '60+ days',   count: FEE_DEFAULTERS.filter(d=>d.agingBucket==='60+').length,   color: 'bg-red-500'  },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <div className={cn('w-2.5 h-2.5 rounded-full', b.color)} />
              <span>{b.label}: <strong>{b.count}</strong></span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800 font-heading text-sm">Day Book — April 2026</h3>
            <p className="text-xs text-slate-400 mt-0.5">Day-wise fee transaction summary</p>
          </div>
          <button onClick={() => dl('Day Book PDF')} className={dlBtnCls}>
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className={thCls}>Date</th>
                <th className={thCls}>Transactions</th>
                <th className={thCls}>Cash</th>
                <th className={thCls}>UPI</th>
                <th className={thCls}>Online</th>
                <th className={cn(thCls, 'text-orange-600')}>Total</th>
              </tr>
            </thead>
            <tbody>
              {DAY_BOOK.map((d, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-orange-50/20 transition-colors">
                  <td className={cn(tdCls, 'font-semibold text-slate-700')}>{d.date}</td>
                  <td className={tdCls}>{d.transactions}</td>
                  <td className={tdCls}>{fmt(d.cash)}</td>
                  <td className={tdCls}>{fmt(d.upi)}</td>
                  <td className={tdCls}>{fmt(d.online)}</td>
                  <td className={cn(tdCls, 'font-black text-orange-600')}>{fmt(d.total)}</td>
                </tr>
              ))}
              <tr className="bg-orange-50 border-t-2 border-orange-200 font-bold">
                <td className={cn(tdCls,'font-black text-slate-800')}>TOTAL</td>
                <td className={tdCls}>{DAY_BOOK.reduce((s,d)=>s+d.transactions,0)}</td>
                <td className={tdCls}>{fmt(DAY_BOOK.reduce((s,d)=>s+d.cash,0))}</td>
                <td className={tdCls}>{fmt(DAY_BOOK.reduce((s,d)=>s+d.upi,0))}</td>
                <td className={tdCls}>{fmt(DAY_BOOK.reduce((s,d)=>s+d.online,0))}</td>
                <td className={cn(tdCls,'text-orange-600 text-base')}>{fmt(DAY_BOOK.reduce((s,d)=>s+d.total,0))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thCls    = 'px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wide whitespace-nowrap';
const tdCls    = 'px-4 py-3 text-slate-600 whitespace-nowrap';
const dlBtnCls = 'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-colors';
