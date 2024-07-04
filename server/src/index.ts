import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import articleRouter from './routes/articles'
import mongoose from 'mongoose'
import passport  from 'passport'
const passportSetup = require('../config/passport-strategy')
import cookieSession from 'cookie-session'

const app = express()
const port = 3000

mongoose.connect(process.env.MONGO_URI!)

app.use(cookieSession({
    maxAge: 90 * 24 * 60 * 60 * 1000,
    keys: [process.env.TOKEN_SECRET!]
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use('/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/articles', articleRouter)


app.listen(port, ()=>{
    console.log("Server started on port " + port)
})