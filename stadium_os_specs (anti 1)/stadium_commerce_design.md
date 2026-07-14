# Stadium OS: Smart Stadium Commerce Platform Specification

This document defines the user experience, layout, and visual designs for the Smart Stadium Commerce Platform, serving as the concessions and merchandise transaction hub for Stadium OS.

---

## 1. Visual Shell Layout Blueprint (Desktop View)

The Commerce Operations Dashboard inherits our Pitch-Obsidian theme, utilizing a 3-column layout to organize concessions locations, inventory analytics, and AI pricing/promotion options:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STADIUM OS  [MetLife Stadium v]                 [Role: Organizer v]    [🔍 Search...]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard    │ BREADCRUMB: Stadium Operations > Concessions Control                    │
│ Match Center │ ┌─────────────────────────────────────────────────────────────────────┐ │
│ Ingress      │ │ LIVE COMMERCE KPIs                                                  │ │
│*Concessions  │ │ [Sales: $142.5K] [Peak Load: Stall 3 (F&B)] [Avg Wait: 4.5 mins]     │ │
│ Transit      │ └─────────────────────────────────────────────────────────────────────┘ │
│ Parking      │ ┌───────────────────────────────┬─────────────────────────────────────┐ │
│ Volunteers   │ │ 2D CONCESSIONS GRID MAP       │ SALES & INVENTORY METRICS           │ │
│ Security     │ │                               │                                     │ │
│ Medical      │ [Concessions Grid Canvas]       │ Stall 1 (Burgers): 45 orders active │ │
│ Sustainability │                               │ Inventory: Buns Lot A at 18% (LOW)  │ │
│ Reports      │ │ - Live stall queue indicators │ Outlets active: 14 official stores  │ │
│ Config       │ │ - Low wait zones (Neon Green) │                                     │ │
│              │ │ - High wait zones (Neon Red)  │ [Trigger Promo]   [Restock Order]   │ │
│              │ └───────────────────────────────┴─────────────────────────────────────┘ │
│              │ ┌─────────────────────────────────────────────────────────────────────┐ │
│              │ │ AI PROACTIVE PROMOTION DISPATCH                                     │ │
│              │ │ "Stall 4 (Merchandise) is showing below-average conversion rates.   │ │
│              │ │ Suggest dispatching a 15% coupon for France Jerseys to Fans in the  │ │
│              │ │ adjacent Section 104. Estimated conversions: +24%."                 │ │
│              │ │ [Apply Target Discount]                            [Dismiss Alert]  │ │
│              │ └─────────────────────────────────────────────────────────────────────┘ │
└──────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layout Grid & Panel Specifications

The Desktop Commerce Dashboard is split into three core zones:

*   **Left Context Navigation Panel (Sidebar):** Maintains active selections, highlighting the *Concessions* tab. Displays a secondary list of commerce categories (Restaurant Directory, Food Courts, Merchandise Stores, Inventory Levels, Vendor Analytics, Order Histories).
*   **Center Workspace Area (Fluid Layout):**
    *   *Live Commerce KPIs Ribbon:* Displays status boxes with color-coded HSL borders (e.g. *Sales: Green/Nominal*, *Wait Time: Yellow/Medium*, *Inventory: Red/Low Warning*).
    *   *Interactive Concessions Map:* Renders a real-time GIS map displaying individual stalls, queue heatmaps, and stock replenishment paths.
    *   *Sales Analytics charts:* plots transactions per minute using vertical bars, highlighting peak checkout times.
*   **Right AI Advisory Panel:** Displays automated inventory predictions, queue forecasting, and personalized discount recommendations.

---

## 3. Responsive Mobile PWA Commerce Portal (Fan & Volunteer Views)

The mobile view stacks layouts vertically, prioritizing menus browsing and order tracking:

*   **Top Metric Card:** Displays order status summaries (e.g., *Preparing, Ready for Pickup, Dispatched for Seat Delivery*).
*   **Menu and Directory Selector:** Displays options filtered by dietary requirements (Vegetarian, Vegan, Gluten-Free, Halal) and allergen indicators.
*   **Dynamic Order Ticket Pass:** Displays a pickup validation barcode with order items details.
*   **Concession Proximity Warning:** AI recommends adjacent stalls with shorter queues (e.g., *"Burger Stall 1 wait time: 14 mins. Walk 20m further to Grill Stall 2. Wait time: 3 mins"*).

---

## 4. Operational AI Commerce Functions

*   **Queue-Based Dynamic Pricing/Promotions:** Automatically pushes discounts to fans in nearby sections when adjacent vendor conversions drop.
*   **Inventory Forecast Alerting:** Evaluates sales rates to predict ingredient depletion times (e.g. *"Burger bun depletion forecasted in 30 mins for Section 104 outlets. Recommending transfer of 200 units from Section 200 storage"*).
*   **Seat Delivery Optimizations:** Computes shortest navigation paths for delivery volunteers, avoiding congested zones.
*   **Personalized Matchday Meals:** Suggests combo deals on Fan PWAs based on team affiliation and purchase histories.
