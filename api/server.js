require('dotenv').config()
const express = require('express');
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoutes')
const postRoute = require('./routes/postsRoutes')
const commentRoute = require('./routes/commentRoutes')

const PORT = process.env.PORT
const ORIGIN = process.env.ORIGIN

//Connection established between MongoDB and Script.js using Mongoose
mongoose.connect(process.env.DB,
    () => { console.log("Connected to database") },
    (err) => { console.log(err) })

const options = {
    origin: ORIGIN,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(userRoute)
app.use(postRoute)
app.use(commentRoute);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));