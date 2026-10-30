# Technical Research: Mobile-First UX & UI Consistency

**Feature**: `005-mobile-ui-consistency`  
**Date**: 2026-10-30  

---

## 1. Mobile Audit: Problem Areas Identified

### 1.1 Customer Discover Feed (`CustomerExploreFeed.jsx`)
- **Icon Squeezing**: SVGs (`Clock`, `Sparkles`, `MapPin`, `Star`) lacked `shrink-0`, causing flex parents to compress icons into narrow ovals on small screen widths (< 375px).
- **Horizontal Carousel vs. Vertical Stack Conflict**: Horizontal carousel cards (`w-[290px]`) cut off awkwardly in mobile viewports, leaving users unsure if more cards exist.
- **Price Badge Layout Breaks**: Strikethrough price, current price, and "Save $X.XX" chips occasionally wrapped onto two lines on long discount strings, pushing card content downwards.
- **Redundant Decorative Emojis**: Category pills mixed emojis and text (`✨ All`, `🥐 Pastry`, etc.), which enlarged pill height and caused vertical misalignment.

### 1.2 Customer Header & Navigation (`CustomerApp.jsx`, `CustomerHeader.jsx`)
- **Header Crowding**: Multiple icons (store logo, location dropdown with chevron, leaf icon, sparkles badge, notification bell, cart button) squeezed into a single row on 360px screens.
- **Bottom Navigation**: Tab heights varied, active indicator was inconsistent between screens, and touch target was less than 44px on smaller viewports.

### 1.3 Merchant Dashboard & Orders (`MerchantDashboard.jsx`, `MerchantOrders.jsx`)
- **Metric Cards Layout**: 3 or 4 metric cards (`Revenue`, `Bags Rescued`, `Pickups`) placed side-by-side with heavy icon wrappers, forcing numbers like `$124.50` to wrap awkwardly on mobile.
- **Order Action Rows**: Customer pickup verification rows had long item names pushing the "Verify" button off-screen or compressing customer avatar.

---

## 2. Icon Pruning Strategy: "Clean Modern Minimalism"

### Rules:
1. **Remove Decorative Emojis & Redundant Icons**:
   - Category chips: Text-only pills (`All`, `Bakery`, `Meals`, `Groceries`, `Italian`, `Healthy`).
   - Badges: Plain text status pills (`JUST LISTED`, `SOLD OUT`, `59% OFF`).
   - Cards: Remove redundant `Sparkles`, `Flame`, and secondary decorative glyphs.
2. **Retain Functional High-Value Icons (Always with `shrink-0`)**:
   - `Search` (shrink-0 w-4 h-4 text-stone-400)
   - `ShoppingBag` (shrink-0 w-4 h-4)
   - `Star` (shrink-0 w-3.5 h-3.5 fill-amber-400 text-amber-400)
   - `Navigation` / `MapPin` (shrink-0 w-3.5 h-3.5)
   - `Clock` (shrink-0 w-3.5 h-3.5 text-stone-400)
   - `ChevronRight` / `ChevronDown` (shrink-0 w-4 h-4)
   - `X` / Close (shrink-0 w-4 h-4)
   - `Plus` / `Minus` (shrink-0 w-4 h-4)
   - `QrCode` / `Camera` (shrink-0 w-4 h-4)

---

## 3. Standardized Design Tokens & Ergonomic Constraints

| Token / Element | Standard Specification | Rationale |
|---|---|---|
| **Mobile Max Width** | `max-w-md` (~448px) centered | Native smartphone framing on desktop; 100% full width on mobile |
| **Card Border Radius** | `rounded-2xl` (`16px`) | Consistent Foodlink card geometry |
| **Button Border Radius** | `rounded-xl` (`12px`) | Ergonomic thumb tap surface |
| **Pill / Chip Radius** | `rounded-full` (`9999px`) | Classic mobile category chip |
| **Minimum Touch Target** | `min-h-[44px] min-w-[44px]` | Apple HIG & Android Material accessibility standard |
| **Primary Color** | `#2E7D32` (Forest Green) | Foodlink trust and action color |
| **Urgency Color** | `#FF8A3D` (Urgency Orange) | Discount badges and countdowns |
| **Surface Neutral** | `#FAFAFA` (App canvas), `#FFFFFF` (Cards) | High contrast, clean backdrop |

---

## 4. Single-Column Food Rescue Card Layout

```text
+-----------------------------------------------------------+
| [ HERO IMAGE - 16:9 Aspect Ratio - rounded-t-2xl ]        |
|  [59% OFF Badge]                              [Save $5.00]|
+-----------------------------------------------------------+
| Store Name                           ★ 4.9 (128)          |
| Surplus Bag Title (single-line truncate)                  |
| Pickup Window · Distance                                  |
|-----------------------------------------------------------|
| $3.50  $8.50                                [Claim Deal]  |
+-----------------------------------------------------------+
```
- No partial cut-offs.
- Predictable 1-column scroll.
- Uniform card heights across all items.

