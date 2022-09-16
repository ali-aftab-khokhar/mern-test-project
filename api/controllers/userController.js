const express = require('express')
const app = express();
const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../constants')

const login = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200)
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error(constants.incorrect_email_or_password)
    }
}

const register = async (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error(constants.add_all_fields)
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error(constants.user_already_exists)
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error(constants.invalid_user_data)
    }
}

//Register a new user
// app.post('/register', async (req, res) => {
    
// });

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

module.exports = {
    login,
    register
}