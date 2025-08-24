'use client'
import { useEffect, useState } from 'react'

export default function Admin() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/users').then(async r => {
      if (!r.ok) {
        const j = await r.json().catch(()=>({message:'Error'}))
        setError(j.message || 'Forbidden')
        return
      }
      const d = await r.json()
      setUsers(d.users || [])
    })
  }, [])

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      {error && <p className="text-red-600">{error}</p>}
      <div className="card">
        <h3 className="font-semibold mb-2">Users</h3>
        {users.map(u => <div key={u._id} className="py-2 border-b">{u.name} — {u.email} — {u.role}</div>)}
      </div>
    </div>
  )
}
