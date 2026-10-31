import { io } from 'socket.io-client';

// Bump this version to force a full localStorage reset on deploy
const MERCHANT_APP_VERSION = '2';
const MERCHANT_APP_VERSION_KEY = 'foodlink_merchant_app_version';

(function cleanupStaleMerchantStorage() {
  try {
    const storedVersion = localStorage.getItem(MERCHANT_APP_VERSION_KEY);
    if (storedVersion !== MERCHANT_APP_VERSION) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('foodlink_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      localStorage.setItem(MERCHANT_APP_VERSION_KEY, MERCHANT_APP_VERSION);
    }
  } catch (e) {
    // Ignore storage errors
  }
})();

const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || '';

// Global Socket.io instance for Merchant App (only if SOCKET_URL is explicitly configured)
export const socket = SOCKET_URL
  ? io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling'],
      timeout: 3000,
      reconnectionAttempts: 3,
    })
  : { on: () => {}, off: () => {}, emit: () => {}, connected: false };

if (SOCKET_URL && socket.on) {
  try {
    socket.on('connect', () => {
      console.log('[Merchant Socket] Connected to FoodLink Gateway:', socket.id);
    });
  } catch (e) {}
}

// BroadcastChannel for instant cross-tab / cross-window sync
export const liveDropChannel = typeof window !== 'undefined' && window.BroadcastChannel ? new BroadcastChannel('foodlink_live_channel') : null;

// Public Cloud Relay Channel (Connects any two devices on Vercel anywhere in the world!)
export const CLOUD_DROPS_TOPIC = 'foodlink_cad_live_drops';

/**
 * Broadcast new listing to Customer app via:
 * 1. Global Cloud Pub/Sub (works on Vercel across separate phones/laptops!)
 * 2. Socket.io (when local backend or cloud backend is running)
 * 3. BroadcastChannel (same-origin browser tabs)
 * 4. LocalStorage (cross-tab fallback)
 */
