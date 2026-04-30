export interface Child {
  id: string;
  name: string;
  className: string;
  section: string;
  rollNo: string;
  avatarUrl: string;
  avatarInitials: string;
  avatarBg: string;
  dob: string;
  admissionNo: string;
}

export interface AttendanceDay {
  date: number;
  status: 'present' | 'absent' | 'late' | 'holiday' | 'weekend' | 'future';
}

export interface FeeItem {
  id: string;
  label: string;
  amount: number;
  dueDate: string;
  overdue: boolean;
}

export interface PaymentRecord {
  id: string;
  month: string;
  amount: number;
  date: string;
  mode: string;
  receiptNo: string;
}

export interface SubjectMark {
  subject: string;
  max: number;
  marks: number;
  grade: string;
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  givenBy: string;
  dueDate: string;
  status: 'done' | 'pending';
  description: string;
  subjectColor: string;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  date: string;
  type: 'event' | 'circular' | 'holiday' | 'exam';
  rsvp?: boolean;
}

export interface Message {
  id: string;
  from: 'school' | 'parent';
  text: string;
  time: string;
}

export const PARENT_NAME = 'Sunita Sharma';
export const SCHOOL_NAME = 'Sri Sai High School';
export const CURRENT_TERM = 'Term 2 · 2024–25';

export const CHILDREN: Child[] = [
  {
    id: '1',
    name: 'Aditya Sharma',
    className: 'Class 7',
    section: 'A',
    rollNo: '15',
    avatarUrl: 'https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
    avatarInitials: 'AS',
    avatarBg: 'bg-blue-100 text-blue-600',
    dob: '12 Aug 2012',
    admissionNo: 'ADM-7A-15',
  },
  {
    id: '2',
    name: 'Kavya Sharma',
    className: 'Class 4',
    section: 'B',
    rollNo: '08',
    avatarUrl: 'https://images.pexels.com/photos/3771679/pexels-photo-3771679.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&dpr=1',
    avatarInitials: 'KS',
    avatarBg: 'bg-pink-100 text-pink-600',
    dob: '5 Mar 2015',
    admissionNo: 'ADM-4B-08',
  },
];

export function buildAttendanceDays(year: number, month: number): AttendanceDay[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const patterns: Record<number, AttendanceDay['status']> = {
    1: 'present', 2: 'present', 3: 'present', 4: 'present', 5: 'holiday',
    6: 'present', 7: 'present', 8: 'present', 9: 'present', 10: 'present',
    11: 'present', 12: 'absent', 13: 'present', 14: 'present', 15: 'late',
    16: 'present', 17: 'present', 18: 'present', 19: 'present', 20: 'present',
    21: 'present', 22: 'present', 23: 'absent', 24: 'present', 25: 'holiday',
    26: 'present', 27: 'present', 28: 'present', 29: 'present', 30: 'present',
    31: 'present',
  };

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const dayOfWeek = new Date(year, month, date).getDay();
    const isFuture = isCurrentMonth && date > today.getDate();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let status: AttendanceDay['status'] = patterns[date] ?? 'present';
    if (isFuture) status = 'future';
    else if (isWeekend) status = 'weekend';
    return { date, status };
  });
}

export const PENDING_FEES: FeeItem[] = [
  { id: '1', label: 'Tuition Fee', amount: 3000, dueDate: '10 Jan', overdue: false },
  { id: '2', label: 'Transport Fee', amount: 1500, dueDate: '10 Jan', overdue: false },
  { id: '3', label: 'Sports Fee', amount: 500, dueDate: '15 Jan', overdue: false },
];

