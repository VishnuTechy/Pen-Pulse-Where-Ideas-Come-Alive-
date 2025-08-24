'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../app/context/AuthContext';
import { HiMenu, HiX } from 'react-icons/hi'; // For hamburger icon

export default function Header() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="w-full flex items-center justify-between py-4 px-4 md:py-6 md:px-10">
        {/* Logo */}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          <Link
            href="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition duration-200"
          >
            Pen & Pulse
          </Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>

          {user ? (
            <>
              <Link href="/posts/my-blogs" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                My Blogs
              </Link>
              <Link href="/posts/create" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Create
              </Link>
              <Link href="/profile" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="ml-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-xl shadow-md hover:scale-105 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Register
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 dark:text-gray-100 focus:outline-none">
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 shadow-md">
          <Link href="/" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>

          {user ? (
            <>
              <Link href="/posts/my-blogs" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                My Blogs
              </Link>
              <Link href="/posts/create" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                Create
              </Link>
              <Link href="/profile" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link href="/admin" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl shadow-md hover:scale-105 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                Login
              </Link>
              <Link href="/register" className="block text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
