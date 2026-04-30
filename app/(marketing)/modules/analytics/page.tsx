import type { Metadata } from 'next';
import { ChartBar as BarChart2 } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Analytics Dashboard',
  description: 'Real-time dashboards for fee collection, attendance, academic performance and staff metrics. Make data-driven decisions with Vidyalaya.',
};

export default function AnalyticsPage() {
  return (
    <ModulePage
      icon={BarChart2}
      label="Analytics Dashboard"
      tagline="All your school data in one live, visual dashboard."
      heroDesc="Stop guessing and start knowing. Vidyalaya's analytics gives principals and management a real-time view of every key metric — fee collection, attendance, academic performance, and more — all in one screen."
      color="text-cyan-600"
      bg="bg-cyan-100"
      accentBg="bg-cyan-50"
      features={[
        'Live fee collection & pending dues dashboard',
        'Class-wise attendance trend charts',
        'Subject & grade performance analysis',
        'Staff attendance & leave summary',
        'Student enrollment & dropout tracking',
        'Library utilization metrics',
        'Custom date range filtering',
        'Comparison across academic years',
        'Export reports to PDF & Excel',
        'Role-specific dashboards (Principal, Accountant)',
      ]}
      deepDive={[
        {
          title: 'Executive Summary Dashboard',
          desc: 'Principals see a live overview of today\'s attendance, this month\'s fee collection, pending dues and upcoming exams — all on one screen, every morning.',
        },
        {
          title: 'Academic Performance Insights',
          desc: 'Identify which class or subject is underperforming. Compare term-on-term results. Spot students who need extra attention before it\'s too late.',
        },
        {
          title: 'Financial Health Snapshot',
          desc: 'Track daily, weekly and monthly fee collection vs. targets. See which fee heads are overdue and which classes have the highest default rate.',
        },
      ]}
      relatedModules={[
        { label: 'Fee Management', href: '/modules/fee-management' },
        { label: 'Attendance Tracking', href: '/modules/attendance' },
        { label: 'Exams & Results', href: '/modules/exam-results' },
        { label: 'Staff Management', href: '/modules/staff-management' },
      ]}
    />
  );
}
