import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
import Post from "../../../../models/Post";
import Comment from "../../../../models/Comments";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../utils/auth";

async function requireAdmin() {
  const token = cookies().get("token")?.value;
  const data = verifyToken(token || "");
  if (!data)
    return [
      null,
      new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      }),
    ];
  if (data.role !== "admin")
    return [
      null,
      new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 }),
    ];
  return [data, null];
}

export async function PUT(req, { params }) {
  await connectDB();
  const [_, err] = await requireAdmin();
  if (err) return err;
  const body = await req.json();
  const updates = {};
  if (body.name) updates.name = body.name;
  if (body.email) updates.email = body.email;
  if (body.role) updates.role = body.role; // 'admin' | 'user'
  const user = await User.findByIdAndUpdate(params.id, updates, {
    new: true,
  }).select("-passwordHash");
  if (!user)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  return new Response(JSON.stringify({ user }), { status: 200 });
}

export async function DELETE(_req, { params }) {
  await connectDB();
  const [_, err] = await requireAdmin();
  if (err) return err;
  const user = await User.findById(params.id);
  if (!user)
    return new Response(JSON.stringify({ message: "Not found" }), {
      status: 404,
    });
  await Post.deleteMany({ author: user._id }); // <-- delete all posts by user
  await Comment.deleteMany({ user: user._id });
  await user.deleteOne();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
