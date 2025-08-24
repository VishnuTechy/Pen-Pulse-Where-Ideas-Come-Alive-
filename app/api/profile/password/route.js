import { connectDB } from '../../../../lib/db'
import User from '../../../../models/User'
import { cookies } from 'next/headers'
import { verifyToken } from '../../../../utils/auth'
import bcrypt from 'bcryptjs'

export async function PUT(req) {
  await connectDB()
  const token = cookies().get('token')?.value
  const data = verifyToken(token || '')
  if (!data) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
  const { oldPassword, newPassword } = await req.json()
  if (!oldPassword || !newPassword) return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
  const user = await User.findById(data.sub)
  if (!user) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  const ok = await bcrypt.compare(oldPassword, user.passwordHash)
  if (!ok) return new Response(JSON.stringify({ message: 'Old password incorrect' }), { status: 400 })
  user.passwordHash = await bcrypt.hash(newPassword, 10)
  await user.save()
  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
