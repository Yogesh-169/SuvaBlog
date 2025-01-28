const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Blog title (required)
  content: { type: String, required: true }, // Blog content (required)
  tags: [String], // Array of tags (optional)
  createdAt: { type: Date, default: Date.now }, // Automatically set timestamp
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
