import express from 'express'
import authenticate from '../middlewares/authenticate'
import Article from '../db/models/articles'

const router = express.Router()

router.get('/authenticate', authenticate, (req,res)=>{
    res.json({
        message: 'User Logged In',
        user: req.user,
        success: true
    })
})

router.get('/articles', authenticate, async (req,res)=>{
    const username = req.query.username
    const articles = await Article.find({author: username}).select('-__v')
    res.json({
        articles: articles
    })
})

export default router