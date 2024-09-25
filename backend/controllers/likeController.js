const Like = require('../models/Like.js');
const Post = require('../models/Post.js');

// Like a post
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id;
    // Log the user ID to verify it's being set correctly
    console.log('User ID:', userId); 

    // Check if the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ message: 'You already liked this post.' });
    }

    // Create a new like
    const newLike = new Like({ user: userId, post: postId });
    await newLike.save();

    res.status(201).json({ message: 'Post liked successfully', like: newLike });
  } catch (error) {
    console.error('Error liking post:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};

// Unlike a post
const unlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the post exists
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    // Find the like to remove
    const like = await Like.findOneAndDelete({ user: userId, post: postId });
    if (!like) {
      return res.status(400).json({ message: 'You have not liked this post yet.' });
    }

    res.status(200).json({ message: 'Post unliked successfully' });
  } catch (error) {
    console.error('Error unliking post:', error); // Log error for debugging
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
