import { Field, Grid2, inputCls } from './FormFields';

interface Props {
  data: { height: string; weight: string; allergies: string; medicalConditions: string; emergencyContact: string };
  onChange: (v: Props['data']) => void;
}

export function HealthSection({ data, onChange }: Props) {
  const set = (k: keyof Props['data']) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <Grid2>
        <Field label="Height">
          <input value={data.height} onChange={set('height')} placeholder="e.g. 155 cm" className={inputCls} />
        </Field>
        <Field label="Weight">
          <input value={data.weight} onChange={set('weight')} placeholder="e.g. 45 kg" className={inputCls} />
        </Field>
      </Grid2>

      <Field label="Known Allergies">
        <textarea value={data.allergies} onChange={set('allergies')} rows={2}
          placeholder="List any known allergies (or write 'None')…"
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white resize-none" />
      </Field>

      <Field label="Medical Conditions">
        <textarea value={data.medicalConditions} onChange={set('medicalConditions')} rows={2}
          placeholder="List any ongoing medical conditions (or write 'None')…"
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white resize-none" />
      </Field>

      <Field label="Emergency Contact" required>
        <input value={data.emergencyContact} onChange={set('emergencyContact')} placeholder="Emergency contact number" className={inputCls} />
      </Field>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <p className="text-xs font-bold text-blue-700 mb-1">Health Information Note</p>
        <p className="text-xs text-blue-500">This information is used only in medical emergencies and kept strictly confidential. All medical data is stored securely.</p>
      </div>
    </div>
  );
}
