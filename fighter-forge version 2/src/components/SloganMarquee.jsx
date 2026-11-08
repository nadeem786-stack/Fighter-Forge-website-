import React from 'react';
import { siteConfig } from '../config/siteConfig.js';

export function SloganMarquee() {
  const slogansCombined = [...siteConfig.slogans, ...siteConfig.slogans, ...siteConfig.slogans];

  return (
    <div className="relative bg-[#E10B1F] py-3.5 overflow-hidden text-black select-none shadow-lg">
      <div className="flex animate-marquee-left whitespace-nowrap items-center">
        {slogansCombined.map((slogan, index) => (
          <div key={index} className="flex items-center mx-6">
            <span className="font-display text-lg sm:text-xl font-bold tracking-widest text-black">
              {slogan}
            </span>
            <span className="mx-6 text-black/60 font-black text-xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
