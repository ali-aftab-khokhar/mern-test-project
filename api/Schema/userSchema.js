const mongoose = require('mongoose')
const Posts = require('./postSchema')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    posts: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: Posts
    }]
})

const Users = mongoose.model('users', userSchema)
module.exports = Users