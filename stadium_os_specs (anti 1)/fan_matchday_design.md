# Stadium OS: Fan Experience Platform & Matchday Dashboard Specification

This document defines the user experience, layout, and visual designs for the Fan Experience Platform, serving as the primary digital companion for spectators during World Cup matches.

---

## 1. High-Fidelity UI Mockups

### 1.1. Fan Home Dashboard (Mobile PWA)
The dashboard displays personalized match information, dynamic tickets, and contextual notifications on wait times and gate entry rules.

![Fan Home Dashboard Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/fan_matchday_dashboard_1783458703694.png)

### 1.2. Interactive Stadium Map & Wayfinding
The navigation interface displays 2D layouts of stadium zones, pathfinding routes, concession queue meters, and accessible directions.

![Fan Stadium Map Mockup](C:/Users/Admin/.gemini/antigravity-ide/brain/abd7cddb-2a09-470b-a43b-45dfbb04dccf/fan_stadium_map_1783458717426.png)

---

## 2. Page Region & Layout Specifications

The Mobile PWA Fan portal is designed using a vertical scroll structure:

```
┌────────────────────────────────────────────────────────┐
│                  FAN HOME MOBILE REGIONS               │
├────────────────────────────────────────────────────────┤
│ Header: Welcome Christopher (Locale: EN) + Alert Bell  │
├────────────────────────────────────────────────────────┤
│ Live Match Card: Score, Clock, Active Play stats       │
├────────────────────────────────────────────────────────┤
│ Digital Ticket Wallet: QR Code scanner button          │
├────────────────────────────────────────────────────────┤
│ AI Proactive Suggestion Card: Gate 4 entry warning     │
├────────────────────────────────────────────────────────┤
│ Concessions Quick Order Ribbon: Pre-order snack icons  │
├────────────────────────────────────────────────────────┤
│ Fixed Bottom Nav Bar: [Home] [Map] [Tickets] [AI Chat] │
└────────────────────────────────────────────────────────┘
```

*   **Header Bar:** Displays the user profile name, seat location info, and the notification center alert bell.
*   **Live Match Card:** Displays competing teams' flags, live score, game clock, and active lineups. Features segmented tabs to switch between *Lineups, Stats, Match Summary, and H2H*.
*   **Digital Wallet (Ticket):** Contains an expandable dynamic QR ticket validation pass displaying gate assignments and access credentials.
*   **Concessions Quick Order:** Allows pre-ordering food. Displays food pick-up estimates based on queue volumes.

---

## 3. Contextual AI Assistance Functions

AI capabilities are integrated directly into the dashboard layout:
*   **Smart Ingress Gate suggestions:** Evaluates turnstile passage rates, recommending alternative gates (e.g. *"Gate 3 wait is rising. Redirect to Gate 4. Estimated time savings: 8 mins"*).
*   **Queue-Aware Concessions Routing:** Recommends food concessions with shorter lines.
*   **Transit Congestion Mitigation:** Alerts fans to transit delays, suggesting alternative transport routes (e.g. *"Metro Line A is congested. Take Shuttle Shuttle B to North station"*).
*   **Smart Match Predictions:** Displays live forecasts (win probability bars, key player performance stats, passing networks analysis) based on game events.

---

## 4. Wallet & Tickets Verification Rules

*   **Dynamic Ticket QR Validation:** Renders a high-contrast ticket barcode. The barcode uses a 5-second dynamic seed refresh cycle to prevent ticket duplication.
*   **Color-Coded Entry Indicators:** The ticket turns green when scanning is successful, yellow if validations fail, and red if access is restricted (directing the user to Volunteer help counters).
*   **Offline Mode Ticket Caching:** Tickets are cached locally on PWA client storage, enabling turnstile entry validation even during complete stadium network outages.