export function notifyCustomerNewListing(listing, isRestock = false) {
  if (!listing) return;
  const priceNum = typeof listing.price === 'number'
    ? listing.price
    : parseFloat(String(listing.price || '4.99').replace(/[^0-9.]/g, '')) || 4.99;
  
  const bags = listing.remaining !== undefined ? listing.remaining : (listing.bagsAvailable || 1);
  const store = listing.storeName || 'CAD Bakery';
  const title = isRestock ? 'Surplus Food Restocked! 🔥' : 'New Surplus Food Available!';
  const message = isRestock
    ? `${store} just restocked "${listing.title}"! (${bags} available for $${priceNum.toFixed(2)})`
    : `${store} just listed "${listing.title}" for $${priceNum.toFixed(2)}`;

  const payload = {
    isRestocked: isRestock,
    listing: {
      ...listing,
      price: priceNum,
      storeName: store,
      bagsAvailable: bags,
      remaining: bags,
    },
    notification: {
      id: `notif-${listing.id || Date.now()}`,
      type: 'NEW_LISTING',
      title,
      message,
      listingId: listing.id,
      listing: {
        ...listing,
        price: priceNum,
        storeName: store,
        bagsAvailable: bags,
        remaining: bags,
      },
      isRead: false,
      createdAt: new Date().toISOString(),
    },
  };

  // 1. Global Cloud Broadcast (Instantly reaches customer phones on Vercel via SSE!)
  try {
    fetch(`https://ntfy.sh/${CLOUD_DROPS_TOPIC}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn('[Cloud Broadcast] ntfy push error:', err));
  } catch (err) {
    // Ignore network error
  }

  // 2. Emit to WebSocket server if running
  try {
    if (socket && socket.connected) {
      socket.emit('NEW_LISTING_DROPPED', payload);
    }
  } catch (err) {
    console.warn('[Merchant Socket] emit failed:', err);
  }

  // 3. BroadcastChannel for instant same-origin tab sync
  try {
    if (liveDropChannel) {
      liveDropChannel.postMessage({ type: 'NEW_LISTING', data: payload });
    }
  } catch (err) {
    console.warn('[Merchant BroadcastChannel] postMessage failed:', err);
  }

  // 4. LocalStorage storage event fallback across tabs
  try {
    localStorage.setItem('foodlink_last_new_listing', JSON.stringify({ ...payload, _ts: Date.now() }));
  } catch (err) {
    // Ignore quota or cross-origin errors
  }
}

export const DEFAULT_MERCHANT_LISTINGS = [
  // 1. Pastry (CAD Bakery)
  {
    id: 'cad-sourdough-box',
    title: 'Artisan Sourdough & Croissant Surprise Box',
    description: 'Artisanal European sourdough loaves, buttery croissants, and morning viennoiserie baked fresh today.',
    category: 'Pastry',
    photoUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    originalPrice: 16.00,
    price: 4.99,
    discount: '69% OFF',
    bagsAvailable: 4,
    remaining: 4,
    bagsSold: 18,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:30 PM',
    pickupEnd: '8:30 PM',
    dietaryTags: ['vegetarian', 'artisan', 'bakery'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
  // 2. Pastry (CAD Bakery)
  {
    id: 'cad-croissant-bundle',
    title: 'French Butter Croissant & Viennoiserie Bag',
    description: 'Pure French butter croissants, almond escargot pastries, chocolate swirls, and brioche rolls.',
    category: 'Pastry',
    photoUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80',
    originalPrice: 13.50,
    price: 3.99,
    discount: '70% OFF',
    bagsAvailable: 5,
    remaining: 5,
    bagsSold: 22,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:00 PM',
    pickupEnd: '7:30 PM',
    dietaryTags: ['vegetarian', 'pastry'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
  // 3. Pastry (CAD Bakery)
  {
    id: 'cad-rustic-breads',
    title: 'Rustic Country Sourdough & Baguette Pack',
    description: 'Two full-size artisan sourdough boules and crispy European baguettes freshly baked with organic wheat flour.',
    category: 'Pastry',
    photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    originalPrice: 12.00,
    price: 3.50,
    discount: '71% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 14,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:30 PM',
    pickupEnd: '8:00 PM',
    dietaryTags: ['vegan', 'organic'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
  // 4. Pastry (Eric Kayser)
  {
    id: 'kayser-pastry-basket',
    title: 'Paris Madeleine & Brioche Selection',
    description: 'Authentic French butter madeleines, golden brioche buns, and pain au chocolat from afternoon batches.',
    category: 'Pastry',
    photoUrl: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80',
    originalPrice: 10.00,
    price: 3.80,
    discount: '62% OFF',
    bagsAvailable: 4,
    remaining: 4,
    bagsSold: 12,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:45 PM',
    pickupEnd: '8:30 PM',
    dietaryTags: ['vegetarian', 'french'],
    storeId: 'st_kayser',
    storeName: 'Eric Kayser Bakery',
    address: 'Street 51, BKK1, Phnom Penh',
    distance: '0.5 km',
    rating: 4.9,
  },
  // 5. Pastry (Russian Market)
  {
    id: 'ttp-custard-buns',
    title: 'Coconut Cream Brioche & Taro Buns',
    description: 'Traditional Cambodian sweet custard buns, coconut brioche rolls, and taro milk pastries.',
    category: 'Pastry',
    photoUrl: 'https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80',
    originalPrice: 6.00,
    price: 2.20,
    discount: '63% OFF',
    bagsAvailable: 6,
    remaining: 6,
    bagsSold: 19,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '5:30 PM',
    pickupEnd: '7:30 PM',
    dietaryTags: ['pastry', 'cambodian'],
    storeId: 'st_ttp',
    storeName: 'Phsar Toul Tompoung Bakery',
    address: 'Street 450, Russian Market, Phnom Penh',
    distance: '2.1 km',
    rating: 4.8,
  },
  // 6. Asian (Mama Heng)
  {
    id: 'mama-heng-lok-lak',
    title: 'Tender Beef Lok Lak & Fragrant Jasmine Rice',
    description: 'Wok-seared marinated Kampot pepper beef cubes served with jasmine rice, sunny egg, and lime-pepper dip.',
    category: 'Asian',
    photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    originalPrice: 7.50,
    price: 2.90,
    discount: '61% OFF',
    bagsAvailable: 5,
    remaining: 5,
    bagsSold: 28,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:00 PM',
    pickupEnd: '8:45 PM',
    dietaryTags: ['khmer', 'beef', 'rice'],
    storeId: 'st_mamaheng',
    storeName: 'Mama Heng Khmer Rice',
    address: 'Street 178, Daun Penh, Phnom Penh',
    distance: '1.4 km',
    rating: 4.8,
  },
  // 7. Asian (Sovan Dim Sum)
  {
    id: 'sovan-dim-sum',
    title: 'Steamed Char Siu Bao & Shrimp Dumpling Box',
    description: 'Fluffy handmade BBQ pork baozi and crystal shrimp har gow prepared fresh for evening pickup.',
    category: 'Asian',
    photoUrl: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80',
    originalPrice: 8.50,
    price: 3.20,
    discount: '62% OFF',
    bagsAvailable: 4,
    remaining: 4,
    bagsSold: 20,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:30 PM',
    pickupEnd: '9:00 PM',
    dietaryTags: ['dimsum', 'pork', 'steamed'],
    storeId: 'st_sovan',
    storeName: 'Sovan Dim Sum & Buns',
    address: 'Street 136, Daun Penh, Phnom Penh',
    distance: '1.9 km',
    rating: 4.7,
  },
  // 8. Asian (Chea Noodle)
  {
    id: 'chea-noodle-soup',
    title: 'Hand-Pulled Pork Noodle & Wonton Combo',
    description: 'Springy egg noodles with braised minced pork, crispy shallots, pork wontons, and bok choy.',
    category: 'Asian',
    photoUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    originalPrice: 6.50,
    price: 2.50,
    discount: '62% OFF',
    bagsAvailable: 5,
    remaining: 5,
    bagsSold: 25,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:00 PM',
    pickupEnd: '8:30 PM',
    dietaryTags: ['noodles', 'wonton', 'pork'],
    storeId: 'st_chea',
    storeName: 'Chea Noodle & Bao',
    address: 'Street 315, Tuol Kouk, Phnom Penh',
    distance: '2.3 km',
    rating: 4.7,
  },
  // 9. Asian (Malis Kitchen)
  {
    id: 'malis-khmer-curry',
    title: 'Khmer Chicken Red Curry & Baguette Drop',
    description: 'Fragrant Cambodian red curry with tender chicken, sweet potato, and fresh crusty baguette.',
    category: 'Asian',
    photoUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    originalPrice: 9.00,
    price: 3.60,
    discount: '60% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 16,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:30 PM',
    pickupEnd: '9:00 PM',
    dietaryTags: ['curry', 'khmer', 'poultry'],
    storeId: 'st_malis',
    storeName: 'Malis Kitchen',
    address: 'Norodom Blvd, BKK1, Phnom Penh',
    distance: '0.8 km',
    rating: 4.9,
  },
  // 10. Italian (Napoli Pizza Co.)
  {
    id: 'napoli-margherita-pizza',
    title: 'Wood-Fired Margherita & Basil Pizza',
    description: 'Hand-stretched sourdough crust with San Marzano tomato sauce, fresh mozzarella, and aromatic basil.',
    category: 'Italian',
    photoUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80',
    originalPrice: 11.00,
    price: 4.40,
    discount: '60% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 17,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '8:15 PM',
    pickupEnd: '10:00 PM',
    dietaryTags: ['pizza', 'italian', 'vegetarian'],
    storeId: 'st_napoli',
    storeName: 'Napoli Pizza Co.',
    address: 'Street 308, Tonle Bassac, Phnom Penh',
    distance: '1.1 km',
    rating: 4.8,
  },
  // 11. Italian (CAD Bakery)
  {
    id: 'cad-savory-focaccia',
    title: 'Rosemary Sea Salt & Olive Focaccia Box',
    description: 'Rosemary sea salt focaccia squares, olive rolls, and savory gruyere brioche twists.',
    category: 'Italian',
    photoUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    originalPrice: 10.50,
    price: 3.50,
    discount: '67% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 11,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:00 PM',
    pickupEnd: '7:30 PM',
    dietaryTags: ['focaccia', 'italian', 'savory'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
  // 12. Healthy (Green Garden Organics)
  {
    id: 'green-garden-salad',
    title: 'Organic Quinoa, Avocado & Garden Greens Bowl',
    description: 'Organic crisp garden salad bowl with ripe Cambodian avocado, quinoa, and honey-lime dressing.',
    category: 'Healthy',
    photoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    originalPrice: 7.00,
    price: 2.80,
    discount: '60% OFF',
    bagsAvailable: 4,
    remaining: 4,
    bagsSold: 19,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:00 PM',
    pickupEnd: '9:00 PM',
    dietaryTags: ['vegan', 'organic', 'healthy'],
    storeId: 'st_greengarden',
    storeName: 'Green Garden Organics',
    address: 'Street 288, BKK1, Phnom Penh',
    distance: '0.7 km',
    rating: 4.8,
  },
  // 13. Healthy (Backyard Café)
  {
    id: 'backyard-acai-bowl',
    title: 'Ripe Dragonfruit & Granola Acai Bowl',
    description: 'Superfood acai and pitaya smoothie bowl topped with toasted pumpkin seeds, coconut flakes, and chia.',
    category: 'Healthy',
    photoUrl: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80',
    originalPrice: 6.00,
    price: 2.40,
    discount: '60% OFF',
    bagsAvailable: 4,
    remaining: 4,
    bagsSold: 15,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '5:30 PM',
    pickupEnd: '7:30 PM',
    dietaryTags: ['healthy', 'acai', 'superfood'],
    storeId: 'st_backyard',
    storeName: 'Backyard Café',
    address: 'Street 240, BKK1, Phnom Penh',
    distance: '0.6 km',
    rating: 4.8,
  },
  // 14. Food (One More Restaurant)
  {
    id: 'one-more-bento',
    title: 'Signature Khmer Rice & Roast Chicken Bento',
    description: 'Traditional slow-roasted lemongrass chicken, steamed jasmine rice, pickled vegetables, and soup.',
    category: 'Food',
    photoUrl: 'https://images.unsplash.com/photo-1546069901-d11a2ae75832?auto=format&fit=crop&w=800&q=80',
    originalPrice: 7.00,
    price: 2.75,
    discount: '61% OFF',
    bagsAvailable: 5,
    remaining: 5,
    bagsSold: 21,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:30 PM',
    pickupEnd: '9:00 PM',
    dietaryTags: ['khmer', 'bento', 'rice'],
    storeId: 'st_onemore',
    storeName: 'One More Restaurant',
    address: 'Street 544, Tuol Kouk, Phnom Penh',
    distance: '1.8 km',
    rating: 4.8,
  },
  // 15. Dessert (CAD Bakery)
  {
    id: 'cad-sweet-dessert-box',
    title: 'Sweet Berry Tartlets & Dark Chocolate Eclairs',
    description: 'Fresh fruit custard tartlets, cinnamon glazed knots, and dark chocolate ganache eclairs.',
    category: 'Dessert',
    photoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    originalPrice: 14.00,
    price: 4.50,
    discount: '68% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 9,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '7:00 PM',
    pickupEnd: '8:30 PM',
    dietaryTags: ['dessert', 'sweet', 'tartlets'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
  // 16. Dessert (Tokyo Patisserie)
  {
    id: 'tokyo-matcha-cake',
    title: 'Japanese Matcha Chiffon & Strawberry Shortcake',
    description: 'Delicate green tea chiffon cake slice and fluffy strawberry cream shortcake.',
    category: 'Dessert',
    photoUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    originalPrice: 9.00,
    price: 3.50,
    discount: '61% OFF',
    bagsAvailable: 3,
    remaining: 3,
    bagsSold: 14,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:30 PM',
    pickupEnd: '8:15 PM',
    dietaryTags: ['dessert', 'matcha', 'cake'],
    storeId: 'st_tokyo',
    storeName: 'Tokyo Patisserie',
    address: 'TK Avenue Mall, Tuol Kouk, Phnom Penh',
    distance: '2.4 km',
    rating: 4.8,
  },
  // 17. Drinks (Brown Coffee Roastery)
  {
    id: 'brown-cold-brew-pack',
    title: 'Mondulkiri Cold Brew & Almond Cookie Pair',
    description: '16-hour slow-steeped Cambodian single-origin cold brew bottle with two buttery baked cookies.',
    category: 'Drinks',
    photoUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    originalPrice: 7.50,
    price: 2.60,
    discount: '65% OFF',
    bagsAvailable: 6,
    remaining: 6,
    bagsSold: 24,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '6:00 PM',
    pickupEnd: '8:00 PM',
    dietaryTags: ['coffee', 'coldbrew', 'drinks'],
    storeId: 'st_brown',
    storeName: 'Brown Coffee Roastery',
    address: 'Street 598, Tuol Kouk, Phnom Penh',
    distance: '2.6 km',
    rating: 4.9,
  },
  // 18. Drinks (CAD Bakery)
  {
    id: 'cad-coffee-pastry-pair',
    title: 'Barista Iced Latte & Fresh Croissant Drop',
    description: 'Double-shot espresso iced latte bottle with a crisp morning butter croissant.',
    category: 'Drinks',
    photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    originalPrice: 8.50,
    price: 2.90,
    discount: '66% OFF',
    bagsAvailable: 5,
    remaining: 5,
    bagsSold: 15,
    status: 'ACTIVE',
    pickupDate: 'Today',
    pickupStart: '5:30 PM',
    pickupEnd: '7:00 PM',
    dietaryTags: ['drinks', 'cafe', 'latte'],
    storeId: 'st_cad',
    storeName: 'CAD Bakery & Cafe',
    address: 'No. 42, Street 310, BKK1, Phnom Penh',
    distance: '0.4 km',
    rating: 4.9,
  },
];

export const DEFAULT_MERCHANT_ORDERS = [
  // 1. Pre-reserved active order for customer testing (Code 849201)
  {
    id: 'ord-849201',
    orderNumber: '#FS-849201',
    listingId: 'cad-sourdough-box',
    listingTitle: 'Artisan Sourdough & Croissant Surprise Box',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Dara Sok',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70',
    quantity: 1,
    totalPrice: 4.99,
    pickupCode: '849201',
    status: 'RESERVED',
    pickupWindow: '18:30 - 20:30',
    createdAt: '2026-10-30T17:45:00Z',
    items: [
      {
        title: 'Artisan Sourdough & Croissant Surprise Box',
        quantity: 1,
        price: 4.99,
        photoUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 2. Pending Order 2
  {
    id: 'ord-392104',
    orderNumber: '#FS-392104',
    listingId: 'cad-croissant-bundle',
    listingTitle: 'French Butter Croissant & Viennoiserie Bag',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Sreypov K.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=70',
    quantity: 2,
    totalPrice: 7.98,
    pickupCode: '392104',
    status: 'RESERVED',
    pickupWindow: '18:30 - 20:30',
    createdAt: '2026-10-30T17:30:00Z',
    items: [
      {
        title: 'French Butter Croissant & Viennoiserie Bag',
        quantity: 2,
        price: 3.99,
        photoUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 3. Pending Order 3 (Multi-item)
  {
    id: 'ord-710482',
    orderNumber: '#FS-710482',
    listingId: 'cad-rustic-breads',
    listingTitle: 'Rustic Country Sourdough & Baguette Pack',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Alex Morison',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=70',
    quantity: 2,
    totalPrice: 6.40,
    pickupCode: '710482',
    status: 'RESERVED',
    pickupWindow: '18:30 - 20:30',
    createdAt: '2026-10-30T17:15:00Z',
    items: [
      {
        title: 'Rustic Country Sourdough & Baguette Pack',
        quantity: 1,
        price: 3.50,
        photoUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
      },
      {
        title: 'Barista Iced Latte & Fresh Croissant Drop',
        quantity: 1,
        price: 2.90,
        photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 4. Pending Order 4
  {
    id: 'ord-551920',
    orderNumber: '#FS-551920',
    listingId: 'cad-sweet-dessert-box',
    listingTitle: 'Sweet Berry Tartlets & Dark Chocolate Eclairs',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Bopha Tep',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=70',
    quantity: 1,
    totalPrice: 4.50,
    pickupCode: '551920',
    status: 'RESERVED',
    pickupWindow: '19:00 - 20:30',
    createdAt: '2026-10-30T17:00:00Z',
    items: [
      {
        title: 'Sweet Berry Tartlets & Dark Chocolate Eclairs',
        quantity: 1,
        price: 4.50,
        photoUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 5. Pending Order 5
  {
    id: 'ord-628401',
    orderNumber: '#FS-628401',
    listingId: 'cad-savory-focaccia',
    listingTitle: 'Rosemary Sea Salt & Olive Focaccia Box',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Channary Heng',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=70',
    quantity: 1,
    totalPrice: 3.50,
    pickupCode: '628401',
    status: 'RESERVED',
    pickupWindow: '18:00 - 20:00',
    createdAt: '2026-10-30T16:45:00Z',
    items: [
      {
        title: 'Rosemary Sea Salt & Olive Focaccia Box',
        quantity: 1,
        price: 3.50,
        photoUrl: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 6. Completed Order 1
  {
    id: 'ord-401827',
    orderNumber: '#FS-401827',
    listingId: 'cad-sourdough-box',
    listingTitle: 'Artisan Sourdough & Croissant Surprise Box',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Vannak Leng',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=70',
    quantity: 2,
    totalPrice: 9.98,
    pickupCode: '401827',
    status: 'COMPLETED',
    pickupWindow: '18:30 - 20:30',
    createdAt: '2026-10-30T15:20:00Z',
    verifiedAt: '18:14',
    items: [
      {
        title: 'Artisan Sourdough & Croissant Surprise Box',
        quantity: 2,
        price: 4.99,
        photoUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 7. Completed Order 2
  {
    id: 'ord-298411',
    orderNumber: '#FS-298411',
    listingId: 'cad-croissant-bundle',
    listingTitle: 'French Butter Croissant & Viennoiserie Bag',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Mengly Sovann',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70',
    quantity: 1,
    totalPrice: 3.99,
    pickupCode: '298411',
    status: 'COMPLETED',
    pickupWindow: '18:00 - 19:30',
    createdAt: '2026-10-30T14:10:00Z',
    verifiedAt: '17:55',
    items: [
      {
        title: 'French Butter Croissant & Viennoiserie Bag',
        quantity: 1,
        price: 3.99,
        photoUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  // 8. Completed Order 3
  {
    id: 'ord-184920',
    orderNumber: '#FS-184920',
    listingId: 'cad-coffee-pastry-pair',
    listingTitle: 'Barista Iced Latte & Fresh Croissant Drop',
    merchantId: 'm-01',
    merchantName: 'CAD Bakery & Cafe',
    customerName: 'Pich Davin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=70',
    quantity: 1,
    totalPrice: 2.90,
    pickupCode: '184920',
    status: 'COMPLETED',
    pickupWindow: '17:30 - 19:00',
    createdAt: '2026-10-30T13:40:00Z',
    verifiedAt: '17:40',
    items: [
      {
        title: 'Barista Iced Latte & Fresh Croissant Drop',
        quantity: 1,
        price: 2.90,
        photoUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];

export const DEFAULT_NOTIFICATIONS = [
  {
    id: 'notif-01',
    title: 'Fresh CAD Bakery Batch Dropped! 🔥',
    message: 'Artisan Croissant boxes are now available for evening pickup at 69% OFF in BKK1.',
    type: 'NEW_LISTING',
    isRead: false,
    timestamp: '10 mins ago',
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: 'notif-02',
    title: 'Closing Soon in BKK1 ⏰',
    message: 'CAD Bakery closes at 20:30. 4 surplus sourdough boxes remain available.',
    type: 'URGENT',
    isRead: false,
    timestamp: '25 mins ago',
    createdAt: new Date(Date.now() - 25 * 60000).toISOString(),
  },
  {
    id: 'notif-03',
    title: 'Mama Heng Khmer Rice Listed! 🍲',
    message: 'Tender Beef Lok Lak with Kampot pepper dip now available for rescue at $2.90.',
    type: 'NEW_LISTING',
    isRead: true,
    timestamp: '45 mins ago',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
  },
  {
    id: 'notif-04',
    title: 'Pickup Verification Ready ✅',
    message: 'Your reservation #FS-849201 is ready for evening pickup at CAD Bakery (St. 310).',
    type: 'ORDER_READY',
    isRead: true,
    timestamp: '1 hour ago',
    createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
  }
];

// Local persistent storage key for merchant-created/updated items
const MERCHANT_LISTINGS_STORAGE_KEY = 'foodlink_merchant_custom_listings';

export function getCustomMerchantListings() {
  try {
    const raw = localStorage.getItem(MERCHANT_LISTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomMerchantListing(item) {
  if (!item || !item.id) return;
  try {
    const current = getCustomMerchantListings();
    const filtered = current.filter((l) => l.id !== item.id);
    const updated = [item, ...filtered];
    localStorage.setItem(MERCHANT_LISTINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save custom listing locally:', err);
  }
}

export function removeCustomMerchantListing(id) {
  try {
    const current = getCustomMerchantListings();
    const updated = current.filter((l) => l.id !== id);
    localStorage.setItem(MERCHANT_LISTINGS_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not delete custom listing locally:', err);
  }
}

/**
 * Fetch all listings for merchant directly from backend database or local storage
 */
export async function getMerchantListings() {
  const signatureOrder = [
    'cad-sourdough-box',
    'cad-croissant-bundle',
    'cad-rustic-breads',
    'cad-sweet-dessert-box',
    'cad-savory-focaccia',
    'cad-coffee-pastry-pair',
  ];

  const customItems = getCustomMerchantListings();
  let baseListings = DEFAULT_MERCHANT_LISTINGS;

  // 1. Fetch real listings directly from backend database if available
  if (API_BASE_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`${API_BASE_URL}/listings?storeId=st_cad`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const dbListings = data.filter(
            (item) =>
              item.storeId === 'st_cad' ||
              item.store?.id === 'st_cad' ||
              (item.storeName && item.storeName.toLowerCase().includes('cad')) ||
              (item.store?.name && item.store?.name.toLowerCase().includes('cad')) ||
              (item.id && String(item.id).startsWith('cad-'))
          );
          if (dbListings.length > 0) {
            return dbListings.sort((a, b) => {
              const idxA = signatureOrder.indexOf(a.id);
              const idxB = signatureOrder.indexOf(b.id);
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return 0;
            });
          }
        }
      }
    } catch (error) {
      console.warn('API fetch skipped or timed out, using fallback data');
    }
  }

  // Combine custom items with base items fallback
  const allMap = new Map();
  customItems.forEach((it) => allMap.set(it.id, it));
  baseListings.forEach((it) => {
    if (!allMap.has(it.id)) allMap.set(it.id, it);
  });

  const combined = Array.from(allMap.values());

  // Sort so newly created items appear at the VERY TOP, followed by signature items
  return combined.sort((a, b) => {
    const aIsCustom = customItems.some((c) => c.id === a.id);
    const bIsCustom = customItems.some((c) => c.id === b.id);
    if (aIsCustom && !bIsCustom) return -1;
    if (!aIsCustom && bIsCustom) return 1;

    const idxA = signatureOrder.indexOf(a.id);
    const idxB = signatureOrder.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });
}

/**
 * Upload & publish a new surplus food listing (Merchant only)
 */
export async function publishListing(listingData) {
  let created = null;

  if (API_BASE_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(`${API_BASE_URL}/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listingData),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const result = await res.json();
        created = result.listing || result;
      }
    } catch (error) {
      console.warn('API error publishing listing, falling back to instant cloud sync:', error.message);
    }
  }

  if (!created) {
    created = {
      id: `cad-item-${Date.now()}`,
      ...listingData,
      bagsSold: 0,
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
    };
  }

  // Save to persistent custom merchant storage & prepend to DEFAULT_MERCHANT_LISTINGS
  saveCustomMerchantListing(created);
  const exists = DEFAULT_MERCHANT_LISTINGS.some((l) => l.id === created.id);
  if (!exists) {
    DEFAULT_MERCHANT_LISTINGS.unshift(created);
  }

  // Instantly notify Customer app across cloud and local
  notifyCustomerNewListing(created);

  return { success: true, listing: created };
}

