# Stadium OS: Enterprise Asset Management & Predictive Maintenance Platform Specification

This document defines the user experience, layout, and visual designs for the Enterprise Asset Management and Predictive Maintenance Platform, serving as the hardware and utilities diagnostic hub for Stadium OS.

---

## 1. Visual Shell Layout Blueprint (Desktop View)

The Asset Management Dashboard inherits our Pitch-Obsidian theme, utilizing a 3-column layout to organize hardware inventories, active work orders, and AI predictive maintenance options:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STADIUM OS  [MetLife Stadium v]                 [Role: Organizer v]    [🔍 Search...]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard    │ BREADCRUMB: Stadium Operations > Asset Management                       │
│ Match Center │ ┌─────────────────────────────────────────────────────────────────────┐ │
│ Ingress      │ │ LIVE ASSET HEALTH                                                   │ │
│ Concessions  │ │ [Turnstiles: 98.4%] [Elevators: 92.1%] [HVAC Systems: 99.1%]        │ │
│ Transit      │ └─────────────────────────────────────────────────────────────────────┘ │
│ Parking      │ ┌───────────────────────────────┬─────────────────────────────────────┐ │
│ Access       │ │ ACTIVE MAINTENANCE BOARD      │ PREDICTIVE ASSET DIAGNOSTICS        │ │
│ Comm         │ │                               │                                     │ │
│ Security     │ [Work Orders & Tasks Grid]      │ HVAC Zone B: RUL 14 days (Filter replacement)│ │
│ Medical      │                                 │ Turnstile Gate 3: High sensor drops  │ │
│ Sustainability │ - Active dispatches list      │ Escalator 2: Normal operation        │ │
│ Reports      │ │ - Scheduled maintenance dates │                                     │ │
│*Assets       │ └───────────────────────────────┴─────────────────────────────────────┘ │
│              │ ┌─────────────────────────────────────────────────────────────────────┐ │
│              │ │ AI PREDICTIVE DISPATCH                                              │ │
│              │ │ "Turnstile #4 at Gate 3 shows sensor anomaly. Predicted failure      │ │
│              │ │ probability: 94% within 12 hours. Suggest dispatching Tech Ramon."  │ │
│              │ │ [Dispatch Ramon to Gate 3]                         [Dismiss Alert]  │ │
│              │ └─────────────────────────────────────────────────────────────────────┘ │
└──────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Layout Grid & Panel Specifications

The Desktop Asset Dashboard is split into three core zones:

*   **Left Context Navigation Panel (Sidebar):** Maintains active selections, highlighting the *Assets* tab. Displays a secondary list of asset categories (Turnstiles, HVAC Systems, Elevators/Escalators, Network Hardware, Server Diagnostics, Fire Safety, Maintenance Calendar).
*   **Center Workspace Area (Fluid Layout):**
    *   *Asset Health Ribbon:* Displays status boxes with color-coded HSL borders (e.g. *Turnstiles: Green/Nominal*, *Elevators: Yellow/Caution*, *HVAC: Green/Nominal*).
    *   *Interactive Work Orders Grid:* Renders a table listing active maintenance requests, assigned technicians, spent parts, and completion status.
    *   *Downtime analysis charts:* plots equipment off-line durations using vertical bars, highlighting peak failure months.
*   **Right AI Advisory Panel:** Displays automated failure predictions, remaining useful life (RUL) indicators, and technician schedule suggestions.

---

## 3. Responsive Mobile PWA Technician View

The mobile view stacks layouts vertically, prioritizing check-in checklists and asset navigation maps:

*   **Top Work Order Card:** Displays the technician's assigned tasks (e.g., *"Replace sensor on Turnstile #4 at Gate 3"*).
*   **Asset Location Wayfinding Card:** Integrates with the stadium's 2D digital twin layout, drawing path lines to the targeted hardware asset.
*   **Dynamic Repair Checklist Form:** Technicians checkbox task steps, cataloging spare parts consumption and entering audit notes.
*   **Diagnostic scanner FAB Button:** Anchored to the bottom right, allowing technicians to scan QR codes on physical assets to pull spec sheets and maintenance history logs instantly.

---

## 4. Operational AI Asset Management Functions

*   **Remaining Useful Life (RUL) Forecasting:** AI evaluates IoT vibration, temperature, and current draw sensors to forecast failure risks before triggers occur.
*   **Proactive Maintenance Scheduling:** Schedules repairs during non-matchday hours, reducing crowd impacts.
*   **Smart Technician Dispatch Routing:** AI matches technician certifications and geofences coordinates to assign tasks (e.g. *"Assign Elevator 2 repair to certified technician Ramon. Location: Section 104. Distance: 45m"*).
*   **Inventory Parts Replenishment Alerts:** Automatically checks spare parts lists when repairs complete, compiling re-order documents when stocks drop below safety thresholds.
