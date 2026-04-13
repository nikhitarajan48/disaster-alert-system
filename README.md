# Disaster Alert & Resource Mapping System

A beginner-friendly full-stack emergency assistance platform with disaster alerts, resource mapping, SOS support, and role-based admin controls.

## Tech Stack

- Frontend: React + Vite + CSS + Leaflet
- Backend: Node.js + Express
- Storage: Local JSON file (`backend/src/data/store.json`) - no database required
- Auth: JWT + bcrypt

## Features

- Modern dark dashboard UI with responsive sidebar
- Disaster alerts (Flood, Earthquake, Fire, Cyclone, etc.)
- Admin CRUD for alerts/resources
- Interactive map with user geolocation + resource markers
- Resource filtering (hospital/shelter/police)
- SOS floating button with nearest resources + emergency contacts
- Signup/Login with role support (`admin` / `user`)
- New-alert notification and loading animation

## Folder Structure

```txt
nikhita/
  backend/
    src/
      controllers/
      data/
      middleware/
      routes/
      utils/
      app.js
      server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
      utils/
      App.jsx
      main.jsx
      styles.css
```

## Backend Setup

1. Go to backend:

```bash
cd backend
```

2. Install packages:

```bash
npm install
```

3. Create `.env` from `.env.example`:

```env
PORT=5000
JWT_SECRET=super_secret_change_me
CLIENT_URL=http://localhost:5173
```

4. Run backend:

```bash
npm run dev
```

## Frontend Setup

1. Go to frontend:

```bash
cd frontend
```

2. Install packages:

```bash
npm install
```

3. Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Run frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

## REST API Endpoints

### Users
- `POST /api/users/signup`
- `POST /api/users/login`
- `GET /api/users/profile` (protected)

### Alerts
- `GET /api/alerts`
- `POST /api/alerts` (admin)
- `PUT /api/alerts/:id` (admin)
- `DELETE /api/alerts/:id` (admin)

### Resources
- `GET /api/resources`
- `GET /api/resources?type=hospital`
- `GET /api/resources/nearest?latitude=..&longitude=..&limit=5`
- `POST /api/resources` (admin)
- `PUT /api/resources/:id` (admin)
- `DELETE /api/resources/:id` (admin)

## Deployment

### Backend (Render)
- Push `backend/` to GitHub.
- Create a Render Web Service.
- Build command: `npm install`
- Start command: `npm start`
- Add env vars (`PORT`, `JWT_SECRET`, `CLIENT_URL`).

### Frontend (Vercel/Netlify)
- Push `frontend/` to GitHub.
- Import project to Vercel or Netlify.
- Add `VITE_API_URL` pointing to deployed backend URL + `/api`.

### Data persistence note
- App data is stored in `backend/src/data/store.json`.
- Keep this file writable on your server for persistence.

## Notes

- To create an admin account, sign up and choose role `admin`.
- For production, keep strong `JWT_SECRET` and secure CORS origins.
- Demo alerts/resources are preloaded in `backend/src/data/store.json` so the UI looks populated immediately.
