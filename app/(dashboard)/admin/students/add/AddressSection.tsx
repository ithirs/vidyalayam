import { Field, Grid2, inputCls } from './FormFields';

interface Props {
  data: { presentAddress: string; sameAsPermanent: boolean; permanentAddress: string; city: string; district: string; state: string; pincode: string };
  onChange: (v: Props['data']) => void;
}

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal'];

export function AddressSection({ data, onChange }: Props) {
  const set = (k: keyof Props['data']) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    onChange({ ...data, [k]: e.target.value });

  return (
    <div className="space-y-4">
      <Field label="Present Address" required>
        <textarea value={data.presentAddress} onChange={set('presentAddress')} rows={3}
          placeholder="House/Flat no, Street, Area…"
          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white resize-none" />
      </Field>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input type="checkbox" checked={data.sameAsPermanent}
          onChange={(e) => onChange({ ...data, sameAsPermanent: e.target.checked })}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-100" />
        <span className="text-sm font-medium text-slate-700">Permanent address same as present</span>
      </label>

      {!data.sameAsPermanent && (
        <Field label="Permanent Address">
          <textarea value={data.permanentAddress} onChange={set('permanentAddress')} rows={3}
            placeholder="Permanent address…"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white resize-none" />
        </Field>
      )}

      <Grid2>
        <Field label="City" required>
          <input value={data.city} onChange={set('city')} placeholder="City" className={inputCls} />
        </Field>
        <Field label="District">
          <input value={data.district} onChange={set('district')} placeholder="District" className={inputCls} />
        </Field>
      </Grid2>

      <Grid2>
        <Field label="State" required>
          <select value={data.state} onChange={set('state')}
            className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white cursor-pointer">
            <option value="">Select State</option>
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Pincode" required>
          <input value={data.pincode} onChange={set('pincode')} placeholder="6-digit pincode" maxLength={6} className={inputCls} />
        </Field>
      </Grid2>
    </div>
  );
}
