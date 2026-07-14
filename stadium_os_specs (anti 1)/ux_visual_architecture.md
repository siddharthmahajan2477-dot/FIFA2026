# FIFA World Cup 2026 Stadium OS: Enterprise UI/UX Strategy & Visual Experience Architecture

This document defines the complete Visual Experience Architecture and UI/UX Strategy for Stadium OS. It establishes the design philosophy, visual style rules, typography scales, responsive layouts, micro-interactions, data visualization, and accessibility standards that govern every future screen and dashboard.

---

## 1. Visual Style & Layout Philosophy

The visual style is designed to be **Minimal, Elegant, High-Tech, and Immersive**. The platform is structured around a "glassmorphic dashboard grid" that prioritizes data scanning:

```
┌────────────────────────────────────────────────────────┐
│                    VISUAL HEIRARCHY                    │
├───────────────────┬───────────────────┬────────────────┤
│ Layer Depth       │ Border & Surface  │ Transparency   │
├───────────────────┼───────────────────┼────────────────┤
│ Base Background   │ Solid dark matte  │ 0% opacity     │
│ Grid Cards        │ 1px subtle line   │ 10% translucent│
│ Floating Dialogs  │ 1px glowing green │ 20% blur filter│
└───────────────────┴───────────────────┴────────────────┘
```

### 1.1. Spacing & Grid Philosophy
*   **Grid System:** Responsive 12-column layout on desktop viewports. Grid gutters are locked to a base spacing unit of 16px to maintain consistent whitespace.
*   **Spacing Scale:** Spacing utilizes a strict 4px grid system:
    *   *4px (Micro-gap):* Tag padding, icon-to-text spacing.
    *   *8px (Compact-gap):* Input field to label padding.
    *   *12px (Standard-gap):* Small card paddings, element lists.
    *   *16px (Base-gap):* Card margins, layout gutters.
    *   *24px (Large-gap):* Grid divisions, page section separators.

### 1.2. Card Layering & Elevation
*   **Borders:** Fixed to 1px with transparent backdrops.
*   **Corner Radii:** Curved card borders use a standard 12px radius, input elements use 8px, and small tags use 4px.
*   **Elevation System:** Depth is represented by translucent graphite layers. Hover actions scale the card upwards by 2px with an active border highlight, rather than relying on heavy shadows.

---

## 2. Color System Principles

Colors are represented by HSL variables to support dynamic theme switching (Dark Command Mode first, Daylight PWA Mode, and High-Contrast Accessibility Mode).

```
                            COLOR PALETTE
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   Brand Tones    │   │  Neutral Grays   │   │   Status Tones   │
├──────────────────┤   ├──────────────────┤   ├──────────────────┤
│ Pitch Green      │   │ Deep Obsidian    │   │ Urgent Red       │
│ FIFA Gold        │   │ Elevated Graphite│   │ Warning Orange   │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

*   **Brand Primary Tone:** Emerald Pitch Green - Used for success states, active selections, and sports accent lines.
*   **Brand Secondary Tone:** FIFA Gold - Used for VIP highlights, trophy listings, and premium dashboard indicators.
*   **Base Neutral Palette:**
    *   *Base Background:* Deep obsidian gray-blue (0% transparency).
    *   *Surface Card:* Semitransparent graphite gray (10% transparency).
    *   *Text Primary:* Off-white (high contrast against obsidian).
    *   *Text Secondary:* Mmuted gray (used for labels and units).
*   **Alert Status Tones:**
    *   *Danger:* Neon Red (high visibility) - Medical and security incident alerts.
    *   *Warning:* Amber Orange - Turnstile surges and shuttle delays.
    *   *Success:* Pitch Green - Task completions.
    *   *Info:* Electric Blue - Standard telemetry updates.

---

## 3. Typography & Hierarchy

The interface utilizes two font families:
1.  **Outfit (Sans-Serif UI Font):** High readability on desktop dashboards and mobile PWA views.
2.  **JetBrains Mono (Monospaced Data Font):** Telemetry indexes, coordinates, match scoreboards, and time metrics.

### 3.1. Font Sizes
```
Level            Value      Weight      Typeface
─────────────────────────────────────────────────────────────
Page Title       24px       Bold        Outfit
Card Header      18px       Semibold    Outfit
Body Text        16px       Regular     Outfit
Metadata Label   12px       Regular     Outfit
Telemetry Value  32px       Medium      JetBrains Mono
Match Clock      48px       Semibold    JetBrains Mono
```

---

## 4. Reusable Component Visual Design Rules

*   **Form Inputs:** Active forms feature floating labels, transitioning to a green border highlight on focus. Errors display a red warning icon and error label.
*   **Status Badges:** Text displays inside a rounded capsule container. The background uses a 10% opacity HSL color fill matching the solid text color.
*   **AI Recommendations:** Framed in cards with a subtle glowing green outline. An active AI pulsing indicator spins beside the title block.
*   **Data Graphs:** Telemetry lines use a 2px stroke width. AI projections display as dotted gold lines, and critical bottlenecks are shaded in neon red.

---

## 5. Responsive Experience Matrix

Breakpoints adjust to support three primary layout formats:

*   **Desktop & Control Rooms:** Side-by-side split layouts. Real-time maps, telemetry metrics, and AI chat drawers are displayed simultaneously.
*   **Tablets:** Multi-pane dashboards collapse columns to accommodate a split-view map.
*   **Mobile PWAs:** Layouts stack in a single column. The bottom navigation bar is locked to the screen, and maps switch to full-viewport overlays.

---

## 6. Motion Design & Micro-interactions

Animations are used to communicate interactive state:
*   **Hover State:** Cards elevate by 2px and borders transition to an active HSL state in 150ms.
*   **Tap State:** Button triggers scale inwards to 98% in 100ms.
*   **Critical Alerts:** Critical alarms pulse continuously using scale/opacity loops until acknowledged.
*   **Loading State:** Metrics card values render skeleton loaders while data is fetching, preventing layout jumps.

---

## 7. Accessibility Design Rules

*   **Contrast Compliance:** All metrics labels must satisfy WCAG 2.2 AAA guidelines (7:1 contrast ratio) against background panels.
*   **Touch Targets:** Mobile touch targets must maintain a minimum bounding box of 48px by 48px.
*   **Reduced Motion:** Respects user preferences. When active, all sliding and scaling transitions are replaced with instant display updates.
*   **Localization Layouts:** Labels and text containers must accommodate word length changes of up to 35% without clipping.
