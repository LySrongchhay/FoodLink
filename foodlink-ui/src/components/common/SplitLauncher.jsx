import React, { useState } from 'react';
import { usePortalRouter } from '../../router/usePortalRouter';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Store, QrCode, ArrowRight, Copy, Check, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

export default function SplitLauncher() {
  const { navigateTo, customerUrl, merchantUrl } = usePortalRouter();
  const { resetDemoData, metrics, listings } = useStore();
  const [copiedLink, setCopiedLink] = useState(null);

  const copyToClipboard = (url, type) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Helper to generate a clean stylized QR Code SVG
  const renderQrPreview = (label, color) => (
    <div className="relative w-44 h-44 bg-white p-2.5 rounded-2xl shadow-inner border border-gray-200 flex flex-col items-center justify-center mx-auto">
      <div className="w-full h-full bg-gradient-to-br from-gray-50 to-stone-100 rounded-xl flex flex-col items-center justify-center p-2 border border-gray-100 relative overflow-hidden">
        <QrCode className="w-24 h-24 text-gray-800 transition-transform group-hover:scale-105" />
        <span 
          style={{ backgroundColor: color }} 
          className="text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider mt-1.5 shadow-xs"
        >
          {label}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-stone-100 text-[#1C1C1E] flex flex-col justify-between p-4 sm:p-8">
      {/* Top Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white border border-gray-200 overflow-hidden flex items-center justify-center shadow-xs p-1">
            <img src="/foodlink-logo.png" alt="Foodlink Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#1C1C1E] tracking-tight">Foodlink Cambodia</h1>
            <p className="text-xs text-[#2E7D32] font-semibold">Dual Portal Hosting & QR Launcher</p>
          </div>
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 shadow-2xs transition-colors"
          title="Reset to fresh demo data"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Demo</span>
        </button>
      </header>

      {/* Main Split Section */}
      <main className="max-w-5xl mx-auto w-full my-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#2E7D32] border border-emerald-200 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A3D]" /> Dedicated Links for 2 Physical QR Codes
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#1C1C1E]">
            One Platform. <br />
            <span className="text-[#2E7D32]">Two Distinct Experiences.</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-3 leading-relaxed">
            Scan or click either destination below to test each independent user journey. Each portal has its own direct URL ready to be printed onto physical stickers, flyers, or counter tablets.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Customer App (QR 1) */}
          <div className="group bg-white rounded-3xl border-2 border-[#2E7D32]/30 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-[#2E7D32] text-xs font-extrabold uppercase tracking-wider border border-emerald-200 flex items-center gap-1">
                  <ShoppingBag className="w-3.5 h-3.5" /> QR Code 1 • For Diners
                </span>
                <span className="text-xs font-semibold text-gray-400">Mobile First</span>
              </div>

              <h3 className="text-2xl font-black text-[#1C1C1E] mt-4">
                Customer Food Rescue App
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                Discover closing-hour bakery deals, claim surplus meals up to 60% OFF, and pay securely with Bakong KHQR for counter pickup.
              </p>

              {/* QR Code Container */}
              <div className="my-6">
                {renderQrPreview("SCAN FOR CUSTOMER APP", "#2E7D32")}
              </div>

              {/* Direct Link Info */}
              <div className="bg-[#FAFAFA] p-3 rounded-2xl border border-gray-100 flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-gray-600 truncate">{customerUrl}</span>
                <button
                  onClick={() => copyToClipboard(customerUrl, 'customer')}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors shrink-0"
                  title="Copy direct link"
                >
                  {copiedLink === 'customer' ? <Check className="w-4 h-4 text-[#2E7D32]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => navigateTo('customer')}
              className="mt-6 w-full py-3.5 px-4 rounded-2xl bg-[#2E7D32] hover:bg-[#256628] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 group-hover:translate-x-0.5"
            >
              <span>Launch Customer Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Merchant Hub (QR 2) */}
          <div className="group bg-white rounded-3xl border-2 border-[#FF8A3D]/40 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF8A3D] text-xs font-extrabold uppercase tracking-wider border border-orange-200 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5" /> QR Code 2 • For Partners
                </span>
                <span className="text-xs font-semibold text-gray-400">Tablet & Desktop</span>
              </div>

              <h3 className="text-2xl font-black text-[#1C1C1E] mt-4">
                Cad Bakery Merchant Hub
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
                Store operations portal for store managers: post evening surplus inventory, monitor live pickups, and verify customer 4-digit PINs.
              </p>

              {/* QR Code Container */}
              <div className="my-6">
                {renderQrPreview("SCAN FOR MERCHANT HUB", "#FF8A3D")}
              </div>

              {/* Direct Link Info */}
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#FF8A3D]/20 flex items-center justify-between gap-2 text-xs">
                <span className="font-mono text-gray-700 truncate">{merchantUrl}</span>
                <button
                  onClick={() => copyToClipboard(merchantUrl, 'merchant')}
                  className="p-1.5 rounded-lg hover:bg-amber-100 text-gray-700 transition-colors shrink-0"
                  title="Copy direct link"
                >
                  {copiedLink === 'merchant' ? <Check className="w-4 h-4 text-[#FF8A3D]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => navigateTo('merchant')}
              className="mt-6 w-full py-3.5 px-4 rounded-2xl bg-[#FF8A3D] hover:bg-[#E67628] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 group-hover:translate-x-0.5"
            >
              <span>Launch Merchant Hub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer / Status */}
      <footer className="max-w-6xl mx-auto w-full py-4 text-center text-xs text-gray-400 border-t border-gray-200">
        <p>Foodlink Multi-Portal Preview • Compatible with Vercel, Netlify, and GitHub Pages static hosting.</p>
      </footer>
    </div>
  );
}

