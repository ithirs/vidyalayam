import { type Student } from '../../data';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</dt>
      <dd className="text-sm font-semibold text-slate-800">{value || '—'}</dd>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100">{title}</h3>
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-5">{children}</dl>
    </div>
  );
}

export function OverviewTab({ student }: { student: Student }) {
  return (
    <div className="space-y-8">
      <Section title="Personal Information">
        <InfoRow label="Full Name" value={student.name} />
        <InfoRow label="Date of Birth" value={student.dob} />
        <InfoRow label="Gender" value={student.gender} />
        <InfoRow label="Blood Group" value={student.bloodGroup} />
        <InfoRow label="Aadhar" value={student.aadhar} />
        <InfoRow label="Category" value={student.category} />
        <InfoRow label="Religion" value={student.religion} />
        <InfoRow label="Mother Tongue" value={student.motherTongue} />
        <InfoRow label="Nationality" value={student.nationality} />
      </Section>

      <Section title="Contact & Address">
        <InfoRow label="Phone" value={student.phone} />
        <InfoRow label="City" value={student.city} />
        <InfoRow label="State" value={student.state} />
        <InfoRow label="Pincode" value={student.pincode} />
        <div className="col-span-2 sm:col-span-3 flex flex-col gap-0.5">
          <dt className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Address</dt>
          <dd className="text-sm font-semibold text-slate-800">{student.address}, {student.city}, {student.state} - {student.pincode}</dd>
        </div>
      </Section>

      <Section title="Parent Information">
        <InfoRow label="Father's Name" value={student.fatherName} />
        <InfoRow label="Father's Phone" value={student.fatherPhone} />
        <InfoRow label="Occupation" value={student.fatherOccupation} />
        <InfoRow label="Mother's Name" value={student.motherName} />
        <InfoRow label="Mother's Phone" value={student.motherPhone} />
        <InfoRow label="Parent Email" value={student.parentEmail} />
      </Section>

      <Section title="Health Information">
        <InfoRow label="Height" value={student.height} />
        <InfoRow label="Weight" value={student.weight} />
        <InfoRow label="Medical Conditions" value={student.medicalConditions} />
        <InfoRow label="Emergency Contact" value={student.emergencyContact} />
      </Section>
    </div>
  );
}
