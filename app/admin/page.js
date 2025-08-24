'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Fetch current user info
    fetch('/api/me')
      .then(async r => {
        if (!r.ok) {
          setError('Unable to fetch user info')
          setIsAdmin(false)
          return
        }
        const user = await r.json()
        if (user.role !== 'admin') {
          setError('Admin access required')
          setIsAdmin(false)
          return
        }
        setIsAdmin(true)
        // Fetch users only if admin
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

  if (!isAdmin) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <div className="card">
        <h3 className="font-semibold mb-2">Users</h3>
        {users.map(u => (
          <div key={u._id} className="py-2 border-b">
            {u.name} — {u.email} — {u.role}
          </div>
        ))}
      </div>
    </div>
  )
}