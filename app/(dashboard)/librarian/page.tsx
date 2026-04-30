'use client';

import { useState } from 'react';
import { BookMarked, BookOpen, RotateCcw, TriangleAlert as AlertTriangle, TrendingUp, Library, Plus, Grid3x3 as Grid3X3, List } from 'lucide-react';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { BOOKS, ISSUED_BOOKS } from './data';
import { BookCatalog } from './BookCatalog';
import { IssueBookForm } from './IssueBookForm';
import { IssuedBooksTable } from './IssuedBooksTable';
import { OverduePanel } from './OverduePanel';
import { AddBookModal } from './AddBookModal';
import type { Book } from './data';

const totalBooks = BOOKS.reduce((s, b) => s + b.totalCopies, 0);
const totalIssued = ISSUED_BOOKS.length;
const overdueCount = ISSUED_BOOKS.filter((b) => b.status === 'overdue').length;
const dueTodayCount = ISSUED_BOOKS.filter((b) => b.status === 'due_today').length;
const newThisMonth = BOOKS.filter((b) => b.addedOn.includes('Jan 2025') || b.addedOn.includes('2025')).length + 13;

const STATS = [
  {
    label: 'Total Books',
    value: totalBooks.toLocaleString('en-IN'),
    sub: `${BOOKS.length} unique titles · 12 categories`,
    icon: Library,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    valueCls: 'text-blue-600',
  },
  {
    label: 'Currently Issued',
    value: totalIssued,
    sub: 'Books out with students',
    icon: BookOpen,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500',
    valueCls: 'text-amber-600',
  },
  {
    label: 'Overdue Returns',
    value: overdueCount,
    sub: `+ ${dueTodayCount} due today`,
    icon: AlertTriangle,
    iconBg: 'bg-red-50',
    iconColor: 'text-red-500',
    valueCls: 'text-red-600',
    alert: overdueCount > 0,
  },
  {
    label: 'New Books This Month',
    value: newThisMonth,
    sub: 'Added to catalog',
    icon: TrendingUp,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500',
    valueCls: 'text-green-600',
  },
];

type ActiveTab = 'catalog' | 'issued' | 'overdue';

export default function LibrarianDashboard() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [showAddBook, setShowAddBook] = useState(false);
  const [issueBook, setIssueBook] = useState<Book | null>(null);

  const tabs: { id: ActiveTab; label: string; icon: typeof BookMarked; badge?: number }[] = [
    { id: 'catalog', label: 'Book Catalog', icon: BookMarked },
    { id: 'issued', label: 'Issued Books', icon: RotateCcw, badge: totalIssued },
    { id: 'overdue', label: 'Overdue', icon: AlertTriangle, badge: overdueCount + dueTodayCount },
  ];

  return (
    <>
      <Toaster position="top-right" richColors />
      {showAddBook && <AddBookModal onClose={() => setShowAddBook(false)} />}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-heading">Library Management</h1>
            <p className="text-sm text-slate-500 mt-1">Manage books, track issues and monitor overdue returns</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {overdueCount > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {overdueCount} Overdue
              </div>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-700">
              {totalIssued} Issued
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-green-50 border border-green-200 text-xs font-bold text-green-700">
              {BOOKS.reduce((s, b) => s + b.availableCopies, 0)} Available
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, sub, icon: Icon, iconBg, iconColor, valueCls, alert }) => (
            <div key={label}
              className={cn(
                'bg-white rounded-2xl border shadow-card p-4 hover:shadow-md transition-shadow relative overflow-hidden',
                alert ? 'border-red-200' : 'border-slate-200'
              )}>
              {alert && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-400 rounded-t-2xl" />}
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', iconBg)}>
                <Icon className={cn('w-5 h-5', iconColor)} />
              </div>
              <p className={cn('text-3xl font-bold font-heading mt-3 tabular-nums', valueCls)}>{value}</p>
              <p className="text-sm font-semibold text-slate-700 mt-1">{label}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Overdue alert banner */}
        {(overdueCount > 0 || dueTodayCount > 0) && (
          <button
            onClick={() => setActiveTab('overdue')}
            className="w-full flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-md active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <p className="text-sm font-bold">{overdueCount} books overdue · {dueTodayCount} due today</p>
                <p className="text-xs text-red-100">Click to view and send reminders</p>
              </div>
            </div>
            <span className="text-sm font-bold text-red-100 shrink-0">View &rarr;</span>
          </button>
        )}

        {/* Main layout: Issue form (sidebar) + tabbed content */}
        <div className="flex gap-5 items-start flex-wrap lg:flex-nowrap">
          {/* Issue Book Form — sticky sidebar */}
          <div className="w-full lg:w-72 xl:w-80 shrink-0 lg:sticky lg:top-6">
            <IssueBookForm
              preselectedBook={issueBook}
              onClearBook={() => setIssueBook(null)}
            />
          </div>

          {/* Tabbed content area */}
          <div className="flex-1 min-w-0 space-y-4">
            {/* Tab nav */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
              <div className="flex border-b border-slate-100">
                {tabs.map(({ id, label, icon: Icon, badge }) => (
                  <button key={id} onClick={() => setActiveTab(id)}
                    className={cn(
                      'flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all relative',
                      activeTab === id ? 'text-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    )}>
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>
                    {badge !== undefined && badge > 0 && (
                      <span className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                        id === 'overdue' ? 'bg-red-500 text-white' : activeTab === id ? 'bg-blue-500 text-white' : 'bg-slate-200 text-slate-600'
                      )}>
                        {badge}
                      </span>
                    )}
                    {activeTab === id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === 'catalog' && (
                  <BookCatalog
                    onAddBook={() => setShowAddBook(true)}
                    onIssue={(book) => setIssueBook(book)}
                  />
                )}
                {activeTab === 'issued' && <IssuedBooksTable />}
                {activeTab === 'overdue' && <OverduePanel />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
