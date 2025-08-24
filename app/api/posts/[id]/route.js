import { connectDB } from '../../../../lib/db'
import Post from '../../../../models/Post'
import { cookies } from 'next/headers'
import { verifyToken } from '../../../../utils/auth'
import Comment from "../../../../models/Comments";
export async function GET(_req, { params }) {
  await connectDB()
  const post = await Post.findById(params.id).populate('author', 'name email')
  if (!post) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  return new Response(JSON.stringify({ post }), { status: 200 })
}

export async function PUT(req, { params }) {
  await connectDB()
  const token = cookies().get('token')?.value
  const data = verifyToken(token || '')
  if (!data) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  const post = await Post.findById(params.id)
  if (!post) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  if (post.author.toString() !== data.sub && data.role !== 'admin') {
    return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 })
  }
  const body = await req.json()
  post.title = body.title ?? post.title
  post.content = body.content ?? post.content
  await post.save()
  await post.populate('author', 'name email')
  return new Response(JSON.stringify({ post }), { status: 200 })
}

export async function DELETE(_req, { params }) {
  await connectDB()
  const token = cookies().get('token')?.value
  const data = verifyToken(token || '')
  if (!data) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  const post = await Post.findById(params.id)
  if (!post) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  if (post.author.toString() !== data.sub && data.role !== 'admin') {
    return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 })
  }
  await post.deleteOne()
  await Comment.deleteMany({ post: params.id });
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
