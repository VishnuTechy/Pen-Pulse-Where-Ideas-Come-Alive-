import { connectDB } from '../../../../lib/db'
import User from '../../../../models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  const { name, email, password } = await req.json()
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
  }
  await connectDB()
  const exist = await User.findOne({ email })
  if (exist) return new Response(JSON.stringify({ message: 'User exists' }), { status: 409 })
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash })
  return new Response(JSON.stringify({ id: user._id, name: user.name, email: user.email, role: user.role }), { status: 201 })
}
