"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function NotFound() {
  const router = useRouter();
  return (
    <>
        
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Inter', system-ui, sans-serif;
            background: linear-gradient(135deg, #fff7ed 0%, #ffffff 50%, #eff6ff 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }

          .container {
            max-width: 480px;
            width: 100%;
            text-align: center;
          }

          .illustration {
            position: relative;
            width: 180px;
            height: 180px;
            margin: 0 auto 32px;
          }

          .circle-bg {
            width: 180px;
            height: 180px;
            background: linear-gradient(135deg, #fff7ed, #ffedd5);
            border-radius: 50%;
            border: 3px solid #fed7aa;
          }

          .cap {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -60%);
            font-size: 72px;
            animation: fall 2s ease-in-out infinite;
            filter: drop-shadow(0 8px 16px rgba(249,115,22,0.25));
          }

          @keyframes fall {
            0%   { transform: translate(-50%, -80%) rotate(-10deg); }
            40%  { transform: translate(-50%, -50%) rotate(8deg); }
            60%  { transform: translate(-50%, -55%) rotate(-5deg); }
            80%  { transform: translate(-50%, -58%) rotate(3deg); }
            100% { transform: translate(-50%, -80%) rotate(-10deg); }
          }

          .code {
            font-size: 96px;
            font-weight: 800;
            line-height: 1;
            background: linear-gradient(135deg, #f97316, #ea580c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 12px;
            letter-spacing: -4px;
          }

          h1 {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 10px;
          }

          p {
            font-size: 15px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 32px;
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
            text-decoration: none;
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

          .dot-grid {
            position: fixed;
            inset: 0;
            pointer-events: none;
            opacity: 0.4;
            background-image: radial-gradient(circle, #f97316 1px, transparent 1px);
            background-size: 32px 32px;
            z-index: -1;
          }
        `}</style>
      
        <div className="dot-grid" />
        <div className="container">
          <div className="illustration">
            <div className="circle-bg" />
            <div className="cap">🎓</div>
          </div>

          <div className="code">404</div>
          <h1>Oops! Page not found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist or has been moved to a different location.</p>

          <div className="buttons">
            <a href="#" onClick={() => router.back() } className="btn-primary">
              &#8592; Back to Previous Page
            </a>
            <a href="/" className="btn-secondary">
              Go to Home
            </a>
          </div>
        </div>
      </>
  );
}
