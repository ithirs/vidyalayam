export const MONTHS_SHORT = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
export const MONTHS_FULL  = ['April','May','June','July','August','September','October','November','December','January','February','March'];
export const CLASSES = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];

export const ENROLLMENT_TREND = MONTHS_SHORT.map((m, i) => ({
  month: m,
  students: 760 + Math.round(Math.sin(i * 0.6) * 20 + i * 5),
}));

export const ATTENDANCE_TREND = MONTHS_SHORT.map((m, i) => ({
  month: m,
  attendance: Math.max(78, Math.min(98, 88 + Math.round(Math.sin(i * 0.8) * 6))),
}));

export const FEE_COLLECTION = MONTHS_SHORT.map((m, i) => ({
  month: m,
  collected: Math.round((320000 + Math.sin(i * 0.7) * 40000 + i * 8000) / 1000) * 1000,
  target:    380000,
}));

export const CLASS_DISTRIBUTION = CLASSES.map((cls, i) => ({
  class: cls,
  students: 62 + (i % 3) * 6 + (i % 5) * 2,
}));

export const GENDER_RATIO = [
  { name: 'Male',   value: 451, fill: '#f97316' },
  { name: 'Female', value: 396, fill: '#fb923c' },
];

export const ADMISSIONS_VS_TRANSFERS = MONTHS_SHORT.map((m, i) => ({
  month: m,
  admissions: Math.round(6 + Math.random() * 12),
  transfers:  Math.round(1 + Math.random() * 4),
}));

export const CLASS_STRENGTH = CLASSES.map((cls, i) => ({
  class:   cls,
  boys:    30 + (i % 4) * 3,
  girls:   29 + (i % 3) * 3,
  total:   59 + (i % 4) * 3 + (i % 3) * 3,
  sc:      Math.round((59 + (i % 4) * 3) * 0.12),
  st:      Math.round((59 + (i % 4) * 3) * 0.07),
  obc:     Math.round((59 + (i % 4) * 3) * 0.35),
  general: Math.round((59 + (i % 4) * 3) * 0.46),
}));

export const LOW_ATTENDANCE_STUDENTS = [
  { roll: 'C9A-12', name: 'Ravi Shankar',    class: 'Class 9A', attendance: 62, daysAbsent: 28 },
  { roll: 'C8B-07', name: 'Pooja Reddy',     class: 'Class 8B', attendance: 67, daysAbsent: 24 },
  { roll: 'C10A-21',name: 'Karan Singh',     class: 'Class 10A',attendance: 69, daysAbsent: 22 },
  { roll: 'C7A-03', name: 'Divya Patel',     class: 'Class 7A', attendance: 71, daysAbsent: 21 },
  { roll: 'C11B-15',name: 'Rahul Verma',     class: 'Class 11B',attendance: 72, daysAbsent: 20 },
  { roll: 'C6A-18', name: 'Anitha Kumari',   class: 'Class 6A', attendance: 73, daysAbsent: 19 },
  { roll: 'C12A-09',name: 'Syed Imran',      class: 'Class 12A',attendance: 74, daysAbsent: 18 },
];

export const MONTHLY_CLASS_ATTENDANCE: Record<string, number[]> = {
  'Class 1':  [92,94,91,88,89,93,95,96,94,92,90,88],
  'Class 2':  [90,91,88,85,87,90,93,94,92,91,89,87],
  'Class 3':  [88,90,87,84,86,89,92,93,91,90,88,86],
  'Class 4':  [91,92,89,87,88,91,93,94,93,91,89,88],
  'Class 5':  [89,91,88,85,86,90,92,93,91,90,88,87],
  'Class 6':  [87,89,86,83,85,88,90,91,89,88,86,84],
  'Class 7':  [85,87,84,81,83,86,89,90,88,87,85,83],
  'Class 8':  [88,90,87,84,86,89,91,92,90,89,87,85],
  'Class 9':  [84,86,83,80,82,85,88,89,87,86,84,82],
  'Class 10': [86,88,85,82,84,87,89,90,88,87,85,83],
  'Class 11': [83,85,82,79,81,84,87,88,86,85,83,81],
  'Class 12': [82,84,81,78,80,83,86,87,85,84,82,80],
};

export const TEACHER_ATTENDANCE_COMPLIANCE = [
  { name: 'Smt. Lakshmi Devi',  class: 'Class 6A', marked: 98, total: 100, rate: 98 },
  { name: 'Sri Ramesh Kumar',   class: 'Class 9B', marked: 95, total: 100, rate: 95 },
  { name: 'Smt. Priya Nair',    class: 'Class 4B', marked: 100,total: 100, rate: 100},
  { name: 'Sri Venkat Rao',     class: 'Class 11A',marked: 89, total: 100, rate: 89 },
  { name: 'Smt. Anjali Singh',  class: 'Class 2A', marked: 93, total: 100, rate: 93 },
  { name: 'Sri Suresh Babu',    class: 'Class 7B', marked: 82, total: 100, rate: 82 },
  { name: 'Smt. Meena Kumari',  class: 'Class 12B',marked: 96, total: 100, rate: 96 },
  { name: 'Sri Ajay Mishra',    class: 'Class 10A',marked: 78, total: 100, rate: 78 },
];

