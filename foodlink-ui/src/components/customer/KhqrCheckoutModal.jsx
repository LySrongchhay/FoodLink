import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useStore } from '../../context/StoreContext';
import { useRole } from '../../context/RoleContext';
import { QrCode, CheckCircle2, Copy, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

export default function KhqrCheckoutModal({ listing, quantity = 1, isOpen, onClose }) {
  const { createOrder } = useStore();
  const { setRole } = useRole();
  const [completedOrder, setCompletedOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!listing) return null;

  const totalAmount = (listing.discountedPrice * quantity).toFixed(2);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const order = createOrder(listing.id, quantity);
        setCompletedOrder(order);
      } catch (err) {
        alert(err.message);
      } finally {
        setIsProcessing(false);
      }
    }, 700);
  };

  const handleCopyCode = () => {
    if (completedOrder) {
      navigator.clipboard.writeText(completedOrder.pickupCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSwitchToMerchantToVerify = () => {
    onClose();
    setCompletedOrder(null);
    setRole('merchant');
  };

  const handleClose = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={completedOrder ? "Order Confirmed & Pickup Voucher" : "Bakong KHQR Payment"}
      maxWidth="max-w-md"
    >
      {!completedOrder ? (
        <div className="text-center space-y-4">
          <div className="bg-red-50 text-red-700 text-xs font-bold py-1 px-3 rounded-lg inline-block border border-red-200 uppercase tracking-wider">
            KHQR Official Food Rescue Partner
          </div>

          <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-4 inline-block shadow-inner">
            {/* Visual KHQR Placeholder Graphic */}
            <div className="w-52 h-52 bg-gradient-to-br from-emerald-50 to-gray-100 rounded-xl flex flex-col items-center justify-center border border-gray-200 relative overflow-hidden">
              <QrCode className="w-32 h-32 text-gray-800" />
              <div className="absolute inset-0 bg-radial from-transparent to-black/5 pointer-events-none" />
              <span className="text-[11px] font-extrabold text-[#2E7D32] bg-white/90 px-2.5 py-0.5 rounded-full shadow-xs mt-1 border border-emerald-200">
                BAKONG KHQR
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Amount to Pay</div>
            <div className="text-3xl font-black text-[#2E7D32]">${totalAmount}</div>
            <div className="text-xs text-gray-600 mt-1">
              {quantity}x {listing.title} ({listing.merchantName})
            </div>
          </div>

          <p className="text-xs text-gray-400 max-w-xs mx-auto">
            Scan with any Cambodian mobile banking app (ABA, Wing, ACLEDA, Bakong).
          </p>

          <button
            onClick={handleSimulatePayment}
            disabled={isProcessing}
            className="w-full py-3 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="inline-block animate-spin mr-1">⏳</span>
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {isProcessing ? 'Verifying KHQR Transaction...' : 'Simulate Instant Payment ($' + totalAmount + ')'}
          </button>
        </div>
      ) : (
        <div className="text-center space-y-5 animate-in zoom-in-95 duration-200">
          <div className="w-14 h-14 bg-emerald-100 text-[#2E7D32] rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-lg font-bold text-[#1C1C1E]">Food Rescue Reserved!</h4>
            <p className="text-xs text-gray-500 mt-1">
              Order <strong className="text-gray-800">#{completedOrder.orderNumber}</strong> confirmed at {completedOrder.merchantName}.
            </p>
          </div>

          {/* 4-digit pickup code voucher card */}
          <div className="bg-[#FFF8F0] border-2 border-[#FF8A3D] rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Your 4-Digit Pickup PIN
            </div>
            <div className="text-4xl font-mono font-black text-[#FF8A3D] tracking-widest my-2 select-all">
              {completedOrder.pickupCode}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#FF8A3D]/30 text-xs font-semibold text-amber-900 hover:bg-amber-50"
              >
                <Copy className="w-3.5 h-3.5" />
                {copied ? 'Copied!' : 'Copy PIN'}
              </button>
            </div>
            <div className="mt-3 text-[11px] text-amber-800 flex items-center justify-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" /> Pickup window: {completedOrder.pickupWindow}
            </div>
          </div>

          {/* Test Cross-Role CTA */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-left">
            <div className="text-xs font-bold text-[#2E7D32]">Test Merchant Verification Flow:</div>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Switch over to Merchant mode now to verify this pickup code (<strong>{completedOrder.pickupCode}</strong>) in the Merchant Orders dashboard.
            </p>
            <button
              onClick={handleSwitchToMerchantToVerify}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2E7D32] hover:bg-[#256628] text-white rounded-lg font-bold text-xs shadow-xs"
            >
              Switch to Merchant to Verify <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800"
          >
            Done & Return to Feed
          </button>
        </div>
      )}
    </Modal>
  );
}

