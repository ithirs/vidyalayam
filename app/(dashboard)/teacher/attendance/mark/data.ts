export interface MarkStudent {
  id: string;
  rollNo: number;
  name: string;
  initials: string;
  avatarColor: string;
  status: 'present' | 'absent' | 'late' | null;
  note: string;
}

export const CLASSES = [
  { id: 'c1', label: 'Class 6-B', subject: 'Mathematics', studentCount: 38 },
  { id: 'c2', label: 'Class 7-A', subject: 'Mathematics', studentCount: 40 },
  { id: 'c3', label: 'Class 7-C', subject: 'Mathematics', studentCount: 37 },
  { id: 'c4', label: 'Class 8-A', subject: 'Mathematics', studentCount: 40 },
  { id: 'c5', label: 'Class 8-B', subject: 'Mathematics', studentCount: 39 },
  { id: 'c6', label: 'Class 9-A', subject: 'Mathematics', studentCount: 41 },
];

export const SUBJECTS = ['Mathematics', 'Science', 'English', 'Social Studies', 'Hindi'];

export const STUDENTS: MarkStudent[] = [
  { id: '1', rollNo: 1, name: 'Aarav Sharma', initials: 'AS', avatarColor: 'bg-blue-100 text-blue-600', status: null, note: '' },
  { id: '2', rollNo: 2, name: 'Ananya Reddy', initials: 'AR', avatarColor: 'bg-pink-100 text-pink-600', status: null, note: '' },
  { id: '3', rollNo: 3, name: 'Arjun Mehta', initials: 'AM', avatarColor: 'bg-green-100 text-green-600', status: null, note: '' },
  { id: '4', rollNo: 4, name: 'Diya Nair', initials: 'DN', avatarColor: 'bg-purple-100 text-purple-600', status: null, note: '' },
  { id: '5', rollNo: 5, name: 'Ishaan Patel', initials: 'IP', avatarColor: 'bg-orange-100 text-orange-600', status: null, note: '' },
  { id: '6', rollNo: 6, name: 'Kavya Singh', initials: 'KS', avatarColor: 'bg-teal-100 text-teal-600', status: null, note: '' },
  { id: '7', rollNo: 7, name: 'Kiran Kumar', initials: 'KK', avatarColor: 'bg-indigo-100 text-indigo-600', status: null, note: '' },
  { id: '8', rollNo: 8, name: 'Lakshmi Venkat', initials: 'LV', avatarColor: 'bg-rose-100 text-rose-600', status: null, note: '' },
  { id: '9', rollNo: 9, name: 'Manish Gupta', initials: 'MG', avatarColor: 'bg-amber-100 text-amber-600', status: null, note: '' },
  { id: '10', rollNo: 10, name: 'Meera Joshi', initials: 'MJ', avatarColor: 'bg-cyan-100 text-cyan-600', status: null, note: '' },
  { id: '11', rollNo: 11, name: 'Nisha Pillai', initials: 'NP', avatarColor: 'bg-lime-100 text-lime-600', status: null, note: '' },
  { id: '12', rollNo: 12, name: 'Om Prakash', initials: 'OP', avatarColor: 'bg-sky-100 text-sky-600', status: null, note: '' },
  { id: '13', rollNo: 13, name: 'Pooja Iyer', initials: 'PI', avatarColor: 'bg-fuchsia-100 text-fuchsia-600', status: null, note: '' },
  { id: '14', rollNo: 14, name: 'Rahul Das', initials: 'RD', avatarColor: 'bg-red-100 text-red-600', status: null, note: '' },
  { id: '15', rollNo: 15, name: 'Riya Bose', initials: 'RB', avatarColor: 'bg-emerald-100 text-emerald-600', status: null, note: '' },
  { id: '16', rollNo: 16, name: 'Rohan Mishra', initials: 'RM', avatarColor: 'bg-violet-100 text-violet-600', status: null, note: '' },
  { id: '17', rollNo: 17, name: 'Sahil Tiwari', initials: 'ST', avatarColor: 'bg-yellow-100 text-yellow-600', status: null, note: '' },
  { id: '18', rollNo: 18, name: 'Shreya Agarwal', initials: 'SA', avatarColor: 'bg-slate-100 text-slate-600', status: null, note: '' },
  { id: '19', rollNo: 19, name: 'Siddharth Rao', initials: 'SR', avatarColor: 'bg-orange-100 text-orange-700', status: null, note: '' },
  { id: '20', rollNo: 20, name: 'Sneha Verma', initials: 'SV', avatarColor: 'bg-pink-100 text-pink-700', status: null, note: '' },
  { id: '21', rollNo: 21, name: 'Tanvi Sharma', initials: 'TS', avatarColor: 'bg-teal-100 text-teal-700', status: null, note: '' },
  { id: '22', rollNo: 22, name: 'Uday Bhatt', initials: 'UB', avatarColor: 'bg-blue-100 text-blue-700', status: null, note: '' },
  { id: '23', rollNo: 23, name: 'Vandana Singh', initials: 'VS', avatarColor: 'bg-green-100 text-green-700', status: null, note: '' },
  { id: '24', rollNo: 24, name: 'Vikram Rao', initials: 'VR', avatarColor: 'bg-red-100 text-red-700', status: null, note: '' },
  { id: '25', rollNo: 25, name: 'Yamini Pillai', initials: 'YP', avatarColor: 'bg-amber-100 text-amber-700', status: null, note: '' },
  { id: '26', rollNo: 26, name: 'Zara Khan', initials: 'ZK', avatarColor: 'bg-rose-100 text-rose-700', status: null, note: '' },
  { id: '27', rollNo: 27, name: 'Aditya Kulkarni', initials: 'AK', avatarColor: 'bg-cyan-100 text-cyan-700', status: null, note: '' },
  { id: '28', rollNo: 28, name: 'Bhavna Desai', initials: 'BD', avatarColor: 'bg-lime-100 text-lime-700', status: null, note: '' },
  { id: '29', rollNo: 29, name: 'Chetan Jain', initials: 'CJ', avatarColor: 'bg-sky-100 text-sky-700', status: null, note: '' },
  { id: '30', rollNo: 30, name: 'Divya Murthy', initials: 'DM', avatarColor: 'bg-violet-100 text-violet-700', status: null, note: '' },
  { id: '31', rollNo: 31, name: 'Eshan Trivedi', initials: 'ET', avatarColor: 'bg-emerald-100 text-emerald-700', status: null, note: '' },
  { id: '32', rollNo: 32, name: 'Fatima Shaikh', initials: 'FS', avatarColor: 'bg-fuchsia-100 text-fuchsia-700', status: null, note: '' },
  { id: '33', rollNo: 33, name: 'Gaurav Tiwari', initials: 'GT', avatarColor: 'bg-orange-100 text-orange-800', status: null, note: '' },
  { id: '34', rollNo: 34, name: 'Harini Subramanian', initials: 'HS', avatarColor: 'bg-blue-100 text-blue-800', status: null, note: '' },
  { id: '35', rollNo: 35, name: 'Imran Siddiqui', initials: 'IS', avatarColor: 'bg-green-100 text-green-800', status: null, note: '' },
  { id: '36', rollNo: 36, name: 'Jyoti Yadav', initials: 'JY', avatarColor: 'bg-amber-100 text-amber-800', status: null, note: '' },
  { id: '37', rollNo: 37, name: 'Kritika Bhat', initials: 'KB', avatarColor: 'bg-pink-100 text-pink-800', status: null, note: '' },
  { id: '38', rollNo: 38, name: 'Lalit Pande', initials: 'LP', avatarColor: 'bg-teal-100 text-teal-800', status: null, note: '' },
  { id: '39', rollNo: 39, name: 'Madhuri Deshpande', initials: 'MD', avatarColor: 'bg-rose-100 text-rose-800', status: null, note: '' },
  { id: '40', rollNo: 40, name: 'Naresh Kapoor', initials: 'NK', avatarColor: 'bg-slate-100 text-slate-700', status: null, note: '' },
];
