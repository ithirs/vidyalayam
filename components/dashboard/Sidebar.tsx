'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GraduationCap, ChevronDown, ChevronRight, CircleHelp as HelpCircle, LogOut, X, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, roleBadgeConfig, type Role } from './nav-config';
import { createClient } from '@/lib/supabase/client';
import { clearUser } from '@/lib/auth/demo-users';

interface SidebarProps {
  role?: Role;
  userName?: string;
  userEmail?: string;
  schoolName?: string;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface LogoutDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function LogoutDialog({ onConfirm, onCancel }: LogoutDialogProps) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-sm animate-scale-in">
        <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
          <LogOut className="w-5 h-5 text-red-500" />
        </div>
        <h3 className="text-slate-900 font-bold text-lg text-center font-heading mb-1.5">Sign out?</h3>
        <p className="text-slate-500 text-sm text-center mb-6">You'll need to sign in again to access your dashboard.</p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors shadow-sm"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}

function NavItemRow({
  item,
  isActive,
  isParentActive,
  expanded,
  onToggle,
}: {
  item: (typeof navItems)[0];
  isActive: boolean;
  isParentActive: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const Icon = item.icon;

  return (
    <div>
      {hasSubItems ? (
        <button
          onClick={onToggle}
          className={cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
            isParentActive
              ? 'text-orange-400 bg-orange-500/10 border-l-2 border-orange-400 pl-[10px]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800 border-l-2 border-transparent'
          )}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform duration-200',
              expanded ? 'rotate-180' : ''
            )}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative',
            isActive
              ? 'text-orange-400 bg-orange-500/10 border-l-2 border-orange-400 pl-[10px]'
              : 'text-slate-400 hover:text-white hover:bg-slate-800 border-l-2 border-transparent'
          )}
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span>{item.label}</span>
        </Link>
      )}

      {/* Sub-items */}
      {hasSubItems && (
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="ml-8 mt-1 space-y-0.5 border-l border-slate-700/60 pl-3">
            {item.subItems!.map((sub) => {
              const subActive = pathname === sub.href;
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className={cn(
                    'block py-2 px-2.5 rounded-lg text-xs font-medium transition-all duration-150',
                    subActive
                      ? 'text-orange-400 bg-orange-500/10'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/60'
                  )}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarContent({
  role = 'admin',
  userName = 'School Admin',
  userEmail = 'admin@school.in',
  schoolName = 'Sri Sai High School',
  onClose,
}: Omit<SidebarProps, 'mobileOpen' | 'onMobileClose'> & { onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showLogout, setShowLogout] = useState(false);

  const filtered = navItems.filter((item) => item.roles.includes(role));
  const badge = roleBadgeConfig[role];

  const toggleExpand = (href: string) => {
    setExpandedItems((prev) => ({ ...prev, [href]: !prev[href] }));
  };

  const isParentActive = (item: (typeof navItems)[0]) => {
    if (!item.subItems) return false;
    return item.subItems.some((s) => pathname === s.href) || pathname === item.href;
  };

  useEffect(() => {
    const autoExpand: Record<string, boolean> = {};
    const items = navItems.filter((item) => item.roles.includes(role));
    items.forEach((item) => {
      if (item.subItems && (item.subItems.some((s) => pathname === s.href) || pathname === item.href)) {
        autoExpand[item.href] = true;
      }
    });
    setExpandedItems(autoExpand);
  }, [pathname, role]);

  const handleLogout = async () => {
    clearUser();
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
    }
    router.push('/login');
  };

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col h-full bg-[#0F172A]">
      {showLogout && (
        <LogoutDialog onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
      )}

      {/* Header: School name + close btn (mobile) */}
      <div className="px-4 pt-5 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-white text-sm truncate font-heading">{schoolName}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Vidyalaya ERP</div>
            </div>
            <button className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-lg hover:bg-slate-800">
              <Building2 className="w-4 h-4" />
            </button>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* User card */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center shrink-0 text-white text-xs font-bold">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-white text-sm font-semibold truncate">{userName}</div>
            <div className="text-slate-500 text-xs truncate">{userEmail}</div>
          </div>
          <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0', badge.color)}>
            {badge.label}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5 scrollbar-thin">
        {filtered.map((item) => (
          <NavItemRow
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isParentActive={isParentActive(item)}
            expanded={!!expandedItems[item.href]}
            onToggle={() => toggleExpand(item.href)}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <Link
          href="/dashboard/support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-150"
        >
          <HelpCircle className="w-5 h-5 shrink-0" />
          Help & Support
        </Link>
        <button
          onClick={() => setShowLogout(true)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 text-sm font-medium transition-all duration-150"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Sidebar({
  role,
  userName,
  userEmail,
  schoolName,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-sidebar shrink-0 h-screen sticky top-0 shadow-sidebar overflow-hidden">
        <SidebarContent
          role={role}
          userName={userName}
          userEmail={userEmail}
          schoolName={schoolName}
        />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-[100] transition-all duration-300',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onMobileClose}
        />
        {/* Drawer */}
        <div
          className={cn(
            'absolute left-0 top-0 bottom-0 w-[280px] transition-transform duration-300 ease-out overflow-hidden',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <SidebarContent
            role={role}
            userName={userName}
            userEmail={userEmail}
            schoolName={schoolName}
            onClose={onMobileClose}
          />
        </div>
      </div>
    </>
  );
}
