const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Path to your User model
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password:hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user ', error: error.message });
    }
};

// Login user

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check for empty fields
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid login credentials.');
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid login credentials.');
        }
         // Generate the JWT token
    const token = user.generateAuthToken();

         // Send the token in a cookie (adjust the options as necessary)
    res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
        // Send the token to the client
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error.');
    }
};

// LogOut user
exports.logout = (req, res) => {
    // Clear the cookie storing the JWT token
    return res.cookie('token',null,{maxAge:new Date(0),secure:true,httpOnly:true}).status(200).json({ message: 'Logged out successfully' });
};


// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        // Option 1: Get user by ID from request parameter
        const userId = req.params.userId;

        // Option 2: Get the authenticated user (if using authentication)
        // const userId = req.user._id;

        const user = await User.findById(userId).select('-password -token'); // Exclude sensitive fields

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { phone, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { phone, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
