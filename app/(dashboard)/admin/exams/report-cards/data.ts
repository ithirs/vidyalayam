export interface SubjectResult {
  name: string;
  code: string;
  maxMarks: number;
  obtained: number;
  grade: string;
  hasPractical: boolean;
  practicalMax: number;
  practicalObtained: number;
}

export interface ReportCardStudent {
  id: string;
  name: string;
  rollNo: string;
  admissionNo: string;
  className: string;
  section: string;
  fatherName: string;
  motherName: string;
  dob: string;
  avatarInitials: string;
  avatarColor: string;
  subjects: SubjectResult[];
  attendance: { present: number; total: number };
  teacherRemarks: string;
  principalRemarks: string;
  rank: number;
}

function grade(pct: number): string {
  if (pct >= 90) return 'A+';
  if (pct >= 75) return 'A';
  if (pct >= 60) return 'B';
  if (pct >= 50) return 'C';
  if (pct >= 35) return 'D';
  return 'F';
}

function makeSubjects(seed: number): SubjectResult[] {
  const base = [72, 65, 80, 55, 70, 68, 75];
  return [
    { name: 'Mathematics', code: 'MATH', maxMarks: 80, obtained: Math.min(80, base[0] + seed % 15), grade: '', hasPractical: false, practicalMax: 0, practicalObtained: 0 },
    { name: 'Science', code: 'SCI', maxMarks: 70, obtained: Math.min(70, base[1] + seed % 12), grade: '', hasPractical: true, practicalMax: 30, practicalObtained: Math.min(30, 22 + seed % 8) },
    { name: 'English', code: 'ENG', maxMarks: 80, obtained: Math.min(80, base[2] + seed % 10), grade: '', hasPractical: false, practicalMax: 0, practicalObtained: 0 },
    { name: 'Hindi', code: 'HIN', maxMarks: 80, obtained: Math.min(80, base[3] + seed % 18), grade: '', hasPractical: false, practicalMax: 0, practicalObtained: 0 },
    { name: 'Telugu', code: 'TEL', maxMarks: 80, obtained: Math.min(80, base[4] + seed % 14), grade: '', hasPractical: false, practicalMax: 0, practicalObtained: 0 },
    { name: 'Social Studies', code: 'SST', maxMarks: 80, obtained: Math.min(80, base[5] + seed % 16), grade: '', hasPractical: false, practicalMax: 0, practicalObtained: 0 },
    { name: 'Computer Science', code: 'CS', maxMarks: 70, obtained: Math.min(70, base[6] + seed % 10), grade: '', hasPractical: true, practicalMax: 30, practicalObtained: Math.min(30, 24 + seed % 6) },
  ].map((s) => {
    const total = s.obtained + s.practicalObtained;
    const max = s.maxMarks + s.practicalMax;
    return { ...s, grade: grade((total / max) * 100) };
  });
}

const NAMES_8A = [
  ['Arjun Kapoor', 'AK', 'bg-blue-100 text-blue-600', 'Rakesh Kapoor', 'Sunita Kapoor'],
  ['Meera Joshi', 'MJ', 'bg-green-100 text-green-600', 'Ramesh Joshi', 'Geeta Joshi'],
  ['Dev Sharma', 'DS', 'bg-orange-100 text-orange-600', 'Suresh Sharma', 'Lata Sharma'],
  ['Lakshmi Rao', 'LR', 'bg-teal-100 text-teal-600', 'Krishna Rao', 'Usha Rao'],
  ['Rahul Verma', 'RV', 'bg-red-100 text-red-600', 'Anil Verma', 'Savita Verma'],
  ['Pooja Singh', 'PS', 'bg-amber-100 text-amber-600', 'Deepak Singh', 'Rekha Singh'],
  ['Kiran Mehta', 'KM', 'bg-cyan-100 text-cyan-600', 'Sanjay Mehta', 'Nisha Mehta'],
  ['Ananya Reddy', 'AR', 'bg-lime-100 text-lime-600', 'Prakash Reddy', 'Divya Reddy'],
  ['Vikram Nair', 'VN', 'bg-rose-100 text-rose-600', 'Mohan Nair', 'Gita Nair'],
  ['Sneha Pillai', 'SP', 'bg-blue-100 text-blue-700', 'Vijay Pillai', 'Radha Pillai'],
];

export const REPORT_STUDENTS: ReportCardStudent[] = NAMES_8A.map(([name, init, color, father, mother], i) => {
  const subjs = makeSubjects(i * 7 + 3);
  const total = subjs.reduce((s, sub) => s + sub.obtained + sub.practicalObtained, 0);
  const maxTotal = subjs.reduce((s, sub) => s + sub.maxMarks + sub.practicalMax, 0);
  const pct = (total / maxTotal) * 100;
  const REMARKS = [
    'Shows excellent academic performance. Keep it up!',
    'Good effort this term. Can improve in Mathematics.',
    'Consistent performer with great attitude.',
    'Needs to focus more on revision and practice.',
    'Creative and hardworking. Excellent team player.',
  ];
  return {
    id: `rc${i + 1}`,
    name: name as string,
    rollNo: String(i + 1).padStart(2, '0'),
    admissionNo: `ADM-2021-${String(130 + i).padStart(4, '0')}`,
    className: 'Class 8',
    section: 'A',
    fatherName: father as string,
    motherName: mother as string,
    dob: `201${3 - (i % 3)}-0${(i % 9) + 1}-${String(10 + i).padStart(2, '0')}`,
    avatarInitials: init as string,
    avatarColor: color as string,
    subjects: subjs,
    attendance: { present: 185 + (i % 10), total: 200 },
    teacherRemarks: REMARKS[i % REMARKS.length],
    principalRemarks: pct >= 75 ? 'Outstanding student. Promoted with distinction.' : pct >= 35 ? 'Promoted to next class.' : 'Requires improvement. Promoted conditionally.',
    rank: i + 1,
  };
});

export const GRADE_SCALE = [
  { grade: 'A+', range: '90–100', desc: 'Outstanding',   color: 'bg-emerald-100 text-emerald-700' },
  { grade: 'A',  range: '75–89',  desc: 'Excellent',     color: 'bg-blue-100 text-blue-700'       },
  { grade: 'B',  range: '60–74',  desc: 'Very Good',     color: 'bg-sky-100 text-sky-700'         },
  { grade: 'C',  range: '50–59',  desc: 'Good',          color: 'bg-orange-100 text-orange-700'   },
  { grade: 'D',  range: '35–49',  desc: 'Average',       color: 'bg-amber-100 text-amber-700'     },
  { grade: 'F',  range: '0–34',   desc: 'Fail',          color: 'bg-red-100 text-red-700'         },
];
