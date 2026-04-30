export interface ClassSection {
  id: string;
  name: string;
  sections: string[];
  students: number;
  classTeacher: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  type: 'theory' | 'practical' | 'both';
  classes: string[];
  teacher: string;
}

export interface StaffUser {
  id: string;
  name: string;
  role: 'teacher' | 'accountant' | 'receptionist' | 'librarian' | 'admin';
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  avatarInitials: string;
  avatarColor: string;
}

export const CLASS_SECTIONS: ClassSection[] = [
  { id: 'c1', name: 'Class 1',  sections: ['A', 'B'],       students: 60,  classTeacher: 'Mrs. Latha Rao'      },
  { id: 'c2', name: 'Class 2',  sections: ['A', 'B'],       students: 62,  classTeacher: 'Mrs. Sunita Das'      },
  { id: 'c3', name: 'Class 3',  sections: ['A', 'B', 'C'],  students: 90,  classTeacher: 'Mr. Ramesh Iyer'      },
  { id: 'c4', name: 'Class 4',  sections: ['A', 'B', 'C'],  students: 88,  classTeacher: 'Mrs. Priya Mehta'     },
  { id: 'c5', name: 'Class 5',  sections: ['A', 'B'],       students: 74,  classTeacher: 'Mr. Vikram Singh'     },
  { id: 'c6', name: 'Class 6',  sections: ['A', 'B', 'C'],  students: 120, classTeacher: 'Mrs. Ananya Reddy'    },
  { id: 'c7', name: 'Class 7',  sections: ['A', 'B', 'C'],  students: 118, classTeacher: 'Mr. Arjun Kapoor'     },
  { id: 'c8', name: 'Class 8',  sections: ['A', 'B'],       students: 80,  classTeacher: 'Mrs. Meera Joshi'     },
  { id: 'c9', name: 'Class 9',  sections: ['A', 'B'],       students: 82,  classTeacher: 'Mr. Dev Sharma'       },
  { id: 'c10',name: 'Class 10', sections: ['A', 'B'],       students: 78,  classTeacher: 'Mrs. Kavya Menon'     },
  { id: 'c11',name: 'Class 11', sections: ['A', 'B'],       students: 70,  classTeacher: 'Mr. Nikhil Gupta'     },
  { id: 'c12',name: 'Class 12', sections: ['A', 'B'],       students: 68,  classTeacher: 'Mrs. Trisha Kapoor'   },
];

export const SUBJECTS: Subject[] = [
  { id: 's1', name: 'Mathematics',     code: 'MATH', type: 'theory',    classes: ['Class 6','Class 7','Class 8','Class 9','Class 10'], teacher: 'Mr. Arjun Kapoor'   },
  { id: 's2', name: 'Science',         code: 'SCI',  type: 'both',      classes: ['Class 6','Class 7','Class 8','Class 9','Class 10'], teacher: 'Mrs. Meera Joshi'   },
  { id: 's3', name: 'English',         code: 'ENG',  type: 'theory',    classes: ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'], teacher: 'Mrs. Kavya Menon'   },
  { id: 's4', name: 'Hindi',           code: 'HIN',  type: 'theory',    classes: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8'], teacher: 'Mrs. Priya Mehta'   },
  { id: 's5', name: 'Telugu',          code: 'TEL',  type: 'theory',    classes: ['Class 1','Class 2','Class 3','Class 4','Class 5','Class 6','Class 7','Class 8'], teacher: 'Mr. Ramesh Iyer'    },
  { id: 's6', name: 'Social Studies',  code: 'SST',  type: 'theory',    classes: ['Class 6','Class 7','Class 8','Class 9','Class 10'], teacher: 'Mrs. Ananya Reddy'  },
  { id: 's7', name: 'Computer Science',code: 'CS',   type: 'both',      classes: ['Class 6','Class 7','Class 8','Class 9','Class 10','Class 11','Class 12'], teacher: 'Mr. Dev Sharma'     },
  { id: 's8', name: 'Physics',         code: 'PHY',  type: 'both',      classes: ['Class 11','Class 12'],                              teacher: 'Mr. Nikhil Gupta'   },
  { id: 's9', name: 'Chemistry',       code: 'CHEM', type: 'both',      classes: ['Class 11','Class 12'],                              teacher: 'Mrs. Trisha Kapoor' },
  { id: 's10',name: 'Biology',         code: 'BIO',  type: 'both',      classes: ['Class 11','Class 12'],                              teacher: 'Mrs. Latha Rao'     },
];

export const STAFF_USERS: StaffUser[] = [
  { id: 'u1', name: 'Arjun Kapoor',   role: 'teacher',      email: 'arjun.k@school.edu',    phone: '9876543210', status: 'active',   lastLogin: '2026-04-12T08:30', avatarInitials: 'AK', avatarColor: 'bg-blue-100 text-blue-600'    },
  { id: 'u2', name: 'Meera Joshi',    role: 'teacher',      email: 'meera.j@school.edu',    phone: '9876543211', status: 'active',   lastLogin: '2026-04-12T07:45', avatarInitials: 'MJ', avatarColor: 'bg-green-100 text-green-600'  },
  { id: 'u3', name: 'Priya Mehta',    role: 'accountant',   email: 'priya.m@school.edu',    phone: '9876543212', status: 'active',   lastLogin: '2026-04-11T17:20', avatarInitials: 'PM', avatarColor: 'bg-orange-100 text-orange-600'},
  { id: 'u4', name: 'Dev Sharma',     role: 'teacher',      email: 'dev.s@school.edu',      phone: '9876543213', status: 'active',   lastLogin: '2026-04-12T09:00', avatarInitials: 'DS', avatarColor: 'bg-teal-100 text-teal-600'    },
  { id: 'u5', name: 'Kavya Menon',    role: 'receptionist', email: 'kavya.m@school.edu',    phone: '9876543214', status: 'active',   lastLogin: '2026-04-12T08:00', avatarInitials: 'KM', avatarColor: 'bg-rose-100 text-rose-600'    },
  { id: 'u6', name: 'Nikhil Gupta',   role: 'teacher',      email: 'nikhil.g@school.edu',   phone: '9876543215', status: 'inactive', lastLogin: '2026-03-28T14:30', avatarInitials: 'NG', avatarColor: 'bg-amber-100 text-amber-600'  },
  { id: 'u7', name: 'Trisha Kapoor',  role: 'librarian',    email: 'trisha.k@school.edu',   phone: '9876543216', status: 'active',   lastLogin: '2026-04-11T12:00', avatarInitials: 'TK', avatarColor: 'bg-cyan-100 text-cyan-600'    },
  { id: 'u8', name: 'Ramesh Iyer',    role: 'teacher',      email: 'ramesh.i@school.edu',   phone: '9876543217', status: 'active',   lastLogin: '2026-04-10T16:45', avatarInitials: 'RI', avatarColor: 'bg-lime-100 text-lime-600'    },
];

export const ROLE_CONFIG: Record<StaffUser['role'], { label: string; color: string }> = {
  admin:        { label: 'Admin',        color: 'bg-red-100 text-red-700'      },
  teacher:      { label: 'Teacher',      color: 'bg-blue-100 text-blue-700'    },
  accountant:   { label: 'Accountant',   color: 'bg-orange-100 text-orange-700'},
  receptionist: { label: 'Receptionist', color: 'bg-teal-100 text-teal-700'   },
  librarian:    { label: 'Librarian',    color: 'bg-purple-100 text-purple-700'},
};
