const express = require('express')
const { async } = require('validate.js')
const { User, Token } = require('../db/dbModels')
const router = new express.Router()
var jwt = require('jsonwebtoken');

const chalk = require('chalk');
const errorStyle = chalk.inverse.red;

router.get('/', async (req, res) => {
    try {
        res.send({ success: 'yes' })
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})

router.post('signup', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})

router.post('login', async (req, res) => {
    try {
        const { userName, password } = req.body
        const isUserExist = await User.findOne({ where: { userName, password } })
        if (isUserExist) {
            const token = jwt.sign(userName, process.env.JWT, '24h')
            await Token.create({userName,token})
            res.send({ token })
        } else {
            throw new Error({ error: 'wrong user name or password' })
        }
    } catch (e) {
        res.status(400).send(e)
        console.log(errorStyle(e));
    }
})
module.exports = router