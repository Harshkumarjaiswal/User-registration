const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")

const router = express.Router()

// Simple in-memory user storage (in production, use MongoDB)
const users = []

// Register
router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { name, email, password } = req.body

      // Check if user exists
      const existingUser = users.find((user) => user.email === email)
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12)

      // Create user
      const user = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
      }

      users.push(user)

      // Generate JWT
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "7d",
      })

      res.status(201).json({
        message: "User created successfully",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error: error.message })
    }
  },
)

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 1 }).withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const { email, password } = req.body

      // Find user
      const user = users.find((user) => user.email === email)
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" })
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || "fallback_secret", {
        expiresIn: "7d",
      })

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, email: user.email },
      })
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message })
    }
  },
)

module.exports = router