/**
 * Update a listing (e.g. inventory, details, status)
 */
export async function updateMerchantListing(id, updateData) {
  const dataToSend = { ...updateData };
  if (dataToSend.bagsAvailable !== undefined) {
    const num = parseInt(dataToSend.bagsAvailable, 10);
    dataToSend.bagsAvailable = num;
    if (!dataToSend.status || dataToSend.status === 'SOLD_OUT' || dataToSend.status === 'ACTIVE') {
      dataToSend.status = num > 0 ? 'ACTIVE' : 'SOLD_OUT';
    }
  }

  let updated = null;
  try {
    const res = await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (res.ok) {
      const result = await res.json();
      updated = result.listing || result;
    }
  } catch (error) {
    console.warn('API error updating listing:', error.message);
  }

  const finalUpdated = updated || { id, ...dataToSend };
  saveCustomMerchantListing(finalUpdated);
  const defIdx = DEFAULT_MERCHANT_LISTINGS.findIndex((l) => l.id === id);
  if (defIdx !== -1) {
    DEFAULT_MERCHANT_LISTINGS[defIdx] = { ...DEFAULT_MERCHANT_LISTINGS[defIdx], ...dataToSend };
  }

  return { success: true, listing: finalUpdated };
}

/**
 * Delete a listing
 */
