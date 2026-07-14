# FIFA World Cup 2026 Stadium OS: Enterprise Design System Specification

This document defines the complete visual language, design tokens, responsive layouts, motion guidelines, and accessibility standards for Stadium OS. It serves as the master specification for all UI components and page states.

---

## 1. Visual Personality & Style Philosophy

Stadium OS combines high-density enterprise operations telemetry with an immersive sports aesthetic. The visual personality is defined by:
*   **Professional & Modern:** Clean typography, consistent grids, high breathing room.
*   **Football-First Immersive:** Obsidian bases representing the night stadium under floodlights, highlighted with Pitch Green and FIFA Gold.
*   **AI-Centric Interaction:** Proactive AI inputs are emphasized using glowing green card borders, pulsing status dots, and glassmorphic card overlays.
*   **Minimal & Elegant:** Borders are kept to 1px with transparent backdrops to reduce visual noise.

---

## 2. Global Design Tokens

Design tokens are represented as design-variable specifications independent of any runtime implementation.

```
                  ┌──────────────────────────────┐
                  │        DESIGN TOKENS         │
                  └──────────────┬───────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   Color Tokens   │   │ Typography Scales│   │  Spacing Tokens  │
│ (Emerald, Gold,  │   │  (Outfit, Mono,  │   │ (4px increments, │
│  Obsidian base)  │   │   0.75rem-3rem)  │   │  2px micro-gap)  │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

### 2.1. Color System (Dark Pitch Theme First)
*   **Brand Colors:**
    *   `token-color-brand-primary`: HSL Pitch Green (`hsl(145, 100%, 45%)` / `#00E676`) - Used for success, primary actions, and pitch highlights.
    *   `token-color-brand-secondary`: HSL FIFA Gold (`hsl(47, 92%, 53%)` / `#F5C518`) - Used for highlights, VIP elements, and score overlays.
*   **System Backgrounds:**
    *   `token-color-bg-base`: Obsidian Dark Base (`hsl(220, 38%, 6%)` / `#090D16`) - Core viewport background.
    *   `token-color-bg-surface`: Graphite Gray (`hsl(220, 31%, 11%)` / `#121824`) - Card and panel backgrounds.
    *   `token-color-bg-surface-elevated`: Glass Slate (`hsl(220, 25%, 16%)` / `#1A2232`) - Hover state surfaces and sub-menus.
*   **System Borders:**
    *   `token-color-border-subtle`: HSL Translucent Gray (`hsla(220, 20%, 20%, 0.5)`) - Standard dividers and outlines.
    *   `token-color-border-accent`: HSL Glowing Green (`hsla(145, 100%, 45%, 0.3)`) - Highlights AI recommended actions.
*   **Typography & Text States:**
    *   `token-color-text-primary`: Pure White (`hsl(0, 0%, 98%)` / `#FAF9F6`) - Headers and body text.
    *   `token-color-text-secondary`: Muted Gray (`hsl(215, 15%, 70%)` / `#9CA3AF`) - Captions, metrics units, and subtitles.
    *   `token-color-text-disabled`: Dim Gray (`hsl(215, 10%, 40%)` / `#4B5563`) - Disabled inputs.
*   **Alert & Status States:**
    *   `token-color-alert-danger`: Neon Red (`hsl(354, 100%, 55%)` / `#FF1744`) - Security breaches and medical alerts.
    *   `token-color-alert-warning`: Amber Orange (`hsl(30, 100%, 50%)` / `#FF9100`) - Ingress surges and transit bottlenecks.
    *   `token-color-alert-info`: Electric Blue (`hsl(217, 100%, 60%)` / `#2979FF`) - Standard operations telemetry and transit queues.

