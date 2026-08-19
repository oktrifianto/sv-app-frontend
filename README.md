# Post Article — Frontend (React + Vite)

Dashboard and blog preview for article management. Built with React 19, Vite, and Tailwind CSS v4.

---

## Prerequisites

- Node.js 18+
- The backend API must be running (see `../backend/README.md`)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

`.env` values:

| Key | Default | Description |
|---|---|---|
| `VITE_API_URL` | `http://localhost:8080` | Base URL of the backend API |

### 3. Start the dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/` | All Posts | Tabbed view: Published / Drafts / Trashed |
| `/add` | Add New | Form to create an article (Publish or Draft) |
| `/edit/:id` | Edit Article | Pre-filled form to update an article |
| `/preview` | Preview | Blog view of published articles with pagination |

---

## Project structure

```
src/
├── api/
│   ├── client.ts        # axios instance (reads VITE_API_URL)
│   └── articles.ts      # API functions for each endpoint
├── components/
│   ├── Layout.tsx        # page wrapper with navbar
│   ├── Navbar.tsx        # responsive navigation
│   ├── PostTable.tsx     # table (desktop) / cards (mobile)
│   ├── ArticleForm.tsx   # shared create/edit form with validation
│   └── Pagination.tsx    # prev/next page controls
├── pages/
│   ├── Dashboard.tsx
│   ├── AddNew.tsx
│   ├── EditArticle.tsx
│   └── Preview.tsx
├── routes/
│   └── AppRoutes.tsx
├── types/
│   └── article.ts       # shared Article interface
└── utils/
    └── validation.ts     # client-side validation mirroring backend rules
```

---

## Assumptions

- The backend is running at the URL set in `VITE_API_URL` before starting the frontend.
- CORS on the backend is configured to allow `http://localhost:5173`.
