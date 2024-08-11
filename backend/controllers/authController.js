const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Finding user...');
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    console.log('Checking password...');
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    console.log('Generating token...');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    console.log('Token generated:', token);

    console.log('Login successful');
    res.json({ token });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).send('Server error');
  }
};
