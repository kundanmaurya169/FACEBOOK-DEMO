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
    },
    expiredAt: {
        type: Date,
        default: function() {
            return Date.now() + 3600000; // Set expiration to 1 hour (3600000 milliseconds) from creation
        },
    },
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;
