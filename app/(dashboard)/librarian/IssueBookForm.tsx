'use client';

import { useState, useMemo } from 'react';
import { Search, User, BookOpen, CalendarDays, X, CircleCheck as CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOOKS, STUDENTS_MOCK, CATEGORY_CONFIG, type Book } from './data';
import { toast } from 'sonner';

interface IssueBookFormProps {
  preselectedBook?: Book | null;
  onClearBook?: () => void;
}

function addDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function IssueBookForm({ preselectedBook, onClearBook }: IssueBookFormProps) {
  const [studentQuery, setStudentQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS_MOCK[0] | null>(null);
  const [bookQuery, setBookQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(preselectedBook ?? null);
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);
  const [dueDays, setDueDays] = useState(14);
  const [issued, setIssued] = useState(false);

  const filteredStudents = useMemo(() =>
    studentQuery.length > 0
      ? STUDENTS_MOCK.filter((s) =>
          s.name.toLowerCase().includes(studentQuery.toLowerCase()) ||
          s.rollNumber.toLowerCase().includes(studentQuery.toLowerCase())
        )
      : [], [studentQuery]);

  const filteredBooks = useMemo(() =>
    bookQuery.length > 0
      ? BOOKS.filter((b) =>
          b.availableCopies > 0 &&
          (b.title.toLowerCase().includes(bookQuery.toLowerCase()) || b.isbn.includes(bookQuery))
        )
      : [], [bookQuery]);

  const currentBook = preselectedBook ?? selectedBook;

  const handleIssue = () => {
    if (!selectedStudent) return toast.error('Please select a student');
    if (!currentBook) return toast.error('Please select a book');
    toast.success(`"${currentBook.title}" issued to ${selectedStudent.name}`);
    setIssued(true);
    setTimeout(() => {
      setIssued(false);
      setSelectedStudent(null);
      setStudentQuery('');
      setBookQuery('');
      if (!preselectedBook) setSelectedBook(null);
      if (onClearBook) onClearBook();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 font-heading">Issue Book</h3>
          <p className="text-xs text-slate-400">Search a student and select a book to issue</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Student Search */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Student</label>
          {selectedStudent ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-xs font-bold text-green-700">
                  {selectedStudent.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-green-800">{selectedStudent.name}</p>
                  <p className="text-[11px] text-green-600">{selectedStudent.rollNumber} · {selectedStudent.class}-{selectedStudent.section}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStudent(null)} className="p-1 rounded-lg text-green-400 hover:text-green-700 hover:bg-green-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={studentQuery}
                onChange={(e) => { setStudentQuery(e.target.value); setShowStudentDropdown(true); }}
                onFocus={() => setShowStudentDropdown(true)}
                onBlur={() => setTimeout(() => setShowStudentDropdown(false), 150)}
                placeholder="Search by name or roll number…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700"
              />
              {showStudentDropdown && filteredStudents.length > 0 && (
                <div className="absolute z-20 top-full mt-1.5 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                  {filteredStudents.map((s) => (
                    <button key={s.id} onMouseDown={() => { setSelectedStudent(s); setStudentQuery(''); setShowStudentDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600">
                        {s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                        <p className="text-[11px] text-slate-400">{s.rollNumber} · {s.class}-{s.section}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Book Search / Preselected */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Book</label>
          {currentBook ? (
            <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold text-white', CATEGORY_CONFIG[currentBook.category].bg)}>
                  {currentBook.title[0]}
                </div>
                <div>
                  <p className="text-sm font-bold text-blue-800 line-clamp-1">{currentBook.title}</p>
                  <p className="text-[11px] text-blue-600">{currentBook.author} · {currentBook.availableCopies} copies available</p>
                </div>
              </div>
              <button onClick={() => { if (onClearBook) onClearBook(); setSelectedBook(null); }}
                className="p-1 rounded-lg text-blue-400 hover:text-blue-700 hover:bg-blue-100 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={bookQuery}
                onChange={(e) => { setBookQuery(e.target.value); setShowBookDropdown(true); }}
                onFocus={() => setShowBookDropdown(true)}
                onBlur={() => setTimeout(() => setShowBookDropdown(false), 150)}
                placeholder="Search by title or ISBN…"
                className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700"
              />
              {showBookDropdown && filteredBooks.length > 0 && (
                <div className="absolute z-20 top-full mt-1.5 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden max-h-52 overflow-y-auto">
                  {filteredBooks.map((b) => {
                    const cfg = CATEGORY_CONFIG[b.category];
                    return (
                      <button key={b.id} onMouseDown={() => { setSelectedBook(b); setBookQuery(''); setShowBookDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors text-left">
                        <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold text-white', cfg.bg)}>
                          {b.title[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{b.title}</p>
                          <p className="text-[11px] text-slate-400">{b.author} · {b.availableCopies} available</p>
                        </div>
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg shrink-0', cfg.light, cfg.text)}>{b.category}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              {showBookDropdown && bookQuery.length > 0 && filteredBooks.length === 0 && (
                <div className="absolute z-20 top-full mt-1.5 left-0 right-0 bg-white rounded-xl border border-slate-200 shadow-lg p-4 text-center">
                  <p className="text-sm text-slate-400">No available books found</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Due Date</label>
          <div className="flex gap-2">
            {[7, 14, 21, 30].map((d) => (
              <button key={d} onClick={() => setDueDays(d)}
                className={cn(
                  'flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all',
                  dueDays === d ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-600'
                )}>
                {d}d
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-100">
            <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500">Due: <span className="font-semibold text-slate-700">{addDays(dueDays)}</span></span>
          </div>
        </div>

        <button
          onClick={handleIssue}
          disabled={issued}
          className={cn(
            'w-full py-3.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2',
            issued
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
          )}
        >
          {issued ? (
            <><CheckCircle className="w-4.5 h-4.5" /> Book Issued!</>
          ) : (
            <><BookOpen className="w-4.5 h-4.5" /> Issue Book</>
          )}
        </button>
      </div>
    </div>
  );
}
