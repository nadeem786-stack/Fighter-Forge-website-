import React from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp } from '../utils/whatsapp.js';

export function Footer({ navigateTo, onOpenGearCommunity, onOpenRentalModal }) {
  const handleNav = (page) => {
    navigateTo(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppContact = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I'm reaching out from your website footer. I'd like to talk to a combat arena specialist.`
    );
  };

  return (
    <footer className="relative bg-[#0A0A0A] border-t border-zinc-800 text-zinc-400 overflow-hidden pt-16 pb-12">
      {/* Subtle Background Watermark Shield */}
      <img
        src="/assets/fighter-forge-shield.png"
        alt=""
        aria-hidden="true"
        className="shield-watermark right-[-5%] bottom-[-10%] w-[450px] opacity-[0.03]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src="/assets/fighter-forge-horizontal.png"
              alt="FIGHTER FORGE"
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer"
              onClick={() => handleNav('home')}
            />
            <p className="font-display text-lg text-white tracking-widest pt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E10B1F]"></span>
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Industrial-grade manufacturer of championship Boxing Rings and MMA Cages. Engineered from heavy-gauge structural steel for fighters, combat academies, and broadcast fight leagues.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleWhatsAppContact}
                className="chamfer-btn-sm bg-[#E10B1F]/20 hover:bg-[#E10B1F] border border-[#E10B1F] text-white px-4 py-2 text-xs font-bold tracking-wider transition-all duration-200 flex items-center gap-2"
              >
                <span>WHATSAPP</span>
                <span className="text-xs">↗</span>
              </button>
              <button
                onClick={onOpenGearCommunity}
                className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 px-3.5 py-2 text-xs font-bold tracking-wider transition-all duration-200"
              >
                GEAR COMMUNITY
              </button>
            </div>
          </div>

          {/* Col 3: Arena Equipment Links */}
          <div className="space-y-3">
            <h4 className="text-white font-display text-base tracking-wider uppercase border-l-2 border-[#E10B1F] pl-2.5">
              ARENA EQUIPMENT
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={onOpenRentalModal}
                  className="text-[#C9A24B] hover:underline font-bold text-left flex items-center gap-1.5"
                >
                  <span>★ Event Rentals (IPBL & MMA)</span>
                  <span className="text-[10px] bg-[#C9A24B]/20 text-[#C9A24B] px-1 py-0.2 rounded font-bold">ALL INDIA</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('boxing-rings')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Floor Boxing Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('boxing-rings')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Elevated Rings (1–2 ft)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('boxing-rings')}
                  className="hover:text-[#C9A24B] hover:translate-x-1 transition-all text-left flex items-center gap-1.5"
                >
                  <span>Pro Competition Ring (3 ft)</span>
                  <span className="text-[10px] bg-[#C9A24B]/20 text-[#C9A24B] px-1 py-0.2 rounded font-bold">PRO</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mma-cages')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Floor MMA Octagons
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('mma-cages')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Elevated MMA Cages
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('customize')}
                  className="text-[#C9A24B] hover:underline font-semibold text-left pt-1 block"
                >
                  Custom Gym Blueprints →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Stories */}
          <div className="space-y-3">
            <h4 className="text-white font-display text-base tracking-wider uppercase border-l-2 border-[#E10B1F] pl-2.5">
              PLATFORM & SPECS
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('stories')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Arena Engineering Stories
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('stories')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Why 100cm (3ft) Pro Height
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('stories')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Octagon vs Hexagon Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('cart')}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Enquiry Cart Checkout
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenGearCommunity}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  Build Your Own Gear / Ideas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Factory HQ & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-display text-base tracking-wider uppercase border-l-2 border-[#E10B1F] pl-2.5">
              FACTORY CONTACT
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <p>
                <strong className="text-zinc-200 block text-sm">WhatsApp Hotline:</strong>
                <span className="text-[#E10B1F] font-bold text-sm">{siteConfig.phoneDisplay}</span>
              </p>
              <p>
                <strong className="text-zinc-200 block">Direct Factory Email:</strong>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white underline">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <strong className="text-zinc-200 block">Manufacturing Arena:</strong>
                {siteConfig.address.line1}, {siteConfig.address.city}, {siteConfig.address.country}
              </p>

              {/* Coming Soon Notice */}
              <div className="pt-3 border-t border-zinc-800">
                <div className="bg-zinc-900/90 border border-zinc-800 p-2.5 rounded">
                  <div className="text-[11px] font-bold text-[#E10B1F] uppercase tracking-wider flex items-center gap-1">
                    <span>⚡ COMING SOON</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 pt-0.5">
                    Boxing Gloves, Shin Armor & Pro Combat Apparel in R&D.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Brand Elements */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} FIGHTER FORGE. All rights reserved.</span>
            <span className="text-zinc-700">|</span>
            <span className="text-zinc-400 font-semibold tracking-wider">BOXING RINGS & MMA CAGES</span>
          </div>

          <div className="flex items-center space-x-6 text-zinc-400 font-medium">
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('home')}>Discipline Builds Champions</span>
            <span className="text-zinc-700">•</span>
            <span className="hover:text-white cursor-pointer" onClick={() => handleNav('customize')}>Custom Gym CAD</span>
            <span className="text-zinc-700">•</span>
            <span className="hover:text-[#E10B1F] cursor-pointer" onClick={handleWhatsAppContact}>Direct WhatsApp Enquiry</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
