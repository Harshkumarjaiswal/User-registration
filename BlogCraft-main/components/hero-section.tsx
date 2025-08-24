import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
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
          <Link href="/create">
            <Button size="lg" className="flex items-center gap-2">
              Start Writing
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#latest-posts">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              Explore Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
  )
}
