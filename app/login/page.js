'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext';
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { login } = useAuth();
  async function submit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })
     if (res.ok) {
      const userData = await res.json();
      console.log(userData)
      login(userData); // Update the auth context
      router.push('/');
    }

    else {
      const j = await res.json().catch(()=>({}))
      alert(j.message || 'Login failed')
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="card">
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1" />
        </label>
        <label className="mt-2">Password
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-1" />
        </label>
        <button className="mt-3 bg-blue-600 text-white">Login</button>
      </form>
    </div>
  )
}
