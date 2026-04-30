import { z } from 'zod';

export const step1Schema = z.object({
  schoolName: z.string().min(3, 'School name must be at least 3 characters'),
  schoolType: z.enum(['primary', 'secondary', 'higher_secondary', 'all_levels'], {
    required_error: 'Please select a school type',
  }),
  board: z.enum(['cbse', 'icse', 'state_board', 'others'], {
    required_error: 'Please select a board',
  }),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  district: z.string().min(2, 'District is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  schoolEmail: z.string().email('Enter a valid email address'),
  website: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  establishedYear: z
    .string()
    .regex(/^\d{4}$/, 'Enter a valid 4-digit year')
    .optional()
    .or(z.literal('')),
  logoUrl: z.string().optional(),
});

export const step2Schema = z
  .object({
    adminName: z.string().min(2, 'Admin name must be at least 2 characters'),
    adminEmail: z.string().email('Enter a valid email address'),
    adminPhone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    language: z.enum(['en', 'hi', 'te']),
    profilePhoto: z.string().optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const step3Schema = z.object({
  plan: z.enum(['starter', 'growth', 'pro']),
});

export type Step1Data = z.infer<typeof step1Schema>;
export type Step2Data = z.infer<typeof step2Schema>;
export type Step3Data = z.infer<typeof step3Schema>;

export type FormData = Step1Data & Step2Data & Step3Data;
