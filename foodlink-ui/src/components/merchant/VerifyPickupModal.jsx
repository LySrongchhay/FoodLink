import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function VerifyPickupModal({ isOpen, onClose, initialCode = '' }) {
  const { verifyPickup } = useStore();
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (initialCode) {
      setCode(initialCode);
    }
  }, [initialCode, isOpen]);

  const handleVerify = (e) => {
    e?.preventDefault();
    if (!code || code.trim().length === 0) return;

    const res = verifyPickup(code);
    setResult(res);
  };

  const handleClose = () => {
    setCode('');
    setResult(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Customer Pickup Code Verification" maxWidth="max-w-md">
      <div className="space-y-4">
        <p className="text-xs text-gray-500">
          Ask the customer for their 4-digit pickup code shown on their Foodlink order voucher.
        </p>

        <form onSubmit={handleVerify} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              4-Digit Pickup PIN
            </label>
            <input
              type="text"
              maxLength={6}
              placeholder="e.g. 4921"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setResult(null);
              }}
              className="w-full text-center text-3xl font-mono font-black tracking-widest py-3 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-[#2E7D32] focus:bg-white focus:outline-hidden"
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!code.trim()}
            className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#256628] disabled:opacity-40 text-white font-bold text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Verify & Complete Pickup
          </button>
        </form>

        {/* Verification Result Feedback */}
        {result && (
          <div className={`p-4 rounded-xl border animate-in zoom-in-95 duration-200 ${
            result.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="flex items-start gap-2.5">
              {result.success ? (
                <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                <div className="font-bold">{result.success ? 'Pickup Authorized!' : 'Verification Failed'}</div>
                <div>{result.message}</div>
                {result.order && (
                  <div className="mt-2 pt-2 border-t border-emerald-200 text-[11px] text-emerald-800">
                    <div>Item: <strong>{result.order.listingTitle}</strong></div>
                    <div>Quantity: <strong>{result.order.quantity}</strong> | Total: <strong>${result.order.totalPrice.toFixed(2)}</strong></div>
                  </div>
                )}
              </div>
            </div>

            {result.success && (
              <button
                onClick={handleClose}
                className="mt-3 w-full py-2 bg-[#2E7D32] text-white text-xs font-bold rounded-lg hover:bg-[#256628]"
              >
                Done
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

