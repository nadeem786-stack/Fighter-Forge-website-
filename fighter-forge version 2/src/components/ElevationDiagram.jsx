import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp } from '../utils/whatsapp.js';

export function ElevationDiagram() {
  const [selectedElevation, setSelectedElevation] = useState('3ft');

  const elevations = [
    {
      id: 'floor',
      title: 'FLOOR-LEVEL',
      height: '0 ft (Flush ground frame)',
      badge: 'TRAINING & SPARRING',
      badgeColor: 'border-zinc-600 text-zinc-300 bg-zinc-900',
      description: 'Mounts directly to gym floor. Perfect for standard ceiling heights (under 11 ft) and heavy daily training without elevated steps.',
      features: [
        'Direct bolt-down floor posts',
        'Zero structural ceiling height conflict',
        'Easy fighter access without stairs',
        'Fast 4-hour setup or teardown'
      ],
      idealFor: 'Commercial Fight Gyms, Sparring Zones, Conditioning Academies',
      diagramHeightPercent: '12%'
    },
    {
      id: '1-2ft',
      title: '1–2 FT ELEVATED',
      height: '1–2 ft (≈30–60 cm)',
      badge: 'EVENT & SHOWCASE',
      badgeColor: 'border-[#E10B1F] text-[#E10B1F] bg-[#E10B1F]/10',
      description: 'The preferred arena sweet spot for fight nights, showcase academies, and club tournaments. Elevates action for clear crowd sightlines.',
      features: [
        'Interlocking structural steel subframe',
        'Sound-dampening acoustic subfloor panels',
        '1 welded non-slip access staircase',
        'Full 360° branded perimeter skirt'
      ],
      idealFor: 'Showcase Combat Gyms, Club Tournaments, Media Sparring',
      diagramHeightPercent: '45%'
    },
    {
      id: '3ft',
      title: '3 FT (≈100 CM) PRO LEVEL',
      height: '3 ft (≈100 cm) Official Pro Level',
      badge: 'PRO COMPETITION HEIGHT',
      isPro: true,
      badgeColor: 'border-[#C9A24B] text-[#C9A24B] bg-[#C9A24B]/15',
      description: 'Official sanctioning-body championship elevation. Engineered strictly for national & international title bouts, arena fight leagues, and TV broadcasts.',
      features: [
        'Official IBA & Olympic Boxing clearance',
        'Unified MMA Rules certified 100 cm platform',
        'Dual fighter entrance stairs (Red & Blue corners)',
        'Heavy industrial box-truss vibration dampening',
        'Judge table line-of-sight elevation geometry'
      ],
      idealFor: 'Championship Fight Leagues, Televised Arenas, Stadium Title Bouts',
      diagramHeightPercent: '85%'
    }
  ];

  const current = elevations.find(e => e.id === selectedElevation) || elevations[2];

  const handleEnquireHeight = () => {
    openWhatsApp(
      `Hello Fighter Forge, I'm reviewing your Elevation Standards. I would like a quote for a ${current.title} (${current.height}) arena setup.`
    );
  };

  return (
    <section className="relative py-20 bg-[#121212] border-t border-zinc-800 text-white overflow-hidden">
      {/* Background Watermark */}
      <img
        src="/assets/fighter-forge-shield.png"
        alt=""
        aria-hidden="true"
        className="shield-watermark left-[-10%] top-[10%] w-[500px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 text-xs font-bold tracking-widest text-zinc-300 uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-[#E10B1F]"></span>
            ENGINEERING SPECIFICATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-display tracking-tight text-white uppercase">
            ELEVATION STANDARDS & ARENA HEIGHTS
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every arena serves a distinct battleground. Choose between low-profile floor installations, intermediate 1–2 ft event platforms, or our flagship 3 ft (100 cm) Pro Championship stage.
          </p>
        </div>

        {/* 3 Height Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {elevations.map((elev) => {
            const isSelected = selectedElevation === elev.id;
            return (
              <button
                key={elev.id}
                onClick={() => setSelectedElevation(elev.id)}
                className={`relative text-left p-5 transition-all duration-300 border ${
                  isSelected
                    ? elev.isPro
                      ? 'bg-[#1C1810] border-[#C9A24B] glow-gold'
                      : 'bg-[#1A1A1A] border-[#E10B1F] glow-red'
                    : 'bg-[#161616] border-zinc-800 hover:border-zinc-700'
                }`}
                style={{
                  clipPath: 'polygon(12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)'
                }}
              >
                {/* Gold or Red Top Stripe */}
                {isSelected && (
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                      elev.isPro ? 'bg-[#C9A24B]' : 'bg-[#E10B1F]'
                    }`}
                  />
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${elev.badgeColor}`}>
                    {elev.badge}
                  </span>
                  {elev.isPro && (
                    <span className="text-[#C9A24B] text-xs font-bold">★ GOLD PRO</span>
                  )}
                </div>

                <div className="text-xl font-display text-white tracking-wider">
                  {elev.title}
                </div>
                <div className="text-xs text-zinc-400 font-semibold mt-1">
                  {elev.height}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Side-View Diagram & Engineering Detail Box */}
        <div
          className={`relative p-6 sm:p-10 border transition-all duration-300 ${
            current.isPro
              ? 'bg-gradient-to-br from-[#1A1712] to-[#121212] border-[#C9A24B]/60'
              : 'bg-[#181818] border-zinc-800'
          }`}
          style={{
            clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Side-View Height Diagram (Col 1-6) */}
            <div className="lg:col-span-6 bg-[#0E0E0E] border border-zinc-800/80 p-6 rounded relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E10B1F]"></span>
                  SIDE-VIEW ELEVATION BLUEPRINT
                </span>
                <span className="text-zinc-500">SCALE: 1:10</span>
              </div>

              {/* Graphical Blueprint Canvas */}
              <div className="relative h-64 sm:h-72 w-full mt-4 flex flex-col justify-end">
                {/* Horizontal Arena Ceiling Reference */}
                <div className="absolute top-4 left-0 right-0 border-b border-dashed border-zinc-700/60 flex items-center justify-between text-[10px] text-zinc-500 font-mono px-2">
                  <span>OVERHEAD LIGHTING RIG REFERENCE</span>
                  <span>14–16 FT CLEARANCE</span>
                </div>

                {/* Judge Sightline Laser (When 3ft Pro) */}
                {current.id === '3ft' && (
                  <div className="absolute top-[48%] left-0 right-0 border-b border-dotted border-[#C9A24B]/70 flex items-center justify-between text-[9px] text-[#C9A24B] font-mono px-2 z-20">
                    <span>EYE-LINE: SITTING JUDGES & SPECTATOR ROW</span>
                    <span>100 CM EYE LEVEL</span>
                  </div>
                )}

                {/* Platform Deck Body */}
                <div
                  className={`w-full relative transition-all duration-500 flex flex-col justify-end ${
                    current.id === 'floor'
                      ? 'h-6 bg-zinc-800 border-t-2 border-white'
                      : current.id === '1-2ft'
                      ? 'h-24 bg-zinc-900 border-t-4 border-[#E10B1F]'
                      : 'h-40 bg-[#221c11] border-t-4 border-[#C9A24B]'
                  }`}
                >
                  {/* Internal Steel Truss / Post Graphic */}
                  {current.id !== 'floor' && (
                    <div className="absolute inset-0 opacity-40 flex justify-around items-center px-4 pointer-events-none">
                      <div className="w-1.5 h-full bg-zinc-600"></div>
                      <div className="w-1.5 h-full bg-zinc-600"></div>
                      <div className="w-1.5 h-full bg-zinc-600"></div>
                      <div className="w-1.5 h-full bg-zinc-600"></div>
                      <div className="w-1.5 h-full bg-zinc-600"></div>
                    </div>
                  )}

                  {/* Ring Ropes & Posts Graphic on top of platform */}
                  <div className="absolute bottom-full left-4 right-4 h-28 flex justify-between items-end pb-0">
                    {/* Left Post */}
                    <div className="w-3 h-28 bg-[#E10B1F] relative flex flex-col justify-between py-2 items-center">
                      <div className="w-4 h-4 bg-white rounded-full -top-2 absolute"></div>
                    </div>

                    {/* 4 Ropes spanning */}
                    <div className="flex-1 h-24 flex flex-col justify-between py-2 px-1">
                      <div className="w-full h-1 bg-white shadow-sm"></div>
                      <div className="w-full h-1 bg-zinc-300"></div>
                      <div className="w-full h-1 bg-[#E10B1F]"></div>
                      <div className="w-full h-1 bg-zinc-400"></div>
                    </div>

                    {/* Right Post */}
                    <div className="w-3 h-28 bg-blue-600 relative flex flex-col justify-between py-2 items-center">
                      <div className="w-4 h-4 bg-white rounded-full -top-2 absolute"></div>
                    </div>
                  </div>

                  {/* Stairs graphic for elevated */}
                  {current.id !== 'floor' && (
                    <div className="absolute -left-6 bottom-0 w-8 h-full flex flex-col justify-between">
                      <div className="w-full h-1 bg-zinc-500"></div>
                      <div className="w-3/4 h-1 bg-zinc-500"></div>
                      <div className="w-1/2 h-1 bg-zinc-500"></div>
                    </div>
                  )}

                  {/* Platform Label */}
                  <div className="relative z-10 text-center py-2">
                    <span className="font-display tracking-widest text-xs sm:text-sm text-white px-2 py-0.5 bg-black/80 rounded">
                      {current.title} — {current.height}
                    </span>
                  </div>
                </div>

                {/* Ground Reference Baseline */}
                <div className="w-full h-3 bg-zinc-800 border-t border-zinc-600 flex items-center justify-between px-2 text-[9px] text-zinc-400 font-mono">
                  <span>GROUND LEVEL (0.00 M)</span>
                  <span>HEAVY CONCRETE ANCHOR BASE</span>
                </div>
              </div>
            </div>

            {/* Engineering Specifications (Col 7-12) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${current.badgeColor}`}>
                  {current.badge}
                </span>
                {current.isPro && (
                  <span className="text-xs text-[#C9A24B] font-display tracking-wider">
                    ★ SANCTIONED OFFICIAL COMPETITION ELEVATION
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-4xl font-display tracking-wide text-white uppercase">
                {current.title}
              </h3>

              <p className="text-zinc-300 text-sm leading-relaxed">
                {current.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
                  ENGINEERED FEATURES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-[#E10B1F] font-bold mt-0.5">✔</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-black/50 border border-zinc-800 rounded text-xs text-zinc-400">
                <strong className="text-white block mb-0.5">Recommended Installation:</strong>
                {current.idealFor}
              </div>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={handleEnquireHeight}
                  className={`chamfer-btn px-6 py-3 text-sm font-display tracking-widest text-white transition-all flex items-center gap-2 ${
                    current.isPro
                      ? 'bg-[#C9A24B] hover:bg-[#b58f3c] text-black font-bold glow-gold'
                      : 'bg-[#E10B1F] hover:bg-[#c80718] glow-red'
                  }`}
                >
                  <span>GET QUOTE FOR THIS HEIGHT</span>
                  <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
