import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Phone, 
  Mail, 
  Briefcase 
} from 'lucide-react';

export const PartnerWithUsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('+92 3');
  const [city, setCity] = useState('Lahore');
  const [inventoryType, setInventoryType] = useState('Residential Villas & Plots');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
          For Property Dealers, Developers & Owners
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Partner With BIZSHARE
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          List your verified property inventory and instantly unlock a distribution force of 3,800+ active social media promoters across Pakistan. Pay rewards only when your property is successfully sold.
        </p>
      </div>

      {/* 3 Core Value Props for Dealers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Zero Upfront Ad Spend</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Stop wasting tens of thousands of rupees on generic Facebook ads and billboard hoardings. Pay referral commission only upon confirmed customer registry transfer.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Organic Viral Reach</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students, professionals, and homemakers share your property across WhatsApp status, Instagram stories, and neighborhood word-of-mouth with auto-generated branded QR posters.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Pre-Qualified Buyers</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            BIZSHARE sales representatives pre-screen every lead to ensure budget match and financing readiness before scheduling on-site physical inspections.
          </p>
        </div>
      </div>

      {/* Listing Application Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg max-w-2xl mx-auto space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Register as Authorized Agency / Developer</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Submit your agency profile to list inventory on BIZSHARE.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-emerald-900">Agency Application Received!</h4>
            <p className="text-xs text-emerald-700">
              Our dealer partnership coordinator will contact {contactPerson} at {phone} within 4 business hours to inspect documentation and onboard your listings.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company / Agency Name *</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="e.g. Premier Apex Properties"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={e => setContactPerson(e.target.value)}
                  placeholder="e.g. Chaudhry Farhan"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inventory Specialization</label>
              <select
                value={inventoryType}
                onChange={e => setInventoryType(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
              >
                <option value="Residential Villas & Plots">Residential Villas & Plots (DHA / Bahria)</option>
                <option value="Commercial Buildings & Plazas">Commercial Buildings & Plazas (Gulberg / Ring Road)</option>
                <option value="High-Rise Apartments">High-Rise Apartments & Penthouses</option>
                <option value="Agricultural / Farmhouse Land">Agricultural / Farmhouse Land (Bedian / Barki)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Partnership Request</span>
              </button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
