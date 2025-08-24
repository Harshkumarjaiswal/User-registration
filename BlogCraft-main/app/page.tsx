"use client"

import { useState } from "react"
import { BlogCard } from "@/components/blog-card"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { PlusCircle, LogOut, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"

// Mock data - in a real app, this would come from a database
const allBlogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    description:
      "Learn the latest features and improvements in Next.js 15, including the new App Router and enhanced performance optimizations.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Web Development",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "React", "JavaScript"],
  },
  {
    id: 2,
    title: "The Future of AI in Web Design",
    description:
      "Exploring how artificial intelligence is revolutionizing the way we approach web design and user experience.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "AI & Technology",
    author: "Jane Smith",
    publishedAt: "2024-01-12",
    readTime: "8 min read",
    tags: ["AI", "Design", "UX"],
  },
  {
    id: 3,
    title: "Mastering CSS Grid Layout",
    description:
      "A comprehensive guide to CSS Grid, covering everything from basic concepts to advanced layout techniques.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "CSS",
    author: "Mike Johnson",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    tags: ["CSS", "Layout", "Frontend"],
  },
  {
    id: 4,
    title: "Building Scalable React Applications",
    description:
      "Best practices and architectural patterns for building large-scale React applications that can grow with your team.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "React",
    author: "Sarah Wilson",
    publishedAt: "2024-01-08",
    readTime: "15 min read",
    tags: ["React", "Architecture", "Scalability"],
  },
  {
    id: 5,
    title: "The Art of Typography in Web Design",
    description:
      "Understanding how typography choices can make or break your web design, with practical tips and examples.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Design",
    author: "David Brown",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    tags: ["Typography", "Design", "UI"],
  },
  {
    id: 6,
    title: "Database Optimization Techniques",
    description:
      "Learn advanced database optimization strategies to improve your application's performance and scalability.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Backend",
    author: "Lisa Chen",
    publishedAt: "2024-01-03",
    readTime: "10 min read",
    tags: ["Database", "Performance", "Backend"],
  },
  // Additional posts for load more functionality
  {
    id: 7,
    title: "Advanced TypeScript Patterns",
    description:
      "Explore advanced TypeScript patterns and techniques to write more maintainable and type-safe code.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Web Development",
    author: "Alex Turner",
    publishedAt: "2024-01-01",
    readTime: "14 min read",
    tags: ["TypeScript", "Programming", "Best Practices"],
  },
  {
    id: 8,
    title: "Microservices Architecture Best Practices",
    description:
      "Learn how to design and implement scalable microservices architectures for modern applications.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Backend",
    author: "Maria Garcia",
    publishedAt: "2023-12-28",
    readTime: "18 min read",
    tags: ["Microservices", "Architecture", "Backend"],
  },
  {
    id: 9,
    title: "Modern CSS Techniques for 2024",
    description:
      "Discover the latest CSS techniques and features that will help you create stunning web designs.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "CSS",
    author: "Chris Lee",
    publishedAt: "2023-12-25",
    readTime: "11 min read",
    tags: ["CSS", "Design", "Frontend"],
  },
  {
    id: 10,
    title: "Machine Learning for Web Developers",
    description:
      "A practical guide to integrating machine learning capabilities into web applications.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "AI & Technology",
    author: "Dr. Sarah Chen",
    publishedAt: "2023-12-22",
    readTime: "20 min read",
    tags: ["Machine Learning", "AI", "Web Development"],
  },
  {
    id: 11,
    title: "Performance Optimization Strategies",
    description:
      "Comprehensive strategies for optimizing web application performance and user experience.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Web Development",
    author: "Tom Wilson",
    publishedAt: "2023-12-20",
    readTime: "16 min read",
    tags: ["Performance", "Optimization", "Web Development"],
  },
  {
    id: 12,
    title: "Design Systems in Practice",
    description:
      "How to build and maintain effective design systems for large-scale applications.",
    backgroundImage: "/placeholder.svg?height=300&width=500",
    category: "Design",
    author: "Emma Rodriguez",
    publishedAt: "2023-12-18",
    readTime: "13 min read",
    tags: ["Design Systems", "UI/UX", "Design"],
  },
]

const categories = ["All", "Web Development", "AI & Technology", "CSS", "React", "Design", "Backend"]

export default function HomePage() {
  const { user, logout } = useAuth()
  const [displayedPosts, setDisplayedPosts] = useState(allBlogPosts.slice(0, 6))
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMorePosts, setHasMorePosts] = useState(allBlogPosts.length > 6)

  const handleLogout = () => {
    logout()
  }

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const currentCount = displayedPosts.length
    const nextPosts = allBlogPosts.slice(currentCount, currentCount + 3)
    
    setDisplayedPosts([...displayedPosts, ...nextPosts])
    setHasMorePosts(currentCount + 3 < allBlogPosts.length)
    setIsLoadingMore(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BlogCraft</h1>
              <span className="ml-2 text-sm text-gray-500">Professional Blogging Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Welcome, {user.name}</span>
                  </div>
                  <Link href="/create">
                    <Button className="flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create Post
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <Link href="/login">
                    <Button variant="ghost" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-white transition-all duration-200">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-md px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div id="latest-posts" className="mb-12 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover insights, tutorials, and stories from our community of writers and developers.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchBar />
            <CategoryFilter categories={categories} />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More Section */}
        {hasMorePosts && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="flex items-center gap-2"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Posts"
              )}
            </Button>
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
            <p>&copy; 2024 BlogCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
