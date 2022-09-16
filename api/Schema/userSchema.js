const mongoose = require('mongoose')
const Posts = require('./postSchema')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
})

const Users = mongoose.model('users', userSchema)
module.exports = Users