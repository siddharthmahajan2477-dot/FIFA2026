# FIFA World Cup 2026 Stadium OS: Reusable Page Templates & Layout Blueprints

This document defines the Reusable Page Templates, Layout Blueprints, and Design Pattern Architecture for Stadium OS. It standardizes card layouts, column splits, dashboard compositions, search filters, and empty state patterns to ensure scalability across all modules.

---

## 1. Page Template Library

Every view in the application inherits from one of four master page templates:

```
┌────────────────────────────────────────────────────────┐
│                   PAGE LAYOUT SCHEMAS                  │
├───────────────────┬───────────────────┬────────────────┤
│ Template Name     │ Column Layout     │ Target Use     │
├───────────────────┼───────────────────┼────────────────┤
│ 1. Telemetry      │ 3-Column Grid     │ Command Center,│
│    Dashboard      │ Collapsible Right │ Operations     │
├───────────────────┼───────────────────┼────────────────┤
│ 2. Spatial Map    │ Full Viewport     │ Security, Fan  │
│    Command        │ Float Overlays    │ Wayfinding     │
├───────────────────┼───────────────────┼────────────────┤
│ 3. Data Grid      │ 1-Column Table    │ Logs, Schedules│
│    Log            │ Sticky filters    │ Analytics list │
├───────────────────┼───────────────────┼────────────────┤
│ 4. Master-Detail  │ Split Pane        │ Incident Triage│
│    Form           │ (30% list/70% det)│ Diagnostics    │
└───────────────────┴───────────────────┴────────────────┘
```

---

## 2. Page Templates Specifications

### 2.1. Operational Dashboard Template
*   **Purpose:** Monitors active telemetry inputs (turnstiles, utilities, transit wait times).
*   **Typical Layout:** Top Header -> KPI summaries ribbon -> 3-Column main content grid -> Collapsible right AI assistant drawer.
*   **Widget Areas:** Metric cards (top row), multi-line charts (middle left), active alarms (middle right), AI recommendation list (bottom row).
*   **Responsive Behaviour:** 3 columns (desktop) reflow to 2 columns (tablet) and collapse to a single-column stack on mobile PWAs.
*   **Accessibility Requirements:** Tab navigation loop across metric cards, ARIA live metrics indicators.

### 2.2. Master-Detail Diagnostics Template
*   **Purpose:** Manages specific entities (active incident triage, volunteer profiles, device diagnostics).
*   **Typical Layout:** Split-Pane. Left panel (30% width) lists items with search/filter headers. Right panel (70% width) displays selected item details and actions.
*   **Widget Areas:** Item filter search bar (left top), item scroll list (left bottom), detail header stats (right top), timeline/history log (right center), action confirmation toolbar (right bottom).
*   **AI Integration:** Detail views include AI summaries of active state logs and suggested dispatches.
*   **Responsive Behaviour:** Left panel collapses into an off-screen drawer on viewports `< 1024px`, toggled by a "Show List" floating button.

---

## 3. Standardized Filter & Search Layout Patterns

To keep queries consistent, all search tables implement a unified **Interactive Filter Bar Layout**:

```
┌────────────────────────────────────────────────────────┐
│                 INTERACTIVE FILTER BAR                 │
├────────────────────────────────────────────────────────┤
│ Search Input [🔍 Search match, gate, or responder...] │
├───────────────────┬───────────────────┬────────────────┤
│ Date Range Select │ Status Dropdown   │ Zone Selector  │
├───────────────────┴───────────────────┴────────────────┤
│ [Clear Filters]                         [Saved Views v]│
└────────────────────────────────────────────────────────┘
```

*   **Quick Filters Ribbon:** Horizontal tag container containing active choices (e.g. *Only Critical Alerts*, *Zone A*, *Assigned Responders*). Clicking a tag deactivates the filter dynamically.
*   **Advanced Filter Panel:** Expandable drawer containing selectors for date ranges, role-based boundaries, and location coordinates.

---

## 4. Reusable Empty & Loading States

Every layout defines structural configurations for non-active states:

*   **No Data State:** Displays a centered, high-contrast category icon, a clean 2-sentence feedback label (e.g., *"No Active Incidents. All gates are currently running within safe margins"*), and a primary action button (e.g., *"Manually Create Log"*).
*   **Restricted Access State:** Displays a locked shield icon, a text label (*"Clearance Required"*), and a button returning to the default dashboard.
*   **Loading State (Skeleton Layout):** Layout boundaries display matching skeleton boxes with a pulsing keyframe gradient animation, preventing layout jumps when data loads.
