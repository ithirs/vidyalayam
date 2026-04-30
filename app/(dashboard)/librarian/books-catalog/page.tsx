'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Toaster } from 'sonner';
import { BookCatalog } from '../BookCatalog';
import { AddBookModal } from '../AddBookModal';
import { IssueBookForm } from '../IssueBookForm';
import { useState } from 'react';
import type { Book } from '../data';

export default function LibrarianBooksCatalogPage() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [issueBook, setIssueBook] = useState<Book | null>(null);

  return (
    <>
      <Toaster position="top-right" richColors />
      {showAddBook && <AddBookModal onClose={() => setShowAddBook(false)} />}
      <div className="space-y-5">
        <nav className="flex items-center gap-1.5 text-xs text-slate-400">
          <Link href="/librarian" className="hover:text-blue-600 transition-colors font-medium">Dashboard</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-600 font-semibold">Books Catalog</span>
        </nav>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Books Catalog</h1>
          <p className="text-sm text-slate-500 mt-0.5">Search and manage all books in the library</p>
        </div>
        <div className="flex gap-5 items-start flex-wrap lg:flex-nowrap">
          <div className="w-full lg:w-72 xl:w-80 shrink-0">
            <IssueBookForm preselectedBook={issueBook} onClearBook={() => setIssueBook(null)} />
          </div>
          <div className="flex-1 min-w-0 bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <BookCatalog onAddBook={() => setShowAddBook(true)} onIssue={(book) => setIssueBook(book)} />
          </div>
        </div>
      </div>
    </>
  );
}
