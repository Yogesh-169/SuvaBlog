const express = require('express');
const BlogPost = require('../models/BlogPost'); // Import BlogPost model
const router = express.Router();
const mongoose = require('mongoose');

// CREATE a new blog post
router.post('/create', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blogPost = new BlogPost({ title, content, tags });
    await blogPost.save();
    res.status(201).json(blogPost); // Return the created blog post
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});

// READ all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find(); // Fetch all blog posts
    res.status(200).json(posts); // Return the posts as JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors
  }
});


// UPDATE a blog post by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const postId = req.params.id;

    // Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: 'Invalid blog post ID' });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      postId,
      { title, content, tags },
      { new: true } // Return the updated post
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE a blog post by ID
router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  

module.exports = router;
