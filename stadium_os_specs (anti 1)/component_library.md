# FIFA World Cup 2026 Stadium OS: Reusable Component Library Specification

This document defines the complete reusable component library for Stadium OS. It catalogues the interface components, specifying their purposes, states, behaviors, accessibility compliance, and structural hierarchies, serving as the construction guide for the platform's UI.

---

## 1. Component Hierarchy Model

To achieve scalability and consistency, the components are classified into six structural layers:

```
┌────────────────────────────────────────────────────────┐
│                   GLOBAL COMPONENTS                    │
│           (Top Nav, Sidebar, Mobile PWA Nav)           │
├────────────────────────────────────────────────────────┤
│                    LAYOUT TEMPLATES                    │
│      (Dashboard Grid, Split Command, Scroll Map)        │
├────────────────────────────────────────────────────────┤
│                     PAGE SECTIONS                      │
│      (Incident Dispatch Panel, Tactical Match Tab)      │
├────────────────────────────────────────────────────────┤
│                   COMPLEX COMPONENTS                   │
│          (Interactive Stadium Map, AI Copilot)         │
├────────────────────────────────────────────────────────┤
│                  COMPOSITE COMPONENTS                  │
│       (AI Insight Card, Form Group, Metric Card)       │
├────────────────────────────────────────────────────────┤
│                   ATOMIC COMPONENTS                    │
│      (Button, Icon, Text Label, Status Badge, Input)   │
└────────────────────────────────────────────────────────┘
```

1.  **Atomic Components:** Basic, non-divisible design elements (e.g., buttons, input controls, badges, icons, text tags).
2.  **Composite Components:** Simple groupings of atomic units functioning together (e.g., text field + label + helper message; metric number + status icon).
3.  **Complex Components:** Multi-composite structures containing internal states and data bindings (e.g., dynamic tables, inline charts, data feeds).
4.  **Page Sections:** Structured clusters forming complete content areas (e.g., active incident log side-panel, concessions ordering queue list).
5.  **Layout Components:** Page wrappers defining grid cells, spacing margins, and scroll settings.
6.  **Global Components:** Singletons present throughout the application workspace (e.g., left sidebar, top header, global notification manager).

---

## 2. Reusable Component Catalog & Rules

### 2.1. Navigation Components

#### Top Navigation (Global Header)
*   **Purpose:** Houses global workspace configurations, user profile access, and high-level venue notifications.
*   **Usage Guidelines:** Positioned at the top of desktop and tablet viewports.
*   **Variants:** *Desktop Expanded* (includes search bar), *Mobile Collapsed* (logo and notification button only).
*   **States:** *Default*, *Sticky-Scrolled* (frosted glass blur background enabled).
*   **Responsive Behaviour:** Search input collapses into a search icon on tablet sizes; full profile settings hide within a sidebar toggle menu on mobile.
*   **Accessibility Requirements:** Role `banner`, labels on notifications buttons, keyboard tab navigation to items.
*   **Reusability Rules:** Shared across all pages.

#### Sidebar (Primary Desktop Navigation)
*   **Purpose:** Houses the primary page directories for desktop and command center consoles.
*   **Usage Guidelines:** Locked to the left screen edge. Can collapse to icons-only.
*   **Variants:** *Expanded* (Icon + text labels), *Collapsed* (Icon only with tooltips).
*   **States:** *Active Page* (primary green outline and background glow), *Default*, *Hover* (elevated background).
*   **Responsive Behaviour:** Automatically slides off-screen into a hamburger drawer on viewports `< 1024px`.
*   **Accessibility Requirements:** Role `navigation`, active state indicated via `aria-current="page"`, visible keyboard focus.
*   **Reusability Rules:** Configured dynamically based on user role authentication permissions.

#### Bottom Navigation (Mobile PWA)
*   **Purpose:** Houses primary mobile and PWA routes, optimized for single-hand touch control.
*   **Usage Guidelines:** Locked to viewport bottom for screens `< 640px`. Must contain exactly 4 action routes.
*   **Variants:** *Fan Layout*, *Volunteer Layout*, *Responder Layout*.
*   **States:** *Active Item* (green brand color), *Inactive* (muted gray color).
*   **Responsive Behaviour:** Hidden on viewports `> 640px`.
*   **Accessibility Requirements:** Semantic `<nav>`, target click size `min-width: 48px`, matching labels for screen readers.
*   **Reusability Rules:** Shared across all mobile-role profiles.

