import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Home, 
  Laptop, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  HelpCircle,
  Clock,
  Award,
  Zap,
  TrendingUp
} from 'lucide-react';

export const BecomePromoterPage: React.FC = () => {
  const { setCurrentPage, switchRole } = useApp();

  // Interactive Commission Calculator State
  const [dealsPerMonth, setDealsPerMonth] = useState(2);
  const [dealType, setDealType] = useState<'mixed' | 'luxury' | 'commercial'>('mixed');

  const calculateEstimate = () => {
    let avgReward = 75000;
    if (dealType === 'luxury') avgReward = 150000;
    if (dealType === 'commercial') avgReward = 110000;
    return dealsPerMonth * avgReward;
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero */}
      <section className="bg-[#0B3D91] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-[#F4B400] tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Zero Joining Fee • 100% Free Registration</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Share Property Opportunities. <br />
              <span className="text-[#F4B400]">Connect Buyers.</span> <br />
              Earn Referral Rewards.
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              BIZSHARE is built on the philosophy of mutual working. Recommend verified Lahore real estate opportunities to your social network and receive guaranteed bank commissions on every finalized deal.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => { switchRole('promoter'); setCurrentPage('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-sm shadow-md transition-all cursor-pointer"
              >
                Join as Promoter Now
              </button>

              <button
                onClick={() => { switchRole('promoter'); setCurrentPage('promoter-dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all cursor-pointer"
              >
                View Promoter Demo Console
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audiences: Who Can Join */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
            Open To Everyone
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed for Passionate Promoters Across Pakistan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            No real estate license or capital needed. You simply recommend; our verified sales professionals handle inspections and closing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0B3D91] flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">University Students</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Cover semester fees and personal expenses. Share student apartments, hostels, and plots within your university campus, batch groups, and alumni network.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Homemakers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Earn from the comfort of home with zero commute. Share residential homes and safe rental apartments with family, relatives, and social community groups.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Freelancers</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Add a high-ticket Pakistani Rupee income stream alongside your digital client projects. Use digital marketing and targeted sharing to reach overseas investors.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Social Media Promoters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Monetize your WhatsApp status views, Facebook community groups, and Instagram audience with auto-generated branded QR posters.
            </p>
          </div>

        </div>
      </section>

      {/* Interactive Referral Commission Estimator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
              Illustrative Calculation
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Estimate Your Referral Earning Potential
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Real estate referral rewards in Lahore average PKR 50,000 to PKR 150,000+ per successfully finalized transaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Expected Monthly Referrals Closed: <strong className="text-[#0B3D91] font-mono text-sm">{dealsPerMonth} Deals</strong>
                </label>
                <input
                  type="range"
                  min={1}
                  max={6}
                  value={dealsPerMonth}
                  onChange={e => setDealsPerMonth(Number(e.target.value))}
                  className="w-full accent-[#0B3D91] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>1 deal</span>
                  <span>3 deals</span>
                  <span>6 deals</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Target Property Segment
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setDealType('mixed')}
                    className={`py-2 px-3 rounded-lg border cursor-pointer ${
                      dealType === 'mixed' ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Residential (PKR 75k avg)
                  </button>
                  <button
                    onClick={() => setDealType('commercial')}
                    className={`py-2 px-3 rounded-lg border cursor-pointer ${
                      dealType === 'commercial' ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Commercial (PKR 110k avg)
                  </button>
                  <button
                    onClick={() => setDealType('luxury')}
                    className={`py-2 px-3 rounded-lg border cursor-pointer ${
                      dealType === 'luxury' ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Luxury Villa (PKR 150k avg)
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#0B3D91] text-white rounded-2xl p-6 sm:p-8 text-center space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-[#F4B400]">
                Potential Monthly Referral Reward
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#F4B400]">
                PKR {calculateEstimate().toLocaleString()}
              </div>
              <p className="text-xs text-slate-300">
                Transferred directly into your verified Pakistani bank account, JazzCash, or EasyPaisa once the registry transfer milestone is verified by Admin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Transparency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900">Genuine Referral Rules</h3>
            <p className="text-xs text-slate-600 mt-1">
              BIZSHARE is not a multi-level marketing (MLM) scheme. Your earnings come strictly from verified property transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-700">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div className="font-bold text-slate-900">No Member Recruitment Dependency</div>
              <p className="text-slate-500 leading-relaxed">
                You never have to recruit members to earn. Rewards are strictly tied to real property sales and title transfers.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div className="font-bold text-slate-900">Transparent Milestones</div>
              <p className="text-slate-500 leading-relaxed">
                You receive notifications as your referred client schedules a site visit, submits token money, and completes the sale.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <div className="font-bold text-slate-900">Protected Lead Ownership</div>
              <p className="text-slate-500 leading-relaxed">
                Once a client submits an inquiry through your referral link, our system protects your attribution for 30 calendar days.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
