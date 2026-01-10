const mongoose = require('mongoose');

const studyBuddySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  availability: { type: String, default: 'Flexible' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyBuddy', studyBuddySchema);