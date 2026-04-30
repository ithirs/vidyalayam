export type FeeStatus = 'paid' | 'partial' | 'pending';
export type StudentStatus = 'active' | 'inactive' | 'transferred';
export type Gender = 'Male' | 'Female' | 'Other';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type Category = 'General' | 'OBC' | 'SC' | 'ST';

export interface Student {
  id: string;
  rollNo: string;
  admissionNo: string;
  name: string;
  photo?: string;
  class: string;
  section: string;
  gender: Gender;
  dob: string;
  bloodGroup: BloodGroup;
  aadhar: string;
  religion: string;
  category: Category;
  motherTongue: string;
  nationality: string;
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  parentEmail: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  admissionDate: string;
  academicYear: string;
  feeStatus: FeeStatus;
  status: StudentStatus;
  attendancePercent: number;
  height: string;
  weight: string;
  board: string;
  previousSchool: string;
  medicalConditions: string;
  emergencyContact: string;
}

export const CLASSES = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];
export const SECTIONS = ['A', 'B', 'C', 'D'];
export const BLOOD_GROUPS: BloodGroup[] = ['A+','A-','B+','B-','AB+','AB-','O+','O-'];
export const CATEGORIES: Category[] = ['General','OBC','SC','ST'];
export const BOARDS = ['CBSE','ICSE','State Board','IB','IGCSE'];
export const ACADEMIC_YEARS = ['2025-26','2024-25','2023-24'];
export const INCOME_RANGES = ['Below 1 Lakh','1-3 Lakhs','3-5 Lakhs','5-10 Lakhs','Above 10 Lakhs'];

