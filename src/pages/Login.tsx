import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null);
    try {
      const response = await login(email, password)
      navigate("/events")
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    console.error('Login error:', error);
    }
  }

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest()
      navigate("/events")
    } catch (error) {
      console.error("Guest login failed:", error)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      <button
        onClick={handleGuestLogin}
        className="w-full mt-4 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
      >
        Login as Guest
      </button>
    </div>
  )
}

export default Login

