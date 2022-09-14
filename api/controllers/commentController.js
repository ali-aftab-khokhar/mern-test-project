const express = require('express')
const app = express();
const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const constants = require('../constants')

const getAllComments = async (req, res) => {
    Comment.find({ commentOn: req.params.id }, function(err, doc) {
        if (err) {
            res.status(400).send(constants.something_went_wrong)
        }
        res.json(doc)
    })
}

const addNewComment = async (req, res) => {
    User.find({ email: req.body.commentBy }, function(err, doc){
        if (err){
            res.status(400).send(constants.something_went_wrong)
        }
        const commentDetails = new Comment({
            commentBody: req.body.commentBody,
            commentBy: req.body.commentBy,
            commentOn: req.params.id,
            commentByName: doc[0].name
        })
        commentDetails.save()
        res.status(200).send(constants.commented)
    })
}

const deleteTheComment = async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id)
    res.status(200).send(constants.deleted)
}

const editTheComment = async (req, res) => {
    await Comment.findByIdAndUpdate(req.params.id, {
        commentBody: req.body.updatedComment
    })
    res.status(200).send(constants.updated)
}

module.exports = {
    getAllComments,
    addNewComment,
    deleteTheComment,
    editTheComment
}