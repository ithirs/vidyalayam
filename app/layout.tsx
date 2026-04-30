import './globals.css';
import type { Metadata } from 'next';
import { inter, plusJakartaSans } from '@/lib/fonts';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: {
    default: 'Vidyalaya - School Automation SaaS',
    template: '%s | Vidyalaya',
  },
  description:
    "Andhra's first mobile-first school ERP in Telugu, Hindi & English. Automate admissions, attendance, fees, exams, and parent communication — built for ease, speed, and affordability.",
  keywords: [
    'school management software',
    'school ERP India',
    'school automation',
    'attendance management',
    'fee management',
    'school SaaS',
    'Andhra Pradesh school software',
    'Telugu school ERP',
  ],
  authors: [{ name: 'Vidyalaya' }],
  creator: 'Vidyalaya',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Vidyalaya - School Automation SaaS',
    description:
      "India's most affordable school ERP — mobile-first, multi-lingual, zero IT staff needed.",
    siteName: 'Vidyalaya',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vidyalaya - School Automation SaaS',
    description:
      "India's most affordable school ERP — mobile-first, multi-lingual, zero IT staff needed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#F97316" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground min-h-screen">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: 'font-sans',
            },
          }}
        />
      </body>
    </html>
  );
}
