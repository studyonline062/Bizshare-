import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';

interface LegalPageProps {
  pageType: 'terms' | 'privacy' | 'commission-policy';
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType }) => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <button
        onClick={() => setCurrentPage('home')}
        className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3D91] hover:underline cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </button>

      {/* Commission Policy */}
      {pageType === 'commission-policy' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
              Official Policy Document
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              BIZSHARE Referral & Commission Agreement
            </h1>
            <p className="text-slate-500 text-xs">
              Last updated: November 2026 • Compliant with Pakistani Contract & Consumer Regulations
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs space-y-1">
            <strong>Key Transparency Principle:</strong>
            <p>
              Sharing alone does NOT generate guaranteed income. Referral commission becomes eligible exclusively upon the verified completion of a real property transaction.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Referral Attribution & Tracking</h2>
            <p>
              Every registered BIZSHARE promoter receives a distinctive referral code (e.g., <code>BS1025</code>) and encrypted URL parameters. When an prospective buyer opens a promoter's link or scans an auto-generated QR poster and submits an inquiry, the lead is attributed to that promoter for a validity window of thirty (30) calendar days.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Milestone for Commission Eligibility</h2>
            <p>
              Promoter commission becomes payable when all of the following milestones are verified:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>The referred client submits token money or earnest money to the verified developer or property seller.</li>
              <li>Sale deed or transfer letter is legally executed at the relevant housing authority (e.g. DHA Lahore, Bahria Town, or LDA Registry).</li>
              <li>Transaction settlement is formally acknowledged by the BIZSHARE Admin desk.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Structure of Rewards</h2>
            <p>
              BIZSHARE enforces property-specific predefined rewards. Depending on the listing agreement with the developer:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Fixed Referral Reward:</strong> A stipulated lump sum (e.g. PKR 50,000, PKR 110,000, or PKR 150,000).</li>
              <li><strong>Percentage Reward:</strong> A percentage (typically 0.5% to 1.0%) calculated on final executed sale price.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">4. Payout Disbursals & Banking Verification</h2>
            <p>
              All payouts are made within 48 to 72 bank hours following transaction verification. Disbursals are transferred directly into the promoter's registered Pakistani Bank IBAN, JazzCash, or EasyPaisa account. Every payment is logged with an official banking transaction reference ID (TRX).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">5. Anti-Fraud & Dispute Settlement</h2>
            <p>
              Artificial bots, fraudulent spam inquiries, self-dealing loopholes, or fake phone numbers will result in immediate account suspension. In case of attribution conflict between multiple promoters, the digital audit log of earliest submission is final.
            </p>
          </section>
        </div>
      )}

      {/* Terms & Conditions */}
      {pageType === 'terms' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
              Legal Terms
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Terms & Conditions of Service
            </h1>
            <p className="text-slate-500 text-xs">
              Platform of Mutual Working • BIZSHARE Technologies Pakistan (Pvt.) Ltd.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By registering as a promoter, property dealer, or browsing verified property opportunities on BIZSHARE, you agree to comply with all applicable local, provincial, and federal laws of Pakistan.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Promoter Status</h2>
            <p>
              BIZSHARE promoters act as independent referral affiliates. Registration is completely free of charge. No employment or agency relationship is established.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">3. Accuracy of Property Information</h2>
            <p>
              While BIZSHARE performs due diligence and document vetting on all listed plots, homes, and commercial units, prospective buyers must conduct independent title searches prior to closing.
            </p>
          </section>
        </div>
      )}

      {/* Privacy Policy */}
      {pageType === 'privacy' && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3D91]">
              User Privacy
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Privacy & Data Protection Policy
            </h1>
            <p className="text-slate-500 text-xs">
              Safeguarding Promoter and Client Information
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              We collect user registration details (full name, phone, email, city, CNIC title, bank IBAN) to facilitate verification and commission payouts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">2. Masking of Buyer Contact Details</h2>
            <p>
              To protect consumer privacy and prevent harassment, buyer phone numbers in the promoter dashboard are masked (e.g. <code>+92 321 ••••412</code>). Direct contact is restricted to authorized BIZSHARE sales desks.
            </p>
          </section>
        </div>
      )}

    </div>
  );
};
