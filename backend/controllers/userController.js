const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Path to your User model
const Token = require('../models/Token')
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        console.log(name,phone,email,password);

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return res.status(400).json({ message: 'phone or Email already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ name, phone, email, password:hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user ', error: error.message });
    }
};

// Login user

exports.loginUser = async (req, res) => {
    const { login, password } = req.body;

    // Check for empty fields
    if (!login || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
         // Find user by email or phone
         const user = await User.findOne({
            $or: [{ email: login }, { phone: login }] // Search by email or phone
        });

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
        console.log('login token ===',token)
         // Step 4: Create a new token entry in the database
         const tokenEntry = new Token({
             userId: user._id,  // Link to the user
             token: token, // Save the generated token
             isActive: true,     // Token is active by default
         });
 
         await tokenEntry.save();

       // Send the token in a cookie (adjust the options as necessary)
       res.cookie('token', token, { 
        maxAge: 7*24*60*60*1000, // 1 hour in milliseconds
        httpOnly: true, // Prevents JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use true in production for HTTPS
        sameSite: 'Strict' // Adjust as needed for your application
    });

    // Optionally, send the token in the response body
    return res.status(200).send({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Server error.');
    }
};

// LogOut user
exports.logout = async (req, res) => {
    try {
        // Step 1: Find the token in the database using the token from cookies
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }

        // Step 2: Update the token entry to set isActive to false
        await Token.findOneAndUpdate({ token }, { isActive: false });

        // Step 3: Clear the cookie
        return res.cookie('token', '', {
            maxAge: 0, // Expire the cookie immediately
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/', // Ensure the same path as the original cookie
        }).status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error during logout:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




// Get user profile
exports.getUserProfile = async (req, res) => {
    try {

        // Option 2: Get the authenticated user (if using authentication)
        const userId = req.user._id;

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
        const userId = req.user._id; // Get user ID from the request object (assumes user is authenticated)
        const { name, phone, email } = req.body; // Destructure the data from the request body

        // Update the user profile
        const updatedUser = await User.findByIdAndUpdate(userId, { name, phone, email }, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user._id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};
