# FIFA World Cup 2026 Stadium OS: Enterprise Data Architecture & Domain Model

This document defines the Enterprise Data Architecture and Domain Model for Stadium OS. It establishes the domain boundaries, business entities, aggregate roots, relationships, data lifecycles, and governance structures using Domain-Driven Design (DDD) principles.

---

## 1. Domain Boundary Map (Bounded Contexts)

To manage operational complexity and maintain high cohesion, Stadium OS is organized into six Bounded Contexts:

```
┌────────────────────────────────────────────────────────┐
│                    BOUNDED CONTEXTS                    │
├───────────────────┬───────────────────┬────────────────┤
│ Context           │ Bounded Context   │ Core Aggregate │
│ Name              │ Responsibility    │ Roots          │
├───────────────────┼───────────────────┼────────────────┤
│ Identity & Access │ Authenticating &  │ User, Role     │
│ Context (IAM)     │ authorization     │                │
├───────────────────┼───────────────────┼────────────────┤
│ Tournament Ops    │ Scheduling matches│ Tournament,    │
│ Context           │ teams & results   │ Match, Team    │
├───────────────────┼───────────────────┼────────────────┤
│ Stadium Ops       │ Tracking sensors  │ Stadium, Gate, │
│ Context           │ utilities & gates │ Sensor, Queue  │
├───────────────────┼───────────────────┼────────────────┤
│ Security & Triage │ Dispatching guards│ Incident,      │
│ Context           │ medical & alarms  │ Medical Case   │
├───────────────────┼───────────────────┼────────────────┤
│ Fan & Hospitality │ Managing tickets  │ Ticket, Order, │
│ Context           │ concessions & info│ FanProfile     │
├───────────────────┼───────────────────┼────────────────┤
│ AI Insights       │ Aggregating logs  │ Recommendation,│
│ Context           │ forecasting surges│ Prediction     │
└───────────────────┴───────────────────┴────────────────┘
```

---

## 2. Business Entities Specification

Every business entity represents a real operational concept. Below are the structural specifications for the core aggregate roots and entities:

### 2.1. Aggregate Root: User
*   **Purpose:** Represents any authenticated user profile accessing the system.
*   **Business Description:** The single source of identity, credentials, and configuration preferences for fans, volunteers, medical guards, security chiefs, and administrators.
*   **Responsibilities:** Authenticate credentials, enforce role permissions, store localization preferences.
*   **Lifecycle:** `Created -> Verified -> Active -> Suspended -> Archived`.
*   **Ownership:** Identity & Access Control Domain.
*   **Primary Attributes:** `userId` (UUID), `roleId` (UUID), `localePreference` (Enum [EN, ES, FR, AR]), `contactDetails` (Object).
*   **Real-Time Attributes:** `currentGeoLocation` (Coordinates), `deviceConnectionState` (Enum [Online, Offline]).
*   **Visibility Rules:** Geo-coordinates are visible only to Security and Medical dispatchers during active tasks.
*   **Retention Requirements:** Retained permanently until explicit account deletion is requested.

### 2.2. Aggregate Root: Match
*   **Purpose:** Represents a scheduled football fixture between two competing teams.
*   **Business Description:** The focal operational window of the stadium. Links match status to gates, concessions, security, and transit telemetry.
*   **Responsibilities:** Track time, scores, fouls, and lineups. Trigger post-match transportation and gate egress modes.
*   **Lifecycle:** `Scheduled -> PreMatch -> FirstHalf -> HalfTime -> SecondHalf -> PostMatch -> Completed`.
*   **Ownership:** Tournament Operations Domain.
*   **Primary Attributes:** `matchId` (UUID), `tournamentId` (UUID), `stadiumId` (UUID), `teams` (Array of Team IDs), `kickoffTime` (ISO 8601).
*   **Real-Time Attributes:** `currentMinute` (Integer), `currentScore` (String), `activeMatchEvents` (Array of fouls/cards/goals).
*   **AI Generated Attributes:** `predictedOutcomeProbability` (Float), `predictedEgressTimeCurve` (Array).
*   **Retention Requirements:** Maintained permanently as historical records.

### 2.3. Aggregate Root: Stadium
*   **Purpose:** Represents the physical venue, sectors, and internal infrastructure.
*   **Business Description:** The container for all sub-structures (Gates, Sections, Concessions, IoT Sensors).
*   **Responsibilities:** Coordinate total occupancy metrics, monitor utility energy draws.
*   **Lifecycle:** `Commissioned -> Active -> MaintenanceMode -> Decommissioned`.
*   **Ownership:** Venue Management Domain.
*   **Primary Attributes:** `stadiumId` (UUID), `name` (String), `capacity` (Integer), `locationCoordinates` (Coordinates).
*   **Real-Time Attributes:** `currentAttendance` (Integer), `utilityEnergyLoad` (kW), `hvacOffsetActive` (Boolean).
*   **Relationships:** Parent of `Gates`, `Sections`, `Sensors`, `FoodStalls`.

### 2.4. Entity: Gate
*   **Purpose:** Represents ingress and egress physical portals.
*   **Business Description:** Monitors passage velocity to direct fans and balance gate flows.
*   **Responsibilities:** Validate ticketing scans, track entry/exit logs.
*   **Lifecycle:** `Open -> Congested -> Restricted -> Closed`.
*   **Ownership:** Venue Management Domain.
*   **Parent:** `Stadium` (Composite relationship: deleting Stadium deletes Gate).
*   **Primary Attributes:** `gateId` (UUID), `stadiumId` (UUID), `gateName` (String).
*   **Real-Time Attributes:** `currentPassageRate` (Scans/min), `activeQueueWaitTime` (Minutes).
*   **AI Generated Attributes:** `predictedQueueBottleneckTime` (ISO 8601).

