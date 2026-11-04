import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { ShieldCheck, HeartHandshake, TrendingUp, Users, MapPin, Award } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Logo size="lg" className="justify-center mb-2" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
          Brand Philosophy: Connect • Recommend • Grow
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          A Platform of Mutual Working
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          BIZSHARE was founded with a singular conviction: Pakistan's thriving real estate economy should reward the network that actually drives buyer discovery.
        </p>
      </div>

      {/* Corporate Story */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
            The BIZSHARE Vision
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Democratizing Real Estate Referral Income
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Traditionally, multimillion-rupee commissions in Lahore's property sector remained confined to legacy brokers and gatekeepers. Meanwhile, everyday individuals—students, homemakers, freelancers, and social media promoters—frequently recommended properties to friends and family with zero financial recognition.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            BIZSHARE introduces institutional-grade tracking technology that honors every genuine recommendation. By combining verified developer inventory with trackable referral links and automated QR promotional posters, we create a win-win ecosystem where dealers get bona fide buyers, promoters earn transparent rewards, and buyers acquire verified real estate with full peace of mind.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Our Core Principles</h3>
          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Zero-Spam Verification:</strong> Every listing is physically vetted and title deed verified prior to promoter distribution.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake className="w-4 h-4 text-[#F4B400] shrink-0 mt-0.5" />
              <div>
                <strong>Guaranteed Payout Integrity:</strong> Once a referred buyer's milestone is completed, promoter commission is disbursed via official Pakistani bank transfer or mobile wallet.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-[#0B3D91] shrink-0 mt-0.5" />
              <div>
                <strong>Empowerment Through Technology:</strong> Automated QR posters, real-time dashboard notifications, and lead tracking built for modern smartphones.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership & Lahore Presence */}
      <div className="bg-[#0B3D91] rounded-3xl p-8 sm:p-12 text-white space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400]">
            Headquartered in Lahore
          </span>
          <h3 className="text-2xl font-extrabold">Operating in the Heart of Punjab</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Operating across Lahore, Punjab, our legal desk, marketing strategists, and property consultants coordinate daily on-site visits across DHA, Bahria Town, Lake City, Gulberg, and Johar Town.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 text-xs text-slate-300">
          <div>Lahore, Punjab, Pakistan</div>
          <div>•</div>
          <div>SECP Registered Entity</div>
          <div>•</div>
          <div>PKR Currency Banking Compliant</div>
        </div>
      </div>

    </div>
  );
};
