import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useStore } from '../../context/StoreContext';
import { Sparkles, PackagePlus } from 'lucide-react';

export default function CreateListingModal({ isOpen, onClose }) {
  const { addListing } = useStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Bakery',
    originalPrice: '6.00',
    discountedPrice: '2.50',
    quantityAvailable: '5',
    unit: 'box (3 pcs)',
    pickupStartTime: '18:30',
    pickupEndTime: '20:00',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
  });

  const orig = parseFloat(formData.originalPrice) || 0;
  const disc = parseFloat(formData.discountedPrice) || 0;
  const discountPct = orig > 0 ? Math.round(((orig - disc) / orig) * 100) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Please enter a listing title.");
      return;
    }
    addListing(formData);
    onClose();
    // Reset defaults
    setFormData({
      title: '',
      description: '',
      category: 'Bakery',
      originalPrice: '6.00',
      discountedPrice: '2.50',
      quantityAvailable: '5',
      unit: 'box (3 pcs)',
      pickupStartTime: '18:30',
      pickupEndTime: '20:00',
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Publish New Surplus Batch" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Surplus Item Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Fresh Brioche & Baguette Surplus Bag"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:border-[#FF8A3D] focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">Description & Ingredients</label>
          <textarea
            rows={2}
            placeholder="e.g. 2 freshly baked baguettes and 3 chocolate brioches baked today."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:border-[#FF8A3D] focus:bg-white focus:outline-hidden"
          />
        </div>

        {/* Pricing & Discount preview */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Original Price ($)</label>
            <input
              type="number"
              step="0.10"
              required
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Surplus Price ($)</label>
            <input
              type="number"
              step="0.10"
              required
              value={formData.discountedPrice}
              onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#2E7D32] focus:outline-hidden"
            />
          </div>
        </div>

        {/* Discount calculation preview tag */}
        <div className="flex items-center justify-between p-2.5 bg-[#FFF8F0] border border-[#FF8A3D]/30 rounded-xl text-xs">
          <span className="text-amber-900 font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FF8A3D]" /> Customer Savings:
          </span>
          <span className="font-extrabold text-[#FF8A3D] text-sm">
            {discountPct}% OFF
          </span>
        </div>

        {/* Quantity & Unit */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Quantity Available</label>
            <input
              type="number"
              min="1"
              required
              value={formData.quantityAvailable}
              onChange={(e) => setFormData({ ...formData, quantityAvailable: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Package Unit</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden"
            />
          </div>
        </div>

        {/* Pickup Times */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Pickup Start</label>
            <input
              type="text"
              value={formData.pickupStartTime}
              onChange={(e) => setFormData({ ...formData, pickupStartTime: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Pickup End</label>
            <input
              type="text"
              value={formData.pickupEndTime}
              onChange={(e) => setFormData({ ...formData, pickupEndTime: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-hidden"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF8A3D] hover:bg-[#E67628] text-white font-bold text-xs shadow-md transition-all active:scale-98"
          >
            <PackagePlus className="w-4 h-4" />
            Publish Surplus Batch
          </button>
        </div>
      </form>
    </Modal>
  );
}

