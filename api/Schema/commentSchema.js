const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    commentBody: {
        type: String,
        required: [true, 'Please add comment']
    },
    commentBy: String,
    commentOn: String,
    commentByName: String
})

const Comments = mongoose.model('comments', commentSchema)
module.exports = Comments