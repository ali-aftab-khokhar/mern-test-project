const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentBody: String,
    commentBy: String,
    commentOn: String,
    commentByName: String
})

const Comments = mongoose.model('comments', commentSchema)
module.exports = Comments