"use client"

import { useState } from "react"
import { useQuery } from "react-query"
import { Search, Sparkles, ArrowRight } from "lucide-react"
import BlogCard from "../components/BlogCard"
import { fetchBlogs, fetchCategories } from "../services/api"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  const { data: blogsData, isLoading: blogsLoading } = useQuery(
    ["blogs", currentPage, selectedCategory, searchQuery],
    () =>
      fetchBlogs({
        page: currentPage,
        category: selectedCategory,
        search: searchQuery,
      }),
    { keepPreviousData: true },
  )

  const { data: categories = [] } = useQuery("categories", fetchCategories)

  const staticCategories = [
    "Web Development",
    "AI & Technology",
    "CSS",
    "React",
    "Design",
    "Backend",
  ];

  const allCategories = Array.from(new Set([...staticCategories, ...categories.map(c => c.name)]))

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            Welcome to the Future of Blogging
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Your Stories,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Inspire the World
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create beautiful blog posts with our modern, intuitive platform. Connect with readers, share your expertise,
            and build your online presence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/create")}
            >
              Start Writing
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => {
                const postsSection = document.getElementById("posts-section")
                if (postsSection) postsSection.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Explore Posts
            </button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
              <div className="text-gray-600">Active Writers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Published Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="posts-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community of writers and developers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search posts, authors, or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>

            {/* Category Filter Dropdown */}
            <div className="w-full md:w-auto">
              <select
                value={selectedCategory}
                onChange={e => handleCategoryChange(e.target.value)}
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="All">All</option>
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        {blogsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-xl"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogsData?.blogs?.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {blogsData?.pagination && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={!blogsData.pagination.hasPrev}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <span className="text-gray-600">
                  Page {blogsData.pagination.currentPage} of {blogsData.pagination.totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!blogsData.pagination.hasNext}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {blogsData?.blogs?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No blog posts found.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BlogCraft</h3>
              <p className="text-gray-400">The modern blogging platform for creators, developers, and storytellers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BlogCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
