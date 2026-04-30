'use client';

import { useState, useRef } from 'react';
import { Users, ChevronDown, MessageSquare, Smartphone, Bell, Send, Clock, Paperclip, X, ChevronRight, Zap, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CLASSES, MESSAGE_TEMPLATES, type MessageType, type Channel } from './data';

type Recipient = 'everyone' | 'class' | 'role' | 'individual';
type Language = 'EN' | 'HI' | 'TE';

const ROLES_LIST = ['All Teachers', 'All Parents', 'Class Teachers', 'Accountants', 'Librarians'];

const CHANNEL_OPTS: { id: Channel; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'whatsapp',  label: 'WhatsApp',        icon: MessageSquare, color: 'text-green-600 border-green-300 bg-green-50'   },
  { id: 'sms',       label: 'SMS',             icon: Smartphone,   color: 'text-blue-600 border-blue-300 bg-blue-50'     },
  { id: 'both',      label: 'Both',            icon: Zap,          color: 'text-orange-600 border-orange-300 bg-orange-50'},
  { id: 'push',      label: 'Push Notification',icon: Bell,        color: 'text-slate-600 border-slate-300 bg-slate-50'  },
];

const MSG_TYPES: { id: MessageType; label: string; emoji: string }[] = [
  { id: 'announcement', label: 'Announcement', emoji: '📢' },
  { id: 'fee_reminder', label: 'Fee Reminder', emoji: '💰' },
  { id: 'event',        label: 'Event',        emoji: '🎉' },
  { id: 'emergency',    label: 'Emergency',    emoji: '🚨' },
];

const VARIABLES = ['{{student_name}}', '{{fee_amount}}', '{{date}}', '{{class}}', '{{school_name}}'];

const LANG_PLACEHOLDER: Record<Language, string> = {
  EN: 'Type your message here...',
  HI: 'यहाँ अपना संदेश लिखें...',
  TE: 'మీ సందేశాన్ని ఇక్కడ టైప్ చేయండి...',
};

const SMS_COST_PER_MESSAGE = 0.20;

