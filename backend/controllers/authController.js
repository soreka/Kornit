const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
//TODO: refresh Token 

    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
