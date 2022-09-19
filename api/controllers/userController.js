const constants = require('../constants')
const UserServices = require('../services/userServices')

const login = async (req, res) => {
    try {
        await UserServices.loginService(req, res)
    } catch {
        res.status(400).send(constants.login_failed)
    }
}

const register = async (req, res) => {
    try {
        await UserServices.registerService(req, res)
    } catch {
        res.status(400).send(constants.signup_failed)
    }
}

module.exports = {
    login,
    register
}