### 2.5. Aggregate Root: Incident
*   **Purpose:** Represents security, medical, or logistics emergencies.
*   **Business Description:** Core command center entity coordinating safety dispatches.
*   **Responsibilities:** Capture incident categories, track triage timelines, direct responders.
*   **Lifecycle:** `Reported -> Triaged -> Dispatched -> Resolved -> Closed`.
*   **Ownership:** Security Operations Domain.
*   **Primary Attributes:** `incidentId` (UUID), `category` (Enum [Security, Medical, Logistics]), `severity` (Enum [Critical, Alert, Info]), `reportedCoordinates` (Coordinates).
*   **Real-Time Attributes:** `assignedResponderId` (UUID), `status` (Enum), `responderDistance` (Meters).
*   **AI Generated Attributes:** `aiIncidentSummary` (String), `recommendedAction checklist` (Array), `optimalRouteCoordinates` (Array).
*   **Retention Requirements:** Retained permanently in security audit records.

---

## 3. Entity Relationship Mappings

```
Tournament (1) ───< Match (Many)
                     │
                     ├─── (1) Stadium (1) ───< Gate (Many)
                     │                         └─── (1) Queue (1)
                     │
                     ├─── (2) Team (Many) ───< Player (Many)
                     │
                     └───< Ticket (Many) ─── (1) User (1)
```

*   **Tournament to Match (One-to-Many):** A tournament comprises multiple scheduled matches.
*   **Stadium to Gate (One-to-Many Composition):** Deleting a Stadium entity Cascade-deletes all associated Gate records.
*   **Gate to Queue (One-to-One):** Each physical gate maps to a single crowd queue telemetry stream.
*   **User to Ticket (One-to-Many):** A user account profile can purchase and register multiple matchday digital ticket codes.
*   **Incident to Responder (One-to-One Association):** An active incident maps to the closest volunteer/medical responder during triage.

---

## 4. Real-Time vs. Static Data Models

### 4.1. Real-Time Data Model (High-frequency updates)
*   **Match State:** Ingests live score timeline events, match minutes, and team card statistics.
*   **Sensor Feeds:** Ingests HVAC load values, IoT waste bin weights, and water pressure rates.
*   **GPS Telemetry:** Streams coordinates from security guards, medical responder tablets, and transit shuttle trackers.
*   **Incident Logs:** Dispatches, status updates, and panic alarms.

### 4.2. Static Data Model (Low-frequency updates)
*   **Stadium Layouts:** Sector coordinates, gate names, seat numbers, elevator paths, and sensory rooms locations.
*   **Player & Team Profiles:** Registrations, player photos, country flags, and historical stats.
*   **Tournament Parameters:** Schedules, safety SOP checklists, and language dictionaries.

---

## 5. Pluggable AI Subsystem Data Entities

To support proactive operations, dedicated entities manage AI inference logs and predictions:

### 5.1. Entity: AI Recommendation
*   **Purpose:** Logs AI-generated optimization suggestions.
*   **Primary Attributes:** `recommendationId` (UUID), `contextId` (UUID, maps to active Gate/HVAC device), `rationale` (String), `confidenceScore` (Float).
*   **Real-Time Attributes:** `humanReviewStatus` (Enum [Pending, Executing, Applied, Dismissed]).
*   **AI Generated Attributes:** `expectedSavingsEstimate` (kW or Minutes).

### 5.2. Entity: Prediction
*   **Purpose:** Logs crowd density and wait-time projections.
*   **Primary Attributes:** `predictionId` (UUID), `targetEntity` (String, e.g. "Gate 3"), `targetTimestamp` (ISO 8601), `predictionValue` (Float).
*   **AI Generated Attributes:** `anomalyTriggerProbability` (Float).

---

## 6. Data Governance, Security & Lifecycles

```
Telemetry Ingest ──> Active DB Session ──> Cold Storage ──> Locked Audit Logs
 (JSON streams)     (Real-Time Cache)      (Archived JSON)    (Write-Once DB)
```

### 6.1. Data Classification
*   **Highly Sensitive (PII & Security):** User passwords, guard geolocations, patient medical symptoms, turnstile audit overrides. *Governance: Encryption at rest and in transit, strict RBAC, geofencing coordinates storage.*
*   **Operational (Internal Only):** HVAC loads, energy metrics, trash volumes, queue wait times, active task assignments. *Governance: Internal authorization, telemetry adapters encryption.*
*   **Public:** Scoreboards, lineups, general schedules, public transit arrival ETAs. *Governance: Read-only access configurations.*

### 6.2. Retention & Archiving Policy
*   **Match Telemetry & Scores:** Retained permanently.
*   **Volunteer Task Logs:** Moved to Cold Archive 30 days after match conclusion.
*   **Medical Diagnostic Symptoms:** Anonymized (PII scrubbed) 48 hours post-incident, retaining only generic metrics (e.g. "Heat stroke, Section 104, dispatch time 1m42s").
*   **System Activity Logs:** Maintained in audit logs for 1 year before automatic truncation.
