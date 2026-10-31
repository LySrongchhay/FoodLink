import React from 'react';
import {
  X,
  Star,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Navigation,
} from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';

export default function MapBottomDrawer({ store, onClose, onRescueDeal }) {
  if (!store) return null;

  const handleRescueClick = () => {
    // Transform store into listing format expected by CustomerApp
    const listingItem = {
      id: store.id,
      storeName: store.storeName,
      title: store.title || `${store.storeName} Surprise Bag`,
      description: store.description,
      category: store.category,
      price: store.discountedPrice,
      originalPrice: store.originalPrice,
      discount: `${store.discountPercentage}% OFF`,
      discountPercentage: store.discountPercentage,
      bagsAvailable: store.bagsAvailable,
      remaining: store.bagsAvailable,
      pickupWindow: store.pickupWindow,
      pickupTime: store.pickupWindow,
      rating: store.rating,
      ratingCount: store.ratingCount,
      distance: store.formattedDistance,
      address: store.address,
      street: store.street,
      image: store.imageUrl,
      imageUrl: store.imageUrl,
      dietary: ['Vegetarian Friendly', 'Fresh Daily'],
    };

    onRescueDeal(listingItem);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 p-2 sm:p-4 pointer-events-auto animate-in slide-in-from-bottom duration-300">
      <div className="max-w-lg mx-auto bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden text-stone-900">
        
        {/* Google Maps Style Drag Indicator */}
        <div className="w-full flex items-center justify-center pt-2.5 pb-1 cursor-grab active:cursor-grabbing">
          <div className="w-10 h-1.5 bg-stone-300 rounded-full" />
        </div>

        <div className="p-4 sm:p-5">
          {/* Top Bar: Google Maps Category & Verified Pill */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#2E7D32] border border-emerald-200">
                {store.category}
              </span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-stone-500">
                <Navigation className="w-3 h-3 shrink-0 text-[#2E7D32]" />
                {store.formattedDistance}
              </span>
              <span className="text-[11px] text-stone-400 font-normal">
                · BKK1 Phnom Penh
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close place details"
            >
              <X className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Place Preview Card */}
          <div className="flex gap-3 sm:gap-4 items-start">
            {/* Store Image with Discount Chip */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200 shadow-inner">
              <OptimizedImage
                src={store.imageUrl}
                alt={store.storeName}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-[#FF8A3D] text-white shadow-md">
                {store.badgeText || `${store.discountPercentage}% OFF`}
              </span>
            </div>

            {/* Place Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 truncate">
                  {store.storeName}
                </h3>
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#2E7D32] shrink-0" title="Verified Foodlink Partner" />
              </div>

              <p className="text-xs text-stone-500 truncate mt-0.5">
                {store.address}
              </p>

              <div className="flex items-center gap-3 mt-1.5 text-xs">
                <div className="flex items-center gap-1 font-semibold text-stone-800">
                  <Star className="w-3.5 h-3.5 shrink-0 fill-amber-400 text-amber-400" />
                  <span>{store.rating}</span>
                  <span className="text-stone-400 font-normal">({store.ratingCount})</span>
                </div>

                <div className="flex items-center gap-1 text-stone-600">
                  <Clock className="w-3.5 h-3.5 shrink-0 text-stone-400" />
                  <span>Pickup: {store.pickupWindow}</span>
                </div>
              </div>

              <div className="mt-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 rounded-lg px-2 py-1 truncate flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#2E7D32]" />
                <span className="truncate">{store.title}</span>
              </div>
            </div>
          </div>

          {/* Pricing & "Rescue Deal" Action Button */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                Surplus Rescue Deal
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-[#2E7D32]">
                  ${Number(store.discountedPrice).toFixed(2)}
                </span>
                <span className="text-xs text-stone-400 line-through">
                  ${Number(store.originalPrice).toFixed(2)}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                  Save ${(store.originalPrice - store.discountedPrice).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleRescueClick}
              className="flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#256628] active:scale-95 text-white font-bold px-5 py-3 min-h-[44px] rounded-xl shadow-lg shadow-emerald-900/20 transition-all cursor-pointer text-sm sm:text-base shrink-0"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span>Rescue Deal</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
