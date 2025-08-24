# Blog Application — Next.js App Router + Manual JWT + MongoDB

A production-like blog app implementing the machine test requirements.

## Stack
- Next.js **App Router**
- **Manual JWT** authentication (HTTP-only cookie)
- **MongoDB** with Mongoose
- **Tailwind CSS**
- API Routes in `app/api/.../route.js`

## Features
- Register, Login, Logout (JWT set/cleared via HTTP-only cookie)
- **Role-based access**: `admin` (manage all posts/users), `user` (own posts)
- Blog **CRUD**: title, content, author, created/updated
- **Comments system**:
  - Authenticated users can add comments on posts
  - Comments show author, content, and timestamp
  - Comments automatically refresh after posting
- Public **blog list** and **post detail**
- **Profile** page: view & edit profile, change password
- **Search & pagination** for posts (bonus)
- Clean, reusable components

## Getting Started
1. Copy `.env.example` to `.env.local` and fill:
   - `MONGO_URI`
   - `JWT_SECRET`
   - (Optional) `NEXT_PUBLIC_BASE_URL` for SSR fetches in production
2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
3. Visit http://localhost:3000

## Deployed in (Vercel)

Visit https://pen-pulse-where-ideas-come-alive.vercel.app/

## API Overview

### Auth
- `POST /api/auth/register` — `{name,email,password}`
- `POST /api/auth/login` — `{email,password}` (sets cookie `token`)
- `POST /api/auth/logout` — clears cookie
- `GET /api/auth/me` — returns current user (from cookie)

### Posts
- `GET /api/posts` — list posts (query: `q`, `page`, `limit`)
- `POST /api/posts` — create post (auth required)
- `GET /api/posts/:id` — read post detail
- `PUT /api/posts/:id` — update (owner or admin)
- `DELETE /api/posts/:id` — delete (owner or admin)

### Comments
- `GET /api/posts/:id/comments` — list comments for a post
- `POST /api/posts/:id/comments` — add a comment (auth required)
- *(Optional/extendable)* `DELETE /api/posts/:id/comments/:commentId` — delete comment (owner or admin)

### Users & Profile
- `GET /api/users` — admin list users
- `PUT /api/profile` — update current user (name/email)
- `PUT /api/profile/password` — change password


## Notes
- Initial users are created with role `user`. Manually promote a user to `admin` in DB if needed.
- For SSR fetches, the home page uses `NEXT_PUBLIC_BASE_URL` fallback to `http://localhost:3000`.

