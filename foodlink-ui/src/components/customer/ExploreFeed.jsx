import React from 'react';
import ListingCard from './ListingCard';
import { SearchX } from 'lucide-react';

export default function ExploreFeed({ listings, onSelectListing }) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 max-w-md mx-auto my-6 shadow-xs">
        <div className="w-12 h-12 bg-amber-50 text-[#FF8A3D] rounded-full flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-base text-gray-800">No surplus deals found</h4>
        <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
          Try clearing your search query or selecting a different category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          onSelect={onSelectListing}
        />
      ))}
    </div>
  );
}

