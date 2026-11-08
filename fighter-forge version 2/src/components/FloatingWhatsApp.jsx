import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp, getFloatingWhatsAppGreeting } from '../utils/whatsapp.js';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    openWhatsApp(getFloatingWhatsAppGreeting());
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip Pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center bg-[#1A1A1A] text-white border border-[#E10B1F]/60 px-3.5 py-2 rounded shadow-2xl text-xs font-semibold tracking-wide animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-ping mr-2"></span>
          <span>WhatsApp Factory Hotline • Direct Quotes</span>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group p-3.5 sm:p-4 bg-[#E10B1F] hover:bg-[#c80718] text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center animate-pulse-glow"
        aria-label="Chat on WhatsApp"
        title="Direct WhatsApp Arena Support"
      >
        {/* Subtle Ring Ping */}
        <span className="absolute -inset-1 rounded-full bg-[#E10B1F] opacity-30 group-hover:opacity-60 blur-sm animate-ping"></span>

        {/* WhatsApp Official Style SVG */}
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.203c.043.072.043.419-.101.824z" />
          <path d="M12.04 2C6.496 2 2 6.496 2 12.04c0 1.95.556 3.774 1.521 5.318L2 22l4.787-1.493C8.28 21.392 10.106 22 12.04 22c5.544 0 10.04-4.496 10.04-10.04C22.08 6.496 17.584 2 12.04 2zm0 18.238c-1.802 0-3.483-.559-4.877-1.517l-.35-.24-2.875.898.913-2.793-.243-.365c-1.03-1.55-1.568-3.37-1.568-5.221 0-4.542 3.696-8.238 8.24-8.238 4.544 0 8.24 3.696 8.24 8.238 0 4.542-3.696 8.238-8.24 8.238z" />
        </svg>

        {/* Small "CHAT" Pill under */}
        <span className="absolute -bottom-2 bg-black border border-[#E10B1F] text-[9px] font-display px-1.5 py-0.2 tracking-wider uppercase text-white rounded">
          CHAT
        </span>
      </button>
    </div>
  );
}
