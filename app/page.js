'use client'
import PostCard from "../components/PostCard";
import { useEffect, useState } from 'react';

async function getPosts(searchParams) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const url = new URL(base + "/api/posts");
  if (searchParams?.q) url.searchParams.set("q", searchParams.q);
  if (searchParams?.page) url.searchParams.set("page", searchParams.page);
  if (searchParams?.limit) url.searchParams.set("limit", searchParams.limit);
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  return data;
}

export default function Home({ searchParams }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState(searchParams?.q || "");
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    async function loadPosts() {
      setLoading(true); // start loading
      const { posts = [], page = 1, totalPages = 1 } = await getPosts(searchParams);
      setPosts(posts);
      setPage(page);
      setTotalPages(totalPages);
      setQ(searchParams?.q || "");
      setLoading(false); // stop loading
    }

    loadPosts();
  }, [searchParams]);

  if (loading) {
    return (
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading posts...</p>
      </main>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Hero Section */}
      <div className="absolute inset-0"></div>

      {/* Page Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        {/* Search Bar */}
        <form action="/" className="mb-10 flex items-center gap-3 justify-center">
          <input
            name="q"
            placeholder="🔍 Search blogs by title or author..."
            defaultValue={q}
            className="flex-1 max-w-xl px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow-md hover:scale-105 transition duration-200"
          >
            Search
          </button>
        </form>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex gap-2 justify-center">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <a
              key={n}
              href={`/?q=${encodeURIComponent(q)}&page=${n}`}
              className={`px-4 py-2 rounded-lg border ${
                Number(page) === n
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {n}
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
