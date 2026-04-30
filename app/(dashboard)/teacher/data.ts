export interface TimetablePeriod {
  id: string;
  period: number;
  timeStart: string;
  timeEnd: string;
  subject: string;
  className: string;
  room: string;
  status: 'completed' | 'current' | 'upcoming' | 'break';
}

export interface AttendanceStudent {
  id: string;
  rollNo: number;
  name: string;
  status: 'present' | 'absent' | 'late' | null;
}

export interface AssignedClass {
  id: string;
  className: string;
  section: string;
  subject: string;
  studentCount: number;
  attendancePct: number;
  avgGrade: string;
  nextClass: string;
}

export interface HomeworkItem {
  id: string;
  className: string;
  subject: string;
  title: string;
  givenDate: string;
  dueDate: string;
  totalStudents: number;
  submitted: number;
  status: 'pending' | 'overdue' | 'reviewed';
}

export interface PendingMark {
  id: string;
  className: string;
  subject: string;
  examName: string;
  dueDate: string;
  totalStudents: number;
  marksEntered: number;
  urgency: 'high' | 'medium' | 'low';
}

export interface StudentActivity {
  id: string;
  studentName: string;
  className: string;
  rollNo: number;
  type: 'absent' | 'low_performance' | 'homework_missing';
  detail: string;
  time: string;
  avatarColor: string;
  avatarInitials: string;
}

export const TIMETABLE: TimetablePeriod[] = [
  { id: '1', period: 1, timeStart: '8:00', timeEnd: '8:45', subject: 'Mathematics', className: 'Class 7-A', room: 'Room 12', status: 'completed' },
  { id: '2', period: 2, timeStart: '8:45', timeEnd: '9:30', subject: 'Mathematics', className: 'Class 8-B', room: 'Room 5', status: 'current' },
  { id: 'b1', period: 0, timeStart: '9:30', timeEnd: '9:45', subject: 'Short Break', className: '', room: '', status: 'break' },
  { id: '3', period: 3, timeStart: '9:45', timeEnd: '10:30', subject: 'Mathematics', className: 'Class 9-A', room: 'Room 8', status: 'upcoming' },
  { id: '4', period: 4, timeStart: '10:30', timeEnd: '11:15', subject: 'Mathematics', className: 'Class 8-A', room: 'Room 3', status: 'upcoming' },
  { id: 'b2', period: 0, timeStart: '11:15', timeEnd: '12:00', subject: 'Lunch Break', className: '', room: '', status: 'break' },
  { id: '5', period: 5, timeStart: '12:00', timeEnd: '12:45', subject: 'Mathematics', className: 'Class 6-B', room: 'Room 14', status: 'upcoming' },
  { id: '6', period: 6, timeStart: '12:45', timeEnd: '1:30', subject: 'Mathematics', className: 'Class 7-C', room: 'Room 11', status: 'upcoming' },
];

export const ATTENDANCE_CLASSES = ['Class 8-A', 'Class 7-A', 'Class 8-B', 'Class 9-A', 'Class 6-B', 'Class 7-C'];

export const ATTENDANCE_STUDENTS: AttendanceStudent[] = [
  { id: '1', rollNo: 1, name: 'Aarav Sharma', status: null },
  { id: '2', rollNo: 2, name: 'Ananya Reddy', status: null },
  { id: '3', rollNo: 3, name: 'Arjun Mehta', status: null },
  { id: '4', rollNo: 4, name: 'Diya Nair', status: null },
  { id: '5', rollNo: 5, name: 'Ishaan Patel', status: null },
  { id: '6', rollNo: 6, name: 'Kavya Singh', status: null },
  { id: '7', rollNo: 7, name: 'Kiran Kumar', status: null },
  { id: '8', rollNo: 8, name: 'Lakshmi Venkat', status: null },
  { id: '9', rollNo: 9, name: 'Manish Gupta', status: null },
  { id: '10', rollNo: 10, name: 'Meera Joshi', status: null },
  { id: '11', rollNo: 11, name: 'Nisha Pillai', status: null },
  { id: '12', rollNo: 12, name: 'Om Prakash', status: null },
  { id: '13', rollNo: 13, name: 'Pooja Iyer', status: null },
  { id: '14', rollNo: 14, name: 'Rahul Das', status: null },
  { id: '15', rollNo: 15, name: 'Riya Bose', status: null },
  { id: '16', rollNo: 16, name: 'Rohan Mishra', status: null },
  { id: '17', rollNo: 17, name: 'Sahil Tiwari', status: null },
  { id: '18', rollNo: 18, name: 'Shreya Agarwal', status: null },
  { id: '19', rollNo: 19, name: 'Siddharth Rao', status: null },
  { id: '20', rollNo: 20, name: 'Sneha Verma', status: null },
];

