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

router.put('/publish', async (req,res)=>{
    const id = req.query.id
    const updatedArticle = await Article.updateOne({_id: id}, {status: 'published'})
    res.json({
        success:true,
        article: updatedArticle
    })
})

router.put('/archive', async (req,res)=>{
    const id = req.query.id
    const updatedArticle = await Article.updateOne({_id: id}, {status: 'archived'})
    res.json({
        success:true,
        article: updatedArticle
    })
})

router.delete('/delete', async (req,res)=>{
    const id = req.query._id
    await Article.deleteOne({_id: id})
    res.json({
        success:true
    })
})

export default router