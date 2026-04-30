export interface DueRecord {
  id: string;
  studentName: string;
  avatarInitials: string;
  avatarColor: string;
  className: string;
  section: string;
  feeType: string;
  amount: number;
  dueDate: string;
  daysOverdue: number;
  parentPhone: string;
  parentName: string;
}

export const DUES_DATA: DueRecord[] = [
  { id: '1', studentName: 'Rohan Das', avatarInitials: 'RD', avatarColor: 'bg-red-100 text-red-600', className: 'Class 8', section: 'B', feeType: 'Tuition Fee', amount: 8500, dueDate: '2026-03-01', daysOverdue: 42, parentPhone: '9876543210', parentName: 'Suresh Das' },
  { id: '2', studentName: 'Sneha Iyer', avatarInitials: 'SI', avatarColor: 'bg-orange-100 text-orange-600', className: 'Class 10', section: 'A', feeType: 'Tuition + Lab', amount: 12500, dueDate: '2026-03-08', daysOverdue: 35, parentPhone: '9871234560', parentName: 'Ramesh Iyer' },
  { id: '3', studentName: 'Amit Nair', avatarInitials: 'AN', avatarColor: 'bg-amber-100 text-amber-600', className: 'Class 6', section: 'C', feeType: 'Tuition Fee', amount: 6000, dueDate: '2026-03-15', daysOverdue: 28, parentPhone: '9865432100', parentName: 'Vijay Nair' },
  { id: '4', studentName: 'Priya Gupta', avatarInitials: 'PG', avatarColor: 'bg-blue-100 text-blue-600', className: 'Class 9', section: 'B', feeType: 'Tuition + Transport', amount: 9800, dueDate: '2026-03-20', daysOverdue: 23, parentPhone: '9854321098', parentName: 'Anil Gupta' },
  { id: '5', studentName: 'Vikram Singh', avatarInitials: 'VS', avatarColor: 'bg-teal-100 text-teal-600', className: 'Class 7', section: 'C', feeType: 'Tuition Fee', amount: 7200, dueDate: '2026-03-25', daysOverdue: 18, parentPhone: '9843210987', parentName: 'Ravi Singh' },
  { id: '6', studentName: 'Nisha Pillai', avatarInitials: 'NP', avatarColor: 'bg-green-100 text-green-600', className: 'Class 8', section: 'A', feeType: 'Tuition Fee', amount: 8500, dueDate: '2026-04-01', daysOverdue: 11, parentPhone: '9832109876', parentName: 'Mohan Pillai' },
  { id: '7', studentName: 'Siddharth Rao', avatarInitials: 'SR', avatarColor: 'bg-rose-100 text-rose-600', className: 'Class 10', section: 'C', feeType: 'Tuition + Sports', amount: 10500, dueDate: '2026-04-05', daysOverdue: 7, parentPhone: '9821098765', parentName: 'Prakash Rao' },
  { id: '8', studentName: 'Kavya Menon', avatarInitials: 'KM', avatarColor: 'bg-cyan-100 text-cyan-600', className: 'Class 9', section: 'A', feeType: 'Transport Fee', amount: 2700, dueDate: '2026-04-08', daysOverdue: 4, parentPhone: '9810987654', parentName: 'Anand Menon' },
  { id: '9', studentName: 'Aryan Bhatt', avatarInitials: 'AB', avatarColor: 'bg-violet-100 text-violet-600', className: 'Class 7', section: 'A', feeType: 'Tuition Fee', amount: 6500, dueDate: '2026-04-10', daysOverdue: 2, parentPhone: '9809876543', parentName: 'Deepak Bhatt' },
  { id: '10', studentName: 'Trisha Kapoor', avatarInitials: 'TK', avatarColor: 'bg-lime-100 text-lime-600', className: 'Class 6', section: 'A', feeType: 'Library Fee', amount: 800, dueDate: '2026-04-11', daysOverdue: 1, parentPhone: '9798765432', parentName: 'Kiran Kapoor' },
  { id: '11', studentName: 'Nikhil Verma', avatarInitials: 'NV', avatarColor: 'bg-indigo-100 text-indigo-600', className: 'Class 8', section: 'C', feeType: 'Sports Fee', amount: 1800, dueDate: '2026-04-14', daysOverdue: -2, parentPhone: '9787654321', parentName: 'Sunita Verma' },
  { id: '12', studentName: 'Divya Reddy', avatarInitials: 'DR', avatarColor: 'bg-pink-100 text-pink-600', className: 'Class 10', section: 'B', feeType: 'Tuition Fee', amount: 9000, dueDate: '2026-04-15', daysOverdue: -3, parentPhone: '9776543210', parentName: 'Suresh Reddy' },
];

export const CLASS_OPTIONS = ['All Classes', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
export const SECTION_OPTIONS = ['All Sections', 'A', 'B', 'C', 'D'];
export const FEE_TYPE_OPTIONS = ['All Types', 'Tuition Fee', 'Transport Fee', 'Lab Fee', 'Sports Fee', 'Library Fee'];

export const REMINDER_TEMPLATES = {
  en: `Dear {parent_name},\n\nThis is a reminder that {student_name} (Class {class}) has an outstanding fee of ₹{amount} due since {due_date}.\n\nPlease pay at the earliest to avoid late fee charges.\n\nRegards,\nSri Sai High School`,
  hi: `प्रिय {parent_name},\n\n{student_name} (कक्षा {class}) की ₹{amount} की बकाया फीस {due_date} से देय है।\n\nकृपया जल्द से जल्द भुगतान करें।\n\nधन्यवाद,\nश्री साई हाई स्कूल`,
  te: `ప్రియమైన {parent_name},\n\n{student_name} (తరగతి {class}) యొక్క ₹{amount} బకాయి ఫీజు {due_date} నుండి చెల్లించబడలేదు.\n\nదయచేసి త్వరగా చెల్లించండి.\n\nధన్యవాదాలు,\nశ్రీ సాయి హై స్కూల్`,
};
