const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../src/db/models/users')


passport.serializeUser((user, done)=>{
    done(null, user._id)
})

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id).select('-__v')
    done(null, user)
})

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.ClientID,
        clientSecret: keys.google.ClientSecret
    },async (accessToken, refreshToken, profile, done)=>{
        const currentUser = await User.findOne({googleId: profile.id})
        if (!currentUser){
            const createdUser = await User.create({
                username: profile.displayName,
                googleId: profile.id
            })
            done(null, createdUser)
        }else {
            done(null, currentUser)
        }
    })
)