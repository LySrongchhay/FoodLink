import React, { useState } from 'react';
import { usePortalRouter } from '../../router/usePortalRouter';
import { Layers, ShoppingBag, Store, LayoutGrid, ChevronDown, ChevronUp, QrCode } from 'lucide-react';

export default function PortalSwitcherFloating() {
  const { portal, navigateTo } = usePortalRouter();
  const [isExpanded, setIsExpanded] = useState(false);

  // If in launcher, no need for floating pill
  if (portal === 'launcher') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in duration-300">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#1C1C1E] text-white text-xs font-bold shadow-xl border border-gray-700 hover:bg-gray-800 transition-all cursor-pointer backdrop-blur-md"
          title="Switch Portal or QR Links"
        >
          <Layers className="w-4 h-4 text-emerald-400" />
          <span>Switch Link</span>
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        </button>
      ) : (
        <div className="bg-[#1C1C1E] text-white p-3 rounded-2xl shadow-2xl border border-gray-700 w-56 space-y-2 backdrop-blur-lg">
          <div className="flex items-center justify-between px-1 pb-1 border-b border-gray-800">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" /> Portal Navigator
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white p-1 rounded-md"
              title="Collapse"
            >
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                navigateTo('customer');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                portal === 'customer'
                  ? 'bg-[#2E7D32] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer App (/customer)</span>
            </button>

            <button
              onClick={() => {
                navigateTo('merchant');
                setIsExpanded(false);
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left transition-colors ${
                portal === 'merchant'
                  ? 'bg-[#FF8A3D] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Merchant Hub (/merchant)</span>
            </button>

            <button
              onClick={() => {
                navigateTo('launcher');
                setIsExpanded(false);
              }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-left text-gray-300 hover:bg-gray-800 transition-colors border-t border-gray-800 mt-1 pt-1.5"
            >
              <QrCode className="w-3.5 h-3.5 text-stone-400" />
              <span>Dual QR Launcher (/)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

