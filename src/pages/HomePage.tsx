import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { PLATFORM_STATS } from '../data/mockData';
import { 
  ArrowRight, 
  Search, 
  Share2, 
  Award, 
  CheckCircle2, 
  Users, 
  Building2, 
  GraduationCap, 
  Home, 
  Laptop, 
  Smartphone, 
  ShieldCheck, 
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { properties, setCurrentPage, setSelectedPropertyId } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Houses', 'Apartments', 'Commercial Plots', 'Residential Plots', 'Shops'];

  const filteredProperties = activeCategoryFilter === 'All' 
    ? properties.slice(0, 6) 
    : properties.filter(p => p.category === activeCategoryFilter).slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#0B3D91] text-white">
        
        {/* Background Image with Dark Navy Scrim Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_lahore_skyline_1793767011069.jpg" 
            alt="Lahore architectural skyline"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082457] via-[#0B3D91]/90 to-[#082457]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-3xl space-y-6">
            
            {/* Tagline / Subtitle */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#F4B400] tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A Platform of Mutual Working • Lahore, Pakistan</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-balance">
              Your Network. <br />
              <span className="text-[#F4B400]">Your Opportunity.</span> <br />
              Your Earnings.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Discover property opportunities, share them with your network, and earn rewards on successful referrals with BIZSHARE.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-sm border border-white/25 backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Become a Promoter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick search launcher */}
            <div className="pt-4">
              <div 
                onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="bg-white/95 text-slate-800 p-2 sm:p-2.5 rounded-xl shadow-xl flex items-center gap-3 max-w-xl cursor-pointer hover:bg-white transition-colors"
              >
                <Search className="w-5 h-5 text-[#0B3D91] shrink-0 ml-2" />
                <span className="text-xs sm:text-sm text-slate-500 flex-1 truncate">
                  Search DHA Phase 6, Bahria Town, Gulberg, Lake City...
                </span>
                <button className="px-4 py-2 bg-[#0B3D91] text-white font-bold text-xs rounded-lg shrink-0">
                  Search
                </button>
              </div>
            </div>

          </div>

          {/* Statistics Strip (Dynamic data) */}
          <div className="mt-16 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F4B400]">
                {properties.length}+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Available Properties
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F4B400]">
                {PLATFORM_STATS.registeredPromoters.toLocaleString()}+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Registered Promoters
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F4B400]">
                {PLATFORM_STATS.successfulReferrals}+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Successful Referrals
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F4B400]">
                {PLATFORM_STATS.partnerAgencies}+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                Partner Agencies
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW BIZSHARE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
            Clear 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How BIZSHARE Works
          </h2>
          <p className="text-sm text-slate-600">
            A transparent real estate referral framework connecting genuine property opportunities with motivated social promoters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0B3D91] transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] font-extrabold flex items-center justify-center text-lg">
              01
            </div>
            <h3 className="text-base font-bold text-slate-900">1. Discover</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Browse verified property opportunities in DHA, Bahria Town, Gulberg, and top Lahore developments.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0B3D91] transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-extrabold flex items-center justify-center text-lg">
              02
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Share</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Share listings on WhatsApp, Facebook, Instagram, or download auto-generated branded QR posters.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0B3D91] transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] font-extrabold flex items-center justify-center text-lg">
              03
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Connect</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Interested buyers submit inquiries through your link. BIZSHARE sales experts handle inspections and paperwork.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#0B3D91] transition-all space-y-3 relative">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold flex items-center justify-center text-lg">
              04
            </div>
            <h3 className="text-base font-bold text-slate-900">4. Earn</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Receive transparent predefined referral commissions directly to your Pakistani bank account or mobile wallet.
            </p>
          </div>

        </div>
      </section>

      {/* 3. FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
              Verified Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Featured Properties in Lahore
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategoryFilter === cat 
                    ? 'bg-[#0B3D91] text-white shadow-xs' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:border-[#0B3D91] text-[#0B3D91] font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>View All Properties ({properties.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 4. WHO CAN JOIN? */}
      <section className="bg-white py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
              Zero Joining Fee • Open To All
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Anyone Can Become a BIZSHARE Promoter.
            </h2>
            <p className="text-sm text-slate-600">
              No prior real estate experience or capital required. If you have a phone and social network, you can start sharing opportunities today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Students */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 hover:border-[#0B3D91] transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#0B3D91] flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">University & College Students</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fund your tuition and expenses without sacrificing study time. Share verified student hostels, apartments, and plot opportunities in student & alumni groups.
              </p>
            </div>

            {/* 2. Homemakers */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 hover:border-[#0B3D91] transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Homemakers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Work comfortably from home with flexible hours. Recommend houses and family apartments to your family, neighborhood circles, and community contacts.
              </p>
            </div>

            {/* 3. Freelancers */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 hover:border-[#0B3D91] transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Freelancers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diversify your income streams with high-ticket real estate referrals. Leverage digital marketing skills to reach overseas Pakistanis and serious investors.
              </p>
            </div>

            {/* 4. Social Media Promoters */}
            <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-slate-200 hover:border-[#0B3D91] transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Social Media Promoters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Turn your Instagram followers, TikTok views, and Facebook community pages into recurring commission revenue with dedicated tracking links.
              </p>
            </div>

          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-6 py-3 rounded-xl bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>Learn More About Promoter Program</span>
              <ArrowRight className="w-4 h-4 text-[#F4B400]" />
            </button>
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE BIZSHARE? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B3D91] rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#F4B400]">
              Competitive Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Why Choose BIZSHARE?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We bridge the gap between reputable property builders and an energetic promoter network through technology, trust, and verified payouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Work From Anywhere</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                No fixed office hours or commute. Promote properties whenever you want from Lahore or anywhere in the world.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Zero Capital Required</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                You do not need to buy or own properties. You simply act as the trustworthy referral bridge.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Social Media First</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Built-in WhatsApp triggers and automated promotional posters with QR codes make sharing effortless.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Transparent Tracking</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                See every click, lead status update, and milestone in your real-time promoter dashboard.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Performance-Based Payouts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                Earn fixed or percentage referral rewards ranging from PKR 30,000 to PKR 200,000+ per closed sale.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-base font-bold text-white">
                <CheckCircle2 className="w-5 h-5 text-[#F4B400] shrink-0" />
                <span>Professional Sales Closing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                You refer; BIZSHARE authorized senior consultants handle negotiations, legal verification, and title transfers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 6. TESTIMONIALS (Transparently identified demo testimonials) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600">
            <span>Community Feedback</span>
            <span className="text-slate-400">·</span>
            <span className="text-amber-700 font-bold">Verified Demo Content</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Promoter & Partner Experiences
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Early preview case studies demonstrating mutual working between promoters, property agencies, and buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "As a CS student in Lahore, I shared a DHA Phase 6 villa poster on my WhatsApp status. An overseas relative saw it, submitted inquiry through my link, and when the sale finalized, BIZSHARE transferred PKR 150,000 to my bank within 48 hours."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-[#0B3D91] font-bold text-sm flex items-center justify-center">
                HT
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Hamza Tariq</div>
                <div className="text-[11px] text-slate-500">FAST University Student Promoter</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "I manage family life from home. BIZSHARE lets me recommend verified apartments in Bahria Town to friends looking for safe rental yields. The lead status transparency is something no traditional property dealer ever offered."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center">
                SI
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Sobia Imran</div>
                <div className="text-[11px] text-slate-500">Homemaker, DHA Phase 5</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
              "Listing our Gulberg commercial floors on BIZSHARE gave us access to thousands of active promoters across Pakistan. We received 14 qualified corporate inquiries in 3 weeks, closing 2 high-ticket deals without bloated marketing budgets."
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-bold text-sm flex items-center justify-center">
                CF
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Chaudhry Farhan</div>
                <div className="text-[11px] text-slate-500">Managing Director, Premier Apex Properties</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B3D91] to-[#082a66] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 shadow-xl border-2 border-[#F4B400]/30">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Start Sharing. Start Growing.
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Join Pakistan's fastest-growing property referral ecosystem. Zero membership fees, verified listings, and guaranteed milestone payouts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => { setCurrentPage('become-promoter'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Join BIZSHARE Free
            </button>
            <button
              onClick={() => { setCurrentPage('properties'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
            >
              Explore Properties
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
