const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config({path: './config/.env'})

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'authToken': token})
        if (!user) {
            throw new Error()
        }
        req.user = user
        next()
    } catch (err) {
        res.status(401).send({ error: `Please authenticate. ${err}` })
    }
}

module.exports = auth