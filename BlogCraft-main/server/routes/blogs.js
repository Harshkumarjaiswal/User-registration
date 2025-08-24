const express = require("express")
const { body, validationResult } = require("express-validator")
const Blog = require("../models/Blog")
const Category = require("../models/Category")
const multer = require("multer")
const path = require("path")

const router = express.Router()

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "-"))
  },
})
const upload = multer({ storage })

// Get all blogs with pagination and filtering
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 9
    const skip = (page - 1) * limit
    const category = req.query.category
    const search = req.query.search
    const featured = req.query.featured

    const query = { status: "published" }

    // Filter by category
    if (category && category !== "All") {
      query.category = category
    }

    // Filter by featured
    if (featured === "true") {
      query.featured = true
    }

    // Search functionality
    if (search) {
      query.$text = { $search: search }
    }

    console.log("Blog Query:", query)
    const blogs = await Blog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
    console.log("Blogs found:", blogs.length)

    const total = await Blog.countDocuments(query)
    const totalPages = Math.ceil(total / limit)

    res.json({
      blogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message })
  }
})

// Get single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // Increment views
    blog.views += 1
    await blog.save()

    res.json(blog)
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message })
  }
})

// Create new blog
router.post(
  "/",
  upload.single("backgroundImage"),
  [
    body("title")
      .trim()
      .isLength({ min: 1, max: 200 })
      .withMessage("Title is required and must be less than 200 characters"),
    body("description")
      .trim()
      .isLength({ min: 1, max: 500 })
      .withMessage("Description is required and must be less than 500 characters"),
    body("content").trim().isLength({ min: 1 }).withMessage("Content is required"),
    body("category").trim().isLength({ min: 1 }).withMessage("Category is required"),
    body("author.name").trim().isLength({ min: 1 }).withMessage("Author name is required"),
    body("author.email").isEmail().withMessage("Valid author email is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      // Parse blog data from form fields
      const blogData = req.body
      if (req.file) {
        blogData.backgroundImage = `/uploads/${req.file.filename}`
      }
      // Parse tags if sent as a string
      if (typeof blogData.tags === "string") {
        blogData.tags = blogData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      }

      const blog = new Blog(blogData)
      await blog.save()

      // Update category post count
      await Category.findOneAndUpdate({ name: blog.category }, { $inc: { postCount: 1 } }, { upsert: true })

      res.status(201).json(blog)
    } catch (error) {
      res.status(500).json({ message: "Error creating blog", error: error.message })
    }
  },
)

// Update blog
router.put(
  "/:id",
  [
    body("title").optional().trim().isLength({ min: 1, max: 200 }),
    body("description").optional().trim().isLength({ min: 1, max: 500 }),
    body("content").optional().trim().isLength({ min: 1 }),
    body("category").optional().trim().isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" })
      }

      res.json(blog)
    } catch (error) {
      res.status(500).json({ message: "Error updating blog", error: error.message })
    }
  },
)

// Delete blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // Update category post count
    await Category.findOneAndUpdate({ name: blog.category }, { $inc: { postCount: -1 } })

    res.json({ message: "Blog deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message })
  }
})

// Like a blog
router.post("/:id/like", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }

    res.json({ likes: blog.likes })
  } catch (error) {
    res.status(500).json({ message: "Error liking blog", error: error.message })
  }
})

// Add comment to blog
router.post(
  "/:id/comments",
  [
    body("author").trim().isLength({ min: 1 }).withMessage("Author name is required"),
    body("content").trim().isLength({ min: 1 }).withMessage("Comment content is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const blog = await Blog.findById(req.params.id)
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" })
      }

      blog.comments.push(req.body)
      await blog.save()

      res.status(201).json(blog.comments[blog.comments.length - 1])
    } catch (error) {
      res.status(500).json({ message: "Error adding comment", error: error.message })
    }
  },
)

module.exports = router
