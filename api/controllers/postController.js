const express = require('express')
const app = express();
const Post = require('../schema/postSchema')
const constants = require('../constants')

const getAllPosts = async (req, res) => {
    Post.find({}, function (err, doc) {
        if (err) {
            res.send(constants.something_went_wrong)
            next()
        }
        res.json(doc)
    })
}

const addNewPost = async (req, res) => {
    const postDetails = new Post({
        ownerName: req.body.name,
        title: req.body.title,
        body: req.body.body,
        ownerEmail: req.body.email
    })
    postDetails.save()
    res.status(200).send(constants.posted)
}

const deleteThePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send(constants.deleted)
}

const editThePost = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    })
    res.status(200).send(constants.updated)
}

const getOnePost = async (req, res) => {
    Post.find({ _id: req.params.id }, function (err, doc) {
        if (err) {
            res.send(constants.something_went_wrong)
        }
        res.json(doc)
    })
}

module.exports = {
    getAllPosts,
    addNewPost,
    deleteThePost,
    editThePost,
    getOnePost
}