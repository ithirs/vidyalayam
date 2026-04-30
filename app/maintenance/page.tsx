export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative w-44 h-44 mx-auto mb-8">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-100/80 to-amber-50 border-2 border-orange-200 rotate-3" />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 -rotate-3" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <svg viewBox="0 0 96 96" className="w-24 h-24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="48" cy="48" r="36" fill="#fff7ed" />
                <g style={{ transformOrigin: '48px 48px', animation: 'spin-slow 8s linear infinite' }}>
                  <circle cx="48" cy="48" r="28" fill="none" stroke="#fed7aa" strokeWidth="3" strokeDasharray="8 4" />
                </g>
                <g style={{ transformOrigin: '60px 36px', animation: 'wrench-rock 2.5s ease-in-out infinite' }}>
                  <path d="M68 20c-4.4 0-8 3.6-8 8 0 1.3.3 2.5.9 3.6L46 46.4c-1.1-.6-2.3-.9-3.6-.9-4.4 0-8 3.6-8 8s3.6 8 8 8c4.4 0 8-3.6 8-8 0-1.3-.3-2.5-.9-3.6L64.3 36c1.1.6 2.3.9 3.6.9 4.4 0 8-3.6 8-8s-3.6-8.9-8-8.9z" fill="#f97316" />
                </g>
                <circle cx="35" cy="62" r="6" fill="#fb923c" opacity=".7" />
                <path d="M32 59l6 6M38 59l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
          @keyframes wrench-rock {
            0%, 100% { transform: rotate(0deg); }
            30%       { transform: rotate(-12deg); }
            60%       { transform: rotate(10deg); }
          }
          @keyframes bounce-dot {
            0%, 80%, 100% { transform: scale(0.8); opacity: .5; }
            40%            { transform: scale(1.2); opacity: 1; }
          }
          .dot1 { animation: bounce-dot 1.4s ease-in-out infinite; }
          .dot2 { animation: bounce-dot 1.4s ease-in-out .2s infinite; }
          .dot3 { animation: bounce-dot 1.4s ease-in-out .4s infinite; }
        `}</style>

        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-wide">
          <span className="dot1 inline-block w-1.5 h-1.5 bg-amber-500 rounded-full" />
          <span className="dot2 inline-block w-1.5 h-1.5 bg-amber-500 rounded-full" />
          <span className="dot3 inline-block w-1.5 h-1.5 bg-amber-500 rounded-full" />
          &nbsp;Under Maintenance
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">
          We&apos;re updating Vidyalaya
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-2">
          Our team is working hard to bring you improvements.
        </p>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          Back in a few minutes — sorry for the wait!
        </p>

        <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-8 text-left shadow-sm">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">What&apos;s happening?</div>
          <ul className="space-y-2.5">
            {['Updating fee management module', 'Performance improvements', 'Security patches applied'].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 12 12" className="w-3 h-3 fill-green-600">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="https://wa.me/919000000000?text=Hi%2C%20I%20need%20help%20with%20Vidyalaya"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-sm font-bold rounded-xl transition-all duration-150 shadow-sm shadow-green-200 hover:shadow-green-300"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.12 1.532 5.847L.057 23.886l6.184-1.621A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.863 0-3.601-.504-5.102-1.381l-.367-.217-3.79.993 1.01-3.687-.237-.379A9.945 9.945 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          Chat with Support on WhatsApp
        </a>

        <p className="mt-6 text-xs text-slate-400">
          Or email us at{' '}
          <a href="mailto:support@vidyalaya.in" className="text-orange-500 hover:underline font-medium">
            support@vidyalaya.in
          </a>
        </p>
      </div>
    </div>
  );
}
