const mongoose = require('mongoose')
const Users = require('./userSchema')

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    ownerEmail: String
})

const Posts = mongoose.model('posts', postSchema)
module.exports = Posts