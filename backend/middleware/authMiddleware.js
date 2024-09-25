const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT token
const auth = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token; // Use req.cookies if you're using cookie-parser

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log(decoded)
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};

module.exports = auth;
