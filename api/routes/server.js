const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose')
const User = require('../Schema/userSchema')
const Post = require('../Schema/postSchema')

//Connection established between MongoDB and Script.js using Mongoose
mongoose.connect('mongodb://localhost:27017/mern-test-project',
    () => { console.log("Connected to database") },
    (err) => { console.log(err) })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Login
app.post('/', (req, res) => {
    User.find({
        $and: [
            { email: req.body.email },
            { password: req.body.password }
        ]
    },
        function (err, docs) {
            if (docs.length) {
                res.status(200).send(docs)
            }
            else {
                console.log(err)
            }
        }
    )
})

//Register a new user
app.post('/register', (req, res) => {
    User.find({ email: req.body.email }, function (err, docs) {
        if (!docs.length) {
            const userDetails = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            userDetails.save()
            res.status(200).send('Added')
        }
        else {
            res.status(400).send('Error')
        }
    })
});

//Get Posts
app.get('/posts', (req, res) => {
    Post.find({}, function (err, doc) {
        if (err) {
            res.send("Something went wrong")
            next()
        }
        res.json(doc)
    })
})

//Publish a new post
app.post('/posts', async (req, res) => {
    const postDetails = new Post({
        title: req.body.title,
        body: req.body.body,
        ownerEmail: req.body.email
    })
    postDetails.save()
    res.status(200).send('Posted')
})

//Delete a post
app.delete('/posts/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send('Deleted')
})

//Edit a post
app.put('/posts/:id', async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`));