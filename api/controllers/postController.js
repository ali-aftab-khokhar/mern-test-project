const express = require('express')
const constants = require('../constants')
const PostServices = require('../services/postServices')

const getAllPosts = (req, res) => {
    PostServices.getPostsService(req, res)
}

const addNewPost = async (req, res) => {
    try {
        PostServices.addNewPostService(req, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteThePost = async (req, res) => {
    try {
        PostServices.deletePostService(req, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editThePost = async (req, res) => {
    try {
        PostServices.editPostService(req, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const getOnePost = async (req, res) => {
    PostServices.getOnePostService(req, res)
}

module.exports = {
    getAllPosts,
    addNewPost,
    deleteThePost,
    editThePost,
    getOnePost
}