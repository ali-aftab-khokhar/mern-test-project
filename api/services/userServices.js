const express = require('express')
const app = express();
const User = require('../schema/userSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const constants = require('../constants')

const loginService = async (req, res) => {
    try {
        const { email, password } = req.body
        const isExists = await existsOrNot(email)
        if (isExists && (await bcrypt.compare(password, isExists.password))) {
            res.status(200)
            res.json({
                _id: isExists.id,
                name: isExists.name,
                email: isExists.email,
                token: generateToken(isExists._id),
            })
        }
        else {
            res.status(400)
            throw new Error(constants.incorrect_email_or_password)
        }
    } catch {
        res.status(400)
        throw new Error(constants.invalid_user_data)
    }
}

const registerService = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isExists = await existsOrNot(email)
        if (isExists) {
            res.status(400)
            throw new Error(constants.user_already_exists)
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
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
    } catch {
        res.status(400)
        throw new Error(constants.invalid_user_data)
    }
}

const existsOrNot = async (email) => {
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return userExists
        } else {
            return false
        }
    } catch {
        res.status(400)
        throw new Error(constants.invalid_user_data)
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    })
}

module.exports = {
    loginService,
    registerService
}