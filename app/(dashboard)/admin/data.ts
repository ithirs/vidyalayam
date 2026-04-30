export interface RecentAdmission {
  id: string;
  name: string;
  className: string;
  section: string;
  date: string;
  avatarInitials: string;
  avatarColor: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  type: 'class' | 'exam' | 'holiday' | 'ptm' | 'event';
}

export interface FeePayment {
  id: string;
  studentName: string;
  className: string;
  amount: number;
  method: 'Cash' | 'UPI' | 'Card' | 'Bank Transfer';
  time: string;
  receiptNo: string;
}

export interface NotificationItem {
  id: string;
  category: 'fees' | 'attendance' | 'events';
  severity: 'high' | 'medium' | 'low';
  message: string;
  time: string;
}

export const ATTENDANCE_DATA = [
  { day: 'Mon', present: 1160, absent: 62, late: 25 },
  { day: 'Tue', present: 1195, absent: 38, late: 14 },
  { day: 'Wed', present: 1142, absent: 78, late: 27 },
  { day: 'Thu', present: 1178, absent: 54, late: 15 },
  { day: 'Fri', present: 1180, absent: 48, late: 19 },
];

export const FEE_DATA = [
  { name: 'Collected', value: 842000, color: '#22C55E' },
  { name: 'Pending', value: 123500, color: '#F97316' },
  { name: 'Overdue', value: 54500, color: '#EF4444' },
];

export const RECENT_ADMISSIONS: RecentAdmission[] = [
  { id: '1', name: 'Ananya Sharma', className: 'Class IX', section: 'A', date: '2026-04-10', avatarInitials: 'AS', avatarColor: 'bg-blue-100 text-blue-600' },
  { id: '2', name: 'Rohan Mehta', className: 'Class VI', section: 'B', date: '2026-04-09', avatarInitials: 'RM', avatarColor: 'bg-green-100 text-green-600' },
  { id: '3', name: 'Priya Nair', className: 'Class VII', section: 'A', date: '2026-04-08', avatarInitials: 'PN', avatarColor: 'bg-orange-100 text-orange-600' },
  { id: '4', name: 'Karthik Reddy', className: 'Class X', section: 'C', date: '2026-04-07', avatarInitials: 'KR', avatarColor: 'bg-red-100 text-red-600' },
  { id: '5', name: 'Sneha Patel', className: 'Class VIII', section: 'B', date: '2026-04-05', avatarInitials: 'SP', avatarColor: 'bg-teal-100 text-teal-600' },
];

export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  { id: '1', time: '8:00 AM', title: 'Morning Assembly', subtitle: 'All classes — Ground Floor', type: 'event' },
  { id: '2', time: '9:15 AM', title: 'Class X - Math', subtitle: 'Mr. Venkatesh • Room 204', type: 'class' },
  { id: '3', time: '11:00 AM', title: 'Class VIII Unit Test', subtitle: 'Science — Exam Hall B', type: 'exam' },
  { id: '4', time: '1:00 PM', title: 'Staff Meeting', subtitle: 'Principal\'s Office', type: 'event' },
  { id: '5', time: '3:30 PM', title: 'Parent-Teacher Meeting', subtitle: 'Class VII Parents', type: 'ptm' },
  { id: '6', time: '16 Apr', title: 'Dr. Ambedkar Jayanti', subtitle: 'Public Holiday', type: 'holiday' },
  { id: '7', time: '18 Apr', title: 'Half-Yearly Exams Begin', subtitle: 'Classes VI–X', type: 'exam' },
];

export const FEE_PAYMENTS: FeePayment[] = [
  { id: '1', studentName: 'Arjun Kapoor', className: 'Class X-A', amount: 8500, method: 'UPI', time: '9:34 AM', receiptNo: 'RCP-2026-0847' },
  { id: '2', studentName: 'Meera Joshi', className: 'Class IX-C', amount: 7200, method: 'Cash', time: '9:52 AM', receiptNo: 'RCP-2026-0848' },
  { id: '3', studentName: 'Dev Sharma', className: 'Class VI-B', amount: 6000, method: 'Card', time: '10:15 AM', receiptNo: 'RCP-2026-0849' },
  { id: '4', studentName: 'Lakshmi Rao', className: 'Class VIII-A', amount: 7800, method: 'UPI', time: '10:48 AM', receiptNo: 'RCP-2026-0850' },
  { id: '5', studentName: 'Rahul Verma', className: 'Class VII-D', amount: 6500, method: 'Bank Transfer', time: '11:22 AM', receiptNo: 'RCP-2026-0851' },
  { id: '6', studentName: 'Pooja Singh', className: 'Class X-B', amount: 8500, method: 'UPI', time: '11:45 AM', receiptNo: 'RCP-2026-0852' },
];

export const NOTIFICATIONS: NotificationItem[] = [
  { id: '1', category: 'fees', severity: 'high', message: '12 students have overdue fees for more than 30 days', time: 'Today' },
  { id: '2', category: 'fees', severity: 'medium', message: '35 students fee due this week', time: 'Today' },
  { id: '3', category: 'fees', severity: 'low', message: 'Monthly fee report ready for download', time: '1 hr ago' },
  { id: '4', category: 'attendance', severity: 'high', message: '5 students absent for 3+ consecutive days', time: 'Today' },
  { id: '5', category: 'attendance', severity: 'medium', message: 'Class VII-B attendance below 80% this month', time: '2 hrs ago' },
  { id: '6', category: 'attendance', severity: 'low', message: "Yesterday's attendance report submitted", time: '3 hrs ago' },
  { id: '7', category: 'events', severity: 'medium', message: 'Parent-Teacher Meeting scheduled for Apr 15', time: '1 day ago' },
  { id: '8', category: 'events', severity: 'low', message: 'Half-yearly exam timetable published', time: '2 days ago' },
  { id: '9', category: 'events', severity: 'low', message: 'Annual Day event venue confirmed', time: '3 days ago' },
];

export const CLASS_OPTIONS = ['All Classes', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X'];