### 2.2. Typography System
*   **Primary Fonts (Labels, Controls, UI):** `Outfit`, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial.
*   **Data Fonts (Telemetry, Coordinates, Scoreboard):** `JetBrains Mono`, SFMono-Regular, Consolas, Monaco, monospace.
*   **Font Size Scale:**
    *   `token-font-xs`: `0.75rem` (12px) - Telemetry labels, small metadata.
    *   `token-font-sm`: `0.875rem` (14px) - Body copy, input placeholder text, list subheaders.
    *   `token-font-base`: `1.0rem` (16px) - Navigation menu text, standard list titles, descriptions.
    *   `token-font-md`: `1.125rem` (18px) - Metric card values, small headings.
    *   `token-font-lg`: `1.25rem` (20px) - Section headers, card titles.
    *   `token-font-xl`: `1.5rem` (24px) - Primary page headers.
    *   `token-font-xxl`: `2.0rem` (32px) - Scoreboards, match time ticker, command metrics.
    *   `token-font-giant`: `3.0rem` (48px) - High-priority dashboard telemetry callouts.
*   **Font Weights:**
    *   `token-font-weight-regular`: `400`
    *   `token-font-weight-medium`: `500`
    *   `token-font-weight-semibold`: `600`
    *   `token-font-weight-bold`: `700`
*   **Line Heights:**
    *   `token-line-height-tight`: `1.2` - Headers and scoreboard.
    *   `token-line-height-base`: `1.5` - Reading text blocks.

### 2.3. Spacing Scale
Spacing is based on a clean 4px increment hierarchy, supporting a micro-scale for precise grid alignments:
*   `token-space-xs`: `4px` / `0.25rem`
*   `token-space-sm`: `8px` / `0.5rem`
*   `token-space-md`: `12px` / `0.75rem`
*   `token-space-base`: `16px` / `1.0rem`
*   `token-space-lg`: `24px` / `1.5rem`
*   `token-space-xl`: `32px` / `2.0rem`
*   `token-space-xxl`: `48px` / `3.0rem`
*   `token-space-giant`: `64px` / `4.0rem`

### 2.4. Elevation & Borders
*   **Border Radii:**
    *   `token-radius-sm`: `4px` - Small tags, status badges.
    *   `token-radius-md`: `8px` - Interactive inputs, buttons.
    *   `token-radius-lg`: `12px` - Telemetry cards, dialog containers, maps.
    *   `token-radius-pill`: `9999px` - Profile badges, round floating buttons (FAB).
*   **Borders:**
    *   `token-border-width`: `1px`
    *   `token-border-style`: `solid`
*   **Shadows & Glassmorphism:**
    *   `token-shadow-soft`: `0 4px 12px 0 rgba(0, 0, 0, 0.4)` - Soft ambient depth.
    *   `token-shadow-focused`: `0 0 0 2px hsl(145, 100%, 45%), 0 8px 24px 0 rgba(0, 0, 0, 0.6)` - Highlight focus state.
    *   `token-glass-backdrop`: `backdrop-filter: blur(16px)` - Grounding cards over live visual layers (like maps or scoreboard videos).

---

## 3. UI Component Templates (Styling Rules)

### 3.1. Cards
*   **Default Card:** Graphite surface, 1px border (`token-color-border-subtle`), 12px radius, and standard padding (`token-space-base`).
*   **Interactive Hover Card:** Upon hover, the surface shifts to elevated gray, elevating by `4px` using transforms with a soft border glow.
*   **AI Recommended Card:** Glow primary green border, a `token-color-border-accent` outline, and a green indicator badge in the top corner.

### 3.2. Buttons
*   **Primary Action:** Solid green fill, white text, bold font, and subtle hover scale offset.
*   **Secondary Action:** Muted outline matching border token, transparent background, and green text on hover.
*   **Ghost Action:** No background or border, changing to gray surface on hover.
*   **AI Automation Trigger Button:** Gold border with a pitch green fill, highlighting its automation capability.
*   **Danger Button:** Crimson red fill with white text, used for alarms and responder dispatch.

### 3.3. Inputs & Forms
*   **Text Inputs:** Gray surface, 1px subtle gray border, inset padding, transition to green border on focus state.
*   **Form Groups:** Spacing scale of 24px between input fields with a 4px gap separating labels from control elements.