export const FEE_STATUS_CONFIG: Record<FeeStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
  paid: { label: 'Paid', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  partial: { label: 'Partial', bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  pending: { label: 'Pending', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
};

export const STATUS_CONFIG: Record<StudentStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
  active: { label: 'Active', bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  inactive: { label: 'Inactive', bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200', dot: 'bg-slate-400' },
  transferred: { label: 'Transferred', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
};

const FIRST_NAMES = ['Aarav','Priya','Rohan','Ananya','Vikram','Sneha','Arjun','Meera','Kabir','Riya','Dev','Pooja','Ishaan','Divya','Rahul','Neha','Aditya','Kavya','Siddharth','Shreya'];
const LAST_NAMES = ['Sharma','Patel','Mehta','Reddy','Singh','Gupta','Kumar','Nair','Joshi','Verma','Iyer','Rao','Pillai','Mishra','Tiwari','Chauhan','Shah','Bose','Das','Malhotra'];
const FATHER_FIRST = ['Rajesh','Suresh','Mahesh','Ramesh','Dinesh','Prakash','Rakesh','Naresh','Lokesh','Ganesh'];

function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}
function rand<T>(arr: T[], seed: number) { return arr[Math.floor(seededRand(seed) * arr.length)]; }
function randInt(min: number, max: number, seed: number) { return min + Math.floor(seededRand(seed) * (max - min + 1)); }

export const STUDENTS: Student[] = Array.from({ length: 60 }, (_, i) => {
  const s = (offset: number) => i * 50 + offset;
  const firstName = rand(FIRST_NAMES, s(1));
  const lastName = rand(LAST_NAMES, s(2));
  const fatherFirst = rand(FATHER_FIRST, s(3));
  const cls = CLASSES[i % 12];
  const section = SECTIONS[i % 4];
  const feeStatuses: FeeStatus[] = ['paid', 'paid', 'paid', 'partial', 'pending'];
  const statuses: StudentStatus[] = ['active', 'active', 'active', 'active', 'inactive', 'transferred'];
  return {
    id: `s${i + 1}`,
    rollNo: `R${String(i + 1).padStart(3, '0')}`,
    admissionNo: `ADM${2024}${String(i + 1).padStart(4, '0')}`,
    name: `${firstName} ${lastName}`,
    class: cls,
    section,
    gender: rand(['Male', 'Female', 'Male', 'Female'] as Gender[], s(4)),
    dob: `${randInt(1, 28, s(5))}/${randInt(1, 12, s(6))}/${2010 + (i % 8)}`,
    bloodGroup: rand(BLOOD_GROUPS, s(7)),
    aadhar: `${randInt(1000,9999,s(8))} ${randInt(1000,9999,s(9))} ${randInt(1000,9999,s(10))}`,
    religion: rand(['Hindu','Muslim','Christian','Sikh','Jain'], s(11)),
    category: rand(CATEGORIES, s(12)),
    motherTongue: rand(['Hindi','Tamil','Telugu','Marathi','Gujarati','Bengali','Malayalam'], s(13)),
    nationality: 'Indian',
    fatherName: `${fatherFirst} ${lastName}`,
    fatherPhone: `9${randInt(100000000, 999999999, s(14))}`,
    fatherOccupation: rand(['Business','Service','Farmer','Doctor','Teacher','Engineer','Lawyer'], s(15)),
    motherName: `${rand(['Sunita','Kavita','Anita','Savita','Rekha','Geeta','Seema'], s(16))} ${lastName}`,
    motherPhone: `8${randInt(100000000, 999999999, s(17))}`,
    parentEmail: `${firstName.toLowerCase()}.parent@gmail.com`,
    phone: `9${randInt(100000000, 999999999, s(18))}`,
    address: `${randInt(1,999,s(19))} ${rand(['Gandhi Nagar','Nehru Colony','Rajaji Road','Ambedkar Street','Tagore Lane'], s(20))}`,
    city: rand(['Delhi','Mumbai','Chennai','Hyderabad','Pune','Bengaluru','Jaipur','Lucknow'], s(21)),
    state: rand(['Delhi','Maharashtra','Tamil Nadu','Telangana','Rajasthan','UP','Karnataka'], s(22)),
    pincode: `${randInt(100000,999999,s(23))}`,
    admissionDate: `${randInt(1,28,s(24))} Apr ${2020 + (i % 5)}`,
    academicYear: '2024-25',
    feeStatus: rand(feeStatuses, s(25)),
    status: rand(statuses, s(26)),
    attendancePercent: randInt(62, 99, s(27)),
    height: `${randInt(120, 180, s(28))} cm`,
    weight: `${randInt(25, 75, s(29))} kg`,
    board: 'CBSE',
    previousSchool: `${rand(['St. Mary','Delhi Public','Kendriya Vidyalaya','Modern','Spring Dale'], s(30))} School`,
    medicalConditions: rand(['None','Asthma','Diabetes','Myopia','None','None','None'], s(31)),
    emergencyContact: `9${randInt(100000000, 999999999, s(32))}`,
  };
});

export const EXAM_RESULTS = [
  { subject: 'Mathematics', marks: 87, total: 100, grade: 'A' },
  { subject: 'Science', marks: 92, total: 100, grade: 'A+' },
  { subject: 'English', marks: 78, total: 100, grade: 'B+' },
  { subject: 'Hindi', marks: 83, total: 100, grade: 'A' },
  { subject: 'Social Studies', marks: 76, total: 100, grade: 'B+' },
  { subject: 'Computer', marks: 95, total: 100, grade: 'A+' },
];

export const FEE_HISTORY = [
  { id: 'f1', term: 'Term 1 — April 2024', amount: 12500, paid: 12500, date: '3 Apr 2024', mode: 'UPI', status: 'paid' as FeeStatus },
  { id: 'f2', term: 'Term 2 — July 2024', amount: 12500, paid: 12500, date: '2 Jul 2024', mode: 'Cheque', status: 'paid' as FeeStatus },
  { id: 'f3', term: 'Term 3 — October 2024', amount: 12500, paid: 6000, date: '5 Oct 2024', mode: 'Cash', status: 'partial' as FeeStatus },
  { id: 'f4', term: 'Term 4 — January 2025', amount: 12500, paid: 0, date: '—', mode: '—', status: 'pending' as FeeStatus },
];

export const ATTENDANCE_MONTHS = [
  { month: 'Apr', present: 22, absent: 2, total: 24 },
  { month: 'May', present: 18, absent: 3, total: 21 },
  { month: 'Jun', present: 20, absent: 1, total: 21 },
  { month: 'Jul', present: 23, absent: 0, total: 23 },
  { month: 'Aug', present: 19, absent: 4, total: 23 },
  { month: 'Sep', present: 21, absent: 2, total: 23 },
  { month: 'Oct', present: 22, absent: 1, total: 23 },
  { month: 'Nov', present: 17, absent: 5, total: 22 },
];

export const DOCUMENTS = [
  { id: 'd1', name: 'Birth Certificate', required: true, uploaded: true },
  { id: 'd2', name: 'Aadhar Card', required: true, uploaded: true },
  { id: 'd3', name: 'Previous TC', required: false, uploaded: false },
  { id: 'd4', name: 'Passport Photos', required: true, uploaded: true },
  { id: 'd5', name: 'Address Proof', required: true, uploaded: false },
  { id: 'd6', name: 'Caste Certificate', required: false, uploaded: true },
];
