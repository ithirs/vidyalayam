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
  'admin@demo.adhira.in': {
    role: 'admin',
    userName: 'Sri Ramulu Goud',
    userEmail: 'admin@demo.adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/admin',
  },
  'teacher@demo.adhira.in': {
    role: 'teacher',
    userName: 'Priya Sharma',
    userEmail: 'teacher@demo.adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/teacher',
  },
  'accountant@demo.adhira.in': {
    role: 'accountant',
    userName: 'Ravi Kiran',
    userEmail: 'accountant@demo.adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/accountant',
  },
  'parent@demo.adhira.in': {
    role: 'parent',
    userName: 'Suresh Babu',
    userEmail: 'parent@demo.adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/parent',
  },
  'reception@demo.adhira.in': {
    role: 'receptionist',
    userName: 'Anitha Reddy',
    userEmail: 'reception@demo.adhira.in',
    schoolName: 'Sri Sai High School',
    password: 'demo@123',
    dashboardPath: '/receptionist',
  },
  'librarian@demo.adhira.in': {
    role: 'librarian',
    userName: 'Venkat Rao',
    userEmail: 'librarian@demo.adhira.in',
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
