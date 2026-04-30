export interface Transaction {
  id: string;
  studentName: string;
  rollNo: string;
  className: string;
  feeType: string;
  amount: number;
  mode: 'UPI' | 'Cash' | 'Cheque' | 'Online';
  time: string;
  receiptNo: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface PendingStudent {
  id: string;
  studentName: string;
  className: string;
  rollNo: string;
  feeDue: number;
  overdueSince: string;
  overdueDays: number;
  parentPhone: string;
  feeType: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface FeeStructureItem {
  id: string;
  category: string;
  amountPerTerm: number;
  collected: number;
  total: number;
  icon: string;
  color: string;
}

export interface MonthlyCollection {
  month: string;
  collected: number;
  pending: number;
  target: number;
}

export const MONTHLY_COLLECTION: MonthlyCollection[] = [
  { month: 'Nov', collected: 920000, pending: 180000, target: 1100000 },
  { month: 'Dec', collected: 850000, pending: 220000, target: 1100000 },
  { month: 'Jan', collected: 1020000, pending: 150000, target: 1100000 },
  { month: 'Feb', collected: 980000, pending: 160000, target: 1100000 },
  { month: 'Mar', collected: 760000, pending: 310000, target: 1100000 },
  { month: 'Apr', collected: 842500, pending: 217800, target: 1100000 },
];

export const TODAYS_TRANSACTIONS: Transaction[] = [
  { id: '1', studentName: 'Arjun Kapoor', rollNo: 'VIII-A-05', className: 'Class 8-A', feeType: 'Tuition Fee', amount: 8500, mode: 'UPI', time: '9:12 AM', receiptNo: 'RCP-2026-0847', avatarInitials: 'AK', avatarColor: 'bg-blue-100 text-blue-600' },
  { id: '2', studentName: 'Meera Joshi', rollNo: 'IX-C-12', className: 'Class 9-C', feeType: 'Tuition + Transport', amount: 11200, mode: 'Cash', time: '9:34 AM', receiptNo: 'RCP-2026-0848', avatarInitials: 'MJ', avatarColor: 'bg-green-100 text-green-600' },
  { id: '3', studentName: 'Dev Sharma', rollNo: 'VI-B-03', className: 'Class 6-B', feeType: 'Tuition Fee', amount: 6000, mode: 'Online', time: '10:05 AM', receiptNo: 'RCP-2026-0849', avatarInitials: 'DS', avatarColor: 'bg-orange-100 text-orange-600' },
  { id: '4', studentName: 'Lakshmi Rao', rollNo: 'VIII-A-18', className: 'Class 8-A', feeType: 'Lab Fee', amount: 2800, mode: 'Cheque', time: '10:22 AM', receiptNo: 'RCP-2026-0850', avatarInitials: 'LR', avatarColor: 'bg-teal-100 text-teal-600' },
  { id: '5', studentName: 'Rahul Verma', rollNo: 'VII-D-07', className: 'Class 7-D', feeType: 'Tuition Fee', amount: 6500, mode: 'UPI', time: '10:48 AM', receiptNo: 'RCP-2026-0851', avatarInitials: 'RV', avatarColor: 'bg-red-100 text-red-600' },
  { id: '6', studentName: 'Pooja Singh', rollNo: 'X-B-22', className: 'Class 10-B', feeType: 'Tuition + Sports', amount: 9300, mode: 'UPI', time: '11:15 AM', receiptNo: 'RCP-2026-0852', avatarInitials: 'PS', avatarColor: 'bg-amber-100 text-amber-600' },
  { id: '7', studentName: 'Karan Mehta', rollNo: 'IX-A-09', className: 'Class 9-A', feeType: 'Hostel Fee', amount: 15000, mode: 'Online', time: '11:40 AM', receiptNo: 'RCP-2026-0853', avatarInitials: 'KM', avatarColor: 'bg-blue-100 text-blue-600' },
  { id: '8', studentName: 'Ananya Reddy', rollNo: 'VII-A-14', className: 'Class 7-A', feeType: 'Tuition Fee', amount: 6500, mode: 'Cash', time: '12:02 PM', receiptNo: 'RCP-2026-0854', avatarInitials: 'AR', avatarColor: 'bg-green-100 text-green-600' },
];

export const PENDING_STUDENTS: PendingStudent[] = [
  { id: '1', studentName: 'Rohan Das', rollNo: 'VIII-B-11', className: 'Class 8-B', feeDue: 8500, overdueSince: 'Mar 1', overdueDays: 42, parentPhone: '9876543210', feeType: 'Tuition Fee', avatarInitials: 'RD', avatarColor: 'bg-red-100 text-red-600' },
  { id: '2', studentName: 'Sneha Iyer', rollNo: 'X-A-06', className: 'Class 10-A', feeDue: 12500, overdueSince: 'Mar 8', overdueDays: 35, parentPhone: '9871234560', feeType: 'Tuition + Lab', avatarInitials: 'SI', avatarColor: 'bg-orange-100 text-orange-600' },
  { id: '3', studentName: 'Amit Nair', rollNo: 'VI-C-19', className: 'Class 6-C', feeDue: 6000, overdueSince: 'Mar 15', overdueDays: 28, parentPhone: '9865432100', feeType: 'Tuition Fee', avatarInitials: 'AN', avatarColor: 'bg-amber-100 text-amber-600' },
  { id: '4', studentName: 'Priya Gupta', rollNo: 'IX-B-04', className: 'Class 9-B', feeDue: 9800, overdueSince: 'Mar 20', overdueDays: 23, parentPhone: '9854321098', feeType: 'Tuition + Transport', avatarInitials: 'PG', avatarColor: 'bg-blue-100 text-blue-600' },
  { id: '5', studentName: 'Vikram Singh', rollNo: 'VII-C-08', className: 'Class 7-C', feeDue: 7200, overdueSince: 'Mar 25', overdueDays: 18, parentPhone: '9843210987', feeType: 'Tuition Fee', avatarInitials: 'VS', avatarColor: 'bg-teal-100 text-teal-600' },
  { id: '6', studentName: 'Nisha Pillai', rollNo: 'VIII-A-15', className: 'Class 8-A', feeDue: 8500, overdueSince: 'Apr 1', overdueDays: 11, parentPhone: '9832109876', feeType: 'Tuition Fee', avatarInitials: 'NP', avatarColor: 'bg-green-100 text-green-600' },
  { id: '7', studentName: 'Siddharth Rao', rollNo: 'X-C-17', className: 'Class 10-C', feeDue: 10500, overdueSince: 'Apr 5', overdueDays: 7, parentPhone: '9821098765', feeType: 'Tuition + Sports', avatarInitials: 'SR', avatarColor: 'bg-red-100 text-red-600' },
];

export const FEE_STRUCTURE: FeeStructureItem[] = [
  { id: '1', category: 'Tuition Fee', amountPerTerm: 8500, collected: 680000, total: 780000, icon: '📚', color: 'text-blue-600 bg-blue-50 border-blue-100' },
  { id: '2', category: 'Transport Fee', amountPerTerm: 2700, collected: 108000, total: 135000, icon: '🚌', color: 'text-orange-600 bg-orange-50 border-orange-100' },
  { id: '3', category: 'Hostel Fee', amountPerTerm: 15000, collected: 45000, total: 60000, icon: '🏠', color: 'text-teal-600 bg-teal-50 border-teal-100' },
  { id: '4', category: 'Lab Fee', amountPerTerm: 2800, collected: 56000, total: 70000, icon: '🔬', color: 'text-green-600 bg-green-50 border-green-100' },
  { id: '5', category: 'Sports Fee', amountPerTerm: 1800, collected: 36000, total: 45000, icon: '⚽', color: 'text-amber-600 bg-amber-50 border-amber-100' },
];

export const FEE_TYPES = ['Tuition Fee', 'Transport Fee', 'Hostel Fee', 'Lab Fee', 'Sports Fee'];
export const PAYMENT_MODES = ['UPI', 'Cash', 'Cheque', 'Online'] as const;
export const CLASS_OPTIONS = ['All Classes', 'Class 6-A', 'Class 6-B', 'Class 6-C', 'Class 7-A', 'Class 7-B', 'Class 7-C', 'Class 7-D', 'Class 8-A', 'Class 8-B', 'Class 9-A', 'Class 9-B', 'Class 9-C', 'Class 10-A', 'Class 10-B', 'Class 10-C'];
