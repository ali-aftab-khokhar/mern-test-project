const mongoose = require('mongoose')
const Users = require('./userSchema')
const constants = require('../constants')
const type = require('../dataType')

const postSchema = new mongoose.Schema({
    ownerName: type.string,
    title: {
        type: String,
        required: [true, constants.enter_title]
    },
    body: {
        type: type.string,
        required: [true, constants.enter_body]
    },
    ownerEmail: type.string,
    likes: [type.string]
})

const Posts = mongoose.model(constants.posts, postSchema)
module.exports = Posts