const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true, // Content is required for each post
    },
    isDeleted: {
        type: Boolean,
        default: false, // Indicates whether the post is "soft deleted"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    image: {
        type: String, // Store image paths or URLs
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }], // Array of likes
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comments
    createdAt: {
        type: Date,
        default: Date.now, // Automatically set the creation date
    },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
