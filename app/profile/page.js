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
      if (d.user) { 
        setName(d.user.name); 
        setEmail(d.user.email) 
      }
    })
  }, [])

  if (!user) return <p className="text-center mt-10 text-gray-500">Loading...</p>

  async function saveProfile(e) {
    e.preventDefault()
    const res = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name })
    })
    alert(res.ok ? 'Saved' : 'Failed')
  }

  async function changePassword(e) {
    e.preventDefault()
    let res = await fetch('/api/profile/password', {
      method: 'PUT',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ oldPassword: oldPass, newPassword: newPass })
    })
    res= await res.json();
    alert(res.ok ? 'Password changed' : res.message || 'Failed')
    setOldPass(''); setNewPass('')
  }

  return (
    <div className=" min-h-screen  max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-600 dark:text-blue-400">Profile</h2>

      {/* Profile Card */}
      <form 
        onSubmit={saveProfile} 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Name</label>
          <input 
            value={name} 
            onChange={e=>setName(e.target.value)} 
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Email</label>
          <input 
            value={email} 
            disabled 
            className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        <button 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-xl shadow hover:scale-105 transition"
        >
          Save Changes
        </button>
      </form>

      {/* Password Card */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Change Password</h3>
        <form 
          onSubmit={changePassword} 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">Old Password</label>
            <input 
              type="password" 
              value={oldPass} 
              onChange={e=>setOldPass(e.target.value)} 
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">New Password</label>
            <input 
              type="password" 
              value={newPass} 
              onChange={e=>setNewPass(e.target.value)} 
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button 
            className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold py-2 rounded-xl shadow hover:scale-105 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}
