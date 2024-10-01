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
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email or phone
        const user = await User.findOne({ 
            $or: [{ email: login }, { phone: login }] 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid login credentials.' });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid login credentials.' });
        }

        // Generate the JWT token
        const token=user.generateAuthToken();
    //     const token = generateToken();
    //     const payload = {
    //         userId: user._id,
    //         name: user.name,
    //         email: user.email,
    //         phone: user.phone
    //     };
    //     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    // console.log('login token ==== ', token);
        // Create a new token entry in the database
        await Token.create({
            userId: user._id,
            token,
            isActive: true
        });

        // Optionally, send the token in a cookie (adjust the options as necessary)
        // res.cookie('token', token, { 
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // 1 hour in milliseconds
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production', 
        //     sameSite: 'Strict' 
        // });

        // Send the token in the response body
        return res.status(200).json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error.' });
    }
};


// LogOut user
exports.logout = async (req, res) => {
    try {
        // Retrieve the token from the Authorization header
        const token = req.headers['authorization']?.split(' ')[1];
        const cleanToken = token.replace(/"/g, '');
        console.log('logout token === ', token)

        if (!token) {
            return res.status(400).json({ message: 'No token found' });
        }
        // Update the token entry to set isActive to false
        await Token.findOneAndUpdate({ cleanToken }, { isActive: false });

        // Optionally, clear the cookie
        // res.cookie('token', '', {
        //     maxAge: 0, // Expire the cookie immediately
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     path: '/', // Ensure the same path as the original cookie
        // });

        return res.status(200).json({ message: 'Logged out successfully' });
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
        console.log('in get user profile')

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
