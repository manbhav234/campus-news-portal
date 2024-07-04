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
    authorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    status: String
})

const Article = mongoose.model('articles', ArticleSchema)

export default Article