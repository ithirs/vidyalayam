'use client';

import Link from 'next/link';
import { ChevronRight, Settings, Save, Bell, Shield, Globe, Database } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';
import { useState } from 'react';

export default function SuperAdminSettingsPage() {
  const [platformName, setPlatformName] = useState('Vidyalaya');
  const [supportEmail, setSupportEmail] = useState('support@vidyalaya.in');
  const [trialDays, setTrialDays] = useState('14');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="space-y-5 max-w-2xl">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/super-admin" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Settings</span>
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Settings className="w-5 h-5 text-slate-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Platform Settings</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage global platform configuration</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-slate-500" />
              <h2 className="font-bold text-slate-800">General</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Platform Name</label>
                <input value={platformName} onChange={e => setPlatformName(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Support Email</label>
                <input value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Trial Period (Days)</label>
                <input type="number" value={trialDays} onChange={e => setTrialDays(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300" />
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-slate-500" />
              <h2 className="font-bold text-slate-800">Maintenance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-700">Maintenance Mode</p>
                <p className="text-xs text-slate-400 mt-0.5">Put the platform in read-only maintenance mode</p>
              </div>
              <button
                onClick={() => setMaintenanceMode(m => !m)}
                className={`relative w-12 h-6 rounded-full transition-colors ${maintenanceMode ? 'bg-red-500' : 'bg-slate-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${maintenanceMode ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-slate-500" />
              <h2 className="font-bold text-slate-800">Data Management</h2>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={() => toast.success('Backup initiated!')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Backup All Data
              </button>
              <button onClick={() => toast.info('Export will be emailed')} className="px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                Export Analytics
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={() => toast.success('Settings saved!')} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold transition-colors shadow-sm">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </>
  );
}
