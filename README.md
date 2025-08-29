# Techzu Comments App

A full-stack web application for posting, liking, disliking, and replying to comments. Built with React, Vite, Tailwind CSS (frontend), and Express, MongoDB, JWT authentication (backend).

## Project Structure

```
backend/
  src/
    controllers/
    dto/
    middlewares/
    models/
    repository/
    routes/
    services/
    utils/
  package.json
  tsconfig.json
  .env
frontend/
  src/
    api/
    assets/
    auth/
    components/
    context/
    pages/
    routes/
    utils/
    App.tsx
    main.tsx
    index.css
  package.json
  tsconfig.json
  .env
```

## Features

- User registration & login (JWT authentication)
- Post, edit, delete comments
- Like/dislike comments
- Reply to comments
- Paginated comment feed
- Protected/private routes
- Responsive UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB

### Backend Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Configure environment variables in `.env` (see `src/config.ts` for required keys).
3. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Install dependencies:
   ```sh
   cd frontend
   npm install
   ```
2. Configure API base URL in `frontend/.env`:
   ```
   VITE_API_URL_BASE_URL=http://localhost:5000
   ```
3. Start the frontend dev server:
   ```sh
   npm run dev
   ```

## Usage

- Visit [http://localhost:5173](http://localhost:5173) (default Vite port).
- Register or login to access comment features.
- Comments and replies are paginated and sortable.

## Scripts

- **Backend**
  - `npm run dev` — Start backend with nodemon
  - `npm run build` — Compile TypeScript
  - `npm start` — Run compiled server

- **Frontend**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build for production
  - `npm run preview` — Preview production build
  - `npm run lint` — Run ESLint

## Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Express, MongoDB (Mongoose), JWT, bcrypt

## License

MIT

---

For details on API endpoints and code, see the respective folders:

