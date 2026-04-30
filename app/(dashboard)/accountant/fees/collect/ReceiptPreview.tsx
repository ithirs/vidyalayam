'use client';

import { X, Printer, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StudentSearchResult, FeeItem, PaymentMode } from './data';

function toWords(n: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  if (n === 0) return 'Zero';
  if (n < 20) return ones[n];
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '');
  if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' + toWords(n % 100) : '');
  if (n < 100000) return toWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 ? ' ' + toWords(n % 1000) : '');
  if (n < 10000000) return toWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 ? ' ' + toWords(n % 100000) : '');
  return toWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 ? ' ' + toWords(n % 10000000) : '');
}

const MODE_LABELS: Record<PaymentMode, string> = {
  cash: 'Cash',
  upi: 'UPI',
  card: 'Credit/Debit Card',
  cheque: 'Cheque',
  online: 'Online Transfer',
};

interface Props {
  student: StudentSearchResult;
  items: FeeItem[];
  selectedIds: Set<string>;
  discount: number;
  discountReason: string;
  lateFeeEnabled: boolean;
  mode: PaymentMode;
  receiptNo: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReceiptPreview({
  student, items, selectedIds, discount, discountReason, lateFeeEnabled,
  mode, receiptNo, onClose, onConfirm,
}: Props) {
  const selected = items.filter((i) => selectedIds.has(i.id));
  const subtotal = selected.reduce((s, i) => s + i.amount, 0);
  const lateFees = lateFeeEnabled ? selected.filter(i => i.overdue && i.lateFee).reduce((s, i) => s + (i.lateFee ?? 0), 0) : 0;
  const netPayable = Math.max(0, subtotal + lateFees - discount);
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <h2 className="font-bold text-slate-900 font-heading">Receipt Preview</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-6xl font-black text-green-500/10 rotate-[-30deg] tracking-widest">PAID</span>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white font-black text-lg">V</div>
                <div>
                  <div className="font-black text-lg font-heading leading-tight">Sri Sai High School</div>
                  <div className="text-orange-100 text-xs">CBSE Affiliated · Hyderabad, Telangana</div>
                </div>
              </div>
            </div>

            <div className="px-6 pt-4 pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Receipt No.</div>
                  <div className="font-bold text-slate-900 font-heading">{receiptNo}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Date</div>
                  <div className="font-semibold text-slate-700 text-sm">{today}</div>
                </div>
              </div>
            </div>

            <div className="mx-6 border-t border-dashed border-slate-200 my-3" />

            <div className="px-6 pb-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Student Name</div>
                <div className="text-sm font-semibold text-slate-800">{student.name}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Admission No.</div>
                <div className="text-sm font-semibold text-slate-800">{student.admissionNo}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Class</div>
                <div className="text-sm font-semibold text-slate-800">{student.className}-{student.section}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Roll No.</div>
                <div className="text-sm font-semibold text-slate-800">{student.rollNo}</div>
              </div>
            </div>

            <div className="mx-6 border-t border-dashed border-slate-200 my-3" />

            <div className="px-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Description</th>
                    <th className="text-right py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {selected.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2.5 text-slate-700">
                        <div>{item.label}</div>
                        <div className="text-xs text-slate-400">{item.period}</div>
                      </td>
                      <td className="py-2.5 text-right font-medium text-slate-800">₹{item.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                  {lateFeeEnabled && lateFees > 0 && (
                    <tr>
                      <td className="py-2.5 text-red-600 text-sm">Late Fee</td>
                      <td className="py-2.5 text-right font-medium text-red-600">₹{lateFees.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  {discount > 0 && (
                    <tr>
                      <td className="py-2.5 text-green-600 text-sm">Discount ({discountReason || 'Applied'})</td>
                      <td className="py-2.5 text-right font-medium text-green-600">-₹{discount.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200">
                    <td className="pt-3 pb-2 font-black text-slate-900 font-heading text-base">Total Paid</td>
                    <td className="pt-3 pb-2 text-right font-black text-orange-600 font-heading text-lg">₹{netPayable.toLocaleString('en-IN')}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mx-6 border-t border-dashed border-slate-200 my-3" />

            <div className="px-6 pb-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Payment Mode</div>
                <div className="text-sm font-semibold text-slate-800">{MODE_LABELS[mode]}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wide">Amount in Words</div>
                <div className="text-xs font-medium text-slate-700 leading-snug">{toWords(netPayable)} Rupees Only</div>
              </div>
            </div>

            <div className="mx-6 border-t border-slate-100 my-3" />

            <div className="px-6 pb-5 flex items-end justify-between">
              <div className="text-[10px] text-slate-400">
                <div>This is a computer-generated receipt.</div>
                <div>No signature required.</div>
              </div>
              <div className="text-right">
                <div className="w-24 border-t border-slate-300 mb-1" />
                <div className="text-[10px] text-slate-400">Authorized Signature</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3 sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Edit
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            <Printer className="w-4 h-4" />
            Collect & Print
          </button>
        </div>
      </div>
    </div>
  );
}
