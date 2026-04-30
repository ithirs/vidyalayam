import { Field, Grid2, inputCls, selectCls } from './FormFields';
import { CLASSES, SECTIONS, BOARDS, ACADEMIC_YEARS } from '../data';

interface Props {
  data: { admissionNo: string; class: string; section: string; rollNo: string; academicYear: string; admissionDate: string; board: string; previousSchool: string };
  onChange: (v: Props['data']) => void;
}

export function AcademicSection({ data, onChange }: Props) {
  const set = (k: keyof Props['data']) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <Grid2>
        <Field label="Admission Number">
          <input value={data.admissionNo} onChange={set('admissionNo')} className={inputCls} />
        </Field>
        <Field label="Academic Year" required>
          <select value={data.academicYear} onChange={set('academicYear')} className={selectCls}>
            {ACADEMIC_YEARS.map((y) => <option key={y}>{y}</option>)}
          </select>
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Class" required>
          <select value={data.class} onChange={set('class')} className={selectCls}>
            <option value="">Select Class</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Section" required>
          <select value={data.section} onChange={set('section')} className={selectCls}>
            <option value="">Select Section</option>
            {SECTIONS.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Roll Number">
          <input value={data.rollNo} onChange={set('rollNo')} placeholder="e.g. R001" className={inputCls} />
        </Field>
        <Field label="Admission Date" required>
          <input type="date" value={data.admissionDate} onChange={set('admissionDate')} className={inputCls} />
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Board">
          <select value={data.board} onChange={set('board')} className={selectCls}>
            {BOARDS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Previous School">
          <input value={data.previousSchool} onChange={set('previousSchool')} placeholder="Previous school name" className={inputCls} />
        </Field>
      </Grid2>
    </div>
  );
}
