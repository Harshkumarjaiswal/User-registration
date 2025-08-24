const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
    },
    readTime: {
      type: String,
      default: "5 min read",
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        author: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Calculate read time based on content length
blogSchema.pre("save", function (next) {
  if (this.content) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(" ").length
    const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute)
    this.readTime = `${readTimeMinutes} min read`
  }
  next()
})

// Index for search functionality
blogSchema.index({ title: "text", description: "text", content: "text" })

module.exports = mongoose.model("Blog", blogSchema)
