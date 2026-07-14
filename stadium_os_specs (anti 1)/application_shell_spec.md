# Stadium OS: Application Shell & Core Layout System Specification

This document defines the visual design specifications and layout dimensions for the Stadium OS Application Shell, establishing the reusable framework that hosts all platform modules.

---

## 1. High-Fidelity UI Mockups

### 1.1. Desktop Command Viewport Shell
The desktop shell is designed as a high-density, multi-panel workspace. It features a persistent left navigation sidebar, top utility header, and an expandable right AI Copilot drawer.

![Desktop Application Shell Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/desktop_application_shell_1783458520048.png)

### 1.2. Mobile PWA Viewport Shell
The mobile shell is optimized for single-hand touch control. It consolidates primary actions into a fixed bottom navigation bar and places a floating AI Assistant button at the thumb-reachable bottom-right corner.

![Mobile PWA Shell Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/mobile_pwa_shell_1783458534937.png)

---

## 2. Layout Grid & Panel Specifications

The application shell is divided into four key visual regions:

```
┌────────────────────────────────────────────────────────┐
│                   SHELL REGIONS GRID                   │
├─────────────────┬──────────────────┬───────────────────┤
│ Region Name     │ Desktop Width    │ Mobile Reflow     │
├─────────────────┼──────────────────┼───────────────────┤
│ Sidebar Nav     │ 240px            │ Slide-out Drawer  │
│ Top Header      │ 100% (fixed 64px)│ 100% (fixed 56px) │
│ Workspace Grid  │ Fluid            │ Scrollable Stack  │
│ Context Panel   │ 320px            │ Bottom Sheet      │
└─────────────────┴──────────────────┴───────────────────┘
```

*   **Left Sidebar Navigation (Desktop):** Width is fixed at 240px. Transitions to a collapsed icons-only layout (80px width) on tablet screens.
*   **Global Header Bar:** Fixed height of 64px. Contains the stadium context dropdown, notification bell, global search, and role switcher.
*   **Dynamic Workspace Container:** Uses CSS flex grids with 24px margins. Content inside automatically wraps and resizes dynamically.
*   **AI Copilot Side-Drawer:** Width is fixed at 320px, sliding out from the right screen edge.

---

## 3. Top Header Bar Interactive Components

*   **Stadium Selector Dropdown:** Placed on the far left. Allows executives and operators to toggle contexts between different World Cup venues (e.g. *MetLife Stadium*, *Azteca*, *BC Place*).
*   **Role Switcher:** Allows operators to simulate different user profiles (Fan, Volunteer, Responder, Security) directly in the prototype to verify RBAC configurations.
*   **Global Search Input:** Features a 🔍 icon, autocompleting queries for match IDs, gates, sensors, and security personnel.
*   **Notification Bell:** Displays active badge counts. Clicking opens a dropdown menu listing recent alarms, alerts, and recommendations.

---

## 4. Reusable Layout States

*   **Pulsing Loading Skeletons:** Cards render matching gray skeleton containers during data updates, using a shifting layout gradient animation.
*   **Error Warning Panel:** Renders in the workspace grid when system adapters fail, displaying a warning badge and a retry confirmation button.
*   **Offline Indicator Banner:** Displays at the top of the header bar during connection drops, showing: `NETWORK DISCONNECTED - OPERATING IN OFFLINE CACHE MODE`.
