import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/logout', (req,res)=>{
    res.send('logging out')
})

router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
    console.log('reached here finally')
    res.send(req.user)
})


export default router