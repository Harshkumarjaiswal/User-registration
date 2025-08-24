import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchBlogById } from "../services/api";

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchBlogById(id)
      .then(setPost)
      .catch(() => setError("Blog post not found."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  if (error || !post) {
    return <div className="flex justify-center items-center min-h-screen text-red-600">{error || "Blog post not found."}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow mt-8 mb-12 overflow-hidden">
      {/* Background Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={post.backgroundImage || `https://picsum.photos/800/400?random=${post._id}`}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {post.category}
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-600 mb-4">{post.description}</p>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
          <span>By <span className="font-semibold text-gray-700">{post.author.name}</span></span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>{post.readTime}</span>
        </div>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags && post.tags.map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">{tag}</span>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
} 