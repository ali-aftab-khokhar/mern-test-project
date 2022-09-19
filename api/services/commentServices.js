const express = require('express')
const app = express();
const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const constants = require('../constants')

const getCommentsService = async (id, res) => {
    try {
        await Comment.find({ commentOn: id }, function (err, doc) {
            if (!err) {
                res.status(200)
                res.json(doc)
            }
        })
    } catch {
        res.status(400)
    }

}

const addCommentService = async (payload, res) => {
    try {
        User.find({ email: payload.commentBy }, function (err, doc) {
            if (err) {
                res.status(400).send(constants.something_went_wrong)
            }
            const commentDetails = new Comment({
                commentBody: payload.commentBody,
                commentBy: payload.commentBy,
                commentOn: payload.commentOn,
                commentByName: doc[0].name
            })
            commentDetails.save()
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteCommentService = async (id, res) => {
    try {
        await Comment.findByIdAndDelete(id)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editCommentService = async (id, body, res) => {
    try {
        console.log(body)
        await Comment.findByIdAndUpdate(id, {
            commentBody: body
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