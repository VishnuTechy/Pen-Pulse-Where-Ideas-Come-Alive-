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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch("/api/posts/" + id)
      .then((r) => r.json())
      .then((d) => {
        setPost(d.post);
        if (user && d.post && user.id === d.post.author?._id) {
          setIsOwner(true);
        }
        if (user && user.role === "admin") {
          setIsOwner(true);
        }
      });
    fetch(`/api/posts/${id}/comments`)
      .then((r) => r.json())
      .then((data) => setComments(data.comments || []));
  }, [id]);

  async function addComment() {
    if (!newComment.trim()) return;

    const res = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment }),
    });

    if (res.ok) {
      const comment = await res.json();
      setComments([comment, ...comments]);
      setNewComment("");
    } else {
      alert("Failed to add comment");
    }
  }

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
        <p className="text-center text-gray-900 dark:text-gray-100 text-sm mb-4">
          By {post.author?.name} • {new Date(post.createdAt).toLocaleString()}
        </p>
        <div className="mt-25 whitespace-pre-wrap min-h-[30vh] text-gray-900 dark:text-gray-100 leading-relaxed text-lg px-10">
          {post.content}
        </div>
      </div>
      <div className="mt-10 px-10">
        <h3 className="text-xl font-bold mb-4">Comments</h3>

        {comments.length === 0 && <p>No comments yet.</p>}

        <ul className="space-y-4">
          {comments.map((c) => (
            <li
              key={c._id}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl"
            >
              <p className="text-sm font-semibold">{c.user.name}</p>
              <p className="text-gray-900 dark:text-gray-100">{c.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>

        {user && (
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2 text-lg"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={addComment}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl"
            >
              Post
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 md:px-8 md:py-6 flex justify-end items-center">
        {isOwner && (
          <div className="mt-10 flex flex-col md:flex-row justify-end gap-3 w-full">
            <Link
              href={`/posts/edit/${post._id}`}
              className="bg-blue-600 hover:bg-blue-700 text-white  py-2 px-5 rounded-xl transition-colors text-center w-full md:w-auto"
            >
              Edit
            </Link>
            <button
              onClick={remove}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-xl transition-colors text-center w-full md:w-auto"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
