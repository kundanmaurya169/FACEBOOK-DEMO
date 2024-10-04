const mongoose = require('mongoose');
const Post = require("../models/Post.js");
const { ObjectId } = require('mongoose').Types;

// Create a new post
const createPost = async (req, res) => {
    try {
        // Destructure the required fields from the request body
        const { title, content } = req.body;
        
        // Retrieve the userId from the authenticated user
        const userId = req.user._id;
        console.log("In Backend create post data:", { userId, title, content });

        // Ensure req.user is available and contains the user ID
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized: User ID is missing.' });
        }

        // Check if an image file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: "No image file uploaded." });
        }

        // Retrieve the image path from the uploaded file
        const imagePath = req.file.path;

        // Create a new post instance with the provided data
        const newPost = new Post({
            title,
            content,
            userId,
            image: imagePath, // Store the image path in the post
        });

        // Save the new post to the database
        await newPost.save();
        
        // Respond with the created post and a success status
        res.status(201).json(newPost);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        // Fetch all posts, sort by createdAt, and populate user info, comments, and likes
        const posts = await Post.find({ isDeleted: false }) // Filter for non-deleted posts
        .sort({ createdAt: -1 }) // Sort by creation date, latest first
        .populate('userId', 'name email') // Populate the user info for the post author
        .populate({
            path: 'comments',
            populate: { 
                path: 'userId', // Populate user info for each comment
                select: 'name email' // Specify fields to return
            }
        })
        .populate({
            path: 'likes',
            populate: { 
                path: 'userId', // Populate user info for likes
                select: 'name email' // Specify fields to return
            }
        });
        res.status(200).json(posts); // Return the posts with counts in JSON format
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
        const posts = await Post.find({ userId: userId ,isDeleted:false})
        .sort({ createdAt: -1 })
        .populate('userId', 'name email') // Populate user info if needed
        .populate({
            path: 'comments',
            populate: { 
                path: 'userId', // Populate user info for each comment
                select: 'name email' // Specify fields to return
            }
        })
        .populate({
            path: 'likes',
            populate: { 
                path: 'userId', // Populate user info for likes
                select: 'name email' // Specify fields to return
            }
        });
        



    // Return the retrieved posts with counts
    res.status(200).json(posts);
} catch (error) {
    res.status(500).json({ error: error.message });
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
        const post = await Post.findById(id,{isDeleted:false});

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        // Uncomment and implement authorization check if necessary
        if (post.userId.toString() !== req.user._id) {
            return res.status(403).json({ message: 'Unauthorized to update this post.' });
        }

        // Update title and content if they are provided
        if (title) post.title = title;
        if (content) post.content = content;

        // Save the updated post
        const updatedPost = await post.save();

        return res.status(200).json({ message: 'Post updated successfully.', post: updatedPost });
    } catch (error) {
        console.error('Error updating post:', error);
        return res.status(500).json({ message: 'Failed to update post due to server error.' });
    }
};

// Delete a post by ID
const deletePost = async (req, res) => {
    try {
        // Validate if the ID is a valid MongoDB ObjectId
        const postId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid post ID" });
        }

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is authorized to delete the post
        if (post.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        // Soft delete the post by setting isDeleted to true
        await Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });

        // Send response indicating successful deletion
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createPost, getPost, updatePostById, deletePost , getPostById };
