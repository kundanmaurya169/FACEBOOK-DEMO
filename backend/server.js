// server.js or app.js

const express = require('express');
const connectDB = require('./config/db.js');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRouters.js');
const postRoutes = require('./routes/postRoutes.js');
const commentRoutes= require('./routes/commentRoutes.js');
const likeRoutes = require('./routes/likeRoutes.js');
const friendRoutes= require('./routes/friendRoutes.js');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();
app.use(cookieParser()); // Use cookie-parser to handle cookies

// Routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/friend', friendRoutes);

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Listen on a port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
