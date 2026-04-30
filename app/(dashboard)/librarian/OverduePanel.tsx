'use client';

import { useState } from 'react';
import { TriangleAlert as AlertTriangle, MessageCircle, Phone, IndianRupee, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ISSUED_BOOKS } from './data';
import { toast } from 'sonner';

const FINE_PER_DAY = 2;

interface FineModalProps {
  studentName: string;
  bookTitle: string;
  daysOverdue: number;
  onClose: () => void;
}

function FineModal({ studentName, bookTitle, daysOverdue, onClose }: FineModalProps) {
  const fine = daysOverdue * FINE_PER_DAY;
  const [collected, setCollected] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-bold text-slate-900 font-heading">Fine Calculation</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"><X className="w-4 h-4" /></button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 space-y-2.5 mb-4 border border-slate-100">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Student</span>
            <span className="font-semibold text-slate-800">{studentName}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Book</span>
            <span className="font-semibold text-slate-800 text-right max-w-[140px] line-clamp-1">{bookTitle}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Days Overdue</span>
            <span className="font-bold text-red-600">{daysOverdue} days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Rate</span>
            <span className="text-slate-600">₹{FINE_PER_DAY}/day</span>
          </div>
          <div className="border-t border-slate-200 pt-2.5 flex justify-between">
            <span className="font-bold text-slate-700">Total Fine</span>
            <span className="text-lg font-bold text-red-600">₹{fine}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
          <button
            onClick={() => { setCollected(true); toast.success(`Fine of ₹${fine} collected from ${studentName}`); setTimeout(onClose, 1000); }}
            disabled={collected}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors active:scale-95">
            {collected ? 'Collected!' : 'Collect Fine'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OverduePanel() {
  const overdueBooks = ISSUED_BOOKS.filter((b) => b.status === 'overdue' || b.status === 'due_today');
  const [fineFor, setFineFor] = useState<typeof ISSUED_BOOKS[0] | null>(null);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = overdueBooks.filter((b) => !dismissed.has(b.id));

  if (visible.length === 0) return null;

  return (
    <>
      {fineFor && (
        <FineModal
          studentName={fineFor.studentName}
          bookTitle={fineFor.bookTitle}
          daysOverdue={fineFor.daysOverdue ?? 1}
          onClose={() => setFineFor(null)}
        />
      )}

      <div className="bg-white rounded-2xl border border-red-200 shadow-card overflow-hidden">
        <div className="px-5 py-4 border-b border-red-100 bg-red-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-100 border border-red-200 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-red-900 font-heading">Overdue & Due Today</h3>
              <p className="text-xs text-red-500 mt-0.5">{visible.length} book{visible.length !== 1 ? 's' : ''} need attention</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-xl border border-red-200">
            {visible.filter((b) => b.status === 'overdue').length} overdue
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {visible.map((book) => {
            const isOverdue = book.status === 'overdue';
            const fine = (book.daysOverdue ?? 0) * FINE_PER_DAY;

            return (
              <div key={book.id} className={cn('px-5 py-4 flex items-start gap-4 flex-wrap hover:bg-slate-50/50 transition-colors', isOverdue ? 'border-l-4 border-l-red-400' : 'border-l-4 border-l-orange-400')}>
                <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                  <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shrink-0', isOverdue ? 'bg-red-400' : 'bg-orange-400')}>
                    {book.studentName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{book.studentName}</p>
                    <p className="text-xs text-slate-400">{book.class}-{book.section} · Roll {book.rollNumber}</p>
                  </div>
                </div>

                <div className="flex-1 min-w-[160px]">
                  <p className="text-sm font-semibold text-slate-700 line-clamp-1">{book.bookTitle}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Due: {book.dueDate}</p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  {isOverdue ? (
                    <>
                      <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-xl">
                        {book.daysOverdue}d overdue
                      </span>
                      <span className="text-[11px] text-red-400">Fine: ₹{fine}</span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-xl">
                      Due Today
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toast.info(`Calling ${book.studentName}…`)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-green-50 hover:text-green-600 border border-slate-200 hover:border-green-200 transition-all" title="Call">
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => toast.info(`Opening WhatsApp for ${book.phone}…`)}
                    className="p-2 rounded-xl text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200 hover:border-emerald-200 transition-all" title="WhatsApp">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </button>
                  {isOverdue && (
                    <button
                      onClick={() => setFineFor(book)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-all active:scale-95">
                      <IndianRupee className="w-3 h-3" />
                      Fine
                    </button>
                  )}
                  <button
                    onClick={() => setDismissed((d) => new Set(d).add(book.id))}
                    className="p-2 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors" title="Dismiss">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
