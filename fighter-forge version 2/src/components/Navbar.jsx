import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig.js';
import { useCart } from '../context/CartContext.jsx';
import { openWhatsApp } from '../utils/whatsapp.js';

export function Navbar({ currentPage, navigateTo, onOpenRentalModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGetQuote = () => {
    openWhatsApp(
      `Hello Fighter Forge, I would like to get an official quote and consultation for Boxing Rings / MMA Cages.`
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 shadow-2xl py-3'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo on the Left */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img
              src="/assets/fighter-forge-horizontal.png"
              alt="FIGHTER FORGE Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 ${
                currentPage === 'home'
                  ? 'text-[#E10B1F]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              HOME
            </button>

            {/* BOXING RINGS - Prominent Accent */}
            <button
              onClick={() => handleNavClick('boxing-rings')}
              className={`relative px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                currentPage === 'boxing-rings'
                  ? 'text-white bg-[#E10B1F]/20 border border-[#E10B1F]'
                  : 'text-white hover:text-[#E10B1F] hover:bg-zinc-900/60'
              }`}
              style={{
                clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
              }}
            >
              <span className="w-1.5 h-1.5 bg-[#E10B1F]"></span>
              BOXING RINGS
            </button>

            {/* MMA CAGES - Prominent Accent */}
            <button
              onClick={() => handleNavClick('mma-cages')}
              className={`relative px-4 py-2 text-sm font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5 ${
                currentPage === 'mma-cages'
                  ? 'text-white bg-[#E10B1F]/20 border border-[#E10B1F]'
                  : 'text-white hover:text-[#E10B1F] hover:bg-zinc-900/60'
              }`}
              style={{
                clipPath: 'polygon(6px 0%, 100% 0%, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0% 100%, 0% 6px)'
              }}
            >
              <span className="w-1.5 h-1.5 bg-[#E10B1F]"></span>
              MMA CAGES
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`px-3 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 ${
                currentPage === 'stories'
                  ? 'text-[#E10B1F]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              STORIES
            </button>

            <button
              onClick={() => handleNavClick('customize')}
              className={`px-3 py-2 text-sm font-semibold tracking-wider transition-colors duration-200 flex items-center gap-1.5 ${
                currentPage === 'customize'
                  ? 'text-[#C9A24B]'
                  : 'text-zinc-300 hover:text-[#C9A24B]'
              }`}
            >
              <span className="text-[#C9A24B] text-xs">★</span>
              CUSTOMIZE
            </button>

            {/* EVENT RENTALS (IPBL & PRO MMA) */}
            <button
              onClick={onOpenRentalModal}
              className="chamfer-btn-sm bg-gradient-to-r from-[#C9A24B]/20 via-black to-zinc-900 hover:from-[#C9A24B] hover:to-[#b58f3c] border border-[#C9A24B] text-[#C9A24B] hover:text-black px-3.5 py-1.5 text-xs font-display tracking-widest uppercase transition-all duration-200 flex items-center gap-1.5 glow-gold shadow-sm"
              title="Rent Boxing Rings & MMA Cages for Events across India (IPBL Standard)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24B] animate-ping"></span>
              <span>RENT FOR EVENTS</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart Icon with badge */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900/80 rounded transition-all duration-200"
              title="View Enquiry Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E10B1F] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Red "GET A QUOTE" Button */}
            <button
              onClick={handleGetQuote}
              className="chamfer-btn bg-[#E10B1F] hover:bg-[#c80718] text-white px-5 py-2.5 text-sm font-display tracking-widest flex items-center gap-2 glow-red transition-all duration-200"
            >
              <span>GET A QUOTE</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-zinc-200"
              aria-label="Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#E10B1F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <div className="text-[11px] font-bold tracking-[0.2em] text-[#8C8C8C] uppercase border-b border-zinc-800 pb-2">
              NAVIGATION
            </div>
            
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left text-2xl font-display tracking-wider py-2 transition-colors ${
                currentPage === 'home' ? 'text-[#E10B1F]' : 'text-zinc-200'
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => handleNavClick('boxing-rings')}
              className={`text-left text-2xl font-display tracking-wider py-2 flex items-center justify-between border-l-2 pl-3 ${
                currentPage === 'boxing-rings'
                  ? 'border-[#E10B1F] text-[#E10B1F]'
                  : 'border-zinc-800 text-white'
              }`}
            >
              <span>BOXING RINGS</span>
              <span className="text-xs bg-[#E10B1F]/20 text-[#E10B1F] px-2 py-0.5 font-sans font-bold">PRO ARENA</span>
            </button>

            <button
              onClick={() => handleNavClick('mma-cages')}
              className={`text-left text-2xl font-display tracking-wider py-2 flex items-center justify-between border-l-2 pl-3 ${
                currentPage === 'mma-cages'
                  ? 'border-[#E10B1F] text-[#E10B1F]'
                  : 'border-zinc-800 text-white'
              }`}
            >
              <span>MMA CAGES</span>
              <span className="text-xs bg-[#E10B1F]/20 text-[#E10B1F] px-2 py-0.5 font-sans font-bold">OCTAGONS</span>
            </button>

            <button
              onClick={() => handleNavClick('customize')}
              className={`text-left text-2xl font-display tracking-wider py-2 flex items-center justify-between ${
                currentPage === 'customize' ? 'text-[#C9A24B]' : 'text-zinc-200'
              }`}
            >
              <span>CUSTOMIZE ARENA</span>
              <span className="text-xs text-[#C9A24B] font-sans font-bold">CUSTOM BUILD</span>
            </button>

            {/* Event Rentals Mobile Drawer Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRentalModal();
              }}
              className="text-left text-2xl font-display tracking-wider py-2 flex items-center justify-between border-l-2 border-[#C9A24B] pl-3 text-[#C9A24B]"
            >
              <span>RENT FOR EVENTS</span>
              <span className="text-xs bg-[#C9A24B]/20 text-[#C9A24B] px-2 py-0.5 font-sans font-bold">ALL INDIA</span>
            </button>

            <button
              onClick={() => handleNavClick('stories')}
              className={`text-left text-2xl font-display tracking-wider py-2 ${
                currentPage === 'stories' ? 'text-[#E10B1F]' : 'text-zinc-200'
              }`}
            >
              STORIES & NEWS
            </button>

            <button
              onClick={() => handleNavClick('cart')}
              className={`text-left text-2xl font-display tracking-wider py-2 flex items-center justify-between ${
                currentPage === 'cart' ? 'text-[#E10B1F]' : 'text-zinc-200'
              }`}
            >
              <span>ENQUIRY CART</span>
              {totalItems > 0 && (
                <span className="bg-[#E10B1F] text-white text-xs px-2.5 py-0.5 rounded-full font-sans font-bold">
                  {totalItems} ITEMS
                </span>
              )}
            </button>
          </div>

          <div className="pt-6 border-t border-zinc-800 flex flex-col space-y-3">
            <button
              onClick={handleGetQuote}
              className="w-full chamfer-btn bg-[#E10B1F] text-white py-3.5 font-display text-lg tracking-widest text-center flex items-center justify-center gap-2 glow-red"
            >
              <span>GET A QUOTE ON WHATSAPP</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            <div className="text-center text-xs text-zinc-500 font-sans pt-2">
              Factory Hotline: {siteConfig.phoneDisplay}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
