const mongoose = require('mongoose');

const DislikeSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });
  
  // Export the model
  const Dislike = mongoose.model('Dislike', DislikeSchema);