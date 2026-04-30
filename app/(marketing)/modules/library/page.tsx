import type { Metadata } from 'next';
import { Library } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Library System',
  description: 'Digitize your school library with Vidyalaya — book catalogue, issue & return tracking, overdue reminders and more.',
};

export default function LibraryPage() {
  return (
    <ModulePage
      icon={Library}
      label="Library System"
      tagline="Your school library, fully digitized and zero-effort to manage."
      heroDesc="Stop maintaining manual registers for library books. Vidyalaya lets you catalogue your entire collection, issue books to students and staff in seconds, track returns and send automated overdue reminders."
      color="text-violet-600"
      bg="bg-violet-100"
      accentBg="bg-violet-50"
      features={[
        'Complete book catalogue management',
        'Book issue & return with one scan',
        'Barcode / QR code support',
        'Category, rack & shelf organization',
        'Student & staff borrowing history',
        'Overdue reminders via SMS/WhatsApp',
        'Fine calculation for late returns',
        'Low-stock & lost book alerts',
        'Digital book requests from students',
        'Catalogue import via Excel',
      ]}
      deepDive={[
        {
          title: 'Fast Issue & Return',
          desc: 'Scan a book barcode or search by title. Issue to a student in under 10 seconds. The system updates stock, borrower history and due date automatically.',
        },
        {
          title: 'Automated Overdue Reminders',
          desc: 'Students and parents receive automatic SMS reminders when books are overdue. Reduce lost books and late returns without any staff follow-up.',
        },
        {
          title: 'Rich Catalogue & Search',
          desc: 'Add books with author, ISBN, category, publisher and more. Search the full catalogue instantly from any device — phone or desktop.',
        },
      ]}
      relatedModules={[
        { label: 'Student Management', href: '/modules/student-management' },
        { label: 'Staff Management', href: '/modules/staff-management' },
        { label: 'Parent Communication', href: '/modules/parent-communication' },
      ]}
    />
  );
}
