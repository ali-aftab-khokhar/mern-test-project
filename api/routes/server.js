require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

//Connection established between MongoDB and Script.js using Mongoose
mongoose.connect(process.env.DB,
    () => { console.log("Connected to database") },
    (err) => { console.log(err) })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(userController);
app.use(postController);
app.use(commentController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));