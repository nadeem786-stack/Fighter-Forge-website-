import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();

  if (!quickViewProduct) return null;

  const [selectedSize, setSelectedSize] = useState(
    quickViewProduct.defaultSize || (quickViewProduct.sizes ? quickViewProduct.sizes[0] : null)
  );

  const [selectedHeight, setSelectedHeight] = useState(
    quickViewProduct.defaultHeight || (quickViewProduct.heightOptions ? quickViewProduct.heightOptions[0] : (quickViewProduct.elevationHeight || null))
  );

  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      size: selectedSize,
      height: selectedHeight,
      quantity
    });
    closeQuickView();
  };

  const handleWhatsApp = () => {
    const sizePart = selectedSize ? ` | Size: ${selectedSize}` : '';
    const heightPart = selectedHeight ? ` | Height: ${selectedHeight}` : '';
    const msg = `Hello Fighter Forge, I'm reviewing the specs for *${quickViewProduct.name}*${sizePart}${heightPart} (Qty: ${quantity}). Please share factory price and CAD installation drawing.`;
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#141414] border border-zinc-800 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        style={{
          clipPath: 'polygon(16px 0%, 100% 0%, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0% 100%, 0% 16px)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-30 p-2 bg-black/80 hover:bg-[#E10B1F] border border-zinc-700 text-zinc-300 hover:text-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Product Imagery & Badges */}
        <div className="md:w-1/2 relative bg-black min-h-[280px] md:min-h-[460px] flex items-center justify-center">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 z-20">
            <span
              className={`px-3 py-1 text-xs font-display tracking-widest uppercase rounded shadow ${
                quickViewProduct.isPro
                  ? 'bg-[#C9A24B] text-black font-bold'
                  : 'bg-[#E10B1F] text-white font-bold'
              }`}
            >
              {quickViewProduct.badge || 'PRO SPEC'}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent md:hidden"></div>
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#E10B1F] font-bold">
                {quickViewProduct.elevationType}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display text-white tracking-wide uppercase mt-1">
                {quickViewProduct.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Price Row */}
            <div className="py-2.5 border-y border-zinc-800 flex items-center justify-between">
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">FACTORY PRICING:</span>
              <span className="text-lg font-display text-white tracking-wide">
                {quickViewProduct.priceNumeric ? (
                  new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0
                  }).format(quickViewProduct.priceNumeric)
                ) : (
                  <span className="text-[#E10B1F]">PRICE ON WHATSAPP</span>
                )}
              </span>
            </div>

            {/* Sizes */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  AVAILABLE SIZES:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-all ${
                        selectedSize === s
                          ? 'bg-[#E10B1F] border-[#E10B1F] text-white'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Heights */}
            {quickViewProduct.heightOptions && quickViewProduct.heightOptions.length > 1 && (
              <div>
                <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                  ELEVATION HEIGHT:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.heightOptions.map((h) => (
                    <button
                      key={h}
                      onClick={() => setSelectedHeight(h)}
                      className={`px-3 py-1 text-xs font-semibold rounded border transition-all ${
                        selectedHeight === h
                          ? 'bg-white border-white text-black font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs List */}
            <div>
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                ENGINEERED SPECIFICATIONS:
              </div>
              <ul className="space-y-1.5 text-xs text-zinc-300">
                {quickViewProduct.specs && quickViewProduct.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#E10B1F] font-bold mt-0.5">✔</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-zinc-800 mt-6 space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center bg-black border border-zinc-800 rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-white min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAdd}
                className="flex-1 chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white py-3 font-display tracking-widest text-sm uppercase glow-red transition-all"
              >
                ADD TO ENQUIRY CART
              </button>
            </div>

            {/* Direct WhatsApp Quote */}
            <button
              onClick={handleWhatsApp}
              className="w-full chamfer-btn-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white py-2 text-xs font-display tracking-widest uppercase transition-all flex items-center justify-center gap-2"
            >
              <span>INSTANT WHATSAPP CONSULTATION</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
