const express = require('express')
const app = express();
const Comment = require('../Schema/commentSchema')
const User = require('../Schema/userSchema')

app.route('/:id/comments')
.get(async (req, res) => {
    Comment.find({ commentOn: req.params.id }, function(err, doc) {
        if (err) {
            res.status(400).send('Something went wrong')
        }
        res.json(doc)
    })
})
.post(async (req, res) => {
    User.find({ email: req.body.commentBy }, function(err, doc){
        if (err){
            res.status(400).send('Something went wrong')
        }
        const commentDetails = new Comment({
            commentBody: req.body.commentBody,
            commentBy: req.body.commentBy,
            commentOn: req.params.id,
            commentByName: doc[0].name
        })
        commentDetails.save()
        res.status(200).send('Commented')
    })
})

app.route('/comment/:id')
.delete(async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).send('Deleted')
})
.put(async (req, res) => {
    await Comment.findByIdAndUpdate(req.params.id, {
        commentBody: req.body.updatedComment
    })
    res.status(200).send('Updated')
})

module.exports = app