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
            // Unlike the post: remove the user's like from the post
            post.likes = post.likes.filter(like => like.toString() !== userId.toString());

            // Delete the Like document
            await Like.deleteOne({ postId, userId });

            // Save the updated post
            await post.save();

            return res.status(200).json({ message: 'Post unLiked successfully', isLiked: false });
        } else {
            // Create a new like
            const newLike = new Like({
                postId,
                userId
            });

            // Save the new like
            await newLike.save();

            // Add user ID to the likes array on the post
            post.likes.push(userId);

            // Save the updated post
            await post.save();

            return res.status(200).json({ message: 'Post liked successfully', likesCount: post.likes.length,isLiked: true });
        }

    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};





module.exports = {
  likePost
};
