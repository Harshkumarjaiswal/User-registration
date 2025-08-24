import { Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import BlogPostPage from "./pages/BlogPostPage"
import CreatePostPage from "./pages/CreatePostPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/create" element={<CreatePostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
