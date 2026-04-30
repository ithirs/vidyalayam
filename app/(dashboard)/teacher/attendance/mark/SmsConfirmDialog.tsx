'use client';

import { MessageSquare, X } from 'lucide-react';

interface SmsConfirmDialogProps {
  absentCount: number;
  onConfirm: (sendSms: boolean) => void;
  onCancel: () => void;
}

export function SmsConfirmDialog({ absentCount, onConfirm, onCancel }: SmsConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-modal p-6 w-full max-w-sm">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
          <MessageSquare className="w-5 h-5 text-blue-500" />
        </div>

        <h3 className="text-slate-900 font-bold text-lg text-center font-heading mb-1">Submit Attendance?</h3>
        <p className="text-slate-500 text-sm text-center mb-5">
          {absentCount > 0
            ? `Send SMS notification to parents of ${absentCount} absent student${absentCount > 1 ? 's' : ''}?`
            : 'All students are present today. No SMS will be sent.'}
        </p>

        <div className="space-y-2">
          {absentCount > 0 && (
            <button
              onClick={() => onConfirm(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
            >
              Submit & Send SMS ({absentCount} parents)
            </button>
          )}
          <button
            onClick={() => onConfirm(false)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-sm"
          >
            {absentCount > 0 ? 'Submit Without SMS' : 'Submit Attendance'}
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
