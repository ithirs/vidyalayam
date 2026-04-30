export interface ClassAttendanceRow {
  id: string;
  className: string;
  section: string;
  total: number;
  present: number;
  absent: number;
  late: number;
  teacher: string;
  status: 'marked' | 'pending' | 'not_started';
}

export interface CalendarDay {
  date: number;
  pct: number | null;
  isToday?: boolean;
  isWeekend?: boolean;
  isHoliday?: boolean;
  holidayLabel?: string;
}

export const CLASS_ATTENDANCE: ClassAttendanceRow[] = [
  { id: '1', className: 'Class 6', section: 'A', total: 38, present: 36, absent: 1, late: 1, teacher: 'Ms. Priya Nair', status: 'marked' },
  { id: '2', className: 'Class 6', section: 'B', total: 38, present: 35, absent: 2, late: 1, teacher: 'Mr. Suresh Kumar', status: 'marked' },
  { id: '3', className: 'Class 7', section: 'A', total: 40, present: 38, absent: 2, late: 0, teacher: 'Ms. Kavitha Rao', status: 'marked' },
  { id: '4', className: 'Class 7', section: 'B', total: 40, present: 37, absent: 2, late: 1, teacher: 'Mr. Ramesh Iyer', status: 'marked' },
  { id: '5', className: 'Class 7', section: 'C', total: 37, present: 35, absent: 2, late: 0, teacher: 'Ms. Deepa Pillai', status: 'marked' },
  { id: '6', className: 'Class 8', section: 'A', total: 40, present: 38, absent: 1, late: 1, teacher: 'Mr. Anil Sharma', status: 'marked' },
  { id: '7', className: 'Class 8', section: 'B', total: 39, present: 36, absent: 3, late: 0, teacher: 'Ms. Rekha Verma', status: 'pending' },
  { id: '8', className: 'Class 8', section: 'C', total: 39, present: 0, absent: 0, late: 0, teacher: 'Mr. Vijay Menon', status: 'not_started' },
  { id: '9', className: 'Class 9', section: 'A', total: 41, present: 39, absent: 1, late: 1, teacher: 'Ms. Sunita Joshi', status: 'marked' },
  { id: '10', className: 'Class 9', section: 'B', total: 41, present: 0, absent: 0, late: 0, teacher: 'Mr. Kiran Das', status: 'not_started' },
  { id: '11', className: 'Class 10', section: 'A', total: 42, present: 40, absent: 2, late: 0, teacher: 'Ms. Anjali Gupta', status: 'marked' },
  { id: '12', className: 'Class 10', section: 'B', total: 42, present: 41, absent: 1, late: 0, teacher: 'Mr. Prakash Reddy', status: 'marked' },
];

export const CALENDAR_DATA: CalendarDay[] = [
  { date: 1, pct: 94.1 },
  { date: 2, pct: 95.2 },
  { date: 3, pct: null, isWeekend: true },
  { date: 4, pct: null, isWeekend: true },
  { date: 5, pct: 93.8 },
  { date: 6, pct: 96.1 },
  { date: 7, pct: null, isHoliday: true, holidayLabel: 'Ram Navami' },
  { date: 8, pct: 94.7 },
  { date: 9, pct: 92.3 },
  { date: 10, pct: null, isWeekend: true },
  { date: 11, pct: null, isWeekend: true },
  { date: 12, pct: 94.6, isToday: true },
  { date: 13, pct: null },
  { date: 14, pct: null },
  { date: 15, pct: null },
  { date: 16, pct: null },
  { date: 17, pct: null, isWeekend: true },
  { date: 18, pct: null, isWeekend: true },
  { date: 19, pct: null },
  { date: 20, pct: null },
  { date: 21, pct: null },
  { date: 22, pct: null },
  { date: 23, pct: null },
  { date: 24, pct: null, isWeekend: true },
  { date: 25, pct: null, isWeekend: true },
  { date: 26, pct: null },
  { date: 27, pct: null },
  { date: 28, pct: null },
  { date: 29, pct: null },
  { date: 30, pct: null },
];

export const MONTH_TREND = [
  { month: 'Nov', pct: 91.2 },
  { month: 'Dec', pct: 88.5 },
  { month: 'Jan', pct: 93.4 },
  { month: 'Feb', pct: 95.1 },
  { month: 'Mar', pct: 94.8 },
  { month: 'Apr', pct: 94.6 },
];

export const CLASS_COMPARISON = [
  { cls: 'Cls 6', pct: 94.5 },
  { cls: 'Cls 7', pct: 93.1 },
  { cls: 'Cls 8', pct: 91.8 },
  { cls: 'Cls 9', pct: 95.2 },
  { cls: 'Cls 10', pct: 96.4 },
];

export interface StudentReportRow {
  id: string;
  name: string;
  rollNo: number;
  className: string;
  section: string;
  workingDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  pct: number;
}

export const STUDENT_REPORT: StudentReportRow[] = [
  { id: '1', name: 'Aarav Sharma', rollNo: 1, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 56, absentDays: 1, lateDays: 1, pct: 96.6 },
  { id: '2', name: 'Ananya Reddy', rollNo: 2, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 55, absentDays: 3, lateDays: 0, pct: 94.8 },
  { id: '3', name: 'Arjun Mehta', rollNo: 3, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 47, absentDays: 10, lateDays: 1, pct: 81.0 },
  { id: '4', name: 'Diya Nair', rollNo: 4, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 40, absentDays: 17, lateDays: 1, pct: 69.0 },
  { id: '5', name: 'Ishaan Patel', rollNo: 5, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 53, absentDays: 4, lateDays: 1, pct: 91.4 },
  { id: '6', name: 'Kavya Singh', rollNo: 6, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 57, absentDays: 1, lateDays: 0, pct: 98.3 },
  { id: '7', name: 'Kiran Kumar', rollNo: 7, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 42, absentDays: 15, lateDays: 1, pct: 72.4 },
  { id: '8', name: 'Lakshmi Venkat', rollNo: 8, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 56, absentDays: 2, lateDays: 0, pct: 96.6 },
  { id: '9', name: 'Manish Gupta', rollNo: 9, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 49, absentDays: 8, lateDays: 1, pct: 84.5 },
  { id: '10', name: 'Meera Joshi', rollNo: 10, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 36, absentDays: 21, lateDays: 1, pct: 62.1 },
  { id: '11', name: 'Nisha Pillai', rollNo: 11, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 54, absentDays: 3, lateDays: 1, pct: 93.1 },
  { id: '12', name: 'Om Prakash', rollNo: 12, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 58, absentDays: 0, lateDays: 0, pct: 100 },
  { id: '13', name: 'Pooja Iyer', rollNo: 13, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 52, absentDays: 5, lateDays: 1, pct: 89.7 },
  { id: '14', name: 'Rahul Das', rollNo: 14, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 44, absentDays: 13, lateDays: 1, pct: 75.9 },
  { id: '15', name: 'Riya Bose', rollNo: 15, className: 'Class 8', section: 'A', workingDays: 58, presentDays: 55, absentDays: 3, lateDays: 0, pct: 94.8 },
];
