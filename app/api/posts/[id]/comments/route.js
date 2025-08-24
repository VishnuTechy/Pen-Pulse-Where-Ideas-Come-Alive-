import { connectDB } from '../../../../../lib/db'
import Comment from "../../../../../models/Comments"
import { cookies } from "next/headers";
import { verifyToken } from "../../../../../utils/auth";

export async function GET(req, { params }) {
  await connectDB();
  const postId = params.id;

  const comments = await Comment.find({ post: postId })
    .populate("user", "name email")
    .sort({ createdAt: -1 }); // newest first

  return new Response(JSON.stringify({ comments }), { status: 200 });
}

export async function POST(req, { params }) {
  await connectDB();
  const token = cookies().get("token")?.value;
  const data = verifyToken(token || "");
  if (!data)
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const postId = params.id;
  const { content } = await req.json();
  if (!content)
    return new Response(JSON.stringify({ message: "Missing content" }), { status: 400 });

  const comment = await Comment.create({ post: postId, user: data.sub, content });
  await comment.populate("user", "name email");

  return new Response(JSON.stringify(comment), { status: 201 });
}
