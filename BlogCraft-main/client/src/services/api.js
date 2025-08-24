import axios from "axios"

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Blog API functions
export const fetchBlogs = async ({ page = 1, limit = 9, category, search, featured } = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (category && category !== "All") params.append("category", category)
  if (search) params.append("search", search)
  if (featured) params.append("featured", featured)

  const response = await api.get(`/blogs?${params}`)
  return response.data
}

export const fetchBlogById = async (id) => {
  const response = await api.get(`/blogs/${id}`)
  return response.data
}

export const createBlog = async (blogData) => {
  const response = await api.post("/blogs", blogData)
  return response.data
}

export const updateBlog = async (id, blogData) => {
  const response = await api.put(`/blogs/${id}`, blogData)
  return response.data
}

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}`)
  return response.data
}

export const likeBlog = async (id) => {
  const response = await api.post(`/blogs/${id}/like`)
  return response.data
}

export const addComment = async (id, commentData) => {
  const response = await api.post(`/blogs/${id}/comments`, commentData)
  return response.data
}

// Category API functions
export const fetchCategories = async () => {
  const response = await api.get("/categories")
  return response.data
}

export const createCategory = async (categoryData) => {
  const response = await api.post("/categories", categoryData)
  return response.data
}

// Auth API functions
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials)
  return response.data
}

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData)
  return response.data
}

export default api
