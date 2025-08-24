"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  description: string
  backgroundImage: string
  category: string
  author: string
  publishedAt: string
  readTime: string
  tags: string[]
}

interface BlogCardProps {
  post: BlogPost
}

// Helper function to format dates consistently
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function BlogCard({ post }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group">
      <Card
        className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.backgroundImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              {post.category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
          </div>
        </div>

        <CardContent className="p-6">
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Link
            href={`/blog/${post.id}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            <Eye className="h-4 w-4" />
            Read More
          </Link>
        </CardContent>
      </Card>

      {/* Hover Popup */}
      {isHovered && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-sm border animate-in fade-in-0 zoom-in-95 duration-200">
            <h4 className="font-bold text-lg mb-2 text-gray-900">{post.title}</h4>
            <p className="text-gray-600 text-sm mb-4">{post.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>By {post.author}</span>
              <span>{post.readTime}</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
