const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

//Connection established between MongoDB and Script.js using Mongoose
mongoose.connect('mongodb://localhost:27017/mern-test-project',
    () => { console.log("Connected to database") },
    (err) => { console.log(err) })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(userController);
app.use(postController);
app.use(commentController);

app.listen(port, () => console.log(`Listening on port ${port}`));