---

### 2.2. Buttons

#### Basic Button
*   **Purpose:** Triggers actions, form submissions, and state transitions.
*   **Usage Guidelines:** Use primary style for positive confirmations, secondary for backactions, ghost for secondary options, and danger for alerts.
*   **Variants:** *Primary* (green fill), *Secondary* (border outline), *Ghost* (text only), *Icon-Only* (square layout), *Danger* (crimson fill), *Loading* (disables action and renders loading spinner).
*   **States:** *Default*, *Hover* (background tint shift), *Active/Focus* (focus outline), *Disabled* (low opacity, rejects click events).
*   **Responsive Behaviour:** Stack vertically on mobile screen form layouts.
*   **Accessibility Requirements:** Focus outlines, keyboard triggerable via Space and Enter keys, `aria-disabled` matching state.

#### Floating Action Button (FAB)
*   **Purpose:** Triggers high-priority quick actions (e.g., Volunteer incident logging).
*   **Usage Guidelines:** Anchored to bottom right viewport corners on mobile screen templates.
*   **Variants:** *Standard Circular*, *Extended* (Circular + text label).
*   **States:** *Default*, *Pulsing Alert* (when urgent response action is required).
*   **Responsive Behaviour:** Hidden on desktop viewports where sidebar quick links are present.
*   **Accessibility Requirements:** `aria-haspopup="dialog"`, descriptive labels.

---

### 2.3. Cards (Telemetry & Operational Panels)

#### Telemetry / Metric Card
*   **Purpose:** Displays high-density operational metrics (scans/min, HVAC offset, transit wait time).
*   **Usage Guidelines:** Grid layout configuration. Uses monospace typography.
*   **Variants:** *Match Stats Card*, *Gate Card*, *Parking Card*, *Sustainability Card*, *Weather Card*.
*   **States:** *Normal*, *Warning* (orange highlights), *Critical* (glowing pulsing red borders).
*   **Responsive Behaviour:** Spans full-width in single-column mobile views.
*   **Accessibility Requirements:** Focus outline, semantic headings, color-independent warning icons.
*   **Reusability Rules:** Universal data grid card template.

#### AI Recommendation Card
*   **Purpose:** Displays proactive AI-generated operational and sustainability optimizations.
*   **Usage Guidelines:** Visually highlighted. Always includes clear rationale and execution button actions.
*   **Variants:** *Operations Card*, *Concessions Suggestion*, *Transit Suggestion*.
*   **States:** *Pending Approval*, *Executing*, *Executed/Applied* (disabled action button).
*   **Responsive Behaviour:** Can expand into full-view modal checklists on mobile screens.
*   **Accessibility Requirements:** `aria-live="polite"`, color contrast compliance on green outline.
*   **Reusability Rules:** Utilized throughout the Command Center and Mobile PWA logs.

#### Incident / Alert Card
*   **Purpose:** Displays security, logistics, or medical emergencies.
*   **Usage Guidelines:** Contains category icons, severity tags, coordinates, and dispatch options.
*   **Variants:** *Critical Alert*, *Standard Warning*, *Informational Log*.
*   **States:** *Unassigned* (pulsing outline), *Dispatched* (yellow progress), *Resolved* (gray muted).
*   **Responsive Behaviour:** Expandable detail logs drawer.
*   **Accessibility Requirements:** Role `alert`, high contrast, screen reader announcement notifications.

---

### 2.4. Data Display

#### Dynamic Table / Data Grid
*   **Purpose:** Presents tabular telemetry indices, volunteer schedules, and incident historical logs.
*   **Usage Guidelines:** Integrates filters, pagination controls, and row clicks.
*   **Variants:** *Compact Telemetry Grid*, *Standard Schedule Table*.
*   **States:** *Loading* (renders skeleton items), *Empty* (renders help messages), *Row-Selected*.
*   **Responsive Behaviour:** Hides secondary columns on tablet viewports; converts to a list view on mobile.
*   **Accessibility Requirements:** Roles `table`, `thead`, `tbody`, keyboard-traversable grid cells.

