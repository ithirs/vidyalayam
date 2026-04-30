'use client';

import { useState } from 'react';
import { Download, RefreshCw, Clock, Shield, Database, FileSpreadsheet, FileJson, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const BACKUP_HISTORY = [
  { date: '2026-04-10T02:00', type: 'Auto', size: '48.2 MB', status: 'success' },
  { date: '2026-04-03T02:00', type: 'Auto', size: '47.8 MB', status: 'success' },
  { date: '2026-03-28T14:30', type: 'Manual', size: '47.5 MB', status: 'success' },
  { date: '2026-03-27T02:00', type: 'Auto', size: '47.1 MB', status: 'success' },
  { date: '2026-03-20T02:00', type: 'Auto', size: '46.9 MB', status: 'failed' },
];

const DATA_SECTIONS = [
  { label: 'Student Records', count: '840 students', icon: '👤' },
  { label: 'Fee Transactions', count: '4,820 records', icon: '₹' },
  { label: 'Exam Results', count: '12,600 marks', icon: '📝' },
  { label: 'Attendance Records', count: '1,68,000 entries', icon: '✓' },
  { label: 'Staff Information', count: '38 staff', icon: '👥' },
  { label: 'Library Records', count: '1,240 books', icon: '📚' },
];

export function BackupData() {
  const [backing, setBacking] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [exportFormat, setExportFormat] = useState<'csv' | 'excel' | 'json'>('excel');
  const [exportSection, setExportSection] = useState('all');
  const [exporting, setExporting] = useState(false);

  const handleBackup = () => {
    setBacking(true);
    setBackupProgress(0);
    const iv = setInterval(() => {
      setBackupProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          setBacking(false);
          toast.success('Backup completed successfully');
          return 0;
        }
        return p + 8;
      });
    }, 200);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      toast.success(`Data exported as ${exportFormat.toUpperCase()}`);
    }, 2000);
  };

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-4">
          <Database className="w-4 h-4 text-orange-500" />
          Database Backup
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Last Backup', value: 'Apr 10, 2026 · 2:00 AM', icon: Clock, color: 'text-blue-600 bg-blue-50' },
            { label: 'Backup Size', value: '48.2 MB', icon: Database, color: 'text-green-600 bg-green-50' },
            { label: 'Auto-Backup', value: 'Daily at 2:00 AM', icon: RefreshCw, color: 'text-orange-600 bg-orange-50' },
          ].map((s) => (
            <div key={s.label} className={cn('rounded-xl p-3.5 flex items-center gap-3', s.color)}>
              <s.icon className="w-5 h-5 shrink-0" />
              <div>
                <div className="font-bold text-sm">{s.value}</div>
                <div className="text-xs text-slate-500">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {backing && (
          <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-1.5 text-sm font-semibold text-orange-800">
              <span>Creating backup...</span>
              <span>{backupProgress}%</span>
            </div>
            <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 rounded-full transition-all" style={{ width: `${backupProgress}%` }} />
            </div>
          </div>
        )}

        <button
          onClick={handleBackup}
          disabled={backing}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
            backing ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600 shadow-brand-sm'
          )}
        >
          <RefreshCw className={cn('w-4 h-4', backing && 'animate-spin')} />
          {backing ? 'Creating Backup...' : 'Request Backup Now'}
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-4">
          <Clock className="w-4 h-4 text-orange-500" />
          Backup History
        </h3>
        <div className="space-y-2">
          {BACKUP_HISTORY.map((b, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl">
              {b.status === 'success'
                ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                : <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800">
                  {new Date(b.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  <span className="text-slate-400 ml-2 text-xs">{new Date(b.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="text-xs text-slate-400">{b.type} backup · {b.size}</div>
              </div>
              <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', b.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                {b.status === 'success' ? 'Success' : 'Failed'}
              </span>
              {b.status === 'success' && (
                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors">
                  <Download className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-4">
          <FileSpreadsheet className="w-4 h-4 text-orange-500" />
          Export Data
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {DATA_SECTIONS.map((ds) => (
            <label key={ds.label} className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-orange-50 transition-colors">
              <input type="checkbox" defaultChecked className="rounded text-orange-500" />
              <span className="text-xs font-medium text-slate-700">{ds.label}</span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {(['csv', 'excel', 'json'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setExportFormat(fmt)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all',
                  exportFormat === fmt ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                )}
              >
                {fmt === 'excel' ? 'Excel' : fmt === 'csv' ? 'CSV' : 'JSON'}
              </button>
            ))}
          </div>
          <button
            onClick={handleExport}
            disabled={exporting}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all',
              exporting ? 'bg-slate-100 text-slate-400' : 'bg-green-500 text-white hover:bg-green-600 shadow-sm'
            )}
          >
            {exporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {exporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 font-heading mb-3">
          <Shield className="w-4 h-4 text-orange-500" />
          Data Retention Policy
        </h3>
        <div className="space-y-2 text-sm text-slate-600">
          {[
            'Student academic records are retained for 10 years after graduation.',
            'Fee transaction logs are kept for 7 years as per regulatory requirements.',
            'Attendance records are stored for 5 academic years.',
            'Staff data is retained for 3 years after leaving the institution.',
            'System activity logs are purged after 1 year.',
          ].map((p, i) => (
            <div key={i} className="flex items-start gap-2.5 px-3 py-2 bg-slate-50 rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
              <span>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
