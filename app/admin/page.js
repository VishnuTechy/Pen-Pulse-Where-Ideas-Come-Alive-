'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ name: '', email: '', role: '' })

  useEffect(() => {
    fetch('/api/auth/me')
      .then(async r => {
        if (!r.ok) {
          setError('Unable to fetch user info')
          setIsAdmin(false)
          return
        }
        let user = await r.json()
        user = user.user
        if (user.role !== 'admin') {
          setError('Admin access required')
          setIsAdmin(false)
          return
        }
        setIsAdmin(true)
        fetch('/api/users')
          .then(async r => {
            if (!r.ok) {
              const j = await r.json().catch(() => ({ message: 'Error' }))
              setError(j.message || 'Forbidden')
              return
            }
            const d = await r.json()
            setUsers(d.users || [])
          })
      })
      .catch(() => {
        setError('Unable to fetch user info')
        setIsAdmin(false)
      })
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setUsers(users.filter(u => u._id !== id))
    } else {
      const err = await res.json()
      setError(err.message || 'Delete failed')
    }
  }

  const startEdit = (user) => {
    setEditId(user._id)
    setEditData({ name: user.name, email: user.email, role: user.role })
  }

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value })
  }

  const submitEdit = async () => {
    const res = await fetch(`/api/users/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    })
    if (res.ok) {
      const { user } = await res.json()
      setUsers(users.map(u => u._id === user._id ? user : u))
      setEditId(null)
      setEditData({ name: '', email: '', role: '' })
    } else {
      const err = await res.json()
      setError(err.message || 'Update failed')
    }
  }

  if (!isAdmin) {
    return (
      <div className="p-6 min-h-screen bg-transparent">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 drop-shadow">
          Admin
        </h2>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    )
  }

  return (
    <div className="p-8 min-h-screen bg-transparent relative">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700 drop-shadow-lg">
        Admin Dashboard
      </h2>

      {/* Glassmorphism card */}
{/* Glassmorphism card */}
<div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30">
  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
    Users
  </h3>
  <div className="divide-y divide-gray-200 dark:divide-gray-700">
    {users.map(u => (
      <div 
        key={u._id} 
        className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        {editId === u._id ? (
          <div className="flex gap-3 items-center flex-wrap">
            <input 
              name="name" 
              value={editData.name} 
              onChange={handleEditChange} 
              className="border px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white/90 dark:bg-gray-800/90"
            />
            <input 
              type="email"
              name="email" 
              value={editData.email} 
              readOnly
              className="border px-4 py-2 rounded-xl shadow-sm bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            />
            <select 
              name="role" 
              value={editData.role} 
              onChange={handleEditChange} 
              className="border px-4 py-2 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white/90 dark:bg-gray-800/90"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <button 
              onClick={submitEdit} 
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md font-medium"
            >
              Save
            </button>
            <button 
              onClick={() => setEditId(null)} 
              className="px-5 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl shadow-md font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <span className="text-lg text-gray-900 dark:text-gray-100 font-medium">
              {u.name} — {u.email} — <span className="font-semibold text-indigo-600">{u.role}</span>
            </span>
            <div className="flex gap-3">
              <button 
                className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-md"
                onClick={() => startEdit(u)}
              >
                Edit
              </button>
              <button 
                className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md"
                onClick={() => handleDelete(u._id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </div>
</div>

      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  )
}
