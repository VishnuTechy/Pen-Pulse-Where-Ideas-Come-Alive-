'use client';
import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="w-full flex items-center justify-between py-6 px-10">
        {/* Logo */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition duration-200"
          >
            Pen & Pulse
          </Link>
        </h1>

        {/* Nav */}
        <nav className="space-x-6 flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Link
            href="/"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Home
          </Link>

          {user ? (
            <>
              {/* My Blogs visible only when logged in */}
              <Link
                href="/posts/my-blogs"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                My Blogs
              </Link>

              <Link
                href="/posts/create"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Create
              </Link>
              <Link
                href="/profile"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Profile
              </Link>

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="ml-6 bg-gradient-to-r from-red-500 to-pink-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:scale-105 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
