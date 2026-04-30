'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, Plus, BookMarked } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BOOKS, CATEGORIES, CATEGORY_CONFIG, type Book, type BookCategory } from './data';
import { toast } from 'sonner';

interface BookCatalogProps {
  onAddBook: () => void;
  onIssue: (book: Book) => void;
}

function BookCard({ book, onIssue }: { book: Book; onIssue: () => void }) {
  const cfg = CATEGORY_CONFIG[book.category];
  const isAvailable = book.availableCopies > 0;
  const initials = book.title.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all group overflow-hidden flex flex-col">
      <div className={cn('h-28 flex items-center justify-center relative', cfg.bg)}>
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
          <span className="text-xl font-bold text-white">{initials}</span>
        </div>
        <div className={cn('absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-1 rounded-lg',
          isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white')}>
          {isAvailable ? `${book.availableCopies} Available` : 'Out of Stock'}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 font-heading">{book.title}</h4>
        <p className="text-xs text-slate-500 mt-1">{book.author}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-lg', cfg.light, cfg.text)}>{book.category}</span>
          <span className="text-[10px] text-slate-400">· {book.location}</span>
        </div>
        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-[11px] text-slate-400">{book.totalCopies} total copies</span>
          <button
            onClick={onIssue}
            disabled={!isAvailable}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95',
              isAvailable
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            Issue
          </button>
        </div>
      </div>
    </div>
  );
}

export function BookCatalog({ onAddBook, onIssue }: BookCatalogProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<BookCategory | 'All'>('All');

  const filtered = useMemo(() => {
    return BOOKS.filter((b) => {
      if (activeCategory !== 'All' && b.category !== activeCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.isbn.includes(q) ||
          b.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, activeCategory]);

  return (
    <div>
      {/* Search + Add */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, author, ISBN or category…"
            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 text-slate-700 bg-white shadow-sm"
          />
        </div>
        <button
          onClick={onAddBook}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold transition-colors shadow-sm active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none mb-5">
        {(['All', ...CATEGORIES] as (BookCategory | 'All')[]).map((cat) => {
          const cfg = cat !== 'All' ? CATEGORY_CONFIG[cat] : null;
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 border',
                isActive
                  ? cat === 'All'
                    ? 'bg-slate-800 text-white border-slate-800'
                    : `${cfg!.bg} text-white border-transparent`
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
              )}
            >
              {cat !== 'All' && isActive && <BookMarked className="w-3 h-3" />}
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-slate-400 font-medium">{filtered.length} book{filtered.length !== 1 ? 's' : ''} found</p>
        {search && (
          <button onClick={() => setSearch('')} className="text-xs text-blue-500 hover:text-blue-700 font-medium">Clear search</button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="w-12 h-12 text-slate-200 mb-3" />
          <p className="text-sm font-semibold text-slate-400">No books match your search</p>
          <p className="text-xs text-slate-300 mt-1">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onIssue={() => onIssue(book)} />
          ))}
        </div>
      )}
    </div>
  );
}
