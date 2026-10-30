import React from 'react';
import { ShoppingBag, MapPin, Search, Heart, User } from 'lucide-react';

export default function CustomerNavbar({ searchQuery, setSearchQuery, activeOrdersCount = 0, onOpenOrders }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-[41px] z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white font-black text-xl shadow-xs">
            FL
          </div>
          <div>
            <h1 className="font-extrabold text-lg text-[#1C1C1E] leading-tight">Foodlink</h1>
            <p className="text-[11px] text-[#2E7D32] font-semibold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#FF8A3D]" /> BKK1 & Daun Penh, Phnom Penh
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search surplus bakeries, meals, or groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#2E7D32] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={onOpenOrders}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF8F0] border border-[#FF8A3D]/30 text-[#FF8A3D] font-bold text-xs hover:bg-[#FFEBD6] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>My Pickups</span>
            {activeOrdersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF8A3D] text-white flex items-center justify-center text-[10px]">
                {activeOrdersCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

