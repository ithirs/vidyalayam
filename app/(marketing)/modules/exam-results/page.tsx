import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { ModulePage } from '@/components/marketing/ModulePage';

export const metadata: Metadata = {
  title: 'Exams & Results',
  description: 'Create exam timetables, enter marks, generate report cards and analyze academic performance with Vidyalaya.',
};

export default function ExamResultsPage() {
  return (
    <ModulePage
      icon={BookOpen}
      label="Exams & Results"
      tagline="From timetable to report card — all in one place."
      heroDesc="Create exam schedules, let teachers enter marks from their phone, compute grades automatically and print beautiful report cards in minutes. No more Excel sheets or manual calculations."
      color="text-amber-600"
      bg="bg-amber-100"
      accentBg="bg-amber-50"
      features={[
        'Exam timetable creation & sharing',
        'Subject-wise marks entry by teacher',
        'Automatic grade & GPA calculation',
        'Rank and merit list generation',
        'Multiple grading scales (CBSE, state board, custom)',
        'Report card PDF generation',
        'Report card sharing via WhatsApp/SMS',
        'Co-curricular & activity marks',
        'Attendance integration in report card',
        'Year-on-year progress comparison',
      ]}
      deepDive={[
        {
          title: 'Teacher-Friendly Marks Entry',
          desc: 'Teachers log in from their phone and enter marks subject by subject. Validation checks prevent impossible values. No IT support needed.',
        },
        {
          title: 'Beautiful Report Cards',
          desc: 'Generate branded, print-ready report cards with your school\'s logo, principal signature and grade analysis — in one click for all students.',
        },
        {
          title: 'Academic Performance Analytics',
          desc: 'Identify subject-wise weak areas across classes. Track improvement from term to term. Share insights with parents and management.',
        },
      ]}
      relatedModules={[
        { label: 'Student Management', href: '/modules/student-management' },
        { label: 'Attendance Tracking', href: '/modules/attendance' },
        { label: 'Parent Communication', href: '/modules/parent-communication' },
        { label: 'Analytics', href: '/modules/analytics' },
      ]}
    />
  );
}
