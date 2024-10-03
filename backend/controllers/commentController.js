const Comment= require('../models/Comment.js');
const Post= require('../models/Post.js');

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;
        const userId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        const newComment = new Comment({ content, userId, postId });
        await newComment.save();

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get comments for a specific post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find the post along with its comments
        const post = await Post.findById(postId).populate('comments'); // Populate comments

        if (!post) {
            return res.status(404).json({ message: 'Post not found.' });
        }

        res.status(200).json({ post, comments: post.comments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
};

// get comment by comment id
const getComment= async (req,res)=>{
    try{
        const comment= await Comment.findById(req.params.id);
        if(!comment){
            return res.status(404).json({message:"Comment not found"});
        }
        res.status(200).json(comment);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// Delete a comment by commentId
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { postId } = req.params;

        const comment = await Comment.findById(commentId,{isDeleted:false});
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        await Comment.findByIdAndUpdate(commentId,{isDeleted:true}, { new: true }); // Delete the comment

        // Remove the comment ID from the post's comments array
        const post = await Post.findById(postId);
        post.comments = post.comments.filter(c => c.toString() !== commentId);
        await post.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Server error', error });
    }
};


// Export the controller methods
module.exports = {
    addComment,
    getCommentsByPostId,
    getComment,
    deleteComment, // Export the deleteComment method
};
