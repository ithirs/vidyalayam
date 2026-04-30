import type { Metadata } from 'next';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://vidyalaya.in'),
  title: {
    default: 'Vidyalaya - School Management Software India | School ERP',
    template: '%s | Vidyalaya School ERP',
  },
  description:
    "Vidyalaya is India's most affordable school management software. Manage students, attendance, fees, exams in Telugu, Hindi & English. Starting ₹499/month.",
  keywords: [
    'school management software india',
    'school ERP',
    'school automation',
    'vidyalaya ERP',
    'school software andhra pradesh',
    'school fee management',
    'attendance management software',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vidyalaya.in',
    siteName: 'Vidyalaya School ERP',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@vidyalayaerp',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
