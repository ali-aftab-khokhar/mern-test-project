const express = require('express')
const app = express();
const User = require('../Schema/userSchema')

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

module.exports = app