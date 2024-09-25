const express = require('express');
const userController = require('../controllers/userControllers.js');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');


//post routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile/:userId', auth, userController.getUserProfile); // Add auth middleware
router.put('/profile/:userId', auth, userController.updateUserProfile); // Add auth middleware
router.delete('/profile/:userId', auth, userController.deleteUser); // 

module.exports = router;
