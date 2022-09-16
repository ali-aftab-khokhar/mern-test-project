const express = require('express')
const app = express();
const Comment = require('../schema/commentSchema')
const User = require('../schema/userSchema')
const constants = require('../constants')
const CommentServices = require('../services/commentServices')

const getAllComments = async (req, res) => {
    CommentServices.getCommentsService(req, res)
}

const addNewComment = async (req, res) => {
    try {
        CommentServices.addCommentService(req, res)
        res.status(200).send(constants.commented)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteTheComment = async (req, res) => {
    try {
        CommentServices.deleteCommentService(req, res)
        res.status(200).send(constants.deleted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editTheComment = async (req, res) => {
    try {
        CommentServices.editCommentService(req, res)
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