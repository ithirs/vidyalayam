import type { Metadata } from 'next';
import { IndianRupee } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Fee Management',
  description: 'Online fee collection, due tracking, instant receipts and automated reminders. Vidyalaya makes school fee management effortless.',
};

export default function FeeManagementPage() {
  return (
    <ModulePage
      icon={IndianRupee}
      label="Fee Management"
      tagline="Collect fees online. Track dues automatically. Zero paperwork."
      heroDesc="Vidyalaya's fee management module lets parents pay via UPI, cards or net banking from their phone. You see collections in real time, receipts are generated instantly and due reminders go out automatically."
      color="text-orange-600"
      bg="bg-orange-100"
      accentBg="bg-orange-50"
      features={[
        'Online fee payment via UPI, cards & net banking',
        'Custom fee heads (tuition, transport, exam, etc.)',
        'Fee structure by class & category',
        'Instant digital receipts via SMS/WhatsApp',
        'Due amount tracking per student',
        'Automated due reminders',
        'Fee concession & scholarship management',
        'Sibling discount support',
        'Daily/monthly collection reports',
        'Reconciliation & cash book',
      ]}
      deepDive={[
        {
          title: 'Razorpay-Powered Online Payments',
          desc: 'Parents pay from any UPI app, debit/credit card or net banking. Payments reconcile automatically — no manual entry needed.',
        },
        {
          title: 'Smart Due Reminders',
          desc: 'Set up automatic SMS reminders before and after the due date. Reduce collection time by up to 40% without any staff effort.',
        },
        {
          title: 'Real-Time Collection Dashboard',
          desc: 'See today\'s collections, pending dues and overdue students in one live dashboard. Share daily summary with management instantly.',
        },
      ]}
      relatedModules={[
        { label: 'Student Management', href: '/modules/student-management' },
        { label: 'Parent Communication', href: '/modules/parent-communication' },
        { label: 'Analytics', href: '/modules/analytics' },
      ]}
    />
  );
}
