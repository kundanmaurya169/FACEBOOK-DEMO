// routes/commentRoutes.js

const express = require('express');
const router = express.Router(); // Correctly initialize the router
const commentController = require('../controllers/commentController.js');
const auth= require('../middleware/authMiddleware.js');

// Comment Routes
// Route to create a comment on a specific post
router.post('/post/:postId/',auth, commentController.addComment);
// Route to get all comments for a specific post
router.get('/post/:postId/', commentController.getCommentsByPostId); // Corrected to use 'get'
// Delete the comment by the user
router.patch('/post/:postId/comment/:commentId',auth, commentController.deleteComment);
// Export the router
module.exports = router;
