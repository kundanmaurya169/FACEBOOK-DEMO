const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post', // Reference to the Post model
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    isLike: {
        type: Boolean,
        default: true, // This indicates a positive like
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
