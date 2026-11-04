import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is there any joining fee to become a BIZSHARE promoter?',
      a: 'Absolutely none. Registration on BIZSHARE is 100% free for students, homemakers, freelancers, and promoters. We never charge subscription fees or membership charges.'
    },
    {
      q: 'Do I need any real estate license or property ownership?',
      a: 'No. You do not own the property or negotiate legal terms. Your sole role is to share verified opportunities with your personal and social networks. Once an inquiry is generated, our authorized property consultants handle site inspections and paperwork.'
    },
    {
      q: 'How does BIZSHARE know a buyer came through my referral?',
      a: 'Every property you share contains your personal referral code (e.g. ?ref=BS1025) or custom QR code on the downloadable poster. When the buyer opens the link and submits an inquiry, our lead engine permanently links that lead to your promoter account with a 30-day attribution lock.'
    },
    {
      q: 'When and how do I receive my commission payout?',
      a: 'Commission becomes eligible as soon as the referred buyer pays earnest money and executes the transaction transfer with the housing authority (e.g. DHA, Bahria, LDA). Once verified by Admin, payout is disbursed directly into your Pakistani bank account (IBAN) or JazzCash/EasyPaisa within 48 to 72 hours.'
    },
    {
      q: 'Can I share properties outside Lahore?',
      a: 'Currently, BIZSHARE focuses on prime Lahore locations (DHA, Bahria Town, Gulberg, Lake City, Johar Town), but you can promote them to clients living anywhere in Pakistan or overseas Pakistanis in the UK, USA, UAE, and Canada.'
    },
    {
      q: 'How do the auto-generated posters work?',
      a: 'Click "Create Poster" on any property card. Our built-in graphic engine automatically stamps the property picture, demand price, and your personalized QR code onto a high-res image optimized for WhatsApp Status, Facebook stories, and Instagram.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-blue-50 text-[#0B3D91] rounded-2xl flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Everything you need to know about promoting properties and earning referral commissions on BIZSHARE.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="border-b border-slate-100 last:border-b-0 pb-4">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left py-2 font-bold text-slate-900 text-sm hover:text-[#0B3D91] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-[#0B3D91] shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
              </button>
              {isOpen && (
                <div className="pt-2 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
