import { connectDB } from '../../../../lib/db'
import User from '../../../../models/User'
import bcrypt from 'bcryptjs'
import { signToken } from '../../../../utils/auth'

export async function POST(req) {
  const { email, password } = await req.json()
  if (!email || !password) return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
  await connectDB()
  const user = await User.findOne({ email })
  console.log(user)
  if (!user) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  const ok = await bcrypt.compare(password, user.passwordHash)
  if (!ok) return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  const token = signToken({ sub: user._id.toString(), role: user.role, email: user.email })
  const headers = new Headers()
  headers.append('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${7*24*60*60}; SameSite=Lax`)
  return new Response(JSON.stringify({ id: user._id, name: user.name, email: user.email, role: user.role }), { status: 200, headers })
}
