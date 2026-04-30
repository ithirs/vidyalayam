'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Menu,
  Search,
  Bell,
  ChevronRight,
  ChevronDown,
  User,
  Settings,
  LogOut,
  RefreshCw,
  Command,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';
import { clearUser } from '@/lib/auth/demo-users';
import type { Role } from './nav-config';
import { roleBadgeConfig } from './nav-config';
import { NotificationPanel } from './NotificationPanel';

interface TopbarProps {
  onMobileMenuOpen: () => void;
  role?: Role;
  userName?: string;
  notifCount?: number;
}

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हिं' },
  { code: 'te', label: 'తె' },
];

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.replace('/dashboard', '').split('/').filter(Boolean);
  const crumbs = [{ label: 'Dashboard', href: '/dashboard' }];
  let path = '/dashboard';
  segments.forEach((seg) => {
    path += `/${seg}`;
    const label = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    crumbs.push({ label, href: path });
  });
  return crumbs;
}

export function Topbar({ onMobileMenuOpen, role = 'admin', userName = 'School Admin', notifCount = 3 }: TopbarProps) {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs();
  const [activeLang, setActiveLang] = useState('en');
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const badge = roleBadgeConfig[role];

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setLangOpen(false);
        setUserMenuOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const openLang = () => { setUserMenuOpen(false); setNotifOpen(false); setLangOpen((o) => !o); };
  const openUserMenu = () => { setLangOpen(false); setNotifOpen(false); setUserMenuOpen((o) => !o); };
  const openNotif = () => { setLangOpen(false); setUserMenuOpen(false); setNotifOpen((o) => !o); };

  const handleLogout = async () => {
    clearUser();
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
    }
    router.push('/login');
  };

  return (
    <>
      <header className="h-header bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-3 shrink-0 z-50 relative">

        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex-1 flex items-center gap-1.5 min-w-0 overflow-hidden">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <div key={crumb.href} className="flex items-center gap-1.5 shrink-0">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                {isLast ? (
                  <span className="text-sm font-semibold text-orange-500 truncate max-w-[140px] lg:max-w-none">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* Center: Search bar (desktop) */}
        <div className="hidden md:flex flex-1 max-w-md">
          <button
            onClick={() => { setSearchOpen(true); setTimeout(() => searchRef.current?.focus(), 50); }}
            className="flex items-center gap-2.5 w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 text-sm hover:border-slate-300 hover:bg-slate-100 transition-all duration-150"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span className="flex-1 text-left">Search students, staff...</span>
            <div className="flex items-center gap-0.5 text-[11px] bg-white border border-slate-200 rounded-md px-1.5 py-0.5 shrink-0">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1.5">

          {/* Language switcher */}
          <div ref={langRef} className="relative">
            <button
              onClick={openLang}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-medium transition-colors"
            >
              {languages.find((l) => l.code === activeLang)?.label}
              <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', langOpen ? 'rotate-180' : '')} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal p-1 w-28 animate-scale-in z-[200]">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      activeLang === lang.code
                        ? 'bg-orange-50 text-orange-600 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    )}
                  >
                    {lang.label}
                    {activeLang === lang.code && <span className="ml-auto text-orange-500">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification bell */}
          <button
            onClick={openNotif}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {notifCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                {notifCount > 9 ? '9+' : notifCount}
              </span>
            )}
          </button>

          {/* User avatar dropdown */}
          <div ref={userRef} className="relative">
            <button
              onClick={openUserMenu}
              className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-[11px] font-bold">
                {initials}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-semibold text-slate-700 leading-tight">{userName}</div>
                <div className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-0.5 inline-block', badge.color.replace('text-', 'text-').replace('bg-', 'bg-').replace('/20', '/30'))}>
                  {badge.label}
                </div>
              </div>
              <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform', userMenuOpen ? 'rotate-180' : '')} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-modal w-56 overflow-hidden animate-scale-in z-[200]">
                <div className="px-4 py-3 border-b border-slate-100">
                  <div className="text-sm font-semibold text-slate-800">{userName}</div>
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded-full', badge.color)}>
                    {badge.label}
                  </span>
                </div>
                <div className="p-1.5">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    School Settings
                  </Link>
                  <button
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Switch Role
                  </button>
                </div>
                <div className="p-1.5 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(''); }} />
          <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg overflow-hidden animate-scale-in">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students, staff, classes..."
                className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-10 text-center">
              <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {searchQuery ? `No results for "${searchQuery}"` : 'Start typing to search...'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Notification panel */}
      <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
}
