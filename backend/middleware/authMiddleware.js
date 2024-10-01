// Middleware to authenticate JWT token
const jwt = require('jsonwebtoken');
const Token = require('../models/Token'); 
require('dotenv').config();

const auth = async (req, res, next) => {
    console.log('In auth middleware');

    try {
        // Retrieve token from cookies or Authorization header
        const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
        console.log('Coming token:', token);

        // Check if token is provided
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }
            
        console.log("secret key :- ", process.env.JWT_SECRET);
        // Verify the token
        const decoded = await jwt.verify(token.trim(), process.env.JWT_SECRET);
       
        console.log('Decoded value:', decoded);
        console.log('Decoded user id:', decoded._id);

        // Check if the token exists in the database and is active
        const storedToken = await Token.findOne({ userId: decoded._id, isActive: true });
        console.log('Stored Token:', storedToken);
        console.log("type of coming token",typeof(token));
        console.log("type of stored token",typeof(storedToken));
        console.log('Stored Token from DB:', typeof(storedToken?.token));
        // Validate stored token against the token from the request

        
        if ( !storedToken && storedToken.token !== token) {
            console.log("Token mismatch or token not found.");
            return res.status(401).json({ message: 'Token is invalid or expired.' });
        }

        // Attach decoded user information to the request
        req.user = decoded; 
        console.log("Decoded user:", decoded);

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error("Token verification error:", err);
        res.status(400).json({ message: 'Invalid token.' }); // Consistent error response
    }
};

module.exports = auth;
