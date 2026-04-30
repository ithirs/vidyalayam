export type ReceiptStatus = 'valid' | 'cancelled';

export interface Receipt {
  id: string;
  receiptNo: string;
  studentName: string;
  studentClass: string;
  studentSection: string;
  rollNo: string;
  admissionNo: string;
  avatarInitials: string;
  avatarColor: string;
  amount: number;
  date: string;
  mode: string;
  status: ReceiptStatus;
  cancelReason?: string;
  items: { label: string; period: string; amount: number }[];
  parentName: string;
  lateFee?: number;
  discount?: number;
  discountReason?: string;
}

export const RECEIPTS_DATA: Receipt[] = [
  {
    id: 'r1', receiptNo: 'RCP-2026-0847', studentName: 'Arjun Kapoor', studentClass: 'Class 8', studentSection: 'A', rollNo: 'VIII-A-05', admissionNo: 'ADM-2021-0134',
    avatarInitials: 'AK', avatarColor: 'bg-blue-100 text-blue-600', amount: 8500, date: '2026-04-12', mode: 'UPI', status: 'valid', parentName: 'Rakesh Kapoor',
    items: [{ label: 'Tuition Fee', period: 'April 2026', amount: 3000 }, { label: 'Transport Fee', period: 'April 2026', amount: 1500 }, { label: 'Lab Fee', period: 'Q1 2026', amount: 1200 }, { label: 'Sports Fee', period: 'Annual', amount: 800 }, { label: 'Library Fee', period: 'Annual', amount: 2000 }],
  },
  {
    id: 'r2', receiptNo: 'RCP-2026-0848', studentName: 'Meera Joshi', studentClass: 'Class 9', studentSection: 'C', rollNo: 'IX-C-12', admissionNo: 'ADM-2020-0078',
    avatarInitials: 'MJ', avatarColor: 'bg-green-100 text-green-600', amount: 11200, date: '2026-04-12', mode: 'Cash', status: 'valid', parentName: 'Ramesh Joshi',
    items: [{ label: 'Tuition Fee', period: 'April 2026', amount: 4000 }, { label: 'Transport Fee', period: 'April 2026', amount: 1800 }, { label: 'Lab Fee', period: 'Q1 2026', amount: 1500 }, { label: 'Sports Fee', period: 'Annual', amount: 800 }, { label: 'Exam Fee', period: 'Q1 2026', amount: 3100 }],
  },
  {
    id: 'r3', receiptNo: 'RCP-2026-0849', studentName: 'Dev Sharma', studentClass: 'Class 6', studentSection: 'B', rollNo: 'VI-B-03', admissionNo: 'ADM-2023-0201',
    avatarInitials: 'DS', avatarColor: 'bg-orange-100 text-orange-600', amount: 6000, date: '2026-04-12', mode: 'Online', status: 'valid', parentName: 'Suresh Sharma',
    items: [{ label: 'Tuition Fee', period: 'April 2026', amount: 3200 }, { label: 'Transport Fee', period: 'April 2026', amount: 1500 }, { label: 'Library Fee', period: 'Annual', amount: 1300 }],
  },
  {
    id: 'r4', receiptNo: 'RCP-2026-0850', studentName: 'Lakshmi Rao', studentClass: 'Class 8', studentSection: 'A', rollNo: 'VIII-A-18', admissionNo: 'ADM-2021-0156',
    avatarInitials: 'LR', avatarColor: 'bg-teal-100 text-teal-600', amount: 2800, date: '2026-04-12', mode: 'Cheque', status: 'cancelled', cancelReason: 'Duplicate entry', parentName: 'Krishna Rao',
    items: [{ label: 'Lab Fee', period: 'Q1 2026', amount: 2800 }],
  },
  {
    id: 'r5', receiptNo: 'RCP-2026-0851', studentName: 'Rahul Verma', studentClass: 'Class 7', studentSection: 'D', rollNo: 'VII-D-07', admissionNo: 'ADM-2022-0089',
    avatarInitials: 'RV', avatarColor: 'bg-red-100 text-red-600', amount: 6500, date: '2026-04-11', mode: 'UPI', status: 'valid', parentName: 'Anil Verma',
    items: [{ label: 'Tuition Fee', period: 'April 2026', amount: 3200 }, { label: 'Sports Fee', period: 'Annual', amount: 600 }, { label: 'Transport Fee', period: 'April 2026', amount: 1500 }, { label: 'Library Fee', period: 'Annual', amount: 1200 }],
  },
  {
    id: 'r6', receiptNo: 'RCP-2026-0852', studentName: 'Pooja Singh', studentClass: 'Class 10', studentSection: 'B', rollNo: 'X-B-22', admissionNo: 'ADM-2019-0045',
    avatarInitials: 'PS', avatarColor: 'bg-amber-100 text-amber-600', amount: 9300, date: '2026-04-11', mode: 'UPI', status: 'valid', parentName: 'Deepak Singh', discount: 500, discountReason: 'Sibling Discount',
    items: [{ label: 'Tuition Fee', period: 'April 2026', amount: 4500 }, { label: 'Transport Fee', period: 'April 2026', amount: 1800 }, { label: 'Sports Fee', period: 'Annual', amount: 800 }, { label: 'Library Fee', period: 'Annual', amount: 2200 }],
  },
  {
    id: 'r7', receiptNo: 'RCP-2026-0853', studentName: 'Karan Mehta', studentClass: 'Class 9', studentSection: 'A', rollNo: 'IX-A-09', admissionNo: 'ADM-2020-0056',
    avatarInitials: 'KM', avatarColor: 'bg-blue-100 text-blue-600', amount: 15000, date: '2026-04-10', mode: 'Online', status: 'valid', parentName: 'Sanjay Mehta',
    items: [{ label: 'Hostel Fee', period: 'April 2026', amount: 9000 }, { label: 'Tuition Fee', period: 'April 2026', amount: 4000 }, { label: 'Lab Fee', period: 'Q1 2026', amount: 2000 }],
  },
  {
    id: 'r8', receiptNo: 'RCP-2026-0854', studentName: 'Ananya Reddy', studentClass: 'Class 7', studentSection: 'A', rollNo: 'VII-A-14', admissionNo: 'ADM-2022-0123',
    avatarInitials: 'AR', avatarColor: 'bg-green-100 text-green-600', amount: 6500, date: '2026-04-10', mode: 'Cash', status: 'valid', parentName: 'Suresh Reddy', lateFee: 250,
    items: [{ label: 'Tuition Fee', period: 'March 2026', amount: 3200 }, { label: 'Transport Fee', period: 'March 2026', amount: 1500 }, { label: 'Sports Fee', period: 'Annual', amount: 1550 }],
  },
];

export const CANCEL_REASONS = [
  'Duplicate entry',
  'Wrong amount entered',
  'Payment not received',
  'Student withdrawal',
  'Other',
];
