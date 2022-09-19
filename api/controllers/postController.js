const constants = require('../constants')
const PostServices = require('../services/postServices')

const getAllPosts = async (req, res) => {
    try {
        await PostServices.getPostsService(res)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const addNewPost = async (req, res) => {
    const { ownerName, ownerEmail, title, body } = req.body
    try {
        PostServices.addNewPostService(ownerName, ownerEmail, title, body, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const deleteThePost = async (req, res) => {
    try {
        PostServices.deletePostService(req.params.id, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const editThePost = async (req, res) => {
    try {
        PostServices.editPostService(req.params.id, req.body.title, req.body.body, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const getOnePost = async (req, res) => {
    try {
        PostServices.getOnePostService(req, res)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const getProfile = async (req, res) => {
    try {
        PostServices.getProfileData(req.params.id, res) 
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

module.exports = {
    getAllPosts,
    addNewPost,
    deleteThePost,
    editThePost,
    getOnePost,
    getProfile
}