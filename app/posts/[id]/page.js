"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext"; // Import the AuthContext

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [post, setPost] = useState(null);
  const { user } = useAuth(); // Access the current user from AuthContext
  const [isOwner, setIsOwner] = useState(false);
  useEffect(() => {
    if (!id) return;
    fetch("/api/posts/" + id)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post);
        console.log(user, "post", d.post);
        if (user && d.post && user.id === d.post.author?._id) {
          setIsOwner(true);
        }
        if (user && user.role === "admin") {
          setIsOwner(true);
        }
      });
  }, [id]);

  async function remove() {
    if (!confirm("Delete post?")) return;
    const res = await fetch("/api/posts/" + id, { method: "DELETE" });
    if (res.ok) router.push("/");
    else {
      const j = await res.json().catch(() => ({}));
      alert(j.message || "Error");
    }
  }

  if (!post) return <p>Loading...</p>;

  return (
    <article className="card bg-white shadow-xl rounded-2xl overflow-hidden mx-auto max-w-2xl my-8 md:my-12 min-h-[60vh] min-w-[60vw]">
      <div className="px-6 py-4 md:px-8 md:py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 dark:text-blue-500 mb-4">
          {post.title}
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="mt-25 whitespace-pre-wrap min-h-[30vh] text-gray-700 dark:text-gray-300 leading-relaxed text-lg px-10">
          {post.content}
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 md:px-8 md:py-6 flex justify-end items-center">
        {isOwner && ( // Conditionally render the buttons
          <>
            <Link
              href={`/posts/edit/${post._id}`}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mr-2 transition-colors"
            >
              Edit
            </Link>
            <button
              onClick={remove}
              className="bg-red-500 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-900 text-white font-bold py-2 px-4 rounded-xl transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}
