const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Import jsonwebtoken
const jwt = require('jsonwebtoken'); 
// import Schema from mongoose
const { Schema } = mongoose;

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true, // Ensure phone number is unique
    },
    password: {
        type: String,
        required: true,
    },
    isDeleted:{
        type:Boolean,
        default:false,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

// Hash the password before saving
userSchema.pre('save', async function (next) {
    // If the password has not been modified, skip hashing
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Ensure password is hashed only once
        const regex = /^\$2[ayb]\$.{56}$/;  // bcrypt hashed password pattern
        if (!regex.test(this.password)) {
            console.log('Password before hashing (plain):', this.password);  // Log plain password
            this.password = await bcrypt.hash(this.password, 10);
            console.log('Hashed Password:', this.password);  // Log hashed password
        } else {
            console.log('Password already hashed, skipping rehash');
        }
        next();
    } catch (error) {
        next(error);
    }
});



// Method to check if the given password is correct
userSchema.method("comparePassword", async function (loginPassword) {

    // Plain password first, then hashed
    return await bcrypt.compare(loginPassword, this.password); 
});


// Static method to find user by email or phone
userSchema.statics.findUser = async function (login) {
    let user = await this.findOne({ email: login });
    return user;
};

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    // Payload to include in the JWT token (you can customize as needed)
    const payload = { _id: this._id,name: this.name, phone: this.phone, email: this.email };

    // Generate a JWT token (you should store your JWT secret in an environment variable)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expiration time
    });

    return token;
};

// Export the model 
const User = mongoose.model('User', userSchema);

module.exports = User;
