import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const categories = [
  "Web Development",
  "AI & Technology",
  "CSS",
  "React",
  "Design",
  "Backend",
]

const CreatePostPage = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [tags, setTags] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("content", content)
      formData.append("category", category)
      formData.append("tags", tags)
      formData.append("author.name", "Demo User") // Replace with real user
      formData.append("author.email", "demo@example.com") // Replace with real user
      if (image) {
        formData.append("backgroundImage", image)
      }
      const response = await axios.post(`${API_BASE_URL}/blogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setSuccess("Blog post created successfully!")
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create blog post.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
      >
        ← Back to Home
      </button>
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={200}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={500}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={6}
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. React, JavaScript, Web"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Background Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  )
}

export default CreatePostPage 