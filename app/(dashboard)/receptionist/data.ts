export type InquiryStatus = 'new' | 'contacted' | 'scheduled' | 'admitted' | 'not_interested';

export interface Inquiry {
  id: string;
  parentName: string;
  studentName: string;
  classSeeking: string;
  phone: string;
  date: string;
  status: InquiryStatus;
  notes: string;
  source: string;
}

export interface ClassVacancy {
  class: string;
  section: string;
  totalSeats: number;
  filled: number;
}

export interface DocumentStudent {
  id: string;
  name: string;
  admClass: string;
  section: string;
  admDate: string;
  docs: Record<DocType, boolean>;
  phone: string;
}

export type DocType =
  | 'birth_certificate'
  | 'aadhar_card'
  | 'tc'
  | 'passport_photos'
  | 'address_proof'
  | 'caste_certificate';

export const DOC_LABELS: Record<DocType, string> = {
  birth_certificate: 'Birth Certificate',
  aadhar_card: 'Aadhar Card',
  tc: 'Previous School TC',
  passport_photos: 'Passport Photos',
  address_proof: 'Address Proof',
  caste_certificate: 'Caste Certificate',
};

export const STATUS_CONFIG: Record<InquiryStatus, { label: string; bg: string; text: string; dot: string }> = {
  new: { label: 'New', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  contacted: { label: 'Contacted', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  scheduled: { label: 'Visit Scheduled', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  admitted: { label: 'Admitted', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  not_interested: { label: 'Not Interested', bg: 'bg-slate-50', text: 'text-slate-500', dot: 'bg-slate-400' },
};

export const INQUIRIES: Inquiry[] = [
  { id: '1', parentName: 'Ramesh Gupta', studentName: 'Ananya Gupta', classSeeking: 'Class 6', phone: '9876543210', date: '12 Jan', status: 'new', notes: 'Interested in science stream. Father is an engineer.', source: 'Walk-in' },
  { id: '2', parentName: 'Suresh Patel', studentName: 'Rohan Patel', classSeeking: 'Class 1', phone: '9123456780', date: '12 Jan', status: 'contacted', notes: 'Called back. Wants to know fee structure.', source: 'Website' },
  { id: '3', parentName: 'Meena Sharma', studentName: 'Priya Sharma', classSeeking: 'Class 9', phone: '9988776655', date: '11 Jan', status: 'scheduled', notes: 'Visit scheduled for 15 Jan at 11 AM.', source: 'Referral' },
  { id: '4', parentName: 'Vikram Singh', studentName: 'Arjun Singh', classSeeking: 'Class 3', phone: '9112233445', date: '11 Jan', status: 'admitted', notes: 'Documents complete. Admitted in Class 3-B.', source: 'Walk-in' },
  { id: '5', parentName: 'Kavita Reddy', studentName: 'Sai Reddy', classSeeking: 'Class 7', phone: '9090909090', date: '10 Jan', status: 'not_interested', notes: 'Opted for another school closer to home.', source: 'Website' },
  { id: '6', parentName: 'Anita Joshi', studentName: 'Kabir Joshi', classSeeking: 'Class 5', phone: '9876012345', date: '10 Jan', status: 'new', notes: 'Interested in sports facilities.', source: 'Referral' },
  { id: '7', parentName: 'Deepak Kumar', studentName: 'Riya Kumar', classSeeking: 'Class 2', phone: '9765432100', date: '9 Jan', status: 'contacted', notes: 'Discussed fees. Will visit next week.', source: 'Walk-in' },
  { id: '8', parentName: 'Priti Nair', studentName: 'Aryan Nair', classSeeking: 'Class 8', phone: '9551234567', date: '9 Jan', status: 'scheduled', notes: 'Principal meeting confirmed for 14 Jan.', source: 'Website' },
];

export const CLASS_VACANCIES: ClassVacancy[] = [
  { class: '1', section: 'A', totalSeats: 40, filled: 32 },
  { class: '1', section: 'B', totalSeats: 40, filled: 38 },
  { class: '2', section: 'A', totalSeats: 40, filled: 35 },
  { class: '3', section: 'A', totalSeats: 40, filled: 39 },
  { class: '3', section: 'B', totalSeats: 40, filled: 28 },
  { class: '4', section: 'A', totalSeats: 40, filled: 40 },
  { class: '5', section: 'A', totalSeats: 40, filled: 37 },
  { class: '5', section: 'B', totalSeats: 40, filled: 30 },
  { class: '6', section: 'A', totalSeats: 45, filled: 42 },
  { class: '7', section: 'A', totalSeats: 45, filled: 38 },
  { class: '8', section: 'A', totalSeats: 45, filled: 44 },
  { class: '9', section: 'A', totalSeats: 50, filled: 46 },
  { class: '9', section: 'B', totalSeats: 50, filled: 41 },
  { class: '10', section: 'A', totalSeats: 50, filled: 48 },
];

export const DOCUMENT_STUDENTS: DocumentStudent[] = [
  {
    id: '1', name: 'Ananya Gupta', admClass: 'Class 6', section: 'A', admDate: '10 Jan', phone: '9876543210',
    docs: { birth_certificate: true, aadhar_card: true, tc: false, passport_photos: true, address_proof: false, caste_certificate: false },
  },
  {
    id: '2', name: 'Rohan Patel', admClass: 'Class 1', section: 'B', admDate: '9 Jan', phone: '9123456780',
    docs: { birth_certificate: true, aadhar_card: false, tc: false, passport_photos: true, address_proof: true, caste_certificate: false },
  },
  {
    id: '3', name: 'Kabir Joshi', admClass: 'Class 5', section: 'A', admDate: '8 Jan', phone: '9876012345',
    docs: { birth_certificate: true, aadhar_card: true, tc: true, passport_photos: false, address_proof: true, caste_certificate: false },
  },
  {
    id: '4', name: 'Riya Kumar', admClass: 'Class 2', section: 'A', admDate: '7 Jan', phone: '9765432100',
    docs: { birth_certificate: false, aadhar_card: true, tc: false, passport_photos: false, address_proof: true, caste_certificate: false },
  },
  {
    id: '5', name: 'Aryan Nair', admClass: 'Class 8', section: 'A', admDate: '6 Jan', phone: '9551234567',
    docs: { birth_certificate: true, aadhar_card: true, tc: false, passport_photos: true, address_proof: false, caste_certificate: true },
  },
];

export const FEE_STRUCTURES: Record<string, { tuition: number; transport: number; sports: number; total: number }> = {
  'Class 1': { tuition: 2500, transport: 800, sports: 300, total: 3600 },
  'Class 2': { tuition: 2500, transport: 800, sports: 300, total: 3600 },
  'Class 3': { tuition: 3000, transport: 800, sports: 300, total: 4100 },
  'Class 4': { tuition: 3000, transport: 800, sports: 300, total: 4100 },
  'Class 5': { tuition: 3000, transport: 800, sports: 300, total: 4100 },
  'Class 6': { tuition: 3500, transport: 1000, sports: 400, total: 4900 },
  'Class 7': { tuition: 3500, transport: 1000, sports: 400, total: 4900 },
  'Class 8': { tuition: 4000, transport: 1000, sports: 400, total: 5400 },
  'Class 9': { tuition: 4500, transport: 1200, sports: 500, total: 6200 },
  'Class 10': { tuition: 4500, transport: 1200, sports: 500, total: 6200 },
};
