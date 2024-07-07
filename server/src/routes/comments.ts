import express from 'express'
import Comment from '../db/models/comments'
import Article from '../db/models/articles'

const router = express.Router()

router.post('/create', async (req,res)=>{
    const latestComment = await Comment.create({
        author: req.body.comment.author,
        articleId: req.body.comment.articleId,
        content: req.body.comment.content,
        createdAt: req.body.comment.createdAt
    })
    await Article.updateOne({_id: latestComment.articleId}, {$push: {comments: latestComment._id}})
    res.json({
        success: true,
        latestComment: latestComment
    })
})

router.get('/getComment', async (req,res)=>{
    const id = req.query.id
    const comment = await Comment.findOne({_id: id}).select('-__v')
    res.json({
        comment: comment
    })
})


export default router