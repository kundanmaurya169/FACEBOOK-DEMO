// routes/commentRoutes.js

const express = require('express');
const router = express.Router(); // Correctly initialize the router
const commentController = require('../controllers/commentController.js');
const auth= require('../middleware/authMiddleware.js');

// Comment Routes
// Route to create a comment on a specific post
router.post('/post/:postId/comments',auth, commentController.createComment);

// Route to get all comments for a specific post
router.get('/post/:postId/comments', commentController.getCommentsByPostId); // Corrected to use 'get'
// Delete the comment by the user
router.delete('/post/:postId/comments/:commentId',auth, commentController.deleteComment);
// Export the router
module.exports = router;
