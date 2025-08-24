import { connectDB } from '../../../lib/db'
import User from '../../../models/User'
import { cookies } from 'next/headers'
import { verifyToken } from '../../../utils/auth'

export async function GET() {
  await connectDB()
  const token = cookies().get('token')?.value
  const data = verifyToken(token || '')
  if (!data) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  if (data.role !== 'admin') return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 })
  const users = await User.find({ role: 'user' }).select('-passwordHash') // <-- only users with role 'user'
  return new Response(JSON.stringify({ users }), { status: 200 })
}