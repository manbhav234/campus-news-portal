import express from 'express'
import upload from '../middlewares/uploadArticle'
import Article from '../db/models/articles'
const router = express.Router()

router.post('/upload', upload.single('file'), async (req,res)=>{
    const article = await Article.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        articleImage: req.file?.filename,
        author: req.body.author,
        status: req.body.status
    })
    res.json({
        article: article,
        success:true
    })
})

export default router