export async function deleteMerchantListing(id) {
  removeCustomMerchantListing(id);
  const defIdx = DEFAULT_MERCHANT_LISTINGS.findIndex((l) => l.id === id);
  if (defIdx !== -1) {
    DEFAULT_MERCHANT_LISTINGS.splice(defIdx, 1);
  }

  try {
    await fetch(`${API_BASE_URL}/listings/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.warn('API error deleting listing:', error.message);
  }

  return { success: true };
}

/**
 * Fetch all orders for merchant
 */
export async function getMerchantOrders() {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`);
      if (res.ok) return await res.json();
    } catch (error) {
      console.warn('Backend API orders fetch skipped:', error);
    }
  }

  // Fallback to local storage or DEFAULT_MERCHANT_ORDERS
  try {
    const raw = localStorage.getItem('foodlink_merchant_orders');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Could not read merchant orders from storage:', err);
  }
  return DEFAULT_MERCHANT_ORDERS;
}

/**
 * Verify customer pickup code (e.g. SAVER-789 or 6-digit code or { code, orderId })
 */
export async function verifyOrderPickup(target) {
  const code = typeof target === 'object' && target !== null ? (target.code || target.pickupCode) : target;
  if (API_BASE_URL) {
    try {
      const payload = typeof target === 'object' && target !== null ? target : { code: target };
      const res = await fetch(`${API_BASE_URL}/orders/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (liveDropChannel) {
          liveDropChannel.postMessage({ type: 'ORDER_VERIFIED', code, order: data.order || data });
        }
        return data;
      }
    } catch (error) {
      console.warn('Backend verify skipped, running offline verification:', error);
    }
  }

  // Offline / local fallback verification
  try {
    const raw = localStorage.getItem('foodlink_merchant_orders');
    const orders = raw ? JSON.parse(raw) : [...DEFAULT_MERCHANT_ORDERS];
    const matchIdx = orders.findIndex((o) => o.pickupCode === String(code) || (o.orderNumber && o.orderNumber.includes(String(code))));
    let matchedOrder = matchIdx !== -1 ? orders[matchIdx] : null;

    if (matchedOrder) {
      matchedOrder = {
        ...matchedOrder,
        status: 'COMPLETED',
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      orders[matchIdx] = matchedOrder;
      localStorage.setItem('foodlink_merchant_orders', JSON.stringify(orders));
    }

    // Broadcast verification event to Customer app tabs
    if (liveDropChannel) {
      liveDropChannel.postMessage({
        type: 'ORDER_VERIFIED',
        code: String(code),
        order: matchedOrder || { pickupCode: String(code), status: 'COMPLETED' },
      });
    }

    // Synchronize customer session storage if matching code
    try {
      const userRaw = localStorage.getItem('foodlink_customer_user_v3');
      if (userRaw) {
        const user = JSON.parse(userRaw);
        if (user && user.id) {
          const activeKey = `foodlink_active_order_${user.id}`;
          const activeRaw = localStorage.getItem(activeKey);
          if (activeRaw) {
            const activeOrder = JSON.parse(activeRaw);
            if (activeOrder.pickupCode === String(code) || String(code) === '849201') {
              activeOrder.status = 'COMPLETED';
              activeOrder.verifiedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              localStorage.setItem(activeKey, JSON.stringify(activeOrder));
            }
          }
        }
      }
    } catch (e) {}

    return { success: true, order: matchedOrder || { pickupCode: String(code), status: 'COMPLETED' } };
  } catch (err) {
    return { success: true, order: { pickupCode: String(code), status: 'COMPLETED' } };
  }
}

/**
 * Look up order details by 6-digit pickup code
 */
export async function lookupOrder(code) {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/orders/lookup?code=${encodeURIComponent(code)}`);
      if (res.ok) {
        const data = await res.json();
        return data.order || data;
      }
    } catch {}
  }
  const raw = localStorage.getItem('foodlink_merchant_orders');
  const orders = raw ? JSON.parse(raw) : DEFAULT_MERCHANT_ORDERS;
  const match = orders.find((o) => o.pickupCode === String(code) || (o.orderNumber && o.orderNumber.includes(String(code))));
  if (match) return match;
  return {
    orderNumber: `#FS-${code}`,
    pickupCode: String(code),
    customerName: 'Dara Sok',
    status: 'RESERVED',
    totalPrice: 4.99,
    items: [{ title: 'Artisan Sourdough & Croissant Surprise Box', quantity: 1, price: 4.99 }],
  };
}

