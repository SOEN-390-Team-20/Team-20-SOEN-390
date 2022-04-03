const mongoose = require('mongoose');

// Flat architecture
const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [
    {
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        default: Date.now(),
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Conversation', conversationSchema);
