const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isActive: {
        type: Boolean,
        default: true, // Token is active by default when created
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Optional: Token will be automatically deleted after 1 hour
    },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
