'use client';

import { useState } from 'react';
import { X, Search, CircleCheck as CheckCircle2, Receipt } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FEE_TYPES, PAYMENT_MODES } from './data';
import { toast } from 'sonner';

const FEE_AMOUNTS: Record<string, number> = {
  'Tuition Fee': 8500,
  'Transport Fee': 2700,
  'Hostel Fee': 15000,
  'Lab Fee': 2800,
  'Sports Fee': 1800,
};

const MOCK_STUDENTS = [
  { id: '1', name: 'Aarav Sharma', rollNo: 'VIII-A-01', className: 'Class 8-A' },
  { id: '2', name: 'Ananya Reddy', rollNo: 'IX-C-12', className: 'Class 9-C' },
  { id: '3', name: 'Arjun Mehta', rollNo: 'VI-B-03', className: 'Class 6-B' },
  { id: '4', name: 'Priya Nair', rollNo: 'X-A-07', className: 'Class 10-A' },
  { id: '5', name: 'Kiran Kumar', rollNo: 'VII-D-14', className: 'Class 7-D' },
];

interface CollectFeeModalProps {
  onClose: () => void;
}

export function CollectFeeModal({ onClose }: CollectFeeModalProps) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null);
  const [selectedFees, setSelectedFees] = useState<Set<string>>(new Set());
  const [paymentMode, setPaymentMode] = useState<typeof PAYMENT_MODES[number]>('UPI');
  const [submitted, setSubmitted] = useState(false);
  const [receiptNo] = useState(`RCP-2026-${String(Math.floor(Math.random() * 900) + 900)}`);

  const filteredStudents = search.length > 1
    ? MOCK_STUDENTS.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const toggleFee = (fee: string) => {
    setSelectedFees((prev) => {
      const next = new Set(prev);
      next.has(fee) ? next.delete(fee) : next.add(fee);
      return next;
    });
  };

  const total = Array.from(selectedFees).reduce((s, f) => s + (FEE_AMOUNTS[f] ?? 0), 0);

  const handleSubmit = () => {
    if (!selectedStudent) { toast.error('Please select a student'); return; }
    if (selectedFees.size === 0) { toast.error('Please select at least one fee type'); return; }
    setSubmitted(true);
  };

  const MODE_STYLES: Record<typeof PAYMENT_MODES[number], string> = {
    UPI: 'border-violet-300 bg-violet-50 text-violet-700',
    Cash: 'border-slate-300 bg-slate-50 text-slate-700',
    Cheque: 'border-blue-300 bg-blue-50 text-blue-700',
    Online: 'border-green-300 bg-green-50 text-green-700',
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-md animate-scale-in overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 font-heading">Collect Fee</h3>
            <p className="text-xs text-slate-400 mt-0.5">Search student and record payment</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9 text-green-500" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-heading">Payment Recorded!</h4>
            <p className="text-sm text-slate-500 mt-1">{selectedStudent?.name}</p>
            <div className="bg-slate-50 rounded-xl p-4 mt-4 mb-5 space-y-2 text-sm text-left">
              {[
                { label: 'Receipt No', value: receiptNo },
                { label: 'Amount', value: `₹${total.toLocaleString('en-IN')}` },
                { label: 'Mode', value: paymentMode },
                { label: 'Fee Types', value: Array.from(selectedFees).join(', ') },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { toast.success(`Printing ${receiptNo}`); onClose(); }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold shadow-brand-sm transition-all"
              >
                <Receipt className="w-4 h-4" />
                Print Receipt
              </button>
              <button onClick={onClose} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Search Student</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelectedStudent(null); }}
                  placeholder="Name or roll number..."
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:ring-1 focus:ring-orange-100 transition-colors"
                />
              </div>
              {filteredStudents.length > 0 && !selectedStudent && (
                <div className="mt-1 bg-white border border-slate-200 rounded-xl shadow-modal py-1 max-h-36 overflow-y-auto">
                  {filteredStudents.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => { setSelectedStudent(s); setSearch(s.name); }}
                      className="w-full text-left px-3 py-2.5 hover:bg-orange-50 transition-colors"
                    >
                      <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.rollNo} · {s.className}</p>
                    </button>
                  ))}
                </div>
              )}
              {selectedStudent && (
                <div className="mt-2 p-3 bg-green-50 rounded-xl border border-green-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{selectedStudent.name}</p>
                    <p className="text-xs text-slate-500">{selectedStudent.rollNo} · {selectedStudent.className}</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Select Fee Types</label>
              <div className="space-y-2">
                {FEE_TYPES.map((fee) => (
                  <label
                    key={fee}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-150',
                      selectedFees.has(fee) ? 'border-orange-300 bg-orange-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedFees.has(fee)}
                        onChange={() => toggleFee(fee)}
                        className="w-4 h-4 rounded border-slate-300 accent-orange-500"
                      />
                      <span className="text-sm font-medium text-slate-700">{fee}</span>
                    </div>
                    <span className={cn('text-sm font-bold tabular-nums', selectedFees.has(fee) ? 'text-orange-600' : 'text-slate-600')}>
                      ₹{FEE_AMOUNTS[fee].toLocaleString('en-IN')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {selectedFees.size > 0 && (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-sm font-medium text-slate-600">Total Amount</span>
                <span className="text-lg font-bold text-slate-900 font-heading tabular-nums">₹{total.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Payment Mode</label>
              <div className="grid grid-cols-2 gap-2">
                {PAYMENT_MODES.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={cn(
                      'py-2.5 rounded-xl border text-sm font-semibold transition-all duration-150',
                      paymentMode === mode ? MODE_STYLES[mode] : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-semibold shadow-brand-sm hover:shadow-brand transition-all"
              >
                <Receipt className="w-4 h-4" />
                Generate Receipt
                {total > 0 && <span className="font-bold">· ₹{total.toLocaleString('en-IN')}</span>}
              </button>
              <button onClick={onClose} className="px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
