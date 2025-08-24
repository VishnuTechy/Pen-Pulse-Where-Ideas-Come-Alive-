'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    if (res.ok) router.push('/login')
    else {
      const j = await res.json().catch(()=>({}))
      alert(j.message || 'Register failed')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="card">
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1" />
        </label>
        <label className="mt-2">Email
          <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1" />
        </label>
        <label className="mt-2">Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1" />
        </label>
        <button className="mt-3 bg-green-600 text-white">Register</button>
      </form>
    </div>
  )
}
