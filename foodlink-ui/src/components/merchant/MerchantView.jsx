import React, { useState } from 'react';
import MerchantNavbar from './MerchantNavbar';
import MerchantDashboardView from './MerchantDashboardView';
import MerchantListingsView from './MerchantListingsView';
import MerchantOrdersView from './MerchantOrdersView';
import CreateListingModal from './CreateListingModal';
import VerifyPickupModal from './VerifyPickupModal';

export default function MerchantView() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'listings' | 'orders'
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);

  const handleOpenVerifyWithCode = (code = '') => {
    setVerifyCode(code);
    setIsVerifyOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24">
      {/* Merchant Sticky Navbar */}
      <MerchantNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreate={() => setIsCreateOpen(true)}
        onOpenVerify={() => handleOpenVerifyWithCode('')}
      />

      <main className="max-w-7xl mx-auto px-4 pt-6">
        {activeTab === 'dashboard' && (
          <MerchantDashboardView
            onOpenCreate={() => setIsCreateOpen(true)}
            onOpenVerify={() => handleOpenVerifyWithCode('')}
          />
        )}

        {activeTab === 'listings' && (
          <MerchantListingsView
            onOpenCreate={() => setIsCreateOpen(true)}
          />
        )}

        {activeTab === 'orders' && (
          <MerchantOrdersView
            onOpenVerify={(code) => handleOpenVerifyWithCode(code)}
          />
        )}
      </main>

      {/* Modals */}
      <CreateListingModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />

      <VerifyPickupModal
        isOpen={isVerifyOpen}
        initialCode={verifyCode}
        onClose={() => {
          setIsVerifyOpen(false);
          setVerifyCode('');
        }}
      />
    </div>
  );
}

