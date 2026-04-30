import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/30 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="relative w-36 h-36 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 border-2 border-orange-200" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <svg
                viewBox="0 0 80 80"
                className="w-20 h-20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="18" y="38" width="44" height="32" rx="6" fill="#fed7aa" stroke="#f97316" strokeWidth="2.5" />
                <path
                  d="M27 38V28C27 20.268 33.268 14 41 14C48.732 14 55 20.268 55 28V38"
                  stroke="#f97316"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="40" cy="54" r="5" fill="#f97316" />
                <rect x="38" y="54" width="4" height="8" rx="2" fill="#f97316" />
              </svg>

              <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg viewBox="0 0 12 12" className="w-3 h-3 text-white fill-white">
                  <path d="M6 1L7.2 4.8H11L7.9 7.2L9.1 11L6 8.6L2.9 11L4.1 7.2L1 4.8H4.8L6 1Z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="absolute inset-0 rounded-full border-2 border-orange-200/60 animate-ping" style={{ animationDuration: '3s' }} />
        </div>

        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
          Access Denied
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">
          You can't go there
        </h1>
        <p className="text-slate-500 text-base leading-relaxed mb-8">
          You don't have permission to view this page. If you believe this is a mistake, please contact your school administrator.
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all duration-150 shadow-sm shadow-orange-200 hover:shadow-orange-300"
          >
            <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white">
              <path d="M8 1L1 7H3V14H7V10H9V14H13V7H15L8 1Z" />
            </svg>
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-xl transition-all duration-150 border border-slate-200 hover:border-orange-300"
          >
            Go to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Need help?{' '}
          <a href="mailto:support@vidyalaya.in" className="text-orange-500 hover:underline font-medium">
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}
