'use client';

import { useState } from 'react';
import { IndianRupee, Eye } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { cn } from '@/lib/utils';
import { StudentSearch } from './StudentSearch';
import { FeeChecklist } from './FeeChecklist';
import { PaymentModeSelector } from './PaymentMode';
import { ReceiptPreview } from './ReceiptPreview';
import { STUDENT_FEE_ITEMS } from './data';
import type { StudentSearchResult, PaymentMode } from './data';

let receiptCounter = 855;

export default function CollectFeePage() {
  const [student, setStudent] = useState<StudentSearchResult | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [discount, setDiscount] = useState(0);
  const [discountReason, setDiscountReason] = useState('');
  const [lateFeeEnabled, setLateFeeEnabled] = useState(false);
  const [mode, setMode] = useState<PaymentMode>('upi');
  const [chequeData, setChequeData] = useState({ number: '', bank: '', date: '' });
  const [showPreview, setShowPreview] = useState(false);
  const [receiptNo] = useState(() => `RCP-2026-0${++receiptCounter}`);

  const handleStudentSelect = (s: StudentSearchResult | null) => {
    setStudent(s);
    setSelectedIds(new Set());
    setDiscount(0);
    setDiscountReason('');
    setLateFeeEnabled(false);
  };

  const feeItems = student
    ? (STUDENT_FEE_ITEMS[student.id] ?? STUDENT_FEE_ITEMS['default'])
    : [];

  const toggleItem = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selected = feeItems.filter((i) => selectedIds.has(i.id));
  const subtotal = selected.reduce((s, i) => s + i.amount, 0);
  const lateFees = lateFeeEnabled ? selected.filter(i => i.overdue && i.lateFee).reduce((s, i) => s + (i.lateFee ?? 0), 0) : 0;
  const netPayable = Math.max(0, subtotal + lateFees - discount);

  const canCollect = student && selectedIds.size > 0 && netPayable > 0;

  const handleConfirm = () => {
    setShowPreview(false);
    toast.success(`Receipt ${receiptNo} generated — ₹${netPayable.toLocaleString('en-IN')} collected from ${student?.name}`);
    setStudent(null);
    setSelectedIds(new Set());
    setDiscount(0);
    setDiscountReason('');
    setLateFeeEnabled(false);
    setMode('upi');
  };

  return (
    <>
      <Toaster position="top-right" richColors />
      {showPreview && student && (
        <ReceiptPreview
          student={student}
          items={feeItems}
          selectedIds={selectedIds}
          discount={discount}
          discountReason={discountReason}
          lateFeeEnabled={lateFeeEnabled}
          mode={mode}
          receiptNo={receiptNo}
          onClose={() => setShowPreview(false)}
          onConfirm={handleConfirm}
        />
      )}

      <div className="max-w-3xl mx-auto space-y-5 pb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 font-heading">Collect Fee</h1>
          <p className="text-sm text-slate-500 mt-0.5">Search for a student and collect fee payment</p>
        </div>

        <StudentSearch onSelect={handleStudentSelect} selected={student} />

        {student && (
          <>
            <FeeChecklist
              items={feeItems}
              selectedIds={selectedIds}
              onToggle={toggleItem}
              discount={discount}
              discountReason={discountReason}
              lateFeeEnabled={lateFeeEnabled}
              onDiscountChange={setDiscount}
              onDiscountReasonChange={setDiscountReason}
              onLateFeeToggle={() => setLateFeeEnabled((o) => !o)}
            />

            <PaymentModeSelector
              mode={mode}
              netPayable={netPayable}
              onChange={setMode}
              onChequeChange={setChequeData}
              chequeData={chequeData}
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(true)}
                disabled={!canCollect}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-semibold transition-all',
                  canCollect
                    ? 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'border-slate-100 text-slate-300 cursor-not-allowed'
                )}
              >
                <Eye className="w-4 h-4" />
                Preview Receipt
              </button>
              <button
                onClick={() => setShowPreview(true)}
                disabled={!canCollect}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold transition-all shadow-brand-sm',
                  canCollect
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
                )}
              >
                <IndianRupee className="w-4 h-4" />
                Generate Receipt & Collect
                {canCollect && <span className="ml-1 font-black">₹{netPayable.toLocaleString('en-IN')}</span>}
              </button>
            </div>
          </>
        )}

        {!student && (
          <div className="text-center py-16 text-slate-400">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <IndianRupee className="w-8 h-8 text-slate-300" />
            </div>
            <div className="text-base font-semibold text-slate-500 mb-1">Search for a student to begin</div>
            <div className="text-sm">Enter name, roll number, or parent phone number above</div>
          </div>
        )}
      </div>
    </>
  );
}
