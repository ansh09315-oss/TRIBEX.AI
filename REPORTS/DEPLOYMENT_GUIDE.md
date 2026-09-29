# TribeX AI: Scalable Production Deployment Blueprint
**Author:** Senior DevOps & Cloud Infrastructure Engineer  
**Target Environments:** Vercel (Frontend PWA) + AWS / Kubernetes / Docker (Backend & State Infrastructure)  
**Document Ref:** `TRX-DEPL-GUIDE-2026-V1`

---

## Executive Overview
TribeX AI implements a hybrid public cloud architecture:
- **Edge / Client Tier (Frontend PWA)**: Deployed to **Vercel** for global CDN edge delivery, automatic SSL, asset compression, and instant failover.
- **Microservices & State Tier (Backend API, Database, Cache, Vault)**: Containerized with **Docker** and orchestrated on Kubernetes / AWS ECS / Render with persistent SSD volumes.

---

## Phase A: Frontend Deployment (Vercel)

### 1. `vercel.json` Configuration
The root [vercel.json](../vercel.json) configures SPA client-side routing, service worker caching headers, and security rules:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://api.tribex.gov.in/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### 2. Step-by-Step Vercel Setup Instructions

1. **Link GitHub Repository**:
   - Log in to [Vercel](https://vercel.com).
   - Click **Add New...** $\rightarrow$ **Project**.
   - Select your GitHub repository: `ansh09315-oss/TRIBEX.AI`.
2. **Configure Project Settings**:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (or `frontend` if deploying frontend subfolder independently).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. **Configure Environment Variables in Vercel Dashboard**:
   Navigate to **Project Settings** $\rightarrow$ **Environment Variables** and add:
   - `VITE_API_URL`: `https://api.tribex.gov.in/api/v1` (or your backend domain)
   - `VITE_ENABLE_MOCK_BLE`: `true`
   - `VITE_ENABLE_PWA`: `true`
4. **Deploy**:
   - Click **Deploy**. Vercel will build the production bundle, deploy to edge nodes globally, and generate an automated preview domain (e.g., `tribex-ai.vercel.app`).

---

## Phase B: Backend & State Infrastructure

### 1. Backend Containerization (`Dockerfile`)
The backend is packaged using a multi-stage Docker build located at [backend/Dockerfile](../backend/Dockerfile):

```dockerfile
# Multi-stage Dockerfile for FastAPI Backend
FROM python:3.11-slim as builder
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 curl && rm -rf /var/lib/apt/lists/*

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH
COPY . /app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 2. Multi-Container Orchestration (`docker-compose.yml`)
The complete stack (PostgreSQL, Redis, MinIO, FastAPI Backend, and Nginx) is orchestrated via [deployment/docker-compose.yml](../deployment/docker-compose.yml):

```bash
cd deployment
docker compose up -d
```

---

## Phase C: Production Persistence & Reliability Checklist

### 1. PostgreSQL Relational Database
- [x] **Persistent Storage Volume**: Data mapped to external SSD volume (`postgres_data:/var/lib/postgresql/data`).
- [x] **Automated Initialization**: Schema (`init.sql`) and seed data (`seed_mock_data.sql`) executed automatically upon container genesis via `/docker-entrypoint-initdb.d/`.
- [x] **Health Check**: Automated polling via `pg_isready -U tribex_admin -d tribex_db` before starting backend services.
- [ ] **Automated Backup Strategy**: Implement daily cron backups via `pg_dump`:
  ```bash
  0 2 * * * docker exec tribex_postgres pg_dump -U tribex_admin tribex_db | gzip > /backups/tribex_$(date +\%F).sql.gz
  ```

### 2. Redis In-Memory Cache & Queue
- [x] **Append-Only File (AOF) Persistence**: Started with `--appendonly yes` to prevent data loss across restarts during batch offline syncs.
- [x] **Memory Eviction Policy**: Configured to `volatile-lru` to protect active verification sessions.
- [x] **Persistence Mount**: Mapped to `redis_data:/data`.

### 3. MinIO Encrypted Object Vault
- [x] **Automatic Bucket Provisioning**: Initialized via `minio/mc` container to guarantee bucket `tribex-encrypted-vault` exists.
- [x] **Server-Side Encryption (SSE)**: AES-256 enabled for all stored sanction letters and verification audit logs.
- [x] **Console Access**: Secure management console accessible on port `9001`.
