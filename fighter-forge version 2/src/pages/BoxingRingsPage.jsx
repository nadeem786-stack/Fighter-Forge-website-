import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';

export function BoxingRingsPage({ navigateTo, onOpenRentalModal }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'floor', 'elevated'
  const [elevatedHeightFilter, setElevatedHeightFilter] = useState('all'); // 'all', '1-2ft', '3ft'

  const rings = siteConfig.boxingRings;

  const filteredRings = rings.filter((ring) => {
    if (activeFilter === 'floor') return ring.category === 'floor';
    if (activeFilter === 'elevated') {
      if (elevatedHeightFilter === '1-2ft') return ring.id.includes('training') || ring.id.includes('1-2');
      if (elevatedHeightFilter === '3ft') return ring.isPro;
      return ring.category === 'elevated';
    }
    return true;
  });

  const handleCustomEnquiry = () => {
    navigateTo('customize');
  };

  const handleWhatsAppConsult = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I need expert sizing advice and a quote for a Boxing Ring. My gym/event dimensions are...`
    );
  };

  const handleWhatsAppRingRental = () => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I want to rent an IPBL-standard Boxing Ring for an upcoming boxing tournament / fight night in India. Please share rental rates, transport, and availability.`
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Page Header with Breadcrumb */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
            <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
              HOME
            </button>
            <span>/</span>
            <span className="text-[#E10B1F]">BOXING RINGS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#E10B1F] uppercase mb-2">
                <span className="diagonal-slash scale-75"></span>
                <span>HEAVY-GAUGE ARENA STEEL</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-none">
                BOXING RINGS
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
                Olympic regulation and professional championship boxing rings. Manufactured with heavy square-tube corner posts, high-tensile 4-rope safety systems, and dual-layer acoustic dampening.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenRentalModal}
                className="chamfer-btn-sm bg-gradient-to-r from-[#C9A24B] to-[#b58f3c] text-black font-bold px-5 py-3 text-xs font-display tracking-widest uppercase transition-all flex items-center gap-2 glow-gold"
              >
                <span>RENT RINGS FOR EVENTS</span>
                <span>↗</span>
              </button>
              <button
                onClick={handleWhatsAppConsult}
                className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white px-5 py-3 text-xs font-display tracking-widest uppercase transition-all flex items-center gap-2"
              >
                <span>RING SIZING GUIDE</span>
                <span>↗</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Height Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          {/* Category Tabs: ALL | FLOOR | ELEVATED */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              ALL BOXING RINGS ({rings.length})
            </button>

            <button
              onClick={() => setActiveFilter('floor')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'floor'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              FLOOR-LEVEL RINGS
            </button>

            <button
              onClick={() => setActiveFilter('elevated')}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                activeFilter === 'elevated'
                  ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              ELEVATED RINGS
            </button>
          </div>

          {/* Elevated Height Sub-Filter (Visible when Elevated or All selected) */}
          {(activeFilter === 'elevated' || activeFilter === 'all') && (
            <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 p-1.5 rounded">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2">
                HEIGHT:
              </span>

              <button
                onClick={() => setElevatedHeightFilter('all')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                  elevatedHeightFilter === 'all'
                    ? 'bg-zinc-700 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setElevatedHeightFilter('1-2ft')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                  elevatedHeightFilter === '1-2ft'
                    ? 'bg-[#E10B1F] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                1–2 ft Training
              </button>

              <button
                onClick={() => setElevatedHeightFilter('3ft')}
                className={`px-2.5 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors ${
                  elevatedHeightFilter === '3ft'
                    ? 'bg-[#C9A24B] text-black'
                    : 'text-[#C9A24B] hover:bg-[#C9A24B]/10'
                }`}
              >
                <span>★ 3 ft Pro (100 cm)</span>
              </button>
            </div>
          )}
        </div>

        {/* Event Rental Banner for Promoters */}
        <div className="mt-4 p-5 bg-gradient-to-r from-[#17130C] via-[#121212] to-black border-2 border-[#C9A24B] rounded flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E10B1F] animate-ping"></span>
              <span className="text-xs font-bold text-[#C9A24B] uppercase tracking-widest">
                EVENT RENTALS ACROSS INDIA • IPBL & PRO FIGHT NIGHTS
              </span>
            </div>
            <div className="text-lg font-display text-white uppercase tracking-wide">
              NEED A COMPETITION BOXING RING ON RENTAL FOR YOUR EVENT?
            </div>
            <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
              We provide elevated 3ft Pro and training rings on rental for IPBL (India Pro Boxing League), state championships, and televised fight nights across India. Includes certified on-site setup crew, acoustic subfloor, and teardown.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={onOpenRentalModal}
              className="chamfer-btn-sm bg-[#E10B1F] hover:bg-[#c80718] text-white px-5 py-2.5 text-xs font-display tracking-widest uppercase glow-red flex items-center justify-center gap-1.5"
            >
              <span>RENT ON WHATSAPP</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRings.map((ring) => (
            <ProductCard key={ring.id} product={ring} />
          ))}
        </div>
      </section>

      {/* Bottom Customization Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div
          className="relative bg-[#161616] border border-zinc-800 p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
          }}
        >
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C9A24B] uppercase tracking-wider">
              <span>★ BESPOKE FABRICATION</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-wide">
              NEED A SPECIFIC SIZE OR GYM LOGO CANVAS?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We manufacture non-standard sizes (e.g. 15×15 ft, 22×22 ft), custom rope wrapping, custom corner cushion colors, and print your gym logo sharp on the canvas.
            </p>
          </div>

          <button
            onClick={handleCustomEnquiry}
            className="chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-8 py-4 text-sm font-display tracking-widest uppercase glow-gold transition-all whitespace-nowrap"
          >
            CUSTOMIZE YOUR RING →
          </button>
        </div>
      </section>
    </div>
  );
}
