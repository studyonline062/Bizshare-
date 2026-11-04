import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building, 
  Users, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Search, 
  Check, 
  CreditCard,
  UserCheck,
  TrendingUp,
  FileText,
  Calendar,
  Phone
} from 'lucide-react';
import { PropertyCategory, LeadStatus, PropertyListing } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    properties, 
    leads, 
    commissions, 
    addProperty, 
    deleteProperty, 
    togglePropertyVerification, 
    updateLeadStatus, 
    assignLeadSalesRep, 
    resolveLeadDispute, 
    approveCommission, 
    rejectCommission, 
    payoutCommission 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'properties' | 'leads' | 'commissions' | 'disputes'>('analytics');
  
  // Property Add Form State
  const [showAddPropModal, setShowAddPropModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PropertyCategory>('Houses');
  const [newArea, setNewArea] = useState('Phase 6, DHA Lahore');
  const [newPrice, setNewPrice] = useState(55000000);
  const [newSize, setNewSize] = useState('1 Kanal');
  const [newBedrooms, setNewBedrooms] = useState(4);
  const [newReward, setNewReward] = useState(100000);
  const [newDescription, setNewDescription] = useState('Premium newly constructed luxury property with high quality finishes and verified title deeds.');

  // Payout dialog state
  const [payoutDialogCommId, setPayoutDialogCommId] = useState<string | null>(null);
  const [payoutTrxRef, setPayoutTrxRef] = useState('TRX-HBL-' + Math.floor(10000000 + Math.random() * 90000000));
  const [payoutMethod, setPayoutMethod] = useState('Online Banking Transfer');

  // Search filter for leads
  const [leadSearch, setLeadSearch] = useState('');

  // Sales Representatives list
  const salesReps = [
    { id: 'sales-1', name: 'Ayesha Malik', phone: '+92 300 9410022' },
    { id: 'sales-2', name: 'Bilal Hassan', phone: '+92 333 4455112' },
    { id: 'sales-3', name: 'Zohaib Tariq', phone: '+92 321 8899221' }
  ];

  // Platform KPIs
  const totalVolumePKR = properties.reduce((acc, curr) => acc + curr.pricePKR, 0);
  const totalLeads = leads.length;
  const pendingCommissionsList = commissions.filter(c => c.status === 'pending' || c.status === 'under_review');
  const approvedCommissionsList = commissions.filter(c => c.status === 'approved');
  const paidCommissionsList = commissions.filter(c => c.status === 'paid');
  const totalPaidCommissionPKR = paidCommissionsList.reduce((acc, curr) => acc + curr.amountPKR, 0);

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addProperty({
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title: newTitle,
      category: newCategory,
      city: 'Lahore',
      area: newArea,
      pricePKR: Number(newPrice),
      formattedPrice: `PKR ${(newPrice / 10000000).toFixed(2)} Crore`,
      areaSize: newSize,
      bedrooms: newBedrooms,
      isVerified: true,
      referralRewardType: 'fixed',
      referralRewardValue: Number(newReward),
      referralRewardDisplay: `PKR ${Number(newReward).toLocaleString()}`,
      images: ['/src/assets/images/prop_dha_villa_1793767011983.jpg'],
      description: newDescription,
      features: ['LDA approved', 'Underground utilities', 'Gated community'],
      seller: {
        id: 'dealer-admin',
        name: 'BIZSHARE Verified Desk',
        company: 'Prime Developers Lahore',
        phone: '+92 300 840 2277',
        isVerified: true,
        rating: 5.0
      },
      status: 'active'
    });

    setShowAddPropModal(false);
    setNewTitle('');
    alert('New property successfully listed on BIZSHARE marketplace!');
  };

  const handlePayoutSubmit = (commId: string) => {
    payoutCommission(commId, payoutTrxRef, payoutMethod);
    setPayoutDialogCommId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-[#0B3D91] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#F4B400]" />
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">BIZSHARE Platform Administration</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 mt-1">
            Supervise Lahore property inventory, review promoter referrals, assign sales desks, and approve bank disbursements.
          </p>
        </div>

        <button
          onClick={() => setShowAddPropModal(true)}
          className="px-4 py-2.5 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Property</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'analytics' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Analytics & KPIs
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'properties' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Properties ({properties.length})
        </button>
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'leads' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Lead Pipeline ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('commissions')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'commissions' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Commission Approvals ({pendingCommissionsList.length + approvedCommissionsList.length})
        </button>
      </div>

      {/* 1. ANALYTICS TAB */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Total Listings Value</span>
              <div className="text-xl font-extrabold text-[#0B3D91] font-mono mt-1">
                PKR {(totalVolumePKR / 10000000).toFixed(1)} Crore
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Active Leads Logged</span>
              <div className="text-xl font-extrabold text-purple-700 font-mono mt-1">{totalLeads}</div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Commissions Awaiting Review</span>
              <div className="text-xl font-extrabold text-amber-700 font-mono mt-1">
                {pendingCommissionsList.length}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-[11px] text-slate-500 font-medium">Total Commissions Disbursed</span>
              <div className="text-xl font-extrabold text-emerald-800 font-mono mt-1">
                PKR {totalPaidCommissionPKR.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Referral Attribution Safeguards</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Zero-Leakage Tracking:</strong> Every inquiry is stamped with the promoter referral code, click timestamp, and client phone.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>30-Day Lead Ownership:</strong> Once a customer inquires via a promoter link, that client is bound to the promoter for 30 calendar days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Duplicate Prevention:</strong> Duplicate submissions within 24 hours from same IP/phone are deduped to protect database health.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Admin Operations Quick Actions</h3>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setActiveTab('commissions')}
                  className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold rounded-lg border border-amber-200 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Review Pending Commissions ({pendingCommissionsList.length})</span>
                  <CheckCircle2 className="w-4 h-4 text-amber-700" />
                </button>
                <button
                  onClick={() => setActiveTab('leads')}
                  className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-lg border border-blue-200 text-left flex items-center justify-between cursor-pointer"
                >
                  <span>Assign Unallocated Leads to Sales Desks</span>
                  <Users className="w-4 h-4 text-blue-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROPERTIES MANAGEMENT TAB */}
      {activeTab === 'properties' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Manage Property Inventory</h3>
              <p className="text-xs text-slate-500">Add, edit, verify or remove properties from the public marketplace.</p>
            </div>
            <button
              onClick={() => setShowAddPropModal(true)}
              className="px-3.5 py-1.5 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Listing</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">Property</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Price</th>
                  <th className="py-3 px-3">Promoter Reward</th>
                  <th className="py-3 px-3 text-center">Verified</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {properties.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 max-w-[220px]">
                      <div className="font-bold text-slate-900 truncate">{p.title}</div>
                      <div className="text-[11px] text-slate-400">{p.category} • {p.areaSize}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{p.area}</td>
                    <td className="py-3 px-3 font-mono font-bold text-[#0B3D91]">{p.formattedPrice}</td>
                    <td className="py-3 px-3 font-mono text-emerald-700 font-bold">{p.referralRewardDisplay}</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => togglePropertyVerification(p.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          p.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {p.isVerified ? '✓ Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Delete listing "${p.title}"?`)) {
                            deleteProperty(p.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                        title="Delete listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. LEADS PIPELINE TAB */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Lead Pipeline & Sales Assignment</h3>
              <p className="text-xs text-slate-500">Update status as deals progress through site visits to closing.</p>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={leadSearch}
                onChange={e => setLeadSearch(e.target.value)}
                placeholder="Search buyer name or code..."
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            {leads
              .filter(l => !leadSearch || l.customerName.toLowerCase().includes(leadSearch.toLowerCase()) || l.referralCode.toLowerCase().includes(leadSearch.toLowerCase()))
              .map(lead => (
                <div key={lead.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{lead.customerName}</span>
                        <span className="text-slate-500 font-mono">({lead.customerPhone})</span>
                        <span className="bg-amber-100 text-amber-900 font-mono font-bold px-1.5 py-0.2 rounded text-[10px]">
                          Ref: {lead.referralCode} ({lead.promoterName})
                        </span>
                      </div>
                      <div className="text-slate-700 font-medium mt-0.5">
                        {lead.propertyTitle} — Reward: <strong className="text-emerald-700 font-mono">PKR {lead.referralRewardPKR.toLocaleString()}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-semibold">Status:</span>
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-xs text-slate-800 focus:outline-none cursor-pointer"
                      >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="site_visit">Site Visit Scheduled</option>
                        <option value="negotiation">Negotiation</option>
                        <option value="completed">Deal Completed ✓</option>
                        <option value="rejected">Rejected / Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span>Assigned Consultant:</span>
                      <select
                        value={lead.assignedSalesRep.id}
                        onChange={(e) => {
                          const rep = salesReps.find(r => r.id === e.target.value);
                          if (rep) assignLeadSalesRep(lead.id, rep);
                        }}
                        className="bg-white border border-slate-300 rounded px-2 py-1 font-semibold text-xs cursor-pointer"
                      >
                        {salesReps.map(r => (
                          <option key={r.id} value={r.id}>{r.name} ({r.phone})</option>
                        ))}
                      </select>
                    </div>

                    <div className="text-slate-400 text-[11px]">
                      Created: {lead.createdAt}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 4. COMMISSION APPROVALS TAB */}
      {activeTab === 'commissions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Commission Management & Verification</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review completed transactions, approve referral commissions, and disburse bank transfers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">Promoter</th>
                  <th className="py-3 px-3">Property</th>
                  <th className="py-3 px-3">Client</th>
                  <th className="py-3 px-3">Reward (PKR)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {commissions.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{c.promoterName}</td>
                    <td className="py-3 px-3 text-slate-700 max-w-[200px] truncate">{c.propertyTitle}</td>
                    <td className="py-3 px-3 text-slate-600">{c.customerName}</td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-700">PKR {c.amountPKR.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.status === 'paid' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {c.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {c.status === 'under_review' || c.status === 'pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => approveCommission(c.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-bold cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectCommission(c.id, 'Transaction not finalized')}
                            className="px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded text-[11px] font-bold cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      ) : c.status === 'approved' ? (
                        <button
                          onClick={() => setPayoutDialogCommId(c.id)}
                          className="px-3 py-1 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] rounded text-[11px] font-extrabold cursor-pointer"
                        >
                          Disburse Payout
                        </button>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-400">Paid: {c.transactionReference}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {showAddPropModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">List New Verified Property</h3>
              <button onClick={() => setShowAddPropModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProperty} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Property Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="e.g. 1 Kanal Modern Villa Phase 6 DHA"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as PropertyCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg cursor-pointer"
                  >
                    <option value="Houses">Houses</option>
                    <option value="Apartments">Apartments</option>
                    <option value="Residential Plots">Residential Plots</option>
                    <option value="Commercial Plots">Commercial Plots</option>
                    <option value="Shops">Shops</option>
                    <option value="Offices">Offices</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Area / Location</label>
                  <input
                    type="text"
                    required
                    value={newArea}
                    onChange={e => setNewArea(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Demand Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Promoter Reward (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={newReward}
                    onChange={e => setNewReward(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono text-emerald-700 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Size / Dimensions</label>
                  <input
                    type="text"
                    value={newSize}
                    onChange={e => setNewSize(e.target.value)}
                    placeholder="1 Kanal / 10 Marla"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    value={newBedrooms}
                    onChange={e => setNewBedrooms(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPropModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B3D91] text-white rounded-lg font-bold"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Disburse Payout Modal */}
      {payoutDialogCommId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Record Commission Bank Disbursement</h3>
            <p className="text-slate-500">Enter bank transfer transaction reference for audit tracking.</p>
            
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Transaction Reference (TRX ID)</label>
              <input
                type="text"
                value={payoutTrxRef}
                onChange={e => setPayoutTrxRef(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Disbursement Channel</label>
              <input
                type="text"
                value={payoutMethod}
                onChange={e => setPayoutMethod(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setPayoutDialogCommId(null)}
                className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handlePayoutSubmit(payoutDialogCommId)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg"
              >
                Confirm Payment Made
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
