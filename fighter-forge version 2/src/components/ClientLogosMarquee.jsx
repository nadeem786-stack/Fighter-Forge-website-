import React from 'react';
import { siteConfig } from '../config/siteConfig.js';

export function ClientLogosMarquee() {
  // Duplicate array for seamless infinite marquee loop
  const clientList = [...siteConfig.clients, ...siteConfig.clients];

  return (
    <div className="relative py-8 bg-[#0D0D0D] border-y border-zinc-800/80 overflow-hidden">
      {/* Label on left on desktop */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="diagonal-slash-pair">
            <span></span>
            <span></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-400">
            TRUSTED BY ELITE ARENAS, PRO FIGHT CAMPS & CHAMPIONSHIP PROMOTIONS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-[#E10B1F] font-bold tracking-widest">
          <span>FACTORY DIRECT BUILDS</span>
          <span>•</span>
          <span>NATIONWIDE DISPATCH</span>
        </div>
      </div>

      {/* Marquee Track Moving from Right to Left */}
      <div className="flex overflow-hidden select-none mask-gradient-x">
        <div className="animate-marquee-left flex items-center gap-6 py-2">
          {clientList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="flex items-center gap-3 bg-[#161616] hover:bg-[#1f1f1f] border border-zinc-800 hover:border-[#E10B1F]/40 px-5 py-3 transition-all duration-200 cursor-default shrink-0 group"
              style={{
                clipPath: 'polygon(8px 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%, 0% 8px)'
              }}
            >
              {/* Shield Icon Accent */}
              <div className="w-8 h-8 rounded bg-black/60 border border-zinc-700 group-hover:border-[#E10B1F] flex items-center justify-center shrink-0 transition-colors">
                <span className="text-[#E10B1F] font-display text-sm font-bold">FF</span>
              </div>

              <div>
                <div className="font-display text-sm tracking-wider text-white group-hover:text-[#E10B1F] transition-colors whitespace-nowrap">
                  {client.name}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-sans tracking-wide">
                  <span>{client.city}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-500">{client.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
