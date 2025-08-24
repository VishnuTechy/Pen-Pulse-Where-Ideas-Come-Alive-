// filepath: components/Header.js
'use client';
import Link from 'next/link';
import { useAuth } from '../app/context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between py-4 px-6">
      <h1 className="text-xl font-bold">
        <Link href="/">NextBlog</Link>
      </h1>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        {user ? (
          <>
            <Link href="/posts/create">Create</Link>
            <Link href="/profile">Profile</Link>
            {user.role === 'admin' && <Link href="/admin">Admin</Link>}
            <button
              onClick={logout}
              className="ml-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </div>
  );
}
