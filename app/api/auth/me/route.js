import { connectDB } from '../../../../lib/db'
import User from '../../../../models/User'
import { cookies } from 'next/headers'
import { verifyToken } from '../../../../utils/auth'

export async function GET() {
  await connectDB()
  const token = cookies().get('token')?.value
  if (!token) return new Response(JSON.stringify({ user: null }), { status: 200 })
  const data = verifyToken(token)
  if (!data) return new Response(JSON.stringify({ user: null }), { status: 200 })
  const user = await User.findById(data.sub).select('-passwordHash')
  if (!user) return new Response(JSON.stringify({ user: null }), { status: 200 })
  return new Response(JSON.stringify({ user }), { status: 200 })
}
