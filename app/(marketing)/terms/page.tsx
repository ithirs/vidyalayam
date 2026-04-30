import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Vidyalaya Terms of Service — the agreement between your school and Vidyalaya Technologies.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: `By registering for or using the Vidyalaya platform, you agree to be bound by these Terms of Service. If you are registering on behalf of a school or institution, you represent that you have authority to bind that entity to these terms.`,
  },
  {
    title: '2. Subscription & Payment',
    content: `Vidyalaya is a subscription-based service. Your subscription begins on the date you register and renews monthly or annually as selected. Payment is due in advance. We accept UPI, debit/credit cards and net banking. In the event of non-payment, access may be suspended after a 7-day grace period.`,
  },
  {
    title: '3. Free Trial',
    content: `New accounts include a 14-day free trial with full access to all features of the selected plan. No credit card is required to start the trial. At the end of the trial period, you may subscribe to continue using the platform. Trial data is retained for 30 days after trial expiry.`,
  },
  {
    title: '4. Acceptable Use',
    content: `You agree to use the platform only for lawful purposes related to school management. You must not misuse the platform to send unsolicited communications, upload malicious software, violate the privacy of any individual, or circumvent any security measures. Vidyalaya reserves the right to terminate accounts that violate these conditions.`,
  },
  {
    title: '5. Data Ownership',
    content: `All data you enter into the Vidyalaya platform — student records, fee data, attendance, results — remains your property at all times. We act as a data processor on your behalf. You retain the right to export your data at any time. See our Privacy Policy for more details on data handling.`,
  },
  {
    title: '6. Uptime & Service Levels',
    content: `We target 99.9% platform availability, excluding scheduled maintenance windows (communicated in advance). In the event of unplanned downtime exceeding 1 hour in any calendar month, we will provide service credits at our discretion. We do not guarantee specific response times for all operations.`,
  },
  {
    title: '7. Intellectual Property',
    content: `All software, design, branding and content on the Vidyalaya platform are the intellectual property of Vidyalaya Technologies Pvt. Ltd. You are granted a limited, non-transferable license to use the platform for its intended purpose. You may not copy, reverse-engineer or resell any part of the platform.`,
  },
  {
    title: '8. Limitation of Liability',
    content: `Vidyalaya's total liability to you for any claim arising out of or related to these terms or the platform shall not exceed the amount you paid in the 3 months prior to the event giving rise to the claim. We are not liable for indirect, incidental or consequential damages.`,
  },
  {
    title: '9. Cancellation & Termination',
    content: `You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period. We do not offer refunds for unused portions of a subscription period. We reserve the right to terminate accounts that violate these terms with immediate effect.`,
  },
  {
    title: '10. Governing Law',
    content: `These terms are governed by the laws of India. Any disputes arising out of these terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.`,
  },
  {
    title: '11. Changes to Terms',
    content: `We may update these terms from time to time. We will notify you at least 14 days before material changes take effect. Continued use of the platform after the effective date constitutes acceptance.`,
  },
  {
    title: '12. Contact',
    content: `For questions about these terms, contact legal@vidyalaya.in or write to Vidyalaya Technologies Pvt. Ltd., Hitech City, Hyderabad, Telangana 500081, India.`,
  },
];

export default function TermsPage() {
  return (
    <div className="bg-white">
      <section className="bg-slate-50 py-16 border-b border-slate-200">
        <div className="page-container max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-widest mb-4">Legal</div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500">Last updated: December 1, 2024</p>
        </div>
      </section>
      <section className="py-16">
        <div className="page-container max-w-3xl mx-auto">
          <p className="text-slate-600 leading-relaxed mb-10">
            These Terms of Service ("Terms") govern your access to and use of the Vidyalaya school management platform provided by Vidyalaya Technologies Pvt. Ltd. Please read these terms carefully before using the platform.
          </p>
          <div className="space-y-6">
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
