import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Share2, 
  PhoneCall, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Lock, 
  ArrowRight 
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
          Complete Operational Guide
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How BIZSHARE Works
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Understanding the transparent lifecycle from property listing to promoter referral reward payout.
        </p>
      </div>

      {/* 4 Pillars in Detail */}
      <div className="space-y-8">
        
        {/* Step 1 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <span className="text-5xl font-extrabold text-[#0B3D91] font-mono">01</span>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Discover Verified Opportunities</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Property developers and authorized dealers list residential plots, commercial suites, villas, and apartments in Lahore. Every listing undergoes mandatory verification of title documents and developer credentials before publishing.
            </p>
          </div>
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Document Checked
            </span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <span className="text-5xl font-extrabold text-[#F4B400] font-mono">02</span>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Share with Your Unique Referral Link</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every promoter gets a distinct referral link for each property (e.g. <code>bizshare.pk/property/dha-villa?ref=BS1025</code>) and auto-generated branded QR posters. Share on WhatsApp status, Instagram, Facebook real estate groups, or directly with contacts.
            </p>
          </div>
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              Auto QR Generation
            </span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <span className="text-5xl font-extrabold text-[#0B3D91] font-mono">03</span>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Connect & Professional Sales Handling</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When a buyer opens your link and submits an inquiry, our lead engine permanently links their request to your promoter ID. BIZSHARE's experienced sales consultants coordinate the physical site visit, price negotiations, and legal paperwork.
            </p>
          </div>
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-bold text-purple-800 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 inline-flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              Dedicated Sales Rep
            </span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-2 text-center md:text-left">
            <span className="text-5xl font-extrabold text-emerald-700 font-mono">04</span>
          </div>
          <div className="md:col-span-7 space-y-2">
            <h3 className="text-lg font-bold text-slate-900">Earn Verified Commission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upon successful token registration, transfer verification, and deal completion, the predefined referral reward (e.g. PKR 60,000 to PKR 150,000) is reviewed by Admin and disbursed directly to your Pakistani bank account, JazzCash, or EasyPaisa.
            </p>
          </div>
          <div className="md:col-span-3 text-right">
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              Guaranteed Payout
            </span>
          </div>
        </div>

      </div>

      {/* Verification & Lead Attribution Safeguards */}
      <div className="bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Referral Attribution Protection Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-700">
          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400]" />
              <span>30-Day Lead Protection Window</span>
            </div>
            <p className="text-slate-500 leading-relaxed pl-6">
              When a buyer submits an inquiry through your referral link, they are credited to you for 30 days. Even if they close weeks later, your commission is locked.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F4B400]" />
              <span>Dispute Resolution Arbitration</span>
            </div>
            <p className="text-slate-500 leading-relaxed pl-6">
              In rare cases where multiple promoters know the same buyer, BIZSHARE admin reviews the earliest digital inquiry timestamp to guarantee fair attribution.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <button
          onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="px-8 py-3.5 rounded-xl bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Start as a BIZSHARE Promoter Today</span>
          <ArrowRight className="w-4 h-4 text-[#F4B400]" />
        </button>
      </div>

    </div>
  );
};
