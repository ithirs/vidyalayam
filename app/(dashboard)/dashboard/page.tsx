export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-heading">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening at your school.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: '1,248', change: '+12 this month', color: 'from-blue-500 to-blue-600' },
          { label: 'Staff Members', value: '86', change: '4 on leave today', color: 'from-orange-500 to-orange-600' },
          { label: 'Fees Collected', value: '₹4.2L', change: 'This month', color: 'from-green-500 to-green-600' },
          { label: 'Attendance Today', value: '94.2%', change: '1,174 / 1,248 present', color: 'from-amber-500 to-amber-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-card">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} mb-4`} />
            <div className="text-2xl font-bold text-slate-900 font-heading">{stat.value}</div>
            <div className="text-sm font-medium text-slate-700 mt-0.5">{stat.label}</div>
            <div className="text-xs text-slate-400 mt-1">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card">
        <p className="text-slate-500 text-sm text-center py-8">Dashboard content will be built here.</p>
      </div>
    </div>
  );
}
