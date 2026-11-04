import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PropertyCard } from '../components/common/PropertyCard';
import { PropertyCategory } from '../types';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  Grid, 
  List, 
  ShieldCheck, 
  RotateCcw,
  Building,
  MapPin,
  TrendingUp
} from 'lucide-react';

export const ExplorePropertiesPage: React.FC = () => {
  const { properties, setShareModalProperty, navigateToProperty } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [bedroomFilter, setBedroomFilter] = useState<string>('All');
  const [priceMaxPKR, setPriceMaxPKR] = useState<number>(100000000); // 10 Crore
  const [sortBy, setSortBy] = useState<'featured' | 'price_asc' | 'price_desc' | 'reward_desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: (PropertyCategory | 'All')[] = [
    'All',
    'Houses',
    'Apartments',
    'Residential Plots',
    'Commercial Plots',
    'Shops',
    'Offices',
    'Agricultural Land',
    'Investment Projects'
  ];

  const areas = ['All', 'Phase 6, DHA Lahore', 'Sector B, Bahria Town Lahore', 'Main Boulevard, Gulberg III, Lahore', 'Sector M-3, Lake City, Raiwind Road', 'Phase 8 (Ex-Park View), DHA Lahore', 'G-Block Commercial Market, Johar Town'];

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesArea = p.area.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesArea && !matchesDesc) return false;
      }

      // City
      if (selectedCity !== 'All' && p.city !== selectedCity) return false;

      // Area
      if (selectedArea !== 'All' && p.area !== selectedArea) return false;

      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Verified
      if (verifiedOnly && !p.isVerified) return false;

      // Bedrooms
      if (bedroomFilter !== 'All') {
        const count = parseInt(bedroomFilter);
        if (!p.bedrooms || p.bedrooms < count) return false;
      }

      // Max price
      if (p.pricePKR > priceMaxPKR) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price_desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'reward_desc') return b.referralRewardValue - a.referralRewardValue;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [properties, searchQuery, selectedCity, selectedArea, selectedCategory, verifiedOnly, bedroomFilter, priceMaxPKR, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedArea('All');
    setSelectedCategory('All');
    setVerifiedOnly(false);
    setBedroomFilter('All');
    setPriceMaxPKR(100000000);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
            Lahore Real Estate Marketplace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Explore Property Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse verified listings, grab your unique referral links, and share to earn predefined commissions.
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md text-xs cursor-pointer ${
                viewMode === 'grid' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md text-xs cursor-pointer ${
                viewMode === 'list' ? 'bg-[#0B3D91] text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="featured">Featured First</option>
            <option value="reward_desc">Highest Referral Reward</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        
        {/* Search input + Top Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search title, DHA, Bahria..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
            />
          </div>

          {/* Area Select */}
          <div>
            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
            >
              <option value="All">All Lahore Areas</option>
              {areas.filter(a => a !== 'All').map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Category Select */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
            >
              <option value="All">All Property Types</option>
              {categories.filter(c => c !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Bedrooms Select */}
          <div>
            <select
              value={bedroomFilter}
              onChange={e => setBedroomFilter(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
            >
              <option value="All">Bedrooms (Any)</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

        </div>

        {/* Secondary Row: Max Price Slider, Verified Toggle, Reset */}
        <div className="pt-3 border-t border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <span className="font-semibold text-slate-700 whitespace-nowrap">Max Price:</span>
            <div className="flex items-center gap-2 flex-1 sm:w-60">
              <input
                type="range"
                min={10000000}
                max={100000000}
                step={2500000}
                value={priceMaxPKR}
                onChange={e => setPriceMaxPKR(Number(e.target.value))}
                className="w-full accent-[#0B3D91] cursor-pointer"
              />
            </div>
            <span className="font-bold font-mono text-[#0B3D91] shrink-0">
              PKR {(priceMaxPKR / 10000000).toFixed(2)} Crore
            </span>
          </div>

          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={e => setVerifiedOnly(e.target.checked)}
                className="rounded border-slate-300 text-[#0B3D91] focus:ring-[#0B3D91] cursor-pointer"
              />
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Listings Only
              </span>
            </label>

            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors font-semibold cursor-pointer ml-auto lg:ml-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-900">{filteredProperties.length}</span> properties
        </div>
      </div>

      {/* Property Display: Grid vs List */}
      {filteredProperties.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Building className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No properties match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your maximum price slider, clearing specific area filters, or resetting all search options.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#0B3D91] text-white text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {filteredProperties.map(prop => (
            <div 
              key={prop.id}
              className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:shadow-md transition-shadow"
            >
              <img 
                src={prop.images[0]} 
                alt={prop.title}
                referrerPolicy="no-referrer"
                className="w-full sm:w-48 h-36 rounded-lg object-cover shrink-0 cursor-pointer"
                onClick={() => navigateToProperty(prop.id)}
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{prop.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{prop.area}</span>
                    </div>
                    {prop.isVerified && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <h3 
                    onClick={() => navigateToProperty(prop.id)}
                    className="text-base font-bold text-slate-900 hover:text-[#0B3D91] cursor-pointer mt-1 line-clamp-1"
                  >
                    {prop.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {prop.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Demand / Asking</div>
                    <div className="text-base font-extrabold text-[#0B3D91] font-mono">{prop.formattedPrice}</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 font-medium">Referral Commission</div>
                      <div className="text-xs font-bold text-emerald-700 font-mono">{prop.referralRewardDisplay}</div>
                    </div>

                    <button
                      onClick={() => setShareModalProperty(prop)}
                      className="px-4 py-2 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Share & Earn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
