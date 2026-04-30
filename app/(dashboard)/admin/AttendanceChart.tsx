'use client';

import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { ATTENDANCE_DATA, CLASS_OPTIONS } from './data';

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-modal px-4 py-3 text-sm min-w-[140px]">
      <p className="font-semibold text-slate-700 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-500 text-xs">{p.name}</span>
          </div>
          <span className="font-semibold text-slate-900 text-xs tabular-nums">{p.value.toLocaleString('en-IN')}</span>
        </div>
      ))}
    </div>
  );
}

export function AttendanceChart() {
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-5 gap-3 flex-wrap">
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Weekly Attendance Overview</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 5 school days</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropOpen(!dropOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          >
            {selectedClass}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {dropOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-44 z-50 py-1">
              {CLASS_OPTIONS.map((cls) => (
                <button
                  key={cls}
                  onClick={() => { setSelectedClass(cls); setDropOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    selectedClass === cls ? 'bg-orange-50 text-orange-600 font-medium' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4 flex-wrap">
        {[
          { label: 'Present', color: '#22C55E', value: '1,180' },
          { label: 'Absent', color: '#EF4444', value: '67' },
          { label: 'Late', color: '#F97316', value: '19' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-slate-500">{item.label}</span>
            <span className="text-xs font-bold text-slate-800 tabular-nums">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-[220px]">
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={ATTENDANCE_DATA} margin={{ top: 4, right: 4, left: -8, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              axisLine={false}
              tickLine={false}
              width={46}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
            <Bar dataKey="present" name="Present" fill="#22C55E" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="absent" name="Absent" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={32} />
            <Bar dataKey="late" name="Late" fill="#F97316" radius={[4, 4, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
