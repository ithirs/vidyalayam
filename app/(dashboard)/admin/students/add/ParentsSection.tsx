import { Field, Grid2, SectionDivider, inputCls, selectCls } from './FormFields';
import { INCOME_RANGES } from '../data';

interface Props {
  data: { fatherName: string; fatherOccupation: string; fatherPhone: string; fatherAadhar: string; motherName: string; motherOccupation: string; motherPhone: string; motherAadhar: string; guardianName: string; guardianRelation: string; guardianPhone: string; annualIncome: string; parentEmail: string };
  onChange: (v: Props['data']) => void;
}

const OCCUPATIONS = ['Business','Service','Farmer','Doctor','Teacher','Engineer','Lawyer','Accountant','Other'];

export function ParentsSection({ data, onChange }: Props) {
  const set = (k: keyof Props['data']) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <SectionDivider label="Father's Details" />
      <Grid2>
        <Field label="Father's Name" required>
          <input value={data.fatherName} onChange={set('fatherName')} placeholder="Father's full name" className={inputCls} />
        </Field>
        <Field label="Father's Occupation">
          <select value={data.fatherOccupation} onChange={set('fatherOccupation')} className={selectCls}>
            <option value="">Select Occupation</option>
            {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Father's Phone" required>
          <input value={data.fatherPhone} onChange={set('fatherPhone')} placeholder="10-digit mobile" maxLength={10} className={inputCls} />
        </Field>
        <Field label="Father's Aadhar">
          <input value={data.fatherAadhar} onChange={set('fatherAadhar')} placeholder="XXXX XXXX XXXX" maxLength={14} className={inputCls} />
        </Field>
      </Grid2>

      <SectionDivider label="Mother's Details" />
      <Grid2>
        <Field label="Mother's Name">
          <input value={data.motherName} onChange={set('motherName')} placeholder="Mother's full name" className={inputCls} />
        </Field>
        <Field label="Mother's Occupation">
          <select value={data.motherOccupation} onChange={set('motherOccupation')} className={selectCls}>
            <option value="">Select Occupation</option>
            {OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
          </select>
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Mother's Phone">
          <input value={data.motherPhone} onChange={set('motherPhone')} placeholder="10-digit mobile" maxLength={10} className={inputCls} />
        </Field>
        <Field label="Mother's Aadhar">
          <input value={data.motherAadhar} onChange={set('motherAadhar')} placeholder="XXXX XXXX XXXX" maxLength={14} className={inputCls} />
        </Field>
      </Grid2>

      <SectionDivider label="Guardian (if different)" />
      <Grid2>
        <Field label="Guardian Name">
          <input value={data.guardianName} onChange={set('guardianName')} placeholder="Guardian's name (optional)" className={inputCls} />
        </Field>
        <Field label="Relation">
          <select value={data.guardianRelation} onChange={set('guardianRelation')} className={selectCls}>
            <option value="">Select Relation</option>
            {['Uncle','Aunt','Grandparent','Elder Sibling','Other'].map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>
      </Grid2>
      <Grid2>
        <Field label="Guardian Phone">
          <input value={data.guardianPhone} onChange={set('guardianPhone')} placeholder="10-digit mobile" className={inputCls} />
        </Field>
        <Field label="Annual Income">
          <select value={data.annualIncome} onChange={set('annualIncome')} className={selectCls}>
            <option value="">Select Range</option>
            {INCOME_RANGES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>
      </Grid2>
      <Field label="Parent Email">
        <input type="email" value={data.parentEmail} onChange={set('parentEmail')} placeholder="parent@email.com" className={inputCls} />
      </Field>
    </div>
  );
}
