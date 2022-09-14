const mongoose = require('mongoose')
const Posts = require('./postSchema')
const validator = require('validator')
const constants = require('../constants')
const type = require('../dataType')

const userSchema = new mongoose.Schema({
    name: {
        type: type.string,
        required: [true, constants.enter_name]
    },
    email: {
        type: type.string,
        required: [true, constants.enter_email],
        unique: true,
        validator: validator.isEmail
    },
    password: {
        type: type.string,
        required: [true, constants.enter_password]
    },
})

const Users = mongoose.model(constants.users, userSchema)
module.exports = Users