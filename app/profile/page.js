'use client'
import { useEffect, useState } from 'react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')

  useEffect(() => {
    fetch('/api/auth/me').then(r=>r.json()).then(d=>{
      setUser(d.user)
      if (d.user) { setName(d.user.name); setEmail(d.user.email) }
    })
  }, [])

  if (!user) return <p>Loading...</p>

  async function saveProfile(e) {
    e.preventDefault()
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name, email })
    })
    alert(res.ok ? 'Saved' : 'Failed')
  }

  async function changePassword(e) {
    e.preventDefault()
    const res = await fetch('/api/profile/password', {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
    })
    alert(res.ok ? 'Password changed' : 'Failed')
    setOldPass(''); setNewPass('')
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <form onSubmit={saveProfile} className="card">
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} className="mt-1" />
        </label>
        <label className="mt-2">Email
          <input value={email} onChange={e=>setEmail(e.target.value)} className="mt-1" />
        </label>
        <button className="mt-3 bg-blue-600 text-white">Save</button>
      </form>

      <h3 className="mt-6 text-lg font-semibold">Change Password</h3>
      <form onSubmit={changePassword} className="card">
        <label>Old Password
          <input type="password" value={oldPass} onChange={e=>setOldPass(e.target.value)} className="mt-1" />
        </label>
        <label className="mt-2">New Password
          <input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} className="mt-1" />
        </label>
        <button className="mt-3 bg-gray-800 text-white">Change Password</button>
      </form>
    </div>
  )
}
