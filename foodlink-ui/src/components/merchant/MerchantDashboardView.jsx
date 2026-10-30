import React from 'react';
import { DollarSign, UtensilsCrossed, Package, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import Badge from '../common/Badge';

export default function MerchantDashboardView({ onOpenCreate, onOpenVerify }) {
  const { metrics, orders, listings } = useStore();

  const cadOrders = orders.filter(o => o.merchantId === 'm-01');

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Today's Revenue</span>
            <div className="text-2xl font-black text-[#2E7D32] mt-1">
              ${metrics.todayRevenue.toFixed(2)}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" /> via Bakong KHQR
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#2E7D32] flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Meals Saved */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Surplus Food Rescued</span>
            <div className="text-2xl font-black text-[#1C1C1E] mt-1">
              {metrics.mealsSaved} <span className="text-sm font-normal text-gray-500">items</span>
            </div>
            <span className="text-[11px] text-[#FF8A3D] font-semibold mt-1 inline-block">
              Zero food waste mission
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF8A3D] flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
        </div>

        {/* Active Surplus Batches */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Active Listings</span>
            <div className="text-2xl font-black text-[#1C1C1E] mt-1">
              {metrics.activeListingsCount}
            </div>
            <span className="text-[11px] text-gray-500 mt-1 inline-block">
              Available in Customer Feed
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Pickups */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-medium">Pending Pickups</span>
            <div className="text-2xl font-black text-amber-600 mt-1">
              {metrics.pendingOrdersCount}
            </div>
            <span className="text-[11px] text-amber-700 font-semibold mt-1 inline-block">
              Awaiting PIN verification
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quick Action Card */}
      <div className="bg-[#FFF8F0] border border-[#FF8A3D]/30 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-amber-950">Closing Hours Approaching (20:00)</h3>
          <p className="text-xs text-amber-800 mt-0.5">
            Post leftover bread and pastries now to let nearby customers reserve them before closing time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenVerify}
            className="px-4 py-2 bg-white border border-[#2E7D32] text-[#2E7D32] font-bold text-xs rounded-xl hover:bg-emerald-50 transition-colors"
          >
            Verify Pickup PIN
          </button>
          <button
            onClick={onOpenCreate}
            className="px-4 py-2 bg-[#FF8A3D] hover:bg-[#E67628] text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Create Surplus Listing
          </button>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-[#1C1C1E]">Today's Pickup Orders</h3>
          <span className="text-xs text-gray-500 font-medium">{cadOrders.length} total orders</span>
        </div>

        <div className="divide-y divide-gray-100">
          {cadOrders.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-xs font-medium">
              No orders placed yet today.
            </div>
          ) : (
            cadOrders.map((order) => {
              const isCompleted = order.status === 'COMPLETED';
              return (
                <div key={order.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-gray-50/60 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-700">#{order.orderNumber}</span>
                      <Badge variant={isCompleted ? 'success' : 'accent'}>
                        {isCompleted ? 'Completed' : 'Awaiting Pickup'}
                      </Badge>
                    </div>
                    <div className="font-bold text-sm text-[#1C1C1E] mt-1">{order.listingTitle}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                      <span>Qty: <strong>{order.quantity}</strong></span>
                      <span>•</span>
                      <span>Window: {order.pickupWindow}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-[#2E7D32]">${order.totalPrice.toFixed(2)}</div>
                    {!isCompleted ? (
                      <button
                        onClick={onOpenVerify}
                        className="mt-1.5 px-3 py-1 rounded-lg bg-[#2E7D32] text-white text-xs font-bold hover:bg-[#256628] shadow-2xs"
                      >
                        Enter PIN: {order.pickupCode}
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
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

