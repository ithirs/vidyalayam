'use client';

import { use } from 'react';
import { Toaster } from 'sonner';
import { STUDENTS } from '../data';
import { ProfileHeader } from './ProfileHeader';
import { ProfileTabs } from './ProfileTabs';

interface Props {
  params: Promise<{ id: string }>;
}

export default function StudentProfilePage({ params }: Props) {
  const { id } = use(params);
  const student = STUDENTS.find((s) => s.id === id) ?? STUDENTS[0];

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="max-w-5xl mx-auto space-y-5">
        <ProfileHeader student={student} />
        <ProfileTabs student={student} />
      </div>
    </>
  );
}
