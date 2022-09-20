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

const addNewPostService = async (ownerName, ownerEmail, title, body, likes, res) => {
    try {
        const postDetails = new Post({
            ownerName: ownerName,
            title: title,
            body: body,
            ownerEmail: ownerEmail,
            likes: likes
        })
        await postDetails.save()
        Post.find({ ownerEmail: ownerEmail, ownerName: ownerName, title: title, likes: likes, body: body }, function(err, doc) {
            if (!err){
                res.status(200)
                res.json(doc)
            }
        })
    } catch {
        res.status(400).send(constants.publish_new_post_failed)
    }
}

const deletePostService = async (id, res) => {
    try {
        await Post.findByIdAndDelete(id)
    } catch {
        res.status(400).send(constants.deletion_failed)
    }
}

const editPostService = async (id, title, body, res) => {
    try {
        await Post.findByIdAndUpdate(id, {
            title: title,
            body: body
        })
    } catch {
        res.status(400).send(constants.edit_failed)
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

const likeAndDislikeService = async (req, res) => {
    try {
        if (req.body.todo === constants.dislike) {
            dislikeService(req, res)
        } else if (req.body.todo === constants.like) {
            likeService(req, res)
        }
    } catch {
        res.status(400)
    }
}

const dislikeService = (req, res) => {
    try {
        Post.findByIdAndUpdate(req.body.id,
            { "$pull": { likes: req.body.email } },
            { "new": true, "upsert": true },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(constants.disliked)
                }
            }
        );
    } catch {
        res.status(400).send(constants.like_dislike_failed)
    }
}

const likeService = async (req, res) => {
    try {
        Post.findByIdAndUpdate(req.body.id,
            { "$push": { likes: req.body.email } },
            { "new": true, "upsert": true },
            function (err, doc) {
                if (!err) {
                    res.status(200).send(constants.liked)
                }
            }
        );
    } catch {
        res.status(400).send(constants.like_dislike_failed)
    }
}

module.exports = { getPostsService, addNewPostService, deletePostService, editPostService, getOnePostService, getProfileDataService, likeAndDislikeService }