export const FEE_COLLECTION_TABLE = MONTHS_FULL.slice(0, 9).map((m, i) => ({
  month:       m,
  tuition:     Math.round((180000 + i * 5000) / 1000) * 1000,
  transport:   Math.round((45000  + i * 1000) / 1000) * 1000,
  exam:        i === 0 || i === 5 ? 28000 : 0,
  misc:        Math.round(8000 + Math.sin(i) * 2000),
  total:       0,
  target:      380000,
})).map((r) => ({ ...r, total: r.tuition + r.transport + r.exam + r.misc }));

export const PAYMENT_MODE = [
  { name: 'UPI',       value: 42, fill: '#f97316' },
  { name: 'Cash',      value: 31, fill: '#fb923c' },
  { name: 'Online',    value: 18, fill: '#fdba74' },
  { name: 'Cheque',    value: 9,  fill: '#fed7aa' },
];

export const FEE_DEFAULTERS = [
  { roll: 'C10A-05', name: 'Arjun Sharma',    class: 'Class 10A', amount: 12500, agingBucket: '60+',   daysOverdue: 72 },
  { roll: 'C9B-11',  name: 'Sunita Rao',      class: 'Class 9B',  amount: 8500,  agingBucket: '60+',   daysOverdue: 65 },
  { roll: 'C11A-08', name: 'Mohan Das',       class: 'Class 11A', amount: 15000, agingBucket: '31-60', daysOverdue: 45 },
  { roll: 'C7A-14',  name: 'Geeta Patel',     class: 'Class 7A',  amount: 6200,  agingBucket: '31-60', daysOverdue: 38 },
  { roll: 'C8B-02',  name: 'Raju Verma',      class: 'Class 8B',  amount: 9000,  agingBucket: '31-60', daysOverdue: 33 },
  { roll: 'C12A-17', name: 'Ananya Singh',    class: 'Class 12A', amount: 18000, agingBucket: '0-30',  daysOverdue: 22 },
  { roll: 'C6A-20',  name: 'Deepak Kumar',    class: 'Class 6A',  amount: 4500,  agingBucket: '0-30',  daysOverdue: 15 },
  { roll: 'C5B-09',  name: 'Shalini Mishra',  class: 'Class 5B',  amount: 3800,  agingBucket: '0-30',  daysOverdue: 8  },
];

export const DAY_BOOK = Array.from({ length: 10 }, (_, i) => {
  const d = new Date(2026, 3, i + 1);
  return {
    date:         d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    transactions: Math.round(12 + Math.random() * 20),
    cash:         Math.round((18000 + Math.random() * 25000) / 100) * 100,
    upi:          Math.round((25000 + Math.random() * 40000) / 100) * 100,
    online:       Math.round((8000  + Math.random() * 15000) / 100) * 100,
    total:        0,
  };
}).map((r) => ({ ...r, total: r.cash + r.upi + r.online }));

export const EXAMS = ['Unit Test 1', 'Mid Term', 'Unit Test 2', 'Final Exam'];

export const EXAM_CLASS_RESULTS = CLASSES.map((cls) => ({
  class: cls,
  exams: EXAMS.map((exam) => ({
    exam,
    appeared:  55 + Math.round(Math.random() * 10),
    passed:    50 + Math.round(Math.random() * 8),
    avgMarks:  Math.round(60 + Math.random() * 22),
    passRate:  0,
  })).map((e) => ({ ...e, passRate: Math.round((e.passed / e.appeared) * 100) })),
}));

export const SUBJECT_PERFORMANCE = [
  { subject: 'Mathematics',  avg: 64, passed: 88, failed: 12 },
  { subject: 'Science',      avg: 71, passed: 91, failed: 9  },
  { subject: 'English',      avg: 78, passed: 95, failed: 5  },
  { subject: 'Social Sci.',  avg: 73, passed: 93, failed: 7  },
  { subject: 'Hindi',        avg: 76, passed: 94, failed: 6  },
  { subject: 'Telugu',       avg: 80, passed: 96, failed: 4  },
];

