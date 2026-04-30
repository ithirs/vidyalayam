'use client';

import { X, Printer, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Receipt } from './data';

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

interface Props {
  receipt: Receipt;
  onClose: () => void;
}

export function ReceiptViewModal({ receipt, onClose }: Props) {
  const subtotal = receipt.items.reduce((s, i) => s + i.amount, 0);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-slate-900 font-heading">Receipt</h2>
            <span className={cn(
              'text-xs font-bold px-2 py-0.5 rounded-full',
              receipt.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            )}>
              {receipt.status === 'valid' ? 'Valid' : 'Cancelled'}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5">
          <div className="border-2 border-slate-200 rounded-xl overflow-hidden relative">
            {receipt.status === 'valid' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span className="text-6xl font-black text-green-500/10 rotate-[-30deg] tracking-widest">PAID</span>
              </div>
            )}
            {receipt.status === 'cancelled' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
                <span className="text-5xl font-black text-red-500/15 rotate-[-30deg] tracking-widest">CANCELLED</span>
              </div>
            )}

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white font-black text-lg">V</div>
                <div>
                  <div className="font-black text-lg font-heading leading-tight">Sri Sai High School</div>
                  <div className="text-orange-100 text-xs">CBSE Affiliated · Hyderabad, Telangana · Estd. 1998</div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="px-6 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Receipt No.</div>
                    <div className="font-bold text-slate-900 font-heading">{receipt.receiptNo}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">Date</div>
                    <div className="font-semibold text-slate-700 text-sm">
                      {new Date(receipt.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-6 border-t border-dashed border-slate-200 my-3" />

              <div className="px-6 pb-3 grid grid-cols-2 gap-x-6 gap-y-1.5">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Student Name</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.studentName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Admission No.</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.admissionNo}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Class</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.studentClass}-{receipt.studentSection}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Roll No.</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.rollNo}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Parent Name</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.parentName}</div>
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
                    {receipt.items.map((item, i) => (
                      <tr key={i}>
                        <td className="py-2.5 text-slate-700">
                          <div>{item.label}</div>
                          <div className="text-xs text-slate-400">{item.period}</div>
                        </td>
                        <td className="py-2.5 text-right font-medium text-slate-800">₹{item.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    {receipt.lateFee && (
                      <tr>
                        <td className="py-2.5 text-red-600">Late Fee</td>
                        <td className="py-2.5 text-right font-medium text-red-600">₹{receipt.lateFee.toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                    {receipt.discount && (
                      <tr>
                        <td className="py-2.5 text-green-600">Discount {receipt.discountReason ? `(${receipt.discountReason})` : ''}</td>
                        <td className="py-2.5 text-right font-medium text-green-600">-₹{receipt.discount.toLocaleString('en-IN')}</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-200">
                      <td className="pt-3 pb-2 font-black text-slate-900 font-heading text-base">Total Paid</td>
                      <td className="pt-3 pb-2 text-right font-black text-orange-600 font-heading text-lg">₹{receipt.amount.toLocaleString('en-IN')}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mx-6 border-t border-dashed border-slate-200 my-3" />

              <div className="px-6 pb-3 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Payment Mode</div>
                  <div className="text-sm font-semibold text-slate-800">{receipt.mode}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wide">Amount in Words</div>
                  <div className="text-xs font-medium text-slate-700 leading-snug">{toWords(receipt.amount)} Rupees Only</div>
                </div>
              </div>

              {receipt.status === 'cancelled' && receipt.cancelReason && (
                <div className="mx-6 mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <div className="text-xs font-semibold text-red-700 mb-0.5">Cancellation Reason</div>
                  <div className="text-sm text-red-600">{receipt.cancelReason}</div>
                </div>
              )}

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
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center gap-3 sticky bottom-0 bg-white">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            Close
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors shadow-brand-sm">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
