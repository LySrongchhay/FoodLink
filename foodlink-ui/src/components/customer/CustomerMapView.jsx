import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  Search,
  Navigation,
  Plus,
  Minus,
  X,
  Crosshair,
  MapPin,
  Utensils,
  Croissant,
  Salad,
  Coffee,
  Sparkles,
} from 'lucide-react';
import {
  PHNOM_PENH_CENTER,
  SIMULATED_CUSTOMER_LOCATION,
  PHNOM_PENH_STORES,
} from '../../data/phnomPenhStores';
import MapBottomDrawer from './MapBottomDrawer';

const CATEGORIES = [
  { id: 'All', label: 'All Deals' },
  { id: 'Bakery', label: 'Bakery' },
  { id: 'Meals', label: 'Meals' },
  { id: 'Asian', label: 'Asian' },
  { id: 'Italian', label: 'Italian' },
  { id: 'Healthy', label: 'Healthy' },
  { id: 'Drinks', label: 'Drinks' },
];

export default function CustomerMapView({ onSelectListing, onBackToDiscover }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStore, setSelectedStore] = useState(PHNOM_PENH_STORES[0]); // Default focus on CAD Bakery
  const [userLocation, setUserLocation] = useState(SIMULATED_CUSTOMER_LOCATION);
  const [isLocating, setIsLocating] = useState(false);

  // Filter stores based on search query and category
  const filteredStores = PHNOM_PENH_STORES.filter((store) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      store.category === selectedCategory ||
      (selectedCategory === 'Meals' && (store.category === 'Asian' || store.category === 'Italian')) ||
      (selectedCategory === 'Bakery' && store.category === 'Pastry');
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      store.storeName.toLowerCase().includes(query) ||
      store.category.toLowerCase().includes(query) ||
      store.street.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  // 1. Initialize Google Maps Style Leaflet Engine with ResizeObserver
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    // Create Map with Google Maps interaction presets
    const map = L.map(mapContainerRef.current, {
      center: [PHNOM_PENH_CENTER.lat, PHNOM_PENH_CENTER.lng],
      zoom: PHNOM_PENH_CENTER.zoom,
      minZoom: 11,
      maxZoom: 19,
      zoomControl: false, // We build authentic Google Maps control stack
      attributionControl: false,
    });

    // Google Maps Roadmap raster tiles (clean, pale yellow streets, blue Mekong/Tonle Sap rivers, Khmer+English labels)
    const googleRoadmapLayer = L.tileLayer(
      'https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        subdomains: ['0', '1', '2', '3'],
        maxZoom: 20,
        attribution: '&copy; Google Maps',
      }
    );

    // Multi-layer fallback to OpenStreetMap if Google tile requests encounter restrictions
    googleRoadmapLayer.on('tileerror', function () {
      console.warn('[Map Engine] Google tile error detected, falling back to OpenStreetMap standard tiles');
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
    });

    googleRoadmapLayer.addTo(map);

    // Layer group for store markers
    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;

    // Google Maps Style Blue Customer Location Dot with Animated Accuracy Halo
    const userIcon = L.divIcon({
      className: 'custom-map-pin user-location-pin',
      html: `
        <div class="relative flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div class="absolute w-12 h-12 rounded-full bg-blue-500/25 radar-pulse-ring"></div>
          <div class="relative w-4.5 h-4.5 bg-blue-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    const userMarker = L.marker(
      [SIMULATED_CUSTOMER_LOCATION.lat, SIMULATED_CUSTOMER_LOCATION.lng],
      {
        icon: userIcon,
        zIndexOffset: 1000,
      }
    ).addTo(map);

    userMarker.bindTooltip('<b>You are here</b><br>BKK1, Phnom Penh', {
      direction: 'top',
      offset: [0, -12],
      className: 'rounded-lg px-2.5 py-1 text-xs font-sans shadow-md border border-stone-200',
    });

    userMarkerRef.current = userMarker;
    mapInstanceRef.current = map;

    // Self-Healing Lifecycle: ResizeObserver to guarantee map tiles render immediately
    const resizeObserver = new ResizeObserver(() => {
      if (map) {
        map.invalidateSize();
      }
    });
    resizeObserver.observe(mapContainerRef.current);
    resizeObserverRef.current = resizeObserver;

    // Staggered size invalidation passes to prevent 0x0 container race conditions
    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 200);
    setTimeout(() => map.invalidateSize(), 500);

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. Render Google Maps Teardrop Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const map = mapInstanceRef.current;
    const layer = markersLayerRef.current;
    layer.clearLayers();

    filteredStores.forEach((store) => {
      const isSelected = selectedStore?.id === store.id;

      // Category SVG Glyph
      const getCategoryIcon = () => {
        if (store.category === 'Bakery') {
          return `<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        }
        if (store.category === 'Groceries') {
          return `<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`;
        }
        return `<svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>`;
      };

      // Google Maps Teardrop Shape with Foodlink Branding & Discount Tag
      const markerHtml = `
        <div class="relative group cursor-pointer transition-transform duration-200 ${
          isSelected ? 'scale-120 z-50' : 'hover:scale-110'
        }">
          <!-- Floating Discount Badge Tag -->
          <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#FF8A3D] text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow-lg border border-white flex items-center gap-0.5 z-20">
            <span>${store.badgeText || `${store.discountPercentage}% OFF`}</span>
          </div>

          <!-- Authentic Google Maps Teardrop Pin -->
          <div class="relative w-10 h-12 flex items-start justify-center">
            <svg class="w-10 h-12 drop-shadow-md transition-all ${
              isSelected ? 'text-[#2E7D32] filter drop-shadow-[0_4px_8px_rgba(46,125,50,0.5)]' : 'text-[#2E7D32]'
            }" viewBox="0 0 24 30" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 8.25 12 18 12 18s12-9.75 12-18c0-6.627-5.373-12-12-12z" stroke="#ffffff" stroke-width="1.2" />
            </svg>
            
            <!-- Category Icon Centered in Teardrop Head -->
            <div class="absolute top-2 w-6 h-6 flex items-center justify-center">
              ${getCategoryIcon()}
            </div>
          </div>
        </div>
      `;

      const storeIcon = L.divIcon({
        className: 'custom-map-pin',
        html: markerHtml,
        iconSize: [44, 52],
        iconAnchor: [22, 50],
      });

      const marker = L.marker([store.position.lat, store.position.lng], {
        icon: storeIcon,
        riseOnHover: true,
      });

      marker.on('click', () => {
        setSelectedStore(store);
        map.flyTo([store.position.lat, store.position.lng], 16, {
          duration: 0.6,
        });
      });

      marker.addTo(layer);
    });
  }, [filteredStores, selectedStore]);

  // Handle Zoom In
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  // Handle Zoom Out
  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Handle Recenter to Customer / BKK1 via Crosshair Button
  const handleLocateMe = () => {
    setIsLocating(true);
    if (!mapInstanceRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            name: 'Your Current GPS Location',
          };
          setUserLocation(coords);
          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([coords.lat, coords.lng]);
          }
          mapInstanceRef.current.flyTo([coords.lat, coords.lng], 16, {
            duration: 1,
          });
          setIsLocating(false);
        },
        (err) => {
          console.warn('GPS permission denied or unavailable, using BKK1 center:', err);
          mapInstanceRef.current.flyTo(
            [SIMULATED_CUSTOMER_LOCATION.lat, SIMULATED_CUSTOMER_LOCATION.lng],
            16,
            { duration: 1 }
          );
          setIsLocating(false);
        },
        { timeout: 5000 }
      );
    } else {
      mapInstanceRef.current.flyTo(
        [SIMULATED_CUSTOMER_LOCATION.lat, SIMULATED_CUSTOMER_LOCATION.lng],
        16,
        { duration: 1 }
      );
      setIsLocating(false);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-140px)] sm:h-[calc(100vh-120px)] min-h-[500px] rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans select-none bg-[#e5e3df] border border-stone-300">
      
      {/* Top Floating Google Maps Search & Filter Controls */}
      <div className="absolute top-3 inset-x-3 sm:inset-x-4 z-30 flex flex-col gap-2 max-w-md mx-auto pointer-events-none">
        
        {/* Google Maps Search Pill */}
        <div className="relative flex items-center bg-white rounded-full px-4 py-2.5 shadow-xl border border-stone-200/90 pointer-events-auto">
          <Search className="w-4 h-4 shrink-0 text-stone-500 shrink-0" />
          <input
            type="text"
            placeholder="Search Google Maps in Phnom Penh..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-3 pr-6 text-xs sm:text-sm font-medium text-stone-800 placeholder:text-stone-400 outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 shrink-0" />
            </button>
          )}
        </div>

        {/* Google Maps Style Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pointer-events-auto">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-md transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2E7D32] text-white shadow-emerald-900/20'
                    : 'bg-white/95 text-stone-700 hover:bg-white border border-stone-200/90 backdrop-blur-sm'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guaranteed Full-Height Map Container Canvas */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full z-10"
        style={{ width: '100%', height: '100%', minHeight: '500px' }}
      />

      {/* Google Maps Floating Control Stack (Bottom-Right) */}
      <div className="absolute right-3 sm:right-4 bottom-32 sm:bottom-36 z-30 flex flex-col gap-2.5 pointer-events-auto items-end">
        
        {/* Google Circular "My Location" Crosshair Button */}
        <button
          onClick={handleLocateMe}
          className={`w-10 h-10 rounded-full gmap-control-btn flex items-center justify-center cursor-pointer group ${
            isLocating ? 'animate-spin text-blue-600' : 'text-stone-700 hover:text-blue-600'
          }`}
          title="Recenter to My Location (BKK1)"
          aria-label="Recenter on my location"
        >
          <Crosshair className="w-5 h-5 shrink-0 text-stone-600 group-hover:text-blue-600 transition-colors" />
        </button>

        {/* Google Stacked Square Zoom In / Out Buttons */}
        <div className="w-10 rounded-lg gmap-control-btn flex flex-col overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-full h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer border-b border-stone-200"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <Plus className="w-4 h-4 shrink-0 text-stone-700" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-full h-9 flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <Minus className="w-4 h-4 shrink-0 text-stone-700" />
          </button>
        </div>
      </div>

      {/* Google Place Card (Slide-Up Bottom Sheet) */}
      <MapBottomDrawer
        store={selectedStore}
        onClose={() => setSelectedStore(null)}
        onRescueDeal={(listing) => {
          if (onSelectListing) {
            onSelectListing(listing);
          }
        }}
      />
    </div>
  );
}
