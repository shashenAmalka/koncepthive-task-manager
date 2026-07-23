# Koncepthive Task Manager — Frontend

A modern SaaS-style task management dashboard built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **State:** Zustand (auth) + TanStack Query (server state)
- **Forms:** React Hook Form + Zod validation
- **HTTP:** Axios with JWT interceptors
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Dates:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Full Repository Setup (Backend & Database)

1. Navigate to backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables in `backend/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/koncepthive_db?schema=public"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   ```

3. Run Prisma database migrations and seed default data:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

4. Start backend server:
   ```bash
   npm run dev
   # Backend running on http://localhost:5000
   ```

### Frontend Setup

```bash
cd frontend
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Backend API base URL |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (login)/            # Auth pages (no sidebar)
│   ├── dashboard/          # Protected pages (with sidebar)
│   └── globals.css         # Design tokens + Tailwind
├── components/
│   ├── ui/                 # shadcn-style primitives
│   ├── layout/             # Sidebar, Topbar, AppLayout
│   ├── dashboard/          # Dashboard-specific components
│   ├── tasks/              # Task list components
│   ├── forms/              # Login & Task forms
│   └── common/             # Reusable badges, dialogs, etc.
├── hooks/                  # Custom React hooks
├── services/               # API service layer
├── lib/                    # Axios instance, auth helpers, utils
├── types/                  # TypeScript interfaces
├── store/                  # Zustand stores
└── middleware.ts            # Route protection
```

## Features

- JWT authentication with token persistence
- Dashboard with real-time statistics and charts
- Full task CRUD with modal forms
- Search, filter, sort, and pagination
- Dark mode toggle
- Responsive design with collapsible sidebar
- Loading skeletons and empty states
- Toast notifications
- Global error boundary
