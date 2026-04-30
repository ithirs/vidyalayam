import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Vidyalaya Privacy Policy — how we collect, use and protect your data.',
};

const sections = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide when registering your school, including school name, address, contact details and the names and details of students, staff and parents entered by school administrators. We also collect usage data such as pages visited, features used and login timestamps to improve the platform.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use your information solely to provide and improve the Vidyalaya school management platform. This includes sending transactional notifications (attendance alerts, fee receipts, exam results) as configured by the school. We do not use student or parent data for marketing purposes.`,
  },
  {
    title: '3. Data Storage & Security',
    content: `All data is stored on servers located in India (AWS Mumbai region). Data is encrypted in transit using TLS 1.3 and at rest using AES-256. We perform daily automated backups with 30-day retention. Access to production data is restricted to authorized personnel only.`,
  },
  {
    title: '4. Data Sharing',
    content: `We do not sell, rent or share your data with any third party for commercial purposes. We share data only with trusted service providers (e.g., SMS gateway, payment processor) strictly to deliver the services you have subscribed to, under data processing agreements.`,
  },
  {
    title: '5. DPDP Compliance',
    content: `Vidyalaya is compliant with India's Digital Personal Data Protection Act, 2023 (DPDP Act). We process personal data only with consent and for specified purposes. School administrators acting as data fiduciaries are responsible for obtaining appropriate consents from parents and staff.`,
  },
  {
    title: '6. Data Retention',
    content: `We retain your school's data for as long as your subscription is active plus 90 days after termination, during which you may export your data. After this period, data is securely deleted. You may request earlier deletion by contacting our support team.`,
  },
  {
    title: '7. Your Rights',
    content: `You have the right to access, correct or delete personal data held about your school or its members. You may exercise these rights by contacting us at privacy@vidyalaya.in. We will respond within 30 days.`,
  },
  {
    title: '8. Cookies',
    content: `We use essential cookies required for the platform to function (authentication, session management). We do not use third-party advertising or tracking cookies. You may disable non-essential cookies in your browser settings.`,
  },
  {
    title: '9. Changes to This Policy',
    content: `We may update this policy from time to time. We will notify registered school administrators by email at least 14 days before any material changes take effect. Continued use of the platform after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact',
    content: `For privacy-related queries, write to privacy@vidyalaya.in or contact us at our registered office: Vidyalaya Technologies Pvt. Ltd., Hitech City, Hyderabad, Telangana 500081, India.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="page-container max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Legal</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500">Last updated: December 1, 2024</p>
        </div>
      </section>
      <section className="py-16">
        <div className="page-container max-w-3xl mx-auto">
          <p className="text-slate-600 leading-relaxed mb-10">
            Vidyalaya Technologies Pvt. Ltd. ("Vidyalaya", "we", "us", "our") operates the Vidyalaya School ERP platform. This Privacy Policy explains how we collect, use, share and protect the personal data of schools, students, staff and parents who use our platform.
          </p>
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title} className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h2 className="font-heading font-semibold text-slate-900 mb-3">{section.title}</h2>
                <p className="text-slate-600 text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
