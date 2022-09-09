const express = require('express')
const app = express();
const Post = require('../Schema/postSchema')

app.route('/posts')
.get((req, res) => {
    Post.find({}, function (err, doc) {
        if (err) {
            res.send("Something went wrong")
            next()
        }
        res.json(doc)
    })
})
.post(async (req, res) => {
    const postDetails = new Post({
        ownerName: req.body.name,
        title: req.body.title,
        body: req.body.body,
        ownerEmail: req.body.email
    })
    postDetails.save()
    res.status(200).send('Posted')
})

app.route('/posts/:id')
.delete(async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Deleted')
})
.put(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    })
})

//Get post for comments page
app.get('/post/:id/comments', async (req, res) => {
    Post.find({ _id: req.params.id }, function (err, doc) {
        if (err) {
            res.send("Something went wrong")
        }
        res.json(doc)
    })
})

module.exports = app