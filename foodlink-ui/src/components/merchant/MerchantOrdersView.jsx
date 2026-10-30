import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingCart, CheckCircle2, Clock, Check } from 'lucide-react';
import Badge from '../common/Badge';

export default function MerchantOrdersView({ onOpenVerify }) {
  const { orders } = useStore();
  const [filter, setFilter] = useState('ALL');

  const cadOrders = orders.filter(o => o.merchantId === 'm-01');

  const filtered = cadOrders.filter(o => {
    if (filter === 'RESERVED') return o.status === 'RESERVED';
    if (filter === 'COMPLETED') return o.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-[#1C1C1E]">Customer Pickup Orders</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor incoming reservations and complete fulfillment upon customer pickup.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
          {['ALL', 'RESERVED', 'COMPLETED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filter === f
                  ? 'bg-white text-[#1C1C1E] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {f === 'ALL' ? 'All Orders' : f === 'RESERVED' ? 'Awaiting Pickup' : 'Completed'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table / Cards */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
        <div className="divide-y divide-gray-100">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs font-medium">
              No orders found for this status.
            </div>
          ) : (
            filtered.map((order) => {
              const isCompleted = order.status === 'COMPLETED';
              return (
                <div key={order.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors">
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-800">#{order.orderNumber}</span>
                      <Badge variant={isCompleted ? 'success' : 'accent'}>
                        {isCompleted ? 'Completed' : 'Awaiting Pickup'}
                      </Badge>
                      <span className="text-[11px] text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-[#1C1C1E] mt-1">{order.listingTitle}</h4>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>Quantity: <strong className="text-gray-800">{order.quantity}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" /> {order.pickupWindow}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-base font-black text-[#2E7D32]">
                        ${order.totalPrice.toFixed(2)}
                      </div>
                      <div className="text-[11px] text-gray-400">Paid via KHQR</div>
                    </div>

                    {!isCompleted ? (
                      <button
                        onClick={() => onOpenVerify(order.pickupCode)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#256628] text-white text-xs font-bold shadow-xs transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Verify Code ({order.pickupCode})
                      </button>
                    ) : (
                      <div className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                        Fulfilled
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

