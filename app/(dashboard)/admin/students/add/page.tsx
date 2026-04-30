'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, User, BookOpen, Users, MapPin, FileText, Heart, Camera, Check } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PersonalSection } from './PersonalSection';
import { AcademicSection } from './AcademicSection';
import { ParentsSection } from './ParentsSection';
import { AddressSection } from './AddressSection';
import { DocumentsSection } from './DocumentsSection';
import { HealthSection } from './HealthSection';

export type FormData = {
  photo: string | null;
  personal: { fullName: string; dob: string; gender: string; bloodGroup: string; aadhar: string; religion: string; category: string; motherTongue: string; nationality: string };
  academic: { admissionNo: string; class: string; section: string; rollNo: string; academicYear: string; admissionDate: string; board: string; previousSchool: string };
  parents: { fatherName: string; fatherOccupation: string; fatherPhone: string; fatherAadhar: string; motherName: string; motherOccupation: string; motherPhone: string; motherAadhar: string; guardianName: string; guardianRelation: string; guardianPhone: string; annualIncome: string; parentEmail: string };
  address: { presentAddress: string; sameAsPermanent: boolean; permanentAddress: string; city: string; district: string; state: string; pincode: string };
  documents: Record<string, boolean>;
  health: { height: string; weight: string; allergies: string; medicalConditions: string; emergencyContact: string };
};

function makeInitial(): FormData {
  return {
    photo: null,
    personal: { fullName: '', dob: '', gender: 'Male', bloodGroup: 'O+', aadhar: '', religion: '', category: 'General', motherTongue: '', nationality: 'Indian' },
    academic: { admissionNo: `ADM2025${String(Math.floor(1000 + Math.random() * 9000))}`, class: '', section: '', rollNo: '', academicYear: '2024-25', admissionDate: '', board: 'CBSE', previousSchool: '' },
    parents: { fatherName: '', fatherOccupation: '', fatherPhone: '', fatherAadhar: '', motherName: '', motherOccupation: '', motherPhone: '', motherAadhar: '', guardianName: '', guardianRelation: '', guardianPhone: '', annualIncome: '', parentEmail: '' },
    address: { presentAddress: '', sameAsPermanent: true, permanentAddress: '', city: '', district: '', state: '', pincode: '' },
    documents: {},
    health: { height: '', weight: '', allergies: '', medicalConditions: '', emergencyContact: '' },
  };
}

const SECTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'academic', label: 'Academic', icon: BookOpen },
  { id: 'parents', label: 'Parents', icon: Users },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'health', label: 'Health', icon: Heart },
] as const;

type SectionId = typeof SECTIONS[number]['id'];

export default function AddStudentPage() {
  const [data, setData] = useState<FormData>(makeInitial);
  const [active, setActive] = useState<SectionId>('personal');
  const [completed, setCompleted] = useState<Set<SectionId>>(new Set());
  const router = useRouter();

  const update = <K extends keyof FormData>(section: K, value: FormData[K]) => {
    setData((d) => ({ ...d, [section]: value }));
  };

  const markComplete = (id: SectionId) => {
    setCompleted((c) => { const nc = new Set(c); nc.add(id); return nc; });
  };

  const next = () => {
    const idx = SECTIONS.findIndex((s) => s.id === active);
    markComplete(active);
    if (idx < SECTIONS.length - 1) setActive(SECTIONS[idx + 1].id);
  };

  const prev = () => {
    const idx = SECTIONS.findIndex((s) => s.id === active);
    if (idx > 0) setActive(SECTIONS[idx - 1].id);
  };

  const handleSave = (mode: 'draft' | 'another' | 'profile') => {
    if (!data.personal.fullName) return toast.error('Student name is required');
    if (!data.academic.class) return toast.error('Please select a class');
    toast.success(`Student "${data.personal.fullName}" saved successfully`);
    if (mode === 'profile') setTimeout(() => router.push('/admin/students'), 1000);
    else if (mode === 'another') setTimeout(() => setData(makeInitial()), 1000);
    else setTimeout(() => router.push('/admin/students'), 1000);
  };

  const activeIdx = SECTIONS.findIndex((s) => s.id === active);

  return (
    <>
      <Toaster position="top-right" richColors />
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/dashboard" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/admin/students" className="hover:text-blue-600 transition-colors font-medium">Students</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Add Student</span>
        </nav>

        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Add New Student</h1>
            <p className="text-sm text-slate-500 mt-0.5">Fill in all sections to complete the student profile</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/admin/students"
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button onClick={() => handleSave('draft')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
              Save as Draft
            </button>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Section stepper */}
          <div className="w-48 shrink-0 sticky top-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              {/* Photo upload */}
              <div className="p-4 border-b border-slate-100 flex flex-col items-center">
                <div className="relative group cursor-pointer" onClick={() => toast.info('File picker opening…')}>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                    {data.photo ? (
                      <img src={data.photo} alt="Student" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-slate-400" />
                    )}
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 text-center">Click to upload photo</p>
              </div>

              {/* Steps */}
              <div className="py-2">
                {SECTIONS.map(({ id, label, icon: Icon }, i) => {
                  const isActive = active === id;
                  const isDone = completed.has(id);
                  return (
                    <button key={id} onClick={() => setActive(id)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all text-left relative',
                        isActive ? 'bg-blue-50 text-blue-700' : isDone ? 'text-slate-600 hover:bg-slate-50' : 'text-slate-400 hover:bg-slate-50'
                      )}>
                      {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500 rounded-r-full" />}
                      <div className={cn('w-7 h-7 rounded-xl flex items-center justify-center shrink-0',
                        isActive ? 'bg-blue-500 text-white' : isDone ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400')}>
                        {isDone && !isActive ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{label}</p>
                        <p className={cn('text-[10px]', isDone && !isActive ? 'text-green-500' : 'text-slate-400')}>
                          {i + 1} of {SECTIONS.length}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form area */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-2.5">
                  {(() => { const Icon = SECTIONS[activeIdx].icon; return <Icon className="w-5 h-5 text-blue-500" />; })()}
                  <h2 className="font-bold text-slate-900 font-heading text-lg">
                    {SECTIONS[activeIdx].label} Information
                  </h2>
                  <span className="ml-auto text-xs font-bold text-slate-400">{activeIdx + 1}/{SECTIONS.length}</span>
                </div>
              </div>

              <div className="p-6">
                {active === 'personal' && <PersonalSection data={data.personal} onChange={(v) => update('personal', v)} />}
                {active === 'academic' && <AcademicSection data={data.academic} onChange={(v) => update('academic', v)} />}
                {active === 'parents' && <ParentsSection data={data.parents} onChange={(v) => update('parents', v)} />}
                {active === 'address' && <AddressSection data={data.address} onChange={(v) => update('address', v)} />}
                {active === 'documents' && <DocumentsSection data={data.documents} onChange={(v) => update('documents', v)} />}
                {active === 'health' && <HealthSection data={data.health} onChange={(v) => update('health', v)} />}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <button onClick={prev} disabled={activeIdx === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                Previous
              </button>

              {active === 'health' ? (
                <div className="flex gap-2">
                  <button onClick={() => handleSave('another')}
                    className="px-5 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    Save & Add Another
                  </button>
                  <button onClick={() => handleSave('profile')}
                    className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98]">
                    Save & View Profile
                  </button>
                </div>
              ) : (
                <button onClick={next}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors shadow-sm active:scale-[0.98]">
                  Next: {SECTIONS[activeIdx + 1]?.label}
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
