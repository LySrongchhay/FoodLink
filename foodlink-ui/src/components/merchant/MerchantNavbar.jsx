import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, CheckCircle, Plus, Store } from 'lucide-react';

export default function MerchantNavbar({ activeTab, setActiveTab, onOpenCreate, onOpenVerify }) {
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'listings', label: 'Surplus Inventory', icon: Package },
    { id: 'orders', label: 'Customer Orders', icon: ShoppingCart },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-[41px] z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Merchant Store Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF8A3D] text-white flex items-center justify-center font-bold text-lg shadow-xs">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-base text-[#1C1C1E]">Cad Bakery & Cafe</h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#2E7D32] text-[10px] font-bold border border-emerald-200">
                Partner Store
              </span>
            </div>
            <p className="text-xs text-gray-500">Merchant Operations Portal</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#1C1C1E] shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenVerify}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#2E7D32] text-[#2E7D32] text-xs font-bold hover:bg-emerald-50 transition-colors shadow-2xs"
          >
            <CheckCircle className="w-4 h-4" />
            Verify Pickup PIN
          </button>

          <button
            onClick={onOpenCreate}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF8A3D] text-white text-xs font-bold hover:bg-[#E67628] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            New Surplus Batch
          </button>
        </div>
      </div>
    </header>
  );
}

