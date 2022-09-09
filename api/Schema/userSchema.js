const mongoose = require('mongoose')
const Posts = require('./postSchema')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})

const Users = mongoose.model('users', userSchema)
module.exports = Users