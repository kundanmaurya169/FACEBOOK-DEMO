const express = require('express');
const router = express.Router();
const auth= require('../middleware/authMiddleware.js')
const friendController = require('../controllers/friendController.js');

// Add a friend
router.post('/add', auth, friendController.addFriend);

// Remove a friend
router.delete('/remove',auth, friendController.removeFriend);

// Get friends list
router.get('/:userId/friend',auth, friendController.getFriendsList);

// Check friendship status
router.get('/status/:userId/:friendId',auth, friendController.checkFriendship);

module.exports = router;
