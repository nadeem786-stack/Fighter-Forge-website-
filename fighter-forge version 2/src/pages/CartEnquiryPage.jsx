import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { siteConfig } from '../config/siteConfig.js';
import { openWhatsApp, formatCartEnquiryMessage } from '../utils/whatsapp.js';
import { saveCartEnquiry } from '../utils/api.js';

export function CartEnquiryPage({ navigateTo, onOpenRentalModal }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    city: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSentMessage, setLastSentMessage] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item.priceNumeric || 0;
      return acc + price * (item.quantity || 1);
    }, 0);
  };

  const handleSendEnquiry = async (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.city.trim()) {
      alert('Please provide your Name, Phone Number, and City so we can calculate factory dispatch logistics.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your enquiry cart is empty. Please add a Boxing Ring or MMA Cage first.');
      return;
    }

    setIsSubmitting(true);

    const message = formatCartEnquiryMessage({
      items: cartItems,
      customer
    });
    setLastSentMessage(message);

    // 1. Save enquiry to backend / MongoDB backup
    await saveCartEnquiry({
      items: cartItems,
      customer,
      subtotal: calculateSubtotal()
    });

    setIsSubmitting(false);
    setSubmitted(true);

    // 2. Open WhatsApp with formatted text
    openWhatsApp(message);
  };

  const handleDirectChat = () => {
    openWhatsApp(
      `Hello Fighter Forge, I have a few questions about your Boxing Rings and MMA Cages before submitting a full quote.`
    );
  };

  // SUCCESS CONFIRMATION VIEW
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-[#141414] border border-[#E10B1F]/60 p-8 sm:p-12 text-center space-y-6 shadow-2xl rounded">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#E10B1F]/20 border-2 border-[#E10B1F] flex items-center justify-center text-[#E10B1F] text-3xl font-bold animate-bounce">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E10B1F]">
              ENQUIRY TRANSMITTED SUCCESSFULLY
            </span>
            <h1 className="text-3xl sm:text-5xl font-display text-white uppercase tracking-tight">
              YOUR ARENA QUOTE IS ON ITS WAY
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-lg mx-auto">
              Your specifications have been recorded in our factory database and WhatsApp was opened. Our engineering desk will respond with your official quotation, CAD layout drawings, and estimated dispatch dates.
            </p>
          </div>

          <div className="p-4 bg-black/60 border border-zinc-800 rounded text-left text-xs text-zinc-400 space-y-1">
            <div className="text-zinc-200 font-bold mb-1">Enquiry Summary:</div>
            <div>• Name: <span className="text-white font-semibold">{customer.name}</span></div>
            <div>• Phone: <span className="text-white font-semibold">{customer.phone}</span></div>
            <div>• City: <span className="text-white font-semibold">{customer.city}</span></div>
            <div>• Items: <span className="text-white font-semibold">{cartItems.length} Arena Configuration(s)</span></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => openWhatsApp(lastSentMessage)}
              className="w-full sm:w-auto chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-8 py-3.5 font-display text-sm tracking-widest uppercase glow-red"
            >
              RE-OPEN WHATSAPP CHAT ↗
            </button>
            <button
              onClick={() => {
                clearCart();
                navigateTo('home');
              }}
              className="w-full sm:w-auto chamfer-btn-sm bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider"
            >
              RETURN TO HOME
            </button>
          </div>
        </div>
      </div>
    );
  }

  // EMPTY STATE VIEW
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-[#141414] border border-zinc-800 p-8 sm:p-10 text-center space-y-6 rounded">
          <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-500">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wide text-white">
              YOUR ENQUIRY CART IS EMPTY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
              Explore our heavy-gauge Boxing Rings and MMA Cages to build your arena setup and request a factory quotation.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => navigateTo('boxing-rings')}
              className="chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-3.5 font-display tracking-widest text-sm uppercase glow-red transition-all"
            >
              EXPLORE BOXING RINGS →
            </button>
            <button
              onClick={() => navigateTo('mma-cages')}
              className="chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white py-3.5 text-xs font-bold tracking-widest uppercase transition-all"
            >
              EXPLORE MMA CAGES →
            </button>
            <button
              onClick={() => navigateTo('customize')}
              className="text-xs text-[#C9A24B] hover:underline font-bold uppercase tracking-wider pt-1"
            >
              Or Build a Custom Arena from Scratch ★
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STANDARD CART / ENQUIRY VIEW
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-6 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            <button onClick={() => navigateTo('home')} className="hover:text-white">
              HOME
            </button>
            <span>/</span>
            <span className="text-[#E10B1F]">YOUR ENQUIRY CART</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display uppercase tracking-tight text-white leading-none">
            YOUR ENQUIRY CART
          </h1>
          {/* Prominent No Payment Notice */}
          <div className="mt-3 p-3 bg-zinc-900 border-l-4 border-[#E10B1F] text-xs text-zinc-300">
            <strong>Factory Direct Policy:</strong> No online payment. Send your enquiry and we'll confirm the price, CAD drawings, and logistics on WhatsApp.
          </div>

          {/* Event Rental Option Banner */}
          <div className="mt-3 p-3.5 bg-gradient-to-r from-[#17130C] to-black border border-[#C9A24B] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#C9A24B] font-bold text-sm">🏟️</span>
              <span className="text-zinc-200">
                <strong>Hosting an event or fight league in India?</strong> You can also <span className="text-[#C9A24B] font-bold">RENT</span> these Boxing Rings & MMA Cages for IPBL, state championships, or fight nights with full erection crew & teardown!
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenRentalModal}
              className="chamfer-btn-sm bg-[#C9A24B] hover:bg-[#b8913a] text-black font-bold px-3 py-1.5 font-display tracking-widest uppercase whitespace-nowrap self-start sm:self-auto"
            >
              RENT ON WHATSAPP ↗
            </button>
          </div>
        </div>

        {/* Two-Column Layout: Items on Left, Form on Right */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (Col 1-7) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-800">
              <span>CONFIGURED HARDWARE ({cartItems.length})</span>
              <button
                onClick={clearCart}
                className="text-zinc-500 hover:text-[#E10B1F] transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-[#141414] border border-zinc-800 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all hover:border-zinc-700"
                style={{
                  clipPath: 'polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px)'
                }}
              >
                {/* Thumb */}
                <div className="w-full sm:w-24 h-24 bg-black rounded overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-display text-lg tracking-wide uppercase text-white">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                    {item.selectedSize && (
                      <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-white font-medium">
                        Size: {item.selectedSize}
                      </span>
                    )}
                    {item.selectedHeight && (
                      <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                        Elevation: {item.selectedHeight}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-400 pt-1 font-mono">
                    {item.priceNumeric ? (
                      <span>
                        Est. Unit: {new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                          maximumFractionDigits: 0
                        }).format(item.priceNumeric)}
                      </span>
                    ) : (
                      <span className="text-[#E10B1F] font-bold">Quote on WhatsApp</span>
                    )}
                  </div>
                </div>

                {/* Stepper & Delete */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                  <div className="flex items-center bg-black border border-zinc-800 rounded">
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="px-2.5 py-1 text-zinc-400 hover:text-white"
                      aria-label="Decrease"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-bold text-white min-w-[20px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="px-2.5 py-1 text-zinc-400 hover:text-white"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="p-1.5 text-zinc-500 hover:text-[#E10B1F] transition-colors"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
              <button
                onClick={() => navigateTo('boxing-rings')}
                className="hover:text-white underline"
              >
                + Add Another Boxing Ring
              </button>
              <button
                onClick={() => navigateTo('mma-cages')}
                className="hover:text-white underline"
              >
                + Add Another MMA Cage
              </button>
            </div>
          </div>

          {/* Enquiry Form on Right (Col 8-12) */}
          <div className="lg:col-span-5 bg-[#141414] border border-zinc-800 p-6 sm:p-8 rounded space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E10B1F]"></span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E10B1F]">
                  DISPATCH LOGISTICS
                </span>
              </div>
              <h2 className="text-2xl font-display uppercase tracking-wide text-white">
                REQUEST FACTORY QUOTATION
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Enter your details and click below to dispatch your enquiry straight to our manufacturing desk on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSendEnquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Full Name / Gym Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma (Iron Fist Combat Club)"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  City / State (For Freight & Install Quote) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bangalore, Karnataka"
                  value={customer.city}
                  onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-sm focus:border-[#E10B1F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1">
                  Notes / Ceiling Height / Delivery Timeline (Optional)
                </label>
                <textarea
                  rows="3"
                  placeholder="e.g. Opening next month. Ceiling height is 14 ft. Need logo printing on canvas..."
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-700 text-white p-3 rounded text-xs focus:border-[#E10B1F] outline-none"
                ></textarea>
              </div>

              {/* Big Red Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-4 font-display text-lg tracking-widest uppercase glow-red transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>{isSubmitting ? 'PREPARING ENQUIRY...' : 'SEND ENQUIRY ON WHATSAPP'}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">↗</span>
              </button>

              {/* Secondary Direct WhatsApp Link */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleDirectChat}
                  className="text-xs text-zinc-400 hover:text-white underline font-semibold"
                >
                  Or just chat with us directly on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
