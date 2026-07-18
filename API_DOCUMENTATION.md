# FIFA World Cup 2026 Smart Stadium OS — Production API Documentation

This document provides explicit reference parameters, complete production API URLs, authentication types, and request/response payloads exposed by the **FIFA World Cup 2026 Smart Stadium Operating System Backend API**.

---

## 🌐 Production Connection Details

- **Live Production API Base URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1`
- **Root Health Check URL**: `https://fifa-smart-stadium-backend.onrender.com/`
- **WebSocket Gateway URL**: `wss://fifa-smart-stadium-backend.onrender.com/ws/operations`
- **Interactive Swagger Documentation**: [https://fifa-smart-stadium-backend.onrender.com/docs](https://fifa-smart-stadium-backend.onrender.com/docs)
- **ReDoc Document Spec**: [https://fifa-smart-stadium-backend.onrender.com/redoc](https://fifa-smart-stadium-backend.onrender.com/redoc)

---

## 🔑 Authentication Specifications

The system implements **Firebase ID Token Verification** with JWT Bearer authentication headers.

### Authentication Types Summary

1. **`Public (None)`**: Accessible without credentials (e.g., system health, match schedules, vendor catalogs, public telemetry).
2. **`Bearer Token (Firebase ID Token)`**: Protected endpoints requiring an active Firebase JWT token.

### Header Requirement for Protected Endpoints

```http
Authorization: Bearer <FIREBASE_ID_TOKEN>
Content-Type: application/json
```

---

## 📌 Complete Endpoint Reference & Real URLs

### 1. Root & System Health

#### `GET https://fifa-smart-stadium-backend.onrender.com/`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**:
  ```json
  {
    "title": "FIFA World Cup 2026 Smart Stadium OS",
    "api_docs": "/docs",
    "status": "online",
    "api_version": "1.0.0"
  }
  ```

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/health`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/health`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**:
  ```json
  {
    "status": "healthy",
    "database": "connected",
    "redis": "connected",
    "ai_provider": "google_genai_active",
    "environment": "production"
  }
  ```

---

### 2. Authentication & Identity Management

#### `POST https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/sync`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/sync`
- **Authentication Type**: `Bearer Token (Firebase ID Token)`
- **Request Headers**:
  ```http
  Authorization: Bearer <FIREBASE_ID_TOKEN>
  Content-Type: application/json
  ```
- **Request Body**:
  ```json
  {
    "username": "alex_mercer",
    "display_name": "Alex Mercer",
    "country": "United States",
    "favorite_team": "USA",
    "favorite_club": "LA Galaxy",
    "language": "en",
    "role": "Fan"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "id": "e83f2a11-54b9-4912-9c3a-23ef1129b0a1",
    "email": "alex@example.com",
    "username": "alex_mercer",
    "display_name": "Alex Mercer",
    "country": "United States",
    "favorite_team": "USA",
    "favorite_club": "LA Galaxy",
    "role": "Fan",
    "language": "en"
  }
  ```

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/check-username`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/check-username?username=alex_mercer`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**:
  ```json
  {
    "username": "alex_mercer",
    "available": true
  }
  ```

#### `POST https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/logout`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/auth/logout`
- **Authentication Type**: `Bearer Token (Firebase ID Token)`
- **Response `200 OK`**:
  ```json
  {
    "message": "Session logged out successfully"
  }
  ```

---

### 3. User Profiles & Preferences

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/users/me`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/users/me`
- **Authentication Type**: `Bearer Token (Firebase ID Token)`
- **Response `200 OK`**: Authenticated user record.

#### `PUT https://fifa-smart-stadium-backend.onrender.com/api/v1/users/me/preferences`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/users/me/preferences`
- **Authentication Type**: `Bearer Token (Firebase ID Token)`
- **Request Body**:
  ```json
  {
    "email_updates": true,
    "push_notifications": true,
    "sms_alerts": false
  }
  ```
- **Response `200 OK`**: `{"success": true}`

---

### 4. Operational Telemetry Dashboard

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/dashboard`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/dashboard`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**:
  ```json
  {
    "status": "Optimal",
    "attendance": 82500,
    "active_tickets": 82194,
    "energy_consumption_mw": 14.2,
    "renewables_percentage": 33.1,
    "water_consumption_gallons": 45000,
    "active_incidents": 3,
    "volunteers_online": 145,
    "supplies_level_percent": 91.0
  }
  ```

---

### 5. Tournament & Live Matches

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/matches`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/matches`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**: List of scheduled FIFA World Cup 2026 matches.

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/matches/live`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/matches/live`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**:
  ```json
  [
    {
      "id": "m-101",
      "homeTeam": "Mexico",
      "awayTeam": "South Korea",
      "homeScore": 2,
      "awayScore": 1,
      "minute": 74,
      "status": "live",
      "stadium": "Estadio Azteca"
    }
  ]
  ```

---

### 6. AI Intelligence Platform (Google Gemini)

#### `POST https://fifa-smart-stadium-backend.onrender.com/api/v1/ai/chat`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/ai/chat`
- **Authentication Type**: `Public (None)` / Optional User Identification
- **Request Body**:
  ```json
  {
    "prompt": "Summarize current crowd density at Gate 4 and recommended rerouting.",
    "context": "Executive Dashboard"
  }
  ```
- **Response `200 OK`**:
  ```json
  {
    "response": "Gate 4 is operating at 88% capacity. Attendees are recommended to use Gates 1 and 2 where wait times are under 3 minutes."
  }
  ```

---

### 7. Food, Beverage & Merchandise Commerce

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/commerce/food/menu`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/commerce/food/menu`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**: Food & beverage catalog.

#### `GET https://fifa-smart-stadium-backend.onrender.com/api/v1/commerce/merchandise/catalog`
- **Full URL**: `https://fifa-smart-stadium-backend.onrender.com/api/v1/commerce/merchandise/catalog`
- **Authentication Type**: `Public (None)`
- **Response `200 OK`**: Official tournament merchandise catalog.

---

### 8. Real-Time WebSocket Gateway

#### `WS wss://fifa-smart-stadium-backend.onrender.com/ws/{room}`
- **Full URL**: `wss://fifa-smart-stadium-backend.onrender.com/ws/operations`
- **Authentication Type**: `Public (None)`
- **Protocols**: Send `"ping"` string $\rightarrow$ receive `"pong"`. Real-time incident & goal broadcasts.
