export type ExamStatus = 'upcoming' | 'ongoing' | 'marks_entry' | 'completed';
export type ExamType = 'unit_test' | 'midterm' | 'annual' | 'practical' | 'prelim';

export interface Subject {
  id: string;
  name: string;
  code: string;
  hasWritten: boolean;
  hasPractical: boolean;
  writtenMax: number;
  practicalMax: number;
}

export interface ExamSubjectDate {
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Exam {
  id: string;
  name: string;
  type: ExamType;
  status: ExamStatus;
  startDate: string;
  endDate: string;
  classes: string[];
  marksEntryDeadline: string;
  totalStudents: number;
  marksEntered: number;
  subjectDates: ExamSubjectDate[];
  color: string;
}

export const CLASSES = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
export const SECTIONS = ['A', 'B', 'C', 'D'];

export const SUBJECTS: Subject[] = [
  { id: 'math',    name: 'Mathematics',          code: 'MATH',    hasWritten: true,  hasPractical: false, writtenMax: 80, practicalMax: 0  },
  { id: 'sci',     name: 'Science',               code: 'SCI',     hasWritten: true,  hasPractical: true,  writtenMax: 70, practicalMax: 30 },
  { id: 'eng',     name: 'English',               code: 'ENG',     hasWritten: true,  hasPractical: false, writtenMax: 80, practicalMax: 0  },
  { id: 'hindi',   name: 'Hindi',                 code: 'HIN',     hasWritten: true,  hasPractical: false, writtenMax: 80, practicalMax: 0  },
  { id: 'tel',     name: 'Telugu',                code: 'TEL',     hasWritten: true,  hasPractical: false, writtenMax: 80, practicalMax: 0  },
  { id: 'sst',     name: 'Social Studies',        code: 'SST',     hasWritten: true,  hasPractical: false, writtenMax: 80, practicalMax: 0  },
  { id: 'comp',    name: 'Computer Science',      code: 'CS',      hasWritten: true,  hasPractical: true,  writtenMax: 70, practicalMax: 30 },
];

export const EXAMS: Exam[] = [
  {
    id: 'e1', name: 'Unit Test 1', type: 'unit_test', status: 'completed',
    startDate: '2026-01-15', endDate: '2026-01-20', marksEntryDeadline: '2026-01-25',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    totalStudents: 620, marksEntered: 620, color: 'blue',
    subjectDates: [
      { subjectId: 'math',  date: '2026-01-15', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'sci',   date: '2026-01-16', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'eng',   date: '2026-01-17', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'hindi', date: '2026-01-18', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'sst',   date: '2026-01-20', startTime: '09:00', endTime: '11:00' },
    ],
  },
  {
    id: 'e2', name: 'Midterm Exam', type: 'midterm', status: 'marks_entry',
    startDate: '2026-02-10', endDate: '2026-02-18', marksEntryDeadline: '2026-02-28',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalStudents: 840, marksEntered: 680, color: 'orange',
    subjectDates: [
      { subjectId: 'math',  date: '2026-02-10', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'sci',   date: '2026-02-11', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'eng',   date: '2026-02-12', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'hindi', date: '2026-02-13', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'tel',   date: '2026-02-14', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'sst',   date: '2026-02-17', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'comp',  date: '2026-02-18', startTime: '09:00', endTime: '12:00' },
    ],
  },
  {
    id: 'e3', name: 'Unit Test 2', type: 'unit_test', status: 'ongoing',
    startDate: '2026-04-08', endDate: '2026-04-14', marksEntryDeadline: '2026-04-20',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    totalStudents: 620, marksEntered: 0, color: 'green',
    subjectDates: [
      { subjectId: 'math',  date: '2026-04-08', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'sci',   date: '2026-04-09', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'eng',   date: '2026-04-10', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'hindi', date: '2026-04-11', startTime: '09:00', endTime: '11:00' },
      { subjectId: 'sst',   date: '2026-04-14', startTime: '09:00', endTime: '11:00' },
    ],
  },
  {
    id: 'e4', name: 'Annual Exam', type: 'annual', status: 'upcoming',
    startDate: '2026-06-01', endDate: '2026-06-12', marksEntryDeadline: '2026-06-25',
    classes: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalStudents: 840, marksEntered: 0, color: 'teal',
    subjectDates: [
      { subjectId: 'math',  date: '2026-06-01', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'sci',   date: '2026-06-03', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'eng',   date: '2026-06-05', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'hindi', date: '2026-06-07', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'tel',   date: '2026-06-09', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'sst',   date: '2026-06-10', startTime: '09:00', endTime: '12:00' },
      { subjectId: 'comp',  date: '2026-06-12', startTime: '09:00', endTime: '12:00' },
    ],
  },
];

export const STATUS_CONFIG: Record<ExamStatus, { label: string; color: string; dot: string }> = {
  upcoming:     { label: 'Upcoming',     color: 'bg-slate-100 text-slate-600',   dot: 'bg-slate-400' },
  ongoing:      { label: 'Ongoing',      color: 'bg-green-100 text-green-700',   dot: 'bg-green-500' },
  marks_entry:  { label: 'Marks Entry',  color: 'bg-orange-100 text-orange-700', dot: 'bg-orange-500' },
  completed:    { label: 'Completed',    color: 'bg-blue-100 text-blue-700',     dot: 'bg-blue-500'  },
};

export const TYPE_LABELS: Record<ExamType, string> = {
  unit_test: 'Unit Test', midterm: 'Midterm', annual: 'Annual',
  practical: 'Practical', prelim: 'Preliminary',
};

export const EXAM_COLORS: Record<string, { card: string; badge: string; header: string }> = {
  blue:   { card: 'border-blue-200   bg-blue-50/30',   badge: 'bg-blue-100 text-blue-700',   header: 'from-blue-500 to-blue-600' },
  orange: { card: 'border-orange-200 bg-orange-50/30', badge: 'bg-orange-100 text-orange-700', header: 'from-orange-500 to-orange-600' },
  green:  { card: 'border-green-200  bg-green-50/30',  badge: 'bg-green-100 text-green-700',  header: 'from-green-500 to-green-600' },
  teal:   { card: 'border-teal-200   bg-teal-50/30',   badge: 'bg-teal-100 text-teal-700',   header: 'from-teal-500 to-teal-600'  },
};
