import {
  LayoutDashboard,
  Users,
  UserCheck,
  ClipboardList,
  IndianRupee,
  FileText,
  Library,
  MessageSquare,
  BarChart3,
  Settings,
  BookOpen,
  PenLine,
  GraduationCap,
  Wallet,
  AlertCircle,
  Receipt,
  TrendingUp,
  BookMarked,
  RotateCcw,
  Clock,
  FolderOpen,
  Search,
  Baby,
  Bell,
  type LucideIcon,
} from 'lucide-react';

export type Role = 'admin' | 'teacher' | 'accountant' | 'parent' | 'receptionist' | 'librarian' | 'super-admin';

export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  subItems?: NavSubItem[];
  roles: Role[];
}

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'teacher', 'accountant', 'parent', 'receptionist', 'librarian'],
  },
  {
    label: 'Dashboard',
    href: '/super-admin',
    icon: LayoutDashboard,
    roles: ['super-admin'],
  },
  {
    label: 'Schools',
    href: '/super-admin/schools',
    icon: Users,
    roles: ['super-admin'],
  },
  {
    label: 'Reports & Analytics',
    href: '/super-admin/reports',
    icon: BarChart3,
    roles: ['super-admin'],
  },
  {
    label: 'Settings',
    href: '/super-admin/settings',
    icon: Settings,
    roles: ['super-admin'],
  },
  {
    label: 'Students',
    href: '/admin/students',
    icon: GraduationCap,
    roles: ['admin'],
    subItems: [
      { label: 'All Students', href: '/admin/students' },
      { label: 'Add Student', href: '/admin/students/add' },
    ],
  },
  {
    label: 'Staff',
    href: '/admin/staff',
    icon: UserCheck,
    roles: ['admin'],
    subItems: [
      { label: 'All Staff', href: '/admin/staff' },
      { label: 'Add Staff', href: '/admin/staff/add' },
      { label: 'Roles', href: '/admin/staff/roles' },
    ],
  },
  {
    label: 'Attendance',
    href: '/admin/attendance',
    icon: ClipboardList,
    roles: ['admin'],
    subItems: [
      { label: 'Overview', href: '/admin/attendance' },
      { label: 'Reports', href: '/admin/attendance/reports' },
    ],
  },
  {
    label: 'Fees',
    href: '/admin/fees',
    icon: IndianRupee,
    roles: ['admin'],
    subItems: [
      { label: 'Collection', href: '/admin/fees/collection' },
      { label: 'Dues', href: '/admin/fees/dues' },
      { label: 'Fee Structure', href: '/admin/fees/structure' },
      { label: 'Receipts', href: '/admin/fees/receipts' },
    ],
  },
  {
    label: 'Exams',
    href: '/admin/exams',
    icon: FileText,
    roles: ['admin'],
    subItems: [
      { label: 'Exam Schedule', href: '/admin/exams' },
      { label: 'Marks Entry', href: '/admin/exams/marks' },
      { label: 'Report Cards', href: '/admin/exams/report-cards' },
    ],
  },
  {
    label: 'Library',
    href: '/admin/library',
    icon: Library,
    roles: ['admin'],
  },
  {
    label: 'Communications',
    href: '/admin/communications',
    icon: MessageSquare,
    roles: ['admin'],
  },
  {
    label: 'Reports & Analytics',
    href: '/admin/reports',
    icon: BarChart3,
    roles: ['admin'],
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['admin'],
  },
  {
    label: 'My Classes',
    href: '/teacher/my-classes',
    icon: BookOpen,
    roles: ['teacher'],
  },
  {
    label: 'Mark Attendance',
    href: '/teacher/attendance/mark',
    icon: ClipboardList,
    roles: ['teacher'],
  },
  {
    label: 'Homework',
    href: '/teacher/homework',
    icon: PenLine,
    roles: ['teacher'],
  },
  {
    label: 'Marks Entry',
    href: '/teacher/marks-entry',
    icon: FileText,
    roles: ['teacher'],
  },
  {
    label: 'My Students',
    href: '/teacher/my-students',
    icon: Users,
    roles: ['teacher'],
  },
  {
    label: 'Fee Management',
    href: '/accountant/fees/collect',
    icon: Wallet,
    roles: ['accountant'],
    subItems: [
      { label: 'Collect Fee', href: '/accountant/fees/collect' },
      { label: 'Fee Dues', href: '/accountant/fees/dues' },
      { label: 'Fee Structure', href: '/accountant/fees/structure' },
      { label: 'Receipts', href: '/accountant/fees/receipts' },
    ],
  },
  {
    label: 'Financial Reports',
    href: '/accountant/financial-reports',
    icon: TrendingUp,
    roles: ['accountant'],
  },
  {
    label: 'My Children',
    href: '/parent/my-children',
    icon: Baby,
    roles: ['parent'],
  },
  {
    label: 'Attendance',
    href: '/parent/attendance',
    icon: ClipboardList,
    roles: ['parent'],
  },
  {
    label: 'Fees & Payments',
    href: '/parent/fees',
    icon: IndianRupee,
    roles: ['parent'],
  },
  {
    label: 'Homework',
    href: '/parent/homework',
    icon: PenLine,
    roles: ['parent'],
  },
  {
    label: 'Report Cards',
    href: '/parent/report-cards',
    icon: FileText,
    roles: ['parent'],
  },
  {
    label: 'Notices',
    href: '/parent/notices',
    icon: Bell,
    roles: ['parent'],
  },
  {
    label: 'Admissions',
    href: '/receptionist/admissions',
    icon: GraduationCap,
    roles: ['receptionist'],
  },
  {
    label: 'Inquiries',
    href: '/receptionist/inquiries',
    icon: Search,
    roles: ['receptionist'],
  },
  {
    label: 'Student Documents',
    href: '/receptionist/documents',
    icon: FolderOpen,
    roles: ['receptionist'],
  },
  {
    label: 'Books Catalog',
    href: '/librarian/books-catalog',
    icon: BookMarked,
    roles: ['librarian'],
  },
  {
    label: 'Issue / Return',
    href: '/librarian/issue-return',
    icon: RotateCcw,
    roles: ['librarian'],
  },
  {
    label: 'Pending Returns',
    href: '/librarian/pending-returns',
    icon: Clock,
    roles: ['librarian'],
  },
];

export const roleBadgeConfig: Record<Role, { label: string; color: string }> = {
  'super-admin': { label: 'Super Admin', color: 'bg-slate-500/20 text-slate-300' },
  admin: { label: 'Admin', color: 'bg-blue-500/20 text-blue-300' },
  teacher: { label: 'Teacher', color: 'bg-green-500/20 text-green-300' },
  accountant: { label: 'Accountant', color: 'bg-amber-500/20 text-amber-300' },
  parent: { label: 'Parent', color: 'bg-teal-500/20 text-teal-300' },
  receptionist: { label: 'Receptionist', color: 'bg-rose-500/20 text-rose-300' },
  librarian: { label: 'Librarian', color: 'bg-orange-500/20 text-orange-300' },
};
