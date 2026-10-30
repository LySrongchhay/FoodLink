import React from 'react';
import { useRole } from '../../context/RoleContext';
import { useStore } from '../../context/StoreContext';
import { UserCheck, Store, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';

export default function RoleSwitcherBar() {
  const { role, setRole } = useRole();
  const { metrics, listings } = useStore();

  return (
    <div className="bg-[#1C1C1E] text-white text-xs px-4 py-2 border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Branding & Role Mode Badge */}
        <div className="flex items-center gap-2.5">
          <span className="font-extrabold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Foodlink Unified UI
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-300">
            Active Mode:
          </span>
          <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[11px] ${
            role === 'customer' 
              ? 'bg-[#2E7D32] text-white' 
              : 'bg-[#FF8A3D] text-white'
          }`}>
            {role === 'customer' ? 'Customer App' : 'Merchant Portal (Cad Bakery)'}
          </span>
        </div>

        {/* Center: Live cross-role status */}
        <div className="hidden md:flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {listings.length} Active Surplus Items
          </span>
          <span>•</span>
          <span>Pending Pickups: <strong className="text-white">{metrics.pendingOrdersCount}</strong></span>
          <span>•</span>
          <span>Meals Saved: <strong className="text-emerald-400">{metrics.mealsSaved}</strong></span>
        </div>

        {/* Right: Switcher toggle controls */}
        <div className="flex items-center gap-1.5 bg-gray-900 p-0.5 rounded-lg border border-gray-700">
          <button
            onClick={() => setRole('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              role === 'customer'
                ? 'bg-[#2E7D32] text-white shadow-xs'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Customer View
          </button>
          <button
            onClick={() => setRole('merchant')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-medium transition-all ${
              role === 'merchant'
                ? 'bg-[#FF8A3D] text-white shadow-xs'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            Merchant Portal
          </button>
        </div>
      </div>
    </div>
  );
}

