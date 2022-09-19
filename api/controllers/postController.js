const constants = require('../constants')
const PostServices = require('../services/postServices')

const getAllPosts = async (req, res) => {
    try {
        await PostServices.getPostsService(res)
    } catch {
        res.status(400).send(constants.post_fetch_failed)
    }
}

const addNewPost = async (req, res) => {
    const { ownerName, ownerEmail, title, body } = req.body
    try {
        PostServices.addNewPostService(ownerName, ownerEmail, title, body, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.publish_new_post_failed)
    }
}

const deleteThePost = async (req, res) => {
    try {
        PostServices.deletePostService(req.params.id, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.deletion_failed)
    }
}

const editThePost = async (req, res) => {
    try {
        PostServices.editPostService(req.params.id, req.body.title, req.body.body, res)
        res.status(200).send(constants.posted)
    } catch {
        res.status(400).send(constants.edit_failed)
    }
}

const getOnePost = async (req, res) => {
    try {
        PostServices.getOnePostService(req, res)
    } catch {
        res.status(400).send(constants.cant_get_individual_post)
    }
}

const getProfile = async (req, res) => {
    try {
        PostServices.getProfileDataService(req.params.id, res) 
    } catch {
        res.status(400).send(constants.profile_data_failed)
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