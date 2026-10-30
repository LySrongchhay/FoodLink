export const initialMerchants = [
  {
    id: "m-01",
    name: "CAD Bakery & Cafe",
    category: "Bakery",
    address: "St. 310, BKK1, Phnom Penh",
    rating: 4.9,
    ratingCount: 142,
    distance: "0.4 km",
    closingTime: "20:30",
    pickupWindow: "18:30 - 20:30",
    logoUrl: "/cad-bakery-logo.png",
    logoText: "CB",
    description: "Artisan sourdough, French viennoiserie, and morning pastries baked fresh daily in BKK1.",
    isOpen: true,
    sustainabilityScore: "98%",
    co2AvoidedKg: 342,
    mealsRescued: 418
  },
  {
    id: "m-02",
    name: "Green Garden Organics",
    category: "Groceries",
    address: "St. 288, BKK1, Phnom Penh",
    rating: 4.8,
    ratingCount: 94,
    distance: "0.7 km",
    closingTime: "21:00",
    pickupWindow: "19:00 - 21:00",
    logoText: "GG",
    description: "Farm-to-table organic produce, surplus fruit bags, and leafy greens from Mondulkiri.",
    isOpen: true,
    sustainabilityScore: "94%",
    co2AvoidedKg: 210,
    mealsRescued: 195
  },
  {
    id: "m-03",
    name: "Sovan Dim Sum & Buns",
    category: "Asian",
    address: "St. 136, Daun Penh, Phnom Penh",
    rating: 4.7,
    ratingCount: 134,
    distance: "1.9 km",
    closingTime: "21:00",
    pickupWindow: "19:30 - 21:00",
    logoText: "SD",
    description: "Fresh steamed BBQ char siu buns, dim sum baskets, and crispy spring rolls.",
    isOpen: true,
    sustainabilityScore: "96%",
    co2AvoidedKg: 285,
    mealsRescued: 312
  },
  {
    id: "m-04",
    name: "Mama Heng Khmer Rice",
    category: "Asian",
    address: "St. 178, Daun Penh, Phnom Penh",
    rating: 4.8,
    ratingCount: 165,
    distance: "1.4 km",
    closingTime: "20:45",
    pickupWindow: "19:00 - 20:45",
    logoText: "MH",
    description: "Authentic Cambodian beef Lok Lak, fragrant jasmine rice boxes, and seasonal soups.",
    isOpen: true,
    sustainabilityScore: "95%",
    co2AvoidedKg: 198,
    mealsRescued: 245
  },
  {
    id: "m-05",
    name: "Eric Kayser Bakery",
    category: "Bakery",
    address: "St. 51, BKK1, Phnom Penh",
    rating: 4.9,
    ratingCount: 118,
    distance: "0.5 km",
    closingTime: "20:30",
    pickupWindow: "18:45 - 20:30",
    logoText: "EK",
    description: "Parisian artisan sourdough boules, butter madeleines, and golden brioches.",
    isOpen: true,
    sustainabilityScore: "97%",
    co2AvoidedKg: 276,
    mealsRescued: 320
  },
  {
    id: "m-06",
    name: "Napoli Pizza Co.",
    category: "Italian",
    address: "St. 308, Tonle Bassac, Phnom Penh",
    rating: 4.8,
    ratingCount: 172,
    distance: "1.1 km",
    closingTime: "22:00",
    pickupWindow: "20:15 - 22:00",
    logoText: "NP",
    description: "Wood-fired artisanal sourdough Neapolitan pizza and Italian garlic breads.",
    isOpen: true,
    sustainabilityScore: "93%",
    co2AvoidedKg: 165,
    mealsRescued: 180
  }
];

