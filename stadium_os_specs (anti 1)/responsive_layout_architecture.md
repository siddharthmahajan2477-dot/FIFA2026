# FIFA World Cup 2026 Stadium OS: Enterprise Responsive Layout Architecture

This document defines the Responsive Layout Architecture and Adaptive Experience standards for Stadium OS. It establishes how components, navigation structures, and data visualization interfaces adjust across viewports to maintain structural integrity and usability.

---

## 1. Responsive Layout Grid & Spacing System

The layout system relies on a **Decoupled Flex-Grid System**. Breakpoints are categorized into five primary display profiles:

```
┌────────────────────────────────────────────────────────┐
│                   VIEWPORT PROFILES                    │
├───────────────┬───────────────────┬────────────────────┤
│ Viewport Class│ Width Threshold   │ Grid Columns       │
├───────────────┼───────────────────┼────────────────────┤
│ Mobile        │ < 640px           │ 4-Column Flex      │
│ Tablet        │ 640px – 1024px    │ 8-Column Grid      │
│ Laptop        │ 1024px – 1440px   │ 12-Column Grid     │
│ Desktop       │ 1440px – 1920px   │ 12-Column Grid     │
│ Control Room  │ > 1920px          │ 24-Column Grid     │
└───────────────┴───────────────────┴────────────────────┘
```

### 1.1. Grid Reflow Mechanics (Dynamic Rearrangement)
*   **Mobile (< 640px):** Single-column stacks. Spacing margins are set to 12px to maximize screen space. Sidebars collapse, and primary action items are consolidated into bottom sheets.
*   **Tablet (640px – 1024px):** Split-view layouts. Grid margins are set to 16px. Sidebars slide off-screen, and key elements (e.g. lists and details maps) display side-by-side.
*   **Laptop & Desktop (1024px – 1920px):** Multi-column dashboard layouts. Grid margins are set to 24px. The left sidebar remains persistent, and the right AI Copilot drawer is expandable.
*   **Control Room / Large Displays (> 1920px):** 24-column grids. Dashboards display spatial digital twin overlays, live CCTV grids, and real-time operations telemetry cards simultaneously without pagination.

---

## 2. Component-Level Structural Adaptation

Components adapt layout properties to match viewport limitations:

```
                  ┌──────────────────────────────┐
                  │     Component Ingress        │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   Desktop View   │   │   Tablet View    │   │   Mobile View    │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ Multi-col table  │   │ Hide low-priority│   │ Stack card list  │
│ 12-col grid map  │   │ Split pane map   │   │ Swipe-up drawer  │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

*   **Metric Cards:** Grid patterns collapse from a 4-column row (desktop) to a 2-column grid (tablet), and stack into a single-column layout on mobile viewports.
*   **Data Tables:** Columns are prioritized by operational value. Desktop displays 8 columns. Tablets hide secondary columns (e.g. historical data) to display only 5 columns. Mobile viewports collapse the table into a scrollable vertical card list, prioritizing status badges and main titles.
*   **Interactive Maps:** Desktop displays the map in a large central workspace panel with floating controls. Mobile viewports place the map on a dedicated tab, replacing sidebars with swipe-up bottom drawers for details.
*   **Form Layouts:** Multi-column inputs (e.g., first name beside last name) stack into a single-column form on mobile screens to ensure easy scrolling.

---

## 3. Responsive Navigation Systems

*   **Desktop Workstation:** Left sidebar remains expanded (icons + labels). Top header bar contains global selectors. AI Copilot drawer is persistent on the right side of the screen.
*   **Tablet Viewport:** Left sidebar collapses to icons-only. AI Copilot collapses into a floating widget, expanding as a slide-over panel on tap.
*   **Mobile PWA Viewport:** Top header bar houses the hamburger toggle menu (for secondary links) and notifications. The bottom navigation bar is locked to the screen, displaying exactly 4 role-specific keys. The FAB is anchored to the bottom right.

---

## 4. Responsive Data Visualization & Charts

*   **Real-Time Charts:** Graph boundaries adjust dynamically to match parent container grids. Chart legends position below the chart on mobile viewports to preserve width, and labels collapse to avoid overlaps.
*   **Heatmaps:** Spatial overlays scale to match screen ratios. Mobile viewports display a simplified grid overlay, allowing users to tap to reveal density metrics in a bottom sheet.
*   **Executive Reports:** Desktop displays side-by-side comparison tables. Mobile viewports display single-metric summaries with accordion menus for details.

---

## 5. Interaction Patterns & Touch Safety

*   **Tap Targets:** Mobile and tablet touch targets must be a minimum of 48px by 48px to prevent accidental selections.
*   **Gestures support:** Tablets and mobile viewports integrate swipe actions (dismiss alerts, swipe-up details drawers, pinch-to-zoom maps). Desktop layouts replace these with clicks and drag-and-drop actions.
*   **Hover states:** Disabled on touch devices to prevent state conflicts, replacing hover tooltips with explicit tap popovers.

---

## 6. Future Device Compatibility

*   **Foldable Devices:** Layout splits adapt dynamically. When partially folded (Flex Mode), the map shifts to the top fold and control inputs position on the bottom fold.
*   **Wearables & Smart Glasses:** Notifications collapse to high-contrast alert symbols with one-word actions (e.g. "ACKNOWLEDGE" or "DISPATCH").
*   **Vehicle Displays:** Layouts switch to landscape mode, displaying high-contrast icons, simplified maps, and large target controls.
