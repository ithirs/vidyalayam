export type MessageType = 'announcement' | 'fee_reminder' | 'event' | 'emergency';
export type Channel = 'whatsapp' | 'sms' | 'both' | 'push';
export type DeliveryStatus = 'sent' | 'failed' | 'pending';
export type NoticeCategory = 'academic' | 'events' | 'fee' | 'holiday' | 'sports' | 'general';

export interface MessageRecord {
  id: string;
  date: string;
  type: MessageType;
  sentTo: string;
  preview: string;
  channel: Channel;
  totalRecipients: number;
  delivered: number;
  failed: number;
  status: DeliveryStatus;
  cost: number;
}

export interface Notice {
  id: string;
  title: string;
  body: string;
  category: NoticeCategory;
  postedBy: string;
  postedAt: string;
  expiresAt: string;
  audience: string;
  pinned: boolean;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  audience: string;
  color: string;
  image?: string;
}

export const MESSAGE_TEMPLATES: Record<MessageType, { title: string; body: string }[]> = {
  announcement: [
    { title: 'School Reopening',     body: 'Dear Parent, School will reopen on {{date}}. Kindly ensure {{student_name}} is present on time. Regards, Principal.' },
    { title: 'Parent-Teacher Meet', body: 'Dear Parent, PTM is scheduled on {{date}}. Please attend to discuss {{student_name}}\'s progress. Time: 10 AM - 1 PM.' },
  ],
  fee_reminder: [
    { title: 'Fee Due Reminder',     body: 'Dear Parent, Fee of ₹{{fee_amount}} for {{student_name}} is due on {{date}}. Pay online at school portal or visit the office.' },
    { title: 'Fee Overdue',          body: 'Dear Parent, Fee of ₹{{fee_amount}} for {{student_name}} is overdue. Late fine applies after {{date}}. Please pay immediately.' },
  ],
  event: [
    { title: 'Annual Day Invite',    body: 'Dear Parent, You are cordially invited to our Annual Day on {{date}} at 5 PM. {{student_name}} is participating. Do join us!' },
    { title: 'Sports Day',          body: 'Dear Parent, Sports Day is on {{date}}. {{student_name}} is participating. Arrive by 8:30 AM. Refreshments provided.' },
  ],
  emergency: [
    { title: 'School Closed',       body: 'URGENT: School is closed tomorrow {{date}} due to unforeseen circumstances. Classes will resume as notified. Stay safe.' },
    { title: 'Early Dismissal',     body: 'Dear Parent, School will close early today at 12 PM. Please arrange to pick up {{student_name}} promptly. Thank you.' },
  ],
};

export const MESSAGE_HISTORY: MessageRecord[] = [
  { id: 'm1', date: '2026-04-11T10:30', type: 'fee_reminder',  sentTo: 'All Classes',     preview: 'Dear Parent, Fee of ₹4500 for your ward is due on April 15th...',     channel: 'both',      totalRecipients: 847, delivered: 845, failed: 2, status: 'sent',    cost: 169  },
  { id: 'm2', date: '2026-04-10T09:00', type: 'announcement',  sentTo: 'Classes 9 & 10',  preview: 'Board exam preparation schedule has been updated. Please check...',     channel: 'whatsapp',  totalRecipients: 320, delivered: 318, failed: 2, status: 'sent',    cost: 0    },
  { id: 'm3', date: '2026-04-09T14:00', type: 'event',         sentTo: 'All Classes',     preview: 'Annual Day celebrations will be held on April 20th at 5 PM...',       channel: 'sms',       totalRecipients: 847, delivered: 801, failed: 46, status: 'sent',   cost: 169  },
  { id: 'm4', date: '2026-04-08T08:00', type: 'emergency',     sentTo: 'All Classes',     preview: 'School is closed tomorrow due to heavy rainfall advisory...',          channel: 'both',      totalRecipients: 847, delivered: 843, failed: 4, status: 'sent',    cost: 169  },
  { id: 'm5', date: '2026-04-05T11:00', type: 'announcement',  sentTo: 'Class 12',        preview: 'Practical exams schedule for Class 12 has been announced...',          channel: 'whatsapp',  totalRecipients: 68,  delivered: 65,  failed: 3, status: 'sent',    cost: 0    },
  { id: 'm6', date: '2026-04-04T16:00', type: 'fee_reminder',  sentTo: 'Defaulters',      preview: 'This is a reminder that your ward\'s fee is still outstanding...',    channel: 'sms',       totalRecipients: 42,  delivered: 0,   failed: 42, status: 'failed',  cost: 0    },
  { id: 'm7', date: '2026-04-03T09:30', type: 'announcement',  sentTo: 'All Staff',       preview: 'Staff meeting scheduled for April 5th at 3 PM in the conference...',  channel: 'push',      totalRecipients: 38,  delivered: 36,  failed: 2, status: 'pending', cost: 0    },
];

