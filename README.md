Pen & Pulse — Where Ideas Come Alive

A modern full-stack blog application built with Next.js, MongoDB, and Tailwind CSS. Pen & Pulse allows users to share their ideas through posts, manage content, and interact with a clean, responsive interface.

Vercel App: https://pen-pulse-where-ideas-come-alive.vercel.app/


🚀 Features

User authentication with JWT and HTTP-only cookies

Create, edit, delete, and view blog posts

Role-based access: admin users can manage all posts

Responsive UI for mobile, tablet, and desktop devices

Dark mode support

Search and pagination for posts

Clean, modern design using Tailwind CSS

Optimized for performance and accessibility

🛠️ Tech Stack

Frontend: Next.js (App Router)

Backend: Next.js API Routes

Database: MongoDB with Mongoose

Authentication: JWT tokens

Styling: Tailwind CSS

Deployment: Vercel

📁 Project Structure
/app
  /api
    /auth
      route.js
    /posts
      route.js
      /[id]
        route.js
  /components
    Header.js
    PostCard.js
  /context
    AuthContext.js
  /models
    Post.js
    User.js
  /pages
    /login.js
    /register.js
    /profile.js
    /posts
      /create.js
      /my-blogs.js
  /utils
    auth.js
  /styles
    globals.css
tailwind.config.js
next.config.js
package.json
README.md

⚙️ Setup & Installation
1. Clone the Repository
git clone https://github.com/VishnuTechy/Pen-Pulse-Where-Ideas-Come-Alive-
cd Pen-Pulse-Where-Ideas-Come-Alive-

2. Install Dependencies
npm install

3. Configure Environment Variables

Create a .env file in the root directory:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000

4. Run the Development Server
npm run dev


Visit http://localhost:3000 in your browser.

📦 Scripts

dev — Starts the development server

build — Builds the application for production

start — Starts the production server

lint — Lints the codebase using ESLint

📄 License

This project is licensed under the MIT License.