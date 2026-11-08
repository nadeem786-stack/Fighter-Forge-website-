import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp, formatEventRentalMessage } from '../utils/whatsapp.js';
import { saveRentalEnquiry } from '../utils/api.js';

export function EventRentalModal({ isOpen, onClose, preselectedArena = null }) {
  if (!isOpen) return null;

  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    eventType: preselectedArena || 'Boxing Ring (3 ft Pro Competition)',
    city: '',
    eventDates: '',
    elevation: '3 ft Pro Competition (100 cm)',
    contactName: '',
    phone: '',
    notes: ''
  });

  const arenaOptions = [
    'Boxing Ring (3 ft Pro Competition - IPBL Standard)',
    'Boxing Ring (1–2 ft Elevated Event Height)',
    'Boxing Ring (Floor Level)',
    'MMA Cage (24 ft Pro Championship Octagon)',
    'MMA Cage (20 ft Elevated Octagon)',
    'MMA Cage (Floor Level Octagon)',
    'Both Boxing Ring & MMA Cage'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await saveRentalEnquiry({
        ...formData,
        submittedAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn("Could not save rental enquiry to backend:", err);
    }
    const message = formatEventRentalMessage(formData);
    openWhatsApp(message);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-[#C9A24B]/60 text-white shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[92vh] flex flex-col"
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

        <div className="overflow-y-auto pr-1 space-y-5">
          {/* Header */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A24B]/15 border border-[#C9A24B]/40 text-xs font-bold tracking-widest text-[#C9A24B] uppercase mb-2">
              <span>🏟️ NATIONWIDE EVENT RENTALS (INDIA)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
              RENT RINGS & MMA CAGES FOR FIGHT EVENTS
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed">
              Official arena supplier for <strong>IPBL (India Pro Boxing League)</strong>, State Championships, and UFC-standard Pro MMA Fight Promotions across India. Complete professional setup crew, acoustic vibration dampening, and teardown included.
            </p>
          </div>

          {/* Quick Perks Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 py-2 border-y border-zinc-800/80 text-[11px] text-zinc-300">
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>IPBL Standard Rings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>Pro MMA Octagons</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>Full Erection Crew</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>Sponsor Canvas Branding</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>Express All-India Transport</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#C9A24B] font-bold">✔</span>
              <span>Direct WhatsApp Hotline</span>
            </div>
          </div>

          {/* Rental Inquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Event / Promotion Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IPBL Fight Night / Pro MMA Championship"
                  value={formData.eventName}
                  onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Arena Setup Required *
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                >
                  {arenaOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Event City & State *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Delhi NCR / Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Event Dates / Duration *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nov 20-22 (3 Days)"
                  value={formData.eventDates}
                  onChange={(e) => setFormData({ ...formData, eventDates: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Elevation Standard
                </label>
                <select
                  value={formData.elevation}
                  onChange={(e) => setFormData({ ...formData, elevation: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                >
                  <option value="3 ft Pro Competition (100 cm)">3 ft Pro Level (100 cm)</option>
                  <option value="1–2 ft Elevated (30-60 cm)">1–2 ft Event Height</option>
                  <option value="Floor-Level Flush">Floor-Level Flush</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Your Name / Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Matchmaker / Event Coordinator"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                Special Requirements (Venue ceiling, lighting truss, sponsor logos, etc.)
              </label>
              <textarea
                rows="2"
                placeholder="Mention venue indoor/outdoor, sponsor logo printing needed on canvas or skirts..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-700 text-white p-2.5 rounded text-xs focus:border-[#C9A24B] outline-none"
              ></textarea>
            </div>

            {/* Action Button: ONLY SEND RENTAL INQUIRY (stores to DB + opens WhatsApp) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-3.5 font-display text-base tracking-widest uppercase glow-red transition-all flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'SAVING INQUIRY...' : 'SEND RENTAL INQUIRY'}</span>
                <span className="text-lg">↗</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
