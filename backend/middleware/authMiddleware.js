// Middleware to authenticate JWT token
const jwt = require('jsonwebtoken');
const Token = require('../models/Token'); 
require('dotenv').config();

const auth = async (req, res, next) => {
    console.log('In auth middleware');
    console.log("auth header", req.headers);

    try {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log('Token received:', token);

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        const cleanToken = token.replace(/"/g, '');
        console.log('Clean Token:', cleanToken);
        const secretKey = process.env.JWT_SECRET;
        console.log('Secret Key:', secretKey); // Log secret key for debugging

        // Verify the token
        const decoded = jwt.verify(cleanToken, secretKey);
        console.log('Decoded value:', decoded);

        const storedToken = await Token.findOne({ userId: decoded._id, isActive: true });
        console.log('Stored Token:', storedToken);
        console.log('stored token {token}:- ', storedToken.token);
        // Check if the token has expired
        if (Date.now() > storedToken.expiredAt) {
            return res.status(401).json({ message: 'Token has expired.' });
        }

        if (!storedToken || storedToken.token !== cleanToken) {
            console.log('Token mismatch or token not found.');
            return res.status(401).json({ message: 'Token is invalid or expired.' });
        }

        req.user = decoded;
        console.log('Decoded user:', decoded);

        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(400).json({ message: 'Invalid token.' });
    }
};



module.exports = auth;
