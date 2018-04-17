const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = mongoose.model('articles', {
    title: String,
    description:String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categorys'
    },
    content:String,
    img:String

}) 

module.exports = ArticleSchema