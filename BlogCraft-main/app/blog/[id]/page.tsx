import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Share2, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock function to get blog post by ID
async function getBlogPost(id: string) {
  // In a real app, this would fetch from a database
  return {
    id: Number.parseInt(id),
    title: "Getting Started with Next.js 15",
    description:
      "Learn the latest features and improvements in Next.js 15, including the new App Router and enhanced performance optimizations.",
    backgroundImage: "/placeholder.svg?height=400&width=800",
    category: "Web Development",
    author: "John Doe",
    publishedAt: "2024-01-15",
    readTime: "5 min read",
    tags: ["Next.js", "React", "JavaScript"],
    content: `
      <h2>Introduction to Next.js 15</h2>
      <p>Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and efficient. In this comprehensive guide, we'll explore the key updates and how they can benefit your development workflow.</p>
      
      <h3>Key Features</h3>
      <ul>
        <li>Enhanced App Router with improved performance</li>
        <li>Better TypeScript support</li>
        <li>Optimized bundling and tree-shaking</li>
        <li>Improved developer experience</li>
      </ul>
      
      <h3>Getting Started</h3>
      <p>To get started with Next.js 15, you can create a new project using the following command:</p>
      <pre><code>npx create-next-app@latest my-app</code></pre>
      
      <p>This will set up a new Next.js project with all the latest features and best practices configured out of the box.</p>
      
      <h3>Performance Improvements</h3>
      <p>Next.js 15 includes significant performance improvements, including faster build times, optimized runtime performance, and better memory usage. These improvements make your applications faster and more efficient.</p>
      
      <h3>Conclusion</h3>
      <p>Next.js 15 represents a major step forward in React development. With its enhanced features and improved performance, it's an excellent choice for building modern web applications.</p>
    `,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPost(id)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <Image src={post.backgroundImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Badge className="mb-4 bg-white/90 text-gray-900">{post.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>By {post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Engagement Actions */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Heart className="h-4 w-4 mr-2" />
                Like (42)
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                Comment (8)
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
