import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';
import { Toast } from './components/Toast.jsx';
import { QuickViewModal } from './components/QuickViewModal.jsx';
import { GearCommunityModal } from './components/GearCommunityModal.jsx';
import { EventRentalModal } from './components/EventRentalModal.jsx';
import { LoadingScreen } from './components/LoadingScreen.jsx';

// Pages
import { HomePage } from './pages/HomePage.jsx';
import { BoxingRingsPage } from './pages/BoxingRingsPage.jsx';
import { MmaCagesPage } from './pages/MmaCagesPage.jsx';
import { CartEnquiryPage } from './pages/CartEnquiryPage.jsx';
import { CustomizePage } from './pages/CustomizePage.jsx';
import { StoriesPage } from './pages/StoriesPage.jsx';

export function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (['home', 'boxing-rings', 'mma-cages', 'customize', 'stories', 'cart'].includes(hash)) {
      return hash;
    }
    return 'home';
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isGearModalOpen, setIsGearModalOpen] = useState(false);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);
  const [preselectedRentalArena, setPreselectedRentalArena] = useState(null);

  const openRentalModal = (arena = null) => {
    setPreselectedRentalArena(arena);
    setIsRentalModalOpen(true);
  };

  // Sync hash routing with page state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (['home', 'boxing-rings', 'mma-cages', 'customize', 'stories', 'cart'].includes(hash)) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.location.hash = `#/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#E10B1F] selection:text-white bg-concrete-grain">
        {/* Loading Screen on Entry */}
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

        {/* Global Sticky Navbar */}
        <Navbar
          currentPage={currentPage}
          navigateTo={navigateTo}
          onOpenRentalModal={() => openRentalModal()}
        />

        {/* Active Page View */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              navigateTo={navigateTo}
              onOpenGearCommunity={() => setIsGearModalOpen(true)}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {currentPage === 'boxing-rings' && (
            <BoxingRingsPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal('Boxing Ring (3 ft Pro Competition - IPBL Standard)')}
            />
          )}
          {currentPage === 'mma-cages' && (
            <MmaCagesPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal('MMA Cage (24 ft Pro Championship Octagon)')}
            />
          )}
          {currentPage === 'customize' && (
            <CustomizePage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {currentPage === 'stories' && (
            <StoriesPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
          {currentPage === 'cart' && (
            <CartEnquiryPage
              navigateTo={navigateTo}
              onOpenRentalModal={() => openRentalModal()}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          navigateTo={navigateTo}
          onOpenGearCommunity={() => setIsGearModalOpen(true)}
          onOpenRentalModal={() => openRentalModal()}
        />

        {/* Floating WhatsApp Quick Action Button */}
        <FloatingWhatsApp />

        {/* Quick View Spec Modal */}
        <QuickViewModal />

        {/* Stylish Add-To-Cart Toast */}
        <Toast navigateTo={navigateTo} />

        {/* Gear Community & Idea Builder Modal */}
        <GearCommunityModal
          isOpen={isGearModalOpen}
          onClose={() => setIsGearModalOpen(false)}
        />

        {/* Event Rental Modal (IPBL & Pro MMA) */}
        <EventRentalModal
          isOpen={isRentalModalOpen}
          onClose={() => setIsRentalModalOpen(false)}
          preselectedArena={preselectedRentalArena}
        />
      </div>
    </CartProvider>
  );
}