export const PAYMENT_HISTORY: PaymentRecord[] = [
  { id: '1', month: 'December 2024', amount: 8500, date: '5 Dec 2024', mode: 'UPI', receiptNo: 'RCP-2024-0741' },
  { id: '2', month: 'November 2024', amount: 8500, date: '3 Nov 2024', mode: 'Online', receiptNo: 'RCP-2024-0638' },
  { id: '3', month: 'October 2024', amount: 8500, date: '8 Oct 2024', mode: 'UPI', receiptNo: 'RCP-2024-0521' },
  { id: '4', month: 'September 2024', amount: 8500, date: '2 Sep 2024', mode: 'Cash', receiptNo: 'RCP-2024-0412' },
  { id: '5', month: 'August 2024', amount: 8500, date: '1 Aug 2024', mode: 'UPI', receiptNo: 'RCP-2024-0298' },
  { id: '6', month: 'July 2024', amount: 8500, date: '5 Jul 2024', mode: 'Online', receiptNo: 'RCP-2024-0187' },
];

export const SUBJECT_MARKS: SubjectMark[] = [
  { subject: 'Mathematics', max: 100, marks: 94, grade: 'A+' },
  { subject: 'Science', max: 100, marks: 89, grade: 'A+' },
  { subject: 'English', max: 100, marks: 91, grade: 'A+' },
  { subject: 'Social Studies', max: 100, marks: 82, grade: 'A' },
  { subject: 'Hindi', max: 100, marks: 88, grade: 'A+' },
];

export const HOMEWORK: HomeworkItem[] = [
  { id: '1', subject: 'Maths', title: 'Algebra Exercise 4.3 — Q1 to Q15', givenBy: 'Mrs. Lakshmi', dueDate: 'Tomorrow', status: 'pending', description: 'Complete all questions in Exercise 4.3 from NCERT textbook. Show full working.', subjectColor: 'bg-blue-100 text-blue-700' },
  { id: '2', subject: 'Science', title: 'Chapter 7 — Draw and label cell diagram', givenBy: 'Mr. Rajan', dueDate: 'Tomorrow', status: 'pending', description: 'Draw a well-labelled diagram of a plant cell and animal cell. Color neatly.', subjectColor: 'bg-green-100 text-green-700' },
  { id: '3', subject: 'English', title: 'Write a letter to your friend', givenBy: 'Mrs. Priya', dueDate: '14 Jan', status: 'done', description: 'Informal letter in 150-200 words describing your holidays.', subjectColor: 'bg-amber-100 text-amber-700' },
  { id: '4', subject: 'Hindi', title: 'Learn poem "Vriksh" by heart', givenBy: 'Mrs. Sudha', dueDate: '15 Jan', status: 'done', description: 'Memorize the poem and be ready for recitation in class.', subjectColor: 'bg-red-100 text-red-700' },
];

export const NOTICES: Notice[] = [
  { id: '1', title: 'Annual Sports Day', body: 'Annual Sports Day will be held on 20th January. All parents are cordially invited. Report by 9 AM.', date: '20 Jan 2025', type: 'event', rsvp: true },
  { id: '2', title: 'Half-Yearly Exams Schedule', body: 'Half-yearly examinations commence from 25th January. Timetable shared in the app.', date: '12 Jan 2025', type: 'exam' },
  { id: '3', title: 'Republic Day Holiday', body: 'School will remain closed on 26th January for Republic Day celebrations.', date: '26 Jan 2025', type: 'holiday' },
  { id: '4', title: 'Parent-Teacher Meeting', body: 'PTM scheduled for Saturday, 18th January from 10 AM to 1 PM. Your slot: 11:30 AM.', date: '18 Jan 2025', type: 'circular', rsvp: true },
];

export const MESSAGES: Message[] = [
  { id: '1', from: 'school', text: 'Aditya was slightly late today (arrived at 8:45 AM). Please ensure timely arrival.', time: '9:01 AM' },
  { id: '2', from: 'parent', text: 'Sorry, there was traffic. Will ensure on time tomorrow. Thank you for informing.', time: '9:15 AM' },
  { id: '3', from: 'school', text: 'No problem. Aditya is doing great in class. His Maths score in last test was 94/100!', time: '9:18 AM' },
];
