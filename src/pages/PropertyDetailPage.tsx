import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Share2, 
  QrCode, 
  MapPin, 
  Bed, 
  Bath, 
  CheckCircle2, 
  Phone, 
  Send, 
  Calendar, 
  DollarSign, 
  Award,
  Building,
  UserCheck
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { 
    selectedPropertyId, 
    properties, 
    setCurrentPage, 
    setShareModalProperty, 
    setPosterModalProperty, 
    activeReferralCode,
    submitInquiry
  } = useApp();

  const property = properties.find(p => p.id === selectedPropertyId) || properties[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Embedded inquiry form states
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('+92 3');
  const [custEmail, setCustEmail] = useState('');
  const [custNotes, setCustNotes] = useState('I would like to schedule a site visit and inspect the property documents.');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  if (!property) return null;

  const refCode = activeReferralCode || 'BS1025';

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || custPhone.length < 11 || !custEmail.includes('@')) {
      alert('Please fill out all required fields with a valid Pakistani phone and email.');
      return;
    }

    const res = submitInquiry({
      propertyId: property.id,
      customerName: custName.trim(),
      customerPhone: custPhone.trim(),
      customerEmail: custEmail.trim(),
      notes: custNotes.trim()
    });

    if (res.success) {
      setLeadRef(res.leadId);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('properties')}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B3D91] hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {/* Active Referral Attribution Flag */}
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200 text-xs text-amber-900">
          <UserCheck className="w-3.5 h-3.5 text-[#F4B400]" />
          <span>Promoter Referral Code Active: <strong className="font-mono text-[#0B3D91]">{refCode}</strong></span>
        </div>
      </div>

      {/* Main Split Layout: Gallery & Details (Left 7 Cols), Booking & Referral Box (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Main Photo Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="relative aspect-16/10 w-full bg-slate-900">
              <img 
                src={property.images[activeImageIndex] || property.images[0]} 
                alt={property.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover" 
              />
              
              {property.isVerified && (
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Document Verified Listing</span>
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {property.images.length > 1 && (
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-3 overflow-x-auto">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-[#0B3D91] scale-102 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Meta */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-[#0B3D91]">{property.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{property.area}, {property.city}</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {property.title}
            </h1>

            {/* Price & Size Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-medium">Demand Price</span>
                <div className="text-base sm:text-lg font-extrabold text-[#0B3D91] font-mono mt-0.5">
                  {property.formattedPrice}
                </div>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Area / Land Size</span>
                <div className="text-sm font-bold text-slate-800 mt-1">
                  {property.areaSize}
                </div>
              </div>
              {property.bedrooms && (
                <div>
                  <span className="text-slate-400 font-medium">Bedrooms</span>
                  <div className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1">
                    <Bed className="w-4 h-4 text-slate-500" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                </div>
              )}
              {property.bathrooms && (
                <div>
                  <span className="text-slate-400 font-medium">Bathrooms</span>
                  <div className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1">
                    <Bath className="w-4 h-4 text-slate-500" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-slate-900">Property Description</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Property Features & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {property.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#F4B400] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Seller / Agency Desk */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0B3D91] text-white font-bold flex items-center justify-center text-sm">
                  {property.seller.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{property.seller.company}</div>
                  <div className="text-[11px] text-slate-500">Representative: {property.seller.name} • Rating: {property.seller.rating} / 5.0</div>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Partner Verified
              </span>
            </div>

          </div>

        </div>

        {/* Right 5 Columns: Referral Reward Box, Poster Trigger & Lead Form */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Promoter Earning Card */}
          <div className="bg-gradient-to-br from-[#0B3D91] to-[#082a66] rounded-2xl p-6 text-white shadow-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#F4B400]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4B400]">
                  Promoter Referral Reward
                </span>
              </div>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded font-mono">
                Code: {refCode}
              </span>
            </div>

            <div>
              <div className="text-xs text-slate-300">Earn on Successful Deal Closing:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F4B400] font-mono mt-1">
                {property.referralRewardDisplay}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Share this property across WhatsApp, Facebook, or Instagram. When your referred client finalizes the purchase, this commission is disbursed directly to your account.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => setShareModalProperty(property)}
                className="py-2.5 px-3 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share & Earn</span>
              </button>

              <button
                onClick={() => setPosterModalProperty(property)}
                className="py-2.5 px-3 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <QrCode className="w-3.5 h-3.5 text-[#F4B400]" />
                <span>Create Poster</span>
              </button>
            </div>
          </div>

          {/* Embedded Customer Inquiry Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Schedule Site Visit & Inquiry</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Submit inquiry to connect with verified dealer & sales desk.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-900">Inquiry Logged!</h4>
                <p className="text-[11px] text-emerald-700">
                  Ticket #{leadRef} created. Attributed to Promoter {refCode}. Our Lahore property desk will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-900 cursor-pointer pt-1"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={custName}
                    onChange={e => setCustName(e.target.value)}
                    placeholder="e.g. Asad Rizvi"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={custPhone}
                    onChange={e => setCustPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={custEmail}
                    onChange={e => setCustEmail(e.target.value)}
                    placeholder="buyer@gmail.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Preferred Visit Date / Queries
                  </label>
                  <textarea
                    rows={2}
                    value={custNotes}
                    onChange={e => setCustNotes(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry (Free Consultation)</span>
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <span className="text-[10px] text-slate-400">
                🔒 BIZSHARE Anti-Fraud Lead Attribution Policy applies.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
