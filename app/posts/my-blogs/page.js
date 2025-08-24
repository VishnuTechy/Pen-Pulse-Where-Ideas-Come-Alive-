'use client';
import { useEffect, useState } from "react";
import PostCard from "../../../components/PostCard";

export default function MyBlogsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchMyPosts() {
      const res = await fetch("/api/posts/me", { credentials: "include" }); 
      const data = await res.json();
      setPosts(data.posts || []);
    }
    fetchMyPosts();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">My Blogs</h1>
      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">You haven’t written any blogs yet.</p>
      )}
    </main>
  );
}
