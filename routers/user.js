const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/authenticate')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(200).send(user.toJSON())
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        await user.generateAuthToken()
        res.status(200).send(user.toJSON())
    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.authToken = ""
        await req.user.save()
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router