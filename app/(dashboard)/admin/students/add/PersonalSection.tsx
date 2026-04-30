import { Field, Grid2, inputCls, selectCls } from './FormFields';
import { BLOOD_GROUPS, CATEGORIES } from '../data';

interface Props {
  data: { fullName: string; dob: string; gender: string; bloodGroup: string; aadhar: string; religion: string; category: string; motherTongue: string; nationality: string };
  onChange: (v: Props['data']) => void;
}

export function PersonalSection({ data, onChange }: Props) {
  const set = (k: keyof Props['data']) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <Field label="Full Name" required>
        <input value={data.fullName} onChange={set('fullName')} placeholder="Student's full name" className={inputCls} />
      </Field>

      <Grid2>
        <Field label="Date of Birth" required>
          <input type="date" value={data.dob} onChange={set('dob')} className={inputCls} />
        </Field>
        <Field label="Blood Group">
          <select value={data.bloodGroup} onChange={set('bloodGroup')} className={selectCls}>
            {BLOOD_GROUPS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
      </Grid2>

      <Field label="Gender" required>
        <div className="flex gap-3">
          {['Male', 'Female', 'Other'].map((g) => (
            <label key={g} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="gender" value={g} checked={data.gender === g}
                onChange={() => onChange({ ...data, gender: g })}
                className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-100" />
              <span className="text-sm font-medium text-slate-700">{g}</span>
            </label>
          ))}
        </div>
      </Field>

      <Grid2>
        <Field label="Aadhar Number">
          <input value={data.aadhar} onChange={set('aadhar')} placeholder="XXXX XXXX XXXX" className={inputCls} maxLength={14} />
        </Field>
        <Field label="Religion">
          <select value={data.religion} onChange={set('religion')} className={selectCls}>
            <option value="">Select Religion</option>
            {['Hindu','Muslim','Christian','Sikh','Jain','Buddhist','Other'].map((r) => <option key={r}>{r}</option>)}
          </select>
        </Field>
      </Grid2>

      <Grid2>
        <Field label="Category" required>
          <select value={data.category} onChange={set('category')} className={selectCls}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Mother Tongue">
          <select value={data.motherTongue} onChange={set('motherTongue')} className={selectCls}>
            <option value="">Select Language</option>
            {['Hindi','Tamil','Telugu','Marathi','Gujarati','Bengali','Malayalam','Kannada','Punjabi','Odia'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </Field>
      </Grid2>

      <Field label="Nationality">
        <input value={data.nationality} onChange={set('nationality')} className={inputCls} />
      </Field>
    </div>
  );
}
