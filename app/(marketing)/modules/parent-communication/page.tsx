import type { Metadata } from 'next';
import { MessageSquare } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Parent Communication',
  description: 'WhatsApp, SMS and push notifications for parents. Keep every parent informed with Vidyalaya School ERP.',
};

export default function ParentCommunicationPage() {
  return (
    <ModulePage
      icon={MessageSquare}
      label="Parent Communication"
      tagline="Every parent, always informed — on WhatsApp, SMS and app."
      heroDesc="Eliminate missed circulars, unanswered questions and frustrated parents. Vidyalaya sends automatic updates on attendance, fees, results and events and gives parents a direct line to the school."
      color="text-pink-600"
      bg="bg-pink-100"
      accentBg="bg-pink-50"
      features={[
        'Automatic attendance alerts via WhatsApp & SMS',
        'Fee due & payment confirmation messages',
        'Exam result sharing via WhatsApp',
        'School circular & notice distribution',
        'Event & holiday reminders',
        'Broadcast messages to selected classes or all parents',
        'Parent mobile app (Android)',
        'Direct teacher-parent messaging',
        'Language selection per parent (EN/HI/TE)',
        'Message delivery reports',
      ]}
      deepDive={[
        {
          title: 'WhatsApp-First Communication',
          desc: 'Parents in India are already on WhatsApp. Vidyalaya sends attendance, fee receipts and report cards directly to parents\' WhatsApp — no new app to install.',
        },
        {
          title: 'Targeted Broadcasts',
          desc: 'Send a message to all Class 10 parents, or all fee defaulters, or the entire school. Compose once, send instantly to hundreds of parents.',
        },
        {
          title: 'Parent App Dashboard',
          desc: 'Parents who install the Vidyalaya app can see attendance history, fee status, upcoming exams and report cards — all in their pocket.',
        },
      ]}
      relatedModules={[
        { label: 'Attendance Tracking', href: '/modules/attendance' },
        { label: 'Fee Management', href: '/modules/fee-management' },
        { label: 'Exams & Results', href: '/modules/exam-results' },
        { label: 'Student Management', href: '/modules/student-management' },
      ]}
    />
  );
}
