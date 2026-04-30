'use client';

import { useState } from 'react';
import { Plus, Pin, PinOff, Pencil, Trash2, X, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { NOTICES, NOTICE_CATEGORY_CONFIG, type Notice, type NoticeCategory } from './data';

const CATEGORY_LIST: NoticeCategory[] = ['academic', 'events', 'fee', 'holiday', 'sports', 'general'];

function NoticeModal({ notice, onClose, onSave }: { notice: Partial<Notice>; onClose: () => void; onSave: (n: Notice) => void }) {
  const [form, setForm] = useState<Partial<Notice>>({ category: 'general', audience: 'All Classes', pinned: false, ...notice });
  const set = (k: keyof Notice) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.title || !form.body) { toast.error('Title and body are required'); return; }
    onSave({
      id: form.id || `n${Date.now()}`,
      title: form.title!,
      body: form.body!,
      category: form.category as NoticeCategory || 'general',
      postedBy: form.postedBy || 'Admin',
      postedAt: form.postedAt || new Date().toISOString().slice(0, 10),
      expiresAt: form.expiresAt || '',
      audience: form.audience || 'All Classes',
      pinned: form.pinned || false,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg p-6 space-y-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 font-heading">{form.id ? 'Edit Notice' : 'Add Notice'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div>
          <label className={labelCls}>Title *</label>
          <input value={form.title || ''} onChange={set('title')} placeholder="Notice title" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Category</label>
            <select value={form.category || 'general'} onChange={set('category')} className={inputCls}>
              {CATEGORY_LIST.map((c) => <option key={c} value={c}>{NOTICE_CATEGORY_CONFIG[c].label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Audience</label>
            <input value={form.audience || ''} onChange={set('audience')} placeholder="All Classes" className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Message *</label>
          <textarea value={form.body || ''} onChange={set('body')} rows={4} placeholder="Notice content..." className={cn(inputCls, 'resize-none')} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Posted By</label>
            <input value={form.postedBy || ''} onChange={set('postedBy')} placeholder="Principal" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Expires On</label>
            <input type="date" value={form.expiresAt || ''} onChange={set('expiresAt')} className={inputCls} />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setForm((f) => ({ ...f, pinned: !f.pinned }))}
            className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-semibold transition-all', form.pinned ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-slate-200 text-slate-600')}
          >
            <Pin className="w-3.5 h-3.5" />
            {form.pinned ? 'Pinned' : 'Pin Notice'}
          </button>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
            {form.id ? 'Update' : 'Post'} Notice
          </button>
        </div>
      </div>
    </div>
  );
}

export function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>(NOTICES);
  const [modalNotice, setModalNotice] = useState<Partial<Notice> | null>(null);
  const [filterCat, setFilterCat] = useState<NoticeCategory | 'all'>('all');

  const filtered = filterCat === 'all' ? notices : notices.filter((n) => n.category === filterCat);
  const pinned = filtered.filter((n) => n.pinned);
  const unpinned = filtered.filter((n) => !n.pinned);

  const togglePin = (id: string) => {
    setNotices((prev) => prev.map((n) => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    toast.success('Notice removed');
  };

  const saveNotice = (n: Notice) => {
    setNotices((prev) => {
      const idx = prev.findIndex((x) => x.id === n.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = n; return next; }
      return [n, ...prev];
    });
    toast.success(n.id.startsWith('n') && notices.some((x) => x.id === n.id) ? 'Notice updated' : 'Notice posted');
  };

  return (
    <>
      {modalNotice && <NoticeModal notice={modalNotice} onClose={() => setModalNotice(null)} onSave={saveNotice} />}

      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-xl p-1 flex-wrap">
            <button
              onClick={() => setFilterCat('all')}
              className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-all', filterCat === 'all' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500')}
            >
              All ({notices.length})
            </button>
            {CATEGORY_LIST.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCat(c)}
                className={cn('px-3 py-1.5 rounded-lg text-xs font-bold transition-all', filterCat === c ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500')}
              >
                {NOTICE_CATEGORY_CONFIG[c].label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setModalNotice({})}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            <Plus className="w-4 h-4" />
            Add Notice
          </button>
        </div>

        {pinned.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Pin className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pinned</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pinned.map((n) => <NoticeCard key={n.id} notice={n} onTogglePin={togglePin} onEdit={(n) => setModalNotice(n)} onDelete={deleteNotice} />)}
            </div>
          </div>
        )}

        {unpinned.length > 0 && (
          <div>
            {pinned.length > 0 && (
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Other Notices</span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {unpinned.map((n) => <NoticeCard key={n.id} notice={n} onTogglePin={togglePin} onEdit={(n) => setModalNotice(n)} onDelete={deleteNotice} />)}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card py-12 text-center text-slate-400">
            No notices found in this category
          </div>
        )}
      </div>
    </>
  );
}

function NoticeCard({ notice: n, onTogglePin, onEdit, onDelete }: {
  notice: Notice;
  onTogglePin: (id: string) => void;
  onEdit: (n: Notice) => void;
  onDelete: (id: string) => void;
}) {
  const catConf = NOTICE_CATEGORY_CONFIG[n.category];
  const isExpired = n.expiresAt && new Date(n.expiresAt) < new Date();

  return (
    <div className={cn('bg-white rounded-2xl border shadow-card p-4 group transition-all hover:shadow-md', n.pinned ? 'border-orange-200' : 'border-slate-200', isExpired ? 'opacity-60' : '')}>
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            {n.pinned && <Pin className="w-3 h-3 text-orange-500 shrink-0" />}
            <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full', catConf.color)}>{catConf.label}</span>
            {isExpired && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">Expired</span>}
          </div>
          <h4 className="font-bold text-slate-900 leading-tight">{n.title}</h4>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onTogglePin(n.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-colors">
            {n.pinned ? <PinOff className="w-3.5 h-3.5" /> : <Pin className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => onEdit(n)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onDelete(n.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{n.body}</p>

      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1"><User className="w-3 h-3" />{n.postedBy}</div>
          <div className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(n.postedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
        </div>
        <div className="bg-slate-100 px-2 py-0.5 rounded-full font-medium">{n.audience}</div>
      </div>

      {n.expiresAt && (
        <div className={cn('mt-1.5 text-[10px] font-medium', isExpired ? 'text-red-500' : 'text-slate-400')}>
          {isExpired ? 'Expired' : 'Expires'}: {new Date(n.expiresAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      )}
    </div>
  );
}

const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
