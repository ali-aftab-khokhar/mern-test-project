const express = require('express')
const app = express();
const { getAllPosts, addNewPost, deleteThePost, editThePost, getOnePost } = require('../controllers/postController')

app.route('/posts')
.get(getAllPosts)
.post(addNewPost)

app.route('/posts/:id')
.delete(deleteThePost)
.put(editThePost)

app.get('/post/:id/comments', getOnePost)

module.exports = app