# FIFA World Cup 2026 Stadium OS: Event-Driven Architecture & Real-Time Communication Framework

This document establishes the Enterprise Event-Driven Architecture (EDA) and Real-Time Communication Framework for Stadium OS. It defines the event taxonomy, abstract JSON schema payloads, event lifecycle stages, pub-sub routing patterns, error/failure mitigation plans, and observability metrics.

---

## 1. Event Classification & Priority Hierarchy

Events are classified into eight severity levels, dictating their routing speeds, recovery protocols, and notification overrides:

```
┌────────────────────────────────────────────────────────┐
│               LEVEL 1: LIFE SAFETY (Alarms)            │
├────────────────────────────────────────────────────────┤
│               LEVEL 2: SYSTEM CRITICAL (Network drops) │
├────────────────────────────────────────────────────────┤
│               LEVEL 3: CRITICAL ALERTS (Medical logs)  │
├────────────────────────────────────────────────────────┤
│               LEVEL 4: BUSINESS CRITICAL (Ticketing)   │
├────────────────────────────────────────────────────────┤
│               LEVEL 5: WARNINGS (Gate surges, queues)  │
├────────────────────────────────────────────────────────┤
│               LEVEL 6: OPERATIONAL (Concession orders) │
├────────────────────────────────────────────────────────┤
│               LEVEL 7: AI RECOMMENDATIONS (HVAC offset)│
├────────────────────────────────────────────────────────┤
│               LEVEL 8: INFORMATIONAL (Weather feeds)   │
└────────────────────────────────────────────────────────┘
```

1.  **Life Safety (Level 1):** Immediate threats to physical security (e.g. fire detection, structural warnings). *Routing: Immediate push override, audio sirens.*
2.  **System Critical (Level 2):** Infrastructure outages (e.g. event broker split-brain, loss of backup power). *Routing: Failover redundancy routing, IT alerts.*
3.  **Critical Alerts (Level 3):** Active medical cases, gate security breaches. *Routing: Direct responder routing, dashboard locking.*
4.  **Business Critical (Level 4):** Turnstile scanner outages, ticketing API failures. *Routing: Automated bypass, manual override logs.*
5.  **Warnings (Level 5):** Gate queue bottlenecks, shuttle delays. *Routing: AI redirection triggers, notification toasts.*
6.  **Operational Events (Level 6):** Concession stock changes, standard volunteer status changes. *Routing: Standard queues, dashboard stats updates.*
7.  **AI Recommendations (Level 7):** Energy optimizations, cleanup dispatches. *Routing: Operational review queue.*
8.  **Informational (Level 8):** Game scores, general weather updates. *Routing: Low-priority dashboard cards updates.*

---

## 2. Decoupled Pub-Sub Topic Registry (Routing Patterns)

To maintain a decoupled, technology-agnostic architecture, all communications route through an abstract event bus. We define the following core pub-sub channels (topics):

```
Topic Name Pattern                   Publisher            Primary Consumers
─────────────────────────────────────────────────────────────────────────────
stadiums.{id}.safety.emergency       Alarms / Security    Security, Medical, Fans
stadiums.{id}.telemetry.turnstile    NFC Gate Scanners    Operations, AI Analytics
stadiums.{id}.telemetry.energy       Chillers / Meters    Operations, Sustainability
stadiums.{id}.incident.dispatch      Security Dispatcher  Field Responders, Medical
stadiums.{id}.transit.shuttles       Transit GPS Feeds    Operations, PWA Clients
stadiums.{id}.ai.recommendations     AI Operating Layer   Command Center, Operators
```

---

## 3. Abstract Event Schema Contract

Every event payload published to the broker must conform to this technology-agnostic JSON structure:

```json
{
  "eventId": "String (UUIDv4)",
  "eventType": "String (e.g., TURNSTILE_TICKET_VALIDATED, INCIDENT_DECLARED)",
  "timestamp": "ISO 8601 String",
  "priority": "Integer (1 to 8)",
  "publisher": {
    "sourceId": "String (e.g., Gate_3_Scanner_A)",
    "context": "String (e.g., Stadium_Ops_Context)"
  },
  "payload": {
    "stadiumId": "String (UUID)",
    "details": {}
  },
  "correlationId": "String (UUID)",
  "traceContext": {
    "spanId": "String",
    "parentSpanId": "String"
  }
}
```

---

