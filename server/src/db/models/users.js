const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        default: 'Anonymous'
    },
    googleId: {
        type: String,
        default: ''
    }
})

const User = mongoose.model('users', UserSchema)

module.exports = User