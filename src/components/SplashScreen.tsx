import React, { useEffect, useState } from 'react';
import { BhumiLogo } from './BhumiLogo';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  autoDismissTime?: number; // ms
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  autoDismissTime = 2400,
}) => {
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 280);

    const timer = setTimeout(() => {
      onComplete();
    }, autoDismissTime);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [autoDismissTime, onComplete]);

  return (
    <div
      id="institutional-splash-screen"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#07192C] via-[#05111F] to-[#020A13] text-white p-6 select-none"
    >
      {/* Centered White Card from Screenshot Image 9 */}
      <div className="flex flex-col items-center">
        {/* Crisp White Emblem Card */}
        <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center p-4 transform transition-transform hover:scale-105">
          <BhumiLogo size="lg" showWordmark={true} isDark={false} className="flex-col !gap-2" />
        </div>

        {/* Platform Title Banner */}
        <div className="mt-8 text-center space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <span className="font-black text-lg md:text-xl tracking-wider font-sans">
              BHUMI-X
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-900/60 text-sky-300 border border-sky-500/40">
              GOVT. OF INDIA
            </span>
          </div>

          <p className="text-xs md:text-sm text-gray-300 max-w-sm mx-auto font-medium">
            National Land Intelligence Platform | Ministry of Rural Development
          </p>
        </div>

        {/* Progress Bar & Status Feed */}
        <div className="mt-8 w-64 md:w-72">
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Initializing Secure Institutional Rail...</span>
          </div>
        </div>

        {/* Fast Skip Action */}
        <button
          onClick={onComplete}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10 transition-colors"
        >
          <span>Enter Platform</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
