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
        res.status(400).send(constants.something_went_wrong)
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
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteTheComment = async (req, res) => {
    try {
        CommentServices.deleteCommentService(req.params.id, res)
        res.status(200).send(constants.deleted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editTheComment = async (req, res) => {
    try {
        CommentServices.editCommentService(req.params.id, req.body.updatedComment, res)
        res.status(200).send(constants.updated)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

module.exports = {
    getAllComments,
    addNewComment,
    deleteTheComment,
    editTheComment
}