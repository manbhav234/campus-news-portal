import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    },
    articleImage: {
        type: String,
        default: ''
    },
    author : {
        type: String,
        ref: 'users'
    },
    status: String,
    createdAt: Number,
    reactions: [{emoji: String, count: Number}],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
})

const Article = mongoose.model('articles', ArticleSchema)

export default Article