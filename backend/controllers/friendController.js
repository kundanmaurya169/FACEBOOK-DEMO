const Friend = require('../models/Friend');
const User = require('../models/User'); // Import User model for user validations

// Add a friend
const addFriend = async (req, res) => {
    const { userId, friendId } = req.body; // Assuming userId is the current user and friendId is the user to add

    try {
        // Check if the user is trying to add themselves
        if (userId === friendId) {
            return res.status(400).json({ message: "You cannot add yourself as a friend." });
        }

        // Create a new friend relationship
        const newFriend = new Friend({ user: userId, friend: friendId });
        await newFriend.save();

        res.status(201).json({ message: "Friend added successfully!", newFriend });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const removeFriend = async (req, res) => {
    const { userId, friendId } = req.body;

    try {
        // Find and remove the friend relationship
        const result = await Friend.findOneAndUpdate({ user: userId, friend: friendId, isFriend:true },{isFriend:false},{new:true});
        
        if (!result) {
            return res.status(404).json({ message: "Friend relationship not found." });
        }

        res.status(200).json({ message: "Friend removed successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// get friend List 
const getFriendsList = async (req, res) => {
    const { userId } = req.params;

    try {
        const friends = await Friend.find({ user: userId , isFriend:true }).populate('friend', 'username email'); // Populate friend details

        res.status(200).json({ friends });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// check friend 
const checkFriendship = async (req, res) => {
    const { userId, friendId } = req.params;

    try {
        const friendship = await Friend.findOne({ user: userId, friend: friendId });

        if (friendship) {
            res.status(200).json({ message: "You are friends." });
        } else {
            res.status(200).json({ message: "You are not friends." });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {
    addFriend,
    removeFriend,
    getFriendsList,
    checkFriendship,
};



