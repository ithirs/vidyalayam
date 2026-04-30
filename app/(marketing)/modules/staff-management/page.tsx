import type { Metadata } from 'next';
import { UserCheck } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Staff Management',
  description: 'Manage teacher and staff profiles, attendance, payroll and leave with Vidyalaya School ERP.',
};

export default function StaffManagementPage() {
  return (
    <ModulePage
      icon={UserCheck}
      label="Staff Management"
      tagline="Your entire staff — organized, paid on time, and accounted for."
      heroDesc="Manage teaching and non-teaching staff in one place. Track attendance, process leave requests, generate monthly payslips and maintain all HR documents without any spreadsheets."
      color="text-teal-600"
      bg="bg-teal-100"
      accentBg="bg-teal-50"
      features={[
        'Staff profiles with qualifications & documents',
        'Role-based system access (teacher, accountant, librarian)',
        'Staff attendance tracking & biometric sync',
        'Leave application & approval workflow',
        'Monthly salary processing',
        'Payslip generation & distribution',
        'Subject & class assignment',
        'Performance & appraisal notes',
        'Staff ID card generation',
        'Document expiry alerts (certificates, PF)',
      ]}
      deepDive={[
        {
          title: 'Role-Based Access Control',
          desc: 'Assign each staff member the exact permissions they need — teachers see their classes, accountants see fee data, principals see everything.',
        },
        {
          title: 'Payroll in Minutes',
          desc: 'Set salary components, attendance-based deductions and advances once. Every month, generate payslips for all staff in one click and share via WhatsApp.',
        },
        {
          title: 'Leave Management',
          desc: 'Staff apply for leave from the app. Principals approve or reject with a tap. Leave balance is updated automatically and payroll accounts for deductions.',
        },
      ]}
      relatedModules={[
        { label: 'Attendance Tracking', href: '/modules/attendance' },
        { label: 'Analytics', href: '/modules/analytics' },
        { label: 'Student Management', href: '/modules/student-management' },
      ]}
    />
  );
}
