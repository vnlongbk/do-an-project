const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.model('user', {
    username:String,
    password:String,
    
})

module.exports = UserSchema