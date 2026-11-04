import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, HeartHandshake, CheckCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="bg-[#0B3D91] text-white pt-16 pb-12 border-t-4 border-[#F4B400]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Philosophy Banner */}
        <div className="bg-[#082a66] rounded-2xl p-6 sm:p-8 mb-14 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <span className="text-[#F4B400] text-xs font-bold tracking-widest uppercase">
              Brand Philosophy
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Connect • Recommend • Grow
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              BIZSHARE empowers everyday individuals to earn transparent referral rewards on verified real estate opportunities across Lahore and Pakistan.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-3 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Join as Promoter</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10 text-sm">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" showTagline={true} size="md" />
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md pt-2">
              Pakistan's first verified real estate referral marketing platform. Property owners and developers get genuine, qualified buyers, while promoters earn predefined commissions on completed property sales.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F4B400] shrink-0" />
                <span>support@bizshare.pk • operations@bizshare.pk</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase text-[#F4B400]">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  All Properties
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  DHA Lahore Listings
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Bahria Town Projects
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Commercial Opportunities
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Residential Plots
                </button>
              </li>
            </ul>
          </div>

          {/* Promoters & Dealers */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase text-[#F4B400]">
              Mutual Working
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Students & Campus Hub
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Homemakers Opportunity
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Freelancers & Creators
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('partner'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Property Dealers & Agencies
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('commission-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Referral Reward Rules
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase text-[#F4B400]">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => { setCurrentPage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  About BIZSHARE
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('how-it-works'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Verification Safeguards
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('commission-policy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Commission Policy
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('privacy'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => { setCurrentPage('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Promoter FAQs
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F4B400]" />
            <span>© {new Date().getFullYear()} BIZSHARE Technologies Pakistan (Pvt.) Ltd. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-300">Registered in Lahore, Punjab</span>
            <span>•</span>
            <span className="text-[#F4B400] font-medium">PKR Currency Payouts Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
