# FIFA World Cup 2026 Stadium OS: Navigation System & Application Shell Architecture

This document defines the complete Navigation System, Information Flow, and Application Shell Architecture for Stadium OS. It establishes the global workspace layout, role-based navigation routes, search experience guidelines, and error redirection protocols.

---

## 1. Global Application Shell Layout

The global application shell serves as the unified frame hosting all platform modules. The layout coordinates adapt dynamically based on screen size:

```
┌────────────────────────────────────────────────────────┐
│               GLOBAL APPLICATION SHELL                 │
├────────────────────────────────────────────────────────┤
│ Top Header: Selector, Breadcrumb, Search, Profile      │
├───────────────────┬────────────────────────────────────┤
│ Sidebar Nav       │ Workspace Area (Dynamic Content)   │
│ (Primary routes,  ├────────────────────────────────────┤
│ collapsible)      │ Context Drawer / AI Assistant Panel│
└───────────────────┴────────────────────────────────────┘
```

### 1.1. Core Shell Components
*   **Global Header:** Houses the Stadium Selector dropdown, dynamic Breadcrumb path, Global Search input, and the User Profile configurations selector.
*   **Primary Sidebar Navigation:** Positioned on the left side of the screen. Holds icons + labels for primary routes. Collapses to icons-only on tablet viewports.
*   **Context-Drawer (Right Edge):** Slides out to reveal secondary information, detail logs, or the **AI Command Copilot Chat**.
*   **Workspace Area:** The primary responsive grid container displaying the active page or dashboard widgets.

---

## 2. Role-Based Navigation Routing Trees

To prevent cognitive overload, navigation menus display only permitted modules relevant to the authenticated user role:

```
                  ┌──────────────────────────────┐
                  │       Role Authenticator      │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│     Fan Menu     │   │  Volunteer Menu  │   │  Operations Menu │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ - Match Center   │   │ - Task Board     │   │ - Security Center│
│ - Accessibility  │   │ - Ticket Scanner │   │ - Sustainability │
│ - Transit Maps   │   │ - Translator PWA │   │ - Digital Twin   │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

*   **Fan Menu:** Match Center, Wayfinding Maps, Digital Tickets, Concessions, Accessibility Request, Public Transit.
*   **Volunteer Menu:** Active Task Board, QR Scanner, Translator, Incident Reporter.
*   **Security Menu:** Interactive Stadium Map (CV Overlay), Dispatch Log, Turnstile Controls, Responder Tracking.
*   **Operations Menu:** Utility Grid, Sustainability Dashboard, Device Diagnostics, Digital Twin Viewport.
*   **Executive Menu:** Multi-Stadium Overview, Sentiment Metrics, Report Generator.

---

## 3. Dynamic Breadcrumb System & Memory

Breadcrumbs provide hierarchical location tracking and back-navigation capabilities:
*   **Visual Format:** `Module Root > Active Category > Item Name` (e.g., `Stadium Operations > Gate Management > Gate 3`).
*   **Navigation Memory:** Breadcrumbs track filter and sorting states. Clicking a parent link (e.g., returning to `Gate Management` from `Gate 3`) restores the user's previously configured table search and column filters.
*   **Context Awareness:** During active emergencies, breadcrumbs are disabled and replaced by a locked red banner labeled: `EMERGENCY EVACUATION SOP ACTIVE > EXIT PATHS DIRECTIVE`.

---

## 4. Universal Search Experience

The search input in the global header handles raw queries using semantic parsing models:
*   **Global NLP Queries:** Typing *"Find nearest medical guard to Section 102"* returns a direct link that opens the responder GPS dot on the map and pins their profile card.
*   **Result Categorization:** Results group matches into: *People (Volunteers/Responders), Places (Gates/Sensors), Events (Incidents), and Knowledge SOPs*.

---

## 5. Floating Quick Actions FAB Catalog

To expedite critical tasks in fast-moving stadium environments, a persistent Floating Action Button (FAB) anchors to the bottom-right viewport on mobile viewports:
*   **Volunteer FAB:** Quick Incident Report, Open Mobile Translator.
*   **First Responder FAB:** Incident Triage Log, Trigger Medical Help, Panic Alarm.
*   **Stadium Operator FAB:** Dispatch Guard, Open AI Copilot, Broadcast Announcement.

---

## 6. Error, Offline & Restricted Redirection Logic

When navigation pathways fail or access constraints change, the shell handles states gracefully:

*   **Restricted Access (RBAC Failures):** Instead of showing a broken page, the system displays a secure modal stating: *"Access Restricted. High-level security clearances required."* A button redirecting back to the role's default dashboard is provided.
*   **Missing Pages (404 Error):** Redirects automatically to the Home module, printing a brief toast notification.
*   **Offline Operation Redirection:** If connectivity drops, non-cached modules in the sidebar display a grayed-out "Offline Stale" badge. Clicking them opens the local offline task logs or ticket QR passes, prompting: *"Stadium network offline. Rerouting to cached offline resources."*
