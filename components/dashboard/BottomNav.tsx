'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Chrome as Home, CalendarCheck, IndianRupee, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href:  string;
  icon:  React.ElementType;
}

interface BottomNavProps {
  role?: 'parent' | 'teacher';
}

const PARENT_TABS: NavItem[] = [
  { label: 'Home',        href: '/parent',             icon: Home          },
  { label: 'Attendance',  href: '/parent/attendance',  icon: CalendarCheck },
  { label: 'Fees',        href: '/parent/fees',        icon: IndianRupee   },
  { label: 'Alerts',      href: '/parent/alerts',      icon: Bell          },
  { label: 'Profile',     href: '/parent/profile',     icon: User          },
];

const TEACHER_TABS: NavItem[] = [
  { label: 'Home',        href: '/teacher',                    icon: Home          },
  { label: 'Attendance',  href: '/teacher/attendance/mark',    icon: CalendarCheck },
  { label: 'Fees',        href: '/accountant/fees/collect',    icon: IndianRupee   },
  { label: 'Alerts',      href: '/teacher/notifications',      icon: Bell          },
  { label: 'Profile',     href: '/teacher/profile',            icon: User          },
];

export function BottomNav({ role = 'parent' }: BottomNavProps) {
  const pathname = usePathname();
  const tabs     = role === 'teacher' ? TEACHER_TABS : PARENT_TABS;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-slate-200 safe-area-bottom">
      <div className="flex items-center">
        {tabs.map((tab) => {
          const Icon    = tab.icon;
          const active  = pathname === tab.href || pathname.startsWith(tab.href + '/');
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-colors',
                active ? 'text-orange-500' : 'text-slate-400 hover:text-slate-600'
              )}
            >
              <Icon className={cn('w-5 h-5 transition-transform', active && 'scale-110')} />
              <span className={cn('text-[10px] font-semibold', active && 'font-bold')}>{tab.label}</span>
              {active && <div className="absolute -top-px w-8 h-0.5 bg-orange-500 rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
