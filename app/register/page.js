'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setError('')

    // Validations
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) router.push('/login')
      else {
        const j = await res.json().catch(() => ({}))
        setError(j.message || 'Registration failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 px-6">
      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400">
          Register
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-100">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-xl shadow hover:scale-105 transition"
        >
          Register
        </button>
      </form>
    </div>
  )
}