export const TOP_PERFORMERS = [
  { rank: 1,  roll: 'C10A-03', name: 'Priya Sharma',    class: 'Class 10A', score: 98.4, grade: 'A+' },
  { rank: 2,  roll: 'C12A-07', name: 'Aryan Mehta',     class: 'Class 12A', score: 97.8, grade: 'A+' },
  { rank: 3,  roll: 'C10B-11', name: 'Kavya Reddy',     class: 'Class 10B', score: 97.2, grade: 'A+' },
  { rank: 4,  roll: 'C9A-04',  name: 'Aditya Kumar',    class: 'Class 9A',  score: 96.5, grade: 'A+' },
  { rank: 5,  roll: 'C12B-02', name: 'Sneha Patel',     class: 'Class 12B', score: 95.9, grade: 'A+' },
  { rank: 6,  roll: 'C11A-15', name: 'Rohan Singh',     class: 'Class 11A', score: 95.1, grade: 'A+' },
  { rank: 7,  roll: 'C9B-08',  name: 'Divya Nair',      class: 'Class 9B',  score: 94.6, grade: 'A'  },
  { rank: 8,  roll: 'C8A-19',  name: 'Vivek Rao',       class: 'Class 8A',  score: 94.0, grade: 'A'  },
  { rank: 9,  roll: 'C10A-22', name: 'Ananya Das',      class: 'Class 10A', score: 93.4, grade: 'A'  },
  { rank: 10, roll: 'C11B-06', name: 'Nikhil Verma',    class: 'Class 11B', score: 92.8, grade: 'A'  },
];

export const EXAM_COMPARISON = EXAMS.map((exam) => ({
  exam,
  avgScore: Math.round(62 + Math.random() * 16),
  passRate: Math.round(82 + Math.random() * 14),
}));

export const STAFF_ATTENDANCE = [
  { name: 'Smt. Lakshmi Devi',   dept: 'Primary',   present: 96, absent: 2, leave: 2,  total: 100, rate: 96 },
  { name: 'Sri Ramesh Kumar',    dept: 'Secondary', present: 92, absent: 5, leave: 3,  total: 100, rate: 92 },
  { name: 'Smt. Priya Nair',     dept: 'Primary',   present: 100,absent: 0, leave: 0,  total: 100, rate: 100},
  { name: 'Sri Venkat Rao',      dept: 'Senior',    present: 88, absent: 7, leave: 5,  total: 100, rate: 88 },
  { name: 'Smt. Anjali Singh',   dept: 'Primary',   present: 94, absent: 4, leave: 2,  total: 100, rate: 94 },
  { name: 'Sri Suresh Babu',     dept: 'Secondary', present: 85, absent: 8, leave: 7,  total: 100, rate: 85 },
  { name: 'Smt. Meena Kumari',   dept: 'Senior',    present: 97, absent: 2, leave: 1,  total: 100, rate: 97 },
  { name: 'Sri Ajay Mishra',     dept: 'Secondary', present: 79, absent: 12,leave: 9,  total: 100, rate: 79 },
  { name: 'Smt. Sunita Verma',   dept: 'Primary',   present: 91, absent: 5, leave: 4,  total: 100, rate: 91 },
  { name: 'Sri Pavan Kumar',     dept: 'Senior',    present: 95, absent: 3, leave: 2,  total: 100, rate: 95 },
];

export const LEAVE_RECORDS = [
  { name: 'Sri Venkat Rao',    type: 'Casual',  days: 3, from: 'Apr 8',  to: 'Apr 10', status: 'approved' },
  { name: 'Sri Suresh Babu',   type: 'Medical', days: 5, from: 'Apr 3',  to: 'Apr 7',  status: 'approved' },
  { name: 'Sri Ajay Mishra',   type: 'Casual',  days: 2, from: 'Apr 11', to: 'Apr 12', status: 'pending'  },
  { name: 'Smt. Anjali Singh', type: 'Earned',  days: 4, from: 'Apr 15', to: 'Apr 18', status: 'approved' },
  { name: 'Smt. Meena Kumari', type: 'Casual',  days: 1, from: 'Apr 14', to: 'Apr 14', status: 'approved' },
];

export const TEACHER_CLASS_ASSIGNMENT = [
  { teacher: 'Smt. Lakshmi Devi',  subjects: ['English','EVS'],    classes: ['Class 1A','Class 2A','Class 3A'] },
  { teacher: 'Sri Ramesh Kumar',   subjects: ['Mathematics'],      classes: ['Class 9A','Class 9B','Class 10A'] },
  { teacher: 'Smt. Priya Nair',    subjects: ['English','Hindi'],  classes: ['Class 4A','Class 4B','Class 5A'] },
  { teacher: 'Sri Venkat Rao',     subjects: ['Physics','Chemistry'],classes: ['Class 11A','Class 11B','Class 12A'] },
  { teacher: 'Smt. Anjali Singh',  subjects: ['Mathematics','Science'],classes: ['Class 6A','Class 6B'] },
  { teacher: 'Sri Suresh Babu',    subjects: ['Social Studies'],   classes: ['Class 7A','Class 7B','Class 8A'] },
  { teacher: 'Smt. Meena Kumari',  subjects: ['Biology'],          classes: ['Class 11A','Class 12A','Class 12B'] },
  { teacher: 'Sri Ajay Mishra',    subjects: ['History','Civics'], classes: ['Class 8B','Class 9A','Class 10B'] },
];
