import express from 'express'
import authenticate from '../middlewares/authenticate'

const router = express.Router()

router.get('/authenticate', authenticate, (req,res)=>{
    res.json({
        message: 'User Logged In',
        user: req.user,
        success: true
    })
})

export default router