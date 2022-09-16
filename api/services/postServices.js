const Post = require('../schema/postSchema')
const express = require('express')
const app = express();
const constants = require('../constants');

const getPostsService = async (req, res) => {
    try {
        await Post.find({}, function (err, doc) {
            res.status(200)
            res.json(doc)
        })
    } catch {
        res.status(400)
    }
}

const addNewPostService = async (req, res) => {
    try {
        const postDetails = new Post({
            ownerName: req.body.ownerName,
            title: req.body.title,
            body: req.body.body,
            ownerEmail: req.body.ownerEmail
        })
        postDetails.save()
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deletePostService = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    } 
}

const editPostService = async (req, res) => {
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    } 
}

const getOnePostService = async (req, res) => {
    try {
        Post.find({ _id: req.params.id }, function (err, doc) {
            if (err) {
                res.send(constants.something_went_wrong)
            }
            res.json(doc)
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    } 
}

module.exports = { getPostsService, addNewPostService, deletePostService, editPostService, getOnePostService }