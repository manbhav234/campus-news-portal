import express from 'express'
import upload from '../middlewares/uploadArticle'
import Article from '../db/models/articles'
import { string } from 'zod'

interface User {
    username: string,
    googleId: string,
    _id: string
}

const router = express.Router()

router.post('/upload', upload.single('file'), async (req,res)=>{
    const article = await Article.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        articleImage: req.file?.filename,
        authorId: req.body.authorId,
        status: req.body.status
    })
    res.json({
        article: article,
        success:true
    })
})

export default router