#### Real-Time Telemetry Chart
*   **Purpose:** Graphs ingress rates, energy load patterns, and queue projections.
*   **Usage Guidelines:** Rendered within dashboard containers.
*   **Variants:** *Multi-line graph*, *Staged bar chart*, *Circular occupancy gauge*.
*   **States:** *Default*, *Hover* (displays coordinate tooltips).
*   **Responsive Behaviour:** Scales width/height dynamically matching parent container grid parameters.
*   **Accessibility Requirements:** Captioned titles, tab-accessible key legends.

---

### 2.5. Forms & Inputs

#### Text Field Input
*   **Purpose:** Gathers text entries (search bars, incident logs, chat messages).
*   **Usage Guidelines:** Pairs with explicit label text. Renders helper guidance.
*   **Variants:** *Standard Input*, *Password*, *Search* (magnifier icon), *Multi-line Text Area*.
*   **States:** *Default*, *Focus* (green outline), *Error* (red border, warning helper label), *Disabled*.
*   **Responsive Behaviour:** Form elements scale to 100% viewport width on mobile screens.
*   **Accessibility Requirements:** `aria-invalid`, `aria-describedby` matching error message nodes, target tap bounds.

#### Selector / Dropdown
*   **Purpose:** Allows single-choice configurations (languages, stadium venues, triage categories).
*   **Usage Guidelines:** Use when options count exceeds 4 items.
*   **States:** *Closed*, *Open Dropdown Menu*.
*   **Responsive Behaviour:** Opens as bottom sheet dialogue overlay on mobile.
*   **Accessibility Requirements:** Role `listbox`, keyboard arrow keys support.

---

### 2.6. Feedback & Dialogs

#### Toast Notification
*   **Purpose:** Renders brief operations alerts without interrupting the active workspace.
*   **Usage Guidelines:** Bottom-left desktop anchoring; top-center mobile viewport slides. Auto-dismisses.
*   **Variants:** *Success*, *Warning*, *Danger*.
*   **States:** *Entering*, *Active*, *Exiting*.
*   **Responsive Behaviour:** Transitions to full-width banner layout on mobile.
*   **Accessibility Requirements:** Role `status`, `aria-live="polite"`.

#### Modal Dialog
*   **Purpose:** Focuses user attention on critical tasks (SSO login, incident verification, emergency protocols).
*   **Usage Guidelines:** Renders centered over a dark, blurred backdrop layer.
*   **States:** *Open*, *Closing* (fade animation).
*   **Responsive Behaviour:** Transforms into a full-height slide-up sheet on mobile viewports.
*   **Accessibility Requirements:** Role `dialog`, keyboard lock inside modal window context, close on Escape key.

---

### 2.7. Maps

#### Stadium Spatial Map
*   **Purpose:** Interactive visual layout of stadium tiers, gates, parking zones, and active incidents.
*   **Usage Guidelines:** Centered command view or fan wayfinding tab.
*   **Variants:** *Command Control* (displays responder coordinates, security anomalies), *Fan/Media View* (displays accessible lines, ticket gates, dining paths).
*   **States:** *Default*, *Active Route Layer*, *Evacuation Override*.
*   **Responsive Behaviour:** Integrates gestures (pinch-zoom) on mobile, double-tap zoom triggers.
*   **Accessibility Requirements:** Alternative textual descriptions, list versions of active map entities.

---

### 2.8. AI Components

#### AI Assistant Chat Drawer
*   **Purpose:** Hosts conversational interactions, translations, and checklist guide operations.
*   **Usage Guidelines:** Right-aligned slide drawer (desktop/tablet) or bottom-tab navigation (mobile).
*   **Variants:** *Command Copilot* (operations tools, summaries), *Fan Concierge* (visitor guides, schedules).
*   **States:** *Idle*, *Typing/Thinking* (pulsing bubble indicators), *Displaying Action Chips*.
*   **Responsive Behaviour:** Opens as a full-viewport app view on mobile viewports.
*   **Accessibility Requirements:** Screen reader announcements on new message inputs.
