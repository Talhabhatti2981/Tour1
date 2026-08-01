# Deploy Travel World on Vercel (Frontend + Backend)

This monorepo deploys as **two separate Vercel projects**:

| Project | Root Directory | URL role |
|---------|----------------|----------|
| Backend API | `tour-management/backend` | `https://YOUR-BACKEND.vercel.app` |
| Frontend | `tour-management/frontend` | `https://YOUR-FRONTEND.vercel.app` |

---

## 1. Push code to GitHub

Repo already points at: `https://github.com/Talhabhatti2981/Tour1.git`

```bash
git add .
git commit -m "Prepare frontend and backend for Vercel deployment"
git push origin main
```

Do **not** commit `.env` files (they are gitignored).

---

## 2. Deploy Backend (first)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `Tour1` GitHub repo
3. Configure:
   - **Project Name:** `travel-world-api` (or any name)
   - **Root Directory:** `tour-management/backend` (click Edit)
   - Framework Preset: Other
4. **Environment Variables** (Production + Preview):

| Name | Value |
|------|--------|
| `MONGO_URI` | your MongoDB Atlas connection string |
| `JWT_SECRET_KEY` | a long random secret |
| `CLIENT_URL` | `https://YOUR-FRONTEND.vercel.app` (update after frontend deploy; you can add localhost too) |
| `NODE_ENV` | `production` |

5. Deploy
6. Open the backend URL and check:
   - `https://YOUR-BACKEND.vercel.app/` → API running JSON
   - `https://YOUR-BACKEND.vercel.app/api/v1/health` → `{ "success": true }`
   - `https://YOUR-BACKEND.vercel.app/api/v1/tours` → tour list

**MongoDB Atlas:** Network Access → allow `0.0.0.0/0` (required for Vercel serverless IPs).

---

## 3. Deploy Frontend (second)

1. [vercel.com/new](https://vercel.com/new) → Import the **same** `Tour1` repo again (second project)
2. Configure:
   - **Project Name:** `travel-world`
   - **Root Directory:** `tour-management/frontend`
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
3. **Environment Variables:**

| Name | Value |
|------|--------|
| `REACT_APP_BASE_URL` | `https://YOUR-BACKEND.vercel.app/api/v1` |

4. Deploy

---

## 4. Connect CORS (important)

In the **backend** Vercel project → Settings → Environment Variables, set:

```text
CLIENT_URL=https://YOUR-FRONTEND.vercel.app,http://localhost:3000
```

Redeploy the backend after changing env vars.

If you change `REACT_APP_BASE_URL`, redeploy the **frontend** (CRA bakes env into the build).

---

## 5. Local development

**Backend**

```bash
cd tour-management/backend
cp .env.example .env   # fill MONGO_URI + JWT_SECRET_KEY
npm install
npm start
```

**Frontend**

```bash
cd tour-management/frontend
cp .env.example .env   # REACT_APP_BASE_URL=http://localhost:4000/api/v1
npm install
npm start
```

---

## Checklist

- [ ] Backend health route works on Vercel
- [ ] Frontend `REACT_APP_BASE_URL` points at backend `/api/v1`
- [ ] Backend `CLIENT_URL` includes the frontend Vercel domain
- [ ] MongoDB Atlas allows `0.0.0.0/0`
- [ ] Login / register / tours / booking work on the live site
