const mongoose = require('mongoose')
const Users = require('./userSchema')

const postSchema = new mongoose.Schema({
    ownerName: String,
    title: {
        type: String,
        required: [true, 'Please add title']
    },
    body: {
        type: String,
        required: [true, 'Please add body']
    },
    ownerEmail: String
})

const Posts = mongoose.model('posts', postSchema)
module.exports = Posts