import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { initialListings, initialMerchants, initialOrders, initialNotifications } from '../data/mockData';

const STORAGE_KEY = 'foodlink_demo_store_v2';
const StoreContext = createContext(null);

function loadInitialState() {
  if (typeof window === 'undefined') {
    return {
      listings: initialListings,
      orders: initialOrders,
      notifications: initialNotifications,
      isStoreOpen: true,
      audioAlertsEnabled: true
    };
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.listings)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load local storage state:', err);
  }

  return {
    listings: initialListings,
    orders: initialOrders,
    notifications: initialNotifications,
    isStoreOpen: true,
    audioAlertsEnabled: true
  };
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(loadInitialState);

  // Sync to localStorage
  const saveState = useCallback((newState) => {
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, []);

  // Multi-tab cross-window synchronization
  useEffect(() => {
    const handleStorageEvent = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed && Array.isArray(parsed.listings)) {
            setState(parsed);
          }
        } catch (err) {
          console.warn('Failed parsing cross-tab sync:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  const merchants = initialMerchants;
  const { listings, orders, notifications, isStoreOpen, audioAlertsEnabled } = state;

  // Add a new surplus listing (from Merchant Portal)
  const addListing = useCallback((newListingData) => {
    const original = parseFloat(newListingData.originalPrice) || 0;
    const discounted = parseFloat(newListingData.discountedPrice) || 0;
    const discountPct = original > 0 ? Math.round(((original - discounted) / original) * 100) : 0;

    const newListing = {
      id: `lst-${Date.now()}`,
      merchantId: "m-01",
      merchantName: "CAD Bakery & Cafe",
      title: newListingData.title,
      description: newListingData.description || "Freshly packaged surplus food batch.",
      category: newListingData.category || "Bakery",
      originalPrice: original,
      discountedPrice: discounted,
      discountPercentage: discountPct,
      quantityAvailable: parseInt(newListingData.quantityAvailable, 10) || 1,
      unit: newListingData.unit || "portion",
      pickupStartTime: newListingData.pickupStartTime || "18:30",
      pickupEndTime: newListingData.pickupEndTime || "20:00",
      status: "ACTIVE",
      badge: `${discountPct}% OFF`,
      allergens: newListingData.allergens || ["Gluten"],
      imageUrl: newListingData.imageUrl || "/cad-bakery-logo.png"
    };

    const newNotif = {
      id: `notif-${Date.now()}`,
      title: `CAD Bakery Dropped: ${newListing.title}`,
      message: `New closing deal available at ${newListing.discountPercentage}% OFF!`,
      type: "NEW_LISTING",
      isRead: false,
      timestamp: "Just now"
    };

    setState(prev => {
      const next = {
        ...prev,
        listings: [newListing, ...prev.listings],
        notifications: [newNotif, ...prev.notifications]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });

    return newListing;
  }, []);

  // Update listing stock or fields
  const updateListing = useCallback((id, updates) => {
    setState(prev => {
      const next = {
        ...prev,
        listings: prev.listings.map(l => (l.id === id ? { ...l, ...updates } : l))
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });
  }, []);

  // Customer places an order / reservation
  const createOrder = useCallback((listingId, quantity = 1) => {
    const listing = state.listings.find(l => l.id === listingId);
    if (!listing) throw new Error("Listing not found");

    if (listing.quantityAvailable < quantity) {
      throw new Error("Insufficient stock available");
    }

    const pickupCode = Math.floor(1000 + Math.random() * 9000).toString();
    const orderNumber = `FL-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber,
      listingId: listing.id,
      listingTitle: listing.title,
      merchantId: listing.merchantId,
      merchantName: listing.merchantName,
      quantity,
      totalPrice: Number((listing.discountedPrice * quantity).toFixed(2)),
      pickupCode,
      status: "RESERVED",
      pickupWindow: `${listing.pickupStartTime} - ${listing.pickupEndTime}`,
      createdAt: new Date().toISOString()
    };

    setState(prev => {
      const remaining = listing.quantityAvailable - quantity;
      const updatedListings = prev.listings.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            quantityAvailable: remaining,
            status: remaining <= 0 ? 'SOLD_OUT' : 'ACTIVE'
          };
        }
        return item;
      });

      const next = {
        ...prev,
        listings: updatedListings,
        orders: [newOrder, ...prev.orders]
      };

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });

    return newOrder;
  }, [state.listings]);

  // Merchant verifies pickup code from customer
  const verifyPickup = useCallback((code) => {
    const cleanCode = code ? code.trim() : '';
    const matchingOrder = state.orders.find(
      o => o.pickupCode === cleanCode && (o.status === 'RESERVED' || o.status === 'PENDING')
    );

    if (!matchingOrder) {
      const alreadyCompleted = state.orders.find(
        o => o.pickupCode === cleanCode && o.status === 'COMPLETED'
      );
      if (alreadyCompleted) {
        return {
          success: false,
          message: `Order #${alreadyCompleted.orderNumber} was already verified & picked up.`
        };
      }
      return {
        success: false,
        message: "Invalid or expired pickup PIN. Please check the code."
      };
    }

    const completedTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setState(prev => {
      const next = {
        ...prev,
        orders: prev.orders.map(o => (o.id === matchingOrder.id ? { ...o, status: 'COMPLETED', verifiedAt: completedTime } : o))
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });

    // Broadcast across tabs via BroadcastChannel for real-time customer app reactivity
    if (typeof window !== 'undefined' && window.BroadcastChannel) {
      try {
        const ch = new BroadcastChannel('foodlink_live_channel');
        ch.postMessage({
          type: 'ORDER_VERIFIED',
          code: cleanCode,
          order: { ...matchingOrder, status: 'COMPLETED', verifiedAt: completedTime },
        });
        ch.close();
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

    return {
      success: true,
      message: `Pickup verified! Order #${matchingOrder.orderNumber} is marked completed.`,
      order: { ...matchingOrder, status: 'COMPLETED', verifiedAt: completedTime }
    };
  }, [state.orders]);

  // Store open/closed toggle
  const toggleStoreStatus = useCallback(() => {
    setState(prev => {
      const next = { ...prev, isStoreOpen: !prev.isStoreOpen };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });
  }, []);

  // Audio alerts toggle
  const toggleAudioAlerts = useCallback(() => {
    setState(prev => {
      const next = { ...prev, audioAlertsEnabled: !prev.audioAlertsEnabled };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.warn(err);
      }
      return next;
    });
  }, []);

  // Reset to default demo data
  const resetDemoData = useCallback(() => {
    const fresh = {
      listings: initialListings,
      orders: initialOrders,
      notifications: initialNotifications,
      isStoreOpen: true,
      audioAlertsEnabled: true
    };
    saveState(fresh);
  }, [saveState]);

  // Live KPI metrics
  const metrics = useMemo(() => {
    const cadOrders = orders.filter(o => o.merchantId === 'm-01');
    const totalRev = cadOrders.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const mealsSaved = cadOrders.reduce((acc, curr) => acc + curr.quantity, 0);
    const activeCount = listings.filter(l => l.merchantId === 'm-01' && l.status === 'ACTIVE').length;
    const pendingCount = cadOrders.filter(o => o.status === 'RESERVED').length;

    return {
      todayRevenue: Number(totalRev.toFixed(2)),
      mealsSaved,
      activeListingsCount: activeCount,
      pendingOrdersCount: pendingCount
    };
  }, [orders, listings]);

  return (
    <StoreContext.Provider
      value={{
        merchants,
        listings,
        orders,
        notifications,
        isStoreOpen,
        audioAlertsEnabled,
        toggleStoreStatus,
        toggleAudioAlerts,
        addListing,
        updateListing,
        createOrder,
        verifyPickup,
        resetDemoData,
        metrics
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
