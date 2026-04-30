'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Clock, Users, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { EVENTS, CLASSES, type SchoolEvent } from './data';

const EVENT_COLORS = [
  { label: 'Orange', value: 'bg-orange-500' },
  { label: 'Blue',   value: 'bg-blue-500'   },
  { label: 'Green',  value: 'bg-green-500'  },
  { label: 'Teal',   value: 'bg-teal-500'   },
  { label: 'Red',    value: 'bg-red-500'    },
  { label: 'Amber',  value: 'bg-amber-500'  },
];

function EventModal({ event, onClose, onSave }: { event: Partial<SchoolEvent>; onClose: () => void; onSave: (e: SchoolEvent) => void }) {
  const [form, setForm] = useState<Partial<SchoolEvent>>({ color: 'bg-orange-500', audience: 'All Classes', ...event });
  const set = (k: keyof SchoolEvent) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    if (!form.title || !form.date) { toast.error('Title and date are required'); return; }
    onSave({
      id: form.id || `e${Date.now()}`,
      title: form.title!,
      date: form.date!,
      time: form.time || '09:00 AM',
      description: form.description || '',
      audience: form.audience || 'All Classes',
      color: form.color || 'bg-orange-500',
      image: form.image,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-modal w-full max-w-lg p-6 space-y-4 animate-scale-in max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 font-heading">{form.id ? 'Edit Event' : 'Add Event'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div>
          <label className={labelCls}>Event Title *</label>
          <input value={form.title || ''} onChange={set('title')} placeholder="e.g. Annual Day" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Date *</label>
            <input type="date" value={form.date || ''} onChange={set('date')} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Time</label>
            <input type="time" value={form.time ? convertTo24(form.time) : ''} onChange={(e) => {
              const [h, m] = e.target.value.split(':').map(Number);
              const ampm = h >= 12 ? 'PM' : 'AM';
              const h12 = h % 12 || 12;
              setForm((f) => ({ ...f, time: `${String(h12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}` }));
            }} className={inputCls} />
          </div>
        </div>

        <div>
          <label className={labelCls}>Audience</label>
          <select value={form.audience || 'All Classes'} onChange={set('audience')} className={inputCls}>
            <option>All Classes</option>
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea value={form.description || ''} onChange={set('description')} rows={3} placeholder="Event details..." className={cn(inputCls, 'resize-none')} />
        </div>

        <div>
          <label className={labelCls}>Event Color</label>
          <div className="flex gap-2">
            {EVENT_COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setForm((f) => ({ ...f, color: c.value }))}
                className={cn('w-8 h-8 rounded-full transition-all', c.value, form.color === c.value ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'opacity-70 hover:opacity-100')}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm">
            {form.id ? 'Update Event' : 'Add Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

function convertTo24(time12: string): string {
  if (!time12) return '';
  const [time, period] = time12.split(' ');
  const [h, m] = time.split(':').map(Number);
  let h24 = h;
  if (period === 'AM' && h === 12) h24 = 0;
  else if (period === 'PM' && h !== 12) h24 = h + 12;
  return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export function EventsTab() {
  const [events, setEvents] = useState<SchoolEvent[]>(EVENTS);
  const [modalEvent, setModalEvent] = useState<Partial<SchoolEvent> | null>(null);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 3, 1));

  const saveEvent = (e: SchoolEvent) => {
    setEvents((prev) => {
      const idx = prev.findIndex((x) => x.id === e.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = e; return next; }
      return [...prev, e];
    });
    toast.success('Event saved');
  };

  const deleteEvent = (id: string) => { setEvents((prev) => prev.filter((e) => e.id !== id)); toast.success('Event removed'); };

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
  const monthEvents = events.filter((e) => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  const getEventsForDay = (day: number) =>
    monthEvents.filter((e) => new Date(e.date).getDate() === day);

  const sortedUpcoming = [...events]
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <>
      {modalEvent && <EventModal event={modalEvent} onClose={() => setModalEvent(null)} onSave={saveEvent} />}

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-700 font-heading">School Events</h3>
          <button
            onClick={() => setModalEvent({})}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold hover:bg-orange-600 transition-colors shadow-brand-sm"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-slate-900 font-heading">{MONTHS[month]} {year}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCalendarDate(new Date(year, month - 1, 1))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCalendarDate(new Date(year, month + 1, 1))}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-0.5">
              {calendarCells.map((day, i) => {
                if (!day) return <div key={i} />;
                const dayEvents = getEventsForDay(day);
                const today = new Date();
                const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
                return (
                  <div
                    key={day}
                    className={cn(
                      'min-h-[52px] rounded-xl p-1 border transition-colors',
                      isToday ? 'border-orange-300 bg-orange-50' : 'border-transparent hover:bg-slate-50'
                    )}
                  >
                    <div className={cn('text-xs font-semibold mb-0.5 w-5 h-5 flex items-center justify-center rounded-full', isToday ? 'bg-orange-500 text-white' : 'text-slate-600')}>
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div key={ev.id} className={cn('text-[10px] text-white font-semibold px-1.5 py-0.5 rounded-md truncate', ev.color)}>
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-[10px] text-slate-400 font-medium px-1">+{dayEvents.length - 2}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {monthEvents.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {monthEvents.map((e) => (
                    <div key={e.id} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <div className={cn('w-2.5 h-2.5 rounded-full', e.color)} />
                      <span className="font-medium">{e.title}</span>
                      <span className="text-slate-400">{new Date(e.date).getDate()} {MONTHS[new Date(e.date).getMonth()].slice(0, 3)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Upcoming Events</h4>
            {sortedUpcoming.map((e) => {
              const d = new Date(e.date);
              const daysLeft = Math.ceil((d.getTime() - new Date().setHours(0,0,0,0)) / 86400000);
              return (
                <div key={e.id} className="bg-white rounded-2xl border border-slate-200 shadow-card p-3.5 group">
                  <div className="flex items-start gap-3">
                    <div className={cn('w-10 h-10 rounded-xl flex flex-col items-center justify-center text-white shrink-0', e.color)}>
                      <div className="text-base font-black leading-none">{d.getDate()}</div>
                      <div className="text-[9px] font-bold uppercase">{MONTHS[d.getMonth()].slice(0, 3)}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm leading-tight">{e.title}</div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{e.time}</span>
                        <span className="flex items-center gap-0.5"><Users className="w-3 h-3" />{e.audience}</span>
                      </div>
                      {daysLeft <= 7 && (
                        <div className={cn('text-[10px] font-bold mt-1', daysLeft <= 1 ? 'text-red-500' : daysLeft <= 3 ? 'text-orange-500' : 'text-amber-500')}>
                          {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : `In ${daysLeft} days`}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => setModalEvent(e)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteEvent(e.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  {e.description && (
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 pl-13">{e.description}</p>
                  )}
                </div>
              );
            })}
            {sortedUpcoming.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-slate-400 text-sm">
                No upcoming events
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

const labelCls = 'block text-xs font-semibold text-slate-500 mb-1.5';
const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
