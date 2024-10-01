const mongoose = require('mongoose');
const Post = require("../models/Post.js");
const { ObjectId } = require('mongoose').Types;

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user._id;
        console.log("In Backend create post data :- ",userId,title,content);
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

// Get All post
const getPost = async (req, res) => {
    try {
        const posts = await Post.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email')
        .populate({
          path: 'comments',
          populate: { path: 'userId', select: 'name email' }, // Populate user info for comments
        })
        .populate({
          path: 'likes',
          populate: { path: 'userId', select: 'name email' }, // Populate user info for likes
        }); // Fetch all posts, sort by createdAt, and populate user info
        console.log("get post === ", posts)
        res.status(200).json(posts); // Return the posts in JSON format
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
};

// Controller to get posts by user ID
const getPostById = async (req, res) => {
    const userId = req.params.id; // Extract userId from the request parameters

    try {
        // Validate userId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        // Fetch posts by user ID
        const posts = await Post.find({ userId: userId }); // Adjust field name as per your Post schema

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'No posts found for this user.' });
        }

        // Send the posts back in the response
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error while fetching posts.' });
    }
};

// Update post by ID
const updatePostById = async (req, res) => {
    const { id } = req.params; // Get the post ID from the request parameters
    const { title, content } = req.body; // Get title and content from the request body

    if (!title && !content) {
        return res.status(400).json({ message: 'At least one of title or content must be provided for update.' });
    }

    try {
        // Find the post by ID
        const post = await Post.findById(id);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Check if the user is authorized to update the post (optional)
        // Ensure you have a user ID associated with the post, 
        // and that the current user matches that ID
        // if (post.userId.toString() !== req.user._id) {
        //     return res.status(403).json({ message: 'Unauthorized to update this post.' });
        // }

        // Update title and content if they are provided
        if (title) post.title = title;
        if (content) post.content = content;

        // Save the updated post
        await post.save();

        return res.status(200).json({ message: 'Post updated successfully.', post });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Server error.' });
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

module.exports = { createPost, getPost, updatePostById, deletePost , getPostById };
