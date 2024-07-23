const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with email and password fields
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true, // Password is required
  },
});

// Pre-save hook to hash the password before saving to the database
UserSchema.pre('save', async function (next) {
  try {
    // Check if the password field is modified
    if (!this.isModified('password')) {
      return next();
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Method to compare entered password with the hashed password in the database
UserSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
