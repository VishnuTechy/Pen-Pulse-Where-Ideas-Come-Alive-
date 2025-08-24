import { connectDB } from "../../../../lib/db";
import Post from "../../../../models/Post";
import { cookies } from "next/headers";
import { verifyToken } from "../../../../utils/auth";

export async function GET() {
  try {
        console.log("1111");
    await connectDB();
    console.log("1111");
    // read token from cookies
    const token = cookies().get("token")?.value;
    const data = verifyToken(token || "");

    if (!data) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // fetch posts for this user
    const posts = await Post.find({ author: data.sub }).sort({ createdAt: -1 });
    return new Response(JSON.stringify({ posts: posts || [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
