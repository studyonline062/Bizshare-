import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Share2, 
  Link as LinkIcon, 
  Users, 
  CheckCircle2, 
  DollarSign, 
  Trophy, 
  Settings, 
  Copy, 
  Check, 
  ExternalLink, 
  Clock, 
  Building2, 
  QrCode, 
  Calendar,
  AlertCircle,
  Eye,
  CreditCard,
  Lock,
  User,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { LEADERBOARD_DATA } from '../data/mockData';
import { LeadStatus } from '../types';

export const PromoterDashboard: React.FC = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    properties, 
    leads, 
    commissions, 
    sharedLinks, 
    setShareModalProperty, 
    setPosterModalProperty,
    navigateToProperty
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'links' | 'opportunities' | 'leads' | 'earnings' | 'leaderboard' | 'profile'>('overview');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // Profile edit state
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [phone, setPhone] = useState(currentUser.phone);
  const [city, setCity] = useState(currentUser.city);
  const [payoutMethod, setPayoutMethod] = useState(currentUser.payoutDetails.method);
  const [accountTitle, setAccountTitle] = useState(currentUser.payoutDetails.accountTitle);
  const [accountNumber, setAccountNumber] = useState(currentUser.payoutDetails.accountNumber);
  const [bankName, setBankName] = useState(currentUser.payoutDetails.bankName || 'Meezan Bank Limited');
  const [profileSaved, setProfileSaved] = useState(false);

  // Compute promoter metrics
  const myLeads = leads.filter(l => l.promoterId === currentUser.id);
  const myCommissions = commissions.filter(c => c.promoterId === currentUser.id);
  const mySharedLinks = sharedLinks.filter(l => l.promoterId === currentUser.id);

  const totalShared = mySharedLinks.length;
  const totalClicks = mySharedLinks.reduce((acc, curr) => acc + curr.clicksCount, 0);
  const totalLeadsCount = myLeads.length;
  const siteVisitsCount = myLeads.filter(l => l.status === 'site_visit' || l.status === 'negotiation' || l.status === 'completed').length;
  const successfulDealsCount = myLeads.filter(l => l.status === 'completed').length;

  const pendingComm = myCommissions
    .filter(c => c.status === 'pending' || c.status === 'under_review')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const approvedComm = myCommissions
    .filter(c => c.status === 'approved')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const paidComm = myCommissions
    .filter(c => c.status === 'paid')
    .reduce((acc, curr) => acc + curr.amountPKR, 0);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName,
      phone,
      city,
      payoutDetails: {
        method: payoutMethod,
        accountTitle,
        accountNumber,
        bankName
      }
    });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const statusBadge = (status: LeadStatus) => {
    const map: Record<LeadStatus, { label: string; cls: string }> = {
      new: { label: 'New Lead', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
      contacted: { label: 'Contacted', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
      qualified: { label: 'Qualified Buyer', cls: 'bg-purple-50 text-purple-700 border-purple-200' },
      site_visit: { label: 'Site Visit Scheduled', cls: 'bg-amber-50 text-amber-800 border-amber-200' },
      negotiation: { label: 'Deal Negotiation', cls: 'bg-orange-50 text-orange-800 border-orange-200' },
      completed: { label: 'Deal Completed ✓', cls: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' },
      rejected: { label: 'Closed / Inactive', cls: 'bg-slate-100 text-slate-600 border-slate-200' }
    };
    const s = map[status] || map.new;
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${s.cls}`}>
        {s.label}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Welcome Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0B3D91] to-[#082a66] text-white flex items-center justify-center text-xl font-extrabold shadow-sm">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser.fullName}</h1>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Verified Promoter
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
              <span>Category: <strong className="capitalize text-slate-700">{currentUser.category}</strong></span>
              <span>·</span>
              <span>City: <strong className="text-slate-700">{currentUser.city}</strong></span>
              <span>·</span>
              <span>Unique Referral Code: <strong className="font-mono text-[#0B3D91] font-bold">{currentUser.referralCode}</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('opportunities')}
            className="px-4 py-2 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share New Property</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sidebar Nav (3 cols) */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-2 shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'overview' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('links')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'links' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <LinkIcon className="w-4 h-4" />
              <span>My Referral Links</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTab === 'links' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {mySharedLinks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'opportunities' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Available Opportunities</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'leads' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>My Leads</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {myLeads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'earnings' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>My Earnings & Payouts</span>
          </button>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'leaderboard' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-left ${
              activeTab === 'profile' ? 'bg-[#0B3D91] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile & Payout Settings</span>
          </button>
        </aside>

        {/* Content Viewport (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 8 Required KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Properties Shared</span>
                  <div className="text-xl font-extrabold text-slate-900 font-mono mt-1">{totalShared}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Total Link Clicks</span>
                  <div className="text-xl font-extrabold text-[#0B3D91] font-mono mt-1">{totalClicks}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Leads Generated</span>
                  <div className="text-xl font-extrabold text-purple-700 font-mono mt-1">{totalLeadsCount}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Site Visits Done</span>
                  <div className="text-xl font-extrabold text-amber-700 font-mono mt-1">{siteVisitsCount}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Successful Deals</span>
                  <div className="text-xl font-extrabold text-emerald-700 font-mono mt-1">{successfulDealsCount}</div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Pending Commission</span>
                  <div className="text-lg font-extrabold text-amber-700 font-mono mt-1">
                    PKR {pendingComm.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Approved Commission</span>
                  <div className="text-lg font-extrabold text-blue-700 font-mono mt-1">
                    PKR {approvedComm.toLocaleString()}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] text-slate-500 font-medium">Paid Commission</span>
                  <div className="text-lg font-extrabold text-emerald-800 font-mono mt-1">
                    PKR {paidComm.toLocaleString()}
                  </div>
                </div>

              </div>

              {/* Active Pipeline Preview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Recent Lead Milestones</h3>
                  <button 
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-[#0B3D91] hover:underline cursor-pointer"
                  >
                    View All Leads ({myLeads.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {myLeads.map(lead => (
                    <div key={lead.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{lead.customerName}</span>
                          <span className="text-slate-400">({lead.customerPhone})</span>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5 truncate max-w-md">
                          Interested in: <span className="font-semibold text-slate-700">{lead.propertyTitle}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">Assigned Sales Rep</div>
                          <div className="font-semibold text-slate-700">{lead.assignedSalesRep.name}</div>
                        </div>
                        {statusBadge(lead.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* High-Reward Opportunities Banner */}
              <div className="bg-[#0B3D91] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-[#F4B400] text-xs font-bold uppercase tracking-wider">Top Earning Opportunity</span>
                  <h4 className="text-base font-bold">1 Kanal DHA Phase 6 Designer Villa</h4>
                  <p className="text-xs text-slate-300">Commission reward: PKR 150,000 upon successful transfer.</p>
                </div>
                <button
                  onClick={() => {
                    const dhaProp = properties.find(p => p.id === 'prop-101');
                    if (dhaProp) setShareModalProperty(dhaProp);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs shadow-md transition-colors cursor-pointer shrink-0"
                >
                  Share This Listing Now
                </button>
              </div>

            </div>
          )}

          {/* 2. MY REFERRAL LINKS TAB */}
          {activeTab === 'links' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">My Tracked Referral Links</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every link below includes your unique promoter attribution code. Inquiries submitted via these links are guaranteed to you.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-3">Property</th>
                      <th className="py-3 px-3">Referral Link</th>
                      <th className="py-3 px-3 text-center">Clicks</th>
                      <th className="py-3 px-3 text-center">Leads</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {mySharedLinks.map(l => (
                      <tr key={l.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-3 max-w-[200px]">
                          <div className="font-bold text-slate-900 truncate">{l.propertyTitle}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{l.propertyPrice}</div>
                        </td>
                        <td className="py-3.5 px-3 max-w-[220px]">
                          <div className="font-mono text-[11px] text-slate-600 truncate bg-slate-100 px-2 py-1 rounded">
                            {l.referralUrl}
                          </div>
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-[#0B3D91]">
                          {l.clicksCount}
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono font-bold text-purple-700">
                          {l.leadsCount}
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleCopy(l.referralUrl, l.id)}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors cursor-pointer"
                              title="Copy Referral Link"
                            >
                              {copiedLink === l.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              onClick={() => {
                                const targetProp = properties.find(p => p.id === l.propertyId);
                                if (targetProp) setShareModalProperty(targetProp);
                              }}
                              className="px-2.5 py-1.5 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-bold rounded-md text-[11px] cursor-pointer flex items-center gap-1"
                            >
                              <Share2 className="w-3 h-3" />
                              <span>Share</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. AVAILABLE OPPORTUNITIES TAB */}
          {activeTab === 'opportunities' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900">Active Properties Ready to Share</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select any property below to generate your referral link or branded social media poster.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map(prop => (
                  <div key={prop.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col justify-between">
                    <div className="flex gap-4">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-lg object-cover shrink-0 cursor-pointer"
                        onClick={() => navigateToProperty(prop.id)}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase text-slate-400">{prop.category} • {prop.area}</div>
                        <h4 
                          onClick={() => navigateToProperty(prop.id)}
                          className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-[#0B3D91] cursor-pointer mt-0.5"
                        >
                          {prop.title}
                        </h4>
                        <div className="text-xs font-extrabold text-[#0B3D91] font-mono mt-1">{prop.formattedPrice}</div>
                        <div className="text-xs font-bold text-emerald-700 mt-1">
                          Reward: <span className="font-mono">{prop.referralRewardDisplay}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setPosterModalProperty(prop)}
                        className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Poster</span>
                      </button>

                      <button
                        onClick={() => setShareModalProperty(prop)}
                        className="flex-1 py-1.5 px-2 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] rounded-lg text-xs font-extrabold transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Share & Earn</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. MY LEADS TAB */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Lead Pipeline & Status Tracking</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track the full journey of your referrals from initial inquiry to final registration and deal closing.
                </p>
              </div>

              <div className="space-y-4">
                {myLeads.map(lead => (
                  <div key={lead.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{lead.customerName}</span>
                          <span className="text-[11px] text-slate-500">({lead.customerPhone})</span>
                          <span className="text-[10px] text-slate-400">· Ref: {lead.referralCode}</span>
                        </div>
                        <div className="text-xs text-slate-700 font-semibold mt-0.5">
                          {lead.propertyTitle} ({lead.propertyArea})
                        </div>
                      </div>
                      <div>
                        {statusBadge(lead.status)}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                      <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Latest Progress Note</div>
                      <p>{lead.notes}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Assigned Consultant: <strong className="text-slate-800">{lead.assignedSalesRep.name}</strong> ({lead.assignedSalesRep.phone})</span>
                      <span>Potential Reward: <strong className="text-emerald-700 font-mono font-bold">PKR {lead.referralRewardPKR.toLocaleString()}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MY EARNINGS TAB */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Pending Verification</span>
                  <div className="text-xl font-extrabold text-amber-700 font-mono mt-1">
                    PKR {pendingComm.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Awaiting deal milestone completion</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Approved for Payout</span>
                  <div className="text-xl font-extrabold text-blue-700 font-mono mt-1">
                    PKR {approvedComm.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Scheduled for bank transfer</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-xs text-slate-500 font-medium">Total Paid Out</span>
                  <div className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
                    PKR {paidComm.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold mt-1 block">Disbursed to registered IBAN</span>
                </div>
              </div>

              {/* Commission Ledger Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Commission Ledger & Payout History</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-3">Date</th>
                        <th className="py-3 px-3">Property</th>
                        <th className="py-3 px-3">Milestone Reached</th>
                        <th className="py-3 px-3">Amount (PKR)</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Reference</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {myCommissions.map(comm => (
                        <tr key={comm.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-3 text-slate-500">{comm.createdAt}</td>
                          <td className="py-3 px-3 font-semibold text-slate-900 max-w-[200px] truncate">{comm.propertyTitle}</td>
                          <td className="py-3 px-3 text-slate-600">{comm.milestoneReached}</td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                            PKR {comm.amountPKR.toLocaleString()}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              comm.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                              comm.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {comm.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono text-[11px] text-slate-500">
                            {comm.transactionReference || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* 6. LEADERBOARD TAB */}
          {activeTab === 'leaderboard' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Promoter Leaderboard of the Month</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Top performers across Lahore recognized for verified referral volume and closed transactions.
                </p>
              </div>

              <div className="space-y-3">
                {LEADERBOARD_DATA.map(user => (
                  <div 
                    key={user.rank}
                    className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      user.promoterId === currentUser.id 
                        ? 'bg-amber-50/70 border-amber-300 shadow-xs' 
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full font-extrabold flex items-center justify-center text-xs ${
                        user.rank === 1 ? 'bg-amber-400 text-amber-900' :
                        user.rank === 2 ? 'bg-slate-200 text-slate-700' :
                        user.rank === 3 ? 'bg-amber-700 text-white' :
                        'bg-slate-100 text-slate-500'
                      }`}>
                        #{user.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{user.name}</span>
                          {user.promoterId === currentUser.id && (
                            <span className="bg-[#0B3D91] text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                              YOU
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">{user.city} • <span className="capitalize">{user.category}</span></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-slate-400">Deals Closed</div>
                        <div className="font-bold text-slate-800 font-mono">{user.dealsCompleted}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-[10px] text-slate-400">Total Earned</div>
                        <div className="font-extrabold text-emerald-700 font-mono">
                          PKR {user.totalEarnedPKR.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. PROFILE & PAYOUT SETTINGS TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Profile & Payout Account</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ensure your Pakistani bank account or mobile wallet details are accurate for commission disbursement.
                </p>
              </div>

              {profileSaved && (
                <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Profile and payout details updated successfully!</span>
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Promoter Referral Code (System Fixed)</label>
                    <input
                      type="text"
                      disabled
                      value={currentUser.referralCode}
                      className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-600 font-bold"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Payout Method for Commission</h4>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('bank_transfer')}
                      className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                        payoutMethod === 'bank_transfer' ? 'border-[#0B3D91] bg-blue-50 text-[#0B3D91]' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      Bank Transfer (IBAN)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('jazzcash')}
                      className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                        payoutMethod === 'jazzcash' ? 'border-[#0B3D91] bg-blue-50 text-[#0B3D91]' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      JazzCash
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutMethod('easypaisa')}
                      className={`p-3 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                        payoutMethod === 'easypaisa' ? 'border-[#0B3D91] bg-blue-50 text-[#0B3D91]' : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      EasyPaisa
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Account Title *</label>
                      <input
                        type="text"
                        required
                        value={accountTitle}
                        onChange={e => setAccountTitle(e.target.value)}
                        placeholder="Must match CNIC"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {payoutMethod === 'bank_transfer' ? 'IBAN (24 digits)' : 'Mobile Account Number'} *
                      </label>
                      <input
                        type="text"
                        required
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                        placeholder={payoutMethod === 'bank_transfer' ? 'PKXXMEZN...' : '0300XXXXXXX'}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {payoutMethod === 'bank_transfer' && (
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Bank Name & Branch</label>
                      <input
                        type="text"
                        value={bankName}
                        onChange={e => setBankName(e.target.value)}
                        placeholder="e.g. Meezan Bank, Lahore Cantt"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};
