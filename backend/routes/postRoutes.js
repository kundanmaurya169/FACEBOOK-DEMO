const express = require('express');
const { createPost, getPost, updatePostById, deletePost , getPostById } = require('../controllers/postController.js'); // Adjust the path accordingly
const auth = require('../middleware/authMiddleware.js'); // Ensure this points to your auth middleware
const upload = require('../config/multer.js');
const router = express.Router();

// POST /posts - Create a new post
router.post('/', auth, upload.single('image'), createPost);

// GET /posts/- Retrieve all post
router.get('/',auth, getPost);

// GET /posts/user/:id
router.get('/user/:id', auth, getPostById);

// PUT /posts/:id - Update a specific post by ID
router.put('/:id', auth, updatePostById);

// DELETE /posts/:id - Delete a specific post by ID
router.patch('/:id', auth, deletePost);

module.exports = router;

