const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const likeController = require('../controllers/likeController.js');

// Route to like a post
router.post('/:postId/like', auth, likeController.likePost);

// Export the router
module.exports = router;



