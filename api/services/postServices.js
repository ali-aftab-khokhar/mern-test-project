const Post = require('../schema/postSchema')
const express = require('express')
const app = express();
const constants = require('../constants');
const User = require('../schema/userSchema');

const getPostsService = async (res) => {
    try {
        await Post.find({}, function (err, doc) {
            if (!err) {
                res.status(200)
                res.json(doc)
            }
        })
    } catch {
        res.status(400)
    }
}

const addNewPostService = async (ownerName, ownerEmail, title, body, res) => {
    try {
        const postDetails = new Post({
            ownerName: ownerName,
            title: title,
            body: body,
            ownerEmail: ownerEmail
        })
        await postDetails.save()
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deletePostService = async (id, res) => {
    try {
        await Post.findByIdAndDelete(id)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editPostService = async (id, title, body, res) => {
    try {
        await Post.findByIdAndUpdate(id, {
            title: title,
            body: body
        })
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const getOnePostService = async (req, res) => {
    try {
        Post.find({ _id: req.params.id }, function (err, doc) {
            if (!err) {
                res.status(200)
                res.send(doc)
            }
        })
    } catch {
        res.status(400).send(constants.cant_get_individual_post)
    }
}

const getProfileDataService = async (id, res) => {
    try {
        await User.findOne({ _id: id }, function (err, doc) {
            if (!err) {
                Post.find({ ownerEmail: doc.email }, function (p_err, p_doc) {
                    if (!p_err) {
                        res.status(200)
                        res.json(p_doc)
                    }
                })
            }
        })
    } catch {
        res.status(400)
    }
}
module.exports = { getPostsService, addNewPostService, deletePostService, editPostService, getOnePostService, getProfileData }