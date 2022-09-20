const express = require('express')
const app = express();
const { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost, getProfile, likeAndDislike } = require('../controllers/postController')

app.route('/posts')
.get(getAllPosts)
.post(addNewPost)

app.route('/posts/:id')
.delete(deleteThePost)
.put(editThePost)

app.put('/post/lod/:id', likeAndDislike)

app.get('/post/:id/comments', getOnePost)

app.get('/profile/:id', getProfile)

module.exports = app