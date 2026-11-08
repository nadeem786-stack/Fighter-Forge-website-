import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp } from '../utils/whatsapp.js';

export function StoriesPage({ navigateTo, onOpenRentalModal }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState(null);

  const categories = [
    'All',
    'Ring Engineering',
    'Cage Standards',
    'Athletes & Fight Science',
    'Arena News & Events'
  ];

  const filteredStories = activeCategory === 'All'
    ? siteConfig.stories
    : siteConfig.stories.filter(s => s.category === activeCategory);

  const handleArticleConsult = (story) => {
    openWhatsApp(
      `Hello Fighter Forge (+91 78389 66576), I was reading your story "${story.title}". I would like to consult with your engineering team regarding this arena setup.`
    );
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      {/* Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800 bg-[#0F0F0F] spotlight-top-red overflow-hidden">
        {/* Shield Watermark */}
        <img
          src="/assets/fighter-forge-shield.png"
          alt=""
          aria-hidden="true"
          className="shield-watermark right-[-5%] top-[-20%] w-[450px]"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-white">
              HOME
            </button>
            <span>/</span>
            <span className="text-[#E10B1F]">STORIES</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#E10B1F] uppercase mb-2">
            <span className="diagonal-slash scale-75"></span>
            <span>COMBAT SCIENCE & ARENA ENGINEERING</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-white leading-none">
            STORIES & ARENA NEWS
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-2xl leading-relaxed">
            Technical breakdowns of boxing ring acoustics, MMA cage geometry, fighter biomechanics, and championship arena engineering.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded border transition-all ${
                  activeCategory === cat
                    ? 'bg-[#E10B1F] border-[#E10B1F] text-white glow-red'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <article
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-[#141414] border border-zinc-800 hover:border-[#E10B1F] transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-[0_0_30px_rgba(225,11,31,0.2)]"
              style={{
                clipPath: 'polygon(14px 0%, 100% 0%, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0% 100%, 0% 14px)'
              }}
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-zinc-700 px-2.5 py-1 rounded text-[10px] font-bold text-[#E10B1F] uppercase tracking-wider">
                  {story.category}
                </div>
                <div className="absolute top-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] text-zinc-400 font-mono">
                  {story.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[11px] text-zinc-500 font-sans mb-1">
                    {story.date} • by {story.author}
                  </div>
                  <h2 className="text-xl font-display text-white tracking-wide uppercase group-hover:text-[#E10B1F] transition-colors leading-snug">
                    {story.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {story.tags.slice(0, 2).map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-display tracking-widest text-[#E10B1F] group-hover:translate-x-1 transition-transform">
                    READ STORY →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* FULL STORY READER MODAL */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-4xl bg-[#141414] border border-zinc-800 text-white shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            style={{
              clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-30 p-2.5 bg-black/80 hover:bg-[#E10B1F] border border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors"
            >
              ✕
            </button>

            {/* Scrollable Article Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              {/* Header */}
              <div className="space-y-3 border-b border-zinc-800 pb-6">
                <div className="flex items-center gap-3 text-xs">
                  <span className="bg-[#E10B1F]/20 border border-[#E10B1F] text-[#E10B1F] px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                    {selectedStory.category}
                  </span>
                  <span className="text-zinc-400 font-mono">{selectedStory.date}</span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 font-mono">{selectedStory.readTime}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-display text-white uppercase tracking-tight leading-tight">
                  {selectedStory.title}
                </h1>

                <div className="text-xs text-zinc-400 flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 rounded-full bg-[#E10B1F]"></span>
                  <span>Authored by: <strong className="text-zinc-200">{selectedStory.author}</strong></span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="h-64 sm:h-96 w-full rounded overflow-hidden bg-black">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Formatted Markdown Content */}
              <div className="text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 font-sans whitespace-pre-line">
                {selectedStory.content}
              </div>

              {/* Tags */}
              <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-2">
                {selectedStory.tags.map((t, idx) => (
                  <span key={idx} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Bottom Quote Banner */}
              <div className="mt-8 p-6 bg-gradient-to-r from-[#181410] to-[#141414] border border-[#C9A24B]/50 rounded flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-display text-white uppercase tracking-wider">
                    NEED THIS ARENA SPECIFICATION IN YOUR GYM?
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Our structural engineers will provide tailored blueprints and factory pricing for your facility.
                  </p>
                </div>
                <button
                  onClick={() => handleArticleConsult(selectedStory)}
                  className="chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-6 py-3 text-xs font-display tracking-widest uppercase glow-gold whitespace-nowrap"
                >
                  CONSULT ON WHATSAPP ↗
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
