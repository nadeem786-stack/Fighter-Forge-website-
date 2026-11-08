import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { SloganMarquee } from '../components/SloganMarquee.jsx';
import { ClientLogosMarquee } from '../components/ClientLogosMarquee.jsx';
import { ElevationDiagram } from '../components/ElevationDiagram.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';

export function HomePage({ navigateTo, onOpenGearCommunity, onOpenRentalModal }) {
  // Animated counters state
  const [counts, setCounts] = useState(siteConfig.stats.map(() => 0));

  useEffect(() => {
    const duration = 1800; // ms
    const steps = 30;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // easeOutQuad
      const eased = 1 - (1 - progress) * (1 - progress);
      setCounts(siteConfig.stats.map(s => {
        const val = s.value * eased;
        return s.value % 1 === 0 ? Math.round(val) : parseFloat(val.toFixed(1));
      }));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleHeroWhatsApp = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I'm ready to build my combat arena. Please consult me on Boxing Rings & MMA Cages.`
    );
  };

  const handleRentalWhatsApp = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I want to rent a Boxing Ring / MMA Cage for an upcoming combat event in India (IPBL / MMA Fight Night). Please share rental packages, logistics, and dates.`
    );
  };

  return (
    <div className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* =========================================================
          1. HERO SECTION
          ========================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 bg-black overflow-hidden spotlight-top-red">
        {/* Full-Bleed Dark Arena Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=2000&auto=format&fit=crop"
            alt="Fighter Forge Dark Combat Arena"
            className="w-full h-full object-cover object-center opacity-35 scale-105 animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          {/* Gradients to darken edges & blend into page */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
        </div>

        {/* Faded Shield Watermark in Center */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark w-[600px] sm:w-[850px] opacity-[0.045] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-4 flex flex-col items-center">
          {/* Red Slash & Brand Subhead */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full mb-6">
            <div className="diagonal-slash-pair scale-75">
              <span></span>
              <span></span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-zinc-300">
              INDIAN-MADE / COMBAT SPORTS EQUIPMENT
            </span>
          </div>

          {/* Main Slogan Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display tracking-tight text-white uppercase leading-[0.9] drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
            BUILT FOR <span className="text-[#E10B1F]">CHAMPIONS.</span>
          </h1>

          {/* Subline */}
          <p className="mt-6 text-base sm:text-xl md:text-2xl text-zinc-300 max-w-3xl font-normal leading-relaxed drop-shadow">
            {siteConfig.subTagline} Heavy-gauge steel fabrication, competition-grade padding, and direct factory pricing.
          </p>

          {/* Dual CTAs: SHOP BOXING RINGS & SHOP MMA CAGES */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('boxing-rings')}
              className="w-full sm:w-auto chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-8 py-4 font-display text-lg tracking-widest uppercase glow-red transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>SHOP BOXING RINGS</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => navigateTo('mma-cages')}
              className="w-full sm:w-auto chamfer-btn bg-zinc-900 hover:bg-zinc-800 border-2 border-zinc-700 hover:border-[#E10B1F] text-white px-8 py-4 font-display text-lg tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>SHOP MMA CAGES</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Request a Custom Build Shortcut */}
          <div className="mt-6">
            <button
              onClick={() => navigateTo('customize')}
              className="text-xs sm:text-sm font-bold text-zinc-400 hover:text-[#C9A24B] tracking-widest uppercase transition-colors flex items-center gap-2 group"
            >
              <span className="text-[#C9A24B]">★</span>
              <span>Need custom dimensions or gym branding? Request a Custom Build</span>
              <span className="group-hover:translate-x-1 transition-transform text-[#C9A24B]">→</span>
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase mb-1">SCROLL</span>
          <div className="w-4 h-7 border border-zinc-500 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-[#E10B1F] rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. CLIENT LOGOS MOVING STRIP (RIGHT TO LEFT)
          ========================================================= */}
      <ClientLogosMarquee />

      {/* =========================================================
          3. TWO BIG CATEGORY CARDS (SPLIT SCREEN)
          ========================================================= */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* CARD 1: BOXING RINGS */}
          <div
            onClick={() => navigateTo('boxing-rings')}
            className="group relative h-[420px] sm:h-[480px] bg-[#161616] border border-zinc-800 hover:border-[#E10B1F] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(225,11,31,0.35)]"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=1200&auto=format&fit=crop"
              alt="Fighter Forge Boxing Rings"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 opacity-65 group-hover:opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>

            {/* Red Accent Slash at Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <div className="diagonal-slash-pair">
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#E10B1F] mb-1 flex items-center gap-2">
                <span>OLYMPIC & PRO ARENA LEVEL</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display tracking-tight text-white uppercase group-hover:text-[#E10B1F] transition-colors">
                BOXING RINGS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md line-clamp-2">
                Floor-level daily training rings to 3 ft (100 cm) Pro Competition stages. High-tensile 4-rope system & heavy corner pads.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-display tracking-widest text-white group-hover:text-[#E10B1F] transition-colors">
                <span>EXPLORE RINGS</span>
                <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </div>

          {/* CARD 2: MMA CAGES */}
          <div
            onClick={() => navigateTo('mma-cages')}
            className="group relative h-[420px] sm:h-[480px] bg-[#161616] border border-zinc-800 hover:border-[#E10B1F] overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(225,11,31,0.35)]"
            style={{
              clipPath: 'polygon(20px 0%, 100% 0%, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0% 100%, 0% 20px)'
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop"
              alt="Fighter Forge MMA Cages"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 opacity-65 group-hover:opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>

            {/* Red Accent Slash at Top Right */}
            <div className="absolute top-4 right-4 z-10">
              <div className="diagonal-slash-pair">
                <span></span>
                <span></span>
              </div>
            </div>

            {/* Content Bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 flex flex-col justify-end">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#E10B1F] mb-1 flex items-center gap-2">
                <span>CHAMPIONSHIP OCTAGON & HEXAGON</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-display tracking-tight text-white uppercase group-hover:text-[#E10B1F] transition-colors">
                MMA CAGES
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-md line-clamp-2">
                Unified rules fight cages. Heavy 9-gauge vinyl-dipped steel chainlink, zero-sag fence framing, and high-impact post bumpers.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm font-display tracking-widest text-white group-hover:text-[#E10B1F] transition-colors">
                <span>EXPLORE CAGES</span>
                <span className="text-lg group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. BRAND SLOGAN MARQUEE
          ========================================================= */}
      <SloganMarquee />

      {/* =========================================================
          EVENT RENTALS: IPBL & PRO MMA ARENA RENTALS ACROSS INDIA
          ========================================================= */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#12100C] via-[#0E0E0E] to-[#0A0A0A] border-y border-[#C9A24B]/40 overflow-hidden">
        {/* Subtle Background Watermark */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-10%] w-[500px] opacity-[0.035]"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-zinc-800">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A24B]/15 border border-[#C9A24B]/40 text-xs font-bold tracking-widest text-[#C9A24B] uppercase">
                <span className="w-1.5 h-1.5 bg-[#C9A24B] animate-ping"></span>
                <span>NATIONWIDE EVENT RENTALS • ALL INDIA</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-display tracking-tight text-white uppercase leading-tight">
                RENT BOXING RINGS & MMA CAGES FOR EVENTS IN INDIA
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                We supply and install competition-standard Boxing Rings and MMA Cages on rental for professional combat events across India—including <strong>IPBL (India Pro Boxing League)</strong>, State Championships, and mid-pro to UFC-caliber fight leagues. Complete logistics, dedicated erection crew, and teardown included.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={onOpenRentalModal}
                className="chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-7 py-3.5 font-display text-sm sm:text-base tracking-widest uppercase glow-red transition-all flex items-center justify-center gap-2"
              >
                <span>RENT ON WHATSAPP</span>
                <span className="text-lg">↗</span>
              </button>
            </div>
          </div>

          {/* 4 Feature Columns for Event Promoters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div className="bg-[#141414] border border-zinc-800 p-5 rounded">
              <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
                01. IPBL SPECIFICATION RINGS
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">
                ELEVATED & FLOOR RINGS
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Official 16ft to 24ft competition rings with 1–2 ft and 3 ft (100 cm) Pro sanctioning clearances, rigid posts, and dual corner stairs.
              </p>
            </div>

            <div className="bg-[#141414] border border-zinc-800 p-5 rounded">
              <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
                02. UFC-STANDARD MMA OCTAGONS
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">
                20FT & 24FT PRO CAGES
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Heavy 9-gauge smooth vinyl dip mesh with zero finger-snag, thick padded corner bumpers, and dual fighter/medic entry doors.
              </p>
            </div>

            <div className="bg-[#141414] border border-zinc-800 p-5 rounded">
              <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
                03. ON-SITE CREW & DISMANTLE
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">
                WHITE-GLOVE EVENT LOGISTICS
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Our certified installation crew travels with the hardware. We erect the arena, verify tension safety, and pack up post-event.
              </p>
            </div>

            <div className="bg-[#141414] border border-zinc-800 p-5 rounded">
              <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
                04. CUSTOM SPONSOR BRANDING
              </div>
              <h4 className="font-display text-lg text-white uppercase tracking-wide">
                BROADCAST-READY GRAPHICS
              </h4>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Custom canvas center logo printing, ring skirts, and corner bumper covers tailored to your fight night sponsors and broadcast needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. WHY FIGHTER FORGE (6 FEATURE BLOCKS)
          ========================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#E10B1F] uppercase mb-2">
            <span>// NO SHORTCUTS. NO COMPROMISE.</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display tracking-tight text-white uppercase">
            WHY FIGHTER FORGE HARDWARE
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 leading-relaxed">
            Every millimeter of steel, foam, and vinyl is precision engineered for championship athletes who test equipment to the absolute limit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.whyUs.map((feature, idx) => (
            <div
              key={idx}
              className="bg-[#141414] border border-zinc-800 p-6 sm:p-7 hover:border-[#E10B1F]/60 transition-all duration-300 hover:-translate-y-1 group"
              style={{
                clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
              }}
            >
              <div className="w-12 h-12 bg-black border border-zinc-800 group-hover:border-[#E10B1F] flex items-center justify-center text-[#E10B1F] font-bold text-lg mb-5 transition-colors">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-display text-white tracking-wider uppercase group-hover:text-[#E10B1F] transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          6. ELEVATION SPOTLIGHT & BLUEPRINT DIAGRAM
          ========================================================= */}
      <ElevationDiagram />

      {/* =========================================================
          7. CUSTOMIZE SECTION (VERY VISIBLE)
          ========================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A0A0A] via-[#14120D] to-[#0A0A0A] border-y border-zinc-800 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A24B]/15 border border-[#C9A24B]/40 text-xs font-bold tracking-widest text-[#C9A24B] uppercase">
              <span>★ BESPOKE ARENA ENGINEERING</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display tracking-tight text-white uppercase leading-none">
              YOUR RING. YOUR CAGE. <br />
              <span className="text-[#C9A24B]">YOUR BRAND.</span>
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Don't settle for generic off-the-shelf equipment. We manufacture custom dimensions, custom frame heights, and print high-contrast gym logos on canvases, corner pads, and fence bumpers.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A24B] font-bold">✔</span>
                <span>Custom Ring & Cage Dimensions</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A24B] font-bold">✔</span>
                <span>Full Logo Canvas Printing</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A24B] font-bold">✔</span>
                <span>Custom Corner Pad Colors</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C9A24B] font-bold">✔</span>
                <span>Free 2D/3D CAD Gym Blueprint</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('customize')}
              className="chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-8 py-4 text-base font-display tracking-widest uppercase glow-gold transition-all duration-300 text-center"
            >
              CUSTOMIZE YOURS NOW →
            </button>
            <button
              onClick={() => {
                openWhatsApp(
                  `Hello Fighter Forge, I have a custom gym layout and I want an engineered quote for a bespoke Ring / Cage build.`
                );
              }}
              className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all text-center flex items-center justify-center gap-2"
            >
              <span>WHATSAPP CAD CONSULTATION</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          8. HOW IT WORKS (4 STEPS)
          ========================================================= */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold tracking-widest text-[#E10B1F] uppercase mb-2">
            // SEAMLESS PROCESS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display tracking-tight text-white uppercase">
            HOW IT WORKS
          </h2>
          <p className="text-sm text-zinc-400 mt-2">
            Zero online payment hassle. Fast direct-from-factory quotes delivered to your phone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.howItWorks.map((step) => (
            <div
              key={step.step}
              className="bg-[#141414] border border-zinc-800 p-6 flex flex-col justify-between hover:border-[#E10B1F] transition-all"
              style={{
                clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
              }}
            >
              <div>
                <div className="font-display text-4xl text-[#E10B1F] tracking-tight mb-3">
                  {step.step}
                </div>
                <h3 className="text-lg font-display text-white tracking-wider uppercase mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          9. GEAR LOCKER TEASER & COMMUNITY BUILDER
          ========================================================= */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#111111] border-y border-zinc-800">
        <div className="max-w-7xl mx-auto bg-black border border-zinc-800 p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E10B1F]/20 text-[#E10B1F] border border-[#E10B1F] text-xs font-bold uppercase tracking-wider">
              <span>⚡ UPCOMING COMBAT GEAR</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display uppercase tracking-wide text-white">
              {siteConfig.upcomingGear.subtitle}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {siteConfig.upcomingGear.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {siteConfig.upcomingGear.categories.map((cat, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded"
                >
                  • {cat.name} ({cat.status})
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenGearCommunity}
              className="chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-6 py-3.5 text-xs sm:text-sm font-display tracking-widest uppercase glow-red transition-all text-center flex items-center justify-center gap-2"
            >
              <span>SUBMIT GEAR IDEAS / SHAPE SKUS</span>
              <span>💡</span>
            </button>
            <button
              onClick={() => {
                openWhatsApp(
                  `Hello Fighter Forge, please notify me on WhatsApp as soon as your Boxing Gloves & Combat Gear drop!`
                );
              }}
              className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 px-5 py-3.5 text-xs font-bold tracking-wider uppercase transition-all text-center"
            >
              NOTIFY ME ON WHATSAPP
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          10. STATS BAR WITH ANIMATED COUNTERS
          ========================================================= */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#141414] border border-zinc-800 p-6 text-center group hover:border-[#E10B1F] transition-all"
              style={{
                clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
              }}
            >
              <div className="text-4xl sm:text-6xl font-display text-white tracking-tight group-hover:text-[#E10B1F] transition-colors">
                {counts[i]}
                {stat.suffix}
              </div>
              <div className="font-display text-sm tracking-wider uppercase text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 mt-1">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          11. FINAL CTA BANNER
          ========================================================= */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black text-center border-t border-zinc-800 spotlight-bottom-red">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="diagonal-slash-pair">
            <span></span>
            <span></span>
          </div>
          <h2 className="text-4xl sm:text-7xl font-display tracking-tight text-white uppercase leading-none">
            READY TO BUILD <br />
            <span className="text-[#E10B1F]">YOUR ARENA?</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Direct from our heavy steel fabrication facility to your venue. Get custom sizes, engineered blueprints, and instant quotes on WhatsApp today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleHeroWhatsApp}
              className="w-full sm:w-auto chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-10 py-4 font-display text-xl tracking-widest uppercase glow-red transition-all flex items-center justify-center gap-3"
            >
              <span>TALK TO AN ENGINEER ON WHATSAPP</span>
              <span>↗</span>
            </button>
            <button
              onClick={() => navigateTo('customize')}
              className="w-full sm:w-auto chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-8 py-4 font-display text-base tracking-widest uppercase transition-all"
            >
              OPEN CUSTOM ARENA BUILDER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
