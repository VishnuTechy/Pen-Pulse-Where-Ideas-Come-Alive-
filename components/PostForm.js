'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PostForm({ initial = {}, onSuccessPath = '/' }) {
  const [title, setTitle] = useState(initial.title || '')
  const [content, setContent] = useState(initial.content || '')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    const payload = { title, content }
    const method = initial._id ? 'PUT' : 'POST'
    const url = initial._id ? `/api/posts/${initial._id}` : '/api/posts'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    })
    if (res.ok) router.push(onSuccessPath)
    else {
      const j = await res.json().catch(()=>({}))
      alert(j.message || 'Error')
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <label>Title
        <input value={title} onChange={e=>setTitle(e.target.value)} className="mt-1" />
      </label>
      <label className="mt-2">Content
        <textarea value={content} onChange={e=>setContent(e.target.value)} className="mt-1 h-48" />
      </label>
      <button className="mt-3 bg-blue-600 text-white">Save</button>
    </form>
  )
}
