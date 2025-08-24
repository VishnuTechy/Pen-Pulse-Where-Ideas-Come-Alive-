import { connectDB } from '../../../lib/db'
import User from '../../../models/User'
import { cookies } from 'next/headers'
import { verifyToken } from '../../../utils/auth'

export async function PUT(req) {
  await connectDB()
  const token = cookies().get('token')?.value
  const data = verifyToken(token || '')
  if (!data) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  const body = await req.json()
  const updates = {}
  if (body.name) updates.name = body.name
  if (body.email) updates.email = body.email
  const user = await User.findByIdAndUpdate(data.sub, updates, { new: true }).select('-passwordHash')
  return new Response(JSON.stringify({ user }), { status: 200 })
}
