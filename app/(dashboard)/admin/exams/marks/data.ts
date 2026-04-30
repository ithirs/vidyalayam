export interface StudentMark {
  id: string;
  rollNo: string;
  name: string;
  avatarInitials: string;
  avatarColor: string;
  written: number | null;
  practical: number | null;
  remarks: string;
}

export function calcTotal(written: number | null, practical: number | null): number | null {
  if (written === null && practical === null) return null;
  return (written ?? 0) + (practical ?? 0);
}

export function calcGrade(total: number | null, maxTotal: number): { grade: string; color: string; bg: string } {
  if (total === null) return { grade: '—', color: 'text-slate-400', bg: '' };
  const pct = (total / maxTotal) * 100;
  if (pct >= 90) return { grade: 'A+', color: 'text-emerald-700', bg: 'bg-emerald-100' };
  if (pct >= 75) return { grade: 'A',  color: 'text-blue-700',    bg: 'bg-blue-100'    };
  if (pct >= 60) return { grade: 'B',  color: 'text-sky-700',     bg: 'bg-sky-100'     };
  if (pct >= 50) return { grade: 'C',  color: 'text-orange-700',  bg: 'bg-orange-100'  };
  if (pct >= 35) return { grade: 'D',  color: 'text-amber-700',   bg: 'bg-amber-100'   };
  return { grade: 'F', color: 'text-red-700', bg: 'bg-red-100' };
}

export function rowBg(total: number | null, maxTotal: number): string {
  if (total === null) return '';
  const pct = (total / maxTotal) * 100;
  if (pct >= 90) return 'bg-emerald-50/30';
  if (pct >= 75) return 'bg-blue-50/30';
  if (pct >= 50) return 'bg-orange-50/20';
  if (pct < 35)  return 'bg-red-50/30';
  return '';
}

const NAMES = [
  'Arjun Kapoor', 'Meera Joshi', 'Dev Sharma', 'Lakshmi Rao', 'Rahul Verma',
  'Pooja Singh', 'Kiran Mehta', 'Ananya Reddy', 'Vikram Nair', 'Sneha Pillai',
  'Rohit Das', 'Divya Iyer', 'Siddharth Bhatt', 'Kavya Menon', 'Nikhil Gupta',
  'Trisha Kapoor', 'Amit Verma', 'Priya Singh', 'Suresh Rao', 'Nisha Kumar',
  'Rohan Sharma', 'Deepa Nair', 'Anil Mehta', 'Sunita Reddy', 'Vijay Das',
  'Rekha Joshi', 'Mohan Pillai', 'Geeta Bhatt', 'Krishna Iyer', 'Radha Menon',
  'Rajesh Gupta', 'Usha Kapoor', 'Sunil Verma', 'Gita Singh', 'Ashok Rao',
  'Savita Kumar', 'Prakash Sharma', 'Lata Nair', 'Vinod Mehta', 'Sanjay Reddy',
];

const COLORS = [
  'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-orange-100 text-orange-600',
  'bg-teal-100 text-teal-600', 'bg-rose-100 text-rose-600', 'bg-amber-100 text-amber-600',
  'bg-cyan-100 text-cyan-600', 'bg-lime-100 text-lime-600',
];

export function generateStudents(count = 40): StudentMark[] {
  return NAMES.slice(0, count).map((name, i) => ({
    id: `s${i + 1}`,
    rollNo: String(i + 1).padStart(2, '0'),
    name,
    avatarInitials: name.split(' ').map((n) => n[0]).join('').slice(0, 2),
    avatarColor: COLORS[i % COLORS.length],
    written: null,
    practical: null,
    remarks: '',
  }));
}

export const REMARK_OPTIONS = ['Excellent', 'Good', 'Needs Improvement', 'Absent', 'Medical Leave', ''];
