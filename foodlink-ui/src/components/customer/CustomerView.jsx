import React, { useState, useMemo } from 'react';
import CustomerNavbar from './CustomerNavbar';
import CategoryFilters from './CategoryFilters';
import ExploreFeed from './ExploreFeed';
import ListingDetailModal from './ListingDetailModal';
import KhqrCheckoutModal from './KhqrCheckoutModal';
import CustomerOrdersModal from './CustomerOrdersModal';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function CustomerView() {
  const { listings, orders } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedListing, setSelectedListing] = useState(null);
  const [checkoutData, setCheckoutData] = useState(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Active reserved orders for current user
  const activeOrdersCount = orders.filter(o => o.status === 'RESERVED').length;

  // Filter listings by category and search
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [listings, activeCategory, searchQuery]);

  const handleOpenCheckout = (listing, quantity) => {
    setSelectedListing(null);
    setCheckoutData({ listing, quantity });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Top App Navbar */}
      <CustomerNavbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeOrdersCount={activeOrdersCount}
        onOpenOrders={() => setIsOrdersModalOpen(true)}
      />

      <main className="max-w-6xl mx-auto px-4 pt-6 space-y-6">
        {/* Promotional Hero Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#2E7D32] to-[#1E5221] text-white p-6 sm:p-8 overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#FF8A3D]" /> Closing-Hour Deals Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Rescue Delicious Surplus Meals at up to 60% OFF
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 mt-2 font-normal leading-relaxed">
              Help local Phnom Penh bakeries, grocery stores, and restaurants reduce food waste. Order directly via Bakong KHQR and collect fresh items before closing!
            </p>
          </div>
          {/* Decorative Background Blur */}
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none transform translate-x-20 translate-y-20" />
        </div>

        {/* Category Filters */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-lg text-[#1C1C1E]">Explore Categories</h3>
            <span className="text-xs text-gray-500 font-medium">{filteredListings.length} deals available</span>
          </div>
          <CategoryFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Listings Feed */}
        <section className="pt-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-lg text-[#1C1C1E]">
              {activeCategory === 'All' ? 'All Surplus Deals Near You' : `${activeCategory} Deals`}
            </h3>
            <span className="text-xs font-semibold text-[#2E7D32] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" /> Pickups ending soon
            </span>
          </div>

          <ExploreFeed
            listings={filteredListings}
            onSelectListing={(listing) => setSelectedListing(listing)}
          />
        </section>
      </main>

      {/* Modals */}
      <ListingDetailModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        onProceedToCheckout={handleOpenCheckout}
      />

      <KhqrCheckoutModal
        listing={checkoutData?.listing}
        quantity={checkoutData?.quantity || 1}
        isOpen={!!checkoutData}
        onClose={() => setCheckoutData(null)}
      />

      <CustomerOrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
      />
    </div>
  );
}