### 3.4. Badges & Tags
*   **Status Badges:** Rounded, with a transparent HSL background and matching solid HSL text:
    *   *Critical:* Transparent red background, solid neon red text.
    *   *Warning:* Transparent orange background, solid warning orange text.
    *   *Active:* Transparent green background, solid pitch green text.
*   **Numeric Count Badges:** Small circles featuring monospace text, aligning with the metric label.

### 3.5. Data Tables
*   **Structure:** Transparent surface, alternating gray rows, a fixed-height header row with subtle borders, and monospace font for telemetry cell numbers. Columns collapse/hide responsively to prevent horizontal scrolling on mobile.

### 3.6. Charts
*   **Line/Bar Analytics:** Utilizes neon primary green for live lines, secondary gold for forecasts, and electric blue for transit metrics. The background grid uses muted gray borders to maintain readability.
*   **Crowd Heatmaps:** Smooth transitions ranging from transparent green (low density) through yellow (normal operations) to pulsing neon red (critical safety congestion).

### 3.7. Modals & Drawers
*   **Overlay Backdrop:** Semi-transparent dark background (`hsla(220, 38%, 6%, 0.8)`) with a blur filter to isolate the focus area.
*   **Command Drawers:** Slide-out panels from the right edge, matching the height of the viewport with a frosted glass background.

### 3.8. AI Interaction Indicator
*   A pulsing circle (`token-color-brand-primary`) positioned beside AI-generated insights, communicating that the content is being dynamically generated and refreshed.

---

## 4. Responsive Adaptability Rules

Our layouts reflow consistently using four viewport categories:

| Breakpoint | Range | Navigation Pattern | Layout Reflow Rule |
| :--- | :--- | :--- | :--- |
| **Mobile** | `< 640px` | Bottom navigation bar, collapsed hamburger utility menu. | Grid items stack in a single column. Interactive map switches to an expandable tab view. |
| **Tablet** | `640px – 1024px` | Hamburger menu toggle, right drawer sub-menus. | 2-column dashboard layout. Map displays side-by-side with incident details. |
| **Laptop** | `1024px – 1440px` | Collapsed sidebar icons, top search. | 3-column dashboard grid. Interactive maps include collapsible overlays. |
| **Desktop / Command**| `> 1440px` | Collapsible sidebar (icons + labels), top search, right AI Copilot drawer. | Multi-column grid. Live telemetry cards, charts, maps, and list details display side-by-side. |

---

## 5. Motion Design & Micro-interactions

Motion guidelines focus on lightweight animations that guide focus rather than creating distraction.

### 5.1. Animation Token Parameters
*   **Duration Scale:**
    *   `token-duration-fast`: `150ms` - Micro-interactions (button hover states, toggle state shifts).
    *   `token-duration-base`: `250ms` - Dynamic component transitions (expanding cards, drawer slides).
    *   `token-duration-slow`: `400ms` - Page navigation swaps, full-screen overlay entries.
*   **Easing Functions:**
    *   `token-ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)` - Standard transitions.
    *   `token-ease-out-elastic`: `cubic-bezier(0.34, 1.56, 0.64, 1)` - AI popup and toast alert entries.

### 5.2. Recommended Transition Rules
*   **Pulsing Alerts:** Warnings and critical metrics use keyframe scale/opacity loops (`0.8` to `1.2` opacity) to attract operator focus.
*   **Swipe Gestures:** Mobile PWA views animate via transition slide offsets to maintain app-like responsiveness.

---

## 6. Accessibility & Localization Implementation Rules

*   **Color Contrast Compliance:** Every text label on a card container must conform to a minimum contrast ratio of 4.5:1 (Level AA), with critical alerts targeting 7:1 (Level AAA).
*   **Touch Targets:** Interactive components on mobile viewports must maintain a minimum bounding box of 48px by 48px to accommodate quick adjustments during field operations.
*   **Keyboard Navigation Tab-Index:** Interactive lists and forms must navigate sequentially via tab key inputs, indicating focus with a green glowing outline.
*   **Localization Alignment:** Sizing margins and layouts must allow for word length variances of up to 35% when translating labels from English to Spanish, French, or Arabic. Text alignment matches Right-To-Left (RTL) rules for Arabic.
