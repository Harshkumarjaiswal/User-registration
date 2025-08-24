const express = require("express")
const Category = require("../models/Category")

const router = express.Router()

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error: error.message })
  }
})

// Create new category
router.post("/", async (req, res) => {
  try {
    const category = new Category(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" })
    }
    res.status(500).json({ message: "Error creating category", error: error.message })
  }
})

module.exports = router
