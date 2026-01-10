const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, subjects } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ msg: 'User already exists' });
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create user
    const user = new User({ name, email, password: hashedPassword, location, subjects });
    await user.save();
    
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ token, user: { id: user._id, name, email, location, subjects } });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'User not found' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email, location: user.location, subjects: user.subjects } 
    });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;