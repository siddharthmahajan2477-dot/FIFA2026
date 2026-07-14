# Stadium OS: Enterprise Motion Design & Real-Time Experience System Specification

This document defines the animation philosophy, timing scales, easing curves, page transitions, and micro-interactions for Stadium OS, ensuring every interaction feels premium, responsive, and accessible.

---

## 1. Unified Motion Token System

Animations follow a strict timing scale to ensure system feedback is immediate and does not delay user workflows:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   TIMING & DURATION SCALE                              │
├───────────────────┬───────────────────┬────────────────────────────────────────────────┤
│ Token Name        │ Duration (ms)     │ Target Application                             │
├───────────────────┼───────────────────┼────────────────────────────────────────────────┤
│ Instant           │ 0ms               │ Accessibility reduced-motion, instant snaps   │
│ Fast              │ 100ms – 150ms     │ Button clicks, hover scales, active tab flips  │
│ Standard          │ 200ms – 250ms     │ Drawer slides, dropdown expansions, toast fades│
│ Slow              │ 350ms – 400ms     │ Full page transitions, layout reorganizations  │
└───────────────────┴───────────────────┴────────────────────────────────────────────────┘
```

### Easing Curves (Cubic-Bezier Parameters)
*   **Standard Easing (`ease-in-out`):** `cubic-bezier(0.4, 0.0, 0.2, 1.0)` - Default curve for moving elements (drawers, sidebars).
*   **Decelerate Easing (`ease-out`):** `cubic-bezier(0.0, 0.0, 0.2, 1.0)` - Used for entering elements (modals fading in).
*   **Accelerate Easing (`ease-in`):** `cubic-bezier(0.4, 0.0, 1.0, 1.0)` - Used for exiting elements (modals closing, alerts disappearing).

---

## 2. Transition Specifications Matrix

### 2.1. Full Page & Module Transitions
*   **Interaction:** Clicking a link in the Left Sidebar Navigation (e.g. transitioning from *Dashboard* to *Transit*).
*   **Animation:** The old workspace area fades out (opacity `1.0 -> 0.0`) and slides slightly to the left (translation `-10px`) over 150ms. The new workspace fades in (opacity `0.0 -> 1.0`) and slides into place from the right (translation `10px -> 0px`) over 250ms using the standard easing curve.

### 2.2. Modal Pop-Ups & Dialog Overlays
*   **Interaction:** Tapping a dispatch button to prompt a confirmation dialog.
*   **Animation:** The frosted-glass dark overlay fades in (opacity `0.0 -> 1.0`) over 200ms. The dialog card slides upward from the center (translation `20px -> 0px`) and scales up (scale `0.95 -> 1.00`) over 250ms with decelerate easing.

### 2.3. Right Drawer & Side-Panels (AI Copilot)
*   **Interaction:** Tapping the float button to slide open the right-side AI chat panel.
*   **Animation:** Panel slides in from the right edge (translation `100% -> 0%`) over 250ms using the standard easing curve. The workspace area scales down (scale `1.00 -> 0.98`) to accommodate the panel layout.

---

## 3. Micro-interactions & State Feedback

*   **Button Pressed State:** Tapping a primary button scales the element down to 98% width (duration 100ms), expanding back to 100% upon release (duration 150ms).
*   **Card Hover State:** Hovering over a metric card lifts the card upwards by 2px (translation Y: `-2px`), changes the border opacity from 10% to 25%, and darkens the HSL background slightly over 150ms.
*   **Real-Time Telemetry Counters:** When values (e.g., Gate Scan Rates) update, the numbers slide upwards to reveal new values, highlighting change events in green (increase) or red (decrease) before fading back to white over 500ms.
*   **Critical Alarm Pulsing:** Urgent dispatches pulse using continuous loops: scale oscillates between `1.00` and `1.02` and border opacity cycles between `40%` and `100%` every 1.5 seconds.

---

## 4. AI Interaction & Processing Animations

*   **AI Listening Waveform:** Active voice queries display a glowing HSL green waveform. Peak amplitude and frequency adjust dynamically to match incoming voice frequencies, fading out when the user stops speaking.
*   **AI Thinking Status:** Shows three small HSL green loading dots, rising and falling sequentially (duration 1s loop) to indicate background processing.
*   **AI Response Streaming:** Conversational responses stream in line-by-line using a gradual text reveal (opacity `0.0 -> 1.0` and slide Y `5px -> 0px` per word over 50ms), mimicking typing.

---

## 5. Accessibility & Reduced Motion Compliance

*   **Reduced Motion Override:** When the user enables reduced motion preferences:
    *   All translation (sliding) and scale adjustments are disabled (0ms).
    *   Page transitions and modal openings are replaced by quick cross-fades (duration 100ms max).
    *   Looping pulses (such as critical alarms) are replaced by high-visibility solid red borders to prevent triggering motion sensitivities.