export function ComposeMessage() {
  const [recipient, setRecipient] = useState<Recipient>('everyone');
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState(ROLES_LIST[1]);
  const [msgType, setMsgType] = useState<MessageType>('announcement');
  const [channel, setChannel] = useState<Channel>('both');
  const [message, setMessage] = useState('');
  const [language, setLanguage] = useState<Language>('EN');
  const [showTemplates, setShowTemplates] = useState(false);
  const [scheduleMode, setScheduleMode] = useState<'now' | 'schedule'>('now');
  const [scheduleDateTime, setScheduleDateTime] = useState('');
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_CHARS = channel === 'sms' || channel === 'both' ? 160 : 1000;
  const estimatedReach = recipient === 'everyone' ? 847
    : recipient === 'class' ? selectedClasses.length * 68
    : recipient === 'role' ? 38
    : 1;

  const smsCost = (channel === 'sms' || channel === 'both') ? (estimatedReach * SMS_COST_PER_MESSAGE).toFixed(0) : 0;

  const toggleClass = (cls: string) =>
    setSelectedClasses((prev) => prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]);

  const insertVariable = (v: string) => {
    const el = textareaRef.current;
    if (!el) { setMessage((m) => m + v); return; }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newMsg = message.slice(0, start) + v + message.slice(end);
    setMessage(newMsg);
    setTimeout(() => { el.focus(); el.setSelectionRange(start + v.length, start + v.length); }, 0);
  };

  const applyTemplate = (body: string) => { setMessage(body); setShowTemplates(false); };

  const handleSend = () => {
    if (!message.trim()) { toast.error('Please enter a message'); return; }
    if (recipient === 'class' && selectedClasses.length === 0) { toast.error('Please select at least one class'); return; }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success(`Message ${scheduleMode === 'now' ? 'sent' : 'scheduled'} to ${estimatedReach} recipients`);
      setMessage('');
    }, 1800);
  };

  const previewMessage = message
    .replace('{{student_name}}', 'Aryan Kumar')
    .replace('{{fee_amount}}', '4500')
    .replace('{{date}}', 'April 15, 2026')
    .replace('{{class}}', 'Class 9A')
    .replace('{{school_name}}', 'Sri Sai High School');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-bold text-slate-800 font-heading mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-500" />
            Recipients
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {([
              { id: 'everyone',   label: 'Everyone'   },
              { id: 'class',      label: 'By Class'   },
              { id: 'role',       label: 'By Role'    },
              { id: 'individual', label: 'Individual' },
            ] as { id: Recipient; label: string }[]).map((r) => (
              <button
                key={r.id}
                onClick={() => setRecipient(r.id)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition-all',
                  recipient === r.id ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {r.label}
              </button>
            ))}
          </div>

          {recipient === 'class' && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {CLASSES.map((cls) => (
                  <button
                    key={cls}
                    onClick={() => toggleClass(cls)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all',
                      selectedClasses.includes(cls) ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-500 hover:border-orange-300'
                    )}
                  >
                    {cls}
                  </button>
                ))}
              </div>
              {selectedClasses.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <span>{selectedClasses.length} class(es) selected</span>
                  <button onClick={() => setSelectedClasses([])} className="text-red-400 hover:text-red-600 ml-1"><X className="w-3 h-3" /></button>
                </div>
              )}
            </div>
          )}

          {recipient === 'role' && (
            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className={selectCls}>
              {ROLES_LIST.map((r) => <option key={r}>{r}</option>)}
            </select>
          )}

          {recipient === 'individual' && (
            <input placeholder="Search by student name or roll number..." className={inputCls} />
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-bold text-slate-800 font-heading mb-3">Message Type & Channel</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {MSG_TYPES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setMsgType(t.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all',
                    msgType === t.id ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                  )}
                >
                  <span>{t.emoji}</span>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {CHANNEL_OPTS.map((c) => {
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setChannel(c.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold border-2 transition-all',
                      channel === c.id ? c.color + ' border-current' : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800 font-heading">Message</h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
                {(['EN', 'HI', 'TE'] as Language[]).map((l) => (
                  <button key={l} onClick={() => setLanguage(l)} className={cn('px-2.5 py-1 rounded-md text-xs font-bold transition-all', language === l ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400')}>
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowTemplates((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:border-orange-300 hover:bg-orange-50 transition-all"
              >
                <Hash className="w-3 h-3" />
                Templates
              </button>
            </div>
          </div>

          {showTemplates && (
            <div className="mb-3 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wide">
                {MSG_TYPES.find((t) => t.id === msgType)?.label} Templates
              </div>
              <div className="divide-y divide-slate-100">
                {MESSAGE_TEMPLATES[msgType].map((tpl, i) => (
                  <button key={i} onClick={() => applyTemplate(tpl.body)} className="w-full text-left px-3 py-2.5 hover:bg-orange-50 transition-colors">
                    <div className="text-xs font-bold text-slate-700">{tpl.title}</div>
                    <div className="text-xs text-slate-400 mt-0.5 line-clamp-2">{tpl.body}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
              placeholder={LANG_PLACEHOLDER[language]}
              rows={5}
              className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm resize-none transition-all"
            />
            <div className={cn('absolute bottom-2 right-3 text-[10px] font-semibold', message.length > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-slate-300')}>
              {message.length}/{MAX_CHARS}
            </div>
          </div>

          <div className="mt-2">
            <div className="text-[10px] font-semibold text-slate-400 mb-1.5 uppercase tracking-wide">Insert Variable</div>
            <div className="flex flex-wrap gap-1.5">
              {VARIABLES.map((v) => (
                <button key={v} onClick={() => insertVariable(v)} className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-orange-100 text-xs font-mono text-slate-600 hover:text-orange-700 transition-colors border border-slate-200 hover:border-orange-300">
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3">
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-slate-300 text-xs font-semibold text-slate-500 hover:border-orange-300 hover:text-orange-600 cursor-pointer transition-colors">
              <Paperclip className="w-3.5 h-3.5" />
              {attachedFile ? attachedFile : 'Attach Circular'}
              <input type="file" className="hidden" onChange={(e) => setAttachedFile(e.target.files?.[0]?.name || null)} />
            </label>
            {attachedFile && (
              <button onClick={() => setAttachedFile(null)} className="text-red-400 hover:text-red-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <h3 className="text-sm font-bold text-slate-800 font-heading mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            Delivery
          </h3>
          <div className="flex gap-2 mb-3">
            {([
              { id: 'now',      label: 'Send Now'  },
              { id: 'schedule', label: 'Schedule'  },
            ] as const).map((s) => (
              <button
                key={s.id}
                onClick={() => setScheduleMode(s.id)}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                  scheduleMode === s.id ? 'bg-orange-500 text-white border-orange-500' : 'border-slate-200 text-slate-600 hover:border-orange-300'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          {scheduleMode === 'schedule' && (
            <input
              type="datetime-local"
              value={scheduleDateTime}
              onChange={(e) => setScheduleDateTime(e.target.value)}
              className={inputCls}
              min={new Date().toISOString().slice(0, 16)}
            />
          )}

          <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-sm font-bold text-orange-900">
                This will send to <span className="text-orange-600">{estimatedReach.toLocaleString()} recipients</span>
              </div>
              {(channel === 'sms' || channel === 'both') && (
                <div className="text-xs text-slate-500 mt-0.5">Estimated SMS cost: ~₹{smsCost}</div>
              )}
            </div>
            <button
              onClick={handleSend}
              disabled={sending}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-brand-sm',
                sending ? 'bg-slate-200 text-slate-400' : 'bg-orange-500 text-white hover:bg-orange-600'
              )}
            >
              {sending ? (
                <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending...</>
              ) : (
                <><Send className="w-4 h-4" />{scheduleMode === 'now' ? 'Send Message' : 'Schedule Message'}</>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 sticky top-4">
          <h3 className="text-sm font-bold text-slate-800 font-heading mb-3">Preview</h3>

          {channel === 'whatsapp' || channel === 'both' ? (
            <div className="bg-[#ECE5DD] rounded-2xl p-4 mb-3">
              <div className="text-[10px] font-bold text-[#6B7280] uppercase mb-2 tracking-wide">WhatsApp Preview</div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                <div className="text-xs font-bold text-green-700 mb-1">Sri Sai High School</div>
                <div className="text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {previewMessage || <span className="text-slate-300 italic">Your message will appear here...</span>}
                </div>
                {attachedFile && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 rounded-lg px-2 py-1">
                    <Paperclip className="w-3 h-3" />
                    {attachedFile}
                  </div>
                )}
                <div className="text-[10px] text-right text-slate-400 mt-1">
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} ✓✓
                </div>
              </div>
            </div>
          ) : null}

          {channel === 'sms' || channel === 'both' ? (
            <div className="bg-slate-900 rounded-2xl p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">SMS Preview</div>
              <div className="bg-[#1E1E2E] rounded-xl px-4 py-3">
                <div className="text-xs font-bold text-blue-400 mb-1">SRISAI-SCHOOL</div>
                <div className="text-sm text-white/90 whitespace-pre-wrap leading-relaxed">
                  {previewMessage || <span className="text-slate-500 italic">Your message will appear here...</span>}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">{message.length} chars · {Math.ceil(message.length / 160)} SMS</div>
              </div>
            </div>
          ) : null}

          {channel === 'push' && (
            <div className="bg-slate-800 rounded-2xl p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wide">Push Notification Preview</div>
              <div className="bg-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Sri Sai High School</div>
                    <div className="text-xs text-white/80 mt-0.5 line-clamp-2">{previewMessage || 'Your message will appear here...'}</div>
                    <div className="text-[10px] text-white/40 mt-1">Now</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Recipients</span>
              <span className="font-semibold text-slate-800">{estimatedReach.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Channel</span>
              <span className="font-semibold text-slate-800 capitalize">{CHANNEL_OPTS.find((c) => c.id === channel)?.label}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Message Type</span>
              <span className="font-semibold text-slate-800 capitalize">{MSG_TYPES.find((t) => t.id === msgType)?.label}</span>
            </div>
            {(channel === 'sms' || channel === 'both') && (
              <div className="flex justify-between text-xs text-slate-500">
                <span>Estimated Cost</span>
                <span className="font-semibold text-orange-600">₹{smsCost}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
const selectCls = 'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none text-sm bg-white transition-all';
