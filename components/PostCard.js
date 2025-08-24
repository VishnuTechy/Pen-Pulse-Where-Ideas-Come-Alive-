import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col mb-6">
      {/* Featured image (optional) */}
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover group-hover:scale-105 transition"
        />
      )}

      {/* Card content */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        <div className="text-sm text-gray-500 flex gap-2 items-center">
          <span>{post.author?.name || "Unknown Author"}</span>
          <span>·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">
          <Link href={`/posts/${post._id}`}>{post.title}</Link>
        </h2>

        <p className="text-gray-600 flex-grow line-clamp-3">
          {post.content}
        </p>

        <div>
          <Link
            href={`/posts/${post._id}`}
            className="inline-block mt-2 text-blue-600 font-medium hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
