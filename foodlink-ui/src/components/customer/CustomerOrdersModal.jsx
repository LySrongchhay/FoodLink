import React from 'react';
import Modal from '../common/Modal';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Clock, CheckCircle2, QrCode } from 'lucide-react';
import Badge from '../common/Badge';

export default function CustomerOrdersModal({ isOpen, onClose }) {
  const { orders } = useStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="My Pickup Orders & Vouchers" maxWidth="max-w-lg">
      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-xs text-gray-500 font-medium">No rescue orders placed yet.</p>
          </div>
        ) : (
          orders.map((order) => {
            const isCompleted = order.status === 'COMPLETED';
            return (
              <div 
                key={order.id} 
                className={`p-4 rounded-xl border ${
                  isCompleted ? 'bg-gray-50 border-gray-200 opacity-80' : 'bg-[#FFF8F0] border-[#FF8A3D]/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-gray-400">Order #{order.orderNumber}</span>
                    <h4 className="font-bold text-sm text-[#1C1C1E]">{order.listingTitle}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{order.merchantName}</p>
                  </div>

                  <Badge variant={isCompleted ? 'success' : 'accent'}>
                    {isCompleted ? 'Completed' : 'Reserved / Ready'}
                  </Badge>
                </div>

                <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" />
                    <span>{order.pickupWindow}</span>
                  </div>

                  {!isCompleted ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-gray-500">Pickup PIN:</span>
                      <span className="px-2.5 py-0.5 bg-white border border-[#FF8A3D] text-[#FF8A3D] font-mono font-black text-sm rounded-lg shadow-xs">
                        {order.pickupCode}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Picked Up
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Modal>
  );
}

