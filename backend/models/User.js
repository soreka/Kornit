const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
});

UserSchema.pre('save', async function(next) {
    try {
        const salt = bcrypt.genSalt(10)
        const hash = bcrypt.hash(this.password, salt)
        this.password = hash;
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.comparePasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
  

const User = mongoose.model('User', UserSchema)
  
module.exports = User
  