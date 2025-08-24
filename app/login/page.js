"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  async function submit(e) {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (res.ok) {
      const userData = await res.json();
      login(userData);
      router.push("/");
    } else {
      const j = await res.json().catch(() => ({}));
      setError(j.message || "Login failed");
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 px-6">

      <form
        onSubmit={submit}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-600 dark:text-blue-400">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

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
          Login
        </button>
      </form>
    </div>
  );
}
