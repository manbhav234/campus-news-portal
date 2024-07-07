import express from 'express'
import passport from 'passport'
const router = express.Router()

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/logout', (req,res, next)=>{
    req.logout(function (err){
        if (err) {return next(err)}
        res.redirect('http://localhost:5173/')
    })
})


router.get('/google/redirect',passport.authenticate('google'), (req,res)=>{
    res.redirect('http://localhost:5173')
})


export default router