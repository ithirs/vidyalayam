import type { Metadata } from 'next';
import { ClipboardList } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Attendance Tracking',
  description: 'Daily and subject-wise attendance with instant parent SMS/WhatsApp alerts. Vidyalaya makes attendance simple.',
};

export default function AttendancePage() {
  return (
    <ModulePage
      icon={ClipboardList}
      label="Attendance Tracking"
      tagline="Mark attendance in 30 seconds. Parents know instantly."
      heroDesc="Teachers mark attendance from their phone in under a minute. Parents get an automatic SMS or WhatsApp the moment their child is marked absent. No more end-of-day calls."
      color="text-green-600"
      bg="bg-green-100"
      accentBg="bg-green-50"
      features={[
        'Daily class-wise attendance marking',
        'Subject-wise period attendance',
        'Instant SMS & WhatsApp alerts to parents',
        'Late arrival & early departure tracking',
        'Monthly attendance report per student',
        'Absentee defaulter list generation',
        'Attendance percentage calculation',
        'Holiday & working day calendar',
        'Staff attendance tracking',
        'Export attendance to Excel/PDF',
      ]}
      deepDive={[
        {
          title: 'One-Tap Mobile Marking',
          desc: 'Teachers open the app, select their class and tap Present or Absent for each student. The whole class is done in under 60 seconds.',
        },
        {
          title: 'Automated Parent Alerts',
          desc: 'The moment a student is marked absent, their parent gets an automatic SMS in their preferred language — English, Hindi or Telugu.',
        },
        {
          title: 'Attendance Analytics',
          desc: 'Identify chronic absentees at a glance. Filter by class, date range or student. Export reports for PTA meetings or board reviews.',
        },
      ]}
      relatedModules={[
        { label: 'Student Management', href: '/modules/student-management' },
        { label: 'Parent Communication', href: '/modules/parent-communication' },
        { label: 'Staff Management', href: '/modules/staff-management' },
        { label: 'Analytics', href: '/modules/analytics' },
      ]}
    />
  );
}
