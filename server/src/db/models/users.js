const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    googleId: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('users', UserSchema)

module.exports = User