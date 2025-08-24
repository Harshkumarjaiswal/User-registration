import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/api"
import { useAuth } from "../contexts/AuthContext"

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login: loginContext } = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError("Both fields are required.")
      return
    }
    setLoading(true)
    try {
      const data = await login(form)
      loginContext(data.user, data.token)
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-semibold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center text-sm mt-2">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  )
} 