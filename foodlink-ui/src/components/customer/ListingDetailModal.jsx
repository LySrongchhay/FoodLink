import React, { useState } from 'react';
import Modal from '../common/Modal';
import { Clock, MapPin, Sparkles, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function ListingDetailModal({ listing, isOpen, onClose, onProceedToCheckout }) {
  const [quantity, setQuantity] = useState(1);

  if (!listing) return null;

  const handleCheckout = () => {
    onProceedToCheckout(listing, quantity);
  };

  const totalPrice = (listing.discountedPrice * quantity).toFixed(2);
  const totalSaved = ((listing.originalPrice - listing.discountedPrice) * quantity).toFixed(2);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={listing.title} maxWidth="max-w-xl">
      <div className="space-y-5">
        {/* Banner image */}
        <div className="relative h-56 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-[#FF8A3D] text-white px-3 py-1 rounded-lg font-bold text-xs shadow-md">
            {listing.discountPercentage}% OFF
          </div>
        </div>

        {/* Store & Category */}
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-base text-[#1C1C1E]">{listing.merchantName}</h4>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#2E7D32]" /> BKK1, Phnom Penh (0.6 km away)
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-[#2E7D32] border border-emerald-100">
            Verified Bakery
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed bg-[#FAFAFA] p-3.5 rounded-xl border border-gray-100">
          {listing.description}
        </p>

        {/* Timing info */}
        <div className="flex items-center gap-3 p-3 bg-[#FFF8F0] border border-[#FF8A3D]/25 rounded-xl text-xs">
          <Clock className="w-5 h-5 text-[#FF8A3D] shrink-0" />
          <div>
            <div className="font-bold text-amber-900">Today's Pickup Window</div>
            <div className="text-amber-800">{listing.pickupStartTime} – {listing.pickupEndTime}</div>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-xs font-semibold text-gray-700">Quantity (Max {listing.quantityAvailable}):</div>
          <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 disabled:opacity-40 shadow-xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-bold text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(q => Math.min(listing.quantityAvailable, q + 1))}
              disabled={quantity >= listing.quantityAvailable}
              className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 disabled:opacity-40 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Price & Checkout Action */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400">Total Price:</div>
            <div className="text-2xl font-black text-[#2E7D32]">${totalPrice}</div>
            <div className="text-[11px] font-semibold text-[#FF8A3D]">You save ${totalSaved}!</div>
          </div>

          <button
            onClick={handleCheckout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-sm hover:bg-[#256628] shadow-md transition-all active:scale-98"
          >
            <ShoppingBag className="w-4 h-4" />
            Confirm & Pay via KHQR
          </button>
        </div>
      </div>
    </Modal>
  );
}

