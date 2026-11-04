import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ExplorePropertiesPage } from './pages/ExplorePropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { BecomePromoterPage } from './pages/BecomePromoterPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PartnerWithUsPage } from './pages/PartnerWithUsPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPages } from './pages/LegalPages';
import { AuthPages } from './pages/AuthPages';
import { PromoterDashboard } from './pages/PromoterDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ShareModal } from './components/common/ShareModal';
import { PosterGeneratorModal } from './components/common/PosterGeneratorModal';
import { InquiryModal } from './components/common/InquiryModal';
import { UserCheck, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, activeReferralCode, setActiveReferralCode } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#2E2E2E]">
      
      {/* Referral Attribution Notification Banner */}
      {activeReferralCode && (
        <div className="bg-[#082a66] text-white text-xs py-2 px-4 border-b border-white/10 flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#F4B400] shrink-0" />
              <span>
                Referred by BIZSHARE Promoter: <strong className="font-mono text-[#F4B400] font-bold">{activeReferralCode}</strong> (Hamza Tariq). Guaranteed buyer protection & promoter attribution.
              </span>
            </div>
            <button
              onClick={() => setActiveReferralCode(null)}
              className="text-slate-400 hover:text-white ml-4 text-[11px] cursor-pointer"
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar />

      {/* Dynamic Viewport */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'properties' && <ExplorePropertiesPage />}
        {currentPage === 'property-detail' && <PropertyDetailPage />}
        {currentPage === 'become-promoter' && <BecomePromoterPage />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'partner' && <PartnerWithUsPage />}
        {currentPage === 'about' && <AboutUsPage />}
        {currentPage === 'contact' && <ContactUsPage />}
        {currentPage === 'faq' && <FaqPage />}
        {currentPage === 'terms' && <LegalPages pageType="terms" />}
        {currentPage === 'privacy' && <LegalPages pageType="privacy" />}
        {currentPage === 'commission-policy' && <LegalPages pageType="commission-policy" />}
        {currentPage === 'login' && <AuthPages initialMode="login" />}
        {currentPage === 'register' && <AuthPages initialMode="register" />}
        {currentPage === 'promoter-dashboard' && <PromoterDashboard />}
        {currentPage === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <ShareModal />
      <PosterGeneratorModal />
      <InquiryModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