export const NOTICES: Notice[] = [
  { id: 'n1', title: 'Annual Day Preparations',        body: 'All students participating in the Annual Day must attend rehearsals every day from April 14 onwards. Contact class teacher for details.',  category: 'events',   postedBy: 'Principal',       postedAt: '2026-04-10', expiresAt: '2026-04-22', audience: 'All Classes', pinned: true  },
  { id: 'n2', title: 'Term 1 Exam Schedule Released',  body: 'The Term 1 examination schedule for Classes 6–10 has been released. Students are advised to prepare accordingly.',                        category: 'academic', postedBy: 'Exam Cell',       postedAt: '2026-04-09', expiresAt: '2026-04-30', audience: 'Classes 6–10', pinned: true  },
  { id: 'n3', title: 'Fee Due Reminder – April',       body: 'Annual fee for the academic year 2025-26 is due by April 15. Late fee of ₹50/day applies after the due date.',                          category: 'fee',      postedBy: 'Accounts',        postedAt: '2026-04-08', expiresAt: '2026-04-20', audience: 'All Classes', pinned: false },
  { id: 'n4', title: 'School Holiday – Ramzan',        body: 'School will remain closed on April 14 (Ramzan) and April 15 (Telangana Formation Day). Classes resume April 16.',                      category: 'holiday',  postedBy: 'Admin',           postedAt: '2026-04-07', expiresAt: '2026-04-16', audience: 'All Classes', pinned: false },
  { id: 'n5', title: 'Inter-School Sports Meet',       body: 'Our school is hosting the Inter-School Sports Meet on April 18. Students selected for events should report by 7 AM.',                   category: 'sports',   postedBy: 'Sports Dept',     postedAt: '2026-04-06', expiresAt: '2026-04-19', audience: 'All Classes', pinned: false },
  { id: 'n6', title: 'Library Books Due Date',         body: 'All borrowed library books must be returned by April 18. Fine of ₹2/day applies for overdue books.',                                    category: 'general',  postedBy: 'Librarian',       postedAt: '2026-04-05', expiresAt: '2026-04-20', audience: 'All Classes', pinned: false },
];

export const EVENTS: SchoolEvent[] = [
  { id: 'e1', title: 'Annual Day',             date: '2026-04-20', time: '05:00 PM', description: 'Grand annual celebration with cultural performances, prize distribution, and parent gathering.',            audience: 'All Classes',  color: 'bg-orange-500'  },
  { id: 'e2', title: 'Parent-Teacher Meeting', date: '2026-04-22', time: '10:00 AM', description: 'PTM for Classes 6–10. Parents will meet subject teachers to discuss academic progress.',                   audience: 'Classes 6–10', color: 'bg-blue-500'    },
  { id: 'e3', title: 'Inter-School Sports',    date: '2026-04-18', time: '08:00 AM', description: 'Annual inter-school sports meet hosted at our campus. Multiple events across age groups.',                 audience: 'All Classes',  color: 'bg-green-500'   },
  { id: 'e4', title: 'Science Exhibition',     date: '2026-04-25', time: '09:00 AM', description: 'Students from Classes 8–12 present science projects. Parents and public are invited.',                    audience: 'Classes 8–12', color: 'bg-teal-500'    },
  { id: 'e5', title: 'Board Exam Begins',      date: '2026-04-28', time: '09:00 AM', description: 'Class 10 Board Examinations commence. Hall tickets already distributed. Follow exam guidelines.',          audience: 'Class 10',     color: 'bg-red-500'     },
  { id: 'e6', title: 'Gandhi Jayanti',         date: '2026-10-02', time: '09:00 AM', description: 'School-wide Gandhi Jayanti celebrations with cultural programs and essay competitions.',                   audience: 'All Classes',  color: 'bg-amber-500'   },
];

export const CLASSES = ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'];

export const MSG_TYPE_CONFIG: Record<MessageType, { label: string; color: string; bg: string }> = {
  announcement: { label: 'Announcement',  color: 'text-blue-700',   bg: 'bg-blue-100'   },
  fee_reminder: { label: 'Fee Reminder',  color: 'text-orange-700', bg: 'bg-orange-100' },
  event:        { label: 'Event',         color: 'text-green-700',  bg: 'bg-green-100'  },
  emergency:    { label: 'Emergency',     color: 'text-red-700',    bg: 'bg-red-100'    },
};

export const NOTICE_CATEGORY_CONFIG: Record<NoticeCategory, { label: string; color: string }> = {
  academic: { label: 'Academic', color: 'bg-blue-100 text-blue-700'   },
  events:   { label: 'Events',   color: 'bg-orange-100 text-orange-700'},
  fee:      { label: 'Fee',      color: 'bg-amber-100 text-amber-700'  },
  holiday:  { label: 'Holiday',  color: 'bg-green-100 text-green-700'  },
  sports:   { label: 'Sports',   color: 'bg-teal-100 text-teal-700'    },
  general:  { label: 'General',  color: 'bg-slate-100 text-slate-700'  },
};