export const initialListings = [
  // 1. Pastry (CAD Bakery)
  {
    id: "cad-sourdough-box",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "Artisan Sourdough & Croissant Surprise Box",
    description: "Artisanal European sourdough loaves, buttery croissants, and morning viennoiserie baked fresh today.",
    category: "Pastry",
    originalPrice: 16.00,
    discountedPrice: 4.99,
    discountPercentage: 69,
    quantityAvailable: 4,
    unit: "box (4 pcs)",
    pickupStartTime: "18:30",
    pickupEndTime: "20:30",
    status: "ACTIVE",
    badge: "69% OFF",
    allergens: ["Gluten", "Dairy", "Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
  },
  // 2. Pastry (CAD Bakery)
  {
    id: "cad-croissant-bundle",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "French Butter Croissant & Viennoiserie Bag",
    description: "Pure French butter croissants, almond escargot pastries, chocolate swirls, and brioche rolls.",
    category: "Pastry",
    originalPrice: 13.50,
    discountedPrice: 3.99,
    discountPercentage: 70,
    quantityAvailable: 5,
    unit: "bag (5 pcs)",
    pickupStartTime: "18:00",
    pickupEndTime: "19:30",
    status: "ACTIVE",
    badge: "70% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
  },
  // 3. Pastry (CAD Bakery)
  {
    id: "cad-rustic-breads",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "Rustic Country Sourdough & Baguette Pack",
    description: "Two full-size artisan sourdough boules and crispy European baguettes freshly baked with organic wheat flour.",
    category: "Pastry",
    originalPrice: 12.00,
    discountedPrice: 3.50,
    discountPercentage: 71,
    quantityAvailable: 3,
    unit: "bundle (2 loaves)",
    pickupStartTime: "18:30",
    pickupEndTime: "20:00",
    status: "ACTIVE",
    badge: "71% OFF",
    allergens: ["Gluten"],
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  // 4. Pastry (Eric Kayser)
  {
    id: "kayser-pastry-basket",
    merchantId: "m-05",
    merchantName: "Eric Kayser Bakery",
    title: "Paris Madeleine & Brioche Selection",
    description: "Authentic French butter madeleines, golden brioche buns, and pain au chocolat from afternoon batches.",
    category: "Pastry",
    originalPrice: 10.00,
    discountedPrice: 3.80,
    discountPercentage: 62,
    quantityAvailable: 4,
    unit: "box (4 pcs)",
    pickupStartTime: "18:45",
    pickupEndTime: "20:30",
    status: "ACTIVE",
    badge: "62% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=800&q=80"
  },
  // 5. Pastry (Russian Market)
  {
    id: "ttp-custard-buns",
    merchantId: "m-01",
    merchantName: "Phsar Toul Tompoung Bakery",
    title: "Coconut Cream Brioche & Taro Buns",
    description: "Traditional Cambodian sweet custard buns, coconut brioche rolls, and taro milk pastries.",
    category: "Pastry",
    originalPrice: 6.00,
    discountedPrice: 2.20,
    discountPercentage: 63,
    quantityAvailable: 6,
    unit: "box (6 pcs)",
    pickupStartTime: "17:30",
    pickupEndTime: "19:30",
    status: "ACTIVE",
    badge: "63% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1612203985729-70726954388c?auto=format&fit=crop&w=800&q=80"
  },
  // 6. Asian (Mama Heng)
  {
    id: "mama-heng-lok-lak",
    merchantId: "m-04",
    merchantName: "Mama Heng Khmer Rice",
    title: "Tender Beef Lok Lak & Fragrant Jasmine Rice",
    description: "Wok-seared marinated Kampot pepper beef cubes served with jasmine rice, sunny egg, and lime-pepper dip.",
    category: "Asian",
    originalPrice: 7.50,
    discountedPrice: 2.90,
    discountPercentage: 61,
    quantityAvailable: 5,
    unit: "portion",
    pickupStartTime: "19:00",
    pickupEndTime: "20:45",
    status: "ACTIVE",
    badge: "61% OFF",
    allergens: ["Soy", "Beef"],
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  // 7. Asian (Sovan Dim Sum)
  {
    id: "sovan-dim-sum",
    merchantId: "m-03",
    merchantName: "Sovan Dim Sum & Buns",
    title: "Steamed Char Siu Bao & Shrimp Dumpling Box",
    description: "Fluffy handmade BBQ pork baozi and crystal shrimp har gow prepared fresh for evening pickup.",
    category: "Asian",
    originalPrice: 8.50,
    discountedPrice: 3.20,
    discountPercentage: 62,
    quantityAvailable: 4,
    unit: "box (6 pcs)",
    pickupStartTime: "19:30",
    pickupEndTime: "21:00",
    status: "ACTIVE",
    badge: "62% OFF",
    allergens: ["Gluten", "Pork", "Shellfish"],
    imageUrl: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80"
  },
  // 8. Asian (Chea Noodle)
  {
    id: "chea-noodle-soup",
    merchantId: "m-03",
    merchantName: "Chea Noodle & Bao",
    title: "Hand-Pulled Pork Noodle & Wonton Combo",
    description: "Springy egg noodles with braised minced pork, crispy shallots, pork wontons, and bok choy.",
    category: "Asian",
    originalPrice: 6.50,
    discountedPrice: 2.50,
    discountPercentage: 62,
    quantityAvailable: 5,
    unit: "bowl combo",
    pickupStartTime: "19:00",
    pickupEndTime: "20:30",
    status: "ACTIVE",
    badge: "62% OFF",
    allergens: ["Gluten", "Pork", "Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
  },
  // 9. Asian (Malis Kitchen)
  {
    id: "malis-khmer-curry",
    merchantId: "m-04",
    merchantName: "Malis Kitchen",
    title: "Khmer Chicken Red Curry & Baguette Drop",
    description: "Fragrant Cambodian red curry with tender chicken, sweet potato, and fresh crusty baguette.",
    category: "Asian",
    originalPrice: 9.00,
    discountedPrice: 3.60,
    discountPercentage: 60,
    quantityAvailable: 3,
    unit: "portion",
    pickupStartTime: "19:30",
    pickupEndTime: "21:00",
    status: "ACTIVE",
    badge: "60% OFF",
    allergens: ["Poultry"],
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
  },
  // 10. Italian (Napoli Pizza Co.)
  {
    id: "napoli-margherita-pizza",
    merchantId: "m-06",
    merchantName: "Napoli Pizza Co.",
    title: "Wood-Fired Margherita & Basil Pizza",
    description: "Hand-stretched sourdough crust with San Marzano tomato sauce, fresh mozzarella, and aromatic basil.",
    category: "Italian",
    originalPrice: 11.00,
    discountedPrice: 4.40,
    discountPercentage: 60,
    quantityAvailable: 3,
    unit: "12-inch pizza",
    pickupStartTime: "20:15",
    pickupEndTime: "22:00",
    status: "ACTIVE",
    badge: "60% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80"
  },
  // 11. Italian (CAD Bakery)
  {
    id: "cad-savory-focaccia",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "Rosemary Sea Salt & Olive Focaccia Box",
    description: "Rosemary sea salt focaccia squares, olive rolls, and savory gruyere brioche twists.",
    category: "Italian",
    originalPrice: 10.50,
    discountedPrice: 3.50,
    discountPercentage: 67,
    quantityAvailable: 3,
    unit: "box (3 pcs)",
    pickupStartTime: "18:00",
    pickupEndTime: "19:30",
    status: "ACTIVE",
    badge: "67% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
  },
  // 12. Healthy (Green Garden Organics)
  {
    id: "green-garden-salad",
    merchantId: "m-02",
    merchantName: "Green Garden Organics",
    title: "Organic Quinoa, Avocado & Garden Greens Bowl",
    description: "Organic crisp garden salad bowl with ripe Cambodian avocado, quinoa, and honey-lime dressing.",
    category: "Healthy",
    originalPrice: 7.00,
    discountedPrice: 2.80,
    discountPercentage: 60,
    quantityAvailable: 4,
    unit: "bowl",
    pickupStartTime: "19:00",
    pickupEndTime: "21:00",
    status: "ACTIVE",
    badge: "60% OFF",
    allergens: [],
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  // 13. Healthy (Backyard Café)
  {
    id: "backyard-acai-bowl",
    merchantId: "m-02",
    merchantName: "Backyard Café",
    title: "Ripe Dragonfruit & Granola Acai Bowl",
    description: "Superfood acai and pitaya smoothie bowl topped with toasted pumpkin seeds, coconut flakes, and chia.",
    category: "Healthy",
    originalPrice: 6.00,
    discountedPrice: 2.40,
    discountPercentage: 60,
    quantityAvailable: 4,
    unit: "bowl",
    pickupStartTime: "17:30",
    pickupEndTime: "19:30",
    status: "ACTIVE",
    badge: "60% OFF",
    allergens: ["Nuts"],
    imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80"
  },
  // 14. Food / Meals (One More Restaurant)
  {
    id: "one-more-bento",
    merchantId: "m-04",
    merchantName: "One More Restaurant",
    title: "Signature Khmer Rice & Roast Chicken Bento",
    description: "Traditional slow-roasted lemongrass chicken, steamed jasmine rice, pickled vegetables, and soup.",
    category: "Food",
    originalPrice: 7.00,
    discountedPrice: 2.75,
    discountPercentage: 61,
    quantityAvailable: 5,
    unit: "bento set",
    pickupStartTime: "19:30",
    pickupEndTime: "21:00",
    status: "ACTIVE",
    badge: "61% OFF",
    allergens: ["Poultry"],
    imageUrl: "https://images.unsplash.com/photo-1546069901-d11a2ae75832?auto=format&fit=crop&w=800&q=80"
  },
  // 15. Dessert (CAD Bakery)
  {
    id: "cad-sweet-dessert-box",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "Sweet Berry Tartlets & Dark Chocolate Eclairs",
    description: "Fresh fruit custard tartlets, cinnamon glazed knots, and dark chocolate ganache eclairs.",
    category: "Dessert",
    originalPrice: 14.00,
    discountedPrice: 4.50,
    discountPercentage: 68,
    quantityAvailable: 3,
    unit: "box (4 pcs)",
    pickupStartTime: "19:00",
    pickupEndTime: "20:30",
    status: "ACTIVE",
    badge: "68% OFF",
    allergens: ["Gluten", "Dairy", "Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
  },
  // 16. Dessert (Tokyo Patisserie)
  {
    id: "tokyo-matcha-cake",
    merchantId: "m-05",
    merchantName: "Tokyo Patisserie",
    title: "Japanese Matcha Chiffon & Strawberry Shortcake",
    description: "Delicate green tea chiffon cake slice and fluffy strawberry cream shortcake.",
    category: "Dessert",
    originalPrice: 9.00,
    discountedPrice: 3.50,
    discountPercentage: 61,
    quantityAvailable: 3,
    unit: "box (2 slices)",
    pickupStartTime: "18:30",
    pickupEndTime: "20:15",
    status: "ACTIVE",
    badge: "61% OFF",
    allergens: ["Gluten", "Dairy", "Eggs"],
    imageUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80"
  },
  // 17. Drinks (Brown Coffee Roastery)
  {
    id: "brown-cold-brew-pack",
    merchantId: "m-05",
    merchantName: "Brown Coffee Roastery",
    title: "Mondulkiri Cold Brew & Almond Cookie Pair",
    description: "16-hour slow-steeped Cambodian single-origin cold brew bottle with two buttery baked cookies.",
    category: "Drinks",
    originalPrice: 7.50,
    discountedPrice: 2.60,
    discountPercentage: 65,
    quantityAvailable: 6,
    unit: "pair (bottle + cookies)",
    pickupStartTime: "18:00",
    pickupEndTime: "20:00",
    status: "ACTIVE",
    badge: "65% OFF",
    allergens: ["Nuts"],
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80"
  },
  // 18. Drinks (CAD Bakery)
  {
    id: "cad-coffee-pastry-pair",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    title: "Barista Iced Latte & Fresh Croissant Drop",
    description: "Double-shot espresso iced latte bottle with a crisp morning butter croissant.",
    category: "Drinks",
    originalPrice: 8.50,
    discountedPrice: 2.90,
    discountPercentage: 66,
    quantityAvailable: 5,
    unit: "set",
    pickupStartTime: "17:30",
    pickupEndTime: "19:00",
    status: "ACTIVE",
    badge: "66% OFF",
    allergens: ["Gluten", "Dairy"],
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
  }
];

export const initialOrders = [
  // 1. Pre-reserved active order for customer testing (Code 849201)
  {
    id: "ord-849201",
    orderNumber: "#FS-849201",
    listingId: "cad-sourdough-box",
    listingTitle: "Artisan Sourdough & Croissant Surprise Box",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Dara Sok",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70",
    quantity: 1,
    totalPrice: 4.99,
    pickupCode: "849201",
    status: "RESERVED",
    pickupWindow: "18:30 - 20:30",
    createdAt: "2026-10-30T17:45:00Z",
    items: [
      {
        title: "Artisan Sourdough & Croissant Surprise Box",
        quantity: 1,
        price: 4.99,
        photoUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 2. Pending Order 2
  {
    id: "ord-392104",
    orderNumber: "#FS-392104",
    listingId: "cad-croissant-bundle",
    listingTitle: "French Butter Croissant & Viennoiserie Bag",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Sreypov K.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=70",
    quantity: 2,
    totalPrice: 7.98,
    pickupCode: "392104",
    status: "RESERVED",
    pickupWindow: "18:30 - 20:30",
    createdAt: "2026-10-30T17:30:00Z",
    items: [
      {
        title: "French Butter Croissant & Viennoiserie Bag",
        quantity: 2,
        price: 3.99,
        photoUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 3. Pending Order 3 (Multi-item)
  {
    id: "ord-710482",
    orderNumber: "#FS-710482",
    listingId: "cad-rustic-breads",
    listingTitle: "Rustic Country Sourdough & Baguette Pack",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Alex Morison",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=70",
    quantity: 2,
    totalPrice: 6.40,
    pickupCode: "710482",
    status: "RESERVED",
    pickupWindow: "18:30 - 20:30",
    createdAt: "2026-10-30T17:15:00Z",
    items: [
      {
        title: "Rustic Country Sourdough & Baguette Pack",
        quantity: 1,
        price: 3.50,
        photoUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
      },
      {
        title: "Barista Iced Latte & Fresh Croissant Drop",
        quantity: 1,
        price: 2.90,
        photoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 4. Pending Order 4
  {
    id: "ord-551920",
    orderNumber: "#FS-551920",
    listingId: "cad-sweet-dessert-box",
    listingTitle: "Sweet Berry Tartlets & Dark Chocolate Eclairs",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Bopha Tep",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=70",
    quantity: 1,
    totalPrice: 4.50,
    pickupCode: "551920",
    status: "RESERVED",
    pickupWindow: "19:00 - 20:30",
    createdAt: "2026-10-30T17:00:00Z",
    items: [
      {
        title: "Sweet Berry Tartlets & Dark Chocolate Eclairs",
        quantity: 1,
        price: 4.50,
        photoUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 5. Pending Order 5
  {
    id: "ord-628401",
    orderNumber: "#FS-628401",
    listingId: "cad-savory-focaccia",
    listingTitle: "Rosemary Sea Salt & Olive Focaccia Box",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Channary Heng",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=70",
    quantity: 1,
    totalPrice: 3.50,
    pickupCode: "628401",
    status: "RESERVED",
    pickupWindow: "18:00 - 20:00",
    createdAt: "2026-10-30T16:45:00Z",
    items: [
      {
        title: "Rosemary Sea Salt & Olive Focaccia Box",
        quantity: 1,
        price: 3.50,
        photoUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 6. Completed Order 1
  {
    id: "ord-401827",
    orderNumber: "#FS-401827",
    listingId: "cad-sourdough-box",
    listingTitle: "Artisan Sourdough & Croissant Surprise Box",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Vannak Leng",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=70",
    quantity: 2,
    totalPrice: 9.98,
    pickupCode: "401827",
    status: "COMPLETED",
    pickupWindow: "18:30 - 20:30",
    createdAt: "2026-10-30T15:20:00Z",
    verifiedAt: "18:14",
    items: [
      {
        title: "Artisan Sourdough & Croissant Surprise Box",
        quantity: 2,
        price: 4.99,
        photoUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 7. Completed Order 2
  {
    id: "ord-298411",
    orderNumber: "#FS-298411",
    listingId: "cad-croissant-bundle",
    listingTitle: "French Butter Croissant & Viennoiserie Bag",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Mengly Sovann",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=70",
    quantity: 1,
    totalPrice: 3.99,
    pickupCode: "298411",
    status: "COMPLETED",
    pickupWindow: "18:00 - 19:30",
    createdAt: "2026-10-30T14:10:00Z",
    verifiedAt: "17:55",
    items: [
      {
        title: "French Butter Croissant & Viennoiserie Bag",
        quantity: 1,
        price: 3.99,
        photoUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  // 8. Completed Order 3
  {
    id: "ord-184920",
    orderNumber: "#FS-184920",
    listingId: "cad-coffee-pastry-pair",
    listingTitle: "Barista Iced Latte & Fresh Croissant Drop",
    merchantId: "m-01",
    merchantName: "CAD Bakery & Cafe",
    customerName: "Pich Davin",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=70",
    quantity: 1,
    totalPrice: 2.90,
    pickupCode: "184920",
    status: "COMPLETED",
    pickupWindow: "17:30 - 19:00",
    createdAt: "2026-10-30T13:40:00Z",
    verifiedAt: "17:40",
    items: [
      {
        title: "Barista Iced Latte & Fresh Croissant Drop",
        quantity: 1,
        price: 2.90,
        photoUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const initialNotifications = [
  {
    id: "notif-01",
    title: "Fresh CAD Bakery Batch Dropped! 🔥",
    message: "Artisan Croissant boxes are now available for evening pickup at 69% OFF in BKK1.",
    type: "NEW_LISTING",
    isRead: false,
    timestamp: "10 mins ago"
  },
  {
    id: "notif-02",
    title: "Closing Soon in BKK1 ⏰",
    message: "CAD Bakery closes at 20:30. 4 surplus sourdough boxes remain available.",
    type: "URGENT",
    isRead: false,
    timestamp: "25 mins ago"
  },
  {
    id: "notif-03",
    title: "Mama Heng Khmer Rice Listed! 🍲",
    message: "Tender Beef Lok Lak with Kampot pepper dip now available for rescue at $2.90.",
    type: "NEW_LISTING",
    isRead: true,
    timestamp: "45 mins ago"
  },
  {
    id: "notif-04",
    title: "Pickup Verification Ready ✅",
    message: "Your reservation #FS-849201 is ready for evening pickup at CAD Bakery (St. 310).",
    type: "ORDER_READY",
    isRead: true,
    timestamp: "1 hour ago"
  }
];
