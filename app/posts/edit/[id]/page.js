'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PostForm from '../../../../components/PostForm'

export default function EditPost() {
  const params = useParams()
  const id = params?.id
  const [initial, setInitial] = useState(null)

  useEffect(() => {
    if (!id) return
    fetch('/api/posts/' + id).then(r=>r.json()).then(d=>setInitial(d.post))
  }, [id])

  if (!initial) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      <PostForm initial={initial} onSuccessPath={`/posts/${initial._id}`} />
    </div>
  )
}
