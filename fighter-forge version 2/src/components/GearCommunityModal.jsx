import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp, formatGearIdeaMessage } from '../utils/whatsapp.js';
import { submitGearIdea } from '../utils/api.js';

export function GearCommunityModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('ideas'); // 'ideas' or 'group'
  const [gearCategory, setGearCategory] = useState('Pro Boxing Gloves (12-16oz)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const gearOptions = [
    'Pro Boxing Gloves (12-16oz)',
    'MMA Sparring & Fight Gloves',
    'Heavy-Duty Combat Duffel Bag',
    'Muay Thai / MMA Shin Guards',
    'No-Gi Fight Shorts & Rashguards',
    'Other Custom Combat Gear'
  ];

  const handleSubmitIdea = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !idea.trim()) return;

    setLoading(true);
    await submitGearIdea({
      gearCategory,
      name,
      phone,
      city,
      idea
    });
    setLoading(false);
    setSubmitted(true);
  };

  const handleOpenWhatsAppIdea = () => {
    const formatted = formatGearIdeaMessage({
      gearCategory,
      name,
      phone,
      city,
      idea
    });
    openWhatsApp(formatted);
  };

  const handleJoinWhatsAppGroup = () => {
    openWhatsApp(
      `Hello Fighter Forge, I'd like to join the Fighter Forge VIP Insiders Group for upcoming gear prototypes, test batches, and factory updates!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-zinc-800 text-white shadow-2xl overflow-hidden p-6 sm:p-8"
        style={{
          clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E10B1F]"></span>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            FIGHTER FORGE LABS & COMMUNITY
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
          BUILD YOUR OWN GEAR • SHAPE UPCOMING SKUS
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          We manufacture for champions. Tell our R&D engineers what you need in upcoming gloves, armor, and gear—or join the Fighter Forge Insiders Group.
        </p>

        {/* Tab Buttons */}
        <div className="flex border-b border-zinc-800 mt-6 mb-6">
          <button
            onClick={() => setActiveTab('ideas')}
            className={`flex-1 py-3 text-xs sm:text-sm font-display tracking-widest uppercase border-b-2 transition-all ${
              activeTab === 'ideas'
                ? 'border-[#E10B1F] text-[#E10B1F]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            💡 SUBMIT GEAR IDEAS & SPECS
          </button>
          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 py-3 text-xs sm:text-sm font-display tracking-widest uppercase border-b-2 transition-all ${
              activeTab === 'group'
                ? 'border-[#C9A24B] text-[#C9A24B]'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            🔥 JOIN INSIDERS GROUP
          </button>
        </div>

        {/* Tab 1: Submit Ideas */}
        {activeTab === 'ideas' && (
          <div>
            {!submitted ? (
              <form onSubmit={handleSubmitIdea} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Which Gear SKU are you designing?
                  </label>
                  <select
                    value={gearCategory}
                    onChange={(e) => setGearCategory(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white px-3.5 py-2.5 rounded text-sm focus:border-[#E10B1F] outline-none"
                  >
                    {gearOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Coach Rahul"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      WhatsApp Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                      City / Gym
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 text-white px-3 py-2 rounded text-xs focus:border-[#E10B1F] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Your Gear Ideas, Foam Feedback or Custom Needs *
                  </label>
                  <textarea
                    rows="3"
                    required
                    placeholder="e.g., We need boxing gloves with extra wrist support for heavy bag rounds, metallic red foil details, and breathable palms..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-3 font-display tracking-widest text-sm uppercase glow-red transition-all"
                  >
                    {loading ? 'TRANSMITTING...' : 'SUBMIT GEAR IDEA'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="chamfer-btn-sm px-4 py-3 bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-6 space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#E10B1F]/20 border border-[#E10B1F] flex items-center justify-center text-[#E10B1F] text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-2xl font-display tracking-wide uppercase text-white">
                  IDEA TRANSMITTED TO R&D
                </h4>
                <p className="text-xs text-zinc-300 max-w-md mx-auto">
                  Thank you for contributing to Fighter Forge gear engineering! Would you like to chat with our product designers directly on WhatsApp?
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleOpenWhatsAppIdea}
                    className="w-full sm:w-auto chamfer-btn bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 font-display text-sm tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>SEND IDEA ON WHATSAPP NOW</span>
                    <span>↗</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto chamfer-btn-sm bg-zinc-800 text-zinc-300 px-5 py-2.5 text-xs font-bold"
                  >
                    DONE
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Join Group */}
        {activeTab === 'group' && (
          <div className="py-4 space-y-5">
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
              <div className="text-xs font-bold text-[#C9A24B] uppercase tracking-wider mb-1">
                ★ VIP FIGHTER FORGE INSIDERS CIRCLE
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connect directly with gym owners, pro coaches, championship athletes, and our manufacturing founders. Get early prototype access, factory-direct discounts on arena builds, and first dibs on limited glove drops.
              </p>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="text-[#E10B1F] font-bold">✔</span>
                <span>Exclusive beta testing of upcoming 16oz sparring gloves</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E10B1F] font-bold">✔</span>
                <span>Factory direct updates on arena hardware & blueprint CADs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#E10B1F] font-bold">✔</span>
                <span>Zero spam, strictly combat sports equipment & fight culture</span>
              </div>
            </div>

            <button
              onClick={handleJoinWhatsAppGroup}
              className="w-full chamfer-btn bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold py-3.5 font-display tracking-widest text-base uppercase glow-gold transition-all flex items-center justify-center gap-2"
            >
              <span>JOIN INSIDERS GROUP VIA WHATSAPP</span>
              <span>↗</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
