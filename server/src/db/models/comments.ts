import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'articles'
    },
    author: {
        type: String,
        ref: 'users'
    },
    createdAt: Number,
    content: String
})

const Comment = mongoose.model('comments', CommentSchema)

export default Comment
