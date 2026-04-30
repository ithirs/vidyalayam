import type { Metadata } from 'next';
import { Users } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Student Management',
  description: 'Manage the complete student lifecycle — admissions, profiles, class assignments, TC issuance and more with Vidyalaya.',
};

export default function StudentManagementPage() {
  return (
    <ModulePage
      icon={Users}
      label="Student Management"
      tagline="Complete student lifecycle management — from inquiry to alumni."
      heroDesc="Vidyalaya's student management module handles everything from online admissions to graduation. Maintain complete records, manage promotions, and issue transfer certificates in seconds."
      color="text-blue-600"
      bg="bg-blue-100"
      accentBg="bg-blue-50"
      features={[
        'Online admission form with fee payment',
        'Student profile with photo & documents',
        'Class & section assignment',
        'Sibling linking & family accounts',
        'Promotion & demote in bulk',
        'Transfer certificate (TC) generation',
        'ID card printing',
        'Custom fields & categories',
        'Alumni tracking',
        'Bonafide & other certificate generation',
      ]}
      deepDive={[
        {
          title: 'Smart Admission Workflow',
          desc: 'Parents fill an online form, upload documents and pay the admission fee — all without visiting the school. Staff review, approve and assign classes instantly.',
        },
        {
          title: 'Bulk Year-End Promotion',
          desc: 'Promote an entire class to the next year in one click. Automatically updates all linked records — attendance, fees and results.',
        },
        {
          title: 'Document Vault',
          desc: 'Store birth certificates, caste certificates, aadhar cards and previous TC digitally. Access any document from any device anytime.',
        },
      ]}
      relatedModules={[
        { label: 'Attendance Tracking', href: '/modules/attendance' },
        { label: 'Fee Management', href: '/modules/fee-management' },
        { label: 'Exams & Results', href: '/modules/exam-results' },
        { label: 'Parent Communication', href: '/modules/parent-communication' },
      ]}
    />
  );
}
