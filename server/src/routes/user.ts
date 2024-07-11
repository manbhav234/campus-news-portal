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
    const userId = req.query.id
    const articles = await Article.find({'author.authorId': userId}).select('-__v')
    res.json({
        articles: articles
    })
})

export default router