import mongoose, { mongo } from 'mongoose'

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
    createdAt: Number
})

const Article = mongoose.model('articles', ArticleSchema)

export default Article