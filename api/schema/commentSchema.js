const mongoose = require('mongoose')
const constants = require('../constants')
const type = require('../dataType')

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: type.string,
        required: [true, constants.enter_comment]
    },
    commentBy: type.string,
    commentOn: type.string,
    commentByName: type.string
})

const Comments = mongoose.model(constants.comments, commentSchema)
module.exports = Comments