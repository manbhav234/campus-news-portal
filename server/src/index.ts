import 'dotenv/config'
import express from 'express'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import articleRouter from './routes/articles'
import commentRouter from './routes/comments'
import mongoose from 'mongoose'
import passport  from 'passport'
const passportSetup = require('../config/passport-strategy') 
import cookieSession from 'cookie-session'

const app = express()
const port = process.env.PORT || 3000;

mongoose.connect(`${process.env.MONGO_URI}/campusNewsPortal`)

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.TOKEN_SECRET!]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/articles', articleRouter)
app.use('/api/comments', commentRouter)


app.listen(port, ()=>{
    console.log("Server started on port " + port)
})