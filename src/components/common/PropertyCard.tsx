import React from 'react';
import { PropertyListing } from '../../types';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Share2, Eye, Bed, Bath, Maximize2, MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyListing;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { navigateToProperty, setShareModalProperty } = useApp();

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
        <img 
          src={property.images[0]} 
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          onError={(e) => {
            // Fallback gradient if missing
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Verified Badge */}
        {property.isVerified && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1.5 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verified Listing</span>
          </div>
        )}

        {/* Category Chip */}
        <div className="absolute top-3 right-3 bg-[#0B3D91]/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded shadow-xs">
          {property.category}
        </div>

        {/* Bottom Referral Reward Gradient Banner */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white">
          <div className="text-[11px] text-slate-300 font-medium">
            Referral Reward
          </div>
          <div className="text-xs font-extrabold text-[#F4B400] bg-black/40 px-2 py-0.5 rounded border border-[#F4B400]/40 font-mono">
            {property.referralRewardDisplay}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Location & Meta (Unboxed metadata with typographic separator) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.area}</span>
            <span aria-hidden="true">·</span>
            <span className="shrink-0">{property.city}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateToProperty(property.id)}
            className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0B3D91] transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {property.title}
          </h3>

          {/* Key Specs */}
          <div className="flex items-center gap-3 text-xs text-slate-600 mt-2.5 pt-2 border-t border-slate-100">
            <span className="font-semibold text-slate-800">{property.areaSize}</span>
            {property.bedrooms && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-slate-400" />
                  <span>{property.bedrooms} Beds</span>
                </span>
              </>
            )}
            {property.bathrooms && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-slate-400" />
                  <span>{property.bathrooms} Baths</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Pricing and Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Demand</span>
            <span className="text-base sm:text-lg font-extrabold text-[#0B3D91] font-mono tracking-tight">
              {property.formattedPrice}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateToProperty(property.id)}
              className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-[#0B3D91] hover:text-[#0B3D91] text-slate-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              onClick={() => setShareModalProperty(property)}
              className="w-full py-2 px-3 rounded-lg bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] text-xs font-extrabold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share & Earn</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
