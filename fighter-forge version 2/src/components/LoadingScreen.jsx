import React, { useState, useEffect } from 'react';

export function LoadingScreen({ onFinish }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFading(true);
    }, 900);

    const timer2 = setTimeout(() => {
      onFinish();
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col items-center justify-center transition-opacity duration-400 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Pulsing Shield Icon */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center animate-pulse">
          <img
            src="/assets/fighter-forge-shield.png"
            alt="Fighter Forge Shield"
            className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(225,11,31,0.6)]"
          />
        </div>

        {/* Brand Text */}
        <div className="mt-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl tracking-widest text-white uppercase">
            FIGHTER FORGE
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="w-1.5 h-1.5 bg-[#E10B1F] animate-ping"></span>
            <span className="text-[11px] font-bold text-zinc-400 tracking-[0.3em] uppercase">
              FORGING ARENA HARDWARE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
