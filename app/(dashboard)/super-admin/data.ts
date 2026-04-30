export type SchoolStatus = 'active' | 'trial' | 'expired' | 'suspended';
export type PlanType = 'starter' | 'growth' | 'premium';

export interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  plan: PlanType;
  students: number;
  staff: number;
  status: SchoolStatus;
  joined: string;
  email: string;
  phone: string;
  expiresAt?: string;
}

export interface ActivityEvent {
  id: string;
  type: 'registered' | 'payment' | 'suspended' | 'plan_upgrade' | 'trial_started' | 'expired';
  school: string;
  detail: string;
  time: string;
}

export const SCHOOLS: School[] = [
  { id: '1', name: 'Sri Sai High School', city: 'Hyderabad', state: 'Telangana', plan: 'premium', students: 1248, staff: 86, status: 'active', joined: '2023-04-12', email: 'admin@srisaihs.edu.in', phone: '+91 98765 43210', expiresAt: '2027-04-11' },
  { id: '2', name: 'Delhi Public School', city: 'New Delhi', state: 'Delhi', plan: 'growth', students: 3420, staff: 214, status: 'active', joined: '2023-06-01', email: 'admin@dps.edu.in', phone: '+91 98765 00011', expiresAt: '2026-05-30' },
  { id: '3', name: 'Sunshine Academy', city: 'Pune', state: 'Maharashtra', plan: 'starter', students: 540, staff: 38, status: 'trial', joined: '2026-04-01', email: 'info@sunshineacademy.in', phone: '+91 91234 56789', expiresAt: '2026-04-15' },
  { id: '4', name: 'St. Josephs Convent', city: 'Chennai', state: 'Tamil Nadu', plan: 'premium', students: 2100, staff: 132, status: 'active', joined: '2022-08-20', email: 'principal@stjosephs.edu.in', phone: '+91 44 2345 6789', expiresAt: '2027-08-19' },
  { id: '5', name: 'Gyan Jyoti School', city: 'Jaipur', state: 'Rajasthan', plan: 'growth', students: 870, staff: 60, status: 'expired', joined: '2023-01-15', email: 'admin@gyanjyoti.in', phone: '+91 94100 22333', expiresAt: '2026-01-14' },
  { id: '6', name: 'Kendriya Vidyalaya No.3', city: 'Bengaluru', state: 'Karnataka', plan: 'premium', students: 2800, staff: 190, status: 'active', joined: '2022-07-01', email: 'kv3blr@kvs.gov.in', phone: '+91 80 2222 3333', expiresAt: '2027-06-30' },
  { id: '7', name: 'Bright Future School', city: 'Kolkata', state: 'West Bengal', plan: 'starter', students: 310, staff: 22, status: 'suspended', joined: '2024-03-10', email: 'bfs@brightfuture.in', phone: '+91 33 4455 6677', expiresAt: '2025-03-09' },
  { id: '8', name: 'Navodaya English Medium', city: 'Nagpur', state: 'Maharashtra', plan: 'growth', students: 960, staff: 72, status: 'active', joined: '2023-11-05', email: 'admin@navodaya-ngp.in', phone: '+91 712 234 5678', expiresAt: '2026-11-04' },
  { id: '9', name: 'Little Stars Nursery', city: 'Surat', state: 'Gujarat', plan: 'starter', students: 180, staff: 14, status: 'trial', joined: '2026-04-05', email: 'hello@littlestars.edu.in', phone: '+91 90990 11223', expiresAt: '2026-04-19' },
  { id: '10', name: 'Vidya Mandir Trust', city: 'Ahmedabad', state: 'Gujarat', plan: 'growth', students: 1340, staff: 98, status: 'active', joined: '2023-09-18', email: 'trust@vidyamandir.ac.in', phone: '+91 79 2600 1234', expiresAt: '2026-09-17' },
  { id: '11', name: 'Holy Cross Academy', city: 'Kochi', state: 'Kerala', plan: 'premium', students: 1780, staff: 118, status: 'active', joined: '2023-02-14', email: 'office@holycross.edu.in', phone: '+91 484 234 5678', expiresAt: '2027-02-13' },
  { id: '12', name: 'Pioneer Public School', city: 'Lucknow', state: 'Uttar Pradesh', plan: 'starter', students: 420, staff: 31, status: 'trial', joined: '2026-04-08', email: 'pioneer@pps.edu.in', phone: '+91 522 234 5678', expiresAt: '2026-04-22' },
];

export const REVENUE_DATA = [
  { month: 'May', mrr: 280000, year: 2025 },
  { month: 'Jun', mrr: 305000, year: 2025 },
  { month: 'Jul', mrr: 328000, year: 2025 },
  { month: 'Aug', mrr: 312000, year: 2025 },
  { month: 'Sep', mrr: 355000, year: 2025 },
  { month: 'Oct', mrr: 390000, year: 2025 },
  { month: 'Nov', mrr: 418000, year: 2025 },
  { month: 'Dec', mrr: 435000, year: 2025 },
  { month: 'Jan', mrr: 452000, year: 2026 },
  { month: 'Feb', mrr: 461000, year: 2026 },
  { month: 'Mar', mrr: 479000, year: 2026 },
  { month: 'Apr', mrr: 487000, year: 2026 },
];

export const PLAN_DATA = [
  { name: 'Starter', value: 186, color: '#3B82F6' },
  { name: 'Growth', value: 218, color: '#F97316' },
  { name: 'Premium', value: 83, color: '#8B5CF6' },
];

export const ACTIVITY: ActivityEvent[] = [
  { id: '1', type: 'registered', school: 'Little Stars Nursery', detail: 'New school registered on Starter plan', time: '8 min ago' },
  { id: '2', type: 'payment', school: 'Kendriya Vidyalaya No.3', detail: 'Annual Premium renewal — ₹48,000', time: '25 min ago' },
  { id: '3', type: 'trial_started', school: 'Pioneer Public School', detail: 'Trial started — 14 days remaining', time: '1 hr ago' },
  { id: '4', type: 'plan_upgrade', school: 'Navodaya English Medium', detail: 'Upgraded: Starter → Growth', time: '3 hrs ago' },
  { id: '5', type: 'payment', school: 'Vidya Mandir Trust', detail: 'Monthly Growth plan — ₹6,999', time: '5 hrs ago' },
  { id: '6', type: 'suspended', school: 'Bright Future School', detail: 'Suspended due to non-payment', time: 'Yesterday' },
  { id: '7', type: 'expired', school: 'Gyan Jyoti School', detail: 'Subscription expired 89 days ago', time: '2 days ago' },
  { id: '8', type: 'registered', school: 'Sunshine Academy', detail: 'New school registered on Starter plan', time: '3 days ago' },
];