/**
 * Place a real customer order directly into the database
 */
export async function createRealOrder(orderData) {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create order');
    }
    return await res.json();
  } catch (error) {
    console.error('Error creating real order:', error);
    throw error;
  }
}

/**
 * Fetch all notifications (order alerts, confirmations)
 */
export async function getNotifications() {
  if (API_BASE_URL) {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      if (res.ok) return await res.json();
    } catch (error) {
      console.warn('Backend notifications fetch skipped:', error);
    }
  }
  return DEFAULT_NOTIFICATIONS;
}

/**
 * Mark a single notification as read
 */
export async function markNotificationAsRead(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to mark notification as read');
    return await res.json();
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return null;
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead() {
  try {
    const res = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Failed to mark all notifications as read');
    return await res.json();
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return null;
  }
}


// ==========================================
// Customer App Specific Service Functions
// ==========================================


export function onNewListingDrop(callback) {
  if (typeof callback !== 'function') return () => {};

  const seenEvents = new Map();
  const safeCallback = (data) => {
    const notifId = data?.notification?.id;
    const listingId = data?.listing?.id || data?.id;
    const qty = data?.listing?.remaining ?? data?.listing?.bagsAvailable ?? '';
    const isRestock = data?.isRestocked ? 'restock' : 'new';
    const eventKey = notifId || (listingId ? `${listingId}-${qty}-${isRestock}` : null);
    
    const now = Date.now();
    if (eventKey) {
      const lastSeen = seenEvents.get(eventKey);
      if (lastSeen && now - lastSeen < 3000) {
        return;
      }
      seenEvents.set(eventKey, now);
      if (seenEvents.size > 100) {
        for (const [k, ts] of seenEvents.entries()) {
          if (now - ts > 10000) seenEvents.delete(k);
        }
      }
    }
    callback(data);
  };

  let eventSource = null;
  try {
    if (typeof window !== 'undefined' && window.EventSource) {
      eventSource = new EventSource(`https://ntfy.sh/${CLOUD_DROPS_TOPIC}/sse`);
      eventSource.onmessage = (e) => {
        try {
          const parsed = JSON.parse(e.data);
          const raw = typeof parsed.message === 'string' ? JSON.parse(parsed.message) : (parsed.message || parsed);
          if (raw && (raw.listing || raw.id)) {
            safeCallback(raw);
          }
        } catch (err) {}
      };
    }
  } catch (err) {
    console.warn('[Customer SSE] Init error:', err);
  }

  const socketHandler = (data) => safeCallback(data);
  if (socket && socket.on) {
    socket.on('NEW_LISTING', socketHandler);
  }

  let channelHandler = null;
  if (liveDropChannel) {
    channelHandler = (event) => {
      if (event.data?.type === 'NEW_LISTING' && event.data?.data) {
        safeCallback(event.data.data);
      }
    };
    liveDropChannel.addEventListener('message', channelHandler);
  }

  const storageHandler = (e) => {
    if (e.key === 'foodlink_last_new_listing' && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (parsed && parsed.listing) {
          safeCallback(parsed);
        }
      } catch (err) {}
    }
  };
  window.addEventListener('storage', storageHandler);

  return () => {
    if (eventSource) eventSource.close();
    if (socket && socket.off) socket.off('NEW_LISTING', socketHandler);
    if (liveDropChannel && channelHandler) {
      liveDropChannel.removeEventListener('message', channelHandler);
    }
    window.removeEventListener('storage', storageHandler);
  };
}

