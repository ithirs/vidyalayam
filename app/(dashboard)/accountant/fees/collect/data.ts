export interface StudentSearchResult {
  id: string;
  name: string;
  rollNo: string;
  className: string;
  section: string;
  admissionNo: string;
  parentPhone: string;
  avatarInitials: string;
  avatarColor: string;
  pendingTotal: number;
}

export interface FeeItem {
  id: string;
  label: string;
  period: string;
  amount: number;
  overdue: boolean;
  lateFee?: number;
}

export const SEARCH_STUDENTS: StudentSearchResult[] = [
  { id: 's1', name: 'Arjun Kapoor', rollNo: 'VIII-A-05', className: 'Class 8', section: 'A', admissionNo: 'ADM-2021-0134', parentPhone: '9876543210', avatarInitials: 'AK', avatarColor: 'bg-blue-100 text-blue-600', pendingTotal: 5200 },
  { id: 's2', name: 'Meera Joshi', rollNo: 'IX-C-12', className: 'Class 9', section: 'C', admissionNo: 'ADM-2020-0078', parentPhone: '9871234560', avatarInitials: 'MJ', avatarColor: 'bg-green-100 text-green-600', pendingTotal: 11200 },
  { id: 's3', name: 'Dev Sharma', rollNo: 'VI-B-03', className: 'Class 6', section: 'B', admissionNo: 'ADM-2023-0201', parentPhone: '9865432100', avatarInitials: 'DS', avatarColor: 'bg-orange-100 text-orange-600', pendingTotal: 6000 },
  { id: 's4', name: 'Lakshmi Rao', rollNo: 'VIII-A-18', className: 'Class 8', section: 'A', admissionNo: 'ADM-2021-0156', parentPhone: '9854321098', avatarInitials: 'LR', avatarColor: 'bg-teal-100 text-teal-600', pendingTotal: 2800 },
  { id: 's5', name: 'Rahul Verma', rollNo: 'VII-D-07', className: 'Class 7', section: 'D', admissionNo: 'ADM-2022-0089', parentPhone: '9843210987', avatarInitials: 'RV', avatarColor: 'bg-red-100 text-red-600', pendingTotal: 6500 },
  { id: 's6', name: 'Pooja Singh', rollNo: 'X-B-22', className: 'Class 10', section: 'B', admissionNo: 'ADM-2019-0045', parentPhone: '9832109876', avatarInitials: 'PS', avatarColor: 'bg-amber-100 text-amber-600', pendingTotal: 9300 },
  { id: 's7', name: 'Rohan Das', rollNo: 'VIII-B-11', className: 'Class 8', section: 'B', admissionNo: 'ADM-2021-0112', parentPhone: '9821098765', avatarInitials: 'RD', avatarColor: 'bg-rose-100 text-rose-600', pendingTotal: 8500 },
  { id: 's8', name: 'Sneha Iyer', rollNo: 'X-A-06', className: 'Class 10', section: 'A', admissionNo: 'ADM-2019-0023', parentPhone: '9810987654', avatarInitials: 'SI', avatarColor: 'bg-cyan-100 text-cyan-600', pendingTotal: 12500 },
  { id: 's9', name: 'Amit Nair', rollNo: 'VI-C-19', className: 'Class 6', section: 'C', admissionNo: 'ADM-2023-0234', parentPhone: '9809876543', avatarInitials: 'AN', avatarColor: 'bg-lime-100 text-lime-600', pendingTotal: 6000 },
  { id: 's10', name: 'Priya Gupta', rollNo: 'IX-B-04', className: 'Class 9', section: 'B', admissionNo: 'ADM-2020-0056', parentPhone: '9798765432', avatarInitials: 'PG', avatarColor: 'bg-violet-100 text-violet-600', pendingTotal: 9800 },
];

export const STUDENT_FEE_ITEMS: Record<string, FeeItem[]> = {
  s1: [
    { id: 'f1', label: 'Tuition Fee', period: 'April 2024', amount: 3000, overdue: false },
    { id: 'f2', label: 'Transport Fee', period: 'April 2024', amount: 1500, overdue: false },
    { id: 'f3', label: 'Library Fee', period: 'Q2 2024', amount: 200, overdue: false },
    { id: 'f4', label: 'Sports Fee', period: 'Annual', amount: 500, overdue: false },
  ],
  s2: [
    { id: 'f1', label: 'Tuition Fee', period: 'April 2024', amount: 3500, overdue: true, lateFee: 350 },
    { id: 'f2', label: 'Lab Fee', period: 'Q2 2024', amount: 1200, overdue: false },
    { id: 'f3', label: 'Transport Fee', period: 'April 2024', amount: 1500, overdue: false },
    { id: 'f4', label: 'Sports Fee', period: 'Annual', amount: 500, overdue: false },
    { id: 'f5', label: 'Library Fee', period: 'Q2 2024', amount: 200, overdue: false },
  ],
  default: [
    { id: 'f1', label: 'Tuition Fee', period: 'April 2024', amount: 3000, overdue: false },
    { id: 'f2', label: 'Transport Fee', period: 'April 2024', amount: 1500, overdue: false },
    { id: 'f3', label: 'Library Fee', period: 'Q2 2024', amount: 200, overdue: false },
    { id: 'f4', label: 'Sports Fee', period: 'Annual', amount: 500, overdue: false },
  ],
};

export const DISCOUNT_REASONS = [
  'Sibling Discount',
  'Staff Ward',
  'Merit Scholarship',
  'Financial Aid',
  'Management Quota',
  'Other',
];

export type PaymentMode = 'cash' | 'upi' | 'card' | 'cheque' | 'online';
