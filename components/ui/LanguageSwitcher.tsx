'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANG_KEY = 'vidyalaya_lang';

interface Language {
  code: string;
  label: string;
  flag:  string;
  native: string;
}

const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: '🇺🇸', native: 'English' },
  { code: 'hi', label: 'Hindi',   flag: '🇮🇳', native: 'हिंदी'   },
  { code: 'te', label: 'Telugu',  flag: '🏛️', native: 'తెలుగు'  },
];

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [current, setCurrent] = useState<Language>(LANGUAGES[0]);
  const [open, setOpen]       = useState(false);
  const ref                   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(LANG_KEY) : null;
    if (saved) {
      const found = LANGUAGES.find((l) => l.code === saved);
      if (found) setCurrent(found);
    }
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (lang: Language) => {
    setCurrent(lang);
    localStorage.setItem(LANG_KEY, lang.code);
    document.documentElement.setAttribute('lang', lang.code);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.native}</span>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl border border-slate-200 shadow-lg py-1.5 z-50">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => select(lang)}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm hover:bg-orange-50 transition-colors text-left"
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-semibold text-slate-700">{lang.native}</div>
                <div className="text-xs text-slate-400">{lang.label}</div>
              </div>
              {current.code === lang.code && <Check className="w-3.5 h-3.5 text-orange-500 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