## 4. Event Lifecycle Stages

The event processing pipeline maps occurrences through ten logical stages:

```
[Detection] ──> [Validation] ──> [Enrichment] ──> [AI Scoring] ──> [Routing] 
                                                                       │
[Resolution] <── [Acknowledgement] <── [Dispatch] <── [Escalation] <───┘
```

1.  **Detection:** A sensor, client app, or database trigger issues an raw signal.
2.  **Validation:** The gateway verifies structural schemas and cryptographic signatures.
3.  **Enrichment:** Adds contextual info (e.g., appending corresponding match status or location coordinates).
4.  **AI Scoring:** The AI Central Operating Layer runs anomaly forecasts and risk scoring models.
5.  **Routing:** The event is placed on matching topics in the broker.
6.  **Escalation:** If an alert is unacknowledged within threshold limits (e.g., medical alert unassigned for 60 seconds), the event priority escalates automatically.
7.  **Dispatch:** Delivered to active dashboard viewports and mobile PWA push channels.
8.  **Acknowledgement:** Target users verify receipt (e.g., responder clicks "Accept Triage").
9.  **Resolution:** The event status shifts to resolved upon task completion.
10. **Archival:** Records are stripped of PII and written to historical cold databases.

---

## 5. Bounded AI Event Interception (Decision Support Loop)

AI participates directly in the event stream by subscribing to telemetry channels and publishing actionable events:

```
                            Event Topic
                 (stadiums.{id}.telemetry.turnstile)
                                 │
                                 ▼
                     AI Surges Inference Engine
                                 │
                                 ▼
                          Inference Output
                 (surges predicted at Gate 3 in 30m)
                                 │
                                 ▼
                             New Event
                  (stadiums.{id}.ai.recommendations)
```

*   **Interception:** AI consumes high-frequency streams (e.g., turnstile entries).
*   **Evaluation:** Aggregates and runs predictions against historical models.
*   **Publication:** Emits new events (e.g., `CROWD_BOTTLENECK_PREDICTED` or `HVAC_OFFSET_SUGGESTED`).
*   **Operational Control:** Operators approve or dismiss the recommendations, publishing an `AI_RECOMMENDATION_EXECUTED` event that coordinates subsequent volunteer tasks.

---

## 6. Event Cascades & Relationships

*   **Trigger Chains:** An incident report (`INCIDENT_DECLARED`) triggers a dispatch (`RESPONDER_DISPATCHED`). The responder arriving triggers a status change (`RESPONDER_ON_SCENE`). Triage completion triggers medical escalation (`AMBULANCE_REQUESTED`).
*   **Cascading Outages:** If a gateway sensor fails (`SENSOR_HEARTBEAT_LOST`), the system automatically demotes corresponding analytics charts to "Stale Data Mode", triggers helper tasks for volunteers to manually log status metrics, and prompts a system alert.

---

## 7. Event Failure & Resilience Scenarios

To maintain structural integrity during network drops and hardware failures, the system defines these recovery behaviors:

*   **Delayed / out-of-order Events:** Real-time dashboards utilize timestamp indexing rather than ingestion sequence. If events arrive delayed due to transit lags, the system updates graphs retroactively.
*   **Duplicate Events:** Event validation filters incoming correlation IDs, dropping duplicate event IDs within a 5-minute sliding window to prevent double-counting.
*   **Network Interruptions (Offline PWA Sync):** Mobile clients store scan validations locally in a FIFO (First-In, First-Out) cache. Upon reconnecting, the client publishes cached events with metadata indicating they are retrospective, allowing the server to record them without skewing live stats.
*   **Conflicting Events:** If two inputs disagree (e.g., camera CV flags overcrowding at Gate 4, but staff reports normal flows), the system flags the conflict, prompts the operator to select a "Manual Override", and records the choice in the audit log.

---

## 8. Observability & Event Health Monitoring

*   **Distributed Tracing:** All events share a correlation ID, enabling tracing from initial sensor scan to final database write.
*   **Dead-Letter Topic (DLQ):** Messages that fail validation or schema routing are placed in `stadiums.{id}.system.dlq` for manual analysis by administrators.
*   **Operational Health metrics:**
    *   *Event Latency:* Time delta between publisher timestamp and subscriber receipt.
    *   *Inference Time:* AI model execution latencies.
    *   *Broker Telemetry:* Active connection logs, queue depths, and dead letter counts.
