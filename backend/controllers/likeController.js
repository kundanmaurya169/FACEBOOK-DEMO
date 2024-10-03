const Like = require('../models/Like.js');
const Post = require('../models/Post.js');

// Like a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params; // Get postId from request parameters
        const userId = req.user._id; // Get user ID from authenticated user

        // Check if the post exists and is not deleted
        const post = await Post.findOne({ _id: postId, isDeleted: false });
        if (!post) {
            return res.status(404).json({ message: 'Post not found or has been deleted.' });
        }

        // Check if the post is already liked by the user
        const existingLike = await Like.findOne({ postId, userId });
        if (existingLike) {
            return res.status(200).json({ message: 'You have already liked this post.' });
        }

        // Create a new like
        const newLike = new Like({
            postId,
            userId,
            isLike: true, // Indicating a positive like
        });

        // Save the new like
        await newLike.save();

        // Add user ID to the likes array on the post
        post.likes.push(userId);
        post.likesCount += 1; // Increment likes count

        // Save the updated post
        await post.save();

        res.status(200).json({ message: 'Post liked successfully', likesCount: post.likesCount });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Unlike a post
// Unlike a post
const unlikePost = async (req, res) => {
  try {
      const postId = req.params.postId;
      const userId = req.user.id; // Assuming `auth` middleware sets `req.user`

      // Find the post by ID
      const post = await Post.findById(postId);
      if (!post) {
          return res.status(404).json({ message: 'Post not found' });
      }

      // Check if the post was liked by the user
      if (!post.likes.includes(userId)) {
          return res.status(400).json({ message: 'You have not liked this post' });
      }

      // Remove the user's like from the likes array
      post.likes = post.likes.filter(like => like.toString() !== userId.toString());

      // Save the updated post
      await post.save();

      return res.status(200).json({ message: 'Post unliked successfully', likesCount: post.likes.length });
  } catch (error) {
      console.error('Error unliking post:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  likePost,
  unlikePost,
};
