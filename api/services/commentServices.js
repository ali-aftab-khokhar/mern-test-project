const express = require('express')
const app = express();
const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const constants = require('../constants')

const getCommentsService = async (req, res) => {
    try {
        await Comment.find({ commentOn: req.params.id }, function (err, doc) {
            res.status(200)
            res.json(doc)
        })
    } catch {
        res.status(400)
    }

}

const addCommentService = async (req, res) => {
    try {
        User.find({ email: req.body.commentBy }, function (err, doc) {
            if (err) {
                res.status(400).send(constants.something_went_wrong)
            }
            const commentDetails = new Comment({
                commentBody: req.body.commentBody,
                commentBy: req.body.commentBy,
                commentOn: req.params.id,
                commentByName: doc[0].name
            })
            commentDetails.save()
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteCommentService = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editCommentService = async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, {
            commentBody: req.body.updatedComment
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

module.exports = {
    getCommentsService,
    addCommentService,
    deleteCommentService,
    editCommentService
}