'use client';

import {
  ShieldCheck, GraduationCap, Calculator, Users,
  PhoneIncoming, BookMarked, Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'admin' | 'teacher' | 'accountant' | 'parent' | 'receptionist' | 'librarian' | 'superadmin';

interface RoleBadgeProps {
  role: Role;
  size?: 'sm' | 'md';
  className?: string;
}

const ROLE_CONFIG: Record<Role, { label: string; icon: React.ElementType; color: string }> = {
  superadmin:   { label: 'Super Admin',  icon: Crown,         color: 'bg-amber-100 text-amber-700 border-amber-200'   },
  admin:        { label: 'Admin',        icon: ShieldCheck,   color: 'bg-orange-100 text-orange-700 border-orange-200'},
  teacher:      { label: 'Teacher',      icon: GraduationCap, color: 'bg-blue-100 text-blue-700 border-blue-200'      },
  accountant:   { label: 'Accountant',   icon: Calculator,    color: 'bg-green-100 text-green-700 border-green-200'   },
  parent:       { label: 'Parent',       icon: Users,         color: 'bg-teal-100 text-teal-700 border-teal-200'      },
  receptionist: { label: 'Receptionist', icon: PhoneIncoming, color: 'bg-rose-100 text-rose-700 border-rose-200'      },
  librarian:    { label: 'Librarian',    icon: BookMarked,    color: 'bg-violet-100 text-violet-700 border-violet-200'},
};

export function RoleBadge({ role, size = 'md', className }: RoleBadgeProps) {
  const cfg  = ROLE_CONFIG[role];
  const Icon = cfg.icon;
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-semibold',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs',
      cfg.color,
      className,
    )}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {cfg.label}
    </span>
  );
}
