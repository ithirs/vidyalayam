export interface FeeCategory {
  id: string;
  name: string;
  icon: string;
  enabled: boolean;
  color: string;
}

export interface ClassRow {
  id: string;
  label: string;
  stream?: string;
}

export type FeeMatrix = Record<string, Record<string, number>>;

export const DEFAULT_CATEGORIES: FeeCategory[] = [
  { id: 'tuition', name: 'Tuition Fee', icon: '📚', enabled: true, color: 'bg-blue-50 text-blue-600 border-blue-100' },
  { id: 'transport', name: 'Transport Fee', icon: '🚌', enabled: true, color: 'bg-orange-50 text-orange-600 border-orange-100' },
  { id: 'hostel', name: 'Hostel Fee', icon: '🏠', enabled: true, color: 'bg-teal-50 text-teal-600 border-teal-100' },
  { id: 'lab', name: 'Lab Fee', icon: '🔬', enabled: true, color: 'bg-green-50 text-green-600 border-green-100' },
  { id: 'sports', name: 'Sports Fee', icon: '⚽', enabled: true, color: 'bg-amber-50 text-amber-600 border-amber-100' },
  { id: 'library', name: 'Library Fee', icon: '📖', enabled: true, color: 'bg-rose-50 text-rose-600 border-rose-100' },
  { id: 'exam', name: 'Exam Fee', icon: '📝', enabled: false, color: 'bg-slate-50 text-slate-600 border-slate-100' },
];

export const CLASS_ROWS: ClassRow[] = [
  { id: 'c1', label: 'Class 1' },
  { id: 'c2', label: 'Class 2' },
  { id: 'c3', label: 'Class 3' },
  { id: 'c4', label: 'Class 4' },
  { id: 'c5', label: 'Class 5' },
  { id: 'c6', label: 'Class 6' },
  { id: 'c7', label: 'Class 7' },
  { id: 'c8', label: 'Class 8' },
  { id: 'c9', label: 'Class 9' },
  { id: 'c10', label: 'Class 10' },
  { id: 'c11s', label: 'Class 11', stream: 'Science' },
  { id: 'c11c', label: 'Class 11', stream: 'Commerce' },
  { id: 'c11a', label: 'Class 11', stream: 'Arts' },
  { id: 'c12s', label: 'Class 12', stream: 'Science' },
  { id: 'c12c', label: 'Class 12', stream: 'Commerce' },
  { id: 'c12a', label: 'Class 12', stream: 'Arts' },
];

export const DEFAULT_MATRIX: FeeMatrix = {
  c1:  { tuition: 2500, transport: 1200, hostel: 0,     lab: 0,    sports: 500, library: 200, exam: 300 },
  c2:  { tuition: 2500, transport: 1200, hostel: 0,     lab: 0,    sports: 500, library: 200, exam: 300 },
  c3:  { tuition: 2800, transport: 1200, hostel: 0,     lab: 0,    sports: 500, library: 200, exam: 300 },
  c4:  { tuition: 2800, transport: 1200, hostel: 0,     lab: 0,    sports: 500, library: 200, exam: 300 },
  c5:  { tuition: 3000, transport: 1500, hostel: 0,     lab: 500,  sports: 500, library: 200, exam: 400 },
  c6:  { tuition: 3200, transport: 1500, hostel: 8000,  lab: 800,  sports: 600, library: 250, exam: 400 },
  c7:  { tuition: 3200, transport: 1500, hostel: 8000,  lab: 800,  sports: 600, library: 250, exam: 400 },
  c8:  { tuition: 3500, transport: 1500, hostel: 9000,  lab: 1200, sports: 700, library: 250, exam: 500 },
  c9:  { tuition: 4000, transport: 1800, hostel: 9000,  lab: 1500, sports: 700, library: 300, exam: 500 },
  c10: { tuition: 4500, transport: 1800, hostel: 9000,  lab: 1800, sports: 800, library: 300, exam: 800 },
  c11s:{ tuition: 5500, transport: 1800, hostel: 10000, lab: 2500, sports: 800, library: 350, exam: 800 },
  c11c:{ tuition: 5000, transport: 1800, hostel: 10000, lab: 800,  sports: 800, library: 350, exam: 800 },
  c11a:{ tuition: 4500, transport: 1800, hostel: 10000, lab: 0,    sports: 800, library: 350, exam: 800 },
  c12s:{ tuition: 5500, transport: 1800, hostel: 10000, lab: 2500, sports: 800, library: 350, exam: 1000 },
  c12c:{ tuition: 5000, transport: 1800, hostel: 10000, lab: 800,  sports: 800, library: 350, exam: 1000 },
  c12a:{ tuition: 4500, transport: 1800, hostel: 10000, lab: 0,    sports: 800, library: 350, exam: 1000 },
};

export const TERM_OPTIONS = ['Monthly', 'Quarterly', 'Half-Yearly', 'Annually'];

export interface DueConfig {
  term: string;
  dueDay: number;
  lateFeePercent: number;
  maxLateFee: number;
  graceDays: number;
}

export const DEFAULT_DUE_CONFIG: DueConfig = {
  term: 'Monthly',
  dueDay: 10,
  lateFeePercent: 2,
  maxLateFee: 500,
  graceDays: 5,
};
