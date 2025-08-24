import { connectDB } from "../../../lib/db";
import Post from "../../../models/Post";
import User from "../../../models/User";
import { cookies } from "next/headers";
import { verifyToken } from "../../../utils/auth";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() || "";
  const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10", 10), 1), 50);

  // Build match stage
  const matchStage = {};
  if (q) {
    matchStage.$or = [
      { title: { $regex: q, $options: "i" } },
      { "author.name": { $regex: q, $options: "i" } },
    ];
  }

  // Aggregation pipeline
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",         // your users collection
        localField: "author",  // field in posts
        foreignField: "_id",   // field in users
        as: "author",
      },
    },
    { $unwind: "$author" },
    { $match: matchStage },
    { $sort: { createdAt: -1 } },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $project: {
        title: 1,
        content: 1,
        author: { _id: 1, name: 1, email: 1 },
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ]);

  // Get total count for pagination
  const totalCountResult = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$author" },
    { $match: matchStage },
    { $count: "count" },
  ]);

  const total = totalCountResult[0]?.count || 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return new Response(JSON.stringify({ posts, page, totalPages, total }), {
    status: 200,
  });
}

export async function POST(req) {
  await connectDB();
  const token = cookies().get("token")?.value;
  const data = verifyToken(token || "");
  if (!data)
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  const { title, content } = await req.json();
  if (!title || !content)
    return new Response(JSON.stringify({ message: "Missing fields" }), {
      status: 400,
    });
  const post = await Post.create({ title, content, author: data.sub });
  const populated = await post.populate("author", "name email");
  return new Response(JSON.stringify({ post: populated }), { status: 201 });
}
