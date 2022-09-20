const express = require('express')
const app = express();
const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const constants = require('../constants')
const CommentServices = require('../services/commentServices')

const getAllComments = async (req, res) => {
    try {
        await CommentServices.getCommentsService(req.params.id, res)
    } catch {
        res.status(400).send(constants.comments_fetch_failed)
    }
}

const addNewComment = async (req, res) => {
    try {
        const payload = {
            commentOn: req.params.id,
            commentBy: req.body.commentBy,
            commentBody: req.body.commentBody,
        }
        CommentServices.addCommentService(payload, res)
        res.status(200).send(constants.commented)
    } catch {
        res.status(400).send(constants.publish_new_comment_failed)
    }
}

const deleteTheComment = async (req, res) => {
    try {
        CommentServices.deleteCommentService(req.params.id, res)
        res.status(200).send(constants.deleted)
    } catch {
        res.status(400).send(constants.deletion_failed)
    }
}

const editTheComment = async (req, res) => {
    try {
        CommentServices.editCommentService(req.params.id, req.body.updatedComment, res)
        res.status(200).send(constants.updated)
    } catch {
        res.status(400).send(constants.edit_failed)
    }
}

module.exports = {
    getAllComments,
    addNewComment,
    deleteTheComment,
    editTheComment
}