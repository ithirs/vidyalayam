'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Topbar } from '@/components/dashboard/Topbar';
import type { Role } from '@/components/dashboard/nav-config';
import { getStoredUser, type DemoUser } from '@/lib/auth/demo-users';

const FALLBACK_USER: DemoUser = {
  role: 'admin' as Role,
  userName: 'Dilshad Babji',
  userEmail: 'admin@demo.vidyalaya.in',
  schoolName: 'Sri Sai High School',
  password: '',
  dashboardPath: '/admin',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<DemoUser>(FALLBACK_USER);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        role={user.role}
        userName={user.userName}
        userEmail={user.userEmail}
        schoolName={user.schoolName}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        <Topbar
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
          role={user.role}
          userName={user.userName}
          notifCount={3}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6 max-w-screen-2xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
