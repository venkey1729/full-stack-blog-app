const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
  
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error);
      res.status(400).json({ error: 'Validation error', details: error.message });
    } else {
      console.error('Error while registering user:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } 
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt:', username); 

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, token generated');
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error); 
    res.status(500).json({ error: 'Server error' });
  }
};



