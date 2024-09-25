const mongoose = require('mongoose');
const Post = require("../models/Post.js");

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        // Ensure req.user is available and contains the user ID
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
        }
        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded." });
        }
         // Ensure req.file is not undefined before accessing its properties
         const imagePath = req.file ? req.file.path : null;

         if (!imagePath) {
             return res.status(400).json({ error: 'Image file is required' });
         }
 
         const newPost = new Post({
             title,
             content,
             userId,
             image: imagePath, // Store the image path in the post
         });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get post by ID
const getPostById = async (req, res) => {
    try {
        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update post by ID
const updatePostById = async (req, res) => {
    try {
        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Find the post by ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to update the post
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to update this post" });
        }

        // Update the post
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Find the post by ID
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to delete the post
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPost, getPostById, updatePostById, deletePost };
