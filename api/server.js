require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const postRoute = require('./routes/postsRoutes')
const commentRoute = require('./routes/commentRoutes')

//Connection established between MongoDB and Script.js using Mongoose
mongoose.connect(process.env.DB,
    () => { console.log("Connected to database") },
    (err) => { console.log(err) })


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(userRoute)
app.use(postRoute)
app.use(commentRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));