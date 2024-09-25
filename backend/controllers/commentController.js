const Comment= require('../models/Comment.js');
const Post= require('../models/Post.js');

const createComment= async(req,res)=>{
    try {
        const { postId } = req.params;
        const { content } = req.body; 
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }


        const newComment = new Comment({
            content, 
            postId, 
            userId: req.user._id,
        });
        await newComment.save(); // Save the comment to the database
        res.status(201).json(newComment); // Return the created comment
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
}
// Get comments for a specific post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        // Find comments associated with the postId
        const comments = await Comment.find({ postId: postId });

        // Check if comments exist
        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this post.' });
        }

        res.status(200).json(comments);
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
        const { commentId } = req.params; // Get the commentId from the request parameters
        const { postId } = req.params; // Get the postId from the request parameters

        // Optionally, check if the comment exists
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // You might also want to check if the user is authorized to delete the comment
        // Assuming you have user info in req.user
        if (comment.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized to delete this comment' });
        }

        await Comment.findByIdAndDelete(commentId); // Delete the comment
        res.status(200).json({ message: 'Comment deleted successfully' }); // Return success message
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
};

// Export the controller methods
module.exports = {
    createComment,
    getCommentsByPostId,
    getComment,
    deleteComment, // Export the deleteComment method
};
