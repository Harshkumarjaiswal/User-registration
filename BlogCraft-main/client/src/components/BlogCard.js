"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, Clock, User, Eye, Heart } from "lucide-react"

const BlogCard = ({ post }) => {
  // No need for hover state, just use CSS

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-0">
      {/* Background Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.backgroundImage || `https://picsum.photos/500/300?random=${post._id}`}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.description}</p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Stats and Read More */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              <span>{post.likes}</span>
            </div>
          </div>

          <Link
            to={`/blog/${post._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
