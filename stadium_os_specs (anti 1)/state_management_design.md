# Stadium OS: Enterprise State Management Experience Specification

This document defines the loading states, empty states, error states, and offline synchronization behaviors for Stadium OS, ensuring consistent experiences during connectivity drops or system failures.

---

## 1. Visual Loading & Skeleton Blueprints (Desktop View)

When components load real-time telemetry or maps, a loading skeleton takes the place of the active cards, preventing layout shifts:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ STADIUM OS  [MetLife Stadium v]                 [Role: Organizer v]    [🔍 Search...]  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ Dashboard    │ BREADCRUMB: Stadium Operations > Concessions Monitor                    │
│ Match Center │ ┌─────────────────────────────────────────────────────────────────────┐ │
│ Ingress      │ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  (KPI Loading...)  │ │
│ Concessions  │ └─────────────────────────────────────────────────────────────────────┘ │
│ Transit      │ ┌───────────────────────────────┬─────────────────────────────────────┐ │
│ Parking      │ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│ Access       │ │ ░░░░░ [Map Loading...] ░░░░   │ ░░░░░ [Data Table Loading...] ░░░░ │ │
│ Comm         │ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│ Security     │ │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │ │
│ Medical      │ └───────────────────────────────┴─────────────────────────────────────┘ │
│ Sustainability │ ┌─────────────────────────────────────────────────────────────────────┐ │
│ Reports      │ │ [🔄 Loading AI Copilot Workspace...]                                 │ │
│ Admin        │ └─────────────────────────────────────────────────────────────────────┘ │
└──────────────┴────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Empty States & Visual Feedback Mappings

Empty states utilize high-contrast illustrations and actionable instructions to guide users:

*   **No Active Incidents (Security Dashboard):** Displays a green checkmark icon with off-white text: *"All clear. No active security incidents reported in the stadium."* Action: Contains a *Report Incident* manual override button.
*   **No Volunteers Assigned (Shift Board):** Text reads: *"No volunteers checked in for Section 104."* Action: A *Manual Assign* trigger button.
*   **No Search Results (RAG Knowledge Base):** Text reads: *"No documentation matches your query."* Action: Suggests terms or prompts to open a live chat with operations.

---

## 3. Error States, Recovery & Fallback UIs

*   **API Network Offline:** Displays a top-anchored orange warning ribbon: *"Connection lost. Reconnecting in 5s... [Force Retry]"*. Telemetry inputs display their last cached value with an opacity of 50%.
*   **Sensor Node Offline:** Map icons for disconnected turnstiles or CCTV cameras turn HSL yellow with an offline badge. Hovering reveals sensor diagnostics details (e.g., *"Lost ping since 02:42. Check breaker connection"*).
*   **Permission Denied Dialog:** A modal blocking access with text: *"Access Denied. You do not have the required role privileges to edit Gate 3 SOP settings. Contact your administrator [Request Privilege]"*.

---

## 4. Offline Navigation & Sync Protocol (Fan & Responder PWAs)

Fans and first responders must be able to operate offline during network surges:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            OFFLINE SYNC WORKFLOW                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [Network Loss] ──> [Cache Active State to IndexedDB] ──> [Offline PWA UI]  │
│                                                                             │
│                                                                  │          │
│                                                                  ▼          │
│  [Conflict Auto-Resolve] <── [Reconnect Ingress] <── [Verify Offline Queue] │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

*   **Fan Offline Tickets:** Fans can load their dynamic QR passes offline. The pass rotates using a local cryptographic cycle, falling back to cached scan details if validation servers are down.
*   **Responder Offline Actions:** Incident logs and triage checklists are queued locally in the PWA IndexedDB cache.
*   **Conflict Resolution Policy:** Upon reconnection, the client bulk-pushes queued updates. If conflicts exist (e.g. an incident was resolved by another dispatcher), the server merges timestamps, prioritizing security/medical dispatch logs over administrative updates.
