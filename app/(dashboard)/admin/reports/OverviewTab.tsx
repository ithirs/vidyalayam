'use client';

import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import {
  ENROLLMENT_TREND, ATTENDANCE_TREND, FEE_COLLECTION,
  CLASS_DISTRIBUTION, GENDER_RATIO, ADMISSIONS_VS_TRANSFERS,
} from './data';

const ORANGE   = '#f97316';
const ORANGE_L = '#fdba74';
const SLATE    = '#94a3b8';

const chartTooltipStyle = { borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', fontSize: 12 };

function ChartCard({ title, sub, children, className = '' }: { title: string; sub?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-card p-5 ${className}`}>
      <div className="mb-4">
        <h3 className="font-bold text-slate-800 font-heading text-sm">{title}</h3>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

const fmt = (v: number) => v >= 1000 ? `₹${(v/1000).toFixed(0)}k` : String(v);

export function OverviewTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCard title="Enrollment Trend" sub="Total students month-wise (Apr–Mar)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={ENROLLMENT_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Line type="monotone" dataKey="students" stroke={ORANGE} strokeWidth={2.5} dot={{ r: 3, fill: ORANGE }} activeDot={{ r: 5 }} name="Students" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Attendance %" sub="School-wide average attendance rate">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={ATTENDANCE_TREND} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={ORANGE} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={ORANGE} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis domain={[70, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`${v}%`, 'Attendance']} />
              <Area type="monotone" dataKey="attendance" stroke={ORANGE} strokeWidth={2.5} fill="url(#attGrad)" name="Attendance %" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Fee Collection vs Target" sub="Monthly collection compared to target (₹3.8L/month)">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={FEE_COLLECTION} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={fmt} />
            <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`₹${(v/1000).toFixed(0)}k`, '']} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="collected" name="Collected" fill={ORANGE}   radius={[4,4,0,0]} />
            <Bar dataKey="target"    name="Target"    fill={ORANGE_L} radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartCard title="Class-wise Distribution" sub="Students per class" className="md:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={CLASS_DISTRIBUTION} layout="vertical" margin={{ top: 4, right: 20, left: 56, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis dataKey="class" type="category" tick={{ fontSize: 11, fill: '#64748b' }} width={56} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Bar dataKey="students" fill={ORANGE} radius={[0,4,4,0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="space-y-4">
          <ChartCard title="Gender Ratio" sub="Male vs Female students">
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={GENDER_RATIO} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" paddingAngle={3}>
                  {GENDER_RATIO.map((e, i) => <Cell key={i} fill={e.fill} />)}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-1">
              {GENDER_RATIO.map((g) => (
                <div key={g.name} className="flex items-center gap-1.5 text-xs text-slate-600">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: g.fill }} />
                  <span className="font-semibold">{g.name}</span>
                  <span className="text-slate-400">{g.value}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      <ChartCard title="New Admissions vs Transfers Out" sub="Month-wise comparison">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={ADMISSIONS_VS_TRANSFERS} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="admissions" name="New Admissions" fill={ORANGE}   radius={[4,4,0,0]} />
            <Bar dataKey="transfers"  name="Transfers Out"  fill={SLATE}    radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