export const ASSIGNED_CLASSES: AssignedClass[] = [
  { id: '1', className: 'Class 6', section: 'B', subject: 'Mathematics', studentCount: 38, attendancePct: 91, avgGrade: 'B+', nextClass: 'Today 12:00 PM' },
  { id: '2', className: 'Class 7', section: 'A', subject: 'Mathematics', studentCount: 40, attendancePct: 88, avgGrade: 'A', nextClass: 'Today 8:00 AM' },
  { id: '3', className: 'Class 7', section: 'C', subject: 'Mathematics', studentCount: 37, attendancePct: 85, avgGrade: 'B', nextClass: 'Today 12:45 PM' },
  { id: '4', className: 'Class 8', section: 'A', subject: 'Mathematics', studentCount: 40, attendancePct: 94, avgGrade: 'A+', nextClass: 'Today 10:30 AM' },
  { id: '5', className: 'Class 8', section: 'B', subject: 'Mathematics', studentCount: 39, attendancePct: 87, avgGrade: 'B+', nextClass: 'Today 8:45 AM' },
  { id: '6', className: 'Class 9', section: 'A', subject: 'Mathematics', studentCount: 41, attendancePct: 92, avgGrade: 'A', nextClass: 'Today 9:45 AM' },
];

export const HOMEWORK: HomeworkItem[] = [
  { id: '1', className: 'Class 8-A', subject: 'Mathematics', title: 'Chapter 5: Quadratic Equations – Exercise 5.3', givenDate: '2026-04-10', dueDate: '2026-04-12', totalStudents: 40, submitted: 34, status: 'pending' },
  { id: '2', className: 'Class 7-A', subject: 'Mathematics', title: 'Chapter 3: Integers – Practice Set', givenDate: '2026-04-09', dueDate: '2026-04-11', totalStudents: 40, submitted: 38, status: 'overdue' },
  { id: '3', className: 'Class 9-A', subject: 'Mathematics', title: 'Chapter 7: Coordinate Geometry – Assignment', givenDate: '2026-04-08', dueDate: '2026-04-13', totalStudents: 41, submitted: 29, status: 'pending' },
  { id: '4', className: 'Class 8-B', subject: 'Mathematics', title: 'Chapter 4: Linear Equations – Problems', givenDate: '2026-04-07', dueDate: '2026-04-10', totalStudents: 39, submitted: 39, status: 'reviewed' },
  { id: '5', className: 'Class 6-B', subject: 'Mathematics', title: 'Chapter 2: Fractions – Worksheet', givenDate: '2026-04-06', dueDate: '2026-04-11', totalStudents: 38, submitted: 32, status: 'overdue' },
];

export const PENDING_MARKS: PendingMark[] = [
  { id: '1', className: 'Class 8-A', subject: 'Mathematics', examName: 'Unit Test 1', dueDate: 'Tomorrow', totalStudents: 40, marksEntered: 0, urgency: 'high' },
  { id: '2', className: 'Class 9-A', subject: 'Mathematics', examName: 'Half-Yearly Exam', dueDate: 'Apr 15', totalStudents: 41, marksEntered: 15, urgency: 'medium' },
];

export const STUDENT_ACTIVITIES: StudentActivity[] = [
  { id: '1', studentName: 'Rahul Das', className: 'Class 8-A', rollNo: 14, type: 'absent', detail: 'Absent for 3 consecutive days', time: '2 hrs ago', avatarColor: 'bg-red-100 text-red-600', avatarInitials: 'RD' },
  { id: '2', studentName: 'Nisha Pillai', className: 'Class 7-A', rollNo: 11, type: 'low_performance', detail: 'Scored below 40% in last 2 tests', time: 'Yesterday', avatarColor: 'bg-amber-100 text-amber-600', avatarInitials: 'NP' },
  { id: '3', studentName: 'Ishaan Patel', className: 'Class 8-A', rollNo: 5, type: 'homework_missing', detail: 'Homework not submitted – 3 times', time: '1 day ago', avatarColor: 'bg-orange-100 text-orange-600', avatarInitials: 'IP' },
  { id: '4', studentName: 'Meera Joshi', className: 'Class 9-A', rollNo: 10, type: 'absent', detail: 'Absent today without information', time: 'Today', avatarColor: 'bg-blue-100 text-blue-600', avatarInitials: 'MJ' },
  { id: '5', studentName: 'Sahil Tiwari', className: 'Class 6-B', rollNo: 17, type: 'low_performance', detail: 'Attendance below 75% this month', time: '2 days ago', avatarColor: 'bg-teal-100 text-teal-600', avatarInitials: 'ST' },
];
