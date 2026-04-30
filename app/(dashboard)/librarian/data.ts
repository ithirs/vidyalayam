export type BookCategory =
  | 'Science'
  | 'Mathematics'
  | 'Literature'
  | 'History'
  | 'Fiction'
  | 'Geography'
  | 'Computer Science'
  | 'Arts'
  | 'Reference'
  | 'Sports'
  | 'Language'
  | 'General';

export type IssueStatus = 'on_time' | 'due_today' | 'overdue';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: BookCategory;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  price: number;
  location: string;
  addedOn: string;
}

export interface IssuedBook {
  id: string;
  studentName: string;
  rollNumber: string;
  class: string;
  section: string;
  bookId: string;
  bookTitle: string;
  issueDate: string;
  dueDate: string;
  status: IssueStatus;
  daysOverdue?: number;
  phone: string;
}

export const CATEGORY_CONFIG: Record<BookCategory, { color: string; bg: string; light: string; text: string }> = {
  Science: { color: '#2563eb', bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700' },
  Mathematics: { color: '#7c3aed', bg: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-700' },
  Literature: { color: '#db2777', bg: 'bg-pink-500', light: 'bg-pink-50', text: 'text-pink-700' },
  History: { color: '#d97706', bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700' },
  Fiction: { color: '#059669', bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700' },
  Geography: { color: '#0891b2', bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-700' },
  'Computer Science': { color: '#475569', bg: 'bg-slate-500', light: 'bg-slate-100', text: 'text-slate-700' },
  Arts: { color: '#ea580c', bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700' },
  Reference: { color: '#16a34a', bg: 'bg-green-600', light: 'bg-green-50', text: 'text-green-700' },
  Sports: { color: '#dc2626', bg: 'bg-red-500', light: 'bg-red-50', text: 'text-red-700' },
  Language: { color: '#7c3aed', bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700' },
  General: { color: '#64748b', bg: 'bg-slate-400', light: 'bg-slate-50', text: 'text-slate-600' },
};

export const BOOKS: Book[] = [
  { id: 'b1', title: 'Physics — Part I', author: 'NCERT', isbn: '978-8174506207', category: 'Science', publisher: 'NCERT', totalCopies: 25, availableCopies: 18, price: 120, location: 'A-01', addedOn: 'Jan 2024' },
  { id: 'b2', title: 'Chemistry — Part II', author: 'NCERT', isbn: '978-8174506320', category: 'Science', publisher: 'NCERT', totalCopies: 20, availableCopies: 12, price: 135, location: 'A-02', addedOn: 'Jan 2024' },
  { id: 'b3', title: 'Mathematics Textbook Class 10', author: 'R.D. Sharma', isbn: '978-8121927000', category: 'Mathematics', publisher: 'Dhanpat Rai', totalCopies: 30, availableCopies: 0, price: 280, location: 'B-01', addedOn: 'Feb 2024' },
  { id: 'b4', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', isbn: '978-8173711466', category: 'Literature', publisher: 'Universities Press', totalCopies: 15, availableCopies: 4, price: 195, location: 'C-03', addedOn: 'Mar 2024' },
  { id: 'b5', title: 'Discovery of India', author: 'Jawaharlal Nehru', isbn: '978-0140149715', category: 'History', publisher: 'Penguin', totalCopies: 10, availableCopies: 7, price: 350, location: 'D-01', addedOn: 'Jan 2024' },
  { id: 'b6', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '978-0061122415', category: 'Fiction', publisher: 'HarperCollins', totalCopies: 12, availableCopies: 2, price: 250, location: 'C-05', addedOn: 'Apr 2024' },
  { id: 'b7', title: 'India — A History', author: 'John Keay', isbn: '978-0802137975', category: 'History', publisher: 'Grove Press', totalCopies: 8, availableCopies: 6, price: 450, location: 'D-02', addedOn: 'Jan 2024' },
  { id: 'b8', title: 'Computer Science with Python', author: 'Sumita Arora', isbn: '978-9351381785', category: 'Computer Science', publisher: 'Dhanpat Rai', totalCopies: 22, availableCopies: 14, price: 320, location: 'E-01', addedOn: 'Feb 2024' },
  { id: 'b9', title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '978-0553380163', category: 'Science', publisher: 'Bantam Books', totalCopies: 6, availableCopies: 1, price: 399, location: 'A-05', addedOn: 'May 2024' },
  { id: 'b10', title: 'Geography — NCERT Class 9', author: 'NCERT', isbn: '978-8174508119', category: 'Geography', publisher: 'NCERT', totalCopies: 18, availableCopies: 11, price: 90, location: 'F-01', addedOn: 'Jan 2024' },
  { id: 'b11', title: 'Malgudi Days', author: 'R.K. Narayan', isbn: '978-0143031291', category: 'Fiction', publisher: 'Penguin', totalCopies: 9, availableCopies: 5, price: 199, location: 'C-06', addedOn: 'Mar 2024' },
  { id: 'b12', title: 'English Grammar', author: 'Wren & Martin', isbn: '978-8121900980', category: 'Language', publisher: 'S. Chand', totalCopies: 35, availableCopies: 22, price: 150, location: 'G-01', addedOn: 'Jan 2024' },
  { id: 'b13', title: 'Introduction to Algorithms', author: 'Cormen et al.', isbn: '978-0262033848', category: 'Computer Science', publisher: 'MIT Press', totalCopies: 5, availableCopies: 3, price: 1200, location: 'E-02', addedOn: 'Jun 2024' },
  { id: 'b14', title: 'Indian Art & Culture', author: 'Nitin Singhania', isbn: '978-9352604920', category: 'Arts', publisher: 'McGraw Hill', totalCopies: 7, availableCopies: 0, price: 680, location: 'H-01', addedOn: 'Jan 2025' },
  { id: 'b15', title: 'Sports Psychology', author: 'Robert Weinberg', isbn: '978-1450469814', category: 'Sports', publisher: 'Human Kinetics', totalCopies: 4, availableCopies: 4, price: 899, location: 'I-01', addedOn: 'Jan 2025' },
];

export const ISSUED_BOOKS: IssuedBook[] = [
  { id: 'i1', studentName: 'Arjun Sharma', rollNumber: 'R001', class: 'Class 9', section: 'A', bookId: 'b1', bookTitle: 'Physics — Part I', issueDate: '2 Jan', dueDate: '16 Jan', status: 'overdue', daysOverdue: 4, phone: '9876543210' },
  { id: 'i2', studentName: 'Priya Patel', rollNumber: 'R042', class: 'Class 10', section: 'B', bookId: 'b4', bookTitle: 'Wings of Fire', issueDate: '5 Jan', dueDate: '19 Jan', status: 'overdue', daysOverdue: 1, phone: '9123456780' },
  { id: 'i3', studentName: 'Rohan Mehta', rollNumber: 'R019', class: 'Class 8', section: 'A', bookId: 'b6', bookTitle: 'The Alchemist', issueDate: '6 Jan', dueDate: '20 Jan', status: 'due_today', phone: '9988776655' },
  { id: 'i4', studentName: 'Sneha Reddy', rollNumber: 'R078', class: 'Class 7', section: 'B', bookId: 'b8', bookTitle: 'Computer Science with Python', issueDate: '7 Jan', dueDate: '21 Jan', status: 'on_time', phone: '9112233445' },
  { id: 'i5', studentName: 'Vikram Singh', rollNumber: 'R031', class: 'Class 6', section: 'A', bookId: 'b5', bookTitle: 'Discovery of India', issueDate: '8 Jan', dueDate: '22 Jan', status: 'on_time', phone: '9090909090' },
  { id: 'i6', studentName: 'Ananya Gupta', rollNumber: 'R055', class: 'Class 10', section: 'A', bookId: 'b9', bookTitle: 'A Brief History of Time', issueDate: '1 Jan', dueDate: '15 Jan', status: 'overdue', daysOverdue: 5, phone: '9765432100' },
  { id: 'i7', studentName: 'Kabir Joshi', rollNumber: 'R022', class: 'Class 5', section: 'A', bookId: 'b12', bookTitle: 'English Grammar', issueDate: '9 Jan', dueDate: '23 Jan', status: 'on_time', phone: '9876012345' },
  { id: 'i8', studentName: 'Meera Nair', rollNumber: 'R067', class: 'Class 9', section: 'B', bookId: 'b2', bookTitle: 'Chemistry — Part II', issueDate: '10 Jan', dueDate: '24 Jan', status: 'on_time', phone: '9551234567' },
  { id: 'i9', studentName: 'Dev Kumar', rollNumber: 'R089', class: 'Class 8', section: 'B', bookId: 'b11', bookTitle: 'Malgudi Days', issueDate: '3 Jan', dueDate: '17 Jan', status: 'overdue', daysOverdue: 3, phone: '9445566778' },
  { id: 'i10', studentName: 'Riya Sharma', rollNumber: 'R011', class: 'Class 7', section: 'A', bookId: 'b10', bookTitle: 'Geography — NCERT Class 9', issueDate: '11 Jan', dueDate: '25 Jan', status: 'on_time', phone: '9334455667' },
];

export const ISSUE_STATUS_CONFIG: Record<IssueStatus, { label: string; bg: string; text: string; dot: string; border: string }> = {
  on_time: { label: 'On Time', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', border: 'border-green-200' },
  due_today: { label: 'Due Today', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', border: 'border-orange-200' },
  overdue: { label: 'Overdue', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', border: 'border-red-200' },
};

export const CATEGORIES: BookCategory[] = [
  'Science', 'Mathematics', 'Literature', 'History', 'Fiction',
  'Geography', 'Computer Science', 'Arts', 'Reference', 'Sports', 'Language', 'General',
];

export const STUDENTS_MOCK = [
  { id: 's1', name: 'Arjun Sharma', rollNumber: 'R001', class: 'Class 9', section: 'A', phone: '9876543210' },
  { id: 's2', name: 'Priya Patel', rollNumber: 'R042', class: 'Class 10', section: 'B', phone: '9123456780' },
  { id: 's3', name: 'Rohan Mehta', rollNumber: 'R019', class: 'Class 8', section: 'A', phone: '9988776655' },
  { id: 's4', name: 'Sneha Reddy', rollNumber: 'R078', class: 'Class 7', section: 'B', phone: '9112233445' },
  { id: 's5', name: 'Vikram Singh', rollNumber: 'R031', class: 'Class 6', section: 'A', phone: '9090909090' },
  { id: 's6', name: 'Ananya Gupta', rollNumber: 'R055', class: 'Class 10', section: 'A', phone: '9765432100' },
  { id: 's7', name: 'Kabir Joshi', rollNumber: 'R022', class: 'Class 5', section: 'A', phone: '9876012345' },
];
