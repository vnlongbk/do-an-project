const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = mongoose.model('categorys', {
    name: String,
    img: String,
    description: String,
    parent:{
        type:Schema.Types.ObjectId,
        ref: 'categorys'
    }
})

module.exports = CategorySchema