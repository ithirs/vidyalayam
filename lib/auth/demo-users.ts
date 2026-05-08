import type { Role } from '@/components/dashboard/nav-config';

export interface DemoUser {
  role: Role;
  userName: string;
  userEmail: string;
  schoolName: string;
  password: string;
  dashboardPath: string;
}

export const DEMO_USERS: Record<string, DemoUser> = {
  'super-admin@demo.Adhira.in': {
    role: 'super-admin',
    userName: 'Arvind Mehta',
    userEmail: 'super-admin@demo.Adhira.in',
    schoolName: 'Adhira HQ',
    password: 'demo@123',
    dashboardPath: '/super-admin',
  },
  'admin@demo.Adhira.in': {
    role: 'admin',
    userName: 'Sri Ramulu Goud',
    userEmail: 'admin@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/admin',
  },
  'teacher@demo.Adhira.in': {
    role: 'teacher',
    userName: 'Priya Sharma',
    userEmail: 'teacher@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/teacher',
  },
  'accountant@demo.Adhira.in': {
    role: 'accountant',
    userName: 'Ravi Kiran',
    userEmail: 'accountant@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/accountant',
  },
  'parent@demo.Adhira.in': {
    role: 'parent',
    userName: 'Suresh Babu',
    userEmail: 'parent@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/parent',
  },
  'reception@demo.Adhira.in': {
    role: 'receptionist',
    userName: 'Anitha Reddy',
    userEmail: 'reception@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/receptionist',
  },
  'librarian@demo.Adhira.in': {
    role: 'librarian',
    userName: 'Venkat Rao',
    userEmail: 'librarian@demo.Adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/librarian',
  },
};

export const SESSION_KEY = 'vidyalaya_demo_user';

export function getStoredUser(): DemoUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoUser;
  } catch {
    return null;
  }
}

export function storeUser(user: DemoUser): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
}
