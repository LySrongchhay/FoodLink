import React from 'react';
import { usePortalRouter } from './router/usePortalRouter';
import SplitLauncher from './components/common/SplitLauncher';
import CustomerApp from './components/customer/CustomerApp';
import MerchantApp from './components/merchant/MerchantApp';
import PortalSwitcherFloating from './components/common/PortalSwitcherFloating';

export default function App() {
  const { portal } = usePortalRouter();

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans antialiased text-[#1C1C1E]">
      {portal === 'customer' && <CustomerApp />}
      {portal === 'merchant' && <MerchantApp />}
      {portal === 'launcher' && <SplitLauncher />}

      {/* Floating reviewer utility to quickly switch between links or copy QR URLs */}
      <PortalSwitcherFloating />
    </div>
  );
}
