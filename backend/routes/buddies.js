const router = require('express').Router();
const StudyBuddy = require('../models/StudyBuddy');
const User = require('../models/User');

// Get all study buddy posts
router.get('/', async (req, res) => {
  try {
    const { subject, location } = req.query;
    let query = {};
    
    if(subject) query.subject = new RegExp(subject, 'i');
    if(location) query.location = new RegExp(location, 'i');
    
    const buddies = await StudyBuddy.find(query)
      .populate('userId', 'name email location subjects')
      .sort({ createdAt: -1 });
    
    res.json(buddies);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Create study buddy post
router.post('/', async (req, res) => {
  try {
    const { userId, subject, description, location, availability } = req.body;
    
    const newPost = new StudyBuddy({ userId, subject, description, location, availability });
    const savedPost = await newPost.save();
    
    const populatedPost = await StudyBuddy.findById(savedPost._id)
      .populate('userId', 'name email location subjects');
    
    res.json(populatedPost);
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete study buddy post
router.delete('/:id', async (req, res) => {
  try {
    await StudyBuddy.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Post deleted' });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;