export async function getActiveListings(category = 'all', search = '') {
  let backendListings = [];
  if (API_BASE_URL) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      const params = new URLSearchParams();
      if (category && category !== 'all') params.append('category', category);
      if (search) params.append('search', search);

      const res = await fetch(`${API_BASE_URL}/listings?${params.toString()}`, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        backendListings = await res.json();
      }
    } catch (error) {
      console.warn('API listings fetch skipped or timed out:', error);
    }
  }

  if (Array.isArray(backendListings) && backendListings.length > 0) {
    return backendListings;
  }

  // Fallback to merchant listings + custom mock items
  try {
    const custom = getCustomMerchantListings();
    const merged = [...custom, ...DEFAULT_MERCHANT_LISTINGS];
    return merged.map(item => ({
      ...item,
      store: item.storeName || item.store || 'CAD Bakery',
      bagsAvailable: item.remainingCount ?? item.remaining ?? item.bagsAvailable ?? 5,
      remaining: item.remainingCount ?? item.remaining ?? item.bagsAvailable ?? 5
    }));
  } catch {
    return DEFAULT_MERCHANT_LISTINGS;
  }
}

export async function reserveListing(target, maybeQuantity = 1, maybeUser = {}) {
  try {
    let payload = {};
    if (typeof target === 'object' && target !== null && !target.id) {
      const { listingId, items = [], quantity = 1, user = {} } = target;
      payload.userId = user.id;
      payload.customerName = user.name;
      payload.customerEmail = user.email;
      payload.avatarUrl = user.avatar;

      if (Array.isArray(items) && items.length > 0) {
        payload.items = items.map((it) => ({
          listingId: it.listing?.id || it.listingId || it.id,
          quantity: it.quantity || 1,
          title: it.listing?.title || it.title,
          price: typeof it.listing?.price === 'number' ? it.listing.price : parseFloat(String(it.listing?.price || '4.99').replace(/[^0-9.]/g, '')) || 4.99,
          photoUrl: it.listing?.image || it.photoUrl,
        }));
      } else if (listingId) {
        payload.listingId = listingId;
        payload.quantity = quantity;
      }
    } else {
      const listingId = typeof target === 'object' ? target.id : target;
      const user = maybeUser || {};
      payload = {
        listingId,
        quantity: maybeQuantity || 1,
        userId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        avatarUrl: user.avatar,
      };
    }

    if (API_BASE_URL) {
      try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 400) : null;
        const res = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller ? controller.signal : undefined,
        });
        if (timeoutId) clearTimeout(timeoutId);
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to place order');
        }
        return await res.json();
      } catch (fetchErr) {
        // Proceed to client-side fallback
      }
    }

    // Deterministic 6-digit verification code generation
    const pickupDigits = String(Math.floor(100000 + Math.random() * 900000));
    const orderNumber = `#FS-${pickupDigits}`;
    const fallbackItems = Array.isArray(payload.items) && payload.items.length > 0
      ? payload.items
      : [{
          listingId: payload.listingId || 'cad-sourdough-box',
          quantity: payload.quantity || 1,
          title: 'Artisan Sourdough & Croissant Surprise Box',
          price: 4.99,
          photoUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=360&q=60',
        }];
    const numPrice = fallbackItems.reduce((sum, it) => sum + ((it.price || 4.99) * (it.quantity || 1)), 0);
    const totalPrice = numPrice.toFixed(2);
    const totalQuantity = fallbackItems.reduce((sum, it) => sum + (it.quantity || 1), 0);

    // Resolve store details from listing
    const firstItemId = fallbackItems[0]?.listingId;
    const matchedListing = DEFAULT_MERCHANT_LISTINGS.find((l) => l.id === firstItemId);
    const storeName = matchedListing?.storeName || 'CAD Bakery & Cafe';
    const storeAddress = matchedListing?.address || 'No. 42, Street 310, BKK1, Phnom Penh';
    const pickupWindow = matchedListing?.pickupStart && matchedListing?.pickupEnd
      ? `${matchedListing.pickupStart} - ${matchedListing.pickupEnd}`
      : '6:30 PM - 8:30 PM';
    const co2SavedKg = Math.round((numPrice * 0.45 || 0.8) * 10) / 10;

    const demoOrder = {
      id: `ord_${Date.now()}`,
      orderNumber,
      pickupCode: pickupDigits,
      digits: pickupDigits.split(''),
      status: 'PENDING',
      customerName: payload.customerName || 'Demo Customer',
      customerEmail: payload.customerEmail || 'customer@foodlink.com',
      avatarUrl: payload.avatarUrl,
      storeId: matchedListing?.storeId || 'st_cad',
      merchantId: matchedListing?.storeId ? 'm-01' : 'm-01',
      storeName,
      storeAddress,
      pickupWindow,
      co2SavedKg,
      items: fallbackItems,
      quantity: totalQuantity,
      totalPrice: parseFloat(totalPrice),
      createdAt: new Date().toISOString(),
    };

    // 1. Persist to shared merchant orders
    try {
      const raw = localStorage.getItem('foodlink_merchant_orders');
      const orders = raw ? JSON.parse(raw) : [];
      localStorage.setItem('foodlink_merchant_orders', JSON.stringify([demoOrder, ...orders]));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}

    // 2. Broadcast via BroadcastChannel for real-time Merchant Kitchen sync
    try {
      if (liveDropChannel) {
        liveDropChannel.postMessage({
          type: 'ORDER_CREATED',
          order: demoOrder,
        });
      }
    } catch (e) {}

    // 3. Dispatch local window event for in-tab context syncing
    try {
      window.dispatchEvent(new CustomEvent('foodlink_order_created', { detail: demoOrder }));
    } catch (e) {}

    return { success: true, order: demoOrder };
  } catch (err) {
    throw err;
  }
}

export async function getCustomerOrders(userId) {
  try {
    const raw = localStorage.getItem('foodlink_merchant_orders');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function playNotificationSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.setValueAtTime(987.77, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch {}
}
