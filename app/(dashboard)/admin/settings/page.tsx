'use client';

import { useState } from 'react';
import { Building2, LayoutGrid, BookOpen, Users, Bell, IndianRupee, Globe, Palette, Database } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { SchoolProfile } from './SchoolProfile';
import { ClassSections } from './ClassSections';
import { SubjectsTab } from './SubjectsTab';
import { UserManagement } from './UserManagement';
import { NotificationsTab } from './NotificationsTab';
import { FeeSettings } from './FeeSettings';
import { LocalizationTab } from './LocalizationTab';
import { BrandingTab } from './BrandingTab';
import { BackupData } from './BackupData';

type TabId = 'profile' | 'classes' | 'subjects' | 'users' | 'notifications' | 'fees' | 'localization' | 'branding' | 'backup';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  desc: string;
}

const TABS: Tab[] = [
  { id: 'profile',       label: 'School Profile',    icon: Building2,   desc: 'Basic info & identity'      },
  { id: 'classes',       label: 'Classes & Sections', icon: LayoutGrid,  desc: 'Manage classes'              },
  { id: 'subjects',      label: 'Subjects',           icon: BookOpen,    desc: 'Subjects & assignments'      },
  { id: 'users',         label: 'User Management',    icon: Users,       desc: 'Staff accounts & roles'      },
  { id: 'notifications', label: 'Notifications',      icon: Bell,        desc: 'SMS & push alerts'           },
  { id: 'fees',          label: 'Fee Settings',       icon: IndianRupee, desc: 'Payments & receipts'         },
  { id: 'localization',  label: 'Language & Locale',  icon: Globe,       desc: 'Language, date & currency'   },
  { id: 'branding',      label: 'School Branding',    icon: Palette,     desc: 'Colors, logo & style'        },
  { id: 'backup',        label: 'Backup & Data',      icon: Database,    desc: 'Export & backup data'        },
];

const PANELS: Record<TabId, React.ReactNode> = {
  profile:       <SchoolProfile />,
  classes:       <ClassSections />,
  subjects:      <SubjectsTab />,
  users:         <UserManagement />,
  notifications: <NotificationsTab />,
  fees:          <FeeSettings />,
  localization:  <LocalizationTab />,
  branding:      <BrandingTab />,
  backup:        <BackupData />,
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const current = TABS.find((t) => t.id === activeTab)!;

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="pb-8">
        <div className="mb-5">
          <h1 className="text-2xl font-black text-slate-900 font-heading">Settings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure your school's preferences, policies, and integrations</p>
        </div>

        <div className="flex gap-5 items-start">
          <aside className="w-56 shrink-0 bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden sticky top-4">
            <div className="px-3 py-3">
              <nav className="space-y-0.5">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all group',
                        isActive
                          ? 'bg-orange-500 text-white shadow-brand-sm'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      )}
                    >
                      <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-500')} />
                      <div className="min-w-0">
                        <div className={cn('text-sm font-semibold truncate leading-tight', isActive ? 'text-white' : '')}>{tab.label}</div>
                        <div className={cn('text-[10px] truncate leading-tight mt-0.5', isActive ? 'text-orange-100' : 'text-slate-400')}>{tab.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center shrink-0">
                <current.icon className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 font-heading leading-tight">{current.label}</h2>
                <p className="text-xs text-slate-400">{current.desc}</p>
              </div>
            </div>

            {PANELS[activeTab]}
          </main>
        </div>
      </div>
    </>
  );
}
