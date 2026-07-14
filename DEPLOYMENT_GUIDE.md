# Deployment Guide
## FIFA World Cup 2026 Smart Stadium Operating System

This guide outlines the production deployment strategy for the decoupled backend infrastructure and the Next.js React frontend.

### Pre-Deployment Setup

#### 1. Environment Variables
You must securely populate two environment files. Refer to `.env.development` and `.env.production` for the required keys.

```env
# Required for Production Backend:
DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/stadium
REDIS_URL=redis://host:6379/0
CELERY_BROKER_URL=redis://host:6379/1
GOOGLE_GENAI_API_KEY=your_key
FOOTBALL_API_KEY=your_key

# Required for Production Frontend:
NEXT_PUBLIC_API_URL=https://api.stadium.fifa.com
NEXT_PUBLIC_WEBSOCKET_URL=wss://api.stadium.fifa.com/ws
```

### Backend Deployment (Docker)

The backend is fully containerized and comprises FastAPI, PostgreSQL, Redis, and a Celery worker pool.

1. **Clone the Repository on the Host Server**
   ```bash
   git clone https://github.com/your-repo/fifa-world-cup-2026.git
   cd fifa-world-cup-2026
   ```

2. **Configure Production Environment**
   Place your production secrets in `.env`.

3. **Deploy via Docker Compose**
   This command builds the images, provisions the database volumes, and starts all background workers detached.
   ```bash
   docker-compose -f docker-compose.yml up -d --build
   ```

4. **Verify Health**
   ```bash
   curl https://your-backend-domain/api/v1/health/full
   ```
   *Expected output:* A JSON payload indicating `{"status": "healthy"}` across all sub-components.

### Frontend Deployment (Firebase Hosting / Vercel)

The Next.js frontend is static/SSR optimized and relies on external API calls to the backend infrastructure.

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Execute Production Build**
   ```bash
   pnpm build
   ```

3. **Deploy to Vercel (Recommended for Next.js)**
   Ensure your GitHub repository is connected to Vercel. 
   - Framework: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
   - **Crucial:** Add `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_WEBSOCKET_URL` to the Vercel Environment Variables pane.

4. **Alternative: Firebase Hosting**
   ```bash
   firebase deploy --only hosting
   ```

### Continuous Integration (CI/CD)

The repository uses **GitHub Actions** (`.github/workflows/production.yml`) to ensure code quality.
On every push to `main`:
- The Next.js frontend is linted (`npm run lint`) and built (`npm run build`).
- The Python dependencies are validated.
- The `Dockerfile` is built to ensure no configuration regressions exist before deployment.
