var User = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;  
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });  
        res.status(200).json({ token }); 
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });  
    }
};

module.exports = { login };