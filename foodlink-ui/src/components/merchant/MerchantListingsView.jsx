import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Package, Clock, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';

export default function MerchantListingsView({ onOpenCreate }) {
  const { listings } = useStore();
  const cadListings = listings.filter(l => l.merchantId === 'm-01');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-[#1C1C1E]">Cad Bakery Surplus Inventory</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage your daily closing-hour discounts and active surplus stock.
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF8A3D] hover:bg-[#E67628] text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Surplus Batch
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cadListings.map((item) => {
          const isSoldOut = item.quantityAvailable <= 0 || item.status === 'SOLD_OUT';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#FF8A3D] text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-xs">
                    {item.discountPercentage}% OFF
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={isSoldOut ? 'danger' : 'success'}>
                      {isSoldOut ? 'Sold Out' : `${item.quantityAvailable} in stock`}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-bold text-base text-[#1C1C1E]">{item.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-800 bg-[#FFF8F0] px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-[#FF8A3D]" />
                    <span>Pickup: {item.pickupStartTime} - {item.pickupEndTime}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-2 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 line-through mr-1">${item.originalPrice.toFixed(2)}</span>
                  <span className="text-lg font-black text-[#2E7D32]">${item.discountedPrice.toFixed(2)}</span>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  Unit: {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

