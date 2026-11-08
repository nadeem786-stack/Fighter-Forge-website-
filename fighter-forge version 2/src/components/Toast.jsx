import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext.jsx';

export function Toast({ navigateTo }) {
  const { toast, hideToast } = useCart();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 max-w-sm w-full animate-slideUp">
      <div
        className="bg-[#181818] border-l-4 border-[#E10B1F] border-y border-r border-zinc-800 text-white p-4 shadow-2xl flex items-start justify-between gap-3"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
        }}
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-ping"></span>
            <span className="font-display text-sm tracking-wider text-white">
              {toast.title}
            </span>
          </div>
          {toast.message && (
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
              {toast.message}
            </p>
          )}

          {toast.link && (
            <button
              onClick={() => {
                hideToast();
                navigateTo('cart');
              }}
              className="mt-2.5 text-xs font-bold text-[#E10B1F] hover:text-white uppercase tracking-wider flex items-center gap-1 group transition-colors"
            >
              <span>VIEW ENQUIRY CART</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          )}
        </div>

        <button
          onClick={hideToast}
          className="text-zinc-500 hover:text-white p-1 text-xs"
          aria-label="Dismiss toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
