const constants = require('../constants')
const UserServices = require('../services/userServices')

const login = async (req, res) => {
    try {
        await UserServices.loginService(req, res)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

const register = async (req, res) => {
    try {
        await UserServices.registerService(req, res)
    } catch {
        res.status(400).send(constants.something_went_wrong)
    }
}

module.exports = {
    login,
    register
}