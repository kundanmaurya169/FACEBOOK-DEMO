const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');


//post routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/logout',userController.logout);
router.get('/profile', auth, userController.getUserProfile); // Add auth middleware
router.put('/profile', auth, userController.updateUserProfile); // Add auth middleware
router.delete('/profile', auth, userController.deleteUser); // 

module.exports = router;
