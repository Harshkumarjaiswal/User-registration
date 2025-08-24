const mongoose = require('mongoose');
const Blog = require('./models/Blog');

// Replace with your actual MongoDB connection string if different
const MONGO_URI = 'mongodb://localhost:27017/blogger-platform';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const samplePosts = [
  {
    title: "Welcome to BlogCraft!",
    description: "This is your first sample post. Edit or delete it to get started.",
    content: "This is your first sample post. Edit or delete it to get started.",
    author: { name: "Admin", email: "admin@blogcraft.com" },
    category: "General",
    status: "published"
  },
  {
    title: "How to Write a Great Blog Post",
    description: "Tips and tricks for writing engaging content.",
    content: "Here are some tips and tricks for writing engaging content...",
    author: { name: "Jane Doe", email: "jane@blogcraft.com" },
    category: "Writing",
    status: "published"
  },
  {
    title: "Exploring the Future of Blogging",
    description: "A look at new trends and technologies in blogging.",
    content: "Let's explore new trends and technologies in blogging...",
    author: { name: "John Smith", email: "john@blogcraft.com" },
    category: "Tech",
    status: "published"
  }
];

Blog.insertMany(samplePosts)
  .then(() => {
    console.log("Sample posts added!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 