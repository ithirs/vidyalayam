'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Error | Vidyalaya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', system-ui, sans-serif;
            background: linear-gradient(135deg, #fff7ed 0%, #ffffff 60%, #fef2f2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }

          .container {
            max-width: 460px;
            width: 100%;
            text-align: center;
          }

          .illustration {
            width: 140px;
            height: 140px;
            margin: 0 auto 28px;
            background: linear-gradient(135deg, #fff1f2, #ffe4e6);
            border-radius: 50%;
            border: 3px solid #fecdd3;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }

          .icon-wrap {
            font-size: 64px;
            animation: shake 3s ease-in-out infinite;
          }

          @keyframes shake {
            0%, 90%, 100% { transform: rotate(0deg); }
            92%            { transform: rotate(-8deg); }
            94%            { transform: rotate(8deg); }
            96%            { transform: rotate(-6deg); }
            98%            { transform: rotate(4deg); }
          }

          .badge {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 28px;
            height: 28px;
            background: #ef4444;
            border-radius: 50%;
            border: 3px solid #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pulse-dot 2s ease-in-out infinite;
          }

          @keyframes pulse-dot {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.2); }
          }

          .badge::after {
            content: '!';
            color: #fff;
            font-size: 13px;
            font-weight: 800;
          }

          h1 {
            font-size: 26px;
            font-weight: 800;
            color: #1e293b;
            margin-bottom: 10px;
          }

          p {
            font-size: 15px;
            color: #64748b;
            line-height: 1.65;
            margin-bottom: 10px;
          }

          .digest {
            font-size: 12px;
            color: #94a3b8;
            font-family: monospace;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 6px 12px;
            display: inline-block;
            margin-bottom: 28px;
          }

          .buttons {
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
          }

          .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #f97316;
            color: #fff;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            transition: background 0.15s, transform 0.1s;
          }
          .btn-primary:hover { background: #ea580c; transform: translateY(-1px); }

          .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #fff;
            color: #374151;
            font-size: 14px;
            font-weight: 600;
            border-radius: 12px;
            text-decoration: none;
            border: 1.5px solid #e2e8f0;
            transition: border-color 0.15s, transform 0.1s;
          }
          .btn-secondary:hover { border-color: #f97316; transform: translateY(-1px); }
        `}</style>
      </head>
      <body>
        <div className="container">
          <div className="illustration">
            <div className="icon-wrap">⚙️</div>
            <div className="badge" />
          </div>

          <h1>Something went wrong</h1>
          <p>An unexpected error occurred. Our team has been notified and is working on a fix.</p>

          {error?.digest && (
            <p className="digest">Error ID: {error.digest}</p>
          )}

          <div className="buttons">
            <button onClick={reset} className="btn-primary">
              &#8635; Try Again
            </button>
            <a href="mailto:support@vidyalaya.in" className="btn-secondary">
              Contact Support
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
