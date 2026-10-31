import os

path = "videos/foodlink-product-film/compositions/scene-2-discovery.html"

scene2_html = """<template>
  <style>
    #root {
      position: absolute;
      inset: 0;
      width: 1920px;
      height: 1080px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      overflow: hidden;
      opacity: 0;
    }

    /* Ambient Spotlight */
    .glow-spot {
      position: absolute;
      width: 700px;
      height: 700px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(46, 125, 50, 0.12) 0%, rgba(46, 125, 50, 0) 70%);
      pointer-events: none;
      filter: blur(40px);
    }

    /* Side Narrative Callout with Step-by-Step User Journey */
    .narrative-col {
      width: 620px;
      margin-right: 80px;
      z-index: 10;
    }
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 18px;
      background: #eaf7ed;
      color: #2e7d32;
      border: 1px solid rgba(46, 125, 50, 0.25);
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .narrative-title {
      font-size: 48px;
      font-weight: 900;
      color: #1c1c1e;
      line-height: 1.15;
      letter-spacing: -1.2px;
      margin-bottom: 20px;
    }
    .narrative-title span {
      color: #2e7d32;
    }

    /* Step-by-Step App Usage Cards */
    .journey-steps {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 10px;
    }
    .step-card {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 16px 20px;
      background: #ffffff;
      border: 1.5px solid #e5e5ea;
      border-radius: 20px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      transform-origin: left center;
    }
    .step-card.active {
      border-color: #2e7d32;
      background: #f7fcf8;
      box-shadow: 0 8px 24px rgba(46, 125, 50, 0.12);
    }
    .step-num {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: #eaf7ed;
      color: #2e7d32;
      font-size: 16px;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-card.active .step-num {
      background: #2e7d32;
      color: #ffffff;
    }
    .step-heading {
      font-size: 18px;
      font-weight: 800;
      color: #1c1c1e;
      margin: 0 0 2px;
    }
    .step-sub {
      font-size: 14px;
      color: #636366;
      line-height: 1.35;
      margin: 0;
      font-weight: 500;
    }

    /* Floating Smartphone Frame */
    .phone-wrapper {
      position: relative;
      width: 440px;
      height: 900px;
      background: #000000;
      border-radius: 60px;
      padding: 14px;
      box-shadow: 
        0 40px 100px -20px rgba(0, 0, 0, 0.25),
        0 25px 45px -10px rgba(46, 125, 50, 0.15),
        inset 0 0 0 2px rgba(255, 255, 255, 0.2);
      transform-origin: center center;
      perspective: 1400px;
      transform-style: preserve-3d;
    }

    /* Dynamic Island & Screen (Identical to Foodlink React App) */
    .phone-screen {
      position: relative;
      width: 100%;
      height: 100%;
      background: #fafafa;
      border-radius: 48px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      color: #1c1c1e;
    }
    .island {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 32px;
      background: #000000;
      border-radius: 20px;
      z-index: 50;
    }
    .status-bar {
      position: absolute;
      top: 18px;
      width: 100%;
      padding: 0 32px;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 700;
      color: #1c1c1e;
      z-index: 40;
    }

    /* Authentic Foodlink Customer Header */
    .app-header {
      padding: 54px 18px 12px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 30;
      flex-shrink: 0;
    }
    .header-logo {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .logo-badge {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: #2e7d32;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 900;
    }
    .header-logo-text {
      font-size: 17px;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #0f172a;
    }
    .header-logo-text span {
      color: #2e7d32;
    }
    .loc-pill {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 700;
      color: #1c1c1e;
      background: #f4f4f5;
      padding: 5px 10px;
      border-radius: 10px;
    }
    .loc-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #2e7d32;
    }

    /* Filter Row */
    .filter-row {
      display: flex;
      gap: 8px;
      padding: 10px 14px 6px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .filter-chip {
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
      background: #ffffff;
      border: 1px solid #e5e5ea;
      color: #636366;
      white-space: nowrap;
    }
    .filter-chip.active {
      background: #2e7d32;
      color: #ffffff;
      border-color: #2e7d32;
    }

    /* Feed Container (Scrolls between Header and Nav) */
    .feed-body {
      padding: 4px 14px 70px;
      overflow: hidden;
      flex: 1;
      position: relative;
    }

    /* Feed Scroll List */
    .feed-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      position: relative;
    }

    /* Authentic Foodlink Listing Card */
    .food-card {
      background: #ffffff;
      border-radius: 20px;
      border: 1.5px solid #e5e5ea;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
      transform-origin: center center;
    }
    .card-img-box {
      position: relative;
      width: 100%;
      height: 140px;
      background: #e5e5ea;
      overflow: hidden;
    }
    .card-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .card-gradient-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, rgba(0, 0, 0, 0.65) 100%);
    }
    .discount-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #ff8a3d;
      color: #ffffff;
      font-size: 11px;
      font-weight: 900;
      padding: 4px 10px;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(255, 138, 61, 0.35);
    }
    .stock-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(6px);
      color: #ffffff;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 8px;
    }
    .merchant-overlay {
      position: absolute;
      bottom: 8px;
      left: 10px;
      color: #ffffff;
      font-size: 11px;
      font-weight: 700;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
    }
    .card-info {
      padding: 12px 14px;
    }
    .item-title {
      font-size: 15px;
      font-weight: 900;
      color: #1c1c1e;
      line-height: 1.25;
      margin-bottom: 6px;
    }
    .pickup-window-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #fff8f0;
      border: 1px solid rgba(255, 138, 61, 0.3);
      padding: 3px 8px;
      border-radius: 6px;
      color: #c2410c;
      font-size: 10px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f4f4f5;
      padding-top: 8px;
    }
    .current-price {
      font-size: 18px;
      font-weight: 900;
      color: #2e7d32;
    }
    .old-price {
      font-size: 12px;
      color: #8e8e93;
      text-decoration: line-through;
      margin-right: 6px;
    }
    .reserve-btn {
      background: #2e7d32;
      color: #ffffff;
      font-size: 12px;
      font-weight: 800;
      padding: 8px 18px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(46, 125, 50, 0.25);
      transform-origin: center center;
    }

    /* Compact Food Cards (Items 2 to 10) */
    .food-card-compact {
      background: #ffffff;
      border-radius: 18px;
      border: 1px solid #e5e5ea;
      padding: 9px 12px;
      display: flex;
      gap: 12px;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    }
    .compact-img-box {
      position: relative;
      width: 70px;
      height: 70px;
      border-radius: 12px;
      overflow: hidden;
      flex-shrink: 0;
    }
    .compact-img-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .compact-discount {
      position: absolute;
      top: 4px;
      left: 4px;
      background: #ff8a3d;
      color: #ffffff;
      font-size: 9px;
      font-weight: 800;
      padding: 2px 5px;
      border-radius: 5px;
    }
    .compact-info {
      flex: 1;
      min-width: 0;
    }
    .compact-store {
      font-size: 10px;
      font-weight: 700;
      color: #2e7d32;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: block;
    }
    .compact-title {
      font-size: 13px;
      font-weight: 800;
      color: #1c1c1e;
      line-height: 1.25;
      margin: 2px 0 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .compact-price-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }
    .compact-price {
      font-size: 14px;
      font-weight: 900;
      color: #2e7d32;
    }
    .compact-old {
      font-size: 11px;
      color: #8e8e93;
      text-decoration: line-through;
      margin-left: 4px;
    }
    .compact-stock {
      font-size: 10px;
      font-weight: 700;
      color: #ff8a3d;
      background: rgba(255, 138, 61, 0.12);
      padding: 2px 6px;
      border-radius: 6px;
    }

    /* Authentic Bottom Navigation Bar */
    .bottom-nav {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-top: 1px solid #e5e5ea;
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 10px;
      z-index: 30;
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      font-size: 10px;
      font-weight: 700;
      color: #8e8e93;
    }
    .nav-item.active {
      color: #2e7d32;
    }
    .nav-icon {
      width: 18px;
      height: 18px;
    }

    /* Dynamic Island Micro-Toast */
    .island-toast {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%) scale(0.85);
      background: #000000;
      color: #ffffff;
      padding: 7px 18px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.3px;
      z-index: 60;
      opacity: 0;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(74, 222, 128, 0.4);
      white-space: nowrap;
      pointer-events: none;
    }
    .toast-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 6px #4ade80;
    }

    /* Real-Time Tap Cursor Pointer */
    .tap-cursor {
      position: absolute;
      top: 0;
      left: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: rgba(46, 125, 50, 0.35);
      border: 2.5px solid #2e7d32;
      pointer-events: none;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
      z-index: 99;
    }
  </style>

  <div id="root" data-composition-id="scene-2-discovery" data-width="1920" data-height="1080" data-duration="12.0">
    <div class="glow-spot" style="left: 65%;"></div>

    <!-- Narrative Column (Left) with Step-by-Step App Walkthrough -->
    <div class="narrative-col" id="us1-narrative" data-layout-ignore>
      <div class="badge-pill">FoodLink Customer Journey</div>
      <h2 class="narrative-title">Browse & Rescue: <span>10+ Surplus Foods</span> Live</h2>

      <!-- 3-Step App Journey -->
      <div class="journey-steps">
        <div class="step-card active" id="step-1-card">
          <div class="step-num" id="s1-badge">01</div>
          <div class="step-content">
            <h4 class="step-heading">Step 1: Discover Live Surplus</h4>
            <p class="step-sub">Browse fresh artisan bakery items at 50% to 70% off before store closing.</p>
          </div>
        </div>

        <div class="step-card" id="step-2-card">
          <div class="step-num" id="s2-badge">02</div>
          <div class="step-content">
            <h4 class="step-heading">Step 2: Tap "Claim Deal"</h4>
            <p class="step-sub">Instant one-tap selection with real-time stock counters and pickup window.</p>
          </div>
        </div>

        <div class="step-card" id="step-3-card">
          <div class="step-num" id="s3-badge">03</div>
          <div class="step-content">
            <h4 class="step-heading">Step 3: Instant Reserve & Pass</h4>
            <p class="step-sub">Instant counter pass generated for quick evening pickup and handover.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Smartphone Frame (Right) - Identical to Foodlink UI -->
    <div class="phone-wrapper" id="us1-phone" data-layout-ignore>
      <div class="phone-screen">
        <div class="island"></div>

        <!-- Dynamic Island Micro-Toast -->
        <div class="island-toast" id="reserve-toast">
          <span class="toast-dot"></span>
          <span>Claimed • Proceeding to Bakong KHQR Pay</span>
        </div>

        <div class="status-bar">
          <span>8:15</span>
          <span>5G • 100%</span>
        </div>

        <!-- Authentic Foodlink App Header -->
        <div class="app-header">
          <div class="header-logo">
            <div class="logo-badge">FL</div>
            <span class="header-logo-text">Food<span>link</span></span>
          </div>
          <div class="loc-pill">
            <span class="loc-dot"></span>
            <span>BKK1, Phnom Penh</span>
          </div>
        </div>

        <!-- Filter Row -->
        <div class="filter-row">
          <span class="filter-chip active">Bakery (10)</span>
          <span class="filter-chip">Pastries (6)</span>
          <span class="filter-chip">Meals (8)</span>
          <span class="filter-chip">Deli</span>
        </div>

        <!-- Feed Body -->
        <div class="feed-body" id="phone-feed">
          <div class="feed-list" id="feed-items-list">
            <!-- 1. Hero Food Card (Matches Foodlink ListingCard.jsx) -->
            <div class="food-card" id="target-food-card">
              <div class="card-img-box">
                <img src="assets/food-sourdough.jpg" alt="Artisan Sourdough" />
                <div class="card-gradient-overlay"></div>
                <span class="discount-badge">69% OFF</span>
                <span class="stock-badge">4 left</span>
                <span class="merchant-overlay">Artisan Bakery & Cafe • 0.4 km</span>
              </div>
              <div class="card-info">
                <h3 class="item-title">Artisan Sourdough & Croissant Box</h3>
                <div class="pickup-window-pill">
                  <span>Pickup: Today, 8:15 PM – 8:45 PM</span>
                </div>
                <div class="price-row">
                  <div>
                    <span class="old-price">$16.00</span>
                    <span class="current-price">$4.99</span>
                  </div>
                  <div class="reserve-btn" id="card-reserve-btn">Claim Deal</div>
                </div>
              </div>
            </div>

            <!-- 2. French Butter Croissants -->
            <div class="food-card-compact" id="item-2-card">
              <div class="compact-img-box">
                <img src="assets/french-croissants.jpg" alt="French Butter Croissants" />
                <span class="compact-discount">-60%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Golden Patisserie • 0.7 km</span>
                <h4 class="compact-title">French Butter Croissants Bag</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$3.20</span>
                    <span class="compact-old">$8.00</span>
                  </div>
                  <span class="compact-stock">2 left</span>
                </div>
              </div>
            </div>

            <!-- 3. Sweet Tartlets -->
            <div class="food-card-compact" id="item-3-card">
              <div class="compact-img-box">
                <img src="assets/sweet-tartlets.jpg" alt="Sweet Tartlets" />
                <span class="compact-discount">-65%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Urban Delice Bistro • 1.1 km</span>
                <h4 class="compact-title">Sweet Fruit Tartlets & Danish Trio</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$3.80</span>
                    <span class="compact-old">$11.00</span>
                  </div>
                  <span class="compact-stock">3 left</span>
                </div>
              </div>
            </div>

            <!-- 4. Rustic Baguettes -->
            <div class="food-card-compact" id="item-4-card">
              <div class="compact-img-box">
                <img src="assets/bakery-display.jpg" alt="Rustic Baguettes" />
                <span class="compact-discount">-58%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Artisan Bakery & Cafe • 0.4 km</span>
                <h4 class="compact-title">Rustic Baguettes & Sourdough Loaf</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$2.50</span>
                    <span class="compact-old">$6.00</span>
                  </div>
                  <span class="compact-stock">1 left</span>
                </div>
              </div>
            </div>

            <!-- 5. Savory Focaccia -->
            <div class="food-card-compact" id="item-5-card">
              <div class="compact-img-box">
                <img src="assets/savory-focaccia.jpg" alt="Savory Rosemary Focaccia" />
                <span class="compact-discount">-62%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Roma Hearth Oven • 0.8 km</span>
                <h4 class="compact-title">Savory Rosemary Focaccia & Brioche</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$4.50</span>
                    <span class="compact-old">$12.00</span>
                  </div>
                  <span class="compact-stock">5 left</span>
                </div>
              </div>
            </div>

            <!-- 6. Cold Brew & Afternoon Pastry -->
            <div class="food-card-compact" id="item-6-card">
              <div class="compact-img-box">
                <img src="assets/cold-brew-pastry.jpg" alt="Cold Brew & Pastry" />
                <span class="compact-discount">-60%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">The Roastery Bar • 0.5 km</span>
                <h4 class="compact-title">Cold Brew & Afternoon Pastry Pair</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$3.00</span>
                    <span class="compact-old">$7.50</span>
                  </div>
                  <span class="compact-stock">4 left</span>
                </div>
              </div>
            </div>

            <!-- 7. Olive Ciabatta Loaves -->
            <div class="food-card-compact" id="item-7-card">
              <div class="compact-img-box">
                <img src="assets/fresh-ciabatta.jpg" alt="Artisan Olive Ciabatta" />
                <span class="compact-discount">-60%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Corner Bakehouse • 1.2 km</span>
                <h4 class="compact-title">Fresh Artisan Olive Ciabatta Loaves</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$2.20</span>
                    <span class="compact-old">$5.50</span>
                  </div>
                  <span class="compact-stock">3 left</span>
                </div>
              </div>
            </div>

            <!-- 8. Gourmet Panini -->
            <div class="food-card-compact" id="item-8-card">
              <div class="compact-img-box">
                <img src="assets/gourmet-sandwich.jpg" alt="Gourmet Prosciutto Panini" />
                <span class="compact-discount">-59%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Green Hearth Deli • 0.9 km</span>
                <h4 class="compact-title">Gourmet Prosciutto & Mozzarella Panini</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$3.90</span>
                    <span class="compact-old">$9.50</span>
                  </div>
                  <span class="compact-stock">2 left</span>
                </div>
              </div>
            </div>

            <!-- 9. Chocolate Cake Slice -->
            <div class="food-card-compact" id="item-9-card">
              <div class="compact-img-box">
                <img src="assets/chocolate-cake.jpg" alt="Dark Chocolate Cake" />
                <span class="compact-discount">-60%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Velvet Crumb Bakery • 1.4 km</span>
                <h4 class="compact-title">Dark Chocolate Ganache Cake Slice</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$2.80</span>
                    <span class="compact-old">$7.00</span>
                  </div>
                  <span class="compact-stock">3 left</span>
                </div>
              </div>
            </div>

            <!-- 10. Uji Matcha Latte & Sesame Bagel -->
            <div class="food-card-compact" id="item-10-card">
              <div class="compact-img-box">
                <img src="assets/matcha-latte-bagel.jpg" alt="Matcha Latte & Bagel" />
                <span class="compact-discount">-56%</span>
              </div>
              <div class="compact-info">
                <span class="compact-store">Kyoto Roast & Bread • 0.6 km</span>
                <h4 class="compact-title">Uji Matcha Latte & Sesame Bagel</h4>
                <div class="compact-price-row">
                  <div>
                    <span class="compact-price">$3.50</span>
                    <span class="compact-old">$8.00</span>
                  </div>
                  <span class="compact-stock">2 left</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Authentic Foodlink Bottom Navigation -->
        <div class="bottom-nav">
          <div class="nav-item active">
            <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            <span>Home</span>
          </div>
          <div class="nav-item">
            <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span>Explore</span>
          </div>
          <div class="nav-item">
            <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/></svg>
            <span>Orders</span>
          </div>
          <div class="nav-item">
            <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>Profile</span>
          </div>
        </div>

        <!-- Tap Cursor Pointer -->
        <div class="tap-cursor" id="tap-pointer"></div>
      </div>
    </div>
  </div>

  <script>
    (function() {
      const tl = gsap.timeline({ paused: true });

      // 0.0s: Entrance with 3D camera perspective
      tl.to("#root", { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
      tl.from("#us1-narrative", { x: -60, opacity: 0, duration: 1.0, ease: "power3.out" }, 0.2);
      tl.from(".step-card", { x: -30, opacity: 0, duration: 0.6, stagger: 0.15, ease: "back.out(1.4)" }, 0.4);

      tl.fromTo("#us1-phone", 
        { y: 120, rotationY: -12, rotationX: 6, opacity: 0 },
        { y: 0, rotationY: -4, rotationX: 2, opacity: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );

      // Stagger in the feed items
      tl.from(".filter-chip", { opacity: 0, scale: 0.8, stagger: 0.08, duration: 0.4, ease: "back.out(1.5)" }, 0.6);
      tl.from(".food-card-compact", { y: 25, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }, 0.8);

      // 1.8s - 4.0s: Multi-item surplus browsing exploration (smoothly scrolls down revealing items 2 through 8)
      tl.to("#feed-items-list", {
        y: -360,
        duration: 1.8,
        ease: "power2.inOut"
      }, 1.8);

      // Return scroll smoothly to Hero Card
      tl.to("#feed-items-list", {
        y: 0,
        duration: 1.4,
        ease: "power2.inOut"
      }, 3.8);

      // Step 2 Transition (4.6s): User selects Hero Card
      tl.to("#step-1-card", {
        borderColor: "#e5e5ea",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        duration: 0.4
      }, 4.4);
      tl.to("#s1-badge", { backgroundColor: "#eaf7ed", color: "#2e7d32", duration: 0.4 }, 4.4);

      tl.to("#step-2-card", {
        borderColor: "#2e7d32",
        backgroundColor: "#f7fcf8",
        boxShadow: "0 8px 24px rgba(46, 125, 50, 0.15)",
        duration: 0.4
      }, 4.6);
      tl.to("#s2-badge", { backgroundColor: "#2e7d32", color: "#ffffff", duration: 0.4 }, 4.6);

      // 5.0s: Highlight the target food card as phone rotates forward
      tl.to("#target-food-card", {
        boxShadow: "0 16px 36px rgba(46, 125, 50, 0.35)",
        borderColor: "#2e7d32",
        scale: 1.03,
        duration: 0.6,
        ease: "back.out(1.5)"
      }, 4.8);

      tl.to("#us1-phone", {
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, 5.0);

      // Tap cursor glides in at 7.2s directly to the 'Claim Deal' button
      tl.to("#tap-pointer", {
        x: 345,
        y: 338,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, 7.2);

      // Authentic button click compression (at 8.0s)
      tl.to("#tap-pointer", {
        scale: 0.75,
        backgroundColor: "rgba(46, 125, 50, 0.7)",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 8.0);

      tl.to("#card-reserve-btn", {
        scale: 0.92,
        backgroundColor: "#256628",
        duration: 0.15,
        yoyo: true,
        repeat: 1
      }, 8.0);

      tl.to("#tap-pointer", {
        opacity: 0,
        duration: 0.3
      }, 8.4);

      // 8.2s: Dynamic island expands with confirmation toast!
      tl.to("#reserve-toast", {
        opacity: 1,
        scale: 1,
        y: 6,
        duration: 0.4,
        ease: "back.out(1.6)"
      }, 8.2);

      // Step 3 Transition (8.2s): Step 3 Activates
      tl.to("#step-2-card", {
        borderColor: "#e5e5ea",
        backgroundColor: "#ffffff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
        duration: 0.4
      }, 8.2);
      tl.to("#s2-badge", { backgroundColor: "#eaf7ed", color: "#2e7d32", duration: 0.4 }, 8.2);

      tl.to("#step-3-card", {
        borderColor: "#2e7d32",
        backgroundColor: "#f7fcf8",
        boxShadow: "0 8px 24px rgba(46, 125, 50, 0.15)",
        duration: 0.4
      }, 8.4);
      tl.to("#s3-badge", { backgroundColor: "#2e7d32", color: "#ffffff", duration: 0.4 }, 8.4);

      // 11.3s: Transition exit
      tl.to("#root", {
        opacity: 0,
        y: -30,
        duration: 0.7,
        ease: "power2.in"
      }, 11.3);

      window.__timelines = window.__timelines || {};
      window.__timelines["scene-2-discovery"] = tl;
    })();
  </script>
</template>
"""

with open(path, "w", encoding="utf-8") as f:
    f.write(scene2_html)

print("Updated scene-2-discovery.html with authentic Foodlink UI components.")

