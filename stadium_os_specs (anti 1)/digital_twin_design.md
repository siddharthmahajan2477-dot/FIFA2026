# Stadium OS: Digital Twin, Live Stadium Intelligence & Crowd Monitoring Specification

This document defines the user experience, layout, and visual designs for the Digital Twin and Crowd Monitoring Platform, serving as the central spatial visualization layer of Stadium OS.

---

## 1. High-Fidelity UI Mockups

### 1.1. 3D Digital Twin Viewport (Desktop View)
The primary spatial view renders a transparent 3D wireframe vector model of the stadium, overlaid with real-time zone capacities, gate queues, and sensor nodes.

![Digital Twin 3D Viewport Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/digital_twin_3d_viewport_1783459351375.png)

### 1.2. Historical Timeline & Crowd Simulation Replay
This visualization interface maps animated crowd flow vectors, plots congestion areas, and features a timeline scrubber bar for incident and match replay auditing.

![Digital Twin Timeline Replay Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/digital_twin_timeline_replay_1783459366378.png)

---

## 2. Layout Grid & Panel Specifications

The Desktop Digital Twin workspace is structured into three zones:

```
┌────────────────────────────────────────────────────────┐
│                   DIGITAL TWIN WORKSPACE               │
├───────────────┬───────────────────┬────────────────────┤
│ Left Panel    │ Center Viewport   │ Right Panel        │
│ (240px width) │ (Fluid 3D Canvas) │ (320px width)      │
├───────────────┼───────────────────┼────────────────────┤
│ - Layer Group │ - 3D Stadium      │ - Live IoT logs    │
│   toggles     │   vector model    │ - Sensor health    │
│ - CCTV feeds  │ - Hover metrics   │ - AI Predictions   │
└───────────────┴───────────────────┴────────────────────┘
```

*   **Left Map Layers Panel:** Contains checkbox controls allowing operators to toggle overlays (CCTV camera vectors, IoT sensors, Evacuation exit paths, Volunteer positions).
*   **Center 3D Viewport Canvas:** Interactive space displaying the wireframe model. Left-dragging rotates the view, and scrolling zooms. Tapping a zone opens its diagnostics metrics.
*   **Right IoT Telemetry Panel:** Lists environmental conditions (air quality, temperature, noise levels) and hardware status.

---

## 3. Timeline Playback & Incident Replay Rules

*   **Scrubber Component:** Anchored to the bottom, displaying timestamp logs (e.g. *14:32:00*) and match clock intervals (*First Half, Min 34*).
*   **Timeline Event Markers:** High-contrast color-coded indicators display along the timeline scrubber bar:
    *   *Red Dots:* Active emergency dispatches.
    *   *Green Dots:* Goal events.
    *   *Yellow Dots:* Ingress surge peaks.
*   **Replay Simulation Speed:** Controls allow operators to adjust speeds (1x, 2x, 4x, 8x) to review crowd flows during post-match audits.

---

## 4. Operational IoT Layer Integrations

*   **Environmental Sensor Feeds:** Carbon dioxide, temperature, humidity, and decibel (noise level) averages display in the right sidebar. Tapping a sensor highlights its physical location in the 3D model.
*   **CCTV Camera Status:** Camera positions appear as small camera symbols. Clicking a symbol opens a live streaming feed panel.
*   **Hardware Diagnostics Layer:** Displays connectivity status for turnstiles, smart bins, and elevators. Offline items flash a yellow warning badge in the 3D model.
