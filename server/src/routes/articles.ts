import express from 'express'
import upload from '../middlewares/uploadArticle'
import Article from '../db/models/articles'
const router = express.Router()

router.post('/upload', upload.single('file'), async (req,res)=>{
    const date = Date.now()
    const article = await Article.create({
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        articleImage: req.file?.filename,
        author: req.body.author,
        status: req.body.status,
        createdAt: date,
        reactions: [],
        comments: []
    })
    res.json({
        article: article,
        success:true
    })
})

router.get('/getAll', async (req,res)=>{
    const articles = await Article.find().select('-__v')
    res.json({
        success:true,
        articles: articles
    })
})

router.get('/getArticle', async (req,res)=>{
    const id = req.query.id
    const article = await Article.findOne({_id: id})
    res.json({
        success: true,
        article: article
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
    const id = req.query.id
    await Article.deleteOne({_id: id})
    res.json({
        success:true
    })
})

router.put('/updateReactions', async (req,res)=> {
    const id = req.query.id
    await Article.updateOne({_id: id}, {reactions: req.body.reactions})
    res.json({
        success: true
    })
})

router.get('/getComments', async (req,res)=>{
    const id = req.query.id
    const article = await Article.findOne({_id : id})
    res.json({
        comments: article?.comments
    })
})

export default router