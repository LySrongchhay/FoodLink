import React from 'react';
import { Clock, MapPin, Sparkles, Store } from 'lucide-react';
import Badge from '../common/Badge';

export default function ListingCard({ listing, onSelect }) {
  const isSoldOut = listing.quantityAvailable <= 0 || listing.status === 'SOLD_OUT';

  return (
    <div 
      onClick={() => !isSoldOut && onSelect(listing)}
      className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between ${
        isSoldOut ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'
      }`}
    >
      <div>
        {/* Image Container */}
        <div className="relative h-44 w-full bg-gray-100 overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-[#FF8A3D] text-white font-extrabold text-xs shadow-md tracking-tight flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {listing.discountPercentage}% OFF
            </span>
          </div>

          {/* Stock remaining */}
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md ${
              isSoldOut 
                ? 'bg-rose-500/90 text-white' 
                : 'bg-black/60 text-white'
            }`}>
              {isSoldOut ? 'Sold Out' : `${listing.quantityAvailable} left`}
            </span>
          </div>

          {/* Merchant Name overlay */}
          <div className="absolute bottom-2.5 left-3 right-3 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300 drop-shadow-xs">
              <Store className="w-3.5 h-3.5" />
              {listing.merchantName}
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4">
          <h3 className="font-bold text-base text-[#1C1C1E] line-clamp-1 group-hover:text-[#2E7D32] transition-colors">
            {listing.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {listing.description}
          </p>

          {/* Pickup Window */}
          <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-[#FFF8F0] px-2.5 py-1 rounded-lg border border-[#FF8A3D]/20">
            <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" />
            <span>Pickup: <strong>{listing.pickupStartTime} - {listing.pickupEndTime}</strong></span>
          </div>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-50 flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-400 line-through mr-1.5 font-medium">
            ${listing.originalPrice.toFixed(2)}
          </span>
          <span className="text-lg font-black text-[#2E7D32]">
            ${listing.discountedPrice.toFixed(2)}
          </span>
        </div>

        <button
          disabled={isSoldOut}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            isSoldOut
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-[#2E7D32] text-white hover:bg-[#256628] shadow-xs active:scale-95'
          }`}
        >
          {isSoldOut ? 'Sold Out' : 'Rescue Deal'}
        </button>
      </div>
    </div>